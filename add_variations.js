const fs = require('fs');

const extra = `
// --- MORE VARIATIONS ---

const generateMathQuestions = () => {
  const q = [];
  for(let i=0; i<15; i++) {
    let a = Math.floor(Math.random() * 50) + 10;
    let b = Math.floor(Math.random() * 50) + 10;
    q.push({ text: \`\${a} と \${b} を足すといくつ？\`, options: [\`\${a+b}\`, \`\${a+b+10}\`, \`\${a+b-10}\`], answer: \`\${a+b}\`, explanation: \`\${a} + \${b} = \${a+b} です。\`});
    
    let c = Math.floor(Math.random() * 50) + 20;
    let d = Math.floor(Math.random() * 20) + 1;
    q.push({ text: \`\${c} から \${d} を引くといくつ？\`, options: [\`\${c-d}\`, \`\${c-d+5}\`, \`\${c-d-5}\`], answer: \`\${c-d}\`, explanation: \`\${c} - \${d} = \${c-d} です。\`});
  }
  return q;
};
mathQuestions.push(...generateMathQuestions());

logicQuestions.push(
  { text: 'AさんはBさんより速く走る。CさんはAさんより速く走る。一番遅いのは誰？', options: ['Aさん', 'Bさん', 'Cさん'], answer: 'Bさん', explanation: 'C > A > B の順になるので、一番遅いのはBさんです。' },
  { text: '太郎は次郎より兄である。次郎は三郎より兄である。一番年下は誰？', options: ['太郎', '次郎', '三郎'], answer: '三郎', explanation: '太郎 > 次郎 > 三郎 の順になります。' },
  { text: 'XはYより重い。ZはXより重い。一番軽いのは？', options: ['X', 'Y', 'Z'], answer: 'Y', explanation: 'Z > X > Y の順になります。' },
  { text: '赤の箱は青の箱より大きい。緑の箱は赤の箱より大きい。一番小さいのは？', options: ['赤の箱', '青の箱', '緑の箱'], answer: '青の箱', explanation: '緑 > 赤 > 青 の順になります。' },
  { text: '「すべての花は美しい」「バラは花である」から導かれる結論は？', options: ['バラは美しい', 'バラは赤色である', '花はバラである'], answer: 'バラは美しい', explanation: '前提から論理的に導かれるのは「バラは美しい」です。' },
  { text: '明後日は水曜日です。昨日は何曜日？', options: ['日曜日', '月曜日', '火曜日'], answer: '日曜日', explanation: '明後日が水曜日なら、今日は月曜日。したがって昨日は日曜日です。' },
  { text: '明日は金曜日です。3日後は何曜日？', options: ['日曜日', '月曜日', '火曜日'], answer: '日曜日', explanation: '明日が金曜日なら今日は木曜日。3日後は日曜日です。' },
  { text: 'AはBの親です。CはAの親です。Cから見てBは？', options: ['子供', '孫', '兄弟'], answer: '孫', explanation: '親の親なので、BはCの孫にあたります。' },
  { text: 'りんごはみかんより甘い。ぶどうはりんごより甘い。一番甘くないのは？', options: ['りんご', 'みかん', 'ぶどう'], answer: 'みかん', explanation: 'ぶどう > りんご > みかん の順です。' },
  { text: '東京は大阪より東にある。千葉は東京より東にある。一番西にあるのは？', options: ['東京', '大阪', '千葉'], answer: '大阪', explanation: '西から順に、大阪、東京、千葉となります。' }
);

patternQuestions.push(
  { text: "次の図形の法則を見つけてください", grid: ["●", "○", "●", "○", "●", "？"], options: ["●", "○", "◎", "☆"], answer: "○", explanation: "「● → ○」が交互に繰り返されます。" },
  { text: "次の数字の法則を見つけてください", grid: ["2", "4", "6", "8", "10", "？"], options: ["11", "12", "13", "14"], answer: "12", explanation: "2ずつ増える偶数の列です。" },
  { text: "次の文字の法則を見つけてください", grid: ["A", "B", "C", "A", "B", "？"], options: ["A", "B", "C", "D"], answer: "C", explanation: "「A → B → C」の繰り返しです。" },
  { text: "次の数字の法則を見つけてください", grid: ["10", "9", "8", "7", "6", "？"], options: ["4", "5", "6", "7"], answer: "5", explanation: "1ずつ減っていく列です。" },
  { text: "次の図形の法則を見つけてください", grid: ["↑", "↓", "↑", "↓", "↑", "？"], options: ["↑", "↓", "←", "→"], answer: "↓", explanation: "上向きと下向きの矢印が交互に現れます。" },
  { text: "次の数字の法則を見つけてください", grid: ["1", "4", "9", "16", "25", "？"], options: ["30", "36", "40", "49"], answer: "36", explanation: "1, 2, 3, 4, 5の2乗（平方数）の列です。次は6の2乗で36です。" },
  { text: "次の数字の法則を見つけてください", grid: ["1", "2", "4", "8", "16", "？"], options: ["24", "32", "48", "64"], answer: "32", explanation: "2倍ずつ増えていく数列（等比数列）です。" },
  { text: "次の法則を見つけてください", grid: ["月", "火", "水", "木", "金", "？"], options: ["土", "日", "月", "火"], answer: "土", explanation: "曜日の順番に並んでいます。" },
  { text: "次の図形の法則を見つけてください", grid: ["★", "☆", "★", "☆", "★", "？"], options: ["★", "☆", "○", "●"], answer: "☆", explanation: "黒星と白星が交互に並んでいます。" },
  { text: "次の数字の法則を見つけてください", grid: ["3", "6", "9", "12", "15", "？"], options: ["16", "17", "18", "19"], answer: "18", explanation: "3ずつ増える数列（3の倍数）です。" }
);

puzzleQuestions.push(
  { text: '「い・す・か」を並び替えてできる言葉は？', options: ['すいか', 'いかす', 'かすい'], answer: 'すいか', answers: ['すいか'], explanation: '並び替えると「すいか（西瓜）」になります。' },
  { text: '「と・ま・と」を並び替えてできる言葉は？', options: ['まとと', 'とまと', 'ととま'], answer: 'とまと', answers: ['とまと'], explanation: '並び替えると「とまと（トマト）」になります。' },
  { text: '「ら・く・さ」を並び替えてできる言葉は？', options: ['さくら', 'くさら', 'らくさ'], answer: 'さくら', answers: ['さくら'], explanation: '並び替えると「さくら（桜）」になります。' },
  { text: '「め・が・ね」を並び替えてできる言葉は？', options: ['ねがめ', 'めがね', 'がねめ'], answer: 'めがね', answers: ['めがね'], explanation: '並び替えると「めがね（眼鏡）」になります。' },
  { text: '「り・ん・ご」を並び替えてできる言葉は？', options: ['ごんり', 'りんご', 'んごり'], answer: 'りんご', answers: ['りんご'], explanation: '並び替えると「りんご（林檎）」になります。' },
  { text: '「ん・か・か・き」を並び替えてできる言葉は？', options: ['きんかか', 'かきかん', 'かかんき'], answer: 'かきかん', answers: ['かきかん', 'かんかき'], explanation: '並び替えると「かきかん（柿缶）」などの言葉になりますが、一般的な単語としては少し難しいです。（この問題は例です）' },
  { text: '「れ・も・ん」を並び替えてできる言葉は？', options: ['れもん', 'もんれ', 'んもれ'], answer: 'れもん', answers: ['れもん'], explanation: '並び替えると「れもん（レモン）」になります。' },
  { text: '「た・ま・ご」を並び替えてできる言葉は？', options: ['たまご', 'ごまた', 'まごた'], answer: 'たまご', answers: ['たまご'], explanation: '並び替えると「たまご（卵）」になります。' },
  { text: '「つ・く・え」を並び替えてできる言葉は？', options: ['つくえ', 'えくつ', 'くえつ'], answer: 'つくえ', answers: ['つくえ'], explanation: '並び替えると「つくえ（机）」になります。' },
  { text: '「か・ば・ん」を並び替えてできる言葉は？', options: ['かばん', 'ばんか', 'んかば'], answer: 'かばん', answers: ['かばん'], explanation: '並び替えると「かばん（鞄）」になります。' }
);
`;

fs.appendFileSync('lib/questions.ts', extra);
