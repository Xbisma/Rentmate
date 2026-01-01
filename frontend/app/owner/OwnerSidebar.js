'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const menuItems = [
  {
    label: 'Dashboard',
    href: '/owner/dashboard',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9v9a2 2 0 01-2 2h-4V12H9v9H5a2 2 0 01-2-2z" />
      </svg>
    )
  },
  {
    label: 'Properties',
    href: '/owner/properties',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 21V3m8 18V3M3 21h18" />
      </svg>
    )
  },
  {
    label: 'Tenancies',
    href: '/owner/tenancies',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
      </svg>
    )
  },
  {
    label: 'Applications',
    href: '/owner/applications',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-6h13M9 7h13M5 7h.01M5 17h.01" />
      </svg>
    )
  },
  {
    label: 'Maintenance',
    href: '/owner/maintenance',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 010 1.4l-1.4 1.4 2.6 2.6 1.4-1.4a1 1 0 011.4 0l1.6 1.6a1 1 0 010 1.4l-2 2a2 2 0 01-2.8 0l-6.6-6.6a2 2 0 010-2.8l2-2a1 1 0 011.4 0z" />
      </svg>
    )
  }
];


export default function OwnerSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`
        h-screen sticky top-0
        bg-white border-r border-gray-200
        transition-all duration-300 ease-in-out
        ${collapsed ? 'w-20' : 'w-64'}
      `}
    >
      {/* Top Section */}
      <div className="flex items-center justify-between px-4 py-6">
        {!collapsed && (
          <span className="text-2xl font-extrabold text-emerald-600">
            RentMate
          </span>
        )}

        <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
            title="Toggle menu"
        >
            <svg
                className={`w-6 h-6 text-gray-700 transition-transform duration-300 ${collapsed ? 'rotate-0' : 'rotate-90'}`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </button>

      </div>

      {/* Menu */}
      <nav className="px-2 space-y-2">
        {menuItems.map(item => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-3 rounded-xl
                transition-all duration-200
                ${active
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'text-gray-600 hover:bg-gray-100'}
              `}
            >
              <span className="text-xl">{item.icon}</span>

              {/* Text animation */}
              <span
                className={`
                  whitespace-nowrap overflow-hidden
                  transition-all duration-300
                  ${collapsed
                    ? 'opacity-0 w-0'
                    : 'opacity-100 w-auto'}
                `}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
