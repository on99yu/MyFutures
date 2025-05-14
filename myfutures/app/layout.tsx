import './globals.css';
import { inter } from '@/app/ui/fonts';
import Link from 'next/link';

export const metadata = {
  title: 'Futures ATR Tracker',
  description: 'Track current price and ATR for futures (NAS100, XAUUSD, USOUSD, EURUSD)',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <header className="bg-blue-600 text-white p-4">
          <nav className="flex space-x-6 items-center">
          <Link href="/" className="text-2xl font-bold hover:underline">
            나를 위한 선물
          </Link>
          <Link href="lotcalculator " className="hover:underline">
            랏수 계산기
          </Link>
          </nav>
      </header>
      <main className='p-4'>
        {children}
      </main>
      </body>
    </html>
  );
}
