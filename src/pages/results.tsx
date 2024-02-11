import React from "react";
import axios from "axios";
import styles from "../styles/results.module.css";

import { Typography, Grid, Box } from "@mui/material";
import { SearchBar, HoverableImageCard } from "../components";
import { GetServerSideProps } from "next";
import { Item } from "../helpers";

import AWS from "aws-sdk";

type ResultsProps = {
  items: Item[];
  searchQuery: string;
};

// const topSearches = [
//   "Something that will make me look bulky",
//   "Something that will make me look slim",
//   "Something that will make me look taller",
//   "Something that will make me look shorter",
//   "Something that will make me look more muscular",
// ];

const s3 = new AWS.S3({
  accessKeyId: "AKIAXWYG7NAV44XWIGF5",
  secretAccessKey: "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",
  region: "us-east-2",
});

const Results: React.FC<ResultsProps> = ({ items, searchQuery }) => {
  const [validItems, setValidItems] = React.useState<Item[]>([]);
  const queryValue = searchQuery || "";

  React.useEffect(() => {
    setValidItems(items); // Initialize validItems with all items when the component mounts.
    console.log(validItems);
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
          {queryValue === "null" ? "image upload" : queryValue}!
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

export const getServerSideProps: GetServerSideProps<{ items: Item[] }> = async (
  context: any
) => {
  const fetchFromS3 = async (key: any) => {
    const params = {
      Bucket: "scrapingdatanew",
      Key: key,
    };

    try {
      const data = await s3.getObject(params).promise();
      return data.Body ? data.Body.toString() : null;
    } catch (error) {
      console.error("Error fetching data from S3:", error);
      return null;
    }
  };

  const isImage = context.query.imageSearch || "";
  let items: Item[] = [];
  let img = null;
  if (isImage === "true") {
    img = await fetchFromS3("uploadImage");
  }
  if (isImage === "false") {
    const query = context.query.q || ""; // Assumes you pass the search term as "?q=term"
    try {
      const response = await axios.get(
        `http://ec2-3-146-178-203.us-east-2.compute.amazonaws.com:5000/text_search_simple?prompt=${query}`
      );
      items = response.data;
    } catch (error) {
      console.error("Error fetching the items:", error);
    }
    return {
      props: {
        items,
        searchQuery: context.query.q,
      },
    };
  } else if (img !== null) {
    const component = context.query.component;
    if (component !== "null") {
      const response = await fetch(
        `http://ec2-3-146-178-203.us-east-2.compute.amazonaws.com:5000/image_search_component`,
        {
          method: "POST",
          body: JSON.stringify({
            image: img.split(",")[1],
            component: component,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let resp = await response;
      items = await resp.json();
      console.log(items);
      return {
        props: {
          items,
          searchQuery: context.query.q,
        },
      };
    } else {
      const response = await fetch(
        `http://ec2-3-146-178-203.us-east-2.compute.amazonaws.com:5000/image_search`,
        {
          method: "POST",
          body: JSON.stringify({
            image: img.split(",")[1],
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      items = await response.json();
      return {
        props: {
          items,
          searchQuery: context.query.q,
        },
      };
    }
  }
  return {
    props: {
      items: [], // or some default value
      searchQuery: context.query.q,
    },
  };
};

export default Results;
