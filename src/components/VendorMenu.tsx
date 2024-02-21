import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import styles from "../styles/SearchBar.module.css";

import { Button, Menu, MenuItem } from "@mui/material";
import { useSearchStore } from "../lib/searchStore";

function VendorMenuItem(props: { vendor: string }) {
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    useSearchStore.setState({
      vendor: props.vendor || "All",
    });
  };

  return <MenuItem onClick={handleMenuClick}>{props.vendor}</MenuItem>;
}

function VendorMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const vendor = useSearchStore((state) => state.vendor);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    useSearchStore.setState({
      vendor: event.currentTarget.textContent || "All",
    });
    console.log(event.currentTarget.textContent);
  };

  return (
    <div className={styles.menuWrapper}>
      <Button
        id="vendor-menu"
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        // I want to make the size a constant, so it doesnt expand based on text size.
        sx={{
          color: "black",
          backgroundColor: "white",
          border: "1px solid darkgrey",
          borderRadius: "0px",
          width: "110px", // Set your desired width
          overflow: "hidden", // Prevent the text from overflowing
          padding: "5px, 0, 5px, 0",
          ":hover": {
            backgroundColor: "white",
          },
        }}
      >
        {vendor}
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <VendorMenuItem vendor="HM" />
        <VendorMenuItem vendor="Zara" />
        <VendorMenuItem vendor="Wayfair" />
        <VendorMenuItem vendor="All" />
      </Menu>
    </div>
  );
}

export default VendorMenu;
