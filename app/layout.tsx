import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://ais-dev-cz2zj24jokuuno4tsyrkho-536934770780.asia-east1.run.app'),
  title: 'IQトレーニング＋ | WAIS式 総合知能・脳トレアプリ',
  description: '記憶力、論理的思考、空間認知など、知能の様々な側面を鍛える無料の総合IQトレーニングアプリ。',
  keywords: ['IQテスト', '脳トレ', 'WAIS', '知能検査', '空間認知', '記憶力', '論理的思考', 'トレーニング'],
  openGraph: {
    title: 'IQトレーニング＋ | WAIS式 総合知能・脳トレアプリ',
    description: '記憶力、論理的思考、空間認知など、知能の様々な側面を鍛える無料の総合IQトレーニングアプリ。',
    type: 'website',
    url: 'https://ais-dev-cz2zj24jokuuno4tsyrkho-536934770780.asia-east1.run.app',
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
    icon: '/favicon.png',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
