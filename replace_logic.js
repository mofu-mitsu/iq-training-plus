const fs = require('fs');
let code = fs.readFileSync('components/TrainingModule.tsx', 'utf8');

// Imports
code = code.replace(
  /import { audio } from "\.\.\/lib\/audio";/,
  `import { audio } from "../lib/audio";\nimport { vocabularyQuestions, similaritiesQuestions, comprehensionQuestions, logicQuestions, mathQuestions, puzzleQuestions } from '../lib/questions';\nimport { visualPuzzleQuestions, spatialQuestions } from '../lib/spatialQuestions';\nimport VisualPuzzle from './VisualPuzzle';`
);

// vocabulary ~ comprehension
code = code.replace(
  /} else if \(nextGameId === "vocabulary"\) \{[\s\S]*?\} else if \(nextGameId === "matrix-reasoning"\) \{/,
  `} else if (nextGameId === "vocabulary") {
      setQuestionData(vocabularyQuestions[Math.floor(Math.random() * vocabularyQuestions.length)]);
    } else if (nextGameId === "similarities") {
      setQuestionData(similaritiesQuestions[Math.floor(Math.random() * similaritiesQuestions.length)]);
    } else if (nextGameId === "comprehension") {
      setQuestionData(comprehensionQuestions[Math.floor(Math.random() * comprehensionQuestions.length)]);
    } else if (nextGameId === "matrix-reasoning") {`
);

// puzzle
code = code.replace(
  /} else if \(nextGameId === "puzzle"\) \{[\s\S]*?\} else if \(nextGameId === "coding"\) \{/,
  `} else if (nextGameId === "puzzle") {
      const q = puzzleQuestions[Math.floor(Math.random() * puzzleQuestions.length)];
      setQuestionData({ text: q.text, options: [...q.options].sort(()=>Math.random()-0.5), answer: q.a, answers: q.answers, explanation: q.explanation });
    } else if (nextGameId === "coding") {`
);

// logic ~ spatial-recognition
code = code.replace(
  /} else if \(nextGameId === "logic"\) \{[\s\S]*?\} else \{/g,
  `} else if (nextGameId === "logic") {
      const q = logicQuestions[Math.floor(Math.random() * logicQuestions.length)];
      setQuestionData({ text: q.text, options: [...q.options].sort(()=>Math.random()-0.5), answer: q.a, explanation: q.explanation });
    } else if (nextGameId === "math-word-problems") {
      const q = mathQuestions[Math.floor(Math.random() * mathQuestions.length)];
      setQuestionData({ text: q.text, options: [...q.options].sort(()=>Math.random()-0.5), answer: q.a, explanation: q.explanation });
    } else if (nextGameId === "visual-puzzle") {
      setQuestionData(visualPuzzleQuestions[Math.floor(Math.random() * visualPuzzleQuestions.length)]);
    } else if (nextGameId === "spatial-recognition") {
      const q = spatialQuestions[Math.floor(Math.random() * spatialQuestions.length)];
      setQuestionData({ text: q.text, svg: q.svg, options: [...q.options], aIndex: q.aIndex, explanation: q.explanation });
    } else {`
);

// handleAnswer
code = code.replace(
  /if \(questionData\.answer\) \{/,
  `if (questionData.answers && Array.isArray(questionData.answers)) {
      isCorrect = questionData.answers.includes(answer);
      correctAnswer = questionData.answers[0];
    } else if (questionData.answer) {`
);
code = code.replace(
  /} else if \(questionData\.keywords\) \{/,
  `} else if (questionData.aIndex !== undefined) {
      isCorrect = answer === questionData.options[questionData.aIndex];
      correctAnswer = '正解の図形';
    } else if (questionData.keywords) {`
);

// Render SVG and Visual Puzzle
code = code.replace(
  /\{questionData\.options \? \(\n\s*<div className="flex flex-wrap justify-center gap-4">/,
  `{questionData.svg && currentGameId !== 'visual-puzzle' && (
      <div className="w-48 h-48 mx-auto mb-8 text-cyan-400" dangerouslySetInnerHTML={{ __html: questionData.svg }} />
    )}
    
    {currentGameId === 'visual-puzzle' ? (
      <div className="w-full">
        <VisualPuzzle 
          pieces={questionData.pieces}
          correctOrder={questionData.correctOrder}
          onComplete={(isCorrect) => {
            setIsCorrect(isCorrect);
            setExplanation(questionData.explanation);
            setGameState('feedback');
            if (isCorrect) {
              setScore(score + 1);
              if (soundEnabled) audio?.playSuccess();
            } else {
              if (soundEnabled) audio?.playError();
            }
          }}
        />
      </div>
    ) : questionData.options ? (
      <div className="flex flex-wrap justify-center gap-4">`
);

// Fix options rendering to handle SVG string options safely
code = code.replace(
  /\{opt\}\n\s*<\/button>/g,
  `{opt.includes('<svg') ? <div dangerouslySetInnerHTML={{ __html: opt }} className="w-16 h-16 mx-auto text-cyan-400 pointer-events-none" /> : opt}\n                          </button>`
);

fs.writeFileSync('components/TrainingModule.tsx', code);
