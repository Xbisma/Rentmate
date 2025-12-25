'use client';
import { useState } from 'react';
import Link from 'next/link';
// import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Header from '../Header';

export default function Tenancies() {
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data for tenancies
  const tenancies = [
    {
      id: 1,
      propertyName: "Modern 3BR Apartment in DHA",
      tenantName: "Ali Ahmed",
      monthlyRent: 85000,
      paymentStatus: "Paid",
      contractStatus: "Active",
      leaseStart: "2024-01-01",
      leaseEnd: "2024-12-31"
    },
    {
      id: 2,
      propertyName: "Luxury Villa in Bahria Town",
      tenantName: "Sara Khan",
      monthlyRent: 250000,
      paymentStatus: "Pending",
      contractStatus: "Active",
      leaseStart: "2024-02-15",
      leaseEnd: "2025-02-14"
    },
    {
      id: 3,
      propertyName: "6 Marla House in Islamabad",
      tenantName: "Usman Malik",
      monthlyRent: 140000,
      paymentStatus: "Paid",
      contractStatus: "Expiring Soon",
      leaseStart: "2023-11-01",
      leaseEnd: "2024-10-31"
    },
    {
      id: 4,
      propertyName: "Studio Apartment in Clifton",
      tenantName: "Fatima Raza",
      monthlyRent: 45000,
      paymentStatus: "Overdue",
      contractStatus: "Active",
      leaseStart: "2024-03-01",
      leaseEnd: "2025-02-28"
    },
    {
      id: 5,
      propertyName: "4 Bedroom House in Gulberg",
      tenantName: "Bilal Hassan",
      monthlyRent: 120000,
      paymentStatus: "Paid",
      contractStatus: "Active",
      leaseStart: "2024-01-15",
      leaseEnd: "2024-12-14"
    },
    {
      id: 6,
      propertyName: "Penthouse in DHA Phase 8",
      tenantName: "Zainab Ali",
      monthlyRent: 350000,
      paymentStatus: "Paid",
      contractStatus: "Active",
      leaseStart: "2024-02-01",
      leaseEnd: "2025-01-31"
    },
    {
      id: 7,
      propertyName: "2 Bedroom Apartment in PECHS",
      tenantName: "Omar Farooq",
      monthlyRent: 65000,
      paymentStatus: "Pending",
      contractStatus: "Active",
      leaseStart: "2024-03-15",
      leaseEnd: "2025-03-14"
    },
    {
      id: 8,
      propertyName: "Commercial Space in Saddar",
      tenantName: "Tech Solutions Ltd.",
      monthlyRent: 180000,
      paymentStatus: "Paid",
      contractStatus: "Active",
      leaseStart: "2023-12-01",
      leaseEnd: "2024-11-30"
    },
    {
      id: 9,
      propertyName: "3 Bedroom Flat in Model Town",
      tenantName: "Ayesha Siddiqui",
      monthlyRent: 75000,
      paymentStatus: "Paid",
      contractStatus: "Expired",
      leaseStart: "2023-09-01",
      leaseEnd: "2024-08-31"
    },
    {
      id: 10,
      propertyName: "Farmhouse in B17",
      tenantName: "Rehman Enterprises",
      monthlyRent: 500000,
      paymentStatus: "Paid",
      contractStatus: "Active",
      leaseStart: "2024-01-01",
      leaseEnd: "2026-12-31"
    }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return `PKR ${amount.toLocaleString()}`;
  };

  const getStatusBadge = (status, type) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-semibold";
    
    if (type === 'payment') {
      switch (status) {
        case 'Paid':
          return `${baseClasses} bg-green-100 text-green-800`;
        case 'Pending':
          return `${baseClasses} bg-yellow-100 text-yellow-800`;
        case 'Overdue':
          return `${baseClasses} bg-red-100 text-red-800`;
        default:
          return `${baseClasses} bg-gray-100 text-gray-800`;
      }
    } else {
      switch (status) {
        case 'Active':
          return `${baseClasses} bg-green-100 text-green-800`;
        case 'Expiring Soon':
          return `${baseClasses} bg-yellow-100 text-yellow-800`;
        case 'Expired':
          return `${baseClasses} bg-red-100 text-red-800`;
        default:
          return `${baseClasses} bg-gray-100 text-gray-800`;
      }
    }
  };

  const filteredTenancies = tenancies.filter(tenancy =>
    tenancy.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenancy.tenantName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Page Header with Back Button */}
        <div className="flex justify-between items-start mb-8 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold text-black mb-2">Your Tenancies</h1>
            <p className="text-gray-800 font-medium">Manage your rental agreements and tenant information</p>
          </div>
          
          {/* Back to Home Button */}
          <Link 
            href="/owner/dashboard" 
            className="btn-secondary px-6 py-3 rounded-xl font-semibold inline-flex items-center space-x-2 hover-lift text-gray-900"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Controls Bar */}
        <div className="card p-6 mb-6 animate-fade-in">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            {/* Entries per page */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-800 font-medium text-sm">Show</span>
              <select 
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <span className="text-gray-800 font-medium text-sm">entries per page</span>
            </div>

            {/* Search */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-800 font-medium text-sm">Search:</span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search properties or tenants..."
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 bg-white text-gray-900"
              />
            </div>
          </div>
        </div>

        {/* Tenancies Table */}
        <div className="card overflow-hidden animate-fade-in">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Property Name</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Tenant Name</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Monthly Rent</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Payment status</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Contract status</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Lease starting date</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Lease ending date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTenancies.map((tenancy) => (
                  <tr key={tenancy.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
                      {tenancy.propertyName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                      {tenancy.tenantName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-bold">
                      {formatCurrency(tenancy.monthlyRent)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={getStatusBadge(tenancy.paymentStatus, 'payment')}>
                        {tenancy.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={getStatusBadge(tenancy.contractStatus, 'contract')}>
                        {tenancy.contractStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                      {formatDate(tenancy.leaseStart)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                      {formatDate(tenancy.leaseEnd)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
              {/* Showing entries info */}
              <div className="text-sm text-gray-800 font-medium">
                Showing 1 to {filteredTenancies.length} of {filteredTenancies.length} entries
              </div>

              {/* Print Button */}
              <button className="flex items-center space-x-2 text-gray-800 hover:text-gray-900 transition-colors text-sm font-semibold">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                <span>Print</span>
              </button>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredTenancies.length === 0 && (
          <div className="card p-12 text-center animate-fade-in">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-black mb-2">No tenancies found</h3>
            <p className="text-gray-800 font-medium mb-6">No rental agreements match your search criteria.</p>
            <button 
              onClick={() => setSearchTerm('')}
              className="btn-primary px-6 py-3 rounded-xl font-semibold"
            >
              Clear Search
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}