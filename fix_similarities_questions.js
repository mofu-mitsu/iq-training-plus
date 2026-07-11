const fs = require('fs');
let code = fs.readFileSync('lib/questions.ts', 'utf8');

// 犬と猫の共通点
code = code.replace(
  /{ text: '「犬」と「猫」の共通点は？', options: \['ペットとして飼われる哺乳類', '吠える', '木に登る'\], answer: 'ペットとして飼われる哺乳類', explanation: 'どちらも人間にペットとして広く飼われている哺乳類（四足歩行の動物）です。' },/g,
  `{ text: '「犬」と「猫」の共通点は？', keywords: ['ペット', '哺乳類', '動物'], explanation: 'どちらも人間にペットとして広く飼われている哺乳類（動物）です。' },`
);

fs.writeFileSync('lib/questions.ts', code);
