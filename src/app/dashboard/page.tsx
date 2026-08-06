'use client';

import Header from '@/components/Header';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Subscription {
  planName: string;
  status: string;
  stripeCurrentPeriodEnd: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user?.id) {
      fetchSubscription();
    }
  }, [session?.user?.id]);

  const fetchSubscription = async () => {
    try {
      const response = await fetch('/api/subscription');
      const data = await response.json();
      setSubscription(data);
    } catch (error) {
      console.error('Error fetching subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }



  if (!session) {
    router.push('/auth/login');
    return null; // or a loading spinner
  }

  const isAdmin = session?.user?.role === 'ADMIN';
  console.log('User role:', session?.user?.role);

  const isActive = subscription?.status === 'active';
  const planName = subscription?.planName || 'Free';
  const nextBillingDate = subscription?.stripeCurrentPeriodEnd
    ? new Date(subscription.stripeCurrentPeriodEnd).toLocaleDateString()
    : null;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-50">
        <div className="bg-white border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
                <p className="mt-1 text-sm text-slate-600">Welcome back, {session.user?.name || session.user?.email}</p>
                {isAdmin && (
                  <p className="mt-1 text-sm text-blue-600 font-medium">👑 Admin Access Enabled</p>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                {isAdmin && (
                  <Link
                    href="/admin/dashboard"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors text-center"
                  >
                    🔑 Admin Panel
                  </Link>
                )}
                <button 
                  onClick={() => signOut({ redirect: true, callbackUrl: '/auth/login' })}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Subscription Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <p className="text-sm font-medium text-slate-600">Current Plan</p>
              <p className="text-3xl font-bold text-slate-900 mt-2 capitalize">
                {planName}
              </p>
              <p className="text-sm text-slate-600 mt-2">
                {isActive ? '✓ Active' : 'No active subscription'}
              </p>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <p className="text-sm font-medium text-slate-600">Status</p>
              <p className="text-3xl font-bold mt-2">
                <span className={isActive ? 'text-green-600' : 'text-slate-600'}>
                  {isActive ? '✓ Active' : 'Inactive'}
                </span>
              </p>
              {isActive && (
                <p className="text-sm text-slate-600 mt-2">
                  {subscription?.status}
                </p>
              )}
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <p className="text-sm font-medium text-slate-600">Next Billing</p>
              <p className="text-lg font-bold text-slate-900 mt-2">
                {nextBillingDate || 'N/A'}
              </p>
              {isActive && (
                <p className="text-sm text-slate-600 mt-2">
                  Renews on this date
                </p>
              )}
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <p className="text-sm font-medium text-slate-600">Account Email</p>
              <p className="text-lg font-semibold text-slate-900 mt-2">
                {session.user?.email}
              </p>
              <p className="text-sm text-slate-600 mt-2">
                <Link href="#settings" className="text-blue-600 hover:text-blue-700">
                  Edit →
                </Link>
              </p>
            </div>
          </div>

          {/* Plan Comparison */}
          {!isActive && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Upgrade Your Plan
              </h3>
              <p className="text-blue-800 mb-4">
                You're currently on the free plan. Upgrade to access more features and remove limitations.
              </p>
              <Link
                href="/pricing"
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
              >
                View Pricing →
              </Link>
            </div>
          )}

          {/* Features Based on Plan */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              Plan Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Starter Features */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Starter Plan</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-slate-600">
                    <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Up to 10 projects
                  </li>
                  <li className="flex items-center gap-2 text-slate-600">
                    <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Basic analytics
                  </li>
                  <li className="flex items-center gap-2 text-slate-600">
                    <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Email support
                  </li>
                </ul>
              </div>

              {/* Pro Features */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Pro Plan</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-slate-600">
                    <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Unlimited projects
                  </li>
                  <li className="flex items-center gap-2 text-slate-600">
                    <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Advanced analytics
                  </li>
                  <li className="flex items-center gap-2 text-slate-600">
                    <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Priority support
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}