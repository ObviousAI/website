import React, { useRef, useEffect } from "react";

interface ImageCanvasProps {
  imageSrc: string;
}

const ImageCanvas: React.FC<ImageCanvasProps> = ({ imageSrc }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    console.log("here");

    const loadAndDrawImage = () => {
      if (canvas && img) {
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const MAX_WIDTH = 300;
        const MAX_HEIGHT = 500;
        let scale = Math.min(MAX_WIDTH / img.width, MAX_HEIGHT / img.height);
        if (scale > 1) scale = 1;

        const scaledWidth = img.width * scale;
        const scaledHeight = img.height * scale;

        canvas.width = scaledWidth;
        canvas.height = scaledHeight;
        ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);
      }
    };

    if (img && img.complete) {
      loadAndDrawImage();
    } else if (img) {
      img.onload = loadAndDrawImage;
    }
  }, [imageSrc]);

  return (
    <div style={{ marginTop: "20px", marginBottom: "20px" }}>
      <canvas ref={canvasRef} id="canvas" />
      <img
        ref={imageRef}
        src={imageSrc}
        alt="Uploaded preview"
        style={{ display: "none" }}
      />
    </div>
  );
};

export { ImageCanvas };
