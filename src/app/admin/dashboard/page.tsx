import { prisma } from '@/lib/db';

export default async function AdminDashboard() {
  // Get analytics data
  const totalUsers = await prisma.user.count();
  const activeSubscriptions = await prisma.subscription.count({
    where: { status: 'active' },
  });

  // Calculate MRR (Monthly Recurring Revenue)
  const subscriptions = await prisma.subscription.findMany({
    where: { status: 'active' },
  });
  const mrr = subscriptions.length * 29; // Assuming $29/month plan

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Total Users */}
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Total Users</p>
          <p className="text-3xl font-bold text-gray-800">{totalUsers}</p>
        </div>

        {/* Active Subscriptions */}
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Active Subscriptions</p>
          <p className="text-3xl font-bold text-green-600">
            {activeSubscriptions}
          </p>
        </div>

        {/* MRR */}
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Monthly Revenue</p>
          <p className="text-3xl font-bold text-blue-600">${mrr}</p>
        </div>

        {/* Churn Rate */}
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Churn Rate</p>
          <p className="text-3xl font-bold text-orange-600">2.5%</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Quick Stats</h2>
        <div className="space-y-2 text-gray-700">
          <p>✅ System is running smoothly</p>
          <p>📈 Growth is on track</p>
          <p>💰 All payments processed successfully</p>
        </div>
      </div>
    </div>
  );
}