"use client"
import { useMemo } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./(components)/Header/Header";
import Footer from "./(components)/Footer/Footer";
import { AuthContextProvider } from "@/lib/firebase/authContext"
import * as Ably from 'ably';
import { AblyProvider, ChannelProvider } from "ably/react";
const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = useMemo(() => {
    return new Ably.Realtime({
      authUrl: `${process.env.NEXT_PUBLIC_HOSTNAME}/api/token`,
    });
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <Header></Header>
            <AblyProvider client={client}>
              <ChannelProvider channelName="quiz-channel">
                {children}
              </ChannelProvider>
            </AblyProvider>
          <Footer></Footer>
        </AuthContextProvider>
        </body>
    </html>
  );
}
