import { cookies } from 'next/headers';

export async function POST() {
    try{
        const cookieStore = await cookies();
        cookieStore.delete('session_id');

        return new Response("", {
            status: 200
        });
    }
    catch(err){
        return new Response(JSON.stringify({ message: "Server error" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}