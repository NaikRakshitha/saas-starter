import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-06-24.dahlia',
  typescript: true,
});

export async function createCheckoutSession({
  email,
  priceId,
  userId,
  successUrl,
  cancelUrl,
}: {
  email: string;
  priceId: string;
  userId: string;
  successUrl: string;
  cancelUrl: string;
}) {
    console.log('createCheckoutSession called with userId:', userId);
  const session = await stripe.checkout.sessions.create({
    customer_email: email,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      userId,
    },
  });

  console.log('Session metadata:', session.metadata);

  return session;
}

export async function getStripeCustomer(customerId: string) {
  return stripe.customers.retrieve(customerId);
}

export async function createPortalSession({
  customerId,
  returnUrl,
}: {
  customerId: string;
  returnUrl: string;
}) {
  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });

  return portalSession;
}