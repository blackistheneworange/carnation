import fs from 'fs';
import crypto from 'crypto';
import { cookies } from 'next/headers';
import { getMonths } from '@/utils/getMonths';

const updateInventory = (car_id: any) => {
    const data = JSON.parse(fs.readFileSync(`src/app/api/stub/listedCars.json`, 'utf-8'));
    const updated_data = data.map((d:any) => d.id === car_id ? {...d, stock: d.stock-1} : d);

    fs.writeFileSync(`src/app/api/stub/listedCars.json`, JSON.stringify(updated_data));
}

const checkStockAvailability = async (car_id: any) => {
    const data = JSON.parse(fs.readFileSync(`src/app/api/stub/listedCars.json`, 'utf-8'));
    const is_stock_available = data.find((d:any) => d.id === car_id)?.stock > 0;

    return is_stock_available;
}

export async function GET() {
    try{
        const cookieStore = await cookies();
        const session_id = cookieStore.get('session_id')?.value as string;
        
        const user_data = JSON.parse(Buffer.from(session_id, 'base64').toString('ascii'));

        const data = JSON.parse(fs.readFileSync(`src/app/api/stub/purchasedCars.json`, 'utf-8'));

        const filtered_data = data.filter((d:any) => d.user_id === user_data.id);

        return new Response(JSON.stringify(filtered_data), {
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
    const { id: car_id, brand, model, cost, variant } = body;

    if(!await checkStockAvailability(car_id)){
        return new Response(JSON.stringify({ message: "Out of stock" }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
    }
    
    const id = crypto.randomBytes(16).toString("hex");
    
    const cookieStore = await cookies();
    const session_id = cookieStore.get('session_id')?.value as string;
    
    const user_data = JSON.parse(Buffer.from(session_id, 'base64').toString('ascii'));

    const date = new Date();
    const purchased_date = `${getMonths()[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    
    const purchased_car_data = { id, car_id, brand, model, cost, variant, user_id: user_data.id, purchased_date };

    const data = JSON.parse(fs.readFileSync(`src/app/api/stub/purchasedCars.json`, 'utf-8'));

    data.push(purchased_car_data);

    fs.writeFileSync(`src/app/api/stub/purchasedCars.json`, JSON.stringify(data));

    updateInventory(car_id);
   
    return new Response(JSON.stringify(purchased_car_data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
}