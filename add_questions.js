const fs = require('fs');

// Append to questions.ts
let qCode = fs.readFileSync('lib/questions.ts', 'utf8');

// We can just append new questions to the arrays by doing push at the end of the file
const extraQuestions = `
// --- EXTRA QUESTIONS ADDED ---

vocabularyQuestions.push(
  { text: '「忖度」の意味はどれ？', options: ['他人の気持ちを推し量ること', 'お金を払うこと', '隠すこと'], answer: '他人の気持ちを推し量ること', explanation: '他人の心や考えを推し量る（察する）ことを意味します。' },
  { text: '「杞憂」の意味はどれ？', options: ['喜びすぎる', '必要のない心配をすること', '天気を予想すること'], answer: '必要のない心配をすること', explanation: '中国の昔話で「空が落ちてこないか」と心配した人に由来し、無用の心配を意味します。' },
  { text: '「青天の霹靂」の意味はどれ？', options: ['突然の思いがけない出来事', '晴れた日の雷', '怒ること'], answer: '突然の思いがけない出来事', explanation: '青空に突然雷が鳴ることから、予想だにしない突然の出来事を指します。' },
  { text: '「パラダイムシフト」の意味はどれ？', options: ['車のギアを変えること', '価値観や枠組みが劇的に変化すること', '時間を移動すること'], answer: '価値観や枠組みが劇的に変化すること', explanation: 'その時代や分野における当然と考えられていた認識や思想、社会全体の価値観などが劇的に変化することを指します。' },
  { text: '「アイロニー」の意味はどれ？', options: ['皮肉、当てこすり', '鉄でできたもの', '愛情'], answer: '皮肉、当てこすり', explanation: '表面的な言葉の裏に、反対の意味や風刺を込める表現のこと。' }
);

similaritiesQuestions.push(
  { text: '「ピアノ」と「バイオリン」の共通点は？', options: ['弦がある楽器', '管楽器', '叩く楽器'], answer: '弦がある楽器', explanation: 'ピアノも内部に弦が張られており、共に弦を振動させて音を出す楽器（弦楽器・打弦楽器）です。' },
  { text: '「太陽」と「電球」の共通点は？', options: ['熱を持つ', '自ら光を発する', '丸い'], answer: '自ら光を発する', explanation: 'どちらも自ら光を放つ光源（発光体）であるという共通点があります。' },
  { text: '「本」と「映画」の共通点は？', options: ['紙でできている', '物語や情報を伝えるメディア', '映画館で見る'], answer: '物語や情報を伝えるメディア', explanation: 'どちらも人々に物語を伝えたり、情報を記録・伝達するメディア（媒体）です。' },
  { text: '「海」と「空」の共通点は？', options: ['水でできている', '青く見える', '魚がいる'], answer: '青く見える', explanation: 'どちらも光の散乱などの現象によって、青く見えるという共通の視覚的特徴があります。' },
  { text: '「時計」と「カレンダー」の共通点は？', options: ['時を計る・示す道具', '壁に掛ける', '電池で動く'], answer: '時を計る・示す道具', explanation: 'どちらも時間や日にちという「時」の概念を人間に示すための道具です。' }
);

comprehensionQuestions.push(
  { text: 'なぜ法律が必要なのですか？', options: ['社会の秩序を保ち、人々の権利を守るため', '警察官の仕事を増やすため', '悪い人を捕まえるためだけ'], answer: '社会の秩序を保ち、人々の権利を守るため', explanation: '法律は、社会全体が安全で公平に機能し、一人一人の権利を保護するためのルールです。' },
  { text: 'なぜ税金を払うのですか？', options: ['お金を捨てるため', '公共のサービス（道路、学校、警察など）を維持するため', 'お金持ちを困らせるため'], answer: '公共のサービス（道路、学校、警察など）を維持するため', explanation: '税金は、みんなが使う公共施設やサービスを賄うための社会の会費のようなものです。' },
  { text: 'なぜ選挙に行く必要があるのですか？', options: ['自分たちの代表を選び、政治に参加するため', '休みの日の暇つぶし', '行く義務があるから'], answer: '自分たちの代表を選び、政治に参加するため', explanation: '民主主義社会において、自分たちの意見を政治に反映させるための最も基本的な権利行使だからです。' },
  { text: 'なぜ約束を守ることが重要なのですか？', options: ['他者からの信頼関係を築き、維持するため', '怒られないため', '法律で決まっているから'], answer: '他者からの信頼関係を築き、維持するため', explanation: '社会は人と人の信頼関係で成り立っており、約束を守ることはその基礎となるからです。' }
);

informationQuestions.push(
  { text: '日本の現在の首都はどこですか？', options: ['京都', '大阪', '東京', '名古屋'], answer: '東京', explanation: '現在の日本の事実上の首都は東京都です。' },
  { text: '地球から最も近い恒星（太陽を除く）は何ですか？', options: ['シリウス', 'プロキシマ・ケンタウリ', 'ベテルギウス'], answer: 'プロキシマ・ケンタウリ', explanation: '太陽系から約4.24光年離れたところにあるプロキシマ・ケンタウリが最も近い恒星です。' },
  { text: '世界で最も面積の広い国はどこですか？', options: ['アメリカ', 'カナダ', '中国', 'ロシア'], answer: 'ロシア', explanation: 'ロシアの面積は約1709万平方キロメートルで、世界最大です。' },
  { text: '「相対性理論」を発表した物理学者は誰ですか？', options: ['ニュートン', 'アインシュタイン', 'エジソン'], answer: 'アインシュタイン', explanation: 'アルベルト・アインシュタインが1905年に特殊相対性理論、1915年に一般相対性理論を発表しました。' },
  { text: '人間の体内で最も大きな臓器（器官）は何ですか？', options: ['脳', '肝臓', '皮膚'], answer: '皮膚', explanation: '体の表面を覆う皮膚は、広げるとたたみ約1枚分（約1.6平方メートル）あり、最も大きな器官とされています。（内部臓器では肝臓が最大です）' }
);
`;

fs.appendFileSync('lib/questions.ts', extraQuestions);


// Spatial Questions Updates
let sCode = fs.readFileSync('lib/spatialQuestions.ts', 'utf8');

const extraSpatial = `
// --- MORE SPATIAL QUESTIONS ---

spatialQuestions.push(
  { 
    text: 'この展開図を組み立ててできる立体はどれですか？', 
    svg: \`<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2">
      <polygon points="50,20 30,55 70,55" />
      <polygon points="30,55 10,90 50,90" />
      <polygon points="50,90 70,55 90,90" />
      <polygon points="30,55 70,55 50,90" />
    </svg>\`,
    options: ['正四面体（三角錐）', '立方体', '八面体'], 
    aIndex: 0, 
    explanation: '4つの正三角形からなる展開図は、正四面体（三角錐）になります。' 
  },
  { 
    text: 'この展開図を組み立てたとき、一番上の面が「A」だった場合、一番下の面（底面）はどれになりますか？', 
    svg: \`<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="40" y="20" width="20" height="20" />
      <text x="50" y="35" fill="currentColor" stroke="none" text-anchor="middle" font-size="12">A</text>
      
      <rect x="20" y="40" width="20" height="20" />
      <text x="30" y="55" fill="currentColor" stroke="none" text-anchor="middle" font-size="12">B</text>
      
      <rect x="40" y="40" width="20" height="20" />
      <text x="50" y="55" fill="currentColor" stroke="none" text-anchor="middle" font-size="12">C</text>
      
      <rect x="60" y="40" width="20" height="20" />
      <text x="70" y="55" fill="currentColor" stroke="none" text-anchor="middle" font-size="12">D</text>
      
      <rect x="40" y="60" width="20" height="20" />
      <text x="50" y="75" fill="currentColor" stroke="none" text-anchor="middle" font-size="12">E</text>
      
      <rect x="40" y="80" width="20" height="20" />
      <text x="50" y="95" fill="currentColor" stroke="none" text-anchor="middle" font-size="12">F</text>
    </svg>\`,
    options: ['C', 'E', 'F'], 
    aIndex: 1, 
    explanation: '十字型の展開図で、上の面（A）の反対側（底面）になるのは、1つ飛ばした面（E）です。' 
  },
  { 
    text: 'サイコロを前に1回、右に1回倒しました。一番上の目はどう変化しますか？', 
    svg: null,
    options: ['元の目と同じ', 'わからない', '右に倒した面の目になる'], 
    aIndex: 2, 
    explanation: '前に倒すと背面の目が上になり、右に倒すと左面の目が上になります。' 
  },
  { 
    text: '右の図形を真上から見たときの形はどれですか？', 
    svg: \`<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2">
      <!-- 円錐の斜視図 -->
      <ellipse cx="50" cy="80" rx="30" ry="10" />
      <path d="M 20 80 L 50 20 L 80 80" />
    </svg>\`,
    options: ['三角形', '円', '四角形'], 
    aIndex: 1, 
    explanation: '円錐を真上から見ると、底面の円とその中心（頂点）が見えるため、円形に見えます。' 
  },
  { 
    text: '右の図形を真正面から見たときの形はどれですか？', 
    svg: \`<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2">
      <!-- 円柱の斜視図 -->
      <ellipse cx="50" cy="20" rx="20" ry="8" />
      <path d="M 30 20 L 30 80 A 20 8 0 0 0 70 80 L 70 20" />
    </svg>\`,
    options: ['円', '長方形', '楕円'], 
    aIndex: 1, 
    explanation: '円柱を真正面（真横）から見ると、上下の円は見えず、長方形に見えます。' 
  }
);

visualPuzzleQuestions.push(
  {
    text: '絵を完成させてください（星形）',
    pieces: [
      \`<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 25 50 L 35 20 L 0 20 Z" /></svg>\`,
      \`<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 50 20 L 15 20 L 25 50 Z" /></svg>\`,
      \`<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 0 0 L 25 20 L 50 0 Z" /></svg>\`,
      \`<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 25 0 L 25 20" /></svg>\`
    ],
    correctOrder: [
      \`<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 25 0 L 25 20" /></svg>\`,
      \`<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 0 0 L 25 20 L 50 0 Z" /></svg>\`,
      \`<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 25 50 L 35 20 L 0 20 Z" /></svg>\`,
      \`<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 50 20 L 15 20 L 25 50 Z" /></svg>\`
    ],
    explanation: 'それぞれを組み合わせると五芒星が完成します。（※簡易的なパーツの組み合わせです）'
  },
  {
    text: '絵を完成させてください（家）',
    pieces: [
      \`<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 0 50 L 50 50 L 50 0 Z" /></svg>\`,
      \`<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 0 0 L 50 50 L 0 50 Z" /></svg>\`,
      \`<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><rect x="10" y="0" width="30" height="50" /></svg>\`,
      \`<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><circle cx="25" cy="25" r="10" /></svg>\`
    ],
    correctOrder: [
      \`<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 0 50 L 50 50 L 50 0 Z" /></svg>\`,
      \`<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 0 0 L 50 50 L 0 50 Z" /></svg>\`,
      \`<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><rect x="10" y="0" width="30" height="50" /></svg>\`,
      \`<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><circle cx="25" cy="25" r="10" /></svg>\`
    ],
    explanation: '三角屋根と四角い壁、窓を組み合わせた家の絵になります。'
  }
);
`;

fs.appendFileSync('lib/spatialQuestions.ts', extraSpatial);
