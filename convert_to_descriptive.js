const fs = require('fs');
let code = fs.readFileSync('lib/questions.ts', 'utf8');

// 「意味はどれ？」「共通点は？」「なぜ〜ですか？」などを対象に
// options と answer を削除し、keywords に変換する
code = code.replace(/{ text: '(.*?)', options: \[.*?\], answer: '(.*?)', explanation: '(.*?)' }/g, (match, text, answer, explanation) => {
  return `{ text: '${text}', keywords: ['${answer}'], explanation: '${explanation}' }`;
});

// 知識問題も同様に変換する
code = code.replace(/{ text: '(.*?)', options: \[.*?\], answer: '(.*?)', explanation: '(.*?)' }/g, (match, text, answer, explanation) => {
  return `{ text: '${text}', keywords: ['${answer}'], explanation: '${explanation}' }`;
});

fs.writeFileSync('lib/questions.ts', code);
