const fs = require('fs');
let code = fs.readFileSync('components/TrainingModule.tsx', 'utf8');

// 1. Add state for Rakuten Item
code = code.replace(
  /const \[leveledUp, setLeveledUp\] = useState\(false\);/,
  \`const [leveledUp, setLeveledUp] = useState(false);
  const [rakutenItem, setRakutenItem] = useState<{name: string, url: string, image: string, price: number} | null>(null);\`
);

// 2. Fetch Rakuten Item on finish
code = code.replace(
  /setGameState\("finished"\);/,
  \`setGameState("finished");
        fetch('/api/rakuten?keyword=' + encodeURIComponent('脳トレ')).then(res => res.json()).then(data => {
          if (!data.error) setRakutenItem(data);
        }).catch(console.error);\`
);

// 3. Render Rakuten Item at the bottom of the result screen
const renderReplacement = \`
                  </div>
                </div>

                {rakutenItem && (
                  <div className="mt-8 w-full max-w-md bg-white/5 border border-cyan-500/20 rounded-xl p-4 hover:bg-white/10 transition-colors">
                    <p className="text-xs text-slate-400 mb-2 font-bold text-center">おすすめの脳トレグッズ</p>
                    <a href={rakutenItem.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4">
                      {rakutenItem.image && <img src={rakutenItem.image} alt="product" className="w-16 h-16 object-cover rounded-lg" />}
                      <div className="flex-1 overflow-hidden">
                        <p className="text-sm text-cyan-100 font-medium truncate">{rakutenItem.name}</p>
                        <p className="text-pink-400 font-bold mt-1">¥{rakutenItem.price.toLocaleString()}</p>
                      </div>
                    </a>
                  </div>
                )}

                <div className="mt-10 flex gap-4">\`;

code = code.replace(
  /                  <\/div>\n                <\/div>\n\n                <div className="mt-10 flex gap-4">/g,
  renderReplacement
);

fs.writeFileSync('components/TrainingModule.tsx', code);
