import fs from 'fs';
const file = 'components/TrainingModule.tsx';
let content = fs.readFileSync(file, 'utf8');

// wrap setupNextQuestion
content = content.replace('  const setupNextQuestion = () => {', '  const setupNextQuestion = useCallback(() => {');
content = content.replace('      });\n    }\n  };\n\n  const startGame', '      });\n    }\n  }, [currentQIndex, gameId, questionData, ALL_GAMES]);\n\n  const startGame');

fs.writeFileSync(file, content);
