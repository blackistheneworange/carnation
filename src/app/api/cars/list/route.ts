import fs from 'fs';

export async function GET(request: Request) {
    try{
        const data = fs.readFileSync(`src/app/api/stub/listedCars.json`, 'utf-8');
        return new Response(JSON.stringify(data), {
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
   
//   export async function POST(request: Request) {
//     const body = await request.json();
//     const { name } = body;
   
//     const newUser = { id: Date.now(), name };
   
//     return new Response(JSON.stringify(newUser), {
//       status: 201,
//       headers: { 'Content-Type': 'application/json' }
//     });
//   }