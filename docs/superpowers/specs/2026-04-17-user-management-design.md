# User Management System Design

## Overview

Replace environment-variable-based auth with a file-based user management system supporting two roles (Admin, Editor), a setup wizard for first-run bootstrapping, and per-user edit tracking.

## Storage

Users stored in `content/settings/users.json`:

```json
[
  {
    "id": "u_abc123",
    "username": "ozan",
    "displayName": "Ozan",
    "role": "admin",
    "passwordHash": "scrypt-hashed-value",
    "createdAt": "2026-04-17T18:00:00.000Z",
    "createdBy": "setup"
  }
]
```

- Passwords hashed with Node.js `crypto.scrypt` (no new dependencies).
- Session token signing continues using `ADMIN_SECRET` env var and the existing simple hash.
- `ADMIN_USERS` env var is removed — users come from the JSON file.

## Setup Wizard

- When `users.json` doesn't exist or is empty, all `/admin` routes redirect to `/admin/setup`.
- `/admin/setup` shows a form: username, display name, password, confirm password.
- Creates the first user with `role: "admin"` and `createdBy: "setup"`.
- Once a user exists, `/admin/setup` redirects to `/admin/login`.

## Auth Changes

### Login (`/api/admin/auth`)
- Reads users from `users.json` instead of `ADMIN_USERS` env var.
- Verifies password using `crypto.scrypt` comparison.
- Session token includes username (role looked up from file on each request).

### Middleware (`src/middleware.ts`)
- Existing token verification stays the same.
- Add role-based route protection:
  - `/admin/users` and `/admin/users/*` — admin only.
  - `/admin/integrations/*` — admin only.
  - All other `/admin/*` routes — admin or editor.
- `/admin/setup` is public (like `/admin/login`).

## Roles & Permissions

| Action | Admin | Editor |
|--------|-------|--------|
| Edit pages/products/content | Yes | Yes |
| Upload images | Yes | Yes |
| Manage settings (analytics, cookies) | Yes | No |
| Manage users (add/edit/delete) | Yes | No |
| View dashboard | Yes | Yes |
| Change own password/profile | Yes | Yes |

## New Routes

### Pages
- `/admin/setup` — first-run setup wizard.
- `/admin/users` — user list (admin only).
- `/admin/profile` — change own display name and password.

### API
- `GET /api/admin/users` — list all users (admin only, passwords excluded).
- `POST /api/admin/users` — create user (admin only). Body: `{ username, displayName, role, password }`.
- `PUT /api/admin/users/[id]` — update user (admin only). Body: `{ displayName?, role?, password? }`.
- `DELETE /api/admin/users/[id]` — delete user (admin only, cannot delete self).
- `PUT /api/admin/profile` — update own displayName and/or password. Body: `{ displayName?, currentPassword?, newPassword? }`.

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
- Password change: current password, new password, confirm new password.
- Save button.

## Edit Log Enhancement

### Data Change
Add `username` field to edit-log entries:
```json
{
  "timestamp": "2026-04-17T18:00:00.000Z",
  "action": "update",
  "type": "product",
  "slug": "blade-signs",
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
- `src/lib/admin/users.ts` — user CRUD, password hashing, validation.

## Files to Modify
- `src/lib/admin/auth.ts` — read from users.json, scrypt password verification.
- `src/middleware.ts` — add setup redirect, role-based route protection.
- `src/app/(admin)/admin/layout.tsx` — add System section, update header with user dropdown.
- `src/app/api/admin/auth/route.ts` — use new auth functions.
- All content API routes — pass username to edit-log.
- `src/components/admin/DashboardWidget.tsx` or `RecentEditsWidget` — show username.

## Validation (Zod)
- Username: 3-30 chars, alphanumeric + underscores.
- Display name: 1-50 chars.
- Password: minimum 8 chars.
- Role: enum `admin` | `editor`.

## Security Notes
- Passwords hashed with `crypto.scrypt` (salt per user, stored alongside hash).
- No plaintext passwords stored anywhere.
- Admin cannot delete their own account (prevents lockout).
- Setup wizard only works when no users exist.
- `ADMIN_SECRET` env var still required for session token signing.
