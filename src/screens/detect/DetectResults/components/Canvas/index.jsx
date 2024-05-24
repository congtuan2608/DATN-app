import { Canvas } from "@shopify/react-native-skia";
import React from "react";
import { Image } from "react-native-canvas";
import { useScreenUtils } from "~hooks";

export function KCCanvas({ images, googleVision, roboflow, ...props }) {
  const refCanvas = React.useRef(null);

  const { dimensions, safeAreaInsets } = useScreenUtils();
  React.useEffect(() => {
    if (refCanvas.current) {
      const imgCanvas = new Image();
      imgCanvas.src = images[0]?.uri || "";
      // const canvas = refCanvas.current.createCanvas(
      //   imgCanvas.width,
      //   imgCanvas.height
      // );
      const context = refCanvas.current.getContext("2d");
      context.drawImage(imgCanvas, 0, 0, imgCanvas.width, imgCanvas.height);

      (roboflow?.data ?? [])[0].predictions.forEach((prediction) => {
        const left = prediction.x - prediction.width / 2;
        const top = prediction.y - prediction.height / 2;
        const color = getRandomColor();
        context.beginPath();
        context.rect(left, top, prediction.width, prediction.height);
        context.lineWidth = 4;
        context.strokeStyle = color;
        context.fillStyle = color;
        context.stroke();
        // Add text inside the rectangle
        context.font = "20px Arial";
        context.fillStyle = color;
        context.fillText(prediction.class, left, top - 5);
      });
    }
  }, [refCanvas.current, images, googleVision.data, roboflow.data]);

  return (
    <Canvas
      ref={refCanvas}
      style={{
        width: "100%",
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    />
  );
}
