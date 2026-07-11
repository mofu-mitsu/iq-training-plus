const fs = require('fs');

let qCode = fs.readFileSync('lib/questions.ts', 'utf8');

const pcQuestions = `
export const pictureCompletionQuestions = [
  {
    text: "この絵に足りないものは何ですか？",
    svg: \`<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"><circle cx="50" cy="50" r="40"/><circle cx="35" cy="40" r="5" fill="currentColor"/><path d="M 30 70 Q 50 80 70 70"/></svg>\`,
    isInput: true,
    keywords: ["目", "右目", "片目", "右側の目"],
    explanation: "顔の右側の「目」が描かれていません。",
  },
  {
    text: "この絵に足りないものは何ですか？",
    svg: \`<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round"><path d="M 20 40 L 80 40 L 90 70 L 10 70 Z"/><circle cx="30" cy="70" r="10" fill="currentColor"/><circle cx="70" cy="70" r="10" stroke-dasharray="2 4"/></svg>\`,
    isInput: true,
    keywords: ["タイヤ", "車輪", "ホイール", "後輪"],
    explanation: "車の後ろの「タイヤ（車輪）」が描かれていません。",
  },
  {
    text: "この絵に足りないものは何ですか？",
    svg: \`<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"><circle cx="50" cy="50" r="40"/><text x="45" y="25" fill="currentColor" stroke="none" font-family="sans-serif" font-size="12">12</text><text x="45" y="85" fill="currentColor" stroke="none" font-family="sans-serif" font-size="12">6</text></svg>\`,
    isInput: true,
    keywords: ["針", "時計の針", "長針", "短針", "時間"],
    explanation: "時計の時間を指す「針」が描かれていません。",
  },
  {
    text: "この絵に足りないものは何ですか？",
    svg: \`<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round"><path d="M 20 80 L 20 40 L 50 15 L 80 40 L 80 80 Z"/><rect x="30" y="50" width="15" height="15"/></svg>\`,
    isInput: true,
    keywords: ["ドア", "扉", "入り口"],
    explanation: "家に入るための「ドア（扉）」が描かれていません。",
  },
  {
    text: "この絵に足りないものは何ですか？",
    svg: \`<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round"><rect x="30" y="20" width="40" height="60" rx="5"/><circle cx="50" cy="70" r="5" fill="currentColor"/></svg>\`,
    isInput: true,
    keywords: ["画面", "スクリーン", "ディスプレイ", "液晶"],
    explanation: "スマートフォンの「画面（スクリーン）」が描かれていません。",
  },
  {
    text: "この絵に足りないものは何ですか？",
    svg: \`<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4"><path d="M 30 80 L 30 20 L 50 20 A 30 30 0 0 1 50 80 Z" /><path d="M 30 40 L 50 40" stroke-dasharray="2 4" /></svg>\`,
    isInput: true,
    keywords: ["線", "横線", "横棒", "真ん中の線"],
    explanation: "アルファベットの「B」の真ん中の線が欠けています。"
  },
  {
    text: "この絵に足りないものは何ですか？",
    svg: \`<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4"><rect x="20" y="30" width="60" height="40" rx="4" /><path d="M 20 30 L 50 50 L 80 30" /><circle cx="70" cy="20" r="5" fill="currentColor" /></svg>\`,
    isInput: true,
    keywords: ["切手", "スタンプ", "郵便"],
    explanation: "手紙（封筒）の右上の「切手」が不自然な丸になっています。"
  }
];
`;
fs.appendFileSync('lib/questions.ts', pcQuestions);

let tCode = fs.readFileSync('components/TrainingModule.tsx', 'utf8');

tCode = tCode.replace(
  /\} else if \(nextGameId === "picture-completion"\) \{[\s\S]*?\} else if \(nextGameId === "logic"\) \{/,
  `} else if (nextGameId === "picture-completion") {
      setQuestionData(pictureCompletionQuestions[Math.floor(Math.random() * pictureCompletionQuestions.length)]);
    } else if (nextGameId === "logic") {`
);

tCode = tCode.replace(
  /import \{ vocabularyQuestions, (.*?) \} from '\.\.\/lib\/questions';/,
  `import { vocabularyQuestions, pictureCompletionQuestions, $1 } from '../lib/questions';`
);

fs.writeFileSync('components/TrainingModule.tsx', tCode);
