'use client';

import Header from '@/components/Header';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!session) {
    return null; // or a loading spinner
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-50">
        <div className="bg-white border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
                <p className="mt-1 text-sm text-slate-600">Welcome back, let's check your progress</p>
              </div>
              <button 
                onClick={() => signOut({ redirect: true, callbackUrl: '/auth/login' })}
                className="mt-4 sm:mt-0 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <p className="text-sm font-medium text-slate-600">Account Status</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">Active</p>
              <p className="text-sm text-green-600 mt-2">✓ Verified</p>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <p className="text-sm font-medium text-slate-600">Subscription</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">Free</p>
              <p className="text-sm text-slate-600 mt-2">
                <Link href="#pricing" className="text-blue-600 hover:text-blue-700">
                  Upgrade →
                </Link>
              </p>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <p className="text-sm font-medium text-slate-600">Email</p>
              <p className="text-lg font-semibold text-slate-900 mt-2">{session.user?.email}</p>
              <p className="text-sm text-slate-600 mt-2">
                <Link href="#settings" className="text-blue-600 hover:text-blue-700">
                  Edit →
                </Link>
              </p>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <p className="text-sm font-medium text-slate-600">Member Since</p>
              <p className="text-lg font-semibold text-slate-900 mt-2">Today</p>
              <p className="text-sm text-green-600 mt-2">Welcome! 🎉</p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">User Information</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-slate-600">Name</p>
                <p className="text-slate-900">{session.user?.name || 'Not set'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Email</p>
                <p className="text-slate-900">{session.user?.email}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}