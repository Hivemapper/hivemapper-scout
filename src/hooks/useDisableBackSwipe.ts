import { useEffect } from "react";

const useDisableBackSwipe = () => {
  useEffect(() => {
    document.body.style.overscrollBehaviorX = "none";
    return () => {
      document.body.style.overscrollBehaviorX = "auto";
    };
  }, []);
};

export default useDisableBackSwipe;
