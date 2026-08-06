import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/requireAdmin';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();

    const flags = await prisma.featureFlag.findMany({
      include: {
        userFlags: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(flags);
  } catch (error) {
    console.error('Get feature flags error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();

    const { name, description, percentage } = await req.json();

    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    const flag = await prisma.featureFlag.create({
      data: {
        name,
        description,
        percentage: percentage || 0,
      },
    });

    return NextResponse.json(flag, { status: 201 });
  } catch (error) {
    console.error('Create feature flag error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}