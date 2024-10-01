import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Card, CardContent } from "../ui/card";
import { FaUser } from "react-icons/fa";
import moment from "moment";
import Image from "next/image";
import { LabeledData } from "../labeled-data";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const AuthorInfo = async ({ author }) => {
  // await delay(3000);
  return (
    <Card key={author.id} className="w-full lg:w-[480px] shadow-md">
      <CardContent className="space-y-4 mt-4">
        <Avatar className="flex items-center justify-center">
          {author?.image ? (
            <Image
              src={author.image}
              className="rounded-full object-cover border-2 border-neutral-500"
              width={128}
              height={128}
              sizes={"128px"}
              quality={100}
              priority
            />
          ) : (
            <AvatarFallback className="flex items-center justify-center w-32 h-32 bg-rose rounded-full">
              <FaUser size={60} className="text-white" />
            </AvatarFallback>
          )}
        </Avatar>

        <LabeledData label="Name" value={author?.name} />
        <LabeledData label="Bio" value={author?.bio || "Bio not available"} />
        <LabeledData
          label="Email"
          value={author?.email || "Email not available"}
        />
        <LabeledData
          label="Joined At"
          value={moment(author?.createdAt).format("DD/MM/YYYY")}
        />
        <LabeledData
          isBadge={true}
          label="Total Posts"
          value={author.totalPosts}
        />
        <LabeledData
          isBadge={true}
          label="Total Blogs Ratings"
          value={author.totalBlogsRatings}
        />
        <LabeledData
          isBadge={true}
          label="Total Blogs Comments"
          value={author.totalBlogsComments}
        />
      </CardContent>
    </Card>
  );
};
