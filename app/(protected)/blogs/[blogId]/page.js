import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import UserAvatar from "@/components/user-avatar";
import { getBlogById } from "@/services/blogs";
import "@smastrom/react-rating/style.css";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import CommentForm from "./comment-form";
import CommentsList from "./comments";
import RatingForm from "./rating-form";

const BlogDetailsPage = async ({ params }) => {
  const blog = await getBlogById(params.blogId);
  if (!blog) {
    return <Card>🥲 Nothing found</Card>;
  }

  return (
    <Card className="flex flex-col w-full gap-6 p-6 lg:p-10">
      {/* Blog Image */}
      <Image
        src={blog?.image}
        alt={blog?.title}
        width={1200}
        height={500}
        className="w-full max-h-80 object-cover rounded-lg shadow-lg"
        priority
      />

      {/* Blog Content */}
      <div className="border-b pb-4 space-y-2">
        <h2 className="scroll-m-20 text-3xl lg:text-4xl font-bold tracking-tight first:mt-0 break-words">
          {blog?.title}
        </h2>
        <p className="text-muted-foreground break-words">{blog?.description}</p>
      </div>

      {/* Author */}
      <address className="flex flex-col lg:flex-row gap-4 -my-3 justify-between items-center border-b pb-4 not-italic">
        <div className="inline-flex items-center mr-3 text-sm">
          <Link className="cursor-pointer" href={`/authors/${blog?.authorId}`}>
            <UserAvatar
              quality={80}
              src={blog?.authorImage}
              className={"mr-4"}
              width={56}
              height={56}
              fallBackSize={28}
              sizes="56px"
            />
          </Link>
          <div>
            <Link
              href={`/authors/${blog?.authorId}`}
              className="text-xl font-bold"
            >
              {blog?.authorName}
            </Link>
            <p className="text-muted-foreground">
              {blog?.authorBio || "No bio available"}
            </p>
          </div>
        </div>
        <div className="flex flex-row lg:flex-col gap-2 lg:gap-1">
          <Badge className="rounded-sm h-6">
            ⭐ {blog.averageRating} Ratings
          </Badge>
          <Badge className="rounded-sm h-6">
            📅 {moment(blog?.createdAt).format("DD MMM YYYY")}
          </Badge>
        </div>
      </address>

      {/* Blog Content */}
      <div className="leading-7 max-w-none break-words">
        <div
          dangerouslySetInnerHTML={{
            __html: blog?.content || "<p>not data found</p>",
          }}
        />
      </div>
      {/* Rating Content */}
      <RatingForm blogId={params?.blogId} rating={blog?.userRating} />

      {/* Discussion Input */}
      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0">
          Discussion ({blog?.commentCount})
        </h2>
        <CommentForm blogId={params?.blogId} />
      </div>

      {/* Comments */}
      <div className="space-y-4">
        <CommentsList comments={blog?.comments} blogId={params.blogId} />
      </div>
    </Card>
  );
};

export default BlogDetailsPage;
