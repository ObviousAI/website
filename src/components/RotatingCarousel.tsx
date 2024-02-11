import React, { useState, useEffect } from "react";
import styles from "../styles/RotatingCarousel.module.css";
import { image1, image2, image3, image4 } from "./images";
import Image from "next/image";

const RotatingCarousel = () => {
  const images = [
    image1,
    image2,
    image3,
    image4,
    image1,
    image2,
    image3,
    image4,
    image1,
    image2,
    image3,
    image4,
    image1,
    image2,
    image3,
    image4,
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={styles.carsouselContainer}>
      <div className={styles.carouselImages}>
        {images.map((image, index) => (
          <Image
            key={index}
            className={`${styles.carouselImage} ${
              index === currentImageIndex ? styles.active : ""
            }`}
            src={image.src}
            alt={`Image ${index + 1}`}
            width={image.width}
            height={image.height}
          />
        ))}
      </div>
    </div>
  );
};

export default RotatingCarousel;
