import fs from 'fs';
import crypto from 'crypto';
import path from 'path';

export async function POST(request: Request) {
    const body = await request.json();
    const { email, password } = body;
   
    try{
      const data = JSON.parse(fs.readFileSync(path.join('src/app/api/stub/', 'users.json'), 'utf-8'));
      const existing_user_data = data.find((dat:any) => dat.email === email);

      if(existing_user_data){
        return new Response(JSON.stringify({ message: 'User already exists with the provided email address' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      const id = crypto.randomBytes(16).toString("hex");

      data.push({
        id,
        email,
        password
      })

      fs.writeFileSync(path.join('src/app/api/stub/', 'users.json'), JSON.stringify(data));

      return new Response(JSON.stringify({ message: 'Success' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    catch(err){
      return new Response(JSON.stringify({ message: "Server error" }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
}