// app/providers.js
"use client"; // This makes it a client component

import { PropertyProvider } from './context/PropertyContext';

export function Providers({ children }) {
  return <PropertyProvider>{children}</PropertyProvider>;
}