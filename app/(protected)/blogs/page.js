import { BlogCards } from "@/components/blog/blog-cards";
import { CardSkeleton } from "@/components/blog/card-skeleton";
import { PaginationComponent } from "@/components/filters/pagination";
import { Search } from "@/components/filters/search";
import { Sorting } from "@/components/filters/sorting";
import { Card } from "@/components/ui/card";

import { Await, fallbackSkeletion } from "@/lib/utils";
import { getBlogs } from "@/services/blogs";
import { Suspense } from "react";

const BlogsPage = async ({ searchParams }) => {
  const { search, sortOrder, sortBy, page } = searchParams;
  const sortOrderValue = typeof sortOrder === "string" ? sortOrder : "asc";
  const sortByValue = typeof sortBy === "string" ? sortBy : "createdAt";
  const searchValue = typeof search === "string" ? search : undefined;
  const currentPage = typeof page === "string" ? parseInt(page) : 1;

  const blogsPromise = getBlogs({
    search: searchValue,
    sortOrder: sortOrderValue,
    sortBy: sortByValue,
    page: currentPage,
    perPage: 10,
  });

  const { totalPages } = await blogsPromise;

  return (
    <div className="flex flex-col gap-4 w-full">
      <Card className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Search search={searchValue} />
          <Sorting
            search={searchValue}
            sortBy={sortByValue}
            sortOrder={sortOrderValue}
          />
        </div>
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </Card>

      <Card className="grid grid-cols-2 bg-secondary gap-10 p-4">
        <Suspense
          fallback={fallbackSkeletion({ Skeleton: CardSkeleton, count: 9 })}
        >
          <Await promise={blogsPromise}>
            {({ blogs }) => <BlogCards data={blogs} />}
          </Await>
        </Suspense>
      </Card>
    </div>
  );
};

export default BlogsPage;
