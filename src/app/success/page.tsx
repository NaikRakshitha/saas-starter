'use client';

import Header from '@/components/Header';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const success = searchParams.get('success');

  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
          <div className="mb-4">
            <svg className="h-16 w-16 text-green-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Payment Successful!
          </h1>
          <p className="text-slate-600 mb-6">
            Thank you for your subscription. Your account has been upgraded.
          </p>
          <Link
            href="/dashboard"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </>
  );
}