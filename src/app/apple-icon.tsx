import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1e40af',
          borderRadius: '32px',
          flexDirection: 'column',
        }}
      >
        <span
          style={{
            color: 'white',
            fontSize: 100,
            fontWeight: 'bold',
            fontFamily: 'system-ui, sans-serif',
            lineHeight: 1,
          }}
        >
          $
        </span>

        <div
          style={{
            display: 'flex',
            gap: 10,
            marginTop: 4,
          }}
        >
          <div style={{ width: 16, height: 12, background: 'rgba(255,255,255,0.5)', borderRadius: 3 }} />
          <div style={{ width: 16, height: 12, background: 'rgba(255,255,255,0.5)', borderRadius: 3 }} />
          <div style={{ width: 16, height: 12, background: 'rgba(255,255,255,0.5)', borderRadius: 3 }} />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
