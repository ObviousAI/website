import React from "react";
import { IconButton, Snackbar, Container, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function DataSnackbar(props: {
  open: boolean;
  setOpen: (open: boolean) => void;
  message: string;
}) {
  function handleClose() {
    props.setOpen(false);
  }

  return (
    <Snackbar autoHideDuration={10000} open={props.open}>
      <Container
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#DB5461",
          padding: "5%",
          borderRadius: "5px",
          color: "white",
          width: "100%",
          margin: "auto",
        }}
      >
        <Typography>{props.message}</Typography>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Container>
    </Snackbar>
  );
}

export { DataSnackbar };
