import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          background: '#0B0D0A',
          border: '1.5px solid rgba(124,255,158,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          fontSize: '13px',
          fontWeight: 700,
          color: '#7CFF9E',
          letterSpacing: '-0.5px',
        }}
      >
        NK
      </div>
    ),
    {
      ...size,
    }
  );
}
