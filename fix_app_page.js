const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

// Add 20 and 30 questions
code = code.replace(
  /<option value=\{5\}>5問<\/option>\s*<option value=\{10\}>10問<\/option>/g,
  '<option value={5}>5問</option>\\n<option value={10}>10問</option>\\n<option value={20}>20問</option>\\n<option value={30}>30問</option>'
);

// We need to add sound toggle icon next to question count
// Also ensure 2 columns for games on mobile
code = code.replace(
  /className="flex items-center gap-2"/,
  'className="flex items-center gap-4"'
);

// Find the select and add volume toggle
code = code.replace(
  /<\/select>\s*<\/div>\s*<\/div>/,
  \`</select>
            </div>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-cyan-400"
              title={soundEnabled ? "音声をオフにする" : "音声をオンにする"}
            >
              {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
            </button>
          </div>
        </div>\`
);

// Mobile 2 columns
code = code.replace(
  /grid grid-cols-2 md:grid-cols-4 gap-4/,
  'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'
);

// Add footer link
code = code.replace(
  /<\/div>\s*<\/div>\s*\)\s*\}/,
  \`    <div className="mt-12 text-center">
        <a href="https://mofu-mitsu.github.io/index.html" className="text-cyan-500/50 hover:text-cyan-400 transition-colors text-sm">
          ホームへ戻る
        </a>
      </div>
    </div>
  </div>
  )
}\`
);

fs.writeFileSync('app/page.tsx', code);
