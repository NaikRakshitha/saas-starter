'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface AdminLog {
  id: string;
  adminId: string;
  action: string;
  targetId: string | null;
  details: string | null;
  createdAt: Date;
  admin: {
    email: string | null;
    name: string | null;
  };
}

export default function LogsPage() {
  const [logs, setLogs] = useState<AdminLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLogs();
  }, []);

  async function loadLogs() {
    try {
      const response = await fetch('/api/admin/logs');

      if (!response.ok) {
        throw new Error('Failed to load logs');
      }

      const data = await response.json();
      setLogs(data);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to load logs'
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Loading logs...</p>
      </div>
    );
  }

  const getActionLabel = (action: string) => {
    const labels: { [key: string]: string } = {
      user_suspended: '🔒 User Suspended',
      user_activated: '✅ User Activated',
      subscription_cancelled: '❌ Subscription Cancelled',
    };
    return labels[action] || action;
  };

  const getActionColor = (action: string) => {
    if (action.includes('suspended')) return 'bg-red-50';
    if (action.includes('activated')) return 'bg-green-50';
    if (action.includes('cancelled')) return 'bg-orange-50';
    return 'bg-gray-50';
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Logs</h1>

      <p className="text-gray-600 mb-6">
        Audit trail of all admin actions
      </p>

      <div className="space-y-4">
        {logs.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-600">
            No admin actions yet
          </div>
        ) : (
          logs.map((log) => {
            const details = log.details ? JSON.parse(log.details) : {};

            return (
              <div
                key={log.id}
                className={`${getActionColor(
                  log.action
                )} rounded-lg shadow p-6 border-l-4 ${
                  log.action.includes('suspended')
                    ? 'border-red-500'
                    : log.action.includes('activated')
                    ? 'border-green-500'
                    : 'border-orange-500'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {getActionLabel(log.action)}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      By:{' '}
                      <strong>
                        {log.admin.name || log.admin.email || 'Unknown'}
                      </strong>
                    </p>
                    {details.userEmail && (
                      <p className="text-sm text-gray-600">
                        User: <strong>{details.userEmail}</strong>
                      </p>
                    )}
                    {details.planName && (
                      <p className="text-sm text-gray-600">
                        Plan: <strong>{details.planName}</strong>
                      </p>
                    )}
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-500">
                      {new Date(log.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <p className="text-gray-600 text-sm mt-8">
        Total Actions: <strong>{logs.length}</strong>
      </p>
    </div>
  );
}