const fs = require('fs');
let code = fs.readFileSync('components/TrainingModule.tsx', 'utf8');

// Update imports to include the newly exported arrays
code = code.replace(
  /import \{ vocabularyQuestions, similaritiesQuestions, comprehensionQuestions, logicQuestions, mathQuestions, puzzleQuestions \} from '\.\.\/lib\/questions';/,
  `import { vocabularyQuestions, similaritiesQuestions, comprehensionQuestions, logicQuestions, mathQuestions, puzzleQuestions, matrixReasoningQuestions, informationQuestions, patternQuestions } from '../lib/questions';`
);

// Replace matrix-reasoning
code = code.replace(
  /} else if \(nextGameId === "matrix-reasoning"\) \{[\s\S]*?\} else if \(nextGameId === "information"\) \{/,
  `} else if (nextGameId === "matrix-reasoning") {
      const q = matrixReasoningQuestions[Math.floor(Math.random() * matrixReasoningQuestions.length)];
      setQuestionData({ text: q.text, options: [...q.options].sort(()=>Math.random()-0.5), answer: q.a, explanation: q.explanation });
    } else if (nextGameId === "information") {`
);

// Replace information
code = code.replace(
  /} else if \(nextGameId === "information"\) \{[\s\S]*?\} else if \(nextGameId === "symbol-search"\) \{/,
  `} else if (nextGameId === "information") {
      setQuestionData(informationQuestions[Math.floor(Math.random() * informationQuestions.length)]);
    } else if (nextGameId === "symbol-search") {`
);

// Replace pattern
code = code.replace(
  /} else if \(nextGameId === "pattern"\) \{[\s\S]*?\} else if \(nextGameId === "puzzle"\) \{/,
  `} else if (nextGameId === "pattern") {
      const q = patternQuestions[Math.floor(Math.random() * patternQuestions.length)];
      setQuestionData({ text: q.text, grid: q.grid, options: [...q.options].sort(()=>Math.random()-0.5), answer: q.a, explanation: q.explanation });
    } else if (nextGameId === "puzzle") {`
);

// Replace arithmetic
code = code.replace(
  /} else if \(nextGameId === "arithmetic"\) \{[\s\S]*?\} else if \(nextGameId === "block-design"\) \{/,
  `} else if (nextGameId === "arithmetic") {
      const type = Math.floor(Math.random() * 4); // 0: +, 1: -, 2: *, 3: /
      let a, b, answer, opStr;
      if (type === 0) {
        a = Math.floor(Math.random() * 900) + 100;
        b = Math.floor(Math.random() * 900) + 100;
        answer = (a + b).toString();
        opStr = "+";
      } else if (type === 1) {
        a = Math.floor(Math.random() * 900) + 100;
        b = Math.floor(Math.random() * 900) + 100;
        if (a < b) [a, b] = [b, a];
        answer = (a - b).toString();
        opStr = "-";
      } else if (type === 2) {
        a = Math.floor(Math.random() * 90) + 10;
        b = Math.floor(Math.random() * 90) + 10;
        answer = (a * b).toString();
        opStr = "×";
      } else {
        b = Math.floor(Math.random() * 90) + 10;
        const ans = Math.floor(Math.random() * 90) + 10;
        a = b * ans;
        answer = ans.toString();
        opStr = "÷";
      }
      setQuestionData({ a, b, answer, opStr, text: \`\${a} \${opStr} \${b} = ?\` });
    } else if (nextGameId === "block-design") {`
);

fs.writeFileSync('components/TrainingModule.tsx', code);
