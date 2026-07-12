import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://iq-training-plus.vercel.app'),
  title: 'IQトレーニング＋ | WAIS式 総合知能・脳トレアプリ',
  description: '記憶力、論理的思考、空間認知など、知能の様々な側面を鍛える無料の総合IQトレーニングアプリ。',
  keywords: ['IQテスト', '脳トレ', 'WAIS', '知能検査', '空間認知', '記憶力', '論理的思考', 'トレーニング'],
  openGraph: {
    title: 'IQトレーニング＋ | WAIS式 総合知能・脳トレアプリ',
    description: '記憶力、論理的思考、空間認知など、知能の様々な側面を鍛える無料の総合IQトレーニングアプリ。',
    type: 'website',
    url: 'https://iq-training-plus.vercel.app',
    siteName: 'IQトレーニング＋',
    images: [
      {
        url: '/ogp.png',
        width: 1200,
        height: 630,
        alt: 'IQトレーニング＋',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IQトレーニング＋ | WAIS式 総合知能・脳トレアプリ',
    description: '記憶力、論理的思考、空間認知など、知能の様々な側面を鍛える無料の総合IQトレーニングアプリ。',
    images: ['/ogp.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' }
    ],
    apple: [
      { url: '/favicon.png', type: 'image/png' }
    ]
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
