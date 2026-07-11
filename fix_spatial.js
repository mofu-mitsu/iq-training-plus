const fs = require('fs');
let code = fs.readFileSync('lib/spatialQuestions.ts', 'utf8');

const regex = /visualPuzzleQuestions\.push\([\s\S]*?\);\n\n\/\/ Replace visual puzzles\nvisualPuzzleQuestions\.push\([\s\S]*?\);/g;
const replacement = `visualPuzzleQuestions.length = 0;
visualPuzzleQuestions.push(
  {
    text: '絵を完成させてください',
    cols: 2,
    pieces: [
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 50,50 A 40,40 0 0,0 10,50 Z" /><circle cx="35" cy="40" r="5" fill="currentColor"/></svg>',
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 0,50 A 40,40 0 0,1 40,50 Z" /><circle cx="15" cy="40" r="5" fill="currentColor"/></svg>',
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 50,0 A 40,40 0 0,1 10,0 Z" /><path d="M 30 10 Q 50 30 50 10" /></svg>',
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 0,0 A 40,40 0 0,0 40,0 Z" /><path d="M 0 10 Q 0 30 20 10" /></svg>'
    ],
    correctOrder: [
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 50,50 A 40,40 0 0,0 10,50 Z" /><circle cx="35" cy="40" r="5" fill="currentColor"/></svg>',
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 0,50 A 40,40 0 0,1 40,50 Z" /><circle cx="15" cy="40" r="5" fill="currentColor"/></svg>',
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 50,0 A 40,40 0 0,1 10,0 Z" /><path d="M 30 10 Q 50 30 50 10" /></svg>',
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 0,0 A 40,40 0 0,0 40,0 Z" /><path d="M 0 10 Q 0 30 20 10" /></svg>'
    ],
    keywords: ['顔', 'スマイル', 'にこちゃん', 'スマイリー', '笑顔'],
    explanation: 'にこちゃんマークの顔が完成します。'
  },
  {
    text: '絵を完成させてください',
    cols: 2,
    pieces: [
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 0 50 L 50 50 L 50 0 Z" /></svg>',
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 0 0 L 50 50 L 0 50 Z" /></svg>',
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><rect x="10" y="0" width="30" height="50" /></svg>',
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><circle cx="25" cy="25" r="10" /></svg>'
    ],
    correctOrder: [
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 0 50 L 50 50 L 50 0 Z" /></svg>',
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 0 0 L 50 50 L 0 50 Z" /></svg>',
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><rect x="10" y="0" width="30" height="50" /></svg>',
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><circle cx="25" cy="25" r="10" /></svg>'
    ],
    keywords: ['家', 'いえ', 'ハウス'],
    explanation: '三角屋根と四角い壁、窓を組み合わせた家の絵になります。'
  },
  {
    text: '絵を完成させてください',
    cols: 1,
    pieces: [
      '<svg viewBox="0 0 50 50" fill="currentColor"><rect x="0" y="15" width="50" height="20" /></svg>', // 横棒
      '<svg viewBox="0 0 50 50" fill="currentColor"><rect x="15" y="0" width="20" height="50" /></svg>', // 下の長い縦棒
      '<svg viewBox="0 0 50 50" fill="currentColor"><rect x="15" y="20" width="20" height="30" /></svg>'  // 上の短い縦棒
    ],
    correctOrder: [
      '<svg viewBox="0 0 50 50" fill="currentColor"><rect x="15" y="20" width="20" height="30" /></svg>',
      '<svg viewBox="0 0 50 50" fill="currentColor"><rect x="0" y="15" width="50" height="20" /></svg>',
      '<svg viewBox="0 0 50 50" fill="currentColor"><rect x="15" y="0" width="20" height="50" /></svg>'
    ],
    keywords: ['十字', 'クロス', 'プラス', '十字架'],
    explanation: '上・中央・下の3つのパーツを縦につなげると十字架の形になります。'
  },
  {
    text: '絵を完成させてください',
    cols: 2,
    pieces: [
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 50 50 L 0 50 L 50 0 Z" /></svg>', // 直角三角形右下
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 0 0 L 0 50 L 50 0 Z" /></svg>' // 直角三角形左上
    ],
    correctOrder: [
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 0 0 L 0 50 L 50 0 Z" /></svg>',
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 50 50 L 0 50 L 50 0 Z" /></svg>'
    ],
    keywords: ['正方形', '四角', 'しかく', '四角形'],
    explanation: '2つの直角三角形を対角線で組み合わせると正方形になります。'
  },
  {
    text: '絵を完成させてください',
    cols: 1,
    pieces: [
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><circle cx="25" cy="25" r="20" /></svg>',
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><rect x="15" y="10" width="20" height="30" rx="4" /></svg>',
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><circle cx="25" cy="40" r="3" /></svg>'
    ],
    correctOrder: [
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><circle cx="25" cy="25" r="20" /></svg>',
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><rect x="15" y="10" width="20" height="30" rx="4" /></svg>',
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><circle cx="25" cy="40" r="3" /></svg>'
    ],
    keywords: ['スマホ', 'スマートフォン', '携帯', '電話'],
    explanation: '画面の枠、ホームボタンを組み合わせるとスマートフォンの形になります。'
  }
);
`;

code = code.replace(regex, replacement);
fs.writeFileSync('lib/spatialQuestions.ts', code);
