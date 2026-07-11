const fs = require('fs');
let code = fs.readFileSync('lib/spatialQuestions.ts', 'utf8');

// visualPuzzleQuestions.length = 0; を削除する
code = code.replace('visualPuzzleQuestions.length = 0;\n', '');

// 各 visualPuzzleQuestions にキーワードを追加する
code = code.replace(
  /explanation: 'にこちゃんマークの顔が完成します。'/g,
  `keywords: ['顔', 'スマイル', 'にこちゃん', 'スマイリー', '笑顔'],\n    explanation: 'にこちゃんマークの顔が完成します。'`
);

code = code.replace(
  /explanation: 'それぞれを組み合わせると五芒星が完成します。（※簡易的なパーツの組み合わせです）'/g,
  `keywords: ['星', 'ほし', 'スター'],\n    explanation: 'それぞれを組み合わせると五芒星が完成します。（※簡易的なパーツの組み合わせです）'`
);

code = code.replace(
  /explanation: 'それぞれを組み合わせると家の形が完成します。'/g,
  `keywords: ['家', 'いえ', 'ハウス'],\n    explanation: 'それぞれを組み合わせると家の形が完成します。'`
);

code = code.replace(
  /explanation: 'すべてを組み合わせると十字の形になります。'/g,
  `keywords: ['十字', 'クロス', 'プラス', '十字架'],\n    explanation: 'すべてを組み合わせると十字の形になります。'`
);

code = code.replace(
  /explanation: 'すべてを組み合わせると大きな正方形になります。'/g,
  `keywords: ['正方形', '四角', 'しかく'],\n    explanation: 'すべてを組み合わせると大きな正方形になります。'`
);

fs.writeFileSync('lib/spatialQuestions.ts', code);
