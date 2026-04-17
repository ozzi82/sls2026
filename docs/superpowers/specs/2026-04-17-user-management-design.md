# User Management System Design

## Overview

Replace environment-variable-based auth with a file-based user management system supporting two roles (Admin, Editor), a setup wizard for first-run bootstrapping, and per-user edit tracking.

## Storage

Users stored in `content/settings/users.json`:

```json
[
  {
    "id": "u_1713380400000_a1b2c3",
    "username": "ozan",
    "displayName": "Ozan",
    "role": "admin",
    "passwordHash": "hex-salt:hex-hash",
    "createdAt": "2026-04-17T18:00:00.000Z",
    "createdBy": "setup",
    "updatedAt": "2026-04-17T18:00:00.000Z"
  }
]
```

- **ID format:** `u_` + timestamp + `_` + 6 random hex chars.
- **Password hash format:** `hex-salt:hex-hash` — 32-byte random salt, 64-byte scrypt-derived key, both hex-encoded, joined by colon.
- Passwords hashed with Node.js `crypto.scrypt` (no new dependencies).
- Session token format: `username:role:signature` — role encoded in token so middleware can check permissions without file reads.
- `ADMIN_USERS` env var is removed — users come from the JSON file.
- `ADMIN_SECRET` env var stays for session token signing.
- Usernames are case-insensitive (stored lowercase, compared lowercase).

## Migration from ADMIN_USERS

On first startup after upgrade, if `users.json` does not exist but `ADMIN_USERS` env var is set:
1. Parse existing `ADMIN_USERS` entries.
2. Create `users.json` with those users as admins, passwords hashed.
3. Log a message: "Migrated N users from ADMIN_USERS env var."
4. The env var can then be removed — it is no longer checked after migration.

If neither `users.json` nor `ADMIN_USERS` exists, the setup wizard activates.

## Setup Wizard

- When `users.json` doesn't exist or is empty (and no `ADMIN_USERS` to migrate), all `/admin` routes redirect to `/admin/setup`.
- `/admin/setup` shows a form: username, display name, password, confirm password.
- Creates the first user with `role: "admin"` and `createdBy: "setup"`.
- Once a user exists, `/admin/setup` redirects to `/admin/login`.
- Setup redirect is handled by the login page (server component checks for users), not middleware (avoids Edge Runtime file read issues).

## Auth Changes

### Login (`/api/admin/auth`)
- Reads users from `users.json` instead of `ADMIN_USERS` env var.
- Verifies password using `crypto.scrypt` comparison.
- Session token format: `username:role:signature` — role is included so middleware doesn't need file access.
- Role changes require re-login to take effect (acceptable tradeoff).

### Middleware (`src/middleware.ts`)
- Runs in Edge Runtime (no file reads).
- Extracts role from session token (`username:role:signature`).
- Role-based route protection:
  - `/admin/users` and `/admin/users/*` — admin only.
  - `/admin/integrations/*` — admin only.
  - All other `/admin/*` routes — admin or editor.
- `/admin/setup` is public (like `/admin/login`).

### Session Invalidation
- Each user has a `tokenVersion` field (integer, starts at 1).
- `tokenVersion` is included in the session token signature.
- Changing a password or being deleted increments/invalidates the version.
- Middleware verifies signature which includes the version — stale tokens fail verification.
- Note: since middleware can't read files in Edge, full invalidation happens at the API layer (API routes verify token version against `users.json`). Middleware only checks the cryptographic signature.

## Roles & Permissions

| Action | Admin | Editor |
|--------|-------|--------|
| Edit pages/products/content | Yes | Yes |
| Upload images | Yes | Yes |
| Manage settings (analytics, cookies) | Yes | No |
| Manage users (add/edit/delete) | Yes | No |
| View dashboard | Yes | Yes |
| Change own password/profile | Yes | Yes |

**Guards:**
- Admin cannot delete their own account (prevents lockout).
- Cannot change role of the last remaining admin (prevents lockout).

## New Routes

### Pages
- `/admin/setup` — first-run setup wizard.
- `/admin/users` — user list (admin only).
- `/admin/profile` — change own display name and password.

### API
- `GET /api/admin/users` — list all users (admin only, passwordHash excluded from response). Returns `{ users: User[] }`.
- `POST /api/admin/users` — create user (admin only). Body: `{ username, displayName, role, password }`. Returns `{ user: User }`. Returns 409 if username already exists.
- `PUT /api/admin/users/[id]` — update user (admin only). Body: `{ displayName?, role?, password? }`. Admin can reset another user's password without knowing the old one. Returns `{ user: User }`.
- `DELETE /api/admin/users/[id]` — delete user (admin only, cannot delete self, cannot delete last admin). Returns `{ success: true }`.
- `PUT /api/admin/profile` — update own displayName and/or password. Body: `{ displayName?, currentPassword, newPassword? }`. `currentPassword` is **required** when `newPassword` is provided. Returns `{ user: User }`.

All error responses follow existing pattern: `{ error: string }` with appropriate HTTP status.

## UI Changes

### Sidebar
Add a **System** section (admin only) below Integrations:
```
System
  - Users (/admin/users)
```

### Header
Replace plain "Logout" button with a user avatar/icon showing the current user's display name. Clicking opens a dropdown with:
- Profile link
- Logout button

### Users Page (`/admin/users`)
- Table: username, display name, role, created date.
- "Add User" button opens an inline form or modal.
- Edit button per row — change display name, role, or reset password.
- Delete button per row — confirmation required, cannot delete self.

### Profile Page (`/admin/profile`)
- Display name field (editable).
- Password change: current password (required), new password, confirm new password.
- Save button.

## Edit Log Enhancement

### Data Change
Add `username` field to existing edit-log entries (keeping existing field names `pageType`, `slug`, `label`):
```json
{
  "timestamp": "2026-04-17T18:00:00.000Z",
  "pageType": "product",
  "slug": "blade-signs",
  "label": "Blade Signs",
  "username": "ozan"
}
```

### API Change
All content-saving API routes extract the username from the session cookie and pass it to the edit-log writer.

### Dashboard Change
"Recent Edits" widget displays the username next to each entry.

## Files to Create
- `src/app/(admin)/admin/setup/page.tsx`
- `src/app/(admin)/admin/users/page.tsx`
- `src/app/(admin)/admin/profile/page.tsx`
- `src/app/api/admin/users/route.ts`
- `src/app/api/admin/users/[id]/route.ts`
- `src/app/api/admin/profile/route.ts`
- `src/lib/admin/users.ts` — user CRUD, password hashing, validation, migration.

## Files to Modify
- `src/lib/admin/auth.ts` — read from users.json, scrypt password verification, new token format with role.
- `src/middleware.ts` — extract role from token, role-based route protection.
- `src/app/(admin)/admin/layout.tsx` — add System section, update header with user dropdown.
- `src/app/api/admin/auth/route.ts` — use new auth functions, include role in token.
- All content API routes (`products/[slug]`, `pages/[slug]`, `static-pages/[slug]`) — pass username to edit-log.
- `src/lib/admin/site-settings-types.ts` — add `username` to `EditLogEntry` interface.
- `src/lib/admin/site-settings.ts` — accept username param in `appendEditLog`.
- `src/components/admin/RecentEditsWidget.tsx` — show username column.

## Validation (Zod)
- Username: 3-30 chars, lowercase alphanumeric + underscores. Case-insensitive (normalized to lowercase).
- Display name: 1-50 chars.
- Password: minimum 8 chars.
- Role: enum `admin` | `editor`.

## Security Notes
- Passwords hashed with `crypto.scrypt` (32-byte random salt, 64-byte derived key).
- No plaintext passwords stored anywhere.
- Admin cannot delete their own account (prevents lockout).
- Cannot demote the last remaining admin (prevents lockout).
- Setup wizard only works when no users exist.
- `ADMIN_SECRET` env var still required for session token signing.
- Token version invalidates sessions on password change or user deletion.
- Tech debt: `simpleHash` for session tokens should eventually be replaced with `crypto.createHmac('sha256', secret)`.
