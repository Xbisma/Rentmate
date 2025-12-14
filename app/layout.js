// app/layout.js
import "./globals.css";
import { Providers } from './provider';
export const metadata = {
  title: "RentMate",
  description: "Property Rental Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        
        <Providers>{children}</Providers>
        
      </body>
    </html>
  );
}
