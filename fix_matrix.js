const fs = require('fs');
let code = fs.readFileSync('lib/questions.ts', 'utf8');

// matrixReasoningQuestions の 'a:' を 'answer:' に置換する
code = code.replace(/a: '(\d+|[〇△□↑↓→ABCD🌑🌓🌕🌗■□春夏秋冬朝昼夜夕])'/g, "answer: '$1'");

// 配列に動的生成の数列問題をいくつか追加するコードを末尾に追加するわけにはいかないので
// ファイル末尾に数列問題をpushするコードを追加する。
const pushCode = `

// 動的な数列問題（行列推理）を追加
const generateSequenceQuestions = () => {
  const qs = [];
  // 等差（足し算）
  for (let i = 0; i < 5; i++) {
    const start = Math.floor(Math.random() * 10) + 1;
    const step = Math.floor(Math.random() * 8) + 2;
    const seq = [start, start + step, start + step * 2, start + step * 3, start + step * 4];
    qs.push({
      text: \`数列の?に入る数字は何でしょうか？\\n\${seq[0]}, \${seq[1]}, \${seq[2]}, \${seq[3]}, \${seq[4]}, ?\`,
      answers: [\`\${start + step * 5}\`],
      explanation: \`毎回 \${step} を足しています。\${seq[4]} + \${step} = \${start + step * 5}\`
    });
  }
  // 等差（引き算）
  for (let i = 0; i < 5; i++) {
    const start = Math.floor(Math.random() * 50) + 50;
    const step = Math.floor(Math.random() * 8) + 2;
    const seq = [start, start - step, start - step * 2, start - step * 3, start - step * 4];
    qs.push({
      text: \`数列の?に入る数字は何でしょうか？\\n\${seq[0]}, \${seq[1]}, \${seq[2]}, \${seq[3]}, \${seq[4]}, ?\`,
      answers: [\`\${start - step * 5}\`],
      explanation: \`毎回 \${step} を引いています。\${seq[4]} - \${step} = \${start - step * 5}\`
    });
  }
  // 等比（掛け算）
  for (let i = 0; i < 5; i++) {
    const start = Math.floor(Math.random() * 3) + 2;
    const step = Math.floor(Math.random() * 3) + 2; // 2 or 3 or 4
    const seq = [start, start * step, start * Math.pow(step, 2), start * Math.pow(step, 3), start * Math.pow(step, 4)];
    qs.push({
      text: \`数列の?に入る数字は何でしょうか？\\n\${seq[0]}, \${seq[1]}, \${seq[2]}, \${seq[3]}, \${seq[4]}, ?\`,
      answers: [\`\${start * Math.pow(step, 5)}\`],
      explanation: \`毎回 \${step} を掛けています。\${seq[4]} × \${step} = \${start * Math.pow(step, 5)}\`
    });
  }
  // 割り算
  for (let i = 0; i < 5; i++) {
    const step = Math.floor(Math.random() * 2) + 2; // 2 or 3
    const end = Math.floor(Math.random() * 5) + 1;
    const seq = [end * Math.pow(step, 5), end * Math.pow(step, 4), end * Math.pow(step, 3), end * Math.pow(step, 2), end * step];
    qs.push({
      text: \`数列の?に入る数字は何でしょうか？\\n\${seq[0]}, \${seq[1]}, \${seq[2]}, \${seq[3]}, \${seq[4]}, ?\`,
      answers: [\`\${end}\`],
      explanation: \`毎回 \${step} で割っています。\${seq[4]} ÷ \${step} = \${end}\`
    });
  }
  return qs;
};
matrixReasoningQuestions.push(...generateSequenceQuestions());
`;

code += pushCode;

fs.writeFileSync('lib/questions.ts', code);
