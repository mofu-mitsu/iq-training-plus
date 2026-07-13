const fs = require('fs');
let code = fs.readFileSync('lib/questions.ts', 'utf8');

const targetHelper = `const generateMathQuestions = () => {`;
const replacementHelper = `const generatePatternQuestions = () => {
  const qs = [];
  const symbols1 = ["●", "○", "◎", "☆", "★", "△", "▲", "□", "■", "×", "＋"];
  const chars1 = ["A", "B", "C", "D", "E", "X", "Y", "Z"];
  
  // Alternating symbols
  for (let i = 0; i < 20; i++) {
    const s1 = symbols1[Math.floor(Math.random() * symbols1.length)];
    let s2 = symbols1[Math.floor(Math.random() * symbols1.length)];
    while(s1 === s2) s2 = symbols1[Math.floor(Math.random() * symbols1.length)];
    
    qs.push({
      text: "次の法則を見つけてください",
      grid: [s1, s2, s1, s2, s1, "？"],
      options: [s1, s2, symbols1[Math.floor(Math.random()*symbols1.length)], symbols1[Math.floor(Math.random()*symbols1.length)]],
      answer: s2,
      explanation: \`「\${s1} → \${s2}」が交互に繰り返されます。\`
    });
  }
  
  // Triple symbols
  for (let i = 0; i < 20; i++) {
    const s1 = symbols1[Math.floor(Math.random() * symbols1.length)];
    let s2 = symbols1[Math.floor(Math.random() * symbols1.length)];
    while(s1 === s2) s2 = symbols1[Math.floor(Math.random() * symbols1.length)];
    let s3 = symbols1[Math.floor(Math.random() * symbols1.length)];
    while(s3 === s1 || s3 === s2) s3 = symbols1[Math.floor(Math.random() * symbols1.length)];
    
    qs.push({
      text: "次の法則を見つけてください",
      grid: [s1, s2, s3, s1, s2, "？"],
      options: [s1, s2, s3, symbols1[Math.floor(Math.random()*symbols1.length)]],
      answer: s3,
      explanation: \`「\${s1} → \${s2} → \${s3}」の繰り返しです。\`
    });
  }
  
  // Double-single symbols
  for (let i = 0; i < 20; i++) {
    const s1 = symbols1[Math.floor(Math.random() * symbols1.length)];
    let s2 = symbols1[Math.floor(Math.random() * symbols1.length)];
    while(s1 === s2) s2 = symbols1[Math.floor(Math.random() * symbols1.length)];
    
    qs.push({
      text: "次の法則を見つけてください",
      grid: [s1, s1, s2, s1, s1, "？"],
      options: [s1, s2, symbols1[Math.floor(Math.random()*symbols1.length)], symbols1[Math.floor(Math.random()*symbols1.length)]],
      answer: s2,
      explanation: \`\${s1}が2回、\${s2}が1回の繰り返しです。\`
    });
  }

  // Arithmetic progressions (numbers)
  for(let i = 0; i < 20; i++) {
    const start = Math.floor(Math.random() * 20) + 1;
    const step = Math.floor(Math.random() * 10) + 2;
    const grid = [
      String(start),
      String(start + step),
      String(start + step * 2),
      String(start + step * 3),
      String(start + step * 4),
      "？"
    ];
    qs.push({
      text: "次の法則を見つけてください",
      grid: grid,
      options: [String(start + step * 5), String(start + step * 6), String(start + step * 4 + 1), String(start + step * 5 + 1)],
      answer: String(start + step * 5),
      explanation: \`毎回\${step}ずつ増える数列です。\`
    });
  }

  return qs;
};

const generateMathQuestions = () => {`;

code = code.replace(targetHelper, replacementHelper);

const appendPattern = `patternQuestions.push(...generatePatternQuestions());`;
// Append to the end of the file
code += '\n' + appendPattern + '\n';

fs.writeFileSync('lib/questions.ts', code);
