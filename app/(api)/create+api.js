import { Stripe } from 'stripe';


const stripe = new Stripe(process.env.EXPO_PUBLIC_STRIPE_SECRET_KEY, {
  apiVersion: '2024-11-20.acacia',
});


export async function POST(request) {

  try {

    const { name, email, amount } = await request.json();

    if (!name || !email || !amount) {
      return new Response(
        JSON.stringify({ error: 'Please provide valid name, email, and amount.' }),
        { status: 400 }
      );
    }


    let customer = (await stripe.customers.list({ email })).data[0];


    if (!customer) {
      customer = await stripe.customers.create({ name, email });
    }

    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: '2024-11-20.acacia' }
    );


    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(amount) * 100,
      currency: 'inr',
      customer: customer.id,
      automatic_payment_methods: { enabled: true },
    });


    return new Response(
      JSON.stringify({
        paymentIntent,
        ephemeralKey: { secret: ephemeralKey.secret },
        customer: customer.id,
      }),
      { status: 200 }
    );

  } catch (error) {

    console.error(error);

    return new Response(JSON.stringify({ error: error.message }), { status: 500 });

  }
  
}
