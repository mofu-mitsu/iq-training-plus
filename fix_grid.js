const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

// grid-cols-2 md:grid-cols-3 or something
code = code.replace(
  /grid grid-cols-2 gap-4/,
  'grid grid-cols-3 md:grid-cols-4 gap-4'
);

fs.writeFileSync('app/page.tsx', code);
