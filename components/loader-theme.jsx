import React from "react";
import { useTheme } from "next-themes";

export const LoaderTheme = ({ children }) => {
  const { theme } = useTheme();
  const loaderColor = theme === "dark" ? "#ffffff" : "#000000";
  // Clone the loader component with the color prop
  return React.cloneElement(children, { color: loaderColor });
};
