import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navigation } from "@/components/navigation";
import { TRPCProvider } from "@/providers/trpc-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Project Mind Vault | PMBOK 7 Navigator",
  description:
    "Sistema interativo de aprendizado para o Guia PMBOK® Sétima Edição. Explore domínios, resolva dilemas e revise com flashcards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-zinc-950 text-zinc-100`}
      >
        <TRPCProvider>
          <Navigation />
          <main className="mx-auto max-w-6xl px-4 py-8">
            {children}
          </main>
        </TRPCProvider>
      </body>
    </html>
  );
}
