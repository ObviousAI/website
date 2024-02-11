import React, { useState, useRef } from "react";
import styles from "../styles/ImageCard.module.css";

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
} from "@mui/material";

const HoverableImageCard = (item: any) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const usedItem = item.item;

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (textRef.current && textRef.current.textContent) {
      console.log(textRef.current.textContent);
      setShowTooltip(textRef.current.textContent.length > 22);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowTooltip(false);
  };

  console.log(item);
  return (
    <CardActionArea href={usedItem.product_url}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          cursor: "pointer",
          textDecoration: "none",
          color: "inherit",
          "&:hover": {
            textDecoration: "none",
            color: "inherit",
          },
          height: 300, // Fixed height for the card
          width: 1, // 100% width relative to the grid item
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardMedia
          component="img"
          image={isHovered ? usedItem.main_image_url : usedItem.main_image_url}
          alt={item.name}
          sx={{
            // objectFit: "contain",
            height: 200, // Fixed height for the image
          }}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flexGrow: 1,
            padding: 1,
          }}
        >
          <div
            ref={textRef}
            className={styles.truncateTextContainer}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Typography
              gutterBottom
              variant="subtitle2"
              component="div"
              className={styles.truncateText}
            >
              {usedItem.name}
            </Typography>
            {isHovered && showTooltip && (
              <span className={styles.tooltip}>{usedItem.name}</span>
            )}
          </div>
          <Typography variant="caption" color="textSecondary">
            Vendor: {usedItem.vendor}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Price: {usedItem.price}
          </Typography>
          {/* Other properties can be added similarly */}
        </CardContent>
      </Card>
    </CardActionArea>
  );
};

export default HoverableImageCard;
