// app/layout.js
import "./globals.css";
import { Providers } from './provider';
import Notifications from './components/Notifications';
export const metadata = {
  title: "RentMate",
  description: "Property Rental Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        
        <Providers>
          <Notifications />
          {children}
        </Providers>
        
      </body>
    </html>
  );
}
