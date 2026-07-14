import fs from 'fs';
const file = 'components/TrainingModule.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace('  const startGame = () => {', '  function startGame() {');
content = content.replace('  const finishGame = () => {', '  function finishGame() {');
content = content.replace('  const fireConfetti = () => {', '  function fireConfetti() {');
content = content.replace('  const handleAnswer = (answer: string) => {', '  function handleAnswer(answer: string) {');
content = content.replace('import React, { useState, useEffect } from "react";', 'import React, { useState, useEffect, useCallback } from "react";');

fs.writeFileSync(file, content);
