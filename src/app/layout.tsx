import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Yair Hernández | Desarrollo Web, SaaS & Automatizaciones",
  description:
    "Desarrollo web profesional, SaaS, e-commerce, landing pages y automatizaciones con IA. Soluciones digitales a medida para tu negocio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{const t=localStorage.getItem('yh-theme')||'light';if(t==='light')document.documentElement.classList.add('light')}catch(e){document.documentElement.classList.add('light')}; if('scrollRestoration' in history) history.scrollRestoration='manual'; window.scrollTo(0,0);`,
          }}
        />
      </head>
      <body className={`${jetbrains.variable} antialiased grain`}>
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
