"use client";

import Link from "next/link";
import { Button } from "../ui/button";

export const BackButton = ({ href, label, className = "w-full" }) => {
  return (
    <Button variant="link" className={className} size="sm" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};
