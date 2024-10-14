import { useRef, useEffect } from "react";

const ImageCanvas = ({ src, alt }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.src = src;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
  }, [src]);

  return <canvas ref={canvasRef} alt={alt}></canvas>;
};

export default ImageCanvas;
