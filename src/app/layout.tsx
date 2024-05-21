"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
// import {store} from '../store';
import { Provider } from "react-redux";
import store from "@/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { composeWithDevTools } from "redux-devtools-extension";

const queryClient = new QueryClient();

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <html lang="en">
          <title>Perago</title>
          <body className={inter.className}>
            <MantineProvider>{children}</MantineProvider>
          </body>
          <ReactQueryDevtools />
        </html>
      </Provider>
    </QueryClientProvider>
  );
}
