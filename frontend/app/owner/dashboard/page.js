'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  const [userName, setUserName] = useState('');
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    
    // Get user name from localStorage - it's stored as "userName"
    const storedName = localStorage.getItem('userName');
    
    if (storedName) {
      setUserName(storedName);
    } else {
      // Fallback to email if name not found
      const storedEmail = localStorage.getItem('userEmail');
      if (storedEmail) {
        // Extract name from email (before @)
        const nameFromEmail = storedEmail.split('@')[0];
        setUserName(nameFromEmail);
      }
    }
    
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const data = await getOwnerDashboard();
      const transformedStats = [
  {
    title: "Total Properties",
    value: data.properties || 0,
    color: "blue",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9v9a2 2 0 01-2 2h-4V12H9v9H5a2 2 0 01-2-2z" />
      </svg>
    )
  },
  {
    title: "Active Tenancies",
    value: data.tenancies || 0,
    color: "green",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
      </svg>
    )
  },
  {
    title: "Applications",
    value: data.applications || 0,
    color: "yellow",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-6h13M9 7h13M5 7h.01M5 17h.01" />
      </svg>
    )
  },
  {
    title: "Maintenance Requests",
    value: data.maintenanceRequests || 0,
    color: "purple",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 010 1.4l-1.4 1.4 2.6 2.6 1.4-1.4a1 1 0 011.4 0l1.6 1.6a1 1 0 010 1.4l-2 2a2 2 0 01-2.8 0l-6.6-6.6a2 2 0 010-2.8l2-2a1 1 0 011.4 0z" />
      </svg>
    )
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

  // Format the welcome message
  const getWelcomeMessage = () => {
    if (!userName) {
      return "Welcome back!";
    }
    
    // Capitalize first letter of name
    const formattedName = userName.charAt(0).toUpperCase() + userName.slice(1);
    return `Welcome back, ${formattedName}!`;
  };

  const defaultStats = [
    { title: "Total Properties", value: 0, icon: "🏠", color: "blue" },
    { title: "Active Tenancies", value: 0, icon: "📋", color: "green" },
    { title: "Applications", value: 0, icon: "📝", color: "yellow" },
    { title: "Maintenance Requests", value: 0, icon: "🔧", color: "purple" }
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

      <main className="content-container">
        <div className="mb-12 text-center animate-fade-in">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
            {getWelcomeMessage()}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Manage your properties, track maintenance requests, and grow your rental business
          </p>
          
          {/* Optional: Show email in smaller text */}
          {!userName && localStorage.getItem('userEmail') && (
            <p className="text-sm text-gray-500 mt-2">
              Logged in as: {localStorage.getItem('userEmail')}
            </p>
          )}
        </div>

        <div className="flex justify-end mb-6">
          <span className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </span>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {(dashboardData?.stats || defaultStats).map((stat, index) => {
            const card = (
              <div
                className="relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 p-6 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
                suppressHydrationWarning
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 ${colorMap[stat.color].bg} rounded-xl flex items-center justify-center`}>
                    <div className="text-gray-700">{stat.icon}</div>
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

            if (stat.title === "Pending Applications") {
              return (
                <Link 
                  key={stat.title} 
                  href="/owner/applications"
                  suppressHydrationWarning
                >
                  {card}
                </Link>
              );
            }

            return <div key={stat.title}>{card}</div>;
          })}
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
    </div>
  );
}