import { HeroPage } from "@/components/hero-page";

import { CardSkeleton } from "@/components/blog/card-skeleton";
import { Await, fallbackSkeletion } from "@/lib/utils";
import { Suspense } from "react";
import { BlogCards } from "@/components/blog/blog-cards";
import {
  getMostCommentedBlogs,
  getRecentBlogs,
  getTopRatedBlogs,
} from "@/services/blogs";

export default function HomePage() {
  const recentBlogsPromise = getRecentBlogs();
  const topRatedBlogsPromise = getTopRatedBlogs();
  const mostCommentedBlogsPromise = getMostCommentedBlogs();

  return (
    <>
      <HeroPage />
      <div className="space-y-14 px-6 lg:px-16 mb-12">
        <div className="relative text-center">
          <h1 className="scroll-m-20 text-4xl font-black tracking-tight lg:text-5xl">
            Recent Blogs
          </h1>
        </div>
        <div
          id="blog-cards-container"
          className={"grid grid-cols-1 lg:grid-cols-3 gap-10 "}
        >
          <Suspense
            fallback={fallbackSkeletion({ Skeleton: CardSkeleton, count: 9 })}
          >
            <Await promise={recentBlogsPromise}>
              {(blogs) => <BlogCards data={blogs} />}
            </Await>
          </Suspense>
        </div>

        <div className="relative text-center">
          <h1 className="scroll-m-20 text-4xl font-black tracking-tight lg:text-5xl">
            Top Rated Blogs
          </h1>
        </div>
        <div
          id="blog-cards-container"
          className={"grid grid-cols-1 lg:grid-cols-3 gap-10 "}
        >
          <Suspense
            fallback={fallbackSkeletion({ Skeleton: CardSkeleton, count: 9 })}
          >
            <Await promise={topRatedBlogsPromise}>
              {(blogs) => {
                const sortedBlogs = blogs.sort(
                  (a, b) => b.averageRating - a.averageRating
                );
                return <BlogCards data={sortedBlogs} />;
              }}
            </Await>
          </Suspense>
        </div>
        <div className="relative text-center">
          <h1 className="scroll-m-20 text-4xl font-black tracking-tight lg:text-5xl">
            Most Commented Blogs
          </h1>
        </div>
        <div
          id="blog-cards-container"
          className={"grid grid-cols-1 lg:grid-cols-3 gap-10"}
        >
          <Suspense
            fallback={fallbackSkeletion({ Skeleton: CardSkeleton, count: 9 })}
          >
            <Await promise={mostCommentedBlogsPromise}>
              {(blogs) => {
                const sortedBlogs = blogs.sort(
                  (a, b) => b.commentCount - a.commentCount
                );
                return <BlogCards data={sortedBlogs} />;
              }}
            </Await>
          </Suspense>
        </div>
      </div>
    </>
  );
}
