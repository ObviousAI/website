import { NavBar, Footer } from "../components";
import type { AppProps } from "next/app";
import "../styles/global.css";
import React from "react";
import { UserProvider } from "@auth0/nextjs-auth0/client";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </UserProvider>
  );
}

export default MyApp;
