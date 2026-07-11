const fs = require('fs');
let code = fs.readFileSync('components/TrainingModule.tsx', 'utf8');

// 下の重複しているブロックを削除
code = code.replace(
  /\{\s*questionData\.svg && currentGameId !== 'visual-puzzle' && \([\s\S]*?dangerouslySetInnerHTML=\{\{ __html: questionData\.svg \}\}[\s\S]*?<\/div>\s*\)\s*\}/,
  ''
);

fs.writeFileSync('components/TrainingModule.tsx', code);
