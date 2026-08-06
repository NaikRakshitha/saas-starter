'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface FeatureFlag {
  id: string;
  name: string;
  description: string | null;
  enabled: boolean;
  percentage: number;
  createdAt: Date;
  userFlags: Array<{
    id: string;
    userId: string;
    enabled: boolean;
  }>;
}

export default function FeatureFlagsPage() {
  const [flags, setFlags] = useState<FeatureFlag[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    percentage: 0,
  });
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    loadFlags();
  }, []);

  async function loadFlags() {
    try {
      const response = await fetch('/api/admin/feature-flags');

      if (!response.ok) throw new Error('Failed to load flags');

      const data = await response.json();
      setFlags(data);
    } catch (error) {
      console.error('Load flags error:', error);
      toast.error(
        error instanceof Error ? error.message : 'Failed to load flags'
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateFlag(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error('Flag name is required');
      return;
    }

    setSubmitting(true);
    console.log('Creating flag:', formData);

    try {
      const response = await fetch('/api/admin/feature-flags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create flag');
      }

      const data = await response.json();
      console.log('Flag created:', data);

      toast.success('Feature flag created!');
      setFormData({ name: '', description: '', percentage: 0 });
      setShowForm(false);

      // Reload to show new flag
      window.location.reload();
    } catch (error) {
      console.error('Create flag error:', error);
      toast.error(
        error instanceof Error ? error.message : 'Failed to create flag'
      );
      setSubmitting(false);
    }
  }

  async function handleToggleFlag(flagId: string, enabled: boolean) {
    setActionLoading(flagId);
    try {
      const response = await fetch(`/api/admin/feature-flags/${flagId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: !enabled }),
      });

      if (!response.ok) throw new Error('Failed to update flag');

      toast.success('Flag updated!');
      await loadFlags();
    } catch (error) {
      console.error('Toggle flag error:', error);
      toast.error(
        error instanceof Error ? error.message : 'Failed to update flag'
      );
    } finally {
      setActionLoading(null);
    }
  }

  async function handleUpdatePercentage(
    flagId: string,
    percentage: number
  ) {
    setActionLoading(flagId);
    try {
      const response = await fetch(`/api/admin/feature-flags/${flagId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ percentage }),
      });

      if (!response.ok) throw new Error('Failed to update percentage');

      toast.success('Percentage updated!');
      await loadFlags();
    } catch (error) {
      console.error('Update percentage error:', error);
      toast.error(
        error instanceof Error ? error.message : 'Failed to update percentage'
      );
    } finally {
      setActionLoading(null);
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Loading feature flags...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Feature Flags</h1>
        <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
            {showForm ? '✕ Cancel' : '+ New Flag'}
        </button>
      </div>

      {/* Create Flag Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Create Feature Flag</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log('Form submitted!');
              handleCreateFlag(e);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Flag Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => {
                  console.log('Name changed:', e.target.value);
                  setFormData({ ...formData, name: e.target.value });
                }}
                placeholder="e.g., newPricing"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="What does this flag do?"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rollout Percentage (0-100)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.percentage}
                placeholder="0"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    percentage: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                % of users who will see this feature
              </p>
            </div>

            <button
                type="submit"
                disabled={submitting}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {submitting ? '⏳ Creating...' : '✅ Create Flag'}
            </button>
          </form>
        </div>
      )}

      {/* Feature Flags List */}
      <div className="space-y-4">
        {flags.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-600">
            No feature flags yet. Click "+ New Flag" to create one!
          </div>
        ) : (
          flags.map((flag) => (
            <div
              key={flag.id}
              className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {flag.name}
                  </h3>
                  {flag.description && (
                    <p className="text-sm text-gray-600">{flag.description}</p>
                  )}
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Status</p>
                    <button
                      onClick={() => handleToggleFlag(flag.id, flag.enabled)}
                      disabled={actionLoading === flag.id}
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        flag.enabled
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      } disabled:opacity-50`}
                    >
                      {actionLoading === flag.id
                        ? 'Updating...'
                        : flag.enabled
                        ? '✅ Enabled'
                        : '❌ Disabled'}
                    </button>
                  </div>
                </div>
              </div>

              {flag.enabled && (
                <div className="mt-4 pt-4 border-t">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rollout: {flag.percentage}% of users
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={flag.percentage}
                    onChange={(e) =>
                      handleUpdatePercentage(flag.id, parseInt(e.target.value))
                    }
                    disabled={actionLoading === flag.id}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Drag to control what % of users see this feature
                  </p>
                </div>
              )}

              {flag.userFlags.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-xs text-gray-600">
                    {flag.userFlags.length} user override(s)
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}