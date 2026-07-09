import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { createCheckoutSession } from '@/lib/stripe';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { priceId } = await req.json();

    if (!priceId) {
      return NextResponse.json(
        { error: 'Price ID required' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    console.log('Creating checkout session for user:', user.id);

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const checkoutSession = await createCheckoutSession({
      email: session.user.email,
      priceId,
      userId: user.id,
      successUrl: `${appUrl}/dashboard?success=true`,
      cancelUrl: `${appUrl}/pricing?cancelled=true`,
    });

    console.log('Checkout session created:', checkoutSession.id);

    return NextResponse.json({
      url: checkoutSession.url,
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}