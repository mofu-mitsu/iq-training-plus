const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');
code = code.replace(
  'if (soundEnabled && "speechSynthesis" in window) {',
  'if ("speechSynthesis" in window) {'
);
fs.writeFileSync('app/page.tsx', code);
