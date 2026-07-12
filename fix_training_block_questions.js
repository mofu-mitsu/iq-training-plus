const fs = require('fs');
let code = fs.readFileSync('components/TrainingModule.tsx', 'utf8');

const targetPatterns = `
      const patterns = [
        {
          text: "次の模様と同じものを選択してください",
          target: "■□■\\n□■□\\n■□■",
          options: ["■□■\\n□■□\\n■□■", "□■□\\n■□■\\n□■□", "■■■\\n□□□\\n■■■"],
          answer: "■□■\\n□■□\\n■□■",
          explanation: "角が塗りつぶされたX字の模様です。",
        },
        {
          text: "次の模様と同じものを選択してください",
          target: "■■□\\n■□□\\n□□□",
          options: ["■■□\\n■□□\\n□□□", "□■■\\n□□■\\n□□□", "■□□\\n■■□\\n□□□"],
          answer: "■■□\\n■□□\\n□□□",
          explanation: "左上のL字型の模様です。",
        },
        {
          text: "次の模様と同じものを選択してください",
          target: "□■□\\n■■■\\n□■□",
          options: ["■□■\\n□■□\\n■□■", "□■□\\n■■■\\n□■□", "■■■\\n■□■\\n■■■"],
          answer: "□■□\\n■■■\\n□■□",
          explanation: "十字の模様です。",
        },
        {
          text: "次の模様と同じものを選択してください",
          target: "■■■\\n■□■\\n■■■",
          options: ["■■■\\n■□■\\n■■■", "□□□\\n□■□\\n□□□", "■□■\\n□■□\\n■□■"],
          answer: "■■■\\n■□■\\n■■■",
          explanation: "真ん中だけが空いた四角い模様です。",
        },
        {
          text: "次の模様と同じものを選択してください",
          target: "□□■\\n□■□\\n■□□",
          options: ["□□■\\n□■□\\n■□□", "■□□\\n□■□\\n□□■", "■□■\\n□■□\\n■□■"],
          answer: "□□■\\n□■□\\n■□□",
          explanation: "右上から左下への斜め線の模様です。",
        },
        {
          text: "次の模様と同じものを選択してください",
          target: "■□□\\n■■□\\n■■■",
          options: ["■□□\\n■■□\\n■■■", "□□■\\n□■■\\n■■■", "■■■\\n■■□\\n■□□"],
          answer: "■□□\\n■■□\\n■■■",
          explanation: "左下が塗りつぶされた階段状の模様です。",
        },
        {
          text: "次の模様と同じものを選択してください",
          target: "□■□\\n□■□\\n□■□",
          options: ["□■□\\n□■□\\n□■□", "■■■\\n□□□\\n■■■", "□□□\\n■■■\\n□□□"],
          answer: "□■□\\n□■□\\n□■□",
          explanation: "中央の縦線の模様です。",
        },
        {
          text: "次の模様と同じものを選択してください",
          target: "■■■\\n□□□\\n■■■",
          options: ["■■■\\n□□□\\n■■■", "□■□\\n□■□\\n□■□", "■□■\\n■□■\\n■□■"],
          answer: "■■■\\n□□□\\n■■■",
          explanation: "上下の横線の模様です。",
        },
      ];
`;

const replacePatterns = `
      const patterns = [
        {
          text: "次の模様と同じものを選択してください",
          target: "■□■\\n□■□\\n■□■",
          explanation: "角が塗りつぶされたX字の模様です。",
        },
        {
          text: "次の模様と同じものを選択してください",
          target: "■■□\\n■□□\\n□□□",
          explanation: "左上のL字型の模様です。",
        },
        {
          text: "次の模様と同じものを選択してください",
          target: "□■□\\n■■■\\n□■□",
          explanation: "十字の模様です。",
        },
        {
          text: "次の模様と同じものを選択してください",
          target: "■■■\\n■□■\\n■■■",
          explanation: "真ん中だけが空いた四角い模様です。",
        },
        {
          text: "次の模様と同じものを選択してください",
          target: "□□■\\n□■□\\n■□□",
          explanation: "右上から左下への斜め線の模様です。",
        },
        {
          text: "次の模様と同じものを選択してください",
          target: "■□□\\n■■□\\n■■■",
          explanation: "左下が塗りつぶされた階段状の模様です。",
        },
        {
          text: "次の模様と同じものを選択してください",
          target: "□■□\\n□■□\\n□■□",
          explanation: "中央の縦線の模様です。",
        },
        {
          text: "次の模様と同じものを選択してください",
          target: "■■■\\n□□□\\n■■■",
          explanation: "上下の横線の模様です。",
        },
        {
          text: "次の模様と同じものを選択してください",
          target: "■■■\\n□■□\\n□□□",
          explanation: "上が塗りつぶされたT字の模様です。",
        },
        {
          text: "次の模様と同じものを選択してください",
          target: "□□■\\n□■■\\n■■■",
          explanation: "右下が塗りつぶされた階段状の模様です。",
        },
        {
          text: "次の模様と同じものを選択してください",
          target: "■□■\\n■■■\\n■□■",
          explanation: "左右の真ん中が空いたH字の模様です。",
        },
        {
          text: "次の模様と同じものを選択してください",
          target: "□■□\\n■□■\\n□■□",
          explanation: "ひし形の模様です。",
        }
      ];
`;

const startIndex = code.indexOf('const patterns = [');
const endIndex = code.indexOf('];', startIndex) + 2;

if (startIndex !== -1 && endIndex !== -1) {
  code = code.substring(0, startIndex) + replacePatterns + code.substring(endIndex);
  fs.writeFileSync('components/TrainingModule.tsx', code);
} else {
  console.log("Not found");
}

