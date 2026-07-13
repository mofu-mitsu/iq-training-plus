const fs = require('fs');
let code = fs.readFileSync('components/TrainingModule.tsx', 'utf8');
code = code.replace(
  'const gasUrl = localStorage.getItem("gasUrl");',
  'const gasUrl = "https://script.google.com/macros/s/AKfycbxJKfKT3_zlZTc_Rg9kRrUj7xqBE21tAbEf98dQyBfpN9QvLZ18p--b9q3TMnUD6wc84Q/exec";'
);
fs.writeFileSync('components/TrainingModule.tsx', code);
