"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState, Suspense, useEffect } from "react";
import Header from "../Header";
import Footer from "../../components/Footer";
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
      // If no ID, show a default/fallback property or redirect
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
      <div className="page-container">
        <Header />
        <div className="content-container">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading property details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="page-container">
        <Header />
        <div className="content-container">
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">{error || 'Property not found'}</p>
            <Link href="/tenant/dashboard" className="btn-primary">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const images = property.images && property.images.length > 0 ? property.images : [
    "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg"
  ];
  // Add these two functions for image navigation
  const nextImg = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImg = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  return (
    <div className="page-container">
      <div className="content-container">
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
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProperties();
    fetchDashboardStats();
  }, []);

  const fetchFeaturedProperties = async () => {
    try {
      const data = await getAllProperties();
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
  return (
    <div className="page-container">
      <Header />
      <div className="content-container">
        <div className="animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
            Welcome to Your Tenant Portal
          </h2>

          <p className="text-gray-700 mb-10 text-lg max-w-3xl">
            Search for properties, view details, and communicate with property owners.
          </p>
        </div>

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

        {/* Next Payment Due */}
        {!statsLoading && dashboardStats && dashboardStats.nextPaymentDue && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 animate-fade-in">
            <div className="flex items-center">
              <div className="text-blue-600 text-xl mr-3">💰</div>
              <div>
                <h3 className="text-blue-800 font-semibold">Next Payment Due</h3>
                <p className="text-blue-700 text-sm">
                  PKR {dashboardStats.nextPaymentDue.amount?.toLocaleString()} due on the {dashboardStats.nextPaymentDue.dueDate}th
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Pending Payments Alert */}
        {!statsLoading && dashboardStats && dashboardStats.pendingRentPayments > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8 animate-fade-in">
            <div className="flex items-center">
              <div className="text-yellow-600 text-xl mr-3">⚠️</div>
              <div>
                <h3 className="text-yellow-800 font-semibold">Rent Payment Due</h3>
                <p className="text-yellow-700 text-sm">
                  Your rent payment is pending.
                  <Link href="/tenant/tenancies" className="ml-2 underline hover:text-yellow-900">
                    Pay now →
                  </Link>
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Link
            href="/tenant/search"
            className="card card-hover animate-fade-in flex gap-4 items-start"
          >
            <span className="text-2xl mt-1">🔍</span>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">Find Properties</h3>
              <p className="text-gray-600 mt-1">Search and apply for rental properties</p>
            </div>
          </Link>

          <Link
            href="/tenant/tenancies"
            className="card card-hover animate-fade-in flex gap-4 items-start"
          >
            <span className="text-2xl mt-1">🏠</span>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">My Rental</h3>
              <p className="text-gray-600 mt-1">Manage your current rental property</p>
            </div>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Link
            href="/tenant/requests"
            className="card card-hover animate-fade-in flex gap-4 items-start"
          >
            <span className="text-2xl mt-1">💬</span>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">Support Requests</h3>
              <p className="text-gray-600 mt-1">Maintenance and property inquiries</p>
            </div>
          </Link>

          <Link
            href="/tenant/payments"
            className="card card-hover animate-fade-in flex gap-4 items-start"
          >
            <span className="text-2xl mt-1">💳</span>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">Payment History</h3>
              <p className="text-gray-600 mt-1">View all rent payments and receipts</p>
            </div>
          </Link>
        </div>

        <div className="flex justify-between items-center mb-5 animate-fade-in">
          <h3 className="text-lg font-semibold text-gray-900">Featured Properties</h3>
          <Link
            href="/tenant/search"
            className="text-sm text-emerald-600 font-medium hover:text-emerald-700 flex items-center gap-1"
          >
            View All →
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="card animate-pulse">
                <div className="h-48 bg-gray-200 rounded mb-4"></div>
                <div className="p-5">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))
          ) : featuredProperties.length > 0 ? (
            featuredProperties.map((property) => (
              <div key={property._id} className="card card-hover animate-fade-in">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  {property.images && property.images.length > 0 ? (
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-full object-cover rounded-t-lg"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <span className="text-4xl">🏠</span>
                </div>
                <div className="p-5">
                  <h4 className="font-semibold text-gray-900">{property.title}</h4>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-emerald-600 font-bold">Rs {property.price?.toLocaleString()}/mo</span>
                    <Link
                      href={`/tenant/dashboard?from=property&id=${property._id}`}
                      className="btn-primary text-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">No properties available at the moment.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="page-container">
        <div className="content-container">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <div className="text-lg text-gray-600">Loading...</div>
            </div>
          </div>
        </div>
      </div>
    }>
      <DashboardPageContent />
    </Suspense>
  );
}

function DashboardPageContent() {
  const params = useSearchParams();
  const fromProperty = params.get("from") === "property";

  return fromProperty ? <PropertyDetailDashboard /> : <TenantHomeDashboard />;
}