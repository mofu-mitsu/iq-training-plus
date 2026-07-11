const fs = require('fs');

const extra = `
// Replace visual puzzles
visualPuzzleQuestions.length = 0;
visualPuzzleQuestions.push(
  {
    text: '文字を並べ替えて、「りんご」を作ってください',
    pieces: ['ご', 'ん', 'り'],
    correctOrder: ['り', 'ん', 'ご'],
    explanation: '「り」「ん」「ご」の順になります。'
  },
  {
    text: '文字を並べ替えて、「とけい」を作ってください',
    pieces: ['け', 'い', 'と'],
    correctOrder: ['と', 'け', 'い'],
    explanation: '「と」「け」「い」の順になります。'
  },
  {
    text: '文字を並べ替えて、「くるま」を作ってください',
    pieces: ['る', 'ま', 'く'],
    correctOrder: ['く', 'る', 'ま'],
    explanation: '「く」「る」「ま」の順になります。'
  },
  {
    text: '文字を並べ替えて、「でんしゃ」を作ってください',
    pieces: ['ん', 'で', 'ゃ', 'し'],
    correctOrder: ['で', 'ん', 'し', 'ゃ'],
    explanation: '「で」「ん」「し」「ゃ」の順になります。'
  },
  {
    text: '文字を並べ替えて、「ひこうき」を作ってください',
    pieces: ['う', 'き', 'ひ', 'こ'],
    correctOrder: ['ひ', 'こ', 'う', 'き'],
    explanation: '「ひ」「こ」「う」「き」の順になります。'
  }
);
`;

fs.appendFileSync('lib/spatialQuestions.ts', extra);
