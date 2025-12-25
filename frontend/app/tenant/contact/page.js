'use client';
import Header from '../Header';
import { Phone, Copy } from 'lucide-react';

export default function ContactPage() {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="page-container">
      <Header />
      
      <div className="content-container">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 animate-fade-in">Contact Us</h1>
        
        <div className="card max-w-md animate-fade-in">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Muhammad Zulqarnain</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center text-gray-700">
                  <Phone size={20} className="mr-2" />
                  <span className="font-medium">Mobile</span>
                </div>
                <button
                  onClick={() => copyToClipboard('+92-3335054385')}
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <Copy size={16} className="mr-1" />
                  Copy
                </button>
              </div>
              <p className="text-gray-800 text-lg">+92-3335054385</p>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center text-gray-700">
                  <Phone size={20} className="mr-2" />
                  <span className="font-medium">Phone</span>
                </div>
                <button
                  onClick={() => copyToClipboard('+92-3365010926')}
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <Copy size={16} className="mr-1" />
                  Copy
                </button>
              </div>
              <p className="text-gray-800 text-lg">+92-3365010926</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}