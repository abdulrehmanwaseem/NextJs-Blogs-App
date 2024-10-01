"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { cn } from "@/lib/utils";

export function Cursor({
  children,
  className,
  springConfig,
  attachToParent,
  variants,
  transition,
  onPositionChange,
}) {
  const cursorX = useMotionValue(
    typeof window !== "undefined" ? window.innerWidth / 2 : 0
  );
  const cursorY = useMotionValue(
    typeof window !== "undefined" ? window.innerHeight / 2 : 0
  );
  const cursorRef = useRef(null);
  const [isVisible, setIsVisible] = useState(!attachToParent);

  useEffect(() => {
    if (!attachToParent) {
      document.body.style.cursor = "none";
    } else {
      document.body.style.cursor = "auto";
    }

    const updatePosition = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      onPositionChange?.(e.clientX, e.clientY);
    };

    document.addEventListener("mousemove", updatePosition);

    return () => {
      document.removeEventListener("mousemove", updatePosition);
    };
  }, [cursorX, cursorY, onPositionChange, attachToParent]);

  const cursorXSpring = useSpring(cursorX, springConfig || { duration: 0 });
  const cursorYSpring = useSpring(cursorY, springConfig || { duration: 0 });

  useEffect(() => {
    const handleVisibilityChange = (visible) => {
      setIsVisible(visible);
    };

    if (attachToParent && cursorRef.current) {
      const parent = cursorRef.current.parentElement;
      if (parent) {
        const onMouseEnter = () => {
          parent.style.cursor = "none";
          handleVisibilityChange(true);
        };
        const onMouseLeave = () => {
          parent.style.cursor = "auto";
          handleVisibilityChange(false);
        };

        parent.addEventListener("mouseenter", onMouseEnter);
        parent.addEventListener("mouseleave", onMouseLeave);

        return () => {
          parent.removeEventListener("mouseenter", onMouseEnter);
          parent.removeEventListener("mouseleave", onMouseLeave);
        };
      }
    }
  }, [attachToParent]);

  return (
    <motion.div
      ref={cursorRef}
      className={cn("pointer-events-none fixed left-0 top-0 z-50", className)}
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={transition}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
