'use client';

import { adminApi } from '@/lib/adminApi';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface Subscription {
  id: string;
  status: string | null;
  planName: string | null;
  stripeCurrentPeriodEnd: Date | null;
  user: {
    email: string | null;
  };
}

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadSubscriptions();
  }, []);

  async function loadSubscriptions() {
    try {
      const response = await fetch('/api/admin/subscriptions');
      if (!response.ok) throw new Error('Failed to load subscriptions');
      const data = await response.json();
      setSubscriptions(data);
    } catch (error) {
      toast.error('Failed to load subscriptions');
    } finally {
      setLoading(false);
    }
  }

  async function handleCancelSubscription(
    subscriptionId: string,
    userEmail: string | null
  ) {
    if (!confirm(`Cancel subscription for ${userEmail}? This cannot be undone.`)) {
      return;
    }

    setActionLoading(subscriptionId);
    try {
      await adminApi.cancelSubscription(subscriptionId);
      router.refresh();
      await loadSubscriptions();
    } catch (error) {
      // Error already shown by adminApi
    } finally {
      setActionLoading(null);
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Loading subscriptions...</p>
      </div>
    );
  }

  const mrr = subscriptions
    .filter((s) => s.status === 'active')
    .reduce((total) => total + 29, 0);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Subscriptions</h1>

      {/* MRR Overview */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <p className="text-gray-600 text-sm">Monthly Recurring Revenue</p>
        <p className="text-4xl font-bold text-green-600">${mrr}</p>
      </div>

      {/* Subscriptions Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                User Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Plan
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Monthly Revenue
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Next Billing
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {subscriptions.map((sub) => (
              <tr key={sub.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">
                  {sub.user.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {sub.planName || 'Standard'}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      sub.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : sub.status === 'paused'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {sub.status || 'Active'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                  $29
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {sub.stripeCurrentPeriodEnd
                    ? new Date(sub.stripeCurrentPeriodEnd).toLocaleDateString()
                    : 'N/A'}
                </td>
                <td className="px-6 py-4 text-sm">
                  {sub.status !== 'cancelled' && (
                    <button
                      onClick={() =>
                        handleCancelSubscription(sub.id, sub.user.email)
                      }
                      disabled={actionLoading === sub.id}
                      className="text-red-600 hover:text-red-800 disabled:opacity-50"
                    >
                      {actionLoading === sub.id ? 'Cancelling...' : 'Cancel'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-gray-600 text-sm mt-4">
        Total Subscriptions: <strong>{subscriptions.length}</strong>
      </p>
    </div>
  );
}