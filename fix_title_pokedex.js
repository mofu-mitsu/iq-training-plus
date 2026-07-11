const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');
code = code.replace(
  /const \[activeScreen, setActiveScreen\] = useState<'home' \| 'training' \| 'results'>\('home'\);/,
  `const [activeScreen, setActiveScreen] = useState<'home' | 'training' | 'results' | 'pokedex'>('home');`
);
if (!code.includes('import Pokedex')) {
  code = code.replace(
    /export default function Home/,
    `import Pokedex from '../components/Pokedex';\n\nexport default function Home`
  );
}

const buttons = `<div className="flex gap-4 mt-8">
          <button 
            onClick={() => setActiveScreen('pokedex')}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 transition-colors text-white font-bold"
          >
            <span className="text-xl">🏆</span> 称号図鑑
          </button>
        </div>`;

if (!code.includes('称号図鑑')) {
  code = code.replace(
    /<\/div>\s*<\/div>\s*<\/main>/,
    `  ${buttons}\n      </div>\n    </div>\n    </main>`
  );
}

code = code.replace(
  /if \(activeScreen === 'training' && selectedGame\) \{/,
  `if (activeScreen === 'pokedex') {\n    return <Pokedex onBack={() => setActiveScreen('home')} />;\n  }\n\n  if (activeScreen === 'training' && selectedGame) {`
);

fs.writeFileSync('app/page.tsx', code);
