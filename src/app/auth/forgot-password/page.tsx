'use client';

import Header from '@/components/Header';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
        <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">Reset your password</h1>
          <p className="mt-2 text-sm text-slate-600">
            Enter your email and we&apos;ll send you a reset link.
          </p>
          <form className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-900">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
            >
              Send reset link
            </button>
          </form>
          <p className="mt-4 text-sm text-slate-600">
            <Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-700">
              Back to sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
