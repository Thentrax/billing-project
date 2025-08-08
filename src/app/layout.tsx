import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { AuthProvider } from "@/context/AuthContext/provider";

export const metadata: Metadata = {
  title: "Financeiro",
  description: "Projeto de controle financeiro. Tech Challenge da Fiap.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
        <body>
          <AuthProvider>
            <div className="flex flex-col h-screen">
              <Header />
              {children}
            </div>
          </AuthProvider>
        </body>
    </html>
  );
}
