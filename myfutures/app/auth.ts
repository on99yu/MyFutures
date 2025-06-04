import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import type { User } from "@/app/lib/definitions"
import { z } from "zod";
import {neon} from "@neondatabase/serverless";
import bcrypt from "bcryptjs";

const sql = neon(process.env.DATABASE_URL!);

async function getUser(email:string): Promise<User | undefined> {
  try{
    const result = await sql`SELECT * from users WHERE email=${email}`;
    const user = result as unknown as User[];
    return user[0];
  }catch(error){
    console.error("Failed to fetch user:",error);
    throw new Error("Failed to fetch user");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

          if(parsedCredentials.success){
            const {email,password} = parsedCredentials.data;
            const user = await getUser(email);
            if (!user) return null;
            const passwordsMatch = await bcrypt.compare(password,user.password_hash);
            if (passwordsMatch) return user;
          }
          console.log("Invalid credentials:", parsedCredentials.error);
          return null;
      },
    }),
  ],
});
