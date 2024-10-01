"use client";

import { logout } from "@/actions/authActions";
import { toast } from "sonner";

export const LogoutButton = ({ children }) => {
  const onClick = () => {
    logout().then(() => {
      toast.success("User logged out successfully");
    });
  };

  return (
    <span className="cursor-pointer" onClick={onClick}>
      {children}
    </span>
  );
};
