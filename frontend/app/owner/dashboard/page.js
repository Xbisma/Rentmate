'use client';
import Link from 'next/link';
// import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Header from '../Header';

export default function OwnerDashboard() {
  const stats = [
    {
      title: "Total Properties",
      value: "12",
      icon: "🏠",
      color: "primary",
      delay: 100
    },
    {
      title: "Active Tenancies",
      value: "8",
      icon: "👥",
      color: "secondary",
      delay: 200
    },
    {
      title: "Pending Requests",
      value: "3",
      icon: "⏳",
      color: "warning",
      delay: 300
    },
    {
      title: "Monthly Revenue",
      value: "$8,450",
      icon: "💰",
      color: "success",
      delay: 400
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
        </svg>
      ),
      link: "#",
      color: "purple"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-12 text-center animate-fade-in">
          <h1 className="text-4xl font-bold text-black mb-3">
            Welcome back, <span className="gradient-text">Jabin!</span>
          </h1>
          <p className="text-lg text-gray-800 max-w-2xl mx-auto font-medium">
            Here's what's happening with your properties. Everything is looking great! 🎉
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div 
              key={stat.title}
              className="card p-6 hover-lift group animate-fade-in"
              style={{ animationDelay: `${stat.delay}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl">{stat.icon}</span>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-black">{stat.value}</p>
                  <p className={`text-sm font-semibold text-${stat.color}-700`}>{stat.change}</p>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{stat.title}</h3>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {quickActions.map((action, index) => (
            <div 
              key={action.title}
              className="card p-6 hover-lift group animate-slide-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 bg-${action.color}-100 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}>
                  <div className={`text-${action.color}-600`}>
                    {action.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-black">{action.title}</h3>
                  <p className="text-gray-800 text-sm font-medium">{action.description}</p>
                </div>
              </div>
              {action.link === "#" ? (
                <button className="text-blue-700 hover:text-blue-800 font-bold inline-flex items-center group-hover:translate-x-1 transition-transform duration-200">
                  Your {action.title}
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ) : (
                <Link href={action.link} className="text-blue-700 hover:text-blue-800 font-bold inline-flex items-center group-hover:translate-x-1 transition-transform duration-200">
                  Your {action.title}
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}