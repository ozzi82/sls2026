import crypto from "crypto";
import { z } from "zod";
import { readJson, writeJson } from "./content-store";

// --- Types ---

export interface StoredUser {
  id: string;
  username: string;
  displayName: string;
  role: "admin" | "editor";
  passwordHash: string;
  tokenVersion: number;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
}

export type PublicUser = Omit<StoredUser, "passwordHash">;

// --- Validation ---

export const createUserSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(30)
    .regex(/^[a-z0-9_]+$/, "Lowercase alphanumeric and underscores only")
    .transform((v) => v.toLowerCase()),
  displayName: z.string().min(1).max(50),
  password: z.string().min(8),
  role: z.enum(["admin", "editor"]),
});

export const updateUserSchema = z.object({
  displayName: z.string().min(1).max(50).optional(),
  role: z.enum(["admin", "editor"]).optional(),
  password: z.string().min(8).optional(),
});

export const profileUpdateSchema = z.object({
  displayName: z.string().min(1).max(50).optional(),
  currentPassword: z.string().optional(),
  newPassword: z.string().min(8).optional(),
}).refine(
  (data) => !data.newPassword || data.currentPassword,
  { message: "Current password is required to set a new password", path: ["currentPassword"] }
);

export const setupSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(30)
    .regex(/^[a-z0-9_]+$/, "Lowercase alphanumeric and underscores only")
    .transform((v) => v.toLowerCase()),
  displayName: z.string().min(1).max(50),
  password: z.string().min(8),
});

// --- Password Hashing ---

const SCRYPT_KEYLEN = 64;
const SALT_LEN = 32;

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(SALT_LEN);
  const key = await new Promise<Buffer>((resolve, reject) => {
    crypto.scrypt(password, salt, SCRYPT_KEYLEN, (err, derivedKey) => {
      if (err) reject(err);
      else resolve(derivedKey);
    });
  });
  return `${salt.toString("hex")}:${key.toString("hex")}`;
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const [saltHex, keyHex] = hash.split(":");
  if (!saltHex || !keyHex) return false;
  const salt = Buffer.from(saltHex, "hex");
  const expectedKey = Buffer.from(keyHex, "hex");
  const derivedKey = await new Promise<Buffer>((resolve, reject) => {
    crypto.scrypt(password, salt, SCRYPT_KEYLEN, (err, key) => {
      if (err) reject(err);
      else resolve(key);
    });
  });
  return crypto.timingSafeEqual(derivedKey, expectedKey);
}

// --- ID Generation ---

function generateId(): string {
  const timestamp = Date.now();
  const random = crypto.randomBytes(3).toString("hex");
  return `u_${timestamp}_${random}`;
}

// --- CRUD ---

const USERS_PATH = "settings/users.json";

export async function loadUsers(): Promise<StoredUser[]> {
  return (await readJson<StoredUser[]>(USERS_PATH)) ?? [];
}

async function saveUsers(users: StoredUser[]): Promise<void> {
  await writeJson(USERS_PATH, users);
}

export async function hasAnyUsers(): Promise<boolean> {
  const users = await loadUsers();
  return users.length > 0;
}

export async function getUserById(id: string): Promise<StoredUser | null> {
  const users = await loadUsers();
  return users.find((u) => u.id === id) ?? null;
}

export async function getUserByUsername(username: string): Promise<StoredUser | null> {
  const users = await loadUsers();
  return users.find((u) => u.username === username.toLowerCase()) ?? null;
}

export async function createUser(
  data: z.infer<typeof createUserSchema>,
  createdBy: string
): Promise<PublicUser> {
  const users = await loadUsers();
  if (users.some((u) => u.username === data.username)) {
    throw new Error("USERNAME_EXISTS");
  }
  const now = new Date().toISOString();
  const user: StoredUser = {
    id: generateId(),
    username: data.username,
    displayName: data.displayName,
    role: data.role,
    passwordHash: await hashPassword(data.password),
    tokenVersion: 1,
    createdAt: now,
    createdBy,
    updatedAt: now,
  };
  users.push(user);
  await saveUsers(users);
  return toPublicUser(user);
}

export async function updateUser(
  id: string,
  data: z.infer<typeof updateUserSchema>
): Promise<PublicUser> {
  const users = await loadUsers();
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) throw new Error("USER_NOT_FOUND");

  const user = users[index];

  // Guard: cannot demote last admin
  if (data.role && data.role !== "admin" && user.role === "admin") {
    const adminCount = users.filter((u) => u.role === "admin").length;
    if (adminCount <= 1) throw new Error("LAST_ADMIN");
  }

  if (data.displayName !== undefined) user.displayName = data.displayName;
  if (data.role !== undefined) user.role = data.role;
  if (data.password) {
    user.passwordHash = await hashPassword(data.password);
    user.tokenVersion += 1;
  }
  user.updatedAt = new Date().toISOString();

  users[index] = user;
  await saveUsers(users);
  return toPublicUser(user);
}

export async function deleteUser(id: string, requesterId: string): Promise<void> {
  const users = await loadUsers();
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) throw new Error("USER_NOT_FOUND");

  if (users[index].id === requesterId) throw new Error("CANNOT_DELETE_SELF");

  if (users[index].role === "admin") {
    const adminCount = users.filter((u) => u.role === "admin").length;
    if (adminCount <= 1) throw new Error("LAST_ADMIN");
  }

  users.splice(index, 1);
  await saveUsers(users);
}

export async function updateProfile(
  userId: string,
  data: z.infer<typeof profileUpdateSchema>
): Promise<PublicUser> {
  const users = await loadUsers();
  const index = users.findIndex((u) => u.id === userId);
  if (index === -1) throw new Error("USER_NOT_FOUND");

  const user = users[index];

  if (data.newPassword) {
    if (!data.currentPassword) throw new Error("CURRENT_PASSWORD_REQUIRED");
    const valid = await verifyPassword(data.currentPassword, user.passwordHash);
    if (!valid) throw new Error("WRONG_PASSWORD");
    user.passwordHash = await hashPassword(data.newPassword);
    user.tokenVersion += 1;
  }

  if (data.displayName !== undefined) user.displayName = data.displayName;
  user.updatedAt = new Date().toISOString();

  users[index] = user;
  await saveUsers(users);
  return toPublicUser(user);
}

// --- Migration ---

export async function migrateFromEnvVar(): Promise<number> {
  const raw = process.env.ADMIN_USERS;
  if (!raw) return 0;

  const pairs = raw.split(",").filter(Boolean);
  const users: StoredUser[] = [];
  const now = new Date().toISOString();

  for (const pair of pairs) {
    const [username, password] = pair.split(":");
    if (!username || !password) continue;
    users.push({
      id: generateId(),
      username: username.toLowerCase(),
      displayName: username,
      role: "admin",
      passwordHash: await hashPassword(password),
      tokenVersion: 1,
      createdAt: now,
      createdBy: "migration",
      updatedAt: now,
    });
  }

  if (users.length > 0) {
    await saveUsers(users);
    console.log(`[users] Migrated ${users.length} users from ADMIN_USERS env var.`);
  }
  return users.length;
}

// --- Helpers ---

export function toPublicUser(user: StoredUser): PublicUser {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash, ...publicUser } = user;
  return publicUser;
}
