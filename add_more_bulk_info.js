const fs = require('fs');
let code = fs.readFileSync('lib/questions.ts', 'utf8');

const massiveInfo = `
  { text: '日本で二番目に高い山は何ですか？', keywords: ['北岳', 'きただけ'], explanation: '南アルプスにある北岳（標高3,193m）です。' },
  { text: '夏目漱石の千円札の前の千円札の肖像画は誰でしたか？', keywords: ['伊藤博文'], explanation: '1963年から1986年までは伊藤博文でした。' },
  { text: '元素記号「H」は何を表しますか？', keywords: ['水素'], explanation: 'Hは水素(Hydrogen)です。' },
  { text: '徳川家康が開いた幕府は何幕府ですか？', keywords: ['江戸', '江戸幕府'], explanation: '1603年に江戸幕府を開きました。' },
  { text: '世界で一番面積の広い国はどこですか？', keywords: ['ロシア'], explanation: 'ロシア連邦が世界最大の面積を持ちます。' },
  { text: '「白雪姫」に出てくる小人は何人ですか？', keywords: ['7人', '7'], explanation: '7人の小人が登場します。' },
  { text: '人間の歯は大人の場合、通常何本ありますか？（親知らずを含む）', keywords: ['32本', '32'], explanation: '通常、上下16本ずつの計32本です。' },
  { text: '野球は1チーム何人でプレーしますか？', keywords: ['9人', '9'], explanation: '野球は9人対9人で行われます。' },
  { text: 'オリンピックの開催間隔は何年ごとですか？', keywords: ['4年', '4'], explanation: '夏季・冬季それぞれ4年ごとに開催されます。' },
  { text: '世界三大洋は、太平洋、大西洋と、あと一つは何ですか？', keywords: ['インド洋'], explanation: '太平洋、大西洋、インド洋の3つです。' },
  { text: '一日は何時間ですか？', keywords: ['24', '24時間'], explanation: '地球が1回転する時間が1日（24時間）です。' },
  { text: '日本国憲法の三大原則は、国民主権、平和主義と、あと一つは何ですか？', keywords: ['基本的人権の尊重', '基本的人権'], explanation: '基本的人権の尊重です。' },
  { text: '1年は何日ですか？（うるう年を除く）', keywords: ['365日', '365'], explanation: '通常年は365日です。' },
  { text: 'カエルの子供（幼生）を何と呼びますか？', keywords: ['おたまじゃくし'], explanation: 'カエルの幼生はおたまじゃくしと呼ばれます。' },
  { text: '「桃太郎」がお供にした動物は、犬、猿と何ですか？', keywords: ['キジ', 'きじ', '雉'], explanation: '犬、猿、キジをお供にしました。' },
  { text: '「赤い靴」の童謡で、女の子が連れられて行ったのはどこですか？', keywords: ['異人さんに連れられて', '横浜', '外国'], explanation: '異人さんに連れられて行っちゃった、という歌詞です。（横浜の港が舞台とも言われます）' },
  { text: '1日は何分ですか？', keywords: ['1440', '1440分'], explanation: '24時間 × 60分 = 1440分です。' },
  { text: 'アルファベットは全部で何文字ありますか？', keywords: ['26', '26文字'], explanation: 'AからZまで26文字です。' },
  { text: '日本の国花は何と何ですか？', keywords: ['桜と菊', '菊と桜', '桜', '菊'], explanation: '一般的に桜と菊が国花とされています。' },
  { text: 'ピアノの鍵盤の数は通常いくつですか？', keywords: ['88', '88鍵', '88個'], explanation: '白鍵52、黒鍵36の合計88鍵です。' }
`;

code = code.replace(
  'informationQuestions.push(',
  'informationQuestions.push(' + massiveInfo + ','
);

fs.writeFileSync('lib/questions.ts', code);
