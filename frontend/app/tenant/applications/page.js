"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getTenantApplications } from "../../../services/rentalApplicationService";
import { payRent } from "../../../services/paymentService";

export default function TenantApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchApplications();
    const onFocus = () => fetchApplications();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await getTenantApplications();
      setApplications(data || []);
    } catch (err) {
      console.error("Failed to load tenant applications:", err);
      setError("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  const handleMakePayment = async (tenancyId) => {
    if (!tenancyId) {
      alert("Tenancy not found!");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to make this payment?"
    );
    if (!confirmed) return;

    setProcessing(true);

    try {
      await payRent({ tenancyId }); // Call backend API
      alert("Payment successful!");
      fetchApplications(); // Refresh the applications list
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Payment failed!");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="page-container">

      <div className="content-container py-8">
        <div className="max-w-4xl mx-auto">

          <h1 className="text-3xl font-bold mb-4">My Applications</h1>
          <p className="text-gray-600 mb-6">
            Your rental applications and their current status.
          </p>

          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading your applications...</p>
            </div>
          )}

          {!loading && error && (
            <div className="card p-6 text-center text-red-600">{error}</div>
          )}

          {!loading && !error && applications.length === 0 && (
            <div className="card p-6 text-center">
              <p className="mb-4">You have no applications yet.</p>
              <Link href="/" className="btn-primary">
                Browse properties
              </Link>
            </div>
          )}

          {!loading && !error && applications.length > 0 && (
            <div className="space-y-4">
              {applications.map((app) => {
                const property = app.property;
                const tenancyId = app.tenancy?._id; // ensure tenancy ID exists
                const date = new Date(app.createdAt).toLocaleString();

                return (
                  <div
                    key={app._id}
                    className="card p-4 flex justify-between items-center"
                  >
                    <div>
                      <Link
                        href={`/properties/${property?._id}`}
                        className="text-lg font-semibold text-blue-600 hover:underline"
                      >
                        {property?.title || "Property"}
                      </Link>

                      <div className="text-sm text-gray-600">{date}</div>

                      {property && typeof property === "object" && (
                        <div className="text-sm text-gray-700 mt-2 space-y-1">
                          <div>City: {property.city}</div>
                          <div>Price: PKR {property.price?.toLocaleString()}</div>
                          <div>
                            🛏 {property.bedrooms} Beds | 🛁 {property.bathrooms} Baths
                          </div>
                        </div>
                      )}

                      {app.message && (
                        <div className="text-sm text-gray-700 mt-2">
                          Message: {app.message}
                        </div>
                      )}
                    </div>

                    <div className="text-right">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm capitalize ${
                          app.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : app.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {app.status}
                      </span>

                      {/* Only show Make Payment button if tenancy exists */}
                      {app.status === "approved" && tenancyId && (
                        <button
                          className="block mt-3 text-sm text-emerald-600 hover:underline"
                          onClick={() => handleMakePayment(tenancyId)}
                          disabled={processing}
                        >
                          {processing ? "Processing..." : "Make Payment"}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
