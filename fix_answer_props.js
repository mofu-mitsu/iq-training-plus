const fs = require('fs');
let code = fs.readFileSync('components/TrainingModule.tsx', 'utf8');

code = code.replace(/answer: q\.a,/g, 'answer: q.answer || q.a,');
code = code.replace(/aIndex: q\.aIndex,/g, 'aIndex: q.aIndex !== undefined ? q.aIndex : q.options.indexOf(q.answer),');
code = code.replace(/answer: q\.answer \|\| q\.answer \|\| q\.a,/g, 'answer: q.answer || q.a,'); // cleanup if I accidentally ran twice

fs.writeFileSync('components/TrainingModule.tsx', code);
