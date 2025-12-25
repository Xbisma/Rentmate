"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState, Suspense } from "react";

function PropertyDetailDashboard() {
  const images = [
    "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
    "https://images.pexels.com/photos/259962/pexels-photo-259962.jpeg",
    "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
    "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
  ];

  const [current, setCurrent] = useState(0);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);

  const nextImg = () => setCurrent((current + 1) % images.length);
  const prevImg = () =>
    setCurrent((current - 1 + images.length) % images.length);

  return (
    <div className="page-container">
      <div className="content-container">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">
          Welcome to Tenant Portal
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
              <li><span className="font-medium">Type:</span> House</li>
              <li><span className="font-medium">Price:</span> PKR 1.25 Lakh</li>
              <li><span className="font-medium">Location:</span> Top City 1, Islamabad</li>
            </ul>
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
  return (
    <div className="page-container">
      <div className="content-container">
        <div className="animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
            Welcome to Tenant Portal
          </h2>

          <p className="text-gray-700 mb-10 text-lg max-w-3xl">
            Search for properties, view details, and communicate with property owners.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Link
            href="/tenant/search"
            className="card card-hover animate-fade-in flex gap-4 items-start"
          >
            <span className="text-2xl mt-1">🔍</span>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">Search Properties</h3>
              <p className="text-gray-600 mt-1">Find your perfect rental property</p>
            </div>
          </Link>

          <Link
            href="/tenant/requests"
            className="card card-hover animate-fade-in flex gap-4 items-start"
          >
            <span className="text-2xl mt-1">💬</span>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">View Requests</h3>
              <p className="text-gray-600 mt-1">Check your requests and messages</p>
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
          <div className="card card-hover animate-fade-in">
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <span className="text-4xl">🏠</span>
            </div>
            <div className="p-5">
              <h4 className="font-semibold text-gray-900">Modern 3BR Apartment</h4>
              <div className="flex justify-between items-center mt-3">
                <span className="text-emerald-600 font-bold">Rs 85,000/mo</span>
                <Link
                  href="/tenant/dashboard?from=property"
                  className="btn-primary text-sm"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
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