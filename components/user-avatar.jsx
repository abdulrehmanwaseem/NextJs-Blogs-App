import { FaUser } from "react-icons/fa";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Image from "next/image";
import { cn } from "@/lib/utils";

const UserAvatar = ({
  src,
  quality = 75,
  sizes = "40px",
  width = 40,
  height = 40,
  className,
  fallBackSize = 18,
  ...props
}) => {
  return (
    <Avatar className={className} style={{ width, height }}>
      {src ? (
        <Image
          src={src}
          className={cn(
            "rounded-full object-cover border-2 border-neutral-500",
            className
          )}
          width={100}
          height={100}
          sizes={"100px"}
          quality={quality}
          {...props}
        />
      ) : (
        <AvatarFallback className="bg-rose">
          <FaUser size={fallBackSize} className="text-white" />
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
