const fs = require('fs');
let code = fs.readFileSync('components/TrainingModule.tsx', 'utf8');

const oldFetch = `fetch('/api/rakuten?keyword=' + encodeURIComponent('脳トレ')).then(res => res.json()).then(data => {
          if (!data.error) setRakutenItem(data);
        }).catch(console.error);`;

const newFetch = `
    const appId = "1055088369869282145";
    const affiliateId = "3d94ea21.0d257908.3d94ea22.0ed11c6e";
    const searchKeyword = "脳トレ パズル";
    const apiUrl = \`https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?applicationId=\${appId}&keyword=\${encodeURIComponent(searchKeyword)}&hits=10&format=json\`;
    
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        if (data.Items && data.Items.length > 0) {
          const items = data.Items;
          const item = items[Math.floor(Math.random() * items.length)].Item;
          const productUrl = item.itemUrl.split("?")[0];
          const affiliateLink = \`https://hb.afl.rakuten.co.jp/hgc/\${affiliateId}/?pc=\${encodeURIComponent(productUrl)}\`;
          setRakutenItem({
            name: item.itemName,
            price: item.itemPrice,
            image: item.mediumImageUrls[0]?.imageUrl || item.smallImageUrls[0]?.imageUrl,
            url: affiliateLink
          });
        }
      })
      .catch(console.error);
`;

code = code.replace(oldFetch, newFetch);

fs.writeFileSync('components/TrainingModule.tsx', code);
