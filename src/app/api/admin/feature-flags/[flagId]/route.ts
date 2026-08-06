import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/requireAdmin';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ flagId: string }> }
) {
  try {
    await requireAdmin();

    const { flagId } = await params;

    const flag = await prisma.featureFlag.findUnique({
      where: { id: flagId },
      include: {
        userFlags: true,
      },
    });

    if (!flag) {
      return NextResponse.json(
        { error: 'Feature flag not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(flag);
  } catch (error) {
    console.error('Get feature flag error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ flagId: string }> }
) {
  try {
    await requireAdmin();

    const { flagId } = await params;
    const { enabled, percentage, description } = await req.json();

    const flag = await prisma.featureFlag.update({
      where: { id: flagId },
      data: {
        ...(enabled !== undefined && { enabled }),
        ...(percentage !== undefined && { percentage }),
        ...(description !== undefined && { description }),
      },
    });

    return NextResponse.json(flag);
  } catch (error) {
    console.error('Update feature flag error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}