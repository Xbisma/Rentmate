"use client";
import { useState } from "react";

export default function Home() {
  const images = [
    "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
    "https://images.pexels.com/photos/259962/pexels-photo-259962.jpeg",
    "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
    "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
  ];

  const [current, setCurrent] = useState(0);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);

  const nextImg = () => setCurrent((current + 1) % images.length);
  const prevImg = () => setCurrent((current - 1 + images.length) % images.length);

  return (
    <div className="min-h-screen bg-white p-5">
      {/* TITLE */}
      <section className="my-6">
        <h1 className="text-3xl font-bold text-gray-900">Welcome to Tenant Portal</h1>
      </section>

      {/* IMAGE SLIDER */}
      <div className="relative max-w-4xl mx-auto">
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/40 text-white text-3xl w-10 h-10 rounded-full flex items-center justify-center z-10 hover:bg-black/60"
          onClick={prevImg}
        >
          ‹
        </button>

        <div className="mt-5 px-12">
          <img
            src={images[current]}
            alt="Property"
            className="w-full max-w-4xl h-auto rounded-lg block mx-auto"
          />
        </div>

        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/40 text-white text-3xl w-10 h-10 rounded-full flex items-center justify-center z-10 hover:bg-black/60"
          onClick={nextImg}
        >
          ›
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex flex-col lg:flex-row justify-between gap-8 mt-8 max-w-6xl mx-auto">
        {/* LEFT CONTENT */}
        <div className="lg:w-2/3">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg">
            <div className="space-y-1">
              <span className="text-sm text-gray-600 block">Type</span>
              <strong className="text-gray-900 text-base block">House</strong>
            </div>
            <div className="space-y-1">
              <span className="text-sm text-gray-600 block">Purpose</span>
              <strong className="text-gray-900 text-base block">For Rent</strong>
            </div>
            <div className="space-y-1">
              <span className="text-sm text-gray-600 block">Price</span>
              <strong className="text-gray-900 text-base block">PKR 1.25 Lakh</strong>
            </div>
            <div className="space-y-1">
              <span className="text-sm text-gray-600 block">Bedroom(s)</span>
              <strong className="text-gray-900 text-base block">5</strong>
            </div>
            <div className="space-y-1">
              <span className="text-sm text-gray-600 block">Bath(s)</span>
              <strong className="text-gray-900 text-base block">6</strong>
            </div>
            <div className="space-y-1">
              <span className="text-sm text-gray-600 block">Area</span>
              <strong className="text-gray-900 text-base block">10 Marla</strong>
            </div>
            <div className="space-y-1 md:col-span-2">
              <span className="text-sm text-gray-600 block">Location</span>
              <strong className="text-gray-900 text-base block">Top City 1, Islamabad</strong>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="lg:w-1/3">
          <div className="border border-gray-300 rounded-lg p-6 bg-white">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">PKR 1.25 Lakh</h3>

            <button className="w-full py-3 bg-green-500 text-white font-medium rounded-lg mb-3 hover:bg-green-600 transition-colors">
              WhatsApp
            </button>
            <button 
              className="w-full py-3 bg-teal-600 text-white font-medium rounded-lg mb-3 hover:bg-teal-700 transition-colors"
              onClick={() => setShowCallModal(true)}
            >
              Call
            </button>
            <button
              className="w-full py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-black transition-colors"
              onClick={() => setShowRequestModal(true)}
            >
              Send Request
            </button>
          </div>
        </div>
      </div>

      {/* CALL MODAL */}
      {showCallModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative animate-fadeIn">
            <button
              className="absolute right-4 top-4 text-2xl text-gray-500 hover:text-gray-700"
              onClick={() => setShowCallModal(false)}
            >
              ✕
            </button>

            <h2 className="text-xl font-bold text-center mb-6">Contact Owner</h2>

            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
              <div>
                <strong className="block text-gray-900">Owner Number</strong>
                <span className="text-gray-700">0333-1234567</span>
              </div>
              <button className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800">
                Copy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REQUEST MODAL */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative animate-fadeIn">
            <button
              className="absolute right-4 top-4 text-2xl text-gray-500 hover:text-gray-700"
              onClick={() => setShowRequestModal(false)}
            >
              ✕
            </button>

            <h2 className="text-xl font-bold text-center mb-6">Send Request to Owner</h2>

            <label className="block font-medium text-gray-900 mb-2">Request Type</label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
              <option>Select Type</option>
              <option>Inquiry</option>
              <option>Maintenance Request</option>
            </select>

            <label className="block font-medium text-gray-900 mb-2">Message</label>
            <textarea
              className="w-full px-4 py-3 border border-gray-300 rounded-lg h-32 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Write message here..."
            ></textarea>

            <button className="w-full py-3 bg-gray-900 text-white font-medium rounded-lg mt-6 hover:bg-black transition-colors">
              Send Request
            </button>
          </div>
        </div>
      )}
    </div>
  );
}