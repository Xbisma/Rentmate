"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState, Suspense, useEffect } from "react";
import { getAllProperties, getPropertyById } from "../../../services/propertyService";
import { getTenantDashboard } from "../../../services/dashboardService";

function PropertyDetailDashboard() {
  const params = useSearchParams();
  const propertyId = params.get("id");
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [current, setCurrent] = useState(0);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);

  useEffect(() => {
    if (propertyId) {
      fetchProperty();
    } else {
      setLoading(false);
    }
  }, [propertyId]);

  const fetchProperty = async () => {
    try {
      const data = await getPropertyById(propertyId);
      setProperty(data);
    } catch (err) {
      setError('Failed to load property details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">{error || 'Property not found'}</p>
        <Link href="/tenant/dashboard" className="btn-primary">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const images = property.images && property.images.length > 0 ? property.images : [
    "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg"
  ];
  
  const nextImg = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImg = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-900">
        {property.title || "Property Details"}
      </h1>

      {/* IMAGE SLIDER */}
      <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-lg mb-8">
        <button
          onClick={prevImg}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/50 transition"
          aria-label="Previous image"
        >
          ‹
        </button>

        <img
          src={images[current]}
          className="w-full h-auto transition-opacity duration-300"
          alt="Property"
          onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
        />

        <button
          onClick={nextImg}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/50 transition"
          aria-label="Next image"
        >
          ›
        </button>
      </div>

      {/* DETAILS */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Overview</h2>
          <ul className="space-y-2 text-gray-700">
            <li><span className="font-medium">Type:</span> {property.title}</li>
            <li><span className="font-medium">Price:</span> PKR {property.price?.toLocaleString()}</li>
            <li><span className="font-medium">Location:</span> {property.location}, {property.city}</li>
            <li><span className="font-medium">Bedrooms:</span> {property.bedrooms || 'N/A'}</li>
            <li><span className="font-medium">Bathrooms:</span> {property.bathrooms || 'N/A'}</li>
            <li><span className="font-medium">Status:</span> {property.availability}</li>
          </ul>
          {property.description && (
            <div className="mt-4">
              <h3 className="font-medium text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600">{property.description}</p>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <button className="btn-success w-full">
            WhatsApp
          </button>

          <button
            onClick={() => setShowCallModal(true)}
            className="btn-primary w-full"
          >
            Call
          </button>

          <button
            onClick={() => setShowRequestModal(true)}
            className="btn-secondary w-full"
          >
            Send Request
          </button>
        </div>
      </div>

      {/* CALL MODAL */}
      {showCallModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 relative shadow-2xl">
            <button
              onClick={() => setShowCallModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-center mb-5 text-gray-900">
              Contact Agent
            </h2>

            <div className="text-center mb-6">
              <p className="text-lg font-semibold text-gray-900">Muhammad Fahad</p>
              <p className="text-gray-600">Vip Properties</p>
            </div>

            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📱</span>
                <div>
                  <p className="text-sm text-gray-500">Mobile</p>
                  <p className="text-emerald-600 font-semibold">+92-3334236181</p>
                </div>
              </div>

              <button
                onClick={() => navigator.clipboard.writeText("+923334236181")}
                className="flex items-center gap-1 text-emerald-600 font-medium hover:text-emerald-700"
              >
                📋 Copy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REQUEST MODAL */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 relative shadow-2xl">
            <button
              onClick={() => setShowRequestModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Send Request
            </h2>

            <label className="block text-sm font-medium mb-1 text-gray-700">
              Request Type
            </label>
            <select className="w-full border border-gray-300 rounded-xl p-3 mb-4 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none">
              <option value="">Select type</option>
              <option value="inquiry">Inquiry</option>
              <option value="maintenance">Maintenance</option>
            </select>

            <label className="block text-sm font-medium mb-1 text-gray-700">
              Message
            </label>
            <textarea
              rows={4}
              className="w-full border border-gray-300 rounded-xl p-3 mb-4 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none"
              placeholder="Write your message here..."
            />

            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-medium transition shadow hover:shadow-md">
              Send Request
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function TenantHomeDashboard() {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [allProperties, setAllProperties] = useState([]);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [recentActivities, setRecentActivities] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [showAllProperties, setShowAllProperties] = useState(false);

  const getDaySuffix = (day) => {
    if (!day) return '';
    const lastDigit = day % 10;
    const lastTwoDigits = day % 100;
    
    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) return 'th';
    if (lastDigit === 1) return 'st';
    if (lastDigit === 2) return 'nd';
    if (lastDigit === 3) return 'rd';
    return 'th';
  };

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    const storedEmail = localStorage.getItem('userEmail');
    
    if (storedName) {
      setUserName(storedName);
    } else if (storedEmail) {
      const nameFromEmail = storedEmail.split('@')[0];
      setUserName(nameFromEmail);
    }
    
    fetchProperties();
    fetchDashboardStats();
    fetchRecentActivities();
    fetchUpcomingEvents();
  }, []);

  const fetchProperties = async () => {
    try {
      const data = await getAllProperties();
      setAllProperties(data);
      // Show first 2 properties as featured
      setFeaturedProperties(data.slice(0, 2));
    } catch (err) {
      console.error('Failed to load properties:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboardStats = async () => {
    try {
      const stats = await getTenantDashboard();
      setDashboardStats(stats);
    } catch (err) {
      console.error('Failed to load dashboard stats:', err);
    } finally {
      setStatsLoading(false);
    }
  };

  const fetchRecentActivities = async () => {
    const activities = [
      { id: 1, type: 'payment', title: 'Rent Payment', description: 'Paid monthly rent for March 2024', date: '2 days ago', status: 'completed' },
      { id: 2, type: 'request', title: 'Maintenance Request', description: 'Kitchen sink repair requested', date: '5 days ago', status: 'in-progress' },
      { id: 3, type: 'application', title: 'Property Application', description: 'Applied for Gulberg apartment', date: '1 week ago', status: 'pending' },
      { id: 4, type: 'message', title: 'New Message', description: 'Received message from property owner', date: '2 weeks ago', status: 'read' },
    ];
    setRecentActivities(activities);
  };

  const fetchUpcomingEvents = async () => {
    const events = [
      { id: 1, type: 'payment', title: 'Next Rent Due', date: 'March 5, 2024', amount: 'PKR 25,000' },
      { id: 2, type: 'inspection', title: 'Property Inspection', date: 'March 15, 2024', description: 'Quarterly maintenance check' },
      { id: 3, type: 'renewal', title: 'Lease Renewal', date: 'April 30, 2024', description: 'Current lease expires' },
    ];
    setUpcomingEvents(events);
  };

  const getWelcomeMessage = () => {
    if (!userName) {
      return "Welcome to Your Tenant Portal";
    }
    
    const formattedName = userName.charAt(0).toUpperCase() + userName.slice(1);
    return `Welcome, ${formattedName}!`;
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'payment': return '💰';
      case 'request': return '🔧';
      case 'application': return '📄';
      case 'message': return '💬';
      default: return '📌';
    }
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'payment': return '💳';
      case 'inspection': return '🔍';
      case 'renewal': return '📅';
      default: return '📌';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'in-progress': return 'text-blue-600 bg-blue-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'read': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
        {getWelcomeMessage()}
      </h2>

      <p className="text-gray-700 mb-10 text-lg max-w-3xl">
        Manage your rentals, track payments, and communicate with property owners.
      </p>

      {/* Statistics Section */}
      {!statsLoading && dashboardStats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 animate-fade-in">
          <Link href="/tenant/tenancies" className="card text-center hover:shadow-lg transition-shadow">
            <div className="text-2xl font-bold text-blue-600">{dashboardStats.activeTenancies > 0 ? '1' : '0'}</div>
            <div className="text-sm text-gray-600">Active Rental</div>
          </Link>
          <Link href="/tenant/applications" className="card text-center hover:shadow-lg transition-shadow">
            <div className="text-2xl font-bold text-green-600">{dashboardStats.pendingApplications || 0}</div>
            <div className="text-sm text-gray-600">Pending Apps</div>
          </Link>
          <Link href="/tenant/requests" className="card text-center hover:shadow-lg transition-shadow">
            <div className="text-2xl font-bold text-orange-600">{dashboardStats.openRequests || 0}</div>
            <div className="text-sm text-gray-600">Open Requests</div>
          </Link>
          <Link href="/tenant/payments" className="card text-center hover:shadow-lg transition-shadow">
            <div className="text-2xl font-bold text-purple-600">{dashboardStats.totalPayments || 0}</div>
            <div className="text-sm text-gray-600">Payments Made</div>
          </Link>
        </div>
      )}

      {/* Alerts Section */}
      <div className="mb-12">
        {/* Next Payment Due */}
        {!statsLoading && dashboardStats && dashboardStats.nextPaymentDue && dashboardStats.nextPaymentDue.amount && dashboardStats.nextPaymentDue.dueDate && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 animate-fade-in">
            <div className="flex items-center">
              <div className="text-blue-600 text-xl mr-3">💰</div>
              <div className="flex-1">
                <h3 className="text-blue-800 font-semibold">Next Payment Due</h3>
                <p className="text-blue-700 text-sm">
                  PKR {dashboardStats.nextPaymentDue.amount?.toLocaleString()} due on {dashboardStats.nextPaymentDue.dueDate}{getDaySuffix(dashboardStats.nextPaymentDue.dueDate)}
                </p>
              </div>
              <Link 
                href="/tenant/payments" 
                className="text-blue-600 hover:text-blue-800 font-medium text-sm"
              >
                Pay Now
              </Link>
            </div>
          </div>
        )}

        {/* Pending Payments Alert */}
        {!statsLoading && dashboardStats && dashboardStats.pendingRentPayments > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4 animate-fade-in">
            <div className="flex items-center">
              <div className="text-yellow-600 text-xl mr-3">⚠️</div>
              <div className="flex-1">
                <h3 className="text-yellow-800 font-semibold">Rent Payment Due</h3>
                <p className="text-yellow-700 text-sm">
                  Your rent payment is pending. Please make the payment to avoid late fees.
                </p>
              </div>
              <Link 
                href="/tenant/tenancies" 
                className="text-yellow-800 font-semibold text-sm hover:text-yellow-900"
              >
                Pay now →
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Dashboard Content Grid */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Recent Activities */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="text-2xl mt-1">{getActivityIcon(activity.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-gray-900 truncate">{activity.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(activity.status)}`}>
                      {activity.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                  <p className="text-xs text-gray-500 mt-2">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
          </div>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="text-2xl mt-1">{getEventIcon(event.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-gray-900 truncate">{event.title}</h4>
                    <span className="text-sm text-gray-600">{event.date}</span>
                  </div>
                  {event.description && (
                    <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                  )}
                  {event.amount && (
                    <p className="text-sm font-medium text-gray-900 mt-1">{event.amount}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Tips Section */}
      <div className="card mb-12">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Tips</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-blue-600 text-xl mb-2">📱</div>
            <h4 className="font-medium text-blue-900 mb-1">Report Issues Quickly</h4>
            <p className="text-sm text-blue-700">
              Use the Support Requests section to report maintenance issues promptly.
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-green-600 text-xl mb-2">💳</div>
            <h4 className="font-medium text-green-900 mb-1">Timely Payments</h4>
            <p className="text-sm text-green-700">
              Make rent payments on time to avoid late fees and maintain good standing.
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-purple-600 text-xl mb-2">📄</div>
            <h4 className="font-medium text-purple-900 mb-1">Keep Documents Ready</h4>
            <p className="text-sm text-purple-700">
              Have your lease agreement and payment receipts easily accessible.
            </p>
          </div>
        </div>
      </div>

      {/* Properties Section */}
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            {showAllProperties ? 'Available Properties' : 'Featured Properties'}
          </h3>
          <button
            onClick={() => setShowAllProperties(!showAllProperties)}
            className="text-sm text-emerald-600 font-medium hover:text-emerald-700 flex items-center gap-1"
          >
            {showAllProperties ? 'Show Featured Only' : 'Browse All Properties'}
            {showAllProperties ? '↑' : '↓'}
          </button>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded mb-4"></div>
                <div className="p-5">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : showAllProperties ? (
          // Show all properties
          <div>
            {allProperties.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allProperties.map((property) => (
                  <div key={property._id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="h-48 bg-gray-100 flex items-center justify-center relative">
                      {property.images && property.images.length > 0 ? (
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <span className="text-4xl">🏠</span>
                      
                      {/* Property Type Badge */}
                      <div className="absolute top-3 right-3">
                        <span className="bg-gray-800 text-white px-2 py-1 rounded text-xs font-medium">
                          {property.propertyType?.toUpperCase() || 'PROPERTY'}
                        </span>
                      </div>
                      
                      {/* Availability Badge */}
                      <div className="absolute top-3 left-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          property.availability === 'available' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {property.availability === 'available' ? 'Available' : 'Rented'}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h4 className="font-semibold text-gray-900 mb-2">{property.title}</h4>
                      <p className="text-gray-600 text-sm mb-3">{property.location}, {property.city}</p>
                      
                      {/* Property Features */}
                      <div className="flex items-center space-x-4 text-gray-600 text-sm mb-3">
                        <span className="flex items-center">
                          🛏 {property.bedrooms || 'N/A'}
                        </span>
                        <span className="flex items-center">
                          🛁 {property.bathrooms || 'N/A'}
                        </span>
                        <span className="flex items-center">
                          📐 {property.area ? `${property.area} sqft` : 'N/A'}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-emerald-600 font-bold">PKR {property.price?.toLocaleString()}/mo</span>
                        <Link
                          href={`/tenant/dashboard?from=property&id=${property._id}`}
                          className="btn-primary text-sm"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No properties available at the moment.</p>
              </div>
            )}
          </div>
        ) : (
          // Show featured properties only
          <div>
            {featuredProperties.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {featuredProperties.map((property) => (
                  <div key={property._id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="h-48 bg-gray-100 flex items-center justify-center relative">
                      {property.images && property.images.length > 0 ? (
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <span className="text-4xl">🏠</span>
                      
                      {/* Featured Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                          FEATURED
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h4 className="font-semibold text-gray-900 mb-2">{property.title}</h4>
                      <p className="text-gray-600 text-sm mb-3">{property.location}, {property.city}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-emerald-600 font-bold">PKR {property.price?.toLocaleString()}/mo</span>
                        <Link
                          href={`/tenant/dashboard?from=property&id=${property._id}`}
                          className="btn-primary text-sm"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No properties available at the moment.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function DashboardPageContent() {
  const params = useSearchParams();
  const fromProperty = params.get("from") === "property";

  return fromProperty ? <PropertyDetailDashboard /> : <TenantHomeDashboard />;
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-lg text-gray-600">Loading...</div>
        </div>
      </div>
    }>
      <DashboardPageContent />
    </Suspense>
  );
}