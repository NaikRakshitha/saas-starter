import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/requireAdmin';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ flagId: string }> }
) {
  try {
    await requireAdmin();

    const { flagId } = await params;
    const { userId, enabled } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const userFlag = await prisma.userFeatureFlag.upsert({
      where: {
        userId_featureFlagId: {
          userId,
          featureFlagId: flagId,
        },
      },
      create: {
        userId,
        featureFlagId: flagId,
        enabled: enabled || false,
      },
      update: {
        enabled: enabled || false,
      },
    });

    return NextResponse.json(userFlag);
  } catch (error) {
    console.error('Toggle user feature flag error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}