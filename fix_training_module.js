const fs = require('fs');
let code = fs.readFileSync('components/TrainingModule.tsx', 'utf8');

// Replace the VisualPuzzle's onComplete callback
code = code.replace(
  /onComplete=\{\(isCorrect\) => \{[\s\S]*?setIsCorrect\(isCorrect\);[\s\S]*?setExplanation\(questionData.explanation\);[\s\S]*?setGameState\('feedback'\);[\s\S]*?if \(isCorrect\) \{[\s\S]*?setScore\(score \+ 1\);[\s\S]*?if \(soundEnabled\) audio\?\.playSuccess\(\);[\s\S]*?\} else \{[\s\S]*?if \(soundEnabled\) audio\?\.playError\(\);[\s\S]*?\}[\s\S]*?\}\}/m,
  `onComplete={(isCorrect) => handleAnswer(isCorrect ? "true" : "false")}`
);

// We also need to make handleAnswer support "visual-puzzle"
// Right now, handleAnswer checks specific games and falls back to questionData.options / answer etc.
// Let's modify handleAnswer to handle "visual-puzzle"
code = code.replace(
  /\} else if \(questionData\) \{/,
  `} else if (currentGameId === 'visual-puzzle' && questionData) {
      isCorrect = answer === "true";
      correctAnswerStr = "正解の絵";
      questionText = "絵を完成させてください";
    } else if (questionData) {`
);

fs.writeFileSync('components/TrainingModule.tsx', code);
