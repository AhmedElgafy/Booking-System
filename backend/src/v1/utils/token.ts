import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret"; // should be in .env
export const JWT_EXPIRES_IN = "1d"; // 1 day (adjust as needed)

// ---------------- CREATE TOKEN ----------------
export function generateToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

// ---------------- VERIFY TOKEN ----------------
export function verifyToken<T>(token: string): T | null {
  try {
    return jwt.verify(token, JWT_SECRET) as T;
  } catch (err) {
    throw err;
  }
}
