const fs = require('fs');
let code = fs.readFileSync('components/TrainingModule.tsx', 'utf8');
code = code.replace(
  /\{questionData\.options\.map/g,
  '{questionData.options?.map'
);
fs.writeFileSync('components/TrainingModule.tsx', code);
