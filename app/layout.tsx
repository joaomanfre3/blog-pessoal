import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });

export const metadata: Metadata = {
  title: {
    default: "Blog Pessoal",
    template: "%s · Blog Pessoal",
  },
  description:
    "Ideias, aprendizados e bastidores de desenvolvimento web. Um blog pessoal feito com Next.js e posts em Markdown.",
  openGraph: {
    title: "Blog Pessoal",
    description: "Ideias, aprendizados e bastidores de desenvolvimento web.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${lora.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
