import React from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { Box, Button, Modal, Typography } from "@mui/material";

import "../styles/SearchBar.module.css";
import styles from "../styles/SearchBar.module.css";

import { ImageCanvas } from "./ImageUploaderCanvas";
import {
  uploadToS3,
  getJsonResponse,
  searchRequestPayload,
  routeInput,
} from "../helpers";

const ENDPOINTURL = process.env.NEXT_PUBLIC_AWS_API_ENDPOINT;

export const SearchBar = () => {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [upload, setUpload] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [choices, setChoices] = useState<string[]>([]);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  const rootRef = React.useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const routeObject: routeInput = {
        pathname: "/results",
        query: {
          q: null,
          imageSearch: false,
          imageName: null,
          component: selectedChoice,
        },
      };
      router.push(routeObject);
    }
  };

  const handleSubmitButton = async () => {
    if (!imageSrc || !selectedChoice) return;
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
        imageName: key,
        component: encodedChoice,
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
      const image = reader.result;

      if (typeof image === "string" && ENDPOINTURL !== undefined) {
        setImageSrc(image); // Set the image source for canvas
        // Convert the image to base64 actually
        const base64Image = image.split(",")[1];
        const request: searchRequestPayload = {
          requestType: "POST",
          imageName: null,
          component: null,
          searchQuery: null,
          encodedImage: base64Image,
        };
        const components = await getJsonResponse(
          ENDPOINTURL,
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
      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open={upload}
        onClose={() => {
          setUpload(false);
          setImageSrc(null);
          setChoices([]);
          setSelectedChoice(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        }}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "100%",
        }}
        container={() => rootRef.current}
      >
        <Box
          sx={{
            position: "relative",
            width: "80%",
            maxWidth: 600,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 5,
            p: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {imageSrc && (
            <div>
              <ImageCanvas imageSrc={imageSrc} />
              <div className={styles.modalSelect}>
                <Typography
                  variant="subtitle1"
                  sx={{ marginBottom: 1, marginInline: "auto" }}
                >
                  Specify Choice:
                </Typography>
                <select
                  value={selectedChoice || ""}
                  onChange={(e) => setSelectedChoice(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    alignSelf: "center",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    marginBottom: "5%",
                  }}
                >
                  <option value="" disabled>
                    Select a choice
                  </option>
                  {choices.map((choice, index) => (
                    <option key={index} value={choice}>
                      {choice}
                    </option>
                  ))}
                </select>
              </div>
              <div />
            </div>
          )}
          <Button
            variant="outlined"
            sx={{
              maxWidth: 600,
              height: "2.5rem",
              backgroundColor: "#FFFFFF",
              minWidth: "80px",
              fontSize: "0.6rem",
              color: "#000000",
              borderColor: "#000000",
            }}
            onClick={handleSubmitButton}
          >
            Submit Choice
          </Button>
        </Box>
      </Modal>

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
      </div>
    </>
  );
};
