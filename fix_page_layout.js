const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

code = code.replace(
  'max-w-4xl',
  'max-w-6xl w-full'
);

code = code.replace(
  '<h1 className="text-4xl md:text-6xl lg:text-7xl',
  '<h1 className="text-5xl md:text-7xl lg:text-8xl'
);

fs.writeFileSync('app/page.tsx', code);
