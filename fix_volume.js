const fs = require('fs');
let code = fs.readFileSync('lib/audio.ts', 'utf8');
code = code.replace(/gainNode\.gain\.linearRampToValueAtTime\(0\.15, /g, 'gainNode.gain.linearRampToValueAtTime(0.4, ');
fs.writeFileSync('lib/audio.ts', code);
