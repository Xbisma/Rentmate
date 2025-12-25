'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../Header';
import { getOwnerMaintenanceRequests, updateMaintenanceRequestStatus } from '../../../services/maintenanceService';

export default function MaintenanceRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const data = await getOwnerMaintenanceRequests();
      setRequests(data);
    } catch (err) {
      setError('Failed to load maintenance requests');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await updateMaintenanceRequestStatus(id, { status: newStatus });
      // Update local state
      setRequests(requests.map(req =>
        req._id === id ? { ...req, status: newStatus } : req
      ));
    } catch (err) {
      console.error('Failed to update status:', err);
      alert('Failed to update status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="page-container">
        <Header />
        <main className="content-container">
          <div className="text-center">Loading maintenance requests...</div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <Header />
        <main className="content-container">
          <div className="text-center text-red-600">{error}</div>
        </main>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Header />

      <main className="content-container">
        {/* Back to Dashboard Button */}
        <Link
          href="/owner/dashboard"
          className="btn-outline inline-flex items-center gap-2 mb-6"
        >
          ← Back to Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Maintenance Requests</h1>
          <p className="text-gray-600">Manage maintenance requests from your tenants</p>
        </div>

        {requests.length === 0 ? (
          <div className="card text-center">
            <p className="text-gray-600">No maintenance requests yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {requests.map((request) => (
              <div key={request._id} className="card card-hover animate-fade-in">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {request.property?.title || 'Property'}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Tenant: {request.tenant?.name || 'Unknown'}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Submitted: {formatDate(request.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`status-badge ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-700">
                    <strong>Issue:</strong> {request.issue}
                  </p>
                </div>

                <div className="flex gap-2">
                  <select
                    value={request.status}
                    onChange={(e) => updateStatus(request._id, e.target.value)}
                    className="input-field"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}