import { prisma } from './db';

/**
 * Check if a feature flag is enabled for a user
 * Uses percentage rollout and user-specific overrides
 */
export async function isFeatureEnabled(
  featureName: string,
  userId?: string
): Promise<boolean> {
  try {
    // Get the feature flag
    const flag = await prisma.featureFlag.findUnique({
      where: { name: featureName },
    });

    // Flag doesn't exist = disabled
    if (!flag) return false;

    // Flag is disabled globally
    if (!flag.enabled) return false;

    // No user specified = use percentage
    if (!userId) {
      return Math.random() * 100 < flag.percentage;
    }

    // Check user-specific override
    const userFlag = await prisma.userFeatureFlag.findUnique({
      where: {
        userId_featureFlagId: {
          userId,
          featureFlagId: flag.id,
        },
      },
    });

    // If user has override, use it
    if (userFlag) {
      return userFlag.enabled;
    }

    // Otherwise use percentage
    return Math.random() * 100 < flag.percentage;
  } catch (error) {
    console.error('Feature flag error:', error);
    return false;
  }
}

/**
 * Get all feature flags
 */
export async function getAllFeatureFlags() {
  return await prisma.featureFlag.findMany({
    include: {
      userFlags: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

/**
 * Create a new feature flag
 */
export async function createFeatureFlag(
  name: string,
  description?: string,
  percentage: number = 0
) {
  return await prisma.featureFlag.create({
    data: {
      name,
      description,
      percentage,
    },
  });
}

/**
 * Update a feature flag
 */
export async function updateFeatureFlag(
  flagId: string,
  data: {
    enabled?: boolean;
    percentage?: number;
    description?: string;
  }
) {
  return await prisma.featureFlag.update({
    where: { id: flagId },
    data,
  });
}

/**
 * Toggle feature for specific user
 */
export async function setUserFeatureFlag(
  userId: string,
  featureFlagId: string,
  enabled: boolean
) {
  return await prisma.userFeatureFlag.upsert({
    where: {
      userId_featureFlagId: {
        userId,
        featureFlagId,
      },
    },
    create: {
      userId,
      featureFlagId,
      enabled,
    },
    update: {
      enabled,
    },
  });
}