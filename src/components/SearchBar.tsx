import React, { useState, useRef } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useRouter } from "next/router";
import SearchModal from "./Modal";
import styles from "../styles/SearchBar.module.css";
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

type websiteStatus = "Online" | "Offline";

const STATUS: websiteStatus = "Offline";
const configContents: configJson = config;
// @ts-ignore
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

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const routeObject: routeInput = {
        pathname: STATUS !== "Offline" ? "/results" : "/offline",
        query: {
          q: STATUS !== "Offline" ? input : "",
          imageSearch: false,
          imageName: null,
          component: selectedChoice || "",
          vendor: vendor || "",
        },
      };
      router.push(routeObject);
    }
  };

  const handleSubmitButton = async () => {
    if (!imageSrc) return;
    const base64Image = imageSrc.split(",")[1];
    const key = await uploadToS3(base64Image);

    const routeObject: routeInput = {
      pathname: STATUS !== "Offline" ? "/results" : "/offline",
      query: {
        q: null,
        imageSearch: true,
        imageName: config.s3_bucket_prefix + key,
        component: selectedChoice !== "All" ? selectedChoice : null,
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
    setUpload(true);
    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      return;
    }

    const imageFile = fileInput.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = async () => {
      const image = reader.result as string;
      setImageSrc(image);

      if (
        typeof image === "string" &&
        ENDPOINT !== undefined &&
        useComponents
      ) {
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
          <AddAPhotoIcon
            className={styles.AddAPhotoIcon}
            onClick={handleButtonClick}
          />
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={getImageComponents}
          />
        </div>
        <VendorMenu />
      </div>
    </>
  );
};
