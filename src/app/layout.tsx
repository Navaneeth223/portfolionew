import type { Metadata } from 'next';
import { Bricolage_Grotesque, IBM_Plex_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage-grotesque',
  weight: ['500', '600', '700', '800'],
  display: 'swap',
});

const ibmPlex = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-ibm-plex-sans',
  weight: ['400', '500'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Navaneeth KV — Full Stack Developer',
  description:
    'Full Stack Developer building real-time recruitment platforms at Druv360 & freelancing worldwide. React, Next.js, Node.js, Django, PostgreSQL, Three.js.',
  keywords: [
    'Navaneeth KV',
    'Full Stack Developer',
    'MERN Stack Developer',
    'Next.js',
    'React',
    'Node.js',
    'Django',
    'PostgreSQL',
    'Muscat Oman',
    'Kerala India',
  ],
  authors: [{ name: 'Navaneeth KV' }],
  openGraph: {
    title: 'Navaneeth KV — Full Stack Developer',
    description:
      'Full Stack Developer building real-time recruitment platforms at Druv360 & freelancing worldwide.',
    type: 'website',
    url: 'https://navaneeth.dev',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${ibmPlex.variable} ${jetbrainsMono.variable} dark`}
      suppressHydrationWarning
    >
      <body
        className="bg-bg text-ink font-sans antialiased selection:bg-signal selection:text-bg min-h-screen relative"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
