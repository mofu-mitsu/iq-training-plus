"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useStore } from "../lib/store";
import { User } from "firebase/auth";
import { saveScore } from "../lib/firebase";
import { audio } from "../lib/audio";
import { vocabularyQuestions, pictureCompletionQuestions, similaritiesQuestions, comprehensionQuestions, logicQuestions, mathQuestions, puzzleQuestions, matrixReasoningQuestions, informationQuestions, patternQuestions } from '../lib/questions';
import { visualPuzzleQuestions, spatialQuestions } from '../lib/spatialQuestions';
import VisualPuzzle from './VisualPuzzle';
import BlockDesign from './BlockDesign';
import { toPng } from 'html-to-image';
import { Share2, Download, CheckCircle2 } from 'lucide-react';
import NeonBackground from "./NeonBackground";
import toast from 'react-hot-toast';

import FeedbackForm from './FeedbackForm';

type TrainingProps = {
  gameId: string;
  questionCount?: number;
  soundEnabled?: boolean;
  onComplete: () => void;
  onQuit: () => void;
  user?: any;
};

const ALL_GAMES = [
  "block-design",
  "vocabulary",
  "similarities",
  "comprehension",
  "arithmetic",
  "digit-span",
  "matrix-reasoning",
  "information",
  "symbol-search",
  "pattern",
  "puzzle",
  "coding",
  "cancellation",
  "letter-number-sequence",
  "figure-weights",
  "picture-completion",
  "logic",
  "math-word-problems",
  "visual-puzzle",
  "spatial-recognition",
];

export default function TrainingModule({
  gameId,
  questionCount = 5,
  soundEnabled = true,
  onComplete,
  onQuit,
  user,
}: TrainingProps) {
  const [gameState, setGameState] = useState<"ready" | "playing" | "finished">(
    "ready",
  );
  const [score, setScore] = useState(0);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [currentGameId, setCurrentGameId] = useState(
    gameId === "mix" ? ALL_GAMES[0] : gameId,
  );

  // Digit Span State
  const [sequence, setSequence] = useState<number[]>([]);
  const [displayIndex, setDisplayIndex] = useState(-1);
  const [userInput, setUserInput] = useState("");

  // General Game State
  const [questionData, setQuestionData] = useState<any>(null);
  const [puzzleSolved, setPuzzleSolved] = useState(false);
  const { level } = useStore();
  const [history, setHistory] = useState<any[]>([]);
  const [leveledUp, setLeveledUp] = useState(false);
  const [localQuestionCount, setLocalQuestionCount] = useState(questionCount);
  const [rakutenItem, setRakutenItem] = useState<{name: string, url: string, image: string, price: number} | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isProcessingAnswer, setIsProcessingAnswer] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const prevLevel = useRef(useStore.getState().level);

  
  const copyResults = () => {
    let text = `IQトレーニング+ 結果\nスコア: ${score} / ${localQuestionCount}\n\n`;
    history.forEach((h, i) => {
      text += `Q${i + 1}: ${h.question}\n`;
      text += `あなたの回答: ${h.userAnswer} ${h.isCorrect ? '✅' : '❌'}\n`;
      if (!h.isCorrect) text += `正解: ${h.correctAnswer}\n`;
      if (h.explanation) text += `解説: ${h.explanation}\n`;
      text += `\n`;
    });
    navigator.clipboard.writeText(text).then(() => {
      toast.success('結果をコピーしました！');
    });
  };

  const handleSaveImage = async () => {
    if (!resultRef.current) return;
    try {
      setIsSaving(true);
      // Wait for React to re-render without the scrollbar
      await new Promise((resolve) => setTimeout(resolve, 100));
      
      const image = await toPng(resultRef.current, { backgroundColor: '#0f172a', cacheBust: true });
      const a = document.createElement("a");
      a.href = image;
      a.download = `wais-training-result-${Date.now()}.png`;
      a.click();
      setShowSaveModal(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleShare = async () => {
    const text = `脳トレで ${score}/${questionCount} 点を獲得しました！ #脳トレ #WAISトレーニング`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: '脳トレ結果',
          text: text,
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      navigator.clipboard.writeText(text);
      toast.success('結果をクリップボードにコピーしました！');
    }
  };

  const { addXp, updateHighScore, recordPlaySession } = useStore();

  const generateDigitSpan = (length: number) =>
    Array.from({ length }, () => Math.floor(Math.random() * 10));

  const speakText = (text: string) => {
    if (!soundEnabled) return;
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ja-JP";
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const getRandomUnique = (arr: any[], current: any) => {
    if (arr.length <= 1) return arr[0];
    let q;
    let attempts = 0;
    do {
      q = arr[Math.floor(Math.random() * arr.length)];
      attempts++;
    } while (current && q.text === current.text && attempts < 10);
    return q;
  };

  const setupNextQuestion = useCallback(() => {
    if (currentQIndex >= localQuestionCount) {
      finishGame();
      return;
    }

    let nextGameId =
      gameId === "mix"
        ? ALL_GAMES[Math.floor(Math.random() * ALL_GAMES.length)]
        : gameId;
    if (nextGameId === "digit-span") {
      const types = [
        "digit-span-forward",
        "digit-span-backward",
        "digit-span-sequence",
        "digit-span-descending",
      ];
      nextGameId = types[Math.floor(Math.random() * types.length)];
    }

    setCurrentGameId(nextGameId);
    setUserInput("");
    setDisplayIndex(-1);
    setIsProcessingAnswer(false);

    if (nextGameId.startsWith("digit-span")) {
      const length = Math.min(3 + Math.floor(currentQIndex / 2), 9);
      const newSeq = generateDigitSpan(length);
      setSequence(newSeq);
      setDisplayIndex(-2); // 準備中

      // Start presentation sequence
      setTimeout(() => {
        let i = 0;
        const interval = setInterval(() => {
          if (i < newSeq.length) {
            setDisplayIndex(i);
            speakText(newSeq[i].toString() + "、"); // 連続した同じ数字を区切って読み上げさせるため読点を追加
            i++;
          } else {
            clearInterval(interval);
            setDisplayIndex(-1); // End of display
          }
        }, 1500); // 1.5s per digit
      }, 1000);
    } else if (nextGameId === "arithmetic") {
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
      setQuestionData({ a, b, answer, opStr, text: `${a} ${opStr} ${b} = ?` });
    } else if (nextGameId === "block-design") {
      
      const patterns = [
        {
          text: "次の模様と同じものを選択してください",
          target: "■□■\n□■□\n■□■",
          explanation: "角が塗りつぶされたX字の模様です。",
        },
        {
          text: "次の模様と同じものを選択してください",
          target: "■■□\n■□□\n□□□",
          explanation: "左上のL字型の模様です。",
        },
        {
          text: "次の模様と同じものを選択してください",
          target: "□■□\n■■■\n□■□",
          explanation: "十字の模様です。",
        },
        {
          text: "次の模様と同じものを選択してください",
          target: "■■■\n■□■\n■■■",
          explanation: "真ん中だけが空いた四角い模様です。",
        },
        {
          text: "次の模様と同じものを選択してください",
          target: "□□■\n□■□\n■□□",
          explanation: "右上から左下への斜め線の模様です。",
        },
        {
          text: "次の模様と同じものを選択してください",
          target: "■□□\n■■□\n■■■",
          explanation: "左下が塗りつぶされた階段状の模様です。",
        },
        {
          text: "次の模様と同じものを選択してください",
          target: "□■□\n□■□\n□■□",
          explanation: "中央の縦線の模様です。",
        },
        {
          text: "次の模様と同じものを選択してください",
          target: "■■■\n□□□\n■■■",
          explanation: "上下の横線の模様です。",
        },
        {
          text: "次の模様と同じものを選択してください",
          target: "■■■\n□■□\n□□□",
          explanation: "上が塗りつぶされたT字の模様です。",
        },
        {
          text: "次の模様と同じものを選択してください",
          target: "□□■\n□■■\n■■■",
          explanation: "右下が塗りつぶされた階段状の模様です。",
        },
        {
          text: "次の模様と同じものを選択してください",
          target: "■□■\n■■■\n■□■",
          explanation: "左右の真ん中が空いたH字の模様です。",
        },
        {
          text: "次の模様と同じものを選択してください",
          target: "□■□\n■□■\n□■□",
          explanation: "ひし形の模様です。",
        },
        {
          text: "次の模様と同じものを選択してください",
          target: "■□■\n■■■\n■□■",
          explanation: "両端が縦に繋がったH字の模様です。",
        },
        {
          text: "次の模様と同じものを選択してください",
          target: "□■□\n■□■\n□■□",
          explanation: "ひし形の模様です。",
        },
        {
          text: "次の模様と同じものを選択してください",
          target: "■■■\n■□□\n■■■",
          explanation: "左側が開いたコの字の模様です。",
        },
        {
          text: "次の模様と同じものを選択してください",
          target: "■■■\n□□■\n■■■",
          explanation: "右側が開いたコの字の模様です。",
        },
        {
          text: "次の模様と同じものを選択してください",
          target: "■■■\n■□■\n■■■",
          explanation: "ロの字型の模様です。",
        },
        {
          text: "次の模様と同じものを選択してください",
          target: "□□□\n■■■\n□□□",
          explanation: "中央の横線の模様です。",
        },
        {
          text: "次の模様と同じものを選択してください",
          target: "■□□\n■□□\n■□□",
          explanation: "左端の縦線の模様です。",
        },
        {
          text: "次の模様と同じものを選択してください",
          target: "□□■\n□□■\n□□■",
          explanation: "右端の縦線の模様です。",
        }
      ];

      setQuestionData(getRandomUnique(patterns, questionData));
    } else if (nextGameId === "vocabulary") {
      setQuestionData(getRandomUnique(vocabularyQuestions, questionData));
    } else if (nextGameId === "similarities") {
      setQuestionData(getRandomUnique(similaritiesQuestions, questionData));
    } else if (nextGameId === "comprehension") {
      setQuestionData(getRandomUnique(comprehensionQuestions, questionData));
    } else if (nextGameId === "matrix-reasoning") {
      const q = getRandomUnique(matrixReasoningQuestions, questionData);
      setQuestionData({ text: q.text, options: q.options ? [...q.options].sort(()=>Math.random()-0.5) : undefined, answer: q.answer || q.a, answers: q.answers, explanation: q.explanation });
    } else if (nextGameId === "information") {
      setQuestionData(getRandomUnique(informationQuestions, questionData));
    } else if (nextGameId === "symbol-search") {
      const symbols = ["★", "●", "▲", "■", "◆", "♥", "♣", "♠", "✦", "✧", "❂", "❆"];
      const target = symbols[Math.floor(Math.random() * symbols.length)];
      const wrongOptions = symbols
        .filter((s) => s !== target)
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);
      setQuestionData({
        target,
        options: [target, ...wrongOptions].sort(() => Math.random() - 0.5),
        answer: target,
      });
    } else if (nextGameId === "pattern") {
      const q = patternQuestions[Math.floor(Math.random() * patternQuestions.length)];
      setQuestionData({ text: q.text, grid: q.grid, options: [...q.options].sort(()=>Math.random()-0.5), answer: q.answer || q.a, explanation: q.explanation });
    } else if (nextGameId === "puzzle") {
      const q = puzzleQuestions[Math.floor(Math.random() * puzzleQuestions.length)];
      setQuestionData({ text: q.text, options: q.options ? [...q.options].sort(()=>Math.random()-0.5) : undefined, answer: q.answer || q.a, answers: q.answers, explanation: q.explanation });
    } else if (nextGameId === "coding") {
      const numSymbols = 4;
      const symbolsList = ["★", "●", "▲", "■", "◆", "♥", "♣", "♠"];
      const selectedSymbols = [...symbolsList]
        .sort(() => Math.random() - 0.5)
        .slice(0, numSymbols);
      const mapping = selectedSymbols
        .map((sym, i) => `${i + 1}=${sym}`)
        .join(", ");

      const qSeqLength = 3;
      const questionNums = Array.from(
        { length: qSeqLength },
        () => Math.floor(Math.random() * numSymbols) + 1,
      );
      const answerStr = questionNums
        .map((n) => selectedSymbols[n - 1])
        .join("");

      const wrong1 = Array.from(
        { length: qSeqLength },
        () => selectedSymbols[Math.floor(Math.random() * numSymbols)],
      ).join("");
      const wrong2 = Array.from(
        { length: qSeqLength },
        () => selectedSymbols[Math.floor(Math.random() * numSymbols)],
      ).join("");

      setQuestionData({
        text: `${mapping} のとき、[ ${questionNums.join(", ")} ] は？`,
        options: [
          ...new Set([
            answerStr,
            wrong1,
            wrong2,
            selectedSymbols.slice(0, 3).join(""),
          ]),
        ]
          .slice(0, 3)
          .sort(() => Math.random() - 0.5),
        answer: answerStr,
        explanation: "対応する記号を順番に並べたものが正解です。",
      });
    } else if (nextGameId === "cancellation") {
      const emojiList = [
        "🐶",
        "🐱",
        "🐭",
        "🐹",
        "🐰",
        "🦊",
        "🐻",
        "🐼",
        "🐨",
        "🐯",
      ];
      const target = emojiList[Math.floor(Math.random() * emojiList.length)];
      const wrongOptions = emojiList
        .filter((e) => e !== target)
        .sort(() => Math.random() - 0.5)
        .slice(0, 2);
      setQuestionData({
        text: `ターゲットと同じ絵を選んでください： ${target}`,
        options: [target, ...wrongOptions].sort(() => Math.random() - 0.5),
        answer: target,
        explanation: `ターゲットと同じ ${target} を選びます。`,
      });
    } else if (nextGameId === "letter-number-sequence") {
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
      // increase sequence size more aggressively if it's not a mix
      const charCount = gameId === "mix" ? 4 + Math.floor(Math.random() * 3) : 4 + currentQIndex + Math.floor(currentQIndex / 2);
      const half = Math.floor(charCount / 2);
      const letterCount = half || 1;
      const numberCount = charCount - letterCount;

      const selectedLetters = Array.from(
        { length: letterCount },
        () => letters[Math.floor(Math.random() * letters.length)],
      );
      const selectedNumbers = Array.from(
        { length: numberCount },
        () => Math.floor(Math.random() * 9) + 1,
      );

      const mixed = [...selectedLetters, ...selectedNumbers].sort(
        () => Math.random() - 0.5,
      );
      const sorted = [
        ...selectedNumbers.sort((a, b) => a - b),
        ...selectedLetters.sort(),
      ];
      const answerStr = sorted.join(", ");

      const wrong1 = [
        ...selectedLetters.sort(),
        ...selectedNumbers.sort((a, b) => a - b),
      ].join(", ");
      const wrong2 = [...mixed].sort(() => Math.random() - 0.5).join(", ");

      const optionsArray = Array.from(new Set([answerStr, wrong1, wrong2]));
      while (optionsArray.length < 3) {
        optionsArray.push(
          [...mixed].sort(() => Math.random() - 0.5).join(", "),
        );
      }

      setQuestionData({
        text: `「${mixed.join(", ")}」を数字（昇順）→アルファベット（昇順）の順に並べ替えると？`,
        options: [...new Set(optionsArray)]
          .slice(0, 3)
          .sort(() => Math.random() - 0.5),
        answer: answerStr,
        explanation:
          "先に数字を小さい順に並べ、次にアルファベットをABC順に並べます。",
      });
    } else if (nextGameId === "figure-weights") {
      const equations = [
        {
          text: "天秤が釣り合うように、?に入るものを選んでください",
          left: "🍎🍎",
          right: "🍌",
          target: "🍌🍌",
          a: "🍎🍎🍎🍎",
          wrong: ["🍎🍎🍎", "🍎🍎", "🍎", "🍌🍌"],
          explanation: "1つの🍌が2つの🍎なので、2つの🍌は4つの🍎になります。",
        },
        {
          text: "天秤が釣り合うように、?に入るものを選んでください",
          left: "■",
          right: "●●●",
          target: "■＋●",
          a: "●●●●",
          wrong: ["●●", "●●●●●", "■■"],
          explanation: "■は●3つ分なので、それに●を1つ足すと●4つになります。",
        },
        {
          text: "天秤が釣り合うように、?に入るものを選んでください",
          left: "★",
          right: "◆◆",
          target: "★＋★",
          a: "◆◆◆◆",
          wrong: ["◆◆", "◆◆◆", "★★"],
          explanation: "1つの★が2つの◆なので、2つの★は4つの◆になります。",
        },
        {
          text: "天秤が釣り合うように、?に入るものを選んでください",
          left: "▲",
          right: "■■",
          target: "▲▲＋■",
          a: "■■■■■",
          wrong: ["■■■", "■■■■", "▲▲"],
          explanation:
            "1つの▲が2つの■なので、2つの▲は4つの■。さらに■を1つ足して5つになります。",
        },
        {
          text: "天秤が釣り合うように、?に入るものを選んでください",
          left: "●●",
          right: "■",
          target: "■■",
          a: "●●●●",
          wrong: ["●●●", "●●", "■"],
          explanation: "1つの■が2つの●なので、2つの■は4つの●になります。",
        },
      ];
      const q = equations[Math.floor(Math.random() * equations.length)];
      setQuestionData({
        text: q.text,
        left: q.left,
        right: q.right,
        target: q.target,
        options: [q.a, ...q.wrong.slice(0, 2)].sort(() => Math.random() - 0.5),
        answer: q.answer || q.a,
        explanation: q.explanation,
      });
    } else if (nextGameId === "picture-completion") {
      setQuestionData(pictureCompletionQuestions[Math.floor(Math.random() * pictureCompletionQuestions.length)]);
    } else if (nextGameId === "logic") {
      const q = logicQuestions[Math.floor(Math.random() * logicQuestions.length)];
      setQuestionData({ text: q.text, options: q.options ? [...q.options].sort(()=>Math.random()-0.5) : undefined, keywords: q.keywords, answer: q.answer || q.a, explanation: q.explanation });
    } else if (nextGameId === "math-word-problems") {
      const q = mathQuestions[Math.floor(Math.random() * mathQuestions.length)];
      setQuestionData({ text: q.text, options: q.options ? [...q.options].sort(()=>Math.random()-0.5) : undefined, keywords: q.keywords, answer: q.answer || q.a, explanation: q.explanation });
    } else if (nextGameId === "visual-puzzle") {
      setQuestionData(visualPuzzleQuestions[Math.floor(Math.random() * visualPuzzleQuestions.length)]);
    } else if (nextGameId === "spatial-recognition") {
      const q = getRandomUnique(spatialQuestions, questionData);
      setQuestionData({ text: q.text, svg: q.svg, options: [...q.options], aIndex: q.aIndex !== undefined ? q.aIndex : q.options.indexOf(q.answer), explanation: q.explanation });
    } else {
      setQuestionData({
        text: `${nextGameId} のテスト問題です。準備ができたら完了ボタンを押してください。`,
      });
    }
  }, [currentQIndex, gameId, questionData, ALL_GAMES]);

  function startGame() {
    setGameState("playing");
    setScore(0);
    setCurrentQIndex(0);
    // Needs slight timeout to ensure state updates before running setup
    setTimeout(setupNextQuestion, 100);
  };

  function finishGame() {
    setGameState("finished");
        
    fetch('/api/rakuten?keyword=' + encodeURIComponent('脳トレ'))
      .then(res => res.json())
      .then(data => {
        if (!data.error) setRakutenItem(data);
      })
      .catch(console.error);

    addXp(score * 20);
    if (gameId !== "mix") {
      updateHighScore(gameId, score);
    }
    recordPlaySession();
    if (user) {
      saveScore(user.uid, score, localQuestionCount, 0).catch(console.error);
    }
    const gasUrl = "https://script.google.com/macros/s/AKfycbxJKfKT3_zlZTc_Rg9kRrUj7xqBE21tAbEf98dQyBfpN9QvLZ18p--b9q3TMnUD6wc84Q/exec";
    if (gasUrl) {
      fetch(gasUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
          userId: user?.uid || "guest",
          gameId,
          score,
          questionCount: localQuestionCount,
          xp: score * 20,
          level: useStore.getState().level,
          history
        })
      }).catch(console.error);
    }
  };

  function handleAnswer(answer: string) {
    if (isProcessingAnswer) return;
    setIsProcessingAnswer(true);

    let isCorrect = false;
    let correctAnswerStr = "";
    let questionText = "";
    let explanation = questionData?.explanation;

    if (currentGameId.startsWith("digit-span")) {
      let expected = [...sequence];
      if (currentGameId === "digit-span-backward") expected.reverse();
      if (currentGameId === "digit-span-sequence")
        expected.sort((a, b) => a - b);
      if (currentGameId === "digit-span-descending")
        expected.sort((a, b) => b - a);
      correctAnswerStr = expected.join("");
      if (answer === correctAnswerStr) isCorrect = true;
      questionText = `数字記憶 (${getGameTitle(currentGameId)}) - 覚える数字: ${sequence.join(" ")}`;
    } else if (currentGameId === "arithmetic" && questionData) {
      correctAnswerStr = questionData.answer;
      if (answer === correctAnswerStr) isCorrect = true;
      questionText = `${questionData.a} + ${questionData.b} = ?`;
    } else if (currentGameId === "symbol-search" && questionData) {
      correctAnswerStr = questionData.target;
      if (answer === correctAnswerStr) isCorrect = true;
      questionText = `ターゲット記号を見つけてください: ${questionData.target}`;
    } else if (currentGameId === 'visual-puzzle' && questionData) {
      isCorrect = answer === "true";
      correctAnswerStr = questionData.targetName || "正解の絵";
      questionText = questionData.targetName ? `「${questionData.targetName}」を完成させてください` : "絵を完成させてください";
    } else if (currentGameId === 'block-design' && questionData) {
      isCorrect = answer !== "incorrect";
      correctAnswerStr = questionData.target || "正解の絵";
      questionText = "見本と同じようにブロックを配置してください";
    } else if (questionData) {
      questionText = questionData.target
        ? `${questionData.text}\n${questionData.target}`
        : questionData.text;
      if (questionData.keywords) {
        // 記述式
        isCorrect = questionData.keywords.some((kw: string) =>
          answer.includes(kw),
        );
        correctAnswerStr = questionData.keywords.join(" または ");
      } else if (questionData.answers && Array.isArray(questionData.answers)) {
      isCorrect = questionData.answers.includes(answer);
      correctAnswerStr = questionData.answers[0];
    } else if (questionData.answer) {
        // 選択式
        correctAnswerStr = questionData.answer;
        if (answer === correctAnswerStr) isCorrect = true;
      } else {
        isCorrect = true;
        correctAnswerStr = "完了";
      }
    }

    if (isCorrect) {
      setScore((prev) => prev + 1);
      fireConfetti();
    }

    setHistory((prev) => [
      ...prev,
      {
        question: questionText,
        userAnswer: answer,
        correctAnswer: correctAnswerStr,
        isCorrect,
        explanation,
      },
    ]);
    const nextIndex = currentQIndex + 1;
    setCurrentQIndex(nextIndex);
    if (nextIndex >= localQuestionCount) {
      setTimeout(() => {
        finishGame();
        if (useStore.getState().level > prevLevel.current) {
          setLeveledUp(true);
          fireConfetti();
        }
      }, 1000);
    } else {
      setTimeout(setupNextQuestion, 1000);
    }
  };

  function fireConfetti() {
    import("canvas-confetti").then((confetti) => {
      confetti.default({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#00f3ff", "#ff00ff", "#ffffff"],
      });
    });
  };

  const getGameTitle = (id: string) => {
    const names: Record<string, string> = {
      "digit-span": "数字記憶",
      "digit-span-forward": "数字記憶(順唱)",
      "digit-span-backward": "数字記憶(逆唱)",
      "digit-span-sequence": "数字記憶(昇順)",
      "digit-span-descending": "数字記憶(降順)",
      arithmetic: "暗算",
      "symbol-search": "記号探し",
      mix: "ランダムミックス",
      "block-design": "積み木",
      vocabulary: "単語",
      similarities: "共通点",
      comprehension: "理解",
      "matrix-reasoning": "行列推理",
      information: "知識",
      pattern: "パターン",
      puzzle: "パズル",
      coding: "符号",
      cancellation: "絵の抹消",
      "letter-number-sequence": "語音整列",
      "figure-weights": "バランス",
      "picture-completion": "絵の完成",
      logic: "論理",
      "math-word-problems": "数学文章題",
      "visual-puzzle": "視覚パズル",
      "spatial-recognition": "空間認知",
    };
    return names[id] || id;
  };

  return (
    <div className="min-h-screen relative flex flex-col">
      <NeonBackground />

      <div className="relative z-10 flex justify-between p-6">
        <button onClick={onQuit} className="text-cyan-400 hover:text-cyan-300">
          やめる
        </button>
        <div className="text-xl neon-text-pink">SCORE: {score}</div>
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center p-4">
        <div className="glass-panel p-8 rounded-3xl w-full max-w-xl text-center neon-border-cyan shadow-[0_0_30px_rgba(0,243,255,0.1)]">
          {gameState === "ready" && (
            <div className="animate-in fade-in zoom-in duration-500">
              <h2 className="text-4xl font-black mb-4 neon-text-cyan">
                {getGameTitle(gameId)}
              </h2>
              <p className="text-gray-300 mb-8 text-lg">
                全 {questionCount} 問のトレーニングです。集中して挑みましょう。
              </p>
              <button
                onClick={startGame}
                className="px-10 py-5 rounded-full bg-cyan-500 text-black font-black text-2xl hover:bg-cyan-400 transition-all shadow-[0_0_30px_#0ff] hover:scale-105"
              >
                START
              </button>
            </div>
                      )}

          {gameState === "playing" && (
            <div className="animate-in fade-in duration-300">
              <div className="flex justify-between items-center mb-8">
                <span className="text-cyan-400 font-bold bg-cyan-500/20 px-4 py-2 rounded-xl">
                  {getGameTitle(currentGameId)}
                </span>
                <span className="text-slate-400">
                  問題 {currentQIndex + 1} / {localQuestionCount}
                </span>
              </div>

              {currentGameId.startsWith("digit-span") && (
                <div>
                  {displayIndex === -2 ? (
                    <div className="h-40 flex items-center justify-center">
                      <div className="text-2xl text-slate-400 animate-pulse">
                        数字を覚える準備をしてください...
                      </div>
                    </div>
                  ) : displayIndex >= 0 ? (
                    <div className="h-40 flex items-center justify-center">
                      <div
                        key={displayIndex}
                        className="text-8xl font-black neon-text-pink animate-in zoom-in fade-in duration-300"
                      >
                        {sequence[displayIndex]}
                      </div>
                    </div>
                  ) : displayIndex === -1 && sequence.length > 0 ? (
                    <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-4">
                      <div className="text-xl text-slate-300">
                        {currentGameId === "digit-span-backward"
                          ? "逆の順番で入力してください"
                          : currentGameId === "digit-span-sequence"
                            ? "小さい順に入力してください"
                            : currentGameId === "digit-span-descending"
                              ? "大きい順に入力してください"
                              : "順番通りに入力してください"}
                      </div>
                      <input
                        type="number"
                        autoFocus
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && handleAnswer(userInput)
                        }
                        className="bg-black/50 border-2 border-cyan-500 rounded-2xl p-6 text-4xl text-center outline-none text-white focus:shadow-[0_0_20px_#0ff] tracking-widest"
                      />
                      <button
                        onClick={() => handleAnswer(userInput)}
                        className="px-6 py-4 rounded-xl bg-pink-500 text-white font-bold hover:bg-pink-400 shadow-[0_0_15px_#f0f] transition-all"
                      >
                        回答する
                      </button>
                    </div>
                  ) : (
                    <div className="h-40 flex items-center justify-center text-slate-400">
                      準備中...
                    </div>
                      )}
                </div>
                      )}

              {currentGameId === "arithmetic" && questionData && (
                <div className="flex flex-col gap-8 animate-in zoom-in">
                  <div className="text-6xl font-black neon-text-cyan tracking-widest">
                    {questionData.a} {questionData.opStr} {questionData.b} = ?
                  </div>
                  <div className="flex gap-4 justify-center">
                    <input
                      type="number"
                      autoFocus
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleAnswer(userInput)
                      }
                      className="bg-black/50 border-2 border-pink-500 rounded-2xl p-6 text-4xl text-center outline-none text-white focus:shadow-[0_0_20px_#f0f] w-48"
                    />
                    <button
                      onClick={() => handleAnswer(userInput)}
                      className="px-8 py-4 rounded-xl bg-pink-500 text-white font-bold hover:bg-pink-400 shadow-[0_0_15px_#f0f] transition-all text-xl"
                    >
                      決定
                    </button>
                  </div>
                </div>
                      )}

              {currentGameId === "symbol-search" && questionData && (
                <div className="flex flex-col gap-8 animate-in fade-in">
                  <div className="text-xl">
                    ターゲット記号を見つけてください:{" "}
                    <span className="text-4xl text-pink-400 ml-2">
                      {questionData.target}
                    </span>
                  </div>
                  <div className="flex flex-wrap justify-center gap-4">
                    {questionData.options?.map((opt: string, i: number) => (
                      <button
                        key={i}
                        onClick={() => handleAnswer(opt)}
                        className="w-20 h-20 text-4xl bg-white/5 hover:bg-cyan-500/30 border border-cyan-500/50 rounded-2xl flex items-center justify-center transition-all shadow-[0_0_10px_rgba(0,243,255,0.2)]"
                      >
                        {opt.includes('<svg') ? <div dangerouslySetInnerHTML={{ __html: opt }} className="w-16 h-16 mx-auto text-cyan-400 pointer-events-none" /> : opt}
                          </button>
                    ))}
                  </div>
                </div>
                      )}

              {!currentGameId.startsWith("digit-span") &&
                currentGameId !== "arithmetic" &&
                currentGameId !== "symbol-search" &&
                questionData && (
                  <div className="flex flex-col gap-8 animate-in fade-in items-center w-full">
                    <div className="text-xl md:text-2xl text-white font-bold whitespace-pre-wrap break-words text-center w-full max-w-lg px-4">
                      {questionData.text}
                    </div>
                    {currentGameId === "pattern" && questionData.grid && (
                      <div className="grid grid-cols-3 gap-2 bg-white/10 p-4 rounded-xl w-64 h-64 border border-cyan-500/30 shadow-[0_0_20px_rgba(0,243,255,0.1)]">
                        {questionData.grid.map((cell, idx) => (
                          <div
                            key={idx}
                            className={`flex items-center justify-center text-4xl font-bold rounded-lg ${
                              cell === "?" || cell === "？" ? "text-pink-400 bg-black/40 animate-pulse" : "text-cyan-400 bg-black/40"
                            }`}
                          >
                            {cell}
                          </div>
                        ))}
                      </div>
                      )}
                    {currentGameId === "figure-weights" &&
                      questionData.left && (
                        <div className="flex flex-col items-center gap-6 my-4 w-full">
                          <div className="flex items-center justify-center gap-6 bg-white/5 p-6 rounded-2xl w-full max-w-md border border-white/10 shadow-[inset_0_0_15px_rgba(0,0,0,0.5)]">
                            <div className="text-4xl">{questionData.left}</div>
                            <div className="text-5xl drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                              ⚖️
                            </div>
                            <div className="text-4xl">{questionData.right}</div>
                          </div>
                          <div className="text-4xl font-bold bg-black/40 px-8 py-4 rounded-xl border border-cyan-500/30">
                            {questionData.target} ={" "}
                            <span className="text-pink-400 animate-pulse">
                              ❓
                            </span>
                          </div>
                        </div>
                      )}
                    {questionData.svg && (
                      <div
                        className="w-48 h-48 text-cyan-400 my-4"
                        dangerouslySetInnerHTML={{ __html: questionData.svg }}
                      />
                    )}
                    
                    {currentGameId === "block-design" &&
                      questionData.target && (
                        <div className="text-4xl text-cyan-400 whitespace-pre font-mono leading-none tracking-widest my-4 border-2 border-cyan-500/50 p-6 rounded-2xl bg-black/30 shadow-[0_0_20px_rgba(0,243,255,0.2)]">
                          {questionData.target}
                        </div>
                      )}
                    
                    {currentGameId === 'block-design' && questionData.target && (
                    <BlockDesign
                      key={`block-design-${currentQIndex}`}
                      target={questionData.target}
                      onComplete={(isCorrect) => handleAnswer(isCorrect ? questionData.target : "incorrect")}
                    />
                  )}
                  {currentGameId === 'block-design' ? null : currentGameId === 'visual-puzzle' ? (
                    <div className="w-full flex flex-col items-center gap-4">
                      <div className="text-xl md:text-2xl text-cyan-400 font-bold mb-4">
                        {questionData.targetName ? `「${questionData.targetName}」を完成させてください` : questionData.text}
                      </div>
                      <VisualPuzzle 
                        key={`visual-puzzle-${currentQIndex}`}
                        pieces={questionData.pieces}
                        correctOrder={questionData.correctOrder}
                        cols={questionData.cols}
                        onComplete={(isCorrect) => handleAnswer(isCorrect ? "true" : "false")}
                      />
                    </div>
                    ) : questionData.options && currentGameId !== 'block-design' ? (
                        <div className="flex flex-wrap justify-center gap-4 mt-8">
                          {questionData.options.map((opt: string, i: number) => (
                            <button
                              key={i}
                              onClick={() => handleAnswer(opt)}
                              className="px-8 py-4 text-xl bg-white/5 hover:bg-cyan-500/30 border border-cyan-500/50 rounded-2xl transition-all shadow-[0_0_15px_rgba(0,243,255,0.1)]"
                            >
                              {opt.includes('<svg') ? (
                                <div dangerouslySetInnerHTML={{ __html: opt }} className="w-24 h-24 flex items-center justify-center pointer-events-none text-cyan-400" />
                              ) : (
                                opt
                              )}
                            </button>
                          ))}
                        </div>
                      ) : currentGameId !== 'block-design' ? (
                                                <div className={`flex flex-col gap-4 mt-8 w-full max-w-md ${currentGameId === 'block-design' ? 'hidden' : ''}`}>
                          <input
                            type="text"
                            autoFocus
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && (handleAnswer(userInput), setUserInput(""))}
                            className="bg-black/50 border-2 border-cyan-500 rounded-2xl p-4 text-2xl text-center outline-none text-white focus:shadow-[0_0_20px_#0ff]"
                            placeholder="回答を入力..."
                          />
                          <button
                            onClick={() => { handleAnswer(userInput); setUserInput(""); }}
                            className="px-8 py-4 rounded-xl bg-pink-500 text-white font-bold hover:bg-pink-400 shadow-[0_0_15px_#f0f] transition-all text-xl"
                          >
                            決定
                          </button>
                        </div>
                      ) : null}
                  </div>
                      )}


              </div>
                      )}
          {gameState === "finished" && (
            <div className="animate-in slide-in-from-bottom-10 duration-500 w-full flex flex-col items-center">
              <div ref={resultRef} className="w-full bg-slate-900/80 p-8 rounded-3xl border border-cyan-500/30 mb-8 flex flex-col items-center">
                <h2 className="text-4xl font-bold mb-6 neon-text-cyan">
                  トレーニング終了！
                </h2>
                {leveledUp && (
                  <div className={`my-4 ${isSaving ? '' : 'animate-bounce'} rounded-2xl shadow-[0_0_20px_#f0f]`}>
                    <div className="bg-pink-500/20 p-4 rounded-2xl border border-pink-500 overflow-hidden">
                      <div className="text-3xl font-black text-white drop-shadow-[0_0_10px_#f0f]">
                        🎉 LEVEL UP! (Lv.{level}) 🎉
                      </div>
                    </div>
                  </div>
                )}
                <div className="text-7xl font-black neon-text-pink mb-10">
                  {score} <span className="text-3xl text-slate-400">/ {questionCount}</span>
                </div>
                
                {history.length > 0 && (
                  <div className={`w-full max-w-2xl text-left bg-black/40 p-6 rounded-2xl border border-white/10 mb-8 ${isSaving ? '' : 'max-h-[40vh] overflow-y-auto'} custom-scrollbar`}>
                    <h3 className="text-2xl font-bold mb-6 text-cyan-400 text-center sticky top-0 bg-black/80 py-2 backdrop-blur-sm">結果の詳細</h3>
                    {history.map((h, i) => (
                      <div key={i} className="mb-6 pb-6 border-b border-white/5 last:border-0 last:mb-0 last:pb-0">
                        <div className="font-bold text-lg mb-3">Q{i + 1}. {h.question}</div>
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                            <span className="text-slate-400">あなたの回答:</span>
                            <span className="font-bold flex items-center">
                              {h.userAnswer || "未回答"} 
                              <span className="ml-2">{h.isCorrect ? "⭕️" : "❌"}</span>
                            </span>
                          </div>
                          {!h.isCorrect && (
                            <div className="flex justify-between items-center bg-pink-500/10 p-3 rounded-lg border border-pink-500/20">
                              <span className="text-pink-400">正解例:</span>
                              <span className="text-cyan-400 font-bold">{h.correctAnswer}</span>
                            </div>
                      )}
                        </div>
                        {h.svg && (
                          <div className="w-full flex justify-center my-4 bg-white/5 p-4 rounded-xl border border-white/10">
                            <div className="w-32 h-32 text-cyan-400" dangerouslySetInnerHTML={{ __html: h.svg }} />
                          </div>
                      )}
                        {h.explanation && (
                          <div className="text-sm text-slate-300 bg-white/5 p-4 rounded-xl mt-3 border border-white/10 leading-relaxed">
                            <span className="mr-2">💡</span>
                            {h.explanation}
                          </div>
                      )}
                      </div>
                    ))}
                  </div>
                      )}
              </div>
                                <div className="flex flex-wrap justify-center gap-4 mt-8 w-full">
                  <button onClick={copyResults} className="flex items-center gap-2 px-6 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 transition-colors text-white font-bold">
                    📋 結果詳細をコピー
                  </button>
                  <button
                    onClick={handleSaveImage}
                    className="flex items-center gap-2 px-6 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 transition-colors text-white font-bold"
                  >
                    <Download className="w-5 h-5" />
                    画像を保存
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-6 py-4 rounded-xl bg-[#1DA1F2]/20 hover:bg-[#1DA1F2]/40 border border-[#1DA1F2] transition-colors text-white font-bold"
                  >
                    <Share2 className="w-5 h-5 text-[#1DA1F2]" />
                    結果を共有
                  </button>
                </div>

                {rakutenItem && (
                  <div className="mt-12 w-full max-w-md bg-white/5 border border-pink-500/20 rounded-xl p-4 hover:bg-white/10 transition-colors mx-auto shadow-[0_0_15px_rgba(255,0,255,0.1)]">
                    <p className="text-xs text-pink-400 mb-3 font-bold text-center">🏆 おすすめの脳トレグッズ</p>
                    <a href={rakutenItem.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4">
                      {rakutenItem.image && <img src={rakutenItem.image} alt="product" className="w-20 h-20 object-cover rounded-lg border border-white/10" />}
                      <div className="flex-1 overflow-hidden">
                        <p className="text-sm text-white font-medium truncate">{rakutenItem.name}</p>
                        <p className="text-cyan-400 font-bold mt-2">¥{rakutenItem.price.toLocaleString()}</p>
                      </div>
                    </a>
                  </div>
                      )}
              <FeedbackForm />
              <button
                onClick={onComplete}
                className="px-10 py-5 rounded-full bg-[rgba(0,255,255,0.1)] hover:bg-[rgba(0,255,255,0.2)] border-2 border-cyan-400 transition-all text-xl font-bold text-white shadow-[0_0_20px_rgba(0,243,255,0.3)] mt-4"
              >
                ホームへ戻る
              </button>
            </div>
          )}
        </div>
      </div>
      
      {showSaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-cyan-500/30 rounded-2xl p-6 max-w-sm w-full shadow-[0_0_30px_rgba(0,243,255,0.2)] animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mb-4 text-cyan-400">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                画像を保存しました！
              </h3>
              <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                端末の「写真」や「ギャラリー」アプリで<br/>結果を確認できます。
              </p>
              <button 
                onClick={() => setShowSaveModal(false)}
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-colors border border-slate-700"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
