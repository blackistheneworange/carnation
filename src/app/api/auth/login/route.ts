import fs from 'fs';
import { cookies } from 'next/headers';
import { join } from 'path';

export async function POST(request: Request) {
    const body = await request.json();
    const { email, password } = body;
   
    try{
      const data = JSON.parse(fs.readFileSync(join(process.cwd(),'src/app/api/stub/users.json'), 'utf-8'));
      const user_data = data.find((dat:any) => dat.email === email && dat.password === password);

      if(!user_data){
        return new Response(JSON.stringify({ message: 'User does not exist' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      const cookieStore = await cookies();
      const encoded = Buffer.from(JSON.stringify({ email, id: user_data.id, user_type: 'user' })).toString('base64');

      cookieStore.set('session_id', encoded, { httpOnly: true });

      return new Response(JSON.stringify({ message: 'Success', user_type: 'user' }), {
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