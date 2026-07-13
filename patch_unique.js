const fs = require('fs');
let code = fs.readFileSync('components/TrainingModule.tsx', 'utf8');

const targetHelper = `  const setupNextQuestion = () => {`;
const replacementHelper = `  const getRandomUnique = (arr: any[], current: any) => {
    if (arr.length <= 1) return arr[0];
    let q;
    let attempts = 0;
    do {
      q = arr[Math.floor(Math.random() * arr.length)];
      attempts++;
    } while (current && q.text === current.text && attempts < 10);
    return q;
  };

  const setupNextQuestion = () => {`;

code = code.replace(targetHelper, replacementHelper);

const patternsToReplace = [
  { 
    old: `setQuestionData(vocabularyQuestions[Math.floor(Math.random() * vocabularyQuestions.length)]);`,
    new: `setQuestionData(getRandomUnique(vocabularyQuestions, questionData));`
  },
  {
    old: `setQuestionData(similaritiesQuestions[Math.floor(Math.random() * similaritiesQuestions.length)]);`,
    new: `setQuestionData(getRandomUnique(similaritiesQuestions, questionData));`
  },
  {
    old: `setQuestionData(comprehensionQuestions[Math.floor(Math.random() * comprehensionQuestions.length)]);`,
    new: `setQuestionData(getRandomUnique(comprehensionQuestions, questionData));`
  },
  {
    old: `setQuestionData(informationQuestions[Math.floor(Math.random() * informationQuestions.length)]);`,
    new: `setQuestionData(getRandomUnique(informationQuestions, questionData));`
  },
  {
    old: `setQuestionData(logicQuestions[Math.floor(Math.random() * logicQuestions.length)]);`,
    new: `setQuestionData(getRandomUnique(logicQuestions, questionData));`
  },
  {
    old: `setQuestionData(mathQuestions[Math.floor(Math.random() * mathQuestions.length)]);`,
    new: `setQuestionData(getRandomUnique(mathQuestions, questionData));`
  }
];

patternsToReplace.forEach(p => {
  code = code.replace(p.old, p.new);
});

// For matrix-reasoning:
code = code.replace(
  `const q = matrixReasoningQuestions[Math.floor(Math.random() * matrixReasoningQuestions.length)];`,
  `const q = getRandomUnique(matrixReasoningQuestions, questionData);`
);

// For picture-completion:
code = code.replace(
  `const q = pictureCompletionQuestions[Math.floor(Math.random() * pictureCompletionQuestions.length)];`,
  `const q = getRandomUnique(pictureCompletionQuestions, questionData);`
);

// For spatial:
code = code.replace(
  `const q = spatialQuestions[Math.floor(Math.random() * spatialQuestions.length)];`,
  `const q = getRandomUnique(spatialQuestions, questionData);`
);

// For block-design:
code = code.replace(
  `setQuestionData(patterns[Math.floor(Math.random() * patterns.length)]);`,
  `setQuestionData(getRandomUnique(patterns, questionData));`
);

// For pattern:
code = code.replace(
  `setQuestionData(patternQuestions[Math.floor(Math.random() * patternQuestions.length)]);`,
  `setQuestionData(getRandomUnique(patternQuestions, questionData));`
);

fs.writeFileSync('components/TrainingModule.tsx', code);
