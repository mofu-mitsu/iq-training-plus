const fs = require('fs');
let code = fs.readFileSync('lib/questions.ts', 'utf8');

// Remove mathQuestions.push(...generateMathQuestions());
code = code.replace(/mathQuestions\.push\(\.\.\.generateMathQuestions\(\)\);/, '');

// Add new word problems
const newMathCode = `
mathQuestions.push(
  { text: 'Aの管を使うとプールを満水にするのに2時間かかり、Bの管を使うと3時間かかります。両方の管を同時に使うと、プールを満水にするのに何時間かかりますか？', keywords: ['1.2時間', '1時間12分', '5分の6時間', '1.2'], explanation: '1時間あたりの水量は、Aが1/2、Bが1/3。合わせて1/2 + 1/3 = 5/6。満水にするには 1 / (5/6) = 6/5 = 1.2時間（1時間12分）かかります。' },
  { text: 'リンゴ3個とミカン5個を買うと550円でした。リンゴ1個はミカン1個より50円高いそうです。ミカン1個の値段はいくらですか？', keywords: ['50円', '50'], explanation: 'リンゴ1個をミカン1個+50円とすると、(ミカン+50)×3 + ミカン×5 = 550。8×ミカン + 150 = 550。8×ミカン = 400。ミカンは50円です。' },
  { text: 'ある学校の生徒数は昨年より5%増えて今年は420人でした。昨年の生徒数は何人でしたか？', keywords: ['400人', '400'], explanation: '昨年の人数をxとすると、x * 1.05 = 420。x = 420 / 1.05 = 400人。' },
  { text: '10%の食塩水200gと、20%の食塩水300gを混ぜると、何%の食塩水になりますか？', keywords: ['16%', '16'], explanation: '食塩の量は 200*0.1 + 300*0.2 = 20 + 60 = 80g。全体の重さは 200+300 = 500g。80 / 500 = 0.16 = 16% です。' },
  { text: '現在、父の年齢は子供の年齢の3倍です。10年後には、父の年齢は子供の年齢の2倍になります。現在の子供の年齢は何歳ですか？', keywords: ['10歳', '10'], explanation: '現在の子供をxとすると父は3x。10年後は 3x+10 = 2(x+10)。3x+10 = 2x+20。x=10。' }
);
`;

code += newMathCode;

fs.writeFileSync('lib/questions.ts', code);
