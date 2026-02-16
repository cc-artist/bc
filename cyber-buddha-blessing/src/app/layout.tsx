import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cyber Buddha",
  description: "Cyber Buddha Consecration · Dharma Form · Lamp Blessing · Custom Tours of Famous Chinese Temples",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {/* PayPal SDK Script */}
        <script 
          src="https://www.paypal.com/sdk/js?client-id=BAA9cxy8DYmUMqEob7eABEqPVGx86qxOdd-SK9ptm87tzEYmfPGVcUATLCNs7G3PeEtEh2WDEbXPwZ3ubA&disable-funding=venmo&currency=USD"
          async
          defer
        ></script>
      </body>
    </html>
  );
}
