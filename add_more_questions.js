const fs = require('fs');
let qCode = fs.readFileSync('lib/questions.ts', 'utf8');

const moreLogic = `
  { text: 'A、B、C、Dの4人がレースをしました。\\nAはCより速かった。\\nDはBより遅かったが、Cよりは速かった。\\n1番速かったのは誰と誰の可能性がありますか？', options: ['AかB', 'Bのみ', 'Aのみ', 'AかC'], a: 'AかB', explanation: 'A>C, B>D>C。AとBの直接の比較がないため、1位はAかBの可能性があります。' },
  { text: 'あるクラスの生徒は全員、犬か猫の少なくとも一方を飼っています。\\n犬を飼っている人は20人、猫を飼っている人は15人、両方飼っている人は5人です。\\nクラスの人数は何人ですか？', options: ['30人', '35人', '40人', '25人'], a: '30人', explanation: '20 + 15 - 5 = 30人です。' },
`;
qCode = qCode.replace("export const logicQuestions = [", "export const logicQuestions = [" + moreLogic);
fs.writeFileSync('lib/questions.ts', qCode);
