import { ImageResponse } from 'next/og';

export const alt = 'BetTaxCalc — Sports Betting Tax Calculator 2026';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 40%, #3b82f6 100%)',
          padding: '60px 80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Logo area */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
          <div
            style={{
              width: 56,
              height: 56,
              background: 'rgba(255,255,255,0.2)',
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ color: 'white', fontSize: 32, fontWeight: 'bold' }}>$</span>
          </div>
          <span style={{ color: 'white', fontSize: 28, fontWeight: 'bold' }}>BetTaxCalc</span>
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: 24,
          }}
        >
          <span style={{ color: 'white', fontSize: 64, fontWeight: 'bold', lineHeight: 1.15 }}>
            Sports Betting
          </span>
          <span style={{ color: 'white', fontSize: 64, fontWeight: 'bold', lineHeight: 1.15 }}>
            Tax Calculator
          </span>
        </div>

        {/* Subtitle */}
        <span
          style={{
            color: 'rgba(191, 219, 254, 1)',
            fontSize: 28,
            lineHeight: 1.4,
          }}
        >
          Updated for 2026 OBBBA Rules | All 50 States | Free
        </span>

        {/* Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginTop: 32,
            background: 'rgba(255,255,255,0.15)',
            padding: '10px 20px',
            borderRadius: 100,
          }}
        >
          <div style={{ width: 10, height: 10, borderRadius: 5, background: '#4ade80' }} />
          <span style={{ color: 'white', fontSize: 18, fontWeight: 500 }}>
            Updated for 2026 OBBBA Tax Rules
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
