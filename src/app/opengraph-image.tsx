import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Navaneeth KV — Full Stack Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#0B0D0A',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* ── Grid dot pattern overlay ── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(circle, rgba(242,240,230,0.06) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            display: 'flex',
          }}
        />

        {/* ── Top-left accent glow ── */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            left: '-80px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(124,255,158,0.12) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* ── Bottom-right accent glow ── */}
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            right: '-60px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(124,255,158,0.08) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* ── Top border accent line ── */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background:
              'linear-gradient(90deg, transparent 0%, #7CFF9E 40%, #7CFF9E 60%, transparent 100%)',
            display: 'flex',
          }}
        />

        {/* ── Content container ── */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            padding: '64px 80px',
          }}
        >
          {/* ── Top row: Monogram + Status ── */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* NK monogram */}
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                background: '#14170F',
                border: '1px solid rgba(124,255,158,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                fontWeight: 700,
                color: '#7CFF9E',
                letterSpacing: '-0.5px',
              }}
            >
              NK
            </div>

            {/* Available badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: '#14170F',
                border: '1px solid rgba(242,240,230,0.09)',
                borderRadius: '999px',
                padding: '8px 18px',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#7CFF9E',
                  display: 'flex',
                }}
              />
              <span
                style={{
                  fontSize: '14px',
                  color: '#96968A',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                Available for work
              </span>
            </div>
          </div>

          {/* ── Main headline ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Name */}
            <div
              style={{
                fontSize: '80px',
                fontWeight: 800,
                color: '#F2F0E6',
                lineHeight: 1,
                letterSpacing: '-3px',
              }}
            >
              Navaneeth KV
            </div>

            {/* Title with accent underline */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '40px',
                  height: '3px',
                  background: '#7CFF9E',
                  borderRadius: '2px',
                  display: 'flex',
                }}
              />
              <div
                style={{
                  fontSize: '28px',
                  fontWeight: 500,
                  color: '#7CFF9E',
                  letterSpacing: '-0.5px',
                }}
              >
                Full Stack Developer
              </div>
            </div>

            {/* Description */}
            <div
              style={{
                fontSize: '20px',
                color: '#96968A',
                lineHeight: 1.5,
                maxWidth: '700px',
                marginTop: '8px',
              }}
            >
              Building real-time platforms at Druv360 & freelancing worldwide.
              React · Next.js · Node.js · Django · PostgreSQL
            </div>
          </div>

          {/* ── Bottom row: Domain + Tech tags ── */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Domain */}
            <div
              style={{
                fontSize: '16px',
                color: '#6B6C60',
                letterSpacing: '0.04em',
                fontFamily: 'monospace',
              }}
            >
              navaneeth.dev
            </div>

            {/* Tech pills */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {['React', 'Next.js', 'Node.js', 'Django'].map((tech) => (
                <div
                  key={tech}
                  style={{
                    background: '#14170F',
                    border: '1px solid rgba(242,240,230,0.09)',
                    borderRadius: '6px',
                    padding: '6px 14px',
                    fontSize: '13px',
                    color: '#96968A',
                    fontFamily: 'monospace',
                  }}
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
