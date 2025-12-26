"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../Header";
import { getTenantPayments, payRent } from "../../../services/paymentService";
import { getTenantTenancies } from "../../../services/tenancyService";

export default function PaymentHistoryPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tenancies, setTenancies] = useState([]);
const [selectedTenancy, setSelectedTenancy] = useState("");
const [amount, setAmount] = useState("");


  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const data = await getTenantPayments();
      setPayments(data);
    } catch (err) {
      setError('Failed to load payment history');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTenancies();
  }, []);

  const loadTenancies = async () => {
    const data = await getTenantTenancies();
    setTenancies(data);
  };

  if (loading) {
    return (
      <div className="page-container">
        <Header />
        <div className="content-container">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading payment history...</p>
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
            <button onClick={fetchPayments} className="btn-primary">
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
            Payment History
          </h1>
          <p className="text-gray-600 text-base">
            View all your rent payments and transaction records
          </p>
        </div>

        {/* Payment Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-fade-in">
          <div className="card text-center">
            <div className="text-2xl font-bold text-blue-600">{payments.length}</div>
            <div className="text-sm text-gray-600">Total Payments</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-green-600">
              PKR {payments.reduce((sum, payment) => sum + payment.amount, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Amount Paid</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-purple-600">
              {payments.length > 0 ? 'PKR ' + Math.round(payments.reduce((sum, payment) => sum + payment.amount, 0) / payments.length).toLocaleString() : '0'}
            </div>
            <div className="text-sm text-gray-600">Average Payment</div>
          </div>
        </div>

        <div className="card mb-8 animate-fade-in">
  <h2 className="text-xl font-bold mb-4">Pay Rent</h2>

  <select
    className="input-field mb-3"
    value={selectedTenancy}
    onChange={(e) => setSelectedTenancy(e.target.value)}
  >
    <option value="">Select Tenancy</option>
    {tenancies.map((t) => (
      <option key={t._id} value={t._id}>
        {t.property?.title}
      </option>
    ))}
  </select>

  <input
    type="number"
    placeholder="Amount"
    className="input-field mb-4"
    value={amount}
    onChange={(e) => setAmount(e.target.value)}
  />

  <button
    className="btn-primary"
    onClick={async () => {
      try {
        await payRent({
          tenancyId: selectedTenancy,
          amount
        });
        alert("Rent paid successfully");
        fetchPayments();
      } catch {
        alert("Payment failed");
      }
    }}
  >
    Pay Rent
  </button>
</div>


        {/* Payments List */}
        {payments.length > 0 ? (
          <div className="space-y-4">
            {payments.map((payment) => (
              <div key={payment._id} className="card animate-fade-in">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    {/* Property Image */}
                    <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      {payment.property?.images?.length > 0 ? (
                        <img
                          src={payment.property.images[0]}
                          alt={payment.property.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          🏠
                        </div>
                      )}
                    </div>

                    {/* Payment Details */}
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {payment.property?.title || 'Property'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {payment.month} • {new Date(payment.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="text-right">
                    <div className="text-xl font-bold text-green-600">
                      PKR {payment.amount.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">Paid</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="mt-12 card animate-fade-in text-center">
            <div className="text-6xl text-gray-400 mb-4">💳</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No Payment History
            </h2>
            <p className="text-gray-600 text-base mb-6">
              You haven't made any rent payments yet.
            </p>
            <Link href="/tenant/tenancies" className="btn-primary">
              View Tenancies
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}