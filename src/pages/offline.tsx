// Create view that just says "Thank you for visiting our page! You can view the code for the project at _______, but we have stopped working on this to cut from monthly model and hosting costs." Then add a portion with a video that shows a demo of the website, and under it say "here is a demo of what the website looked like while online."
import React from "react";

import { Link, Typography } from "@mui/material";

export default function Offline() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "40px",
        marginInline: "20%",
        marginBlock: "10%",
      }}
    >
      <Typography variant="h5">
        Thank you for visiting our projects page! You can view the code for the
        project <Link href="https://github.com/ObviousAI/website">here</Link>{" "}
        (if you want to see the code for the actual models and embeddings, reach
        me out on linkedin), but we have stopped working on this to cut from
        monthly model and hosting costs." Then add a portion with a video that
        shows a demo of the website, and under it say "here is a demo of what
        the website looked like while online.
      </Typography>
      <div>
        <iframe
          style={{
            width: "800px",
            height: "600px",
            border: "4px",
          }}
          allowFullScreen={true}
          src="https://drive.google.com/file/d/16VNhXspVTUbQQlekmj25_BOE-ga4c1Ez/preview"
          allow="autoplay"
        ></iframe>
      </div>
      <Typography variant="h5">
        Above is a demo of what the website looked like while online.
      </Typography>
    </div>
  );
}
