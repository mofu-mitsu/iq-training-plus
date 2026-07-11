const fs = require('fs');
let code = fs.readFileSync('components/TrainingModule.tsx', 'utf8');

if (!code.includes('import { User }')) {
  code = code.replace(
    /import \{ useStore \} from "\.\.\/lib\/store";/,
    `import { useStore } from "../lib/store";\nimport { User } from "firebase/auth";\nimport { saveScore } from "../lib/firebase";`
  );
}

if (!code.includes('user?: User | null;')) {
  code = code.replace(
    /soundEnabled: boolean;\n\}/,
    `soundEnabled: boolean;\n  user?: User | null;\n}`
  );
}

if (!code.includes(', user }: TrainingModuleProps')) {
  code = code.replace(
    /export default function TrainingModule\(\{ gameId, questionCount, onComplete, onQuit, soundEnabled \}: TrainingModuleProps\) \{/,
    `export default function TrainingModule({ gameId, questionCount, onComplete, onQuit, soundEnabled, user }: TrainingModuleProps) {`
  );
}

if (code.includes('setEndTime(Date.now());') && !code.includes('saveScore(')) {
  code = code.replace(
    /setGameState\("finished"\);\n    setEndTime\(Date.now\(\)\);/,
    `setGameState("finished");
    const end = Date.now();
    setEndTime(end);
    if (user) {
      const timeSpent = Math.floor((end - (startTime || end)) / 1000);
      saveScore(user.uid, s, questionCount, timeSpent).catch(console.error);
    }`
  );
}

fs.writeFileSync('components/TrainingModule.tsx', code);
