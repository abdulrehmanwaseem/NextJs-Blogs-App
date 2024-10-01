"use client";

import { Card, CardContent, CardHeader, CardFooter } from "../ui/card";
import { Header } from "./header";
import { Social } from "./social";
import { BackButton } from "./back-button";

export const CardWrapper = ({
  children,
  headerLabel,
  headerTitle,
  backButtonLabel,
  backButtonHref,
  showSocial,
}) => {
  return (
    <Card className="w-[415px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} title={headerTitle} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter className="-mt-1">
        <BackButton href={backButtonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  );
};
