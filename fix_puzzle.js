const fs = require('fs');
let code = fs.readFileSync('lib/spatialQuestions.ts', 'utf8');

// The anagrams replaced the SVG ones because of my update_vp.js script.
// Let's remove the anagram part from spatialQuestions.ts
code = code.replace(/\/\/ Replace visual puzzles[\s\S]*/, '');

const svgPuzzles = `
visualPuzzleQuestions.length = 0;
visualPuzzleQuestions.push(
  {
    text: '絵を完成させてください（星形）',
    pieces: [
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 25 50 L 35 20 L 0 20 Z" /></svg>',
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 50 20 L 15 20 L 25 50 Z" /></svg>',
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 0 0 L 25 20 L 50 0 Z" /></svg>',
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 25 0 L 25 20" /></svg>'
    ],
    correctOrder: [
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 25 0 L 25 20" /></svg>',
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 0 0 L 25 20 L 50 0 Z" /></svg>',
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 25 50 L 35 20 L 0 20 Z" /></svg>',
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 50 20 L 15 20 L 25 50 Z" /></svg>'
    ],
    explanation: 'それぞれを組み合わせると五芒星が完成します。'
  },
  {
    text: '絵を完成させてください（家）',
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
    explanation: '三角屋根と四角い壁、窓を組み合わせた家の絵になります。'
  }
);
`;

fs.appendFileSync('lib/spatialQuestions.ts', svgPuzzles);
