'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getOwnerDashboard } from '../../../services/dashboardService';
import AddPropertyModal from '../properties/add/page'; // We'll create this component

const colorMap = {
  blue: {
    bg: 'bg-blue-100',
    text: 'text-blue-600',
    dark: 'bg-blue-600',
    light: 'bg-blue-50'
  },
  green: {
    bg: 'bg-green-100',
    text: 'text-green-600',
    dark: 'bg-green-600',
    light: 'bg-green-50'
  },
  yellow: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-600',
    dark: 'bg-yellow-600',
    light: 'bg-yellow-50'
  },
  purple: {
    bg: 'bg-purple-100',
    text: 'text-purple-600',
    dark: 'bg-purple-600',
    light: 'bg-purple-50'
  }
};

export default function OwnerDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [userName, setUserName] = useState('');
  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    } else {
      const storedEmail = localStorage.getItem('userEmail');
      if (storedEmail) {
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
          change: "+2 this month",
          trend: "up",
          icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9v9a2 2 0 01-2 2h-4V12H9v9H5a2 2 0 01-2-2z" />
            </svg>
          ),
          link: "/owner/properties"
        },
        {
          title: "Active Tenancies",
          value: data.tenancies || 0,
          color: "green",
          change: "100% occupancy",
          trend: "up",
          icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
            </svg>
          ),
          link: "/owner/tenants"
        },
        {
          title: "Applications",
          value: data.applications || 0,
          color: "yellow",
          change: `${data.applications || 0} pending`,
          trend: "pending",
          icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-6h13M9 7h13M5 7h.01M5 17h.01" />
            </svg>
          ),
          link: "/owner/applications"
        },
        {
          title: "Maintenance",
          value: data.maintenanceRequests || 0,
          color: "purple",
          change: "1 urgent",
          trend: "down",
          icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 010 1.4l-1.4 1.4 2.6 2.6 1.4-1.4a1 1 0 011.4 0l1.6 1.6a1 1 0 010 1.4l-2 2a2 2 0 01 -2.8 0l-6.6-6.6a2 2 0 010-2.8l2-2a1 1 0 011.4 0z" />
            </svg>
          ),
          link: "/owner/maintenance"
        }
      ];

      const recentActivity = [
        { id: 1, type: 'application', description: 'New rental application received', time: '2 hours ago', color: 'yellow' },
        { id: 2, type: 'payment', description: 'Payment received from Tenant A', time: '1 day ago', color: 'green' },
        { id: 3, type: 'maintenance', description: 'Maintenance request updated', time: '2 days ago', color: 'purple' },
        { id: 4, type: 'property', description: 'New property listed', time: '3 days ago', color: 'blue' }
      ];

      const upcomingTasks = [
        { id: 1, title: 'Review pending applications', due: 'Today', priority: 'high', link: '/owner/applications' },
        { id: 2, title: 'Schedule property inspection', due: 'Tomorrow', priority: 'medium', link: '/owner/properties' },
        { id: 3, title: 'Send rent reminders', due: 'In 3 days', priority: 'low', link: '/owner/tenants' }
      ];

      setDashboardData({ 
        ...data, 
        stats: transformedStats,
        recentActivity,
        upcomingTasks,
        totalEarnings: data.totalEarnings || 12500,
        occupancyRate: data.occupancyRate || 85
      });
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 18) return 'afternoon';
    return 'evening';
  };

  const handlePropertyAdded = () => {
    // Refresh dashboard data when a property is added
    fetchDashboardData();
  };

  const defaultStats = [
    { 
      title: "Total Properties", 
      value: 0, 
      color: "blue",
      change: "+0 this month",
      trend: "up",
      link: "/owner/properties"
    },
    { 
      title: "Active Tenancies", 
      value: 0, 
      color: "green",
      change: "0% occupancy",
      trend: "up",
      link: "/owner/tenants"
    },
    { 
      title: "Applications", 
      value: 0, 
      color: "yellow",
      change: "0 pending",
      trend: "pending",
      link: "/owner/applications"
    },
    { 
      title: "Maintenance", 
      value: 0, 
      color: "purple",
      change: "0 urgent",
      trend: "down",
      link: "/owner/maintenance"
    }
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-64"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="h-32 bg-gray-100 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const displayStats = loading || error || !dashboardData?.stats ? defaultStats : dashboardData.stats;

  return (
    <>
      <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 ${showAddPropertyModal ? 'overflow-hidden' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header with Add Property button at the top right */}
          <div className="mb-12 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Good {getTimeOfDay()}, {userName ? userName.charAt(0).toUpperCase() + userName.slice(1) : 'there'}!
                </h1>
                <p className="mt-2 text-gray-600 text-lg">
                  Welcome to your property management dashboard
                </p>
                <div className="mt-3 text-sm text-gray-500 bg-white px-4 py-2 rounded-lg shadow-sm inline-block">
                  📅 {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
              </div>
              <div className="sm:mt-0">
                <button
                  onClick={() => setShowAddPropertyModal(true)}
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add New Property
                </button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {displayStats.map((stat, index) => (
              <Link 
                key={stat.title} 
                href={stat.link || "#"}
                className="block transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl p-6 border border-gray-100 h-full">
                  <div className="flex items-start justify-between mb-5">
                    <div className={`p-3 rounded-xl ${colorMap[stat.color]?.light || 'bg-gray-100'}`}>
                      <div className={`${colorMap[stat.color]?.text || 'text-gray-600'}`}>
                        {stat.icon || (
                          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${colorMap[stat.color]?.bg || 'bg-gray-100'} ${colorMap[stat.color]?.text || 'text-gray-600'}`}>
                      {stat.change}
                    </span>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                    <p className="text-gray-700 font-medium">{stat.title}</p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-gray-100">
                    <div className="flex items-center text-sm text-gray-500">
                      <span className={`mr-1 ${stat.trend === 'up' ? 'text-green-500' : stat.trend === 'down' ? 'text-red-500' : 'text-yellow-500'}`}>
                        {stat.trend === 'up' ? '↗' : stat.trend === 'down' ? '↘' : '→'}
                      </span>
                      <span>{stat.change}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600"></div>
              <p className="mt-4 text-gray-600 font-medium">Loading dashboard...</p>
            </div>
          )}

          {/* Main Content - Only show when not loading */}
          {!loading && (
            <div className="space-y-8">
              {/* First Row: Earnings & Tasks */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Earnings Card - Takes 2/3 width */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 h-full">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-gray-900">Monthly Earnings</h2>
                      <span className="text-sm text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full">
                        +12.5% from last month
                      </span>
                    </div>
                    <div className="mb-6">
                      <p className="text-4xl font-bold text-gray-900 mb-2">
                        ${(dashboardData?.totalEarnings || 0).toLocaleString()}
                      </p>
                      <p className="text-gray-600">Total revenue this month</p>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                        style={{ width: '75%' }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>Target: $15,000</span>
                      <span>75% achieved</span>
                    </div>
                  </div>
                </div>

                {/* Upcoming Tasks - Takes 1/3 width */}
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Upcoming Tasks</h2>
                    <span className="text-sm text-gray-500">
                      {(dashboardData?.upcomingTasks?.length || 0)} pending
                    </span>
                  </div>
                  <div className="space-y-4">
                    {(dashboardData?.upcomingTasks || []).map((task) => (
                      <Link 
                        key={task.id} 
                        href={task.link || "#"}
                        className="block p-4 border border-gray-100 rounded-xl hover:border-blue-200 hover:bg-blue-50 transition-all group"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-medium text-gray-900 group-hover:text-blue-600">{task.title}</h3>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            task.priority === 'high' 
                              ? 'bg-red-100 text-red-700' 
                              : task.priority === 'medium'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-green-100 text-green-700'
                          }`}>
                            {task.priority}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>Due: {task.due}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <button 
                    onClick={() => router.push('/owner/tasks')}
                    className="w-full mt-6 py-3 text-center text-blue-600 font-medium border border-blue-200 rounded-xl hover:bg-blue-50 transition-colors"
                  >
                    View All Tasks
                  </button>
                </div>
              </div>

              {/* Second Row: Recent Activity & Performance Metrics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activity */}
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                    <Link 
                      href="/owner/activity" 
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      View all →
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {(dashboardData?.recentActivity || []).map((activity) => (
                      <div key={activity.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                        <div className={`w-10 h-10 ${colorMap[activity.color]?.light || 'bg-gray-100'} rounded-lg flex items-center justify-center mr-4`}>
                          <div className={`${colorMap[activity.color]?.text || 'text-gray-600'}`}>
                            {activity.type === 'application' ? '📝' : 
                             activity.type === 'payment' ? '💰' : 
                             activity.type === 'maintenance' ? '🔧' : '🏠'}
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{activity.description}</p>
                          <p className="text-sm text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Property Performance</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-5 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {dashboardData?.occupancyRate || 85}%
                      </div>
                      <p className="text-gray-700 font-medium">Occupancy Rate</p>
                      <p className="text-sm text-gray-500 mt-1">Properties occupied</p>
                    </div>
                    <div className="text-center p-5 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
                      <div className="text-3xl font-bold text-green-600 mb-2">4.8</div>
                      <p className="text-gray-700 font-medium">Average Rating</p>
                      <p className="text-sm text-gray-500 mt-1">Based on 42 reviews</p>
                    </div>
                    <div className="text-center p-5 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl">
                      <div className="text-3xl font-bold text-purple-600 mb-2">24h</div>
                      <p className="text-gray-700 font-medium">Avg Response Time</p>
                      <p className="text-sm text-gray-500 mt-1">For maintenance requests</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Add Property Modal */}
      <AddPropertyModal
        isOpen={showAddPropertyModal}
        onClose={() => setShowAddPropertyModal(false)}
        onSuccess={handlePropertyAdded}
      />
    </>
  );
}