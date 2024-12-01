import { neon } from '@neondatabase/serverless';


export async function GET() {

    try {

        const sql = neon(`${process.env.EXPO_PUBLIC_NEON_DB_URI}`);

        const response = await sql`SELECT * FROM drivers`;

        return Response.json({
            data: response
        });
        
    } catch (error) {
        
        console.log(error);

        return Response.json({
            error: error
        });
        
    }

}