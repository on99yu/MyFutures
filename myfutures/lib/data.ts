import { neon } from "@neondatabase/serverless";

// const sql = neon(process.env.DATABASE_URL!);

export async function getUser(email: string) {
  const sql = neon(process.env.DATABASE_URL!);
  const result = await sql`
    SELECT id, email, name, password_hash
    FROM users
    WHERE email = ${email}
    LIMIT 1;
  `;
  return result[0];
}
