"use client";

import { cn } from "@/lib/utils";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const PasswordInput = ({ className, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        className={cn("hide-password-toggle pr-10", className)}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? (
          <IoMdEye className="h-4 w-4" aria-hidden="true" />
        ) : (
          <IoMdEyeOff className="h-4 w-4" aria-hidden="true" />
        )}
      </Button>

      {/* hides browsers password toggles */}
      <style>{`
        .hide-password-toggle::-ms-reveal,
        .hide-password-toggle::-ms-clear {
          visibility: hidden;
          pointer-events: none;
          display: none;
        }
      `}</style>
    </div>
  );
};
