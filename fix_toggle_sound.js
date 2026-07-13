const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');
code = code.replace(
  'const toggleSound = () => {',
  'const toggleSound = () => {\n    unlockTTS();'
);
fs.writeFileSync('app/page.tsx', code);
