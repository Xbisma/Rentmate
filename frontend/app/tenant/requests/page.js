"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getTenantMaintenanceRequests, createMaintenanceRequest } from "../../../services/maintenanceService";

export default function MyRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [message, setMessage] = useState("");


  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const data = await getTenantMaintenanceRequests();
      setRequests(data);
    } catch (err) {
      setError('Failed to load requests');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
  try {
    await createMaintenanceRequest({
      title: "Maintenance",
      description: message,
    });
    alert("Request submitted");
    setShowRequestModal(false);
  } catch (err) {
      alert("Failed to submit request");
    }
  };

  const getStatusCounts = () => {
    const counts = { pending: 0, 'in-progress': 0, resolved: 0 };
    requests.forEach(request => {
      counts[request.status] = (counts[request.status] || 0) + 1;
    });
    return counts;
  };

  const statusCounts = getStatusCounts();

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-500';
      case 'in-progress': return 'text-emerald-400';
      case 'resolved': return 'text-emerald-600';
      default: return 'text-gray-500';
    }
  };

  const getStatusEmoji = (status) => {
    switch (status) {
      case 'pending': return '⏱️';
      case 'in-progress': return '❗';
      case 'resolved': return '✅';
      default: return '❓';
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="content-container">
          <div className="card text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your requests...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="content-container">
          <div className="card text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
            <p className="text-gray-600 mb-4">{error}</p>
            <button onClick={fetchRequests} className="btn-primary">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="page-container">
      <div className="content-container">
        {/* BACK TO HOME BUTTON */}
        <Link 
          href="/tenant/dashboard" 
          className="btn-secondary inline-flex items-center gap-2 mb-6 animate-fade-in"
        >
          ← Back to Home
        </Link>

        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            My Requests
          </h1>
          <p className="text-gray-600 text-base">
            View and track all your requests to property owners
          </p>
        </div>

        {/* New Request Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={() => setShowRequestModal(true)}
            className="btn-primary"
          >
              Send Request
          </button>
          {showRequestModal && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">New Maintenance Request</h2>

                <textarea
                  className="input-field w-full mb-4"
                  rows={4}
                  placeholder="Describe the issue..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <div className="flex justify-end gap-3">
                <button
                  className="btn-secondary"
                  onClick={() => setShowRequestModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn-primary"
                  onClick={handleSubmit}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
        </div>


        {/* Status cards */}
        <section className="flex flex-col md:flex-row gap-5 my-6">
          {/* Pending Card */}
          <div className="flex-1 min-w-0 card card-hover animate-fade-in flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500 mb-1.5">Pending</div>
              <div className={`text-3xl font-extrabold ${getStatusColor('pending')}`}>{statusCounts.pending}</div>
            </div>
            <div className={`text-2xl ${getStatusColor('pending')} opacity-95`} aria-hidden>
              {getStatusEmoji('pending')}
            </div>
          </div>

          {/* In Progress Card */}
          <div className="flex-1 min-w-0 card card-hover animate-fade-in flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500 mb-1.5">In Progress</div>
              <div className={`text-3xl font-extrabold ${getStatusColor('in-progress')}`}>{statusCounts['in-progress']}</div>
            </div>
            <div className={`text-2xl ${getStatusColor('in-progress')} opacity-95`} aria-hidden>
              {getStatusEmoji('in-progress')}
            </div>
          </div>

          {/* Resolved Card */}
          <div className="flex-1 min-w-0 card card-hover animate-fade-in flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500 mb-1.5">Resolved</div>
              <div className={`text-3xl font-extrabold ${getStatusColor('resolved')}`}>{statusCounts.resolved}</div>
            </div>
            <div className={`text-2xl ${getStatusColor('resolved')} opacity-95`} aria-hidden>
              {getStatusEmoji('resolved')}
            </div>
          </div>
        </section>

        {/* Horizontal Divider */}
        <div className="my-8 border-t border-gray-200"></div>

        {/* Requests List */}
        {requests.length > 0 ? (
          <section className="space-y-4">
            {requests.map((request) => (
              <div key={request._id} className="card animate-fade-in">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {request.property?.title || 'Property'}
                    </h3>
                    <p className="text-gray-600 mb-3">{request.issue}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Created: {new Date(request.createdAt).toLocaleDateString()}</span>
                      {request.updatedAt !== request.createdAt && (
                        <span>Updated: {new Date(request.updatedAt).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                  <div className="ml-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      request.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {request.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </section>
        ) : (
          /* Empty state */
          <section className="mt-6 card animate-fade-in text-center">
            <div className="text-5xl text-gray-400 mb-3">💬</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No Requests Yet
            </h2>
            <p className="text-gray-600 text-base">
              You haven't sent any requests to property owners yet.
            </p>
          </section>
        )}
      </div>
    </div>
  );
}