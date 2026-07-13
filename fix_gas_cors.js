const fs = require('fs');
let code = fs.readFileSync('components/TrainingModule.tsx', 'utf8');
code = code.replace(
  'method: "POST",',
  'method: "POST",\n        mode: "no-cors",'
);
fs.writeFileSync('components/TrainingModule.tsx', code);
