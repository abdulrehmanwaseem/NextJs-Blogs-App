"use client";
import { useCallback, useEffect, useRef } from "react";

export function useIsMounted() {
  const isMounted = useRef(false); // unmounted by default

  useEffect(() => {
    isMounted.current = true; // mounted

    return () => {
      isMounted.current = false; // unmounted
    };
  }, []); // run once on mount

  return useCallback(() => isMounted.current, []); // return function that checks mounted status
}
