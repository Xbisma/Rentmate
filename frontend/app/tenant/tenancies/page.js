"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../Header";
import { getTenantTenancies } from "../../../services/tenancyService";
import { payRent } from "../../../services/paymentService";

export default function MyTenanciesPage() {
  const [tenancies, setTenancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [payingTenancy, setPayingTenancy] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to view your tenancies');
      setLoading(false);
      return;
    }

    fetchTenancies();
  }, []);

  const fetchTenancies = async () => {
    try {
      const data = await getTenantTenancies();
      setTenancies(data);
    } catch (err) {
      setError('Failed to load tenancies');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePayRent = async (tenancyId) => {
    setPayingTenancy(tenancyId);
    try {
      await payRent({ tenancyId });
      // Refresh tenancies to show updated payment status
      await fetchTenancies();
      alert('Rent paid successfully!');
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setPayingTenancy(null);
    }
  };

  const getRentStatus = (tenancy) => {
    const today = new Date();
    const dueDate = new Date(today.getFullYear(), today.getMonth(), tenancy.rentDueDate);

    if (tenancy.rentPaid) {
      return { status: 'Paid', color: 'text-green-600', bgColor: 'bg-green-100' };
    } else if (today > dueDate) {
      return { status: 'Overdue', color: 'text-red-600', bgColor: 'bg-red-100' };
    } else {
      return { status: 'Pending', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <Header />
        <div className="content-container">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your tenancies...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <Header />
        <div className="content-container">
          <div className="card text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
            <p className="text-gray-600 mb-4">{error}</p>
            <button onClick={fetchTenancies} className="btn-primary">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Header />
      <div className="content-container">
        {/* Back to Home Button */}
        <Link
          href="/tenant/dashboard"
          className="btn-secondary inline-flex items-center gap-2 mb-6 animate-fade-in"
        >
          ← Back to Home
        </Link>

        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            My Rental
          </h1>
          <p className="text-gray-600 text-base">
            Manage your current rental agreement and payments
          </p>
        </div>

        {/* Tenancies List */}
        {tenancies.length > 0 ? (
          <div className="space-y-6 mt-8">
            {tenancies.map((tenancy) => {
              const rentStatus = getRentStatus(tenancy);
              return (
                <div key={tenancy._id} className="card animate-fade-in">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        {/* Property Image */}
                        <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          {tenancy.property?.images?.length > 0 ? (
                            <img
                              src={tenancy.property.images[0]}
                              alt={tenancy.property.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              🏠
                            </div>
                          )}
                        </div>

                        {/* Property Details */}
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">
                            {tenancy.property?.title || 'Property'}
                          </h3>
                          <p className="text-gray-600 mb-2">
                            {tenancy.property?.location || 'Location not available'}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>Rent: PKR {tenancy.rentAmount?.toLocaleString()}</span>
                            <span>Due: {tenancy.rentDueDate}th of each month</span>
                            <span>Lease ends: {new Date(tenancy.leaseEndDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Rent Status and Actions */}
                    <div className="mt-4 md:mt-0 md:ml-6 flex flex-col items-end gap-3">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${rentStatus.bgColor} ${rentStatus.color}`}>
                        {rentStatus.status}
                      </div>

                      {!tenancy.rentPaid && (
                        <button
                          onClick={() => handlePayRent(tenancy._id)}
                          disabled={payingTenancy === tenancy._id}
                          className="btn-primary text-sm px-4 py-2"
                        >
                          {payingTenancy === tenancy._id ? 'Processing...' : 'Pay Rent'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty state */
          <div className="mt-12 card animate-fade-in text-center">
            <div className="text-6xl text-gray-400 mb-4">🏠</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No Active Rental
            </h2>
            <p className="text-gray-600 text-base mb-6">
              You don't have an active rental agreement yet.
            </p>
            <Link href="/tenant/search" className="btn-primary">
              Find a Property
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}