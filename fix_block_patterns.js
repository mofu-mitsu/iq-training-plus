const fs = require('fs');
let code = fs.readFileSync('components/TrainingModule.tsx', 'utf8');

const additionalPatterns = `,
        {
          text: "次の模様と同じものを選択してください",
          target: "■□■\\n■■■\\n■□■",
          explanation: "両端が縦に繋がったH字の模様です。",
        },
        {
          text: "次の模様と同じものを選択してください",
          target: "□■□\\n■□■\\n□■□",
          explanation: "ひし形の模様です。",
        },
        {
          text: "次の模様と同じものを選択してください",
          target: "■■■\\n■□□\\n■■■",
          explanation: "左側が開いたコの字の模様です。",
        },
        {
          text: "次の模様と同じものを選択してください",
          target: "■■■\\n□□■\\n■■■",
          explanation: "右側が開いたコの字の模様です。",
        },
        {
          text: "次の模様と同じものを選択してください",
          target: "■■■\\n■□■\\n■■■",
          explanation: "ロの字型の模様です。",
        },
        {
          text: "次の模様と同じものを選択してください",
          target: "□□□\\n■■■\\n□□□",
          explanation: "中央の横線の模様です。",
        },
        {
          text: "次の模様と同じものを選択してください",
          target: "■□□\\n■□□\\n■□□",
          explanation: "左端の縦線の模様です。",
        },
        {
          text: "次の模様と同じものを選択してください",
          target: "□□■\\n□□■\\n□□■",
          explanation: "右端の縦線の模様です。",
        }
      ];`;

code = code.replace("explanation: \"ひし形の模様です。\",\n        }\n      ];", "explanation: \"ひし形の模様です。\",\n        }" + additionalPatterns);

fs.writeFileSync('components/TrainingModule.tsx', code);
