"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getOwnerApplications, updateApplicationStatus } from "../../../services/rentalApplicationService";

export default function OwnerApplicationsPage() {
  const router = useRouter();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await getOwnerApplications();
      setApplications(data || []);
    } catch (err) {
      console.error("Failed to load owner applications:", err);
      setError("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id, status) => {
    if (!confirm(`Are you sure you want to ${status} this application?`)) return;
    try {
      await updateApplicationStatus(id, status);
      fetchApplications();
      alert("Application updated");
    } catch (err) {
      console.error("Failed to update application:", err);
      alert("Failed to update application");
    }
  };

  return (
    <div className="page-container">

      <div className="content-container py-8">
        <div className="max-w-4xl mx-auto">

          <h1 className="text-3xl font-bold mb-4">Applications</h1>
          <p className="text-gray-600 mb-6">
            View and manage rental applications for your properties.
          </p>

          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading applications...</p>
            </div>
          )}

          {!loading && error && (
            <div className="card p-6 text-center text-red-600">
              {error}
            </div>
          )}

          {!loading && !error && applications.length === 0 && (
            <div className="card p-6 text-center">
              <p>No applications at the moment.</p>
            </div>
          )}

          {!loading && !error && applications.length > 0 && (
            <div className="space-y-4">
              {applications.map((app) => (
                <div
                  key={app._id}
                  onClick={() =>
                    router.push(`/owner/applications/${app._id}`)
                  }
                  className="card p-4 flex justify-between items-center cursor-pointer hover:shadow-lg transition"
                >
                  {/* LEFT SIDE */}
                  <div>
                    {/* Property Title */}
                    <div className="text-lg font-semibold text-gray-900">
                      {app.property?.title || "Property"}
                    </div>

                    {/* Property Location */}
                    <div className="text-sm text-gray-600">
                      {app.property?.location || "Location not available"}
                    </div>

                    {/* Property Rent */}
                    <div className="text-sm text-gray-600">
                      Rent: Rs{" "}
                      {app.property?.price
                        ? app.property.price.toLocaleString()
                        : "N/A"}
                    </div>

                    {/* Tenant Info */}
                    <div className="text-sm text-gray-600">
                      Applicant: {app.tenant?.name || "Tenant"}
                    </div>

                    {/* Date */}
                    <div className="text-sm text-gray-600">
                      Applied:{" "}
                      {new Date(app.createdAt).toLocaleString()}
                    </div>

                    {/* Message */}
                    {app.message && (
                      <div className="mt-2 text-sm text-gray-700">
                        {app.message}
                      </div>
                    )}
                  </div>

                  {/* RIGHT SIDE */}
                  <div className="text-right flex flex-col items-end gap-2">
                    <div
                      className={`inline-block px-3 py-1 rounded-full text-sm ${
                        app.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : app.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {app.status}
                    </div>

                    {app.status === "pending" && (
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUpdate(app._id, "approved");
                          }}
                          className="px-3 py-1 rounded bg-emerald-600 text-white text-sm"
                        >
                          Approve
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUpdate(app._id, "rejected");
                          }}
                          className="px-3 py-1 rounded bg-red-600 text-white text-sm"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
