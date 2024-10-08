"use client";

import { useState, useLayoutEffect } from "react";
import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { useTheme } from "next-themes";
import { apiAuthPrefix, authRoutes, publicRoutes } from "@/routes";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const Navbar = ({ user }) => {
  const [logoUrl, setLogoUrl] = useState("/logo_light.png");
  const pathname = usePathname();
  const { theme, systemTheme } = useTheme();

  useLayoutEffect(() => {
    const detectTheme = theme === "system" ? systemTheme : theme;
    const onThemeToggle =
      detectTheme === "dark" ? "/logo_light.png" : "/logo.png";
    setLogoUrl(onThemeToggle);
  }, [theme, logoUrl]);

  if (
    authRoutes.includes(pathname) ||
    publicRoutes.includes(pathname) ||
    pathname.startsWith(apiAuthPrefix)
  ) {
    return null;
  }

  const links = [
    { label: "Home", href: "/" },
    { label: "Blogs", href: "/blogs" },
    ...(user.role === "AUTHOR"
      ? [{ label: "Create Blog", href: "/blogs/create" }]
      : []),
    ...(user.role === "ADMIN"
      ? [{ label: "Dashbaord", href: "/dashboard" }]
      : []),
    { label: "Authors", href: "/authors" },
    { label: "Contact Us", href: "/contact" },
    { label: "Settings", href: "/settings" },
  ];

  return (
    <>
      <div className="flex justify-center items-center pt-6 z-10 mx-4 lg:mx-0">
        <nav className="flex items-center justify-between px-4 rounded-xl w-full max-w-screen-lg h-16 shadow-sm bg-secondary">
          <div className="relative h-9 w-32">
            <Image
              src={logoUrl}
              alt="logo"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="hidden md:flex items-center gap-x-4">
            {links.map(({ label, href }) => (
              <Button
                key={href}
                asChild
                variant={pathname === href ? "default" : "outline"}
              >
                <Link href={href}>{label}</Link>
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button className="px-2 md:hidden">
                  <GiHamburgerMenu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full ">
                <SheetHeader className={"mb-6"}>
                  <SheetTitle>Navigation Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col items-center gap-y-6">
                  {links.map(({ label, href }) => (
                    <SheetClose key={href} asChild>
                      <Button
                        asChild
                        variant={pathname === href ? "default" : "outline"}
                      >
                        <Link href={href}>{label}</Link>
                      </Button>
                    </SheetClose>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
            <UserButton user={user} />
          </div>
        </nav>
      </div>
      <div className="fixed bottom-4 right-4 z-10">
        <ThemeToggle />
      </div>
    </>
  );
};
