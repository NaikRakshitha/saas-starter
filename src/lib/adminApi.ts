import toast from 'react-hot-toast';

export const adminApi = {
  // Suspend user
  async suspendUser(userId: string) {
    try {
      const response = await fetch(
        `/api/admin/users/${userId}/suspend`,
        { method: 'POST' }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to suspend user');
      }

      const data = await response.json();
      toast.success('User suspended successfully');
      return data;
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to suspend user'
      );
      throw error;
    }
  },

  // Activate user
  async activateUser(userId: string) {
    try {
      const response = await fetch(
        `/api/admin/users/${userId}/activate`,
        { method: 'POST' }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to activate user');
      }

      const data = await response.json();
      toast.success('User activated successfully');
      return data;
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to activate user'
      );
      throw error;
    }
  },

  // Cancel subscription
  async cancelSubscription(subscriptionId: string) {
    try {
      const response = await fetch(
        `/api/admin/subscriptions/${subscriptionId}/cancel`,
        { method: 'POST' }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to cancel subscription');
      }

      const data = await response.json();
      toast.success('Subscription cancelled successfully');
      return data;
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to cancel subscription'
      );
      throw error;
    }
  },

  // Get user details
  async getUserDetails(userId: string) {
    try {
      const response = await fetch(`/api/admin/users/${userId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }

      return await response.json();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to fetch user'
      );
      throw error;
    }
  },

  // Get subscription details
  async getSubscriptionDetails(subscriptionId: string) {
    try {
      const response = await fetch(
        `/api/admin/subscriptions/${subscriptionId}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch subscription');
      }

      return await response.json();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to fetch subscription'
      );
      throw error;
    }
  },

  // Get admin logs
  async getAdminLogs() {
    try {
      const response = await fetch('/api/admin/logs');

      if (!response.ok) {
        throw new Error('Failed to fetch logs');
      }

      return await response.json();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to fetch logs'
      );
      throw error;
    }
  },
};