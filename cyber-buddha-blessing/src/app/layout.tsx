import type { Metadata } from "next";
import React from "react";
import { SessionProviderClient } from "./providers/SessionProviderClient";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cyber Buddha",
  description: "Cyber Buddha Consecration · Dharma Form · Lamp Blessing · Custom Tours of Famous Chinese Temples",
};

// Simple Error Boundary Component for Client-Side
const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return children;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* PayPal SDK Script */}
        <script 
          src="https://www.paypal.com/sdk/js?client-id=BAA9cxy8DYmUMqEob7eABEqPVGx86qxOdd-SK9ptm87tzEYmfPGVcUATLCNs7G3PeEtEh2WDEbXPwZ3ubA&disable-funding=venmo&currency=USD"
          async
          defer
        ></script>
      </head>
      <body className="antialiased">
        <SessionProviderClient>
          <ErrorBoundary>{children}</ErrorBoundary>
        </SessionProviderClient>
      </body>
    </html>
  );
}
