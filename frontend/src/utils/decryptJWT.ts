import jwt from 'jsonwebtoken';

export function decrypt(token: string) {
  try {
    const decoded = jwt.decode(token);
    return decoded;
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return null;
  }
}
