'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { logoutUser } from '../services/authService';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logoutUser();
    router.push('/');
  };

  const navItems = [
    { href: '/tenant/dashboard', label: 'Dashboard' },
    { href: '/tenant/properties', label: 'Properties' },
    { href: '/tenant/search', label: 'Search' },
    { href: '/tenant/requests', label: 'Requests' },
    { href: '/tenant/contact', label: 'Contact' },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-gray-800">
            RentMate
          </Link>
          
          {/* Navigation Links */}
          <div className="flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${
                  pathname === item.href ? 'nav-link.active' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          {/* Logout */}
          <button 
            onClick={handleLogout}
            className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
            title="Logout"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}