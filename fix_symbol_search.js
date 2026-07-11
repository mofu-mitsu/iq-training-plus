const fs = require('fs');
let code = fs.readFileSync('components/TrainingModule.tsx', 'utf8');

const replacement = `} else if (nextGameId === "symbol-search") {
      const symbols = ["★", "●", "▲", "■", "◆", "♥", "♣", "♠", "✦", "✧", "❂", "❆"];
      const target = symbols[Math.floor(Math.random() * symbols.length)];
      const wrongOptions = symbols
        .filter((s) => s !== target)
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);
      setQuestionData({
        target,
        options: [target, ...wrongOptions].sort(() => Math.random() - 0.5),
        answer: target,
      });
    } else if (nextGameId === "pattern") {`;

code = code.replace(/\} else if \(nextGameId === "pattern"\) \{/, replacement);

fs.writeFileSync('components/TrainingModule.tsx', code);
