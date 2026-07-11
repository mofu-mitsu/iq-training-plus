const fs = require('fs');
let code = fs.readFileSync('components/TrainingModule.tsx', 'utf8');

code = code.replace(
  /\n          \{gameState === "finished"/,
  '\n          )}\n          {gameState === "finished"'
);

fs.writeFileSync('components/TrainingModule.tsx', code);
