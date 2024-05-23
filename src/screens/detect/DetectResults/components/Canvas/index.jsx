import { Canvas } from "@shopify/react-native-skia";
import React from "react";
import { useScreenUtils } from "~hooks";

export function KCCanvas({ images, googleVision, roboflow, ...props }) {
  const refCanvas = React.useRef(null);

  const { dimensions, safeAreaInsets } = useScreenUtils();
  React.useEffect(() => {
    // if (refCanvas.current) {
    //   const ctx = refCanvas.current.getContext("2d");
    //   if (roboflow.data) {
    //     const img = new CanvasImage(refCanvas.current);
    //     img.src = roboflow.data[0].src;
    //     img.addEventListener("load", () => {
    //       ctx.drawImage(
    //         img,
    //         0,
    //         0,
    //         dimensions.screen.width - 100,
    //         dimensions.screen.height / 6
    //       );
    //     });
    //     img.addEventListener("error", (err) => {
    //       console.error("Failed to load image:", err);
    //     });
    //   }
    // }
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
