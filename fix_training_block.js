const fs = require('fs');
let code = fs.readFileSync('components/TrainingModule.tsx', 'utf8');

if (!code.includes("import BlockDesign")) {
  code = code.replace(
    "import VisualPuzzle from './VisualPuzzle';",
    "import VisualPuzzle from './VisualPuzzle';\nimport BlockDesign from './BlockDesign';"
  );
}

// 選択肢の非表示 (block-design の時は通常のボタンを表示しない)
code = code.replace(
  "currentGameId !== 'visual-puzzle' && currentGameId !== 'spatial-recognition' && questionData.options",
  "currentGameId !== 'visual-puzzle' && currentGameId !== 'spatial-recognition' && currentGameId !== 'block-design' && questionData.options"
);

// BlockDesignのレンダリング追加
const blockDesignRender = `
                    {currentGameId === 'block-design' && questionData.target && (
                      <BlockDesign
                        target={questionData.target}
                        onComplete={(isCorrect) => handleAnswer(isCorrect ? questionData.target : "incorrect")}
                      />
                    )}
`;
code = code.replace(
  "{currentGameId === 'visual-puzzle' ? (",
  blockDesignRender + "                    {currentGameId === 'visual-puzzle' ? ("
);

fs.writeFileSync('components/TrainingModule.tsx', code);
