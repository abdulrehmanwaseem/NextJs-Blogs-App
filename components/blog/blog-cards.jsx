import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CursorEffect } from "../cursor-effect";
import Link from "next/link";
import RecordsNotFound from "../records-not-found";
import moment from "moment";
import Image from "next/image";
import UserAvatar from "../user-avatar";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const BlogCards = async ({ data }) => {
  await delay(4000);
  return (
    <>
      {data.length === 0 && <RecordsNotFound />}
      {data?.map((blog) => (
        <CursorEffect key={blog?.id}>
          <Card className="relative overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:border-2 hover:border-gradient-to-r hover:border-rose from-pink-500 via-red-500 to-yellow-500">
            <Link className="cursor-none " href={`/blogs/${blog?.id}`}>
              <CardHeader className="p-4">
                <div className="relative h-60 w-full">
                  <Image
                    src={blog?.image}
                    alt={blog?.title}
                    className="rounded-lg object-cover"
                    fill
                    sizes="(max-width: 640px) 100vw, 640px"
                    quality={75}
                    placeholder="blur"
                    blurDataURL={blog?.image}
                  />
                </div>
              </CardHeader>
              <CardContent className="px-4">
                <CardTitle className="truncate pb-1">{blog?.title}</CardTitle>
                <CardDescription className="line-clamp-5">
                  {blog?.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="flex justify-between -mt-3 px-4 pb-4">
                <div className="flex items-center gap-2">
                  <UserAvatar
                    quality={80}
                    width={41}
                    height={41}
                    sizes={"41px"}
                    className="rounded-md"
                    src={blog?.authorImage}
                  />
                  <span>
                    <p className="text-sm font-semibold">{blog?.authorName}</p>
                    <p className="text-xs font-light text-neutral-400 mt-[0.15rem]">
                      {moment(blog?.createdAt).fromNow()}
                    </p>
                  </span>
                </div>
                <Badge className={"h-10"}>⭐ {blog?.averageRating}</Badge>
              </CardFooter>
            </Link>
          </Card>
        </CursorEffect>
      ))}
    </>
  );
};
