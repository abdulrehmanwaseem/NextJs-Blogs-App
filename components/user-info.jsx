import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader } from "./ui/card";
import { FaUser } from "react-icons/fa";
import moment from "moment";
import Image from "next/image";
import { LabeledData } from "./labeled-data";

export const UserInfo = ({ user, label }) => {
  return (
    <Card className="w-full lg:w-[500px] shadow-md">
      <CardHeader>
        <h2 className="scroll-m-20 border-b pb-2 text-3xl text-center font-semibold tracking-tight first:mt-0">
          {label}
        </h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <Avatar className="flex items-center justify-center">
          {user.image ? (
            <Image
              src={user.image}
              className="rounded-full object-cover border-2 border-neutral-500"
              width={128}
              height={128}
              sizes={"128px"}
              quality={90}
              priority
            />
          ) : (
            <AvatarFallback className="flex items-center justify-center w-32 h-32 bg-rose rounded-full">
              <FaUser size={60} className="text-white" />
            </AvatarFallback>
          )}
        </Avatar>

        <LabeledData label="ID" value={user?.id} />
        <LabeledData label="Name" value={user?.name} />
        <LabeledData label="Bio" value={user?.bio || "Bio not available"} />
        <LabeledData
          label="Email"
          value={user?.email || "Email not available"}
        />

        {!user?.isOAuth && (
          <>
            <LabeledData label="Role" value={user?.role} />
            <LabeledData
              label="Two Factor Authentication"
              value={user?.isTwoFactorEnabled ? "ON" : "OFF"}
              isBadge
            />
            <LabeledData
              label="Created At"
              value={moment(user?.createdAt).format("DD/MM/YYYY")}
            />
            <LabeledData
              label="Updated At"
              value={moment(user?.updatedAt).fromNow()}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
};
