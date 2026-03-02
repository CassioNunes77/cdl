import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ConditionalLayout } from '@/components/ConditionalLayout';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'CDL Paulo Afonso | Câmara de Dirigentes Lojistas de Paulo Afonso',
  description:
    'A CDL que faz sua empresa vender mais, gastar menos e crescer mais rápido. Serviços, networking e apoio ao comércio local.',
  icons: {
    icon: [
      { url: '/favicon.png', sizes: 'any' },
    ],
    apple: [
      { url: '/favicon.png', sizes: '180x180' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col font-sans">
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
