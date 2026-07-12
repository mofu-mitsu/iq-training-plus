const fs = require('fs');
let code = fs.readFileSync('app/layout.tsx', 'utf8');

code = code.replace(/https:\/\/ais-dev-.*?\.run\.app/g, 'https://iq-training-plus.vercel.app');

fs.writeFileSync('app/layout.tsx', code);
