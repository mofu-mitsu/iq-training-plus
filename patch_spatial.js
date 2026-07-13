const fs = require('fs');
let code = fs.readFileSync('lib/questions.ts', 'utf8');

const moreSpatial = `
  { text: '次の図形を時計回りに90度回転させるとどうなりますか？\\n「↑」', options: ['→', '↓', '←', '↑'], answer: '→', explanation: '上向きの矢印を右に90度倒すと右向きになります。' },
  { text: '次の図形を反時計回りに90度回転させるとどうなりますか？\\n「↑」', options: ['←', '↓', '→', '↑'], answer: '←', explanation: '上向きの矢印を左に90度倒すと左向きになります。' },
  { text: '次の図形を180度回転させるとどうなりますか？\\n「d」', options: ['p', 'q', 'b', 'd'], answer: 'p', explanation: '小文字のdを上下逆さま（180度回転）にするとpになります。' },
  { text: '「b」を左右反転（鏡に映す）とどの文字になりますか？', options: ['d', 'p', 'q', 'b'], answer: 'd', explanation: 'bを左右反転するとdになります。' },
  { text: '「p」を上下反転させるとどの文字になりますか？', options: ['b', 'd', 'q', 'p'], answer: 'b', explanation: 'pを上下逆さにするとbになります。' },
  { text: '「←」を時計回りに180度回転させるとどうなりますか？', options: ['→', '↑', '↓', '←'], answer: '→', explanation: '180度回転は逆向きになるので右向きです。' },
  { text: '「△」を上下反転させるとどうなりますか？', options: ['▽', '△', '◁', '▷'], answer: '▽', explanation: '上向きの三角形をひっくり返すと下向きになります。' },
  { text: '「C」を時計回りに90度回転させるとどうなりますか？', options: ['∩', '∪', '⊃', 'C'], answer: '∩', explanation: '口が下を向く形になります。' }
`;

code = code.replace(
  'spatialQuestions.push(',
  'spatialQuestions.push(' + moreSpatial + ','
);

fs.writeFileSync('lib/questions.ts', code);
