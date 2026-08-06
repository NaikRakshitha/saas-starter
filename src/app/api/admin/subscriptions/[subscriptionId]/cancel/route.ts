import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/requireAdmin';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ subscriptionId: string }> }
) {
  try {
    const { subscriptionId } = await params;
    const admin = await requireAdmin();

    const subscription = await prisma.subscription.findUnique({
      where: { id: subscriptionId },
      include: { user: true },
    });

    if (!subscription) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      );
    }

    // Cancel in Stripe if exists
    if (subscription.stripeSubscriptionId) {
      await stripe.subscriptions.cancel(
        subscription.stripeSubscriptionId
      );
    }

    // Update in database
    await prisma.subscription.update({
      where: { id: subscriptionId },
      data: { status: 'cancelled' },
    });

    // Log the action
    await prisma.adminLog.create({
      data: {
        adminId: admin.id,
        action: 'subscription_cancelled',
        targetId: subscriptionId,
        details: JSON.stringify({
          userEmail: subscription.user.email,
          planName: subscription.planName,
        }),
      },
    });

    return NextResponse.json({
      message: 'Subscription cancelled successfully',
      subscriptionId: subscriptionId,
    });
  } catch (error) {
    console.error('Cancel subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}