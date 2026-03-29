import { ImageResponse } from 'next/og';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
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
          borderRadius: '6px',
          position: 'relative',
        }}
      >
        {/* Dollar sign */}
        <span
          style={{
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
            fontFamily: 'system-ui, sans-serif',
            marginTop: -4,
          }}
        >
          $
        </span>

        {/* Small dots at bottom representing calculator */}
        <div
          style={{
            position: 'absolute',
            bottom: 3,
            display: 'flex',
            gap: 3,
          }}
        >
          <div style={{ width: 4, height: 3, background: 'rgba(255,255,255,0.5)', borderRadius: 1 }} />
          <div style={{ width: 4, height: 3, background: 'rgba(255,255,255,0.5)', borderRadius: 1 }} />
          <div style={{ width: 4, height: 3, background: 'rgba(255,255,255,0.5)', borderRadius: 1 }} />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
