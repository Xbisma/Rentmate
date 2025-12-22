"use client";
import Link from "next/link";

export default function MyRequestsPage() {
  return (
    <div className="min-h-screen bg-white p-8 font-sans">
      {/* BACK TO HOME BUTTON */}
      <Link 
        href="/tenant/dashboard" 
        className="inline-flex items-center gap-2 bg-gray-50 text-gray-900 px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-medium shadow-sm hover:bg-gray-100 transition-colors mb-6"
      >
        ← Back to Home
      </Link>

      {/* Header */}
      <header className="mb-6">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          My Requests
        </h1>
        <p className="text-gray-600 text-base">
          View and track all your requests to property owners
        </p>
      </header>

      {/* Status cards */}
      <section className="flex flex-col md:flex-row gap-5 my-6">
        {/* Pending Card */}
        <div className="flex-1 min-w-0 bg-white border border-gray-200 rounded-xl p-5 flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500 mb-1.5">Pending</div>
            <div className="text-3xl font-extrabold text-yellow-500">0</div>
          </div>
          <div className="text-2xl text-yellow-500 opacity-95" aria-hidden>
            ⏱️
          </div>
        </div>

        {/* In Progress Card */}
        <div className="flex-1 min-w-0 bg-white border border-gray-200 rounded-xl p-5 flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500 mb-1.5">In Progress</div>
            <div className="text-3xl font-extrabold text-emerald-400">0</div>
          </div>
          <div className="text-2xl text-emerald-400 opacity-95" aria-hidden>
            ❗
          </div>
        </div>

        {/* Resolved Card */}
        <div className="flex-1 min-w-0 bg-white border border-gray-200 rounded-xl p-5 flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500 mb-1.5">Resolved</div>
            <div className="text-3xl font-extrabold text-emerald-600">0</div>
          </div>
          <div className="text-2xl text-emerald-600 opacity-95" aria-hidden>
            ✅
          </div>
        </div>
      </section>

      {/* Horizontal Divider */}
      <div className="my-8 border-t border-gray-200"></div>

      {/* Empty state */}
      <section className="mt-6 border border-gray-200 rounded-xl p-14 text-center bg-white">
        <div className="text-5xl text-gray-400 mb-3">💬</div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          No Requests Yet
        </h2>
        <p className="text-gray-600 text-base">
          You haven't sent any requests to property owners yet.
        </p>
      </section>
    </div>
  );
}