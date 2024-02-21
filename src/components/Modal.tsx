import React from "react";

import { Modal, Box, Typography, Button, Checkbox } from "@mui/material";

import { ImageCanvas } from "./ImageUploaderCanvas";
import { modalInput } from "../helpers";
import { useSearchStore } from "../lib/searchStore";
import styles from "../styles/SearchBar.module.css";

const SearchModal = (props: modalInput) => {
  const useComponents = useSearchStore(
    (state: { useComponents: any }) => state.useComponents
  );
  const rootRef = React.useRef<HTMLDivElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const {
    upload,
    choices,
    imageSrc,
    selectedChoice,
    handleSubmitButton,
    getImageComponents,
    setUpload,
    setImageSrc,
    setChoices,
    setSelectedChoice,
  } = props;

  return (
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
          width: "50%",
          maxWidth: 600,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 5,
          p: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 1,
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
                }}
              >
                <option value="" disabled={!useComponents}>
                  All
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
        <Box sx={{ display: "flex", flexDirection: "column" }}>
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
            submit choice
          </Button>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Checkbox
              sx={{
                margin: "5px 0 5px",
                color: "#000000",
                height: "10px",
              }}
              checked={useComponents}
              onChange={(e) => getImageComponents()}
            />
            <Typography
              sx={{
                fontSize: "0.7em",
              }}
            >
              Use Component-Specific Search (Beta)
            </Typography>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default SearchModal;
