const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

// Imports
code = code.replace(
  /import { audio } from '..\/lib\/audio';/,
  `import { audio } from '../lib/audio';\nimport { auth, loginWithGoogle, logout } from '../lib/firebase';\nimport { onAuthStateChanged, User } from 'firebase/auth';`
);

// State
code = code.replace(
  /const \[showStamp, setShowStamp\] = useState\(false\);/,
  `const [showStamp, setShowStamp] = useState(false);\n  const [user, setUser] = useState<User | null>(null);\n\n  useEffect(() => {\n    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {\n      setUser(currentUser);\n    });\n    return () => unsubscribe();\n  }, []);`
);

// TrainingModule prop
code = code.replace(
  /<TrainingModule gameId={selectedGame} questionCount={questionCount} onComplete={handleGameComplete} onQuit={\(\) => setActiveScreen\('home'\)} soundEnabled={soundEnabled} \/>/,
  `<TrainingModule gameId={selectedGame} questionCount={questionCount} onComplete={handleGameComplete} onQuit={() => setActiveScreen('home')} soundEnabled={soundEnabled} user={user} />`
);

// Header Buttons
code = code.replace(
  /        \{\/\* Header \*\/}\n        <div className="absolute top-4 right-4 z-50">/,
  `        {/* Header */}\n        <div className="absolute top-4 right-4 z-50 flex items-center gap-4">\n          {user ? (\n            <div className="flex items-center gap-2">\n              <img src={user.photoURL || ''} alt="avatar" className="w-8 h-8 rounded-full border border-cyan-400" />\n              <button onClick={logout} className="text-xs text-white bg-red-500/80 px-2 py-1 rounded hover:bg-red-500 transition-colors">ログアウト</button>\n            </div>\n          ) : (\n            <button onClick={loginWithGoogle} className="text-sm font-bold text-white bg-blue-500/80 px-4 py-2 rounded-xl hover:bg-blue-500 transition-colors border border-blue-400">ログイン (成績保存)</button>\n          )}`
);

fs.writeFileSync('app/page.tsx', code);
