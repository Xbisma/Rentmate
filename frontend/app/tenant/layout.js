'use client';
import { Inter } from 'next/font/google';
import TenantSidebar from '../components/tenantSidebar';
import Header from './Header';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function TenantLayout({ children }) {
  return (
    // <html lang="en" className={inter.className}>
    //   <body className="bg-gray-50">
        <div className="flex min-h-screen">
          <TenantSidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 p-6">
              {children}
            </main>
          </div>
        </div>
      // </body>
    // </html>
  );
}