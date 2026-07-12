const fs = require('fs');
let code = fs.readFileSync('components/TrainingModule.tsx', 'utf8');

const targetStr = `{currentGameId === 'visual-puzzle' ? (`;
const replaceStr = `{currentGameId === 'block-design' ? null : currentGameId === 'visual-puzzle' ? (`;

code = code.replace(targetStr, replaceStr);

fs.writeFileSync('components/TrainingModule.tsx', code);
