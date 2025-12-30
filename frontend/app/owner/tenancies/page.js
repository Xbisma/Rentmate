'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Footer from '../../components/Footer';
import Header from '../Header';
import { getOwnerTenancies } from '../../../services/tenancyService';

export default function Tenancies() {
  const [tenancies, setTenancies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTenancies();
  }, []);

  const fetchTenancies = async () => {
    try {
      const data = await getOwnerTenancies();

      // transform backend data → UI format
      const transformed = data.map(t => ({
        id: t._id,
        propertyName: t.property?.title || t.property?.location || 'Property',
        tenantName: t.tenant?.name || 'Tenant',
        monthlyRent: t.rentAmount,
        paymentStatus: 'Pending', // can improve later
        contractStatus: 'Active',
        leaseStart: t.createdAt,
        leaseEnd: t.leaseEndDate
      }));

      setTenancies(transformed);
    } catch (err) {
      console.error("Failed to load tenancies", err);
    }
  };

  const filteredTenancies = tenancies.filter(t =>
    t.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.tenantName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = d => new Date(d).toLocaleDateString();
  const formatCurrency = a => `PKR ${a?.toLocaleString() || 0}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        {/* HEADER */}
        <div className="flex justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Your Tenancies</h1>
            <p className="text-gray-800">Manage your rental agreements</p>
          </div>

          <Link href="/owner/dashboard" className="btn-secondary px-6 py-3 rounded-xl">
            Back to Home
          </Link>
        </div>

        {/* SEARCH */}
        <input
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="border px-4 py-2 rounded mb-6"
        />

        {/* TABLE */}
        <div className="card overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4">Property</th>
                <th className="px-6 py-4">Tenant</th>
                <th className="px-6 py-4">Rent</th>
                <th className="px-6 py-4">Lease Start</th>
                <th className="px-6 py-4">Lease End</th>
              </tr>
            </thead>
            <tbody>
              {filteredTenancies.map(t => (
                <tr key={t.id}>
                  <td className="px-6 py-4">{t.propertyName}</td>
                  <td className="px-6 py-4">{t.tenantName}</td>
                  <td className="px-6 py-4">{formatCurrency(t.monthlyRent)}</td>
                  <td className="px-6 py-4">{formatDate(t.leaseStart)}</td>
                  <td className="px-6 py-4">{formatDate(t.leaseEnd)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTenancies.length === 0 && (
          <div className="text-center mt-12">No tenancies found</div>
        )}
      </main>

      <Footer />
    </div>
  );
}
