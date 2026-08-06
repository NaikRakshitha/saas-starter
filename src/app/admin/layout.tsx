import { AdminLayout } from '@/components/AdminLayout';
import { requireAdmin } from '@/lib/requireAdmin';
import { ReactNode } from 'react';

interface AdminLayoutPageProps {
  children: ReactNode;
}

export default async function AdminLayoutPage({
  children,
}: AdminLayoutPageProps) {
  // Protect admin routes - will redirect if not admin
  await requireAdmin();

  return <AdminLayout>{children}</AdminLayout>;
}