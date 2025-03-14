import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CovidWtach",
  description: "Monitoramento de casos de Covid-19",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen gap-8 items-center">
            <Header />

            <main className="px-6 max-w-[1600px] w-full pb-4">
              {children}
            </main>
          </div>
        </ThemeProvider>
        <ToastContainer />
      </body>
    </html >
  );
}
