import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import React from "react";

const font = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

export const Header = ({ label, title = "Auth" }) => {
  return (
    <div className="w-full flex flex-col gap-y-3 items-center justify-center">
      <h1 className={cn("text-3xl font-semibold", font.className)}>{title}</h1>
      <p className="text-muted-foreground text-sm font-medium">{label}</p>
    </div>
  );
};
