import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/requireAdmin';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // Protect endpoint
    await requireAdmin();

    const users = await prisma.user.findMany({
      include: {
        subscriptions: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}