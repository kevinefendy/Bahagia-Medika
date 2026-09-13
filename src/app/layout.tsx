import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import ChatbotWidget from '@/components/chat/ChatbotWidget';
import ToastContainer from '@/components/ui/Toast';
import BrowserErrorFilter from '@/components/common/BrowserErrorFilter';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: {
    default: 'Bahagia Medika - Rumah Sakit Modern Terpercaya',
    template: '%s | Bahagia Medika',
  },
  description:
    'Bahagia Medika menghadirkan pelayanan kesehatan berkualitas tinggi dengan dokter spesialis berpengalaman dan fasilitas modern. Buat janji temu sekarang.',
  keywords: ['rumah sakit', 'dokter', 'kesehatan', 'janji temu', 'Bahagia Medika'],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    siteName: 'Bahagia Medika',
  },
  icons: {
    icon: '/logo-bahagia-medika.png',
    apple: '/logo-bahagia-medika.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={poppins.variable}>
      <body className={`${poppins.className} antialiased`}>
        <BrowserErrorFilter />
        {children}
        <ChatbotWidget />
        <ToastContainer />
      </body>
    </html>
  );
}
