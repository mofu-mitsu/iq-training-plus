const fs = require('fs');
let code = fs.readFileSync('lib/questions.ts', 'utf8');

const replacements = [
  { old: "['公共のサービス（道路、学校、警察など）を維持するため']", new: "['公共', 'サービス', '国', '維持', '社会', 'みんなのため', '税金']" },
  { old: "['社会の秩序を保ち、人々の権利を守るため']", new: "['社会', '秩序', '権利', 'ルール', '守る', '平和', '安全']" },
  { old: "['他者からの信頼関係を築き、維持するため']", new: "['信頼', '信用', '関係', '社会', '人間関係']" },
  { old: "['自分たちの代表を選び、政治に参加するため']", new: "['代表', '政治', '参加', '選ぶ', '民主主義']" }
];

replacements.forEach(r => {
  code = code.replaceAll(r.old, r.new);
});
fs.writeFileSync('lib/questions.ts', code);
