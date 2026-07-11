const fs = require('fs');
let code = fs.readFileSync('components/TrainingModule.tsx', 'utf8');

code = code.replace(
  /<VisualPuzzle \n                          pieces=\{questionData.pieces\}\n                          correctOrder=\{questionData.correctOrder\}\n                          onComplete=\{\(isCorrect\) => \{/,
  `<VisualPuzzle 
                          pieces={questionData.pieces}
                          correctOrder={questionData.correctOrder}
                          cols={questionData.cols}
                          onComplete={(isCorrect) => {`
);

fs.writeFileSync('components/TrainingModule.tsx', code);
