import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/requireAdmin';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }  // Changed!
) {
  try {
    // Await params!
    const { userId } = await params;

    // Protect endpoint - only admins can suspend
    const admin = await requireAdmin();

    // Find user
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Suspend subscription
    await prisma.subscription.updateMany({
      where: { userId: userId },
      data: { status: 'paused' },
    });

    // Log the action
    await prisma.adminLog.create({
      data: {
        adminId: admin.id,
        action: 'user_suspended',
        targetId: userId,
        details: JSON.stringify({
          userEmail: user.email,
          userName: user.name,
        }),
      },
    });

    return NextResponse.json({
      message: 'User suspended successfully',
      userId: userId,
    });
  } catch (error) {
    console.error('Suspend user error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error details:', errorMessage);
    
    return NextResponse.json(
      { error: errorMessage || 'Internal server error' },
      { status: 500 }
    );
  }
}