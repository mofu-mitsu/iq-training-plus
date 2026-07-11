const fs = require('fs');
let code = fs.readFileSync('lib/questions.ts', 'utf8');

code = code.replace(
  /{ text: '「い・す・か」を並び替えてできる言葉は？', options: \['すいか', 'いかす', 'かすい'\], answer: 'すいか', answers: \['すいか'\], explanation: '並び替えると「すいか（西瓜）」になります。' },/g,
  `{ text: '「い・す・か」を並び替えてできる言葉は？', answers: ['すいか', 'スイカ', 'いかす', 'イカス', 'かすい', 'いすか', 'イスカ'], explanation: '「すいか（西瓜）」「イスカ（交喙・鳥の名前）」「いかす（生かす）」などが正解になります。' },`
);

fs.writeFileSync('lib/questions.ts', code);
