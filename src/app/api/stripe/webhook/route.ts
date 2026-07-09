import { prisma } from '@/lib/db';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  try {
    // Get customer from Stripe
    const customer = await stripe.customers.retrieve(subscription.customer as string);
    const customerEmail = (customer as any).email;

    if (!customerEmail) {
      console.error('No email found for customer');
      return;
    }

    console.log('Found customer email:', customerEmail);

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: customerEmail },
    });

    if (!user) {
      console.error('User not found for email:', customerEmail);
      return;
    }

    const userId = user.id;

    const existing = await prisma.subscription.findFirst({
      where: { userId },
    });

    if (existing) {
      await prisma.subscription.update({
        where: { id: existing.id },
        data: {
          stripeSubscriptionId: subscription.id,
          stripeCustomerId: subscription.customer as string,
          stripePriceId: subscription.items.data[0]?.price.id,
          status: subscription.status,
          planName: subscription.items.data[0]?.price.nickname || 'pro',
          stripeCurrentPeriodEnd: (subscription as any).current_period_end
            ? new Date((subscription as any).current_period_end * 1000)
            : null,
        },
      });
      console.log('Updated subscription for user:', userId);
    } else {
      await prisma.subscription.create({
        data: {
          userId,
          stripeSubscriptionId: subscription.id,
          stripeCustomerId: subscription.customer as string,
          stripePriceId: subscription.items.data[0]?.price.id,
          status: subscription.status,
          planName: subscription.items.data[0]?.price.nickname || 'pro',
          stripeCurrentPeriodEnd: (subscription as any).current_period_end
            ? new Date((subscription as any).current_period_end * 1000)
            : null,
        },
      });
      console.log('Created subscription for user:', userId);
    }
  } catch (error) {
    console.error('Error in handleSubscriptionCreated:', error);
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  try {
    const customer = await stripe.customers.retrieve(subscription.customer as string);
    const customerEmail = (customer as any).email;

    if (!customerEmail) {
      console.error('No email found for customer');
      return;
    }

    const user = await prisma.user.findUnique({
      where: { email: customerEmail },
    });

    if (!user) {
      console.error('User not found for email:', customerEmail);
      return;
    }

    const userId = user.id;

    const existing = await prisma.subscription.findFirst({
      where: { userId },
    });

    if (existing) {
      await prisma.subscription.update({
        where: { id: existing.id },
        data: {
          status: subscription.status,
          stripeCurrentPeriodEnd: (subscription as any).current_period_end
            ? new Date((subscription as any).current_period_end * 1000)
            : null,
        },
      });
      console.log('Updated subscription status for user:', userId);
    }
  } catch (error) {
    console.error('Error in handleSubscriptionUpdated:', error);
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  try {
    const customer = await stripe.customers.retrieve(subscription.customer as string);
    const customerEmail = (customer as any).email;

    if (!customerEmail) {
      console.error('No email found for customer');
      return;
    }

    const user = await prisma.user.findUnique({
      where: { email: customerEmail },
    });

    if (!user) {
      console.error('User not found for email:', customerEmail);
      return;
    }

    const userId = user.id;

    const existing = await prisma.subscription.findFirst({
      where: { userId },
    });

    if (existing) {
      await prisma.subscription.update({
        where: { id: existing.id },
        data: {
          status: 'canceled',
        },
      });
      console.log('Canceled subscription for user:', userId);
    }
  } catch (error) {
    console.error('Error in handleSubscriptionDeleted:', error);
  }
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = (await headers()).get('stripe-signature') || '';

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error(`Webhook Error: ${(err as Error).message}`);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case 'customer.subscription.created':
        await handleSubscriptionCreated(
          event.data.object as Stripe.Subscription
        );
        break;
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(
          event.data.object as Stripe.Subscription
        );
        break;
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(
          event.data.object as Stripe.Subscription
        );
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}