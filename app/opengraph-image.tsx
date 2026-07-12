import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
export const alt = 'IQトレーニング＋'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #0f172a, #000000)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 40 }}>
          <div style={{ 
            background: 'linear-gradient(to bottom right, #00f3ff, #ff00ff)',
            width: 120, 
            height: 120, 
            borderRadius: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 70,
            fontWeight: 'bold',
            color: 'black',
            marginRight: 40
          }}>
            IQ
          </div>
          <h1 style={{ fontSize: 80, fontWeight: 'bold', backgroundClip: 'text', color: 'transparent', backgroundImage: 'linear-gradient(to right, #00f3ff, #ff00ff)' }}>
            IQトレーニング＋
          </h1>
        </div>
        <p style={{ fontSize: 40, color: '#94a3b8' }}>WAIS式 総合知能・脳トレアプリ</p>
      </div>
    ),
    { ...size }
  )
}
