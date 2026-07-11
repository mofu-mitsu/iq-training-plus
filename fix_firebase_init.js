const fs = require('fs');
let code = fs.readFileSync('lib/firebase.ts', 'utf8');

code = code.replace(
  /const app = !getApps\(\)\.length \? initializeApp\(firebaseConfig\) : getApp\(\);/,
  `const app = !getApps().length && firebaseConfig.apiKey ? initializeApp(firebaseConfig) : getApps()[0];`
);

fs.writeFileSync('lib/firebase.ts', code);
