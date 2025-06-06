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
        <header className="bg-blue-600 text-white p-6 pl-16">
          <nav className="relative flex space-x-6 gap-6 items-center">
          <Link href="/" className="text-2xl font-bold hover:underline">
            나를 위한 선물
          </Link>
          <Link href="lotcalculator " className="hover:underline">
            랏수 계산기
          </Link>
          <Link href="trades" className="hover:underline">
            트레이딩 메모리
          </Link>
          <Link href="login" className="absolute hover:underline right-16">
            로그인
          </Link>
          </nav>
      </header>
      <main className='w-full p-4'>
        {children}
      </main>
      </body>
    </html>
  );
}
