'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Footer from '../../components/Footer';
import Header from '../Header';
import { getOwnerDashboard } from '../../../services/dashboardService';

const colorMap = {
  blue: {
    bg: 'bg-blue-100',
    text: 'text-blue-600'
  },
  green: {
    bg: 'bg-green-100',
    text: 'text-green-600'
  },
  yellow: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-600'
  },
  purple: {
    bg: 'bg-purple-100',
    text: 'text-purple-600'
  }
};

export default function OwnerDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const data = await getOwnerDashboard();
      const transformedStats = [
        {
          title: "Total Properties",
          value: data.properties || 0,
          icon: "🏠",
          color: "blue"
        },
        {
          title: "Active Tenancies",
          value: data.tenancies || 0,
          icon: "📋",
          color: "green"
        },
        {
          title: "Pending Applications",
          value: data.applications || 0,
          icon: "📝",
          color: "yellow"
        },
        {
          title: "Maintenance Requests",
          value: data.maintenanceRequests || 0,
          icon: "🔧",
          color: "purple"
        }
      ];
      setDashboardData({ ...data, stats: transformedStats });
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const defaultStats = [
    { title: "Total Properties", value: 0, icon: "🏠", color: "blue" },
    { title: "Active Tenancies", value: 0, icon: "📋", color: "green" },
    { title: "Pending Applications", value: 0, icon: "📝", color: "yellow" },
    { title: "Maintenance Requests", value: 0, icon: "🔧", color: "purple" }
  ];

  const quickActions = [
    {
      title: "Properties",
      description: "Manage your property ratings",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      link: "/owner/properties",
      color: "blue"
    },
    {
      title: "Tenancies",
      description: "Track rental agreements",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622" />
        </svg>
      ),
      link: "/owner/tenancies",
      color: "green"
    },
    {
      title: "Maintenance",
      description: "Schedule maintenance requests",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
      link: "/owner/maintenance",
      color: "purple"
    }
  ];

  // Show loading skeleton until component is mounted
  if (!mounted) {
    return (
      <div className="page-container bg-gradient-to-b from-blue-50/80 to-white min-h-screen">
        <div className="content-container pt-32">
          <div className="mb-12 text-center">
            <div className="h-10 bg-gray-200 rounded animate-pulse mb-4 w-64 mx-auto"></div>
            <div className="h-6 bg-gray-200 rounded animate-pulse w-96 mx-auto mb-6"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm p-6">
                <div className="h-32 bg-gray-100 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container bg-gradient-to-b from-blue-50/80 to-white">
      <Header />

      <main className="content-container">
        <div className="mb-12 text-center animate-fade-in">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
            Welcome back, <span className="gradient-text">Property Owner</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Manage your properties, track maintenance requests, and grow your rental business
          </p>
        </div>

        <div className="flex justify-end mb-6">
          <span className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </span>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {(dashboardData?.stats || defaultStats).map((stat, index) => {
            const card = (
              <div
                className="relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 p-6 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
                suppressHydrationWarning // Add this to suppress hydration warnings
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 ${colorMap[stat.color].bg} rounded-xl flex items-center justify-center`}>
                    <span className="text-2xl">{stat.icon}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-3xl font-extrabold ${
                    stat.title === 'Total Earnings' ? 'text-emerald-600' : 'text-gray-900'
                  }`}>
                    {stat.value}
                  </p>
                  <p className={`text-sm font-semibold ${colorMap[stat.color].text}`}>
                    {stat.title}
                  </p>
                </div>
                <div className={`absolute bottom-0 left-0 h-1 w-full ${colorMap[stat.color].bg}`} />
              </div>
            );

            // Make Pending Applications clickable
            if (stat.title === "Pending Applications") {
              return (
                <Link 
                  key={stat.title} 
                  href="/owner/applications"
                  suppressHydrationWarning // Add this
                >
                  {card}
                </Link>
              );
            }

            return <div key={stat.title}>{card}</div>;
          })}
        </div>

        {/* QUICK ACTIONS */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={action.title}
                href={action.link}
                className="rounded-2xl bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-transparent group animate-slide-in"
                style={{ animationDelay: `${index * 100}ms` }}
                suppressHydrationWarning // Add this
              >
                <div className="flex items-center mb-4">
                  <div className={`w-14 h-14 ${colorMap[action.color].bg} rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform`}>
                    {action.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{action.title}</h3>
                    <p className="text-gray-600 text-sm">{action.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading dashboard data...</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}