const fs = require('fs');
let code = fs.readFileSync('components/VisualPuzzle.tsx', 'utf8');

code = code.replace(
  /const isFull = slots.every\(s => s !== null\);/,
  `const isFull = slots.filter(s => s !== null).length === pieces.length;`
);

fs.writeFileSync('components/VisualPuzzle.tsx', code);
