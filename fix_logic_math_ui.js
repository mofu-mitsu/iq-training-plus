const fs = require('fs');
let code = fs.readFileSync('components/TrainingModule.tsx', 'utf8');

// Fix logic and math-word-problems generateQuestion
code = code.replace(
  /\} else if \(nextGameId === "logic"\) \{[\s\S]*?\} else if \(nextGameId === "math-word-problems"\) \{[\s\S]*?\} else if \(nextGameId === "visual-puzzle"\) \{/,
  `} else if (nextGameId === "logic") {
      const q = logicQuestions[Math.floor(Math.random() * logicQuestions.length)];
      setQuestionData({ text: q.text, options: q.options ? [...q.options].sort(()=>Math.random()-0.5) : undefined, keywords: q.keywords, answer: q.answer || q.a, explanation: q.explanation });
    } else if (nextGameId === "math-word-problems") {
      const q = mathQuestions[Math.floor(Math.random() * mathQuestions.length)];
      setQuestionData({ text: q.text, options: q.options ? [...q.options].sort(()=>Math.random()-0.5) : undefined, keywords: q.keywords, answer: q.answer || q.a, explanation: q.explanation });
    } else if (nextGameId === "visual-puzzle") {`
);

fs.writeFileSync('components/TrainingModule.tsx', code);
