import React from "react";

import type { AppProps } from "next/app";
import { Box } from "@mui/system";
import { UserProvider } from "@auth0/nextjs-auth0/client";

import "../styles/global.css";

import { NavBar, Footer } from "../components";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </Box>
    </UserProvider>
  );
}

export default MyApp;
