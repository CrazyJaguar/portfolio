import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import ThemeToggle from "./components/ThemeToggle";
import PlaygroundFloater from "./components/PlaygroundFloater";
import { ThemeProvider } from "./context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sushant Raj Mishra | Developer & Designer",
  description: "Full Stack Developer, UI/UX Designer, and Social Impact Advocate. Building beautiful digital experiences that make a difference.",
  keywords: ["developer", "designer", "portfolio", "react", "nextjs", "fullstack"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased transition-colors duration-500`}
        style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
      >
        <ThemeProvider>
          <Navbar />
          {children}
          <ThemeToggle />
          <PlaygroundFloater />
        </ThemeProvider>
      </body>
    </html>
  );
}
