import Backdrop from "@mui/material/Backdrop";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });

const LoaderSsbeaty = ({ isOpen = true }: any) => {
  const [animationData, setAnimationData] = useState<any>();

  useEffect(() => {
    import("./loader.json").then(setAnimationData);
  }, []);

  return (
    <Backdrop sx={{ color: "#fff", zIndex: (theme) => 99999 }} open={isOpen}>
      <Lottie
        loop
        animationData={animationData}
        play
        style={{ width: 150, height: 150 }}
      />
    </Backdrop>
  );
};

export default LoaderSsbeaty;
