const fs = require('fs');
let code = fs.readFileSync('lib/questions.ts', 'utf8');

const newMath = `
  { text: 'ある本を1日20ページずつ読むと15日で読み終わります。1日30ページずつ読むと何日で読み終わりますか？', keywords: ['10日', '10'], explanation: '総ページ数は 20 * 15 = 300ページ。これを30で割るので、300 / 30 = 10日。' },
  { text: 'Aさんの歩く速さは分速60m、Bさんは分速80mです。Aさんが家を出てから10分後にBさんが追いかけると、何分で追いつきますか？', keywords: ['30分', '30'], explanation: 'Aさんの先行距離は 60 * 10 = 600m。二人の速さの差は分速20m。600 / 20 = 30分で追いつきます。' },
  { text: '2, 3, 5, 7, 11, ? 次の素数は？', keywords: ['13'], explanation: '素数の列です。11の次の素数は13です。' }`;

const newLogic = `
  { text: 'AはBより背が高く、CはAより背が低い。一番背が高いのは誰か？（確定できない場合は「不明」）', keywords: ['A', 'Aさん'], explanation: 'A > B, A > C のため、一番高いのは確定でAです。' },
  { text: 'すべての犬は動物である。ポチは犬である。ゆえにポチは？', keywords: ['動物'], explanation: '三段論法により、動物となります。' }`;

const newVocab = `
  { text: '「急がば回れ」の対義語にもっとも近いことわざは？', keywords: ['善は急げ', '思い立ったが吉日'], explanation: '「善は急げ」などが反対の意味になります。' },
  { text: '「魑魅魍魎」の読み方は？（ひらがなで）', keywords: ['ちみもうりょう'], explanation: '「ちみもうりょう」と読みます。さまざまな化け物のことです。' }`;

code = code.replace(/export const mathQuestions = \\[/, 'export const mathQuestions = [' + newMath + ',');
code = code.replace(/export const logicQuestions = \\[/, 'export const logicQuestions = [' + newLogic + ',');
code = code.replace(/export const vocabularyQuestions = \\[/, 'export const vocabularyQuestions = [' + newVocab + ',');

fs.writeFileSync('lib/questions.ts', code);
