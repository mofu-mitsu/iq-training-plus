import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import DragDropPolyfill from '../components/DragDropPolyfill';

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
    images: [{ url: 'https://iq-training-plus.vercel.app/ogp.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IQトレーニング＋ | WAIS式 総合知能・脳トレアプリ',
    description: '記憶力、論理的思考、空間認知など、知能の様々な側面を鍛える無料の総合IQトレーニングアプリ。',
    images: ['https://iq-training-plus.vercel.app/ogp.png'],
  },
  
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
        <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-GNTX973GET"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-GNTX973GET');
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <DragDropPolyfill />
        {children}
        <Toaster position="bottom-center" toastOptions={{ style: { background: '#1e293b', color: '#fff', border: '1px solid #334155' } }} />
      </body>
    </html>
  );
}
