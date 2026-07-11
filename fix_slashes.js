const fs = require('fs');
let code = fs.readFileSync('lib/questions.ts', 'utf8');

code = code.replace(
  /grid: \["\|", "-", "\+", "\/", "\\\\", "×", "〇", "-", "？"\]/,
  'grid: ["|", "-", "+", "／", "＼", "×", "〇", "-", "？"]'
);

fs.writeFileSync('lib/questions.ts', code);
