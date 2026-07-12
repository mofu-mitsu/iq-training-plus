const fs = require('fs');
let code = fs.readFileSync('components/TrainingModule.tsx', 'utf8');

code = code.replace(
  ") : questionData.options ? (",
  ") : questionData.options && currentGameId !== 'block-design' ? ("
);

fs.writeFileSync('components/TrainingModule.tsx', code);
