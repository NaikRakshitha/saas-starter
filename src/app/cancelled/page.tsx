'use client';

import Header from '@/components/Header';
import Link from 'next/link';

export default function CancelledPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
          <div className="mb-4">
            <svg className="h-16 w-16 text-amber-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Payment Cancelled
          </h1>
          <p className="text-slate-600 mb-6">
            Your payment was cancelled. You can try again anytime.
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              href="/pricing"
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
            >
              Back to Pricing
            </Link>
            <Link
              href="/dashboard"
              className="inline-block px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium transition-colors"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}