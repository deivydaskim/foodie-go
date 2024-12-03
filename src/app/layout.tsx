import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import Header from '@/components/header/Header';
import { RestaurantsStoreProvider } from '@/providers/restaurants-store-provider';
import './globals.css';

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const res = await fetch('http://localhost:3000/api/restaurants', {
    cache: 'force-cache',
  });
  const restaurantsData = await res.json();

  return (
    <html lang="en">
      <body className={`${poppins.variable} min-h-screen`}>
        <Header />
        <RestaurantsStoreProvider initData={restaurantsData}>
          {children}
        </RestaurantsStoreProvider>
      </body>
    </html>
  );
}
