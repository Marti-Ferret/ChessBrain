import './globals.css';
import { Inter } from 'next/font/google';



const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Vercel AI SDK - Next.js OpenAI Examples',
  description: 'Examples of using the Vercel AI SDK with Next.js and OpenAI.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link href="https://fonts.googleapis.com/css2?family=Lancelot&display=swap" rel="stylesheet" />

      <body className="w-full">{children}</body>
    </html>
  );
}
