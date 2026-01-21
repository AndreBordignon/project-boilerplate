// src/components/layout/AdminLayout.tsx
import { Outlet } from 'react-router-dom'
import AdminSidebar from '@/components/AdminLayout/AdminSidebar'

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        <Outlet />
    </div>
  )
}