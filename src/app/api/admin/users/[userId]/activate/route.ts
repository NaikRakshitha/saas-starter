import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/requireAdmin';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const admin = await requireAdmin();

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Activate subscription
    await prisma.subscription.updateMany({
      where: { userId: userId },
      data: { status: 'active' },
    });

    // Log the action
    await prisma.adminLog.create({
      data: {
        adminId: admin.id,
        action: 'user_activated',
        targetId: userId,
        details: JSON.stringify({
          userEmail: user.email,
          userName: user.name,
        }),
      },
    });

    return NextResponse.json({
      message: 'User activated successfully',
      userId: userId,
    });
  } catch (error) {
    console.error('Activate user error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}