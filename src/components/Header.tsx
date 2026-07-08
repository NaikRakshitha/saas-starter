'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = false;

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <div className="h-8 w-8 bg-blue-600 rounded-lg"></div>
            <span>SaaS</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="#features" 
              className="text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors"
            >
              Features
            </Link>
            <Link 
              href="#pricing" 
              className="text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors"
            >
              Pricing
            </Link>
            <Link 
              href="#docs" 
              className="text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors"
            >
              Docs
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {!isLoggedIn ? (
              <>
                <Link 
                  href="/auth/login"
                  className="hidden sm:inline-block px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
                >
                  Sign in
                </Link>
                <Link 
                  href="/auth/signup"
                  className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <Link 
                href="/dashboard"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Dashboard
              </Link>
            )}
          </div>

          <button 
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden border-t border-slate-200 py-4 space-y-2">
            <Link 
              href="#features"
              className="block px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Features
            </Link>
            <Link 
              href="#pricing"
              className="block px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Pricing
            </Link>
            <Link 
              href="/auth/login"
              className="block px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Sign in
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}