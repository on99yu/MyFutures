import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";


export async function POST(req:Request){

    const sql = neon(process.env.DATABASE_URL!)
    try{
        const {name, email,password} = await req.json();

        if(!name || !email|| !password){
            return NextResponse.json({error:"모든 필드를 입력하세요"},{status:400})
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const result = await sql`INSERT INTO users (username, email, password_hash)
                                VALUES (${name}, ${email}, ${hashedPassword})
                                RETURNING userid, username, email, created_at`

        return NextResponse.json({ user:result[0]},{status:201});
    }catch(error:any){
        console.error("회원가입 오류",error);

        if(error.code === "23505"){ // Unique violation
            return NextResponse.json({error:"이미 사용중인 이메일입니다."},{status:409});
        }
        return NextResponse.json({error:"서버 오류"},{status:500});
    }
}