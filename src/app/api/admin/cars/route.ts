import fs from 'fs';
import crypto from 'crypto';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
    try{
        const url = new URL(request.url);
        const searchParams = new URLSearchParams(url.searchParams);
        const item_id = searchParams.get('id');

        if(!item_id){
            return new Response(JSON.stringify({ message: "Invalid request" }), {
              status: 400,
              headers: { 'Content-Type': 'application/json' }
            });
        }

        const data = JSON.parse(fs.readFileSync(`src/app/api/stub/listedCars.json`, 'utf-8'));

        const requested_car = data.find((d:any) => d.id === item_id);

        if(!requested_car){
            return new Response(JSON.stringify({ message: "Item not found" }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify(requested_car), {
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
   
export async function POST(request: Request) {
    const body = await request.json();
    const { brand, model, cost, variant, safetyRating, stock } = body;
    
    const id = crypto.randomBytes(16).toString("hex");
    
    const cookieStore = await cookies();
    const session_id = cookieStore.get('session_id')?.value as string;
    
    const admin_data = JSON.parse(Buffer.from(session_id, 'base64').toString('ascii'));

    const curr_date = new Date();
    
    const new_car_data = { id, brand, model, cost, safetyRating: parseInt(safetyRating), stock: parseInt(stock), variant, admin_id: admin_data.id, created_on: curr_date, updated_on: curr_date };

    const data = JSON.parse(fs.readFileSync(`src/app/api/stub/listedCars.json`, 'utf-8'));

    data.push(new_car_data);

    fs.writeFileSync(`src/app/api/stub/listedCars.json`, JSON.stringify(data));
   
    return new Response(JSON.stringify(new_car_data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
}

export async function PUT(request: Request) {
    const body = await request.json();
    const { brand, model, cost, variant, safetyRating, stock, id } = body;

    if(!id){
        return new Response(JSON.stringify({ message: "Invalid request" }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const curr_date = new Date();

    let data = JSON.parse(fs.readFileSync(`src/app/api/stub/listedCars.json`, 'utf-8'));

    const car_to_update = data.find((d: any) => d.id === id);

    if(!car_to_update){
        return new Response(JSON.stringify({ message: "Invalid request" }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    car_to_update['brand'] = brand;
    car_to_update['model'] = model;
    car_to_update['variant'] = variant;
    car_to_update['stock'] = stock;
    car_to_update['safetyRating'] = safetyRating;
    car_to_update['cost'] = cost;
    car_to_update['updated_on'] = curr_date;

    data = data.map((d: any) => d.id === id ? { ...car_to_update } : d);

    fs.writeFileSync(`src/app/api/stub/listedCars.json`, JSON.stringify(data));
   
    return new Response(JSON.stringify(car_to_update), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
}


export async function DELETE(request: Request) {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const item_id = searchParams.get('id');

    if(!item_id){
        return new Response(JSON.stringify({ message: "Invalid request" }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
    }
    
    let data = JSON.parse(fs.readFileSync(`src/app/api/stub/listedCars.json`, 'utf-8'));

    data = data.filter((d: any) => d.id !== item_id);

    fs.writeFileSync(`src/app/api/stub/listedCars.json`, JSON.stringify(data));
   
    return new Response(JSON.stringify({ message: 'Success', id: item_id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
}