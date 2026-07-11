// 空間認知問題用データ
export const spatialQuestions = [
  { 
    text: 'この図形を時計回りに90度回転させたものはどれですか？', 
    svg: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4"><path d="M20,80 L50,20 L80,80 L50,60 Z" /></svg>`,
    options: [
      `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4" transform="rotate(90 50 50)"><path d="M20,80 L50,20 L80,80 L50,60 Z" /></svg>`, // 90度
      `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4" transform="rotate(180 50 50)"><path d="M20,80 L50,20 L80,80 L50,60 Z" /></svg>`, // 180度
      `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4" transform="rotate(270 50 50)"><path d="M20,80 L50,20 L80,80 L50,60 Z" /></svg>`, // 270度
    ],
    aIndex: 0,
    explanation: '時計回りに90度回転させると、矢印の先が右を向きます。'
  },
  { 
    text: 'この展開図を組み立ててできる立体はどれですか？', 
    svg: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="40" y="20" width="20" height="20" />
      <rect x="20" y="40" width="20" height="20" />
      <rect x="40" y="40" width="20" height="20" />
      <rect x="60" y="40" width="20" height="20" />
      <rect x="40" y="60" width="20" height="20" />
      <rect x="40" y="80" width="20" height="20" />
    </svg>`,
    options: [
      '立方体', '三角柱', '円柱', 'ピラミッド'
    ],
    aIndex: 0,
    explanation: 'これは正六面体（立方体）の展開図です。'
  }
];

// 視覚パズル（4分割）のデータ
export const visualPuzzleQuestions = [
  {
    text: '絵を完成させてください',
    // スマイルの顔を4分割
    pieces: [
      `<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 50,50 A 40,40 0 0,0 10,50 Z" /><circle cx="35" cy="40" r="5" fill="currentColor"/></svg>`, // top-left (arc)
      `<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 0,50 A 40,40 0 0,1 40,50 Z" /><circle cx="15" cy="40" r="5" fill="currentColor"/></svg>`, // top-right
      `<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 50,0 A 40,40 0 0,1 10,0 Z" /><path d="M 30 10 Q 50 30 50 10" /></svg>`, // bottom-left (smile part)
      `<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 0,0 A 40,40 0 0,0 40,0 Z" /><path d="M 0 10 Q 0 30 20 10" /></svg>`  // bottom-right
    ],
    correctOrder: [
      `<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 50,50 A 40,40 0 0,0 10,50 Z" /><circle cx="35" cy="40" r="5" fill="currentColor"/></svg>`,
      `<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 0,50 A 40,40 0 0,1 40,50 Z" /><circle cx="15" cy="40" r="5" fill="currentColor"/></svg>`,
      `<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 50,0 A 40,40 0 0,1 10,0 Z" /><path d="M 30 10 Q 50 30 50 10" /></svg>`,
      `<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 0,0 A 40,40 0 0,0 40,0 Z" /><path d="M 0 10 Q 0 30 20 10" /></svg>`
    ],
    keywords: ['顔', 'スマイル', 'にこちゃん', 'スマイリー', '笑顔'],
    explanation: 'にこちゃんマークの顔が完成します。'
  }
];

export const extraSpatialQuestions = [
  { text: '「d」を時計回りに180度回転させると、どの文字になりますか？', svg: null, options: ['b', 'p', 'q'], aIndex: 1, explanation: '「d」を180度回転させると「p」になります。' },
  { text: '「b」を鏡に映すと、どの文字になりますか？', svg: null, options: ['d', 'p', 'q'], aIndex: 0, explanation: '「b」の左右を反転させると「d」になります。' },
  { text: '「p」を反時計回りに90度回転させた後、もう一度90度回転させると？', svg: null, options: ['b', 'd', 'q'], aIndex: 1, explanation: '反時計回りに90度＋90度＝180度回転。「p」を180度回転すると「d」になります。' },
  { text: 'サイコロの「1」の目の裏側にある数はいくつですか？\n(一般的なサイコロの場合)', svg: null, options: ['2', '6', '5'], aIndex: 1, explanation: '一般的なサイコロは、表と裏の数の和が「7」になります（1の裏は6）。' },
  { text: '展開図を組み立てて立方体を作った時、隣り合わない面はどれとどれですか？', svg: null, options: ['角で接する面', '向かい合う面', '横に並ぶ面'], aIndex: 1, explanation: '立方体の表面で隣り合わない（辺を共有しない）のは、互いに「向かい合う面」だけです。' },
  { text: '次の図形を重ね合わせると、どの形になりますか？\n\n( ＋ ) と ( × )', svg: null, options: ['✳', '＋', '×'], aIndex: 0, explanation: '十字(＋)とバツ(×)を重ねると、米印(✳)のようになります。' },
  { text: '次の図形を重ね合わせると、どの形になりますか？\n\n( △ ) と ( ▽ )', svg: null, options: ['◇', '✡', '□'], aIndex: 1, explanation: '上向きの三角形と下向きの三角形を重ねると、六芒星(✡)のようになります。' },
  { text: '次の図形を重ね合わせると、どの形になりますか？\n\n( ◯ ) と ( ｜ ) と ( ─ )', svg: null, options: ['⊖', '⊘', '⊕'], aIndex: 2, explanation: '円の中に十字が重なるので、(⊕)になります。' },
  { text: '次の図形から、( ─ ) を取り除くと、どの形になりますか？\n\n( ⊕ )', svg: null, options: ['⊘', '⊖', '◯'], aIndex: 1, explanation: '十字から横線を引くと、(⊖)になります（ここでは縦線の◯＋｜ではなく横棒とみなしています）。' }
];

spatialQuestions.push(...extraSpatialQuestions);

// --- MORE SPATIAL QUESTIONS ---

spatialQuestions.push(
  { 
    text: 'この展開図を組み立ててできる立体はどれですか？', 
    svg: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2">
      <polygon points="50,20 30,55 70,55" />
      <polygon points="30,55 10,90 50,90" />
      <polygon points="50,90 70,55 90,90" />
      <polygon points="30,55 70,55 50,90" />
    </svg>`,
    options: ['正四面体（三角錐）', '立方体', '八面体'], 
    aIndex: 0, 
    explanation: '4つの正三角形からなる展開図は、正四面体（三角錐）になります。' 
  },
  { 
    text: 'この展開図を組み立てたとき、一番上の面が「A」だった場合、一番下の面（底面）はどれになりますか？', 
    svg: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2">
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
    </svg>`,
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
    text: '下の図形を真上から見たときの形はどれですか？', 
    svg: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2">
      <!-- 円錐の斜視図 -->
      <ellipse cx="50" cy="80" rx="30" ry="10" />
      <path d="M 20 80 L 50 20 L 80 80" />
    </svg>`,
    options: ['三角形', '円', '四角形'], 
    aIndex: 1, 
    explanation: '円錐を真上から見ると、底面の円とその中心（頂点）が見えるため、円形に見えます。' 
  },
  { 
    text: '下の図形を真正面から見たときの形はどれですか？', 
    svg: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2">
      <!-- 円柱の斜視図 -->
      <ellipse cx="50" cy="20" rx="20" ry="8" />
      <path d="M 30 20 L 30 80 A 20 8 0 0 0 70 80 L 70 20" />
    </svg>`,
    options: ['円', '長方形', '楕円'], 
    aIndex: 1, 
    explanation: '円柱を真正面（真横）から見ると、上下の円は見えず、長方形に見えます。' 
  }
);

visualPuzzleQuestions.length = 0;
visualPuzzleQuestions.push(
  {
    text: '絵を完成させてください',
    cols: 2,
    pieces: [
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 50,50 A 40,40 0 0,0 10,50 Z" /><circle cx="35" cy="40" r="5" fill="currentColor"/></svg>',
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 0,50 A 40,40 0 0,1 40,50 Z" /><circle cx="15" cy="40" r="5" fill="currentColor"/></svg>',
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 50,0 A 40,40 0 0,1 10,0 Z" /><path d="M 30 10 Q 50 30 50 10" /></svg>',
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 0,0 A 40,40 0 0,0 40,0 Z" /><path d="M 0 10 Q 0 30 20 10" /></svg>'
    ],
    correctOrder: [
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 50,50 A 40,40 0 0,0 10,50 Z" /><circle cx="35" cy="40" r="5" fill="currentColor"/></svg>',
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 0,50 A 40,40 0 0,1 40,50 Z" /><circle cx="15" cy="40" r="5" fill="currentColor"/></svg>',
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 50,0 A 40,40 0 0,1 10,0 Z" /><path d="M 30 10 Q 50 30 50 10" /></svg>',
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 0,0 A 40,40 0 0,0 40,0 Z" /><path d="M 0 10 Q 0 30 20 10" /></svg>'
    ],
    keywords: ['顔', 'スマイル', 'にこちゃん', 'スマイリー', '笑顔'],
    explanation: 'にこちゃんマークの顔が完成します。'
  },
  {
    text: '絵を完成させてください',
    cols: 2,
    pieces: [
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 0 50 L 50 50 L 50 0 Z" /></svg>',
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 0 0 L 50 50 L 0 50 Z" /></svg>',
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><rect x="10" y="0" width="30" height="50" /></svg>',
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><circle cx="25" cy="25" r="10" /></svg>'
    ],
    correctOrder: [
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 0 50 L 50 50 L 50 0 Z" /></svg>',
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 0 0 L 50 50 L 0 50 Z" /></svg>',
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><rect x="10" y="0" width="30" height="50" /></svg>',
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><circle cx="25" cy="25" r="10" /></svg>'
    ],
    keywords: ['家', 'いえ', 'ハウス'],
    explanation: '三角屋根と四角い壁、窓を組み合わせた家の絵になります。'
  },
  {
    text: '絵を完成させてください（十字架）',
    cols: 1,
    pieces: [
      '<svg viewBox="0 0 50 50" fill="currentColor"><rect x="0" y="15" width="50" height="20" /></svg>', // 横棒
      '<svg viewBox="0 0 50 50" fill="currentColor"><rect x="15" y="0" width="20" height="50" /></svg>', // 下の長い縦棒
      '<svg viewBox="0 0 50 50" fill="currentColor"><rect x="15" y="20" width="20" height="30" /></svg>'  // 上の短い縦棒
    ],
    correctOrder: [
      '<svg viewBox="0 0 50 50" fill="currentColor"><rect x="15" y="20" width="20" height="30" /></svg>',
      '<svg viewBox="0 0 50 50" fill="currentColor"><rect x="0" y="15" width="50" height="20" /></svg>',
      '<svg viewBox="0 0 50 50" fill="currentColor"><rect x="15" y="0" width="20" height="50" /></svg>'
    ],
    keywords: ['十字', 'クロス', 'プラス', '十字架'],
    explanation: '上・中央・下の3つのパーツを縦につなげると十字架の形になります。'
  },
  {
    text: '絵を完成させてください（正方形）',
    cols: 2,
    pieces: [
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 50 50 L 0 50 L 50 0 Z" /></svg>', // 直角三角形右下
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 0 0 L 0 50 L 50 0 Z" /></svg>' // 直角三角形左上
    ],
    correctOrder: [
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 0 0 L 0 50 L 50 0 Z" /></svg>',
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><path d="M 50 50 L 0 50 L 50 0 Z" /></svg>'
    ],
    keywords: ['正方形', '四角', 'しかく', '四角形'],
    explanation: '2つの直角三角形を対角線で組み合わせると正方形になります。'
  },
  {
    text: '絵を完成させてください（スマートフォン）',
    cols: 1,
    pieces: [
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><circle cx="25" cy="25" r="20" /></svg>',
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><rect x="15" y="10" width="20" height="30" rx="4" /></svg>',
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><circle cx="25" cy="40" r="3" /></svg>'
    ],
    correctOrder: [
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><circle cx="25" cy="25" r="20" /></svg>',
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><rect x="15" y="10" width="20" height="30" rx="4" /></svg>',
      '<svg viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="4"><circle cx="25" cy="40" r="3" /></svg>'
    ],
    keywords: ['スマホ', 'スマートフォン', '携帯', '電話'],
    explanation: '画面の枠、ホームボタンを組み合わせるとスマートフォンの形になります。'
  }
);
