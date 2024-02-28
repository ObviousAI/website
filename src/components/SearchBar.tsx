import React, { use } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { useState, useRef } from "react";
import { useRouter } from "next/router";
// import { Box, Button, Modal, Typography, Checkbox } from "@mui/material";
// import { MenuProps } from "@mui/material/Menu";

import SearchModal from "./Modal";
import styles from "../styles/SearchBar.module.css";

// import { ImageCanvas } from "./ImageUploaderCanvas";
import {
  uploadToS3,
  getJsonResponse,
  searchRequestPayload,
  routeInput,
  configJson,
} from "../helpers";
import { useSearchStore } from "../lib/searchStore";
import VendorMenu from "./VendorMenu";
import { config } from "../../config.json";

const configContents: configJson = config;
const ENDPOINT =
  // @ts-ignore
  configContents.api.api_endpoints[configContents.api.current_version];

export const SearchBar = () => {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [upload, setUpload] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [choices, setChoices] = useState<string[]>([]);
  const [selectedChoice, setSelectedChoice] = useState<string | null>("All");
  const { vendor, useComponents } = useSearchStore((state) => {
    return { vendor: state.vendor, useComponents: state.useComponents };
  });

  const rootRef = React.useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const routeObject: routeInput = {
        pathname: "/results",
        query: {
          q: input,
          imageSearch: false,
          imageName: null,
          component: selectedChoice,
          vendor: vendor,
        },
      };
      router.push(routeObject);
    }
  };

  const handleSubmitButton = async () => {
    if (!imageSrc) return;
    const base64Image = imageSrc.split(",")[1];
    const key = await uploadToS3(base64Image);

    // Convert to base64 actually
    const encodedChoice = selectedChoice !== "All" ? selectedChoice : null;

    console.log(key);

    const routeObject: routeInput = {
      pathname: "/results",
      query: {
        q: null,
        imageSearch: true,
        imageName: config.s3_bucket_prefix + key,
        component: encodedChoice,
        vendor: vendor,
      },
    };
    router.push(routeObject);
    setUpload(false);
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const getImageComponents = async () => {
    // This function loads in the image, and then also sets the imageSrc to the right src so the canvas can load the image.
    // Furthermore, it obtains the image components for a given image, sending the base64 encoding of the image as part of a json payload.
    // Then, we can provide the options to the users to select from.
    useSearchStore.setState({ useComponents: !useComponents });
    setUpload(true);

    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      return;
    }

    const imageFile = fileInput.files[0];

    // Convert the image to a base64 string
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = async () => {
      const image = reader.result as string;
      //ignore the type error here, it is a known issue
      setImageSrc(image); // Set the image source for canvas

      if (
        typeof image === "string" &&
        ENDPOINT !== undefined &&
        useComponents &&
        false
      ) {
        console.log(useComponents);
        // Convert the image to base64 actually
        const base64Image = image.split(",")[1];
        const request: searchRequestPayload = {
          requestType: "POST",
          imageName: null,
          component: null,
          searchQuery: null,
          encodedImage: base64Image,
          vendor: vendor,
        };
        const components = await getJsonResponse(
          "/get_image_components",
          request
        );
        setChoices(components);
      }
    };
    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };
  };

  return (
    <>
      <SearchModal
        upload={upload}
        choices={choices}
        imageSrc={imageSrc}
        selectedChoice={selectedChoice}
        handleSubmitButton={handleSubmitButton}
        getImageComponents={getImageComponents}
        setUpload={setUpload}
        setImageSrc={setImageSrc}
        setChoices={setChoices}
        setSelectedChoice={setSelectedChoice}
      />

      <div className={styles.searchBarWrapper}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="A summer in Italy..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className={styles.input}
          />
          {/* The icon is positioned absolutely within the relative inputWrapper */}
          <AddAPhotoIcon
            className={styles.AddAPhotoIcon} /* Use the class for styling */
            onClick={handleButtonClick}
          />
          {/* The input is hidden with opacity 0 and position absolute. This is what actually does the uplpad image functionality */}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={getImageComponents}
          />
        </div>
        {/* Add a menu dropdown here, where you have multiple options and a scroller if necessary here, that says "wayfair search" */}
        <VendorMenu />
      </div>
    </>
  );
};
