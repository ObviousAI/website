import AWS from "aws-sdk";
import React from "react";

import { GetServerSideProps } from "next";
import { Typography, Grid, Box } from "@mui/material";

import styles from "../styles/results.module.css";

import { SearchBar, HoverableImageCard } from "../components";
import { Item, configJson, searchRequestPayload } from "../helpers";
import { getJsonResponse } from "../helpers/api";
import { useSearchStore } from "../lib/searchStore";
import { config } from "../../config.json";

const configContents: configJson = config;
const ENDPOINT =
  // @ts-ignore
  configContents.api.api_endpoints[configContents.api.current_version];

type ResultsProps = {
  items: Item[];
  searchQuery: string;
};

const Results: React.FC<ResultsProps> = ({ items, searchQuery }) => {
  const [validItems, setValidItems] = React.useState<Item[]>([]);
  const vendor = useSearchStore((state) => state.vendor);
  const queryValue = searchQuery || "";

  React.useEffect(() => {
    setValidItems(items); // Initialize validItems with all items when the component mounts.
  }, [items, validItems]);

  return (
    <div className={styles.wrapperContainer}>
      <div id={styles.searchWrapper}>
        <SearchBar />
        <Typography
          sx={{
            textAlign: "center",
            alignSelf: "center",
            marginRight: "28%",
          }}
        >
          {" "}
          ... showing results for{" "}
          {queryValue.length === 0 ? "your image" : queryValue}!
        </Typography>
        {/* <TopSearches topSearches={topSearches} /> */}
      </div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid
          spacing={1}
          container
          sx={{
            marginBlock: "4%",
            width: "70%",
            marginInline: "auto",
          }}
        >
          {" "}
          {items.map((item) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={item.id}>
              <HoverableImageCard item={item} />
            </Grid>
          ))}
        </Grid>
        {/* <Grid item xs={12}>
          <Box>
            <h1>CHATBOT HERE</h1>
          </Box>
        </Grid> */}
      </Box>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const searchQuery = (query.q as string) || "";
  const isImageSearch = query.imageSearch === "true";
  let imageName = (query.imageName as string) || null;
  const component = (query.component as string) || null;
  const vendor = (query.vendor as string) || null;

  if (ENDPOINT === undefined) {
    console.error("Endpoint URL is undefined");
    return {
      props: {
        items: [],
        searchQuery: "",
      },
    };
  }
  // Ensure imageName is a string. For future reference, probably generate an interface to represent the query object/context object.
  if (Array.isArray(imageName)) {
    imageName = imageName[0]; // Example strategy: use the first item if it's an array
  }

  let endpointPath = "/text_search";
  const request: searchRequestPayload = {
    requestType: "POST",
    imageName,
    component,
    searchQuery,
    encodedImage: null,
    vendor: vendor,
  };
  if (isImageSearch) {
    endpointPath = component ? "/image_search_component" : "/image_search";
  }
  const items = await getJsonResponse(endpointPath, request);

  return {
    props: {
      items,
      searchQuery,
    },
  };
};

export default Results;
