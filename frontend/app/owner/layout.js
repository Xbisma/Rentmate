'use client';

import OwnerSidebar from './OwnerSidebar';
import Header from './Header';

export default function OwnerLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <OwnerSidebar />

      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
