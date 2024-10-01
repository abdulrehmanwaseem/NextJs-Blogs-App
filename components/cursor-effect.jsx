"use client";
import { useRef, useState } from "react";
import { Cursor } from "./cursor-core";
import { AnimatePresence, motion } from "framer-motion";
import { BackButton } from "./auth/back-button";
import { FaArrowRightFromBracket } from "react-icons/fa6";

export function CursorEffect({ children }) {
  const [isHovering, setIsHovering] = useState(false);
  const targetRef = useRef(null);

  const handlePositionChange = (x, y) => {
    if (targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      const isInside =
        x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
      setIsHovering(isInside);
    }
  };

  return (
    <div>
      <Cursor
        attachToParent
        variants={{
          initial: { scale: 0.3, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          exit: { scale: 0.3, opacity: 0 },
        }}
        springConfig={{
          bounce: 0.001,
        }}
        transition={{
          ease: "easeInOut",
          duration: 0.15,
        }}
        onPositionChange={handlePositionChange}
      >
        <motion.div
          animate={{
            width: isHovering ? "auto" : 16,
            height: isHovering ? 32 : 16,
            padding: isHovering ? "0 8px" : 0, // Adding padding only when hovering
          }}
          className="flex items-center justify-center rounded-[24px] bg-black/30 backdrop-blur-md"
        >
          <AnimatePresence>
            {isHovering ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="inline-flex items-center justify-center"
              >
                <div className="inline-flex items-center text-sm text-white whitespace-nowrap">
                  <BackButton
                    href={"/settings"}
                    className={"text-start w-20 text-white"}
                    label={"Read More"}
                  />

                  <FaArrowRightFromBracket className="h-4 w-4" />
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </Cursor>
      <div ref={targetRef}>{children}</div>
    </div>
  );
}
