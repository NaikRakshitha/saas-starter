'use client';

import { adminApi } from '@/lib/adminApi';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface User {
  id: string;
  email: string | null;
  name: string | null;
  role: string;
  createdAt: Date;
  subscriptions: Array<{
    status: string | null;
  }>;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const response = await fetch('/api/admin/users');
      
      if (!response.ok) {
        throw new Error(`Failed to load users: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Load users error:', error);
      toast.error(
        error instanceof Error ? error.message : 'Failed to load users'
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleSuspendUser(userId: string, userName: string) {
    if (
      !confirm(
        `Suspend ${userName}? Their subscription will be paused.`
      )
    ) {
      return;
    }

    setActionLoading(userId);
    try {
      await adminApi.suspendUser(userId);
      await loadUsers();
      router.refresh();
    } catch (error) {
      console.error('Suspend error:', error);
    } finally {
      setActionLoading(null);
    }
  }

  async function handleActivateUser(userId: string, userName: string) {
    if (
      !confirm(
        `Activate ${userName}? Their subscription will be resumed.`
      )
    ) {
      return;
    }

    setActionLoading(userId);
    try {
      await adminApi.activateUser(userId);
      await loadUsers();
      router.refresh();
    } catch (error) {
      console.error('Activate error:', error);
    } finally {
      setActionLoading(null);
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Loading users...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Users</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Subscription Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Joined
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">
                  {user.name || 'N/A'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {user.email}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.subscriptions[0]?.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : user.subscriptions[0]?.status === 'paused'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {user.subscriptions[0]?.status || 'No Subscription'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm space-x-2">
                  {user.subscriptions[0]?.status === 'active' ? (
                    <button
                      onClick={() =>
                        handleSuspendUser(
                          user.id,
                          user.name || user.email || 'User'
                        )
                      }
                      disabled={actionLoading === user.id}
                      className="text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                      {actionLoading === user.id ? 'Suspending...' : 'Suspend'}
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        handleActivateUser(
                          user.id,
                          user.name || user.email || 'User'
                        )
                      }
                      disabled={actionLoading === user.id}
                      className="text-green-600 hover:text-green-800 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                      {actionLoading === user.id ? 'Activating...' : 'Activate'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users.length === 0 && (
        <div className="text-center py-12 text-gray-600">
          No users found
        </div>
      )}

      <p className="text-gray-600 text-sm mt-4">
        Total Users: <strong>{users.length}</strong>
      </p>
    </div>
  );
}