import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import Header from '@/components/header/Header';
import './globals.css';

import { PickupDeliveryProvider } from '@/context/PickupDeliveryContext';
import { ShoppingCartProvider } from '@/context/ShoppingCartContext';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Foodie Go',
  description: 'Food delivery service',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable}`}>
        <ShoppingCartProvider>
          <PickupDeliveryProvider>
            <Header />
            <div className="m-auto max-w-[1168px] px-3 md:px-10">
              {children}
            </div>
          </PickupDeliveryProvider>
        </ShoppingCartProvider>
      </body>
    </html>
  );
}
