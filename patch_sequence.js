const fs = require('fs');
let code = fs.readFileSync('lib/questions.ts', 'utf8');

const targetHelper = `const generateSequenceQuestions = () => {`;
const replacementHelper = `const generateSequenceQuestions = () => {
  const qs = [];
  // 等差（足し算）
  for (let i = 0; i < 30; i++) {
    const start = Math.floor(Math.random() * 20) + 1;
    const step = Math.floor(Math.random() * 15) + 2;
    const seq = [start, start + step, start + step * 2, start + step * 3, start + step * 4];
    qs.push({
      text: \`数列の?に入る数字は何でしょうか？\\n\${seq[0]}, \${seq[1]}, \${seq[2]}, \${seq[3]}, \${seq[4]}, ?\`,
      answers: [\`\${start + step * 5}\`],
      explanation: \`毎回 \${step} を足しています。\${seq[4]} + \${step} = \${start + step * 5}\`
    });
  }
  // 等差（引き算）
  for (let i = 0; i < 30; i++) {
    const start = Math.floor(Math.random() * 80) + 50;
    const step = Math.floor(Math.random() * 15) + 2;
    const seq = [start, start - step, start - step * 2, start - step * 3, start - step * 4];
    qs.push({
      text: \`数列の?に入る数字は何でしょうか？\\n\${seq[0]}, \${seq[1]}, \${seq[2]}, \${seq[3]}, \${seq[4]}, ?\`,
      answers: [\`\${start - step * 5}\`],
      explanation: \`毎回 \${step} を引いています。\${seq[4]} - \${step} = \${start - step * 5}\`
    });
  }
  // 等比（掛け算）
  for (let i = 0; i < 20; i++) {
    const start = Math.floor(Math.random() * 5) + 2;
    const step = Math.floor(Math.random() * 3) + 2;
    const seq = [start, start * step, start * Math.pow(step, 2), start * Math.pow(step, 3), start * Math.pow(step, 4)];
    qs.push({
      text: \`数列の?に入る数字は何でしょうか？\\n\${seq[0]}, \${seq[1]}, \${seq[2]}, \${seq[3]}, \${seq[4]}, ?\`,
      answers: [\`\${start * Math.pow(step, 5)}\`],
      explanation: \`毎回 \${step} を掛けています。\${seq[4]} × \${step} = \${start * Math.pow(step, 5)}\`
    });
  }
  // 割り算
  for (let i = 0; i < 20; i++) {
    const step = Math.floor(Math.random() * 2) + 2;
    const end = Math.floor(Math.random() * 10) + 1;
    const seq = [end * Math.pow(step, 5), end * Math.pow(step, 4), end * Math.pow(step, 3), end * Math.pow(step, 2), end * step];
    qs.push({
      text: \`数列の?に入る数字は何でしょうか？\\n\${seq[0]}, \${seq[1]}, \${seq[2]}, \${seq[3]}, \${seq[4]}, ?\`,
      answers: [\`\${end}\`],
      explanation: \`毎回 \${step} で割っています。\${seq[4]} ÷ \${step} = \${end}\`
    });
  }
  // フィボナッチ風（直前2つの和）
  for (let i = 0; i < 20; i++) {
    const a = Math.floor(Math.random() * 5) + 1;
    const b = Math.floor(Math.random() * 5) + 1;
    const seq = [a, b, a+b, a+2*b, 2*a+3*b];
    qs.push({
      text: \`数列の?に入る数字は何でしょうか？\\n\${seq[0]}, \${seq[1]}, \${seq[2]}, \${seq[3]}, \${seq[4]}, ?\`,
      answers: [\`\${3*a+5*b}\`],
      explanation: \`前の2つの数字を足した数が次になります。\${seq[3]} + \${seq[4]} = \${3*a+5*b}\`
    });
  }
  // 階差数列（増える幅が+1, +2, +3... または +2, +4, +6...）
  for (let i = 0; i < 20; i++) {
    const start = Math.floor(Math.random() * 10) + 1;
    const dStart = Math.floor(Math.random() * 3) + 1;
    const dStep = Math.floor(Math.random() * 2) + 1; // 差の差
    const seq = [
      start,
      start + dStart,
      start + dStart + (dStart + dStep),
      start + dStart + (dStart + dStep) + (dStart + 2*dStep),
      start + dStart + (dStart + dStep) + (dStart + 2*dStep) + (dStart + 3*dStep)
    ];
    const nextDiff = dStart + 4*dStep;
    const nextVal = seq[4] + nextDiff;
    qs.push({
      text: \`数列の?に入る数字は何でしょうか？\\n\${seq[0]}, \${seq[1]}, \${seq[2]}, \${seq[3]}, \${seq[4]}, ?\`,
      answers: [\`\${nextVal}\`],
      explanation: \`増える数が \${dStart}, \${dStart+dStep}, \${dStart+2*dStep}... と増えています。次は \${nextDiff} 増えるので \${seq[4]} + \${nextDiff} = \${nextVal}\`
    });
  }
  return qs;
};
// END_REPLACE`;

// We need to replace the old generateSequenceQuestions.
// We'll split the file by the function definition and the `matrixReasoningQuestions.push(...generateSequenceQuestions());` line.
const startIdx = code.indexOf(targetHelper);
const endPattern = 'matrixReasoningQuestions.push(...generateSequenceQuestions());';
const endIdx = code.indexOf(endPattern);

if (startIdx !== -1 && endIdx !== -1) {
  const newCode = code.substring(0, startIdx) + replacementHelper + '\n' + code.substring(endIdx);
  fs.writeFileSync('lib/questions.ts', newCode);
} else {
  console.log("Could not find start/end.");
}
