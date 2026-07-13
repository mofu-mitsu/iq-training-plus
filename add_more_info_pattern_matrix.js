const fs = require('fs');
let code = fs.readFileSync('lib/questions.ts', 'utf8');

const moreInfo = `
  { text: '日本で一番高い山は何ですか？', keywords: ['富士山'], explanation: '標高3776mの富士山です。' },
  { text: 'アメリカ合衆国の初代大統領は誰ですか？', keywords: ['ワシントン', 'ジョージ・ワシントン'], explanation: '初代大統領はジョージ・ワシントンです。' },
  { text: '水が沸騰する温度は通常何度ですか？', keywords: ['100度', '100℃', '100'], explanation: '1気圧において水は100度で沸騰します。' },
  { text: '地球の自転によって生じる自然現象は何ですか？', keywords: ['昼夜', '昼と夜', '朝と夜'], explanation: '地球が自転することで、太陽の光が当たる昼と当たらない夜が生じます。' },
  { text: '円周率を小数点以下2桁まで言うといくつですか？', keywords: ['3.14'], explanation: '円周率は約3.14159...と続く無理数ですが、通常3.14とされます。' },
  { text: '世界で一番長い川は何ですか？', keywords: ['ナイル川', 'アマゾン川'], explanation: '一般的にナイル川（またはアマゾン川）とされています。' },
  { text: '太陽系で一番大きい惑星は何ですか？', keywords: ['木星'], explanation: '木星が太陽系最大の惑星です。' },
  { text: '日本の国鳥は何ですか？', keywords: ['キジ', 'きじ', '雉'], explanation: '日本の国鳥はキジです。' },
  { text: '「吾輩は猫である」の作者は誰ですか？', keywords: ['夏目漱石', '漱石'], explanation: '夏目漱石の代表作の一つです。' },
  { text: '光の三原色は赤、緑と何ですか？', keywords: ['青', 'ブルー'], explanation: '光の三原色は赤(Red)、緑(Green)、青(Blue)です。' },
  { text: 'オリンピックのシンボルマークの輪の数はいくつですか？', keywords: ['5つ', '5個', '5'], explanation: '五大陸を表す5つの輪です。' },
  { text: '人間の骨の数は成人で約いくつですか？', keywords: ['206', '約200'], explanation: '成人の骨の数は一般的に206個とされています。' },
  { text: '元素記号「O」は何を表しますか？', keywords: ['酸素'], explanation: 'Oは酸素(Oxygen)の元素記号です。' },
  { text: '日本の都道府県はいくつありますか？', keywords: ['47', '47都道府県'], explanation: '1都1道2府43県で、合計47です。' },
  { text: '世界で一番人口が多い国はどこですか？（2023年時点）', keywords: ['インド'], explanation: '2023年にインドが中国を抜いて世界一の人口となりました。' },
  { text: '「万有引力の法則」を発見した科学者は誰ですか？', keywords: ['ニュートン', 'アイザック・ニュートン'], explanation: 'アイザック・ニュートンが発見しました。' },
  { text: 'モナ・リザを描いたのは誰ですか？', keywords: ['ダ・ヴィンチ', 'レオナルド', 'ダヴィンチ'], explanation: 'レオナルド・ダ・ヴィンチの作品です。' },
  { text: '人間の血液型でABO式と呼ばれるものには、A、B、Oともう一つは何ですか？', keywords: ['AB', 'AB型'], explanation: 'A型、B型、O型、AB型の4種類があります。' },
  { text: '一年で一番昼が長い日を何と言いますか？', keywords: ['夏至'], explanation: '北半球では夏至が最も昼の時間が長くなります。' },
  { text: '日本の通貨単位は何ですか？', keywords: ['円', 'えん', 'Yen'], explanation: '日本の通貨は「円」です。' }
`;

const morePattern = `
  { text: "次の図形の法則を見つけてください", grid: ["☆", "★", "☆", "★", "☆", "？"], options: ["☆", "★", "○", "●"], answer: "★", explanation: "白星と黒星が交互に現れます。" },
  { text: "次の図形の法則を見つけてください", grid: ["△", "△", "▲", "△", "△", "？"], options: ["△", "▲", "○", "●"], answer: "▲", explanation: "白△が2つ続いた後に黒▲が1つ来ます。" },
  { text: "次の文字の法則を見つけてください", grid: ["a", "z", "b", "y", "c", "？"], options: ["x", "d", "w", "e"], answer: "x", explanation: "アルファベットの先頭からと末尾からを交互に並べています。" },
  { text: "次の数字の法則を見つけてください", grid: ["3", "6", "9", "12", "15", "？"], options: ["16", "17", "18", "19"], answer: "18", explanation: "3ずつ増えています。" },
  { text: "次の図形の法則を見つけてください", grid: ["｜", "／", "―", "＼", "｜", "？"], options: ["｜", "／", "―", "＼"], answer: "／", explanation: "線が時計回りに45度ずつ回転しています。" },
  { text: "次の数字の法則を見つけてください", grid: ["2", "5", "10", "17", "26", "？"], options: ["35", "37", "39", "41"], answer: "37", explanation: "1, 4, 9, 16...という平方数に1を足した数になっています。" },
  { text: "次の数字の法則を見つけてください", grid: ["1", "3", "7", "15", "31", "？"], options: ["63", "64", "65", "66"], answer: "63", explanation: "前の数を2倍して1を足しています。" },
  { text: "次の文字の法則を見つけてください", grid: ["月", "火", "水", "木", "金", "？"], options: ["土", "日", "月", "火"], answer: "土", explanation: "曜日の順番です。" },
  { text: "次の数字の法則を見つけてください", grid: ["100", "50", "25", "12.5", "6.25", "？"], options: ["3.125", "3.25", "3", "0"], answer: "3.125", explanation: "半分（÷2）になっています。" },
  { text: "次の図形の法則を見つけてください", grid: ["大", "中", "小", "大", "中", "？"], options: ["大", "中", "小", "極小"], answer: "小", explanation: "「大・中・小」の繰り返しです。" }
`;

code = code.replace(
  'informationQuestions.push(',
  'informationQuestions.push(' + moreInfo + ','
);

code = code.replace(
  'patternQuestions.push(',
  'patternQuestions.push(' + morePattern + ','
);

fs.writeFileSync('lib/questions.ts', code);
