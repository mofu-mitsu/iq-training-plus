const fs = require('fs');
let code = fs.readFileSync('components/TrainingModule.tsx', 'utf8');

code = code.replace(/correctAnswer = questionData\.answers\[0\];/g, 'correctAnswerStr = questionData.answers[0];');

fs.writeFileSync('components/TrainingModule.tsx', code);
