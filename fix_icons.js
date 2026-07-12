const fs = require('fs');
let code = fs.readFileSync('app/layout.tsx', 'utf8');

const targetIcons = `  icons: {
    icon: '/favicon.png',
  },`;

const replaceIcons = `  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' }
    ],
    apple: [
      { url: '/favicon.png', type: 'image/png' }
    ]
  },`;

code = code.replace(targetIcons, replaceIcons);

fs.writeFileSync('app/layout.tsx', code);
