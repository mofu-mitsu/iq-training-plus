const fs = require('fs');
let code = fs.readFileSync('components/TrainingModule.tsx', 'utf8');

// Replace the hardcoded information block
code = code.replace(
  /\} else if \(nextGameId === "information"\) \{[\s\S]*?\} else if \(nextGameId === "pattern"\) \{/,
  `} else if (nextGameId === "information") {
      setQuestionData(informationQuestions[Math.floor(Math.random() * informationQuestions.length)]);
    } else if (nextGameId === "pattern") {`
);

fs.writeFileSync('components/TrainingModule.tsx', code);
