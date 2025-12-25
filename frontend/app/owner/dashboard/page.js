'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Footer from '../../components/Footer';
import Header from '../Header';
import { getOwnerDashboard } from '../../../services/dashboardService';

export default function OwnerDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const data = await getOwnerDashboard();
      // Transform API data to stats format
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

  // Default stats if API fails
  const defaultStats = [
    {
      title: "Total Properties",
      value: 0,
      icon: "🏠",
      color: "blue"
    },
    {
      title: "Active Tenancies",
      value: 0,
      icon: "📋",
      color: "green"
    },
    {
      title: "Pending Applications",
      value: 0,
      icon: "📝",
      color: "yellow"
    },
    {
      title: "Maintenance Requests",
      value: 0,
      icon: "🔧",
      color: "purple"
    }
  ];
    

  const quickActions = [
    {
      title: "Properties",
      description: "Manage your property ratings",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
      link: "/owner/maintenance",
      color: "purple"
    }
  ];

  return (
    <div className="page-container">
      <Header />
      
      <main className="content-container">
        {/* Welcome Section */}
        <div className="mb-12 text-center animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome back, <span className="gradient-text">Property Owner</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Manage your properties, track maintenance requests, and grow your rental business
          </p>
          {!loading && !error && dashboardData && (
            <div className="inline-flex items-center bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl px-6 py-4 shadow-sm">
              <div className="text-left">
                <p className="text-sm font-medium text-green-700 mb-1">Total Earnings</p>
                <p className="text-2xl font-bold text-green-800">${dashboardData.totalEarnings?.toLocaleString() || '0'}</p>
              </div>
              <div className="ml-4 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="card animate-pulse"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                </div>
                <div className="text-right">
                  <div className="h-8 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))
          ) : error ? (
            // Error state
            <div className="col-span-full">
              <div className="card border-red-200 bg-red-50">
                <div className="text-center text-red-600">
                  <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <p className="text-lg font-semibold mb-2">Failed to load dashboard data</p>
                  <p className="text-sm">{error}</p>
                  <button
                    onClick={fetchDashboardData}
                    className="btn-primary mt-4"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Data loaded
            (dashboardData?.stats || defaultStats).map((stat, index) => (
              <div
                key={stat.title}
                className="card card-hover animate-bounce-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center`}>
                    <span className="text-2xl">{stat.icon}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm font-semibold text-${stat.color}-600`}>{stat.title}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={action.title}
                href={action.link}
                className="card card-hover group animate-slide-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 bg-${action.color}-100 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}>
                    <div className={`text-${action.color}-600`}>
                      {action.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{action.title}</h3>
                    <p className="text-gray-600 text-sm">{action.description}</p>
                  </div>
                </div>
                <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-1 transition-transform duration-200">
                  Manage {action.title}
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}