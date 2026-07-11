const fs = require('fs');
let code = fs.readFileSync('lib/spatialQuestions.ts', 'utf8');

code = code.replace(
  /text: '絵を完成させてください'/g,
  (match, offset, fullString) => {
    // Determine which keywords we are near
    const snippet = fullString.slice(offset, offset + 1000);
    if (snippet.includes("keywords: ['顔', 'スマイル'")) {
      return "text: '絵を完成させてください（にこちゃんマーク）'";
    } else if (snippet.includes("keywords: ['家', 'いえ'")) {
      return "text: '絵を完成させてください（家）'";
    } else if (snippet.includes("keywords: ['十字', 'クロス'")) {
      return "text: '絵を完成させてください（十字架）'";
    } else if (snippet.includes("keywords: ['正方形', '四角'")) {
      return "text: '絵を完成させてください（正方形）'";
    } else if (snippet.includes("keywords: ['スマホ', 'スマートフォン'")) {
      return "text: '絵を完成させてください（スマートフォン）'";
    } else {
      return match;
    }
  }
);

fs.writeFileSync('lib/spatialQuestions.ts', code);
