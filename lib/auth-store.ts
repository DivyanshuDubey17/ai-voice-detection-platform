import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

export type StoredUser = {
  id: string;
  name: string;
  class: string;
  rollNo: string;
  email: string;
  passwordHash: string;
  salt: string;
  createdAt: string;
};

// In-memory store for demo. Replace with a database (e.g. Prisma + PostgreSQL) for production.
const users = new Map<string, StoredUser>();
const byEmail = new Map<string, string>(); // email -> id

const SALT_LEN = 16;
const KEY_LEN = 64;

function hashPassword(password: string, salt: string): string {
  return scryptSync(password, salt, KEY_LEN).toString("base64");
}

export function registerUser(params: {
  name: string;
  class: string;
  rollNo: string;
  email: string;
  password: string;
}): { ok: true; userId: string } | { ok: false; error: string } {
  const email = params.email.trim().toLowerCase();
  if (byEmail.has(email)) {
    return { ok: false, error: "An account with this email already exists." };
  }
  const salt = randomBytes(SALT_LEN).toString("base64");
  const passwordHash = hashPassword(params.password, salt);
  const id = randomBytes(12).toString("base64url");
  const user: StoredUser = {
    id,
    name: params.name.trim(),
    class: params.class.trim(),
    rollNo: params.rollNo.trim(),
    email,
    passwordHash,
    salt,
    createdAt: new Date().toISOString(),
  };
  users.set(id, user);
  byEmail.set(email, id);
  return { ok: true, userId: id };
}

export function verifyCredentials(
  email: string,
  password: string
): StoredUser | null {
  const id = byEmail.get(email.trim().toLowerCase());
  if (!id) return null;
  const user = users.get(id);
  if (!user) return null;
  const hash = hashPassword(password, user.salt);
  if (!timingSafeEqual(Buffer.from(user.passwordHash, "base64"), Buffer.from(hash, "base64"))) {
    return null;
  }
  return user;
}

export function getUserById(id: string): StoredUser | null {
  return users.get(id) ?? null;
}
