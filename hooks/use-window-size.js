import { useState, useEffect } from "react";

export function useWindowSize() {
  // Initialize state with the current window dimensions
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call when the window is resized
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call the handler immediately to set the initial size
    handleResize();

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures the effect is only run on mount and unmount

  return windowSize;
}
