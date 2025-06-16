import { cookies } from 'next/headers';

export async function GET() {
    try{
        const cookieStore = await cookies();
        const session_id = cookieStore.get('session_id')?.value as string;

        const user_data = JSON.parse(Buffer.from(session_id, 'base64').toString('ascii'));

        if(!user_data){
            return new Response(JSON.stringify({ message: "Unauthorized" }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify({ authenticated: true, user_type: user_data.user_type }), {
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