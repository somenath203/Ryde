import { neon } from '@neondatabase/serverless';


export async function POST(request) {

  try {


    const sql = neon(`${process.env.EXPO_PUBLIC_NEON_DB_URI}`);

    
    const { fullName, email, clerkId } = await request.json();


    if (!fullName || !email || !clerkId) {
        return Response.json(
            { error: "Missing required fields" },
            { status: 400 },
        );
    }


    const response = await sql`
            INSERT INTO users (fullName, email, clerkId)
            VALUES (${fullName}, ${email}, ${clerkId})
        `;


    return new Response(JSON.stringify({ data: response }), {
        status: 201,
    });


  } catch (error) {

    console.error("Error creating user:", error);

    return Response.json({ error: "Internal Server Error" }, { status: 500 });

  }
  
}
