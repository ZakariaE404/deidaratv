import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://deidaratv.live'),
  title: 'Deidara TV | بث مباشر للمباريات اليوم - Kora Live كورة لايف',
  description: 'Deidara TV - بث مباشر للمباريات اليوم بجودة HD بدون تقطيع. شاهد كورة لايف koora live وتابع أهم مباريات كأس العالم 2026 والدوريات مجاناً.',
  keywords: ['Kora live', 'koora live', 'كورة لايف', 'بث مباشر', 'بث مباشر للمباريات', 'Deidara TV', 'DeidaraTV', 'ديدارا تي في', 'مباريات اليوم', 'بث مباشر بدون تقطيع', 'كاس العالم 2026'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    title: 'Deidara TV | بث مباشر للمباريات اليوم - Kora Live كورة لايف',
    description: 'Deidara TV - بث مباشر للمباريات اليوم بجودة HD بدون تقطيع. شاهد كورة لايف koora live وتابع أهم مباريات كأس العالم 2026 والدوريات مجاناً.',
    url: 'https://deidaratv.live',
    siteName: 'DeidaraTV',
    locale: 'ar_AR',
    images: [
      {
        url: '/imgs/icon.png',
        width: 512,
        height: 512,
        alt: 'Deidara TV Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deidara TV | بث مباشر للمباريات اليوم - Kora Live كورة لايف',
    description: 'Deidara TV - بث مباشر للمباريات اليوم بجودة HD بدون تقطيع. شاهد كورة لايف koora live وتابع أهم مباريات كأس العالم 2026 والدوريات مجاناً.',
    images: ['/imgs/icon.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <body className="flex flex-col min-h-screen bg-[#0b0f19] text-slate-100 antialiased font-cairo selection:bg-brand-primary selection:text-white">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
