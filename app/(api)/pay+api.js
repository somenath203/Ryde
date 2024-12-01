import { Stripe } from 'stripe';

const stripe = new Stripe(process.env.EXPO_PUBLIC_STRIPE_SECRET_KEY, {
  apiVersion: '2024-11-20.acacia',
});


export async function POST(request) {

  try {

    const { payment_method_id, payment_intent_id, customer_id } = await request.json();

    if (!payment_method_id || !payment_intent_id || !customer_id) {

      return new Response(JSON.stringify({ error: 'Missing required fields.' }), { status: 400 });

    }

    await stripe.paymentMethods.attach(payment_method_id, { customer: customer_id });

    const result = await stripe.paymentIntents.confirm(payment_intent_id, {
      payment_method: payment_method_id,
    });

    
    return new Response(JSON.stringify({ success: true, result }), { status: 200 });
    
  } catch (error) {
    
    console.error(error);
    
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });

  }
  
}
