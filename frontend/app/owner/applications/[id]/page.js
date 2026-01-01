"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Add this import
import Link from "next/link";
import { getOwnerApplicationById, updateApplicationStatus } from "../../../../services/rentalApplicationService";

export default function ApplicationDetailPage() { // Remove params prop
  const params = useParams(); // Use useParams hook
  const id = params.id; // Extract id from params

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) { // Check if id exists
      fetchApplication();
    }
  }, [id]); // Add id as dependency

  const fetchApplication = async () => {
    try {
      setLoading(true);
      const data = await getOwnerApplicationById(id);
      setApplication(data);
    } catch (err) {
      console.error("Failed to load application:", err);
      setError("Failed to load application");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (status) => {
    if (!confirm(`Are you sure you want to ${status} this application?`)) return;
    try {
      await updateApplicationStatus(id, status);
      alert("Application updated");
      fetchApplication();
    } catch (err) {
      console.error("Failed to update application:", err);
      alert("Failed to update application");
    }
  };

  return (
    <div className="page-container">

      <div className="content-container py-8 max-w-4xl mx-auto">
        <Link
          href="/owner/applications"
          className="btn-outline inline-flex items-center gap-2 mb-6"
        >
          ← Back to Applications
        </Link>
        
        {loading && <div className="text-center p-8">Loading...</div>}

        {!loading && error && (
          <div className="text-center p-8 text-red-600">{error}</div>
        )}

        {!loading && !application && (
          <div className="text-center p-8">Application not found</div>
        )}

        {application && (
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-2">
              Application for: {application.property?.title || "Property"}
            </h2>

            <div className="text-sm text-gray-600">
              📍 {application.property?.location || "Location not available"}
            </div>

            <div className="text-sm text-gray-600 mt-1">
              💰 Rent: Rs{" "}
              {application.property?.price
                ? application.property.price.toLocaleString()
                : "N/A"}
            </div>

            <div className="text-sm text-gray-600 mt-3">
              Applicant: {application.tenant?.name || "Tenant"}
            </div>

            <div className="text-sm text-gray-600">
              Applied: {new Date(application.createdAt).toLocaleString()}
            </div>

            {application.message && (
              <div className="mt-4 text-gray-700">
                <strong>Message:</strong> {application.message}
              </div>
            )}

            <div className="mt-6 flex gap-3">
              {application.status === "pending" && (
                <>
                  <button
                    onClick={() => handleUpdate("approved")}
                    className="px-4 py-2 rounded bg-emerald-600 text-white"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleUpdate("rejected")}
                    className="px-4 py-2 rounded bg-red-600 text-white"
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}