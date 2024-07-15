import React from "react";
import ReactLoading from "react-loading";

import { App, Logo } from "../components";

import config from "../../config.json";
import { Typography } from "@mui/material";

const ENDPOINT =
  // @ts-ignore
  config.config.api.api_endpoints[config.config.api.current_version];

const Home = () => {
  const [loading, setLoading] = React.useState(true);

  const makeWakeUpRequest = async () => {
    await fetch(ENDPOINT + "/wakeup");
  };

  React.useEffect(() => {
    // Wake up the model when we first load this page.
    // dont fetch components here, just send a get request to wake up the model
    // makeWakeUpRequest();
    // Wait a random amount of seconds, between 2-3 seconds.
    setTimeout(() => {
      setLoading(false);
    }, Math.random() * 1000 + 2000);
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <ReactLoading
          type="spinningBubbles"
          color="#5900C9"
          height={200}
          width={100}
        />
        <Typography variant="h3">Waking up the model...</Typography>
      </div>
    );
  }
  return (
    <div>
      <Logo />
      <App />
    </div>
  );
};

export default Home;
