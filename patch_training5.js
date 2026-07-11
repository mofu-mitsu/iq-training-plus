const fs = require('fs');
let code = fs.readFileSync('components/TrainingModule.tsx', 'utf8');

code = code.replace(
  /const finishGame = \(\) => \{\n    setGameState\("finished"\);\n    addXp\(score \* 20\);\n    if \(gameId !== "mix"\) \{\n      updateHighScore\(gameId, score\);\n    \}\n    recordPlaySession\(\);\n  \};/,
  `const finishGame = () => {
    setGameState("finished");
    addXp(score * 20);
    if (gameId !== "mix") {
      updateHighScore(gameId, score);
    }
    recordPlaySession();
    if (user) {
      saveScore(user.uid, score, questionCount, 0).catch(console.error);
    }
  };`
);

fs.writeFileSync('components/TrainingModule.tsx', code);
