import { useState, useEffect } from "react";

const useScrollToPreviousPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const blogsContainer = document.getElementById("blog-cards-container");
    if (blogsContainer) {
      const previousScrollPosition = scrollPosition;
      setScrollPosition(blogsContainer.scrollTop);
      window.scrollTo(0, previousScrollPosition);
    }
  }, []);

  return scrollPosition;
};

export default useScrollToPreviousPosition;
