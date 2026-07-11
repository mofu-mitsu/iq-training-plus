const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

code = code.replace(
  'mb-8 flex justify-between items-center px-8 shadow-',
  'mb-8 flex flex-col md:flex-row justify-between items-center gap-4 px-8 shadow-'
);

fs.writeFileSync('app/page.tsx', code);
