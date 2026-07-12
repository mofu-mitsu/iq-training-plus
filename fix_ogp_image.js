const fs = require('fs');
let code = fs.readFileSync('app/layout.tsx', 'utf8');

// Add images back to metadata
const openGraphStr = `  openGraph: {
    title: 'IQトレーニング＋ | WAIS式 総合知能・脳トレアプリ',
    description: '記憶力、論理的思考、空間認知など、知能の様々な側面を鍛える無料の総合IQトレーニングアプリ。',
    type: 'website',
    url: 'https://iq-training-plus.vercel.app',
    siteName: 'IQトレーニング＋',
    images: [{ url: 'https://iq-training-plus.vercel.app/ogp.png', width: 1200, height: 630 }],
  },`;

const twitterStr = `  twitter: {
    card: 'summary_large_image',
    title: 'IQトレーニング＋ | WAIS式 総合知能・脳トレアプリ',
    description: '記憶力、論理的思考、空間認知など、知能の様々な側面を鍛える無料の総合IQトレーニングアプリ。',
    images: ['https://iq-training-plus.vercel.app/ogp.png'],
  },`;

code = code.replace(/  openGraph: \{[\s\S]*?\},/g, openGraphStr);
code = code.replace(/  twitter: \{[\s\S]*?\},/g, twitterStr);

fs.writeFileSync('app/layout.tsx', code);
