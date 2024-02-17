import React from "react";
import ReactLoading from "react-loading";

import { Box } from "@mui/material";

export default function Loading() {
  return (
    <Box
      sx={{
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        backgroundColor: "rgba(255,255,255,0.5)",
        // Transparent background.
      }}
    >
      <ReactLoading type="spin" color="#0000FF" height={200} width={100} />
    </Box>
  );
}
