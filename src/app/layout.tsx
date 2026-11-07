import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "TypeShift | Minimalist English Typing Speed Test",
  description:
    "Test and improve your English typing speed and accuracy with a clean, distraction-free, Monkeytype-inspired typing test web application.",
  keywords: [
    "typing test",
    "wpm test",
    "typing speed test",
    "monkeytype alternative",
    "english typing test",
    "words per minute",
  ],
  authors: [{ name: "89Abdullah21" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-bg-main text-text-main min-h-screen flex flex-col justify-between antialiased selection:bg-primary/20 selection:text-primary">
        {children}
      </body>
    </html>
  );
}
