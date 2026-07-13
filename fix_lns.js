const fs = require('fs');
let code = fs.readFileSync('components/TrainingModule.tsx', 'utf8');

const targetLNS = `    } else if (nextGameId === "letter-number-sequence") {
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
      const charCount = 3 + currentQIndex;`;

const replacementLNS = `    } else if (nextGameId === "letter-number-sequence") {
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
      // increase sequence size more aggressively if it's not a mix
      const charCount = gameId === "mix" ? 4 + Math.floor(Math.random() * 3) : 4 + currentQIndex + Math.floor(currentQIndex / 2);`;

code = code.replace(targetLNS, replacementLNS);

fs.writeFileSync('components/TrainingModule.tsx', code);
