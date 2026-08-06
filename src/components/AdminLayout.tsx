'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { ReactNode } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
        </div>

        <nav className="mt-6">
          <Link
            href="/admin/dashboard"
            className={`block px-6 py-3 ${
              isActive('/admin/dashboard')
                ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            📊 Dashboard
          </Link>

          <Link
            href="/admin/users"
            className={`block px-6 py-3 ${
              isActive('/admin/users')
                ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            👥 Users
          </Link>

          <Link
            href="/admin/subscriptions"
            className={`block px-6 py-3 ${
              isActive('/admin/subscriptions')
                ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            💳 Subscriptions
          </Link>

          <Link
            href="/admin/feature-flags"
            className={`block px-6 py-3 ${
              isActive('/admin/feature-flags')
                ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            🚀 Feature Flags
          </Link>

          <Link
            href="/admin/logs"
            className={`block px-6 py-3 ${
                isActive('/admin/logs')
                ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
            >
            📋 Logs
          </Link>

          <Link
            href="/admin/settings"
            className={`block px-6 py-3 ${
              isActive('/admin/settings')
                ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            ⚙️ Settings
          </Link>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 w-64 p-6 border-t">
          <button
            onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
            className="w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="bg-white shadow">
          <div className="px-8 py-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Admin Dashboard
            </h2>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </div>
    </div>
  );
}