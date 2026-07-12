import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('keyword') || 'IQ パズル';
  
  const appId = "1055088369869282145";
  const affiliateId = "3d94ea21.0d257908.3d94ea22.0ed11c6e";
  
  const apiUrl = "https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601";
  
  const keywordsMap: Record<string, string> = {
    "IQ": "IQ パズル",
    "脳トレ": "脳トレ パズル",
    "パズル": "立体パズル"
  };
  
  const searchKeyword = keywordsMap[keyword] || keyword;
  
  const fallbackItems = [
    {
      name: "立体パズル 脳トレ 木製",
      price: 1500,
      image: "https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/0283/9784058020283.jpg?_ex=128x128",
      url: `https://hb.afl.rakuten.co.jp/hgc/${affiliateId}/?pc=https://item.rakuten.co.jp/book/17393430/`
    },
    {
      name: "大人の脳トレパズルセット",
      price: 2200,
      image: "https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/4011/9784413114011.jpg?_ex=128x128",
      url: `https://hb.afl.rakuten.co.jp/hgc/${affiliateId}/?pc=https://item.rakuten.co.jp/book/17094011/`
    }
  ];

  try {
    const res = await fetch(`${apiUrl}?applicationId=${appId}&keyword=${encodeURIComponent(searchKeyword)}&hits=5&format=json`);
    const data = await res.json();
    
    if (data.Items && data.Items.length > 0) {
      const items = data.Items;
      const item = items[Math.floor(Math.random() * items.length)].Item;
      const productUrl = item.itemUrl.split("?")[0];
      const affiliateLink = `https://hb.afl.rakuten.co.jp/hgc/${affiliateId}/?pc=${encodeURIComponent(productUrl)}`;
      
      return NextResponse.json({
        name: item.itemName,
        price: item.itemPrice,
        image: item.mediumImageUrls[0]?.imageUrl || item.smallImageUrls[0]?.imageUrl,
        url: affiliateLink
      });
    } else {
      return NextResponse.json(fallbackItems[Math.floor(Math.random() * fallbackItems.length)]);
    }
  } catch (error) {
    console.error("Rakuten API Error:", error);
    return NextResponse.json(fallbackItems[Math.floor(Math.random() * fallbackItems.length)]);
  }
}
