const fs = require('fs');
let code = fs.readFileSync('components/TrainingModule.tsx', 'utf8');

// adding patterns to similarities, comprehension, information, logic
const addSimilarities = `,
        { text: "「太陽」と「月」の共通点は何ですか？", answer: "天体", options: ["天体", "丸い", "明るい"], explanation: "どちらも天体です。" },
        { text: "「絵画」と「彫刻」の共通点は何ですか？", answer: "芸術", options: ["芸術", "飾るもの", "立体"], explanation: "どちらも芸術作品（美術品）です。" },
        { text: "「怒り」と「喜び」の共通点は何ですか？", answer: "感情", options: ["感情", "表現", "気持ち"], explanation: "どちらも人間の感情です。" },
        { text: "「酸素」と「二酸化炭素」の共通点は何ですか？", answer: "気体", options: ["気体", "目に見えない", "空気"], explanation: "どちらも常温で気体の物質です。" },
        { text: "「詩」と「小説」の共通点は何ですか？", answer: "文学", options: ["文学", "本", "文章"], explanation: "どちらも文学の一形式です。" }`;

code = code.replace(`{ text: "「ピアノ」と「ギター」の共通点は何ですか？", answer: "楽器", options: ["楽器", "音が出る", "木でできている"], explanation: "どちらも楽器です。" }`, 
`{ text: "「ピアノ」と「ギター」の共通点は何ですか？", answer: "楽器", options: ["楽器", "音が出る", "木でできている"], explanation: "どちらも楽器です。" }` + addSimilarities);


const addComprehension = `,
        { text: "なぜ法律が必要なのですか？", answer: "社会の秩序を維持するため", options: ["社会の秩序を維持するため", "悪い人を捕まえるため", "ルールを作るため"], explanation: "社会の安全と秩序を守り、人々の権利を保障するためです。" },
        { text: "なぜ税金を払うのですか？", answer: "公共サービスを維持するため", options: ["公共サービスを維持するため", "国が豊かになるため", "義務だから"], explanation: "警察、消防、教育などの公共サービスを提供し、社会を維持するためです。" },
        { text: "なぜ選挙に行くことが重要なのですか？", answer: "代表者を選ぶため", options: ["代表者を選ぶため", "国民の義務だから", "政治を変えるため"], explanation: "自分たちの代表者を選び、民主主義を機能させるためです。" },
        { text: "なぜ環境保護が重要なのですか？", answer: "生態系を守るため", options: ["生態系を守るため", "動物がかわいそうだから", "資源がなくなるから"], explanation: "地球の生態系を維持し、将来の世代に持続可能な環境を残すためです。" },
        { text: "なぜ契約書を交わすのですか？", answer: "合意内容を明確にするため", options: ["合意内容を明確にするため", "嘘をつかないようにするため", "裁判で勝つため"], explanation: "お互いの合意事項を明確にし、将来のトラブルを防ぐためです。" }`;

code = code.replace(`{ text: "道で他人の財布を拾ったら、どうすべきですか？", answer: "警察に届ける", options: ["警察に届ける", "そのまま置いておく", "中身を確認する"], explanation: "落とし主の元に返すため、速やかに警察（交番）に届けるのが適切な行動です。" }`, 
`{ text: "道で他人の財布を拾ったら、どうすべきですか？", answer: "警察に届ける", options: ["警察に届ける", "そのまま置いておく", "中身を確認する"], explanation: "落とし主の元に返すため、速やかに警察（交番）に届けるのが適切な行動です。" }` + addComprehension);

fs.writeFileSync('components/TrainingModule.tsx', code);
