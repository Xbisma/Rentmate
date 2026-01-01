"use client";
import { useState, useEffect } from "react";
import { getTenantPayments, payRent } from "../../../services/paymentService";
import { getTenantTenancies } from "../../../services/tenancyService";

export default function PaymentHistoryPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tenancies, setTenancies] = useState([]);
  const [selectedTenancy, setSelectedTenancy] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchPayments();
    loadTenancies();
  }, []);

  const fetchPayments = async () => {
    try {
      const data = await getTenantPayments();
      setPayments(data);
    } catch (err) {
      setError("Failed to load payment history");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadTenancies = async () => {
    try {
      const data = await getTenantTenancies();
      setTenancies(
        data.filter((t) => t.status === "approved" && t.paymentStatus !== "paid")
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handlePayRent = async (tenancyId) => {
    const confirmed = window.confirm(
      "Are you sure you want to make this payment?"
    );
    if (!confirmed) return;

    setProcessing(true);
    try {
      await payRent({ tenancyId }); // call your API
      alert("Payment successful!");
      fetchPayments();
      loadTenancies();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Payment failed!");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="page-container">
      <div className="content-container">        

        <h1 className="text-3xl font-bold mb-4">Payment History</h1>

        {/* Pay Rent Section */}
        {tenancies.length > 0 && (
          <div className="card mb-8">
            <h2 className="text-xl font-bold mb-4">Pay Rent</h2>

            {tenancies.map((t) => (
              <div key={t._id} className="flex justify-between items-center mb-3">
                <span>
                  {t.property?.title} • PKR {t.rentAmount?.toLocaleString()}
                </span>
                <button
                  className="btn-primary"
                  disabled={processing}
                  onClick={() => handlePayRent(t._id)}
                >
                  {processing ? "Processing..." : "Make Payment"}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Payment History List */}
        {payments.length > 0 ? (
          <div className="space-y-4">
            {payments.map((payment) => (
              <div key={payment._id} className="card">
                <div className="flex justify-between items-center">
                  <span>{payment.property?.title}</span>
                  <span>PKR {payment.amount.toLocaleString()}</span>
                  <span>{payment.month}</span>
                  <span className="text-green-600">Paid</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>No payment history yet.</div>
        )}
      </div>
    </div>
  );
}
