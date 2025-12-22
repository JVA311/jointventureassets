'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiLayout as LayoutIcon,
  FiUsers as UsersIcon,
  FiFileText as FileTextIcon,
  FiSettings as SettingsIcon,
  FiLogOut as LogOutIcon
} from 'react-icons/fi';

// Simple utility for conditional class names
const cn = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' ');

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: LayoutIcon,
    },
    {
      name: 'Users',
      href: '/admin/users',
      icon: UsersIcon,
    },
    {
      name: 'Requests',
      href: '/admin/requests',
      icon: FileTextIcon,
    },
    {
      name: 'Settings',
      href: '/admin/settings',
      icon: SettingsIcon,
    },
  ];

  return (
    <div className="h-full w-64 flex-col border-r bg-white">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/admin" className="flex items-center gap-2 font-semibold text-gray-800">
          <span>Joint Venture Assets</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-4 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:text-yellow-600 hover:bg-yellow-50',
                pathname === item.href ? 'bg-yellow-50 text-yellow-600' : ''
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900">
          <LogOutIcon className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
}
