/**
 * Usage: npm run hash-password -- "your-admin-password"
 * Prints the value for ADMIN_PASSWORD_HASH_B64. The bcrypt hash is
 * base64-encoded so the "$" characters can't be mangled by .env parsing.
 */
import bcrypt from "bcryptjs";

const password = process.argv[2];

if (!password || password.length < 10) {
  console.error('Usage: npm run hash-password -- "a-password-of-10+-characters"');
  process.exit(1);
}

const hash = await bcrypt.hash(password, 12);
console.log("\nAdd this to your .env (and to your Vercel environment variables):\n");
console.log(`ADMIN_PASSWORD_HASH_B64=${Buffer.from(hash).toString("base64")}\n`);


// 'vikramAdmin2026'