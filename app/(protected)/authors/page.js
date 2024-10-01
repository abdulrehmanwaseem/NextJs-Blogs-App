import { AuthorInfo } from "@/components/author/author-info";
import { AuthorSkeleton } from "@/components/author/author-skeleton";
import { PaginationComponent } from "@/components/filters/pagination";
import { Search } from "@/components/filters/search";
import { Sorting } from "@/components/filters/sorting";
import RecordsNotFound from "@/components/records-not-found";
import { Card } from "@/components/ui/card";
import { Await, fallbackSkeletion } from "@/lib/utils";
import { getAllAuthors } from "@/services/author";
import { Suspense } from "react";

const AuthorsPage = async ({ searchParams }) => {
  const { search, sortOrder, sortBy, page } = searchParams;
  const sortOrderValue = typeof sortOrder === "string" ? sortOrder : "asc";
  const sortByValue = typeof sortBy === "string" ? sortBy : "createdAt";
  const searchValue = typeof search === "string" ? search : undefined;
  const currentPage = typeof page === "string" ? parseInt(page) : 1;

  const authorsPromise = getAllAuthors({
    searchValue,
    sortOrderValue,
    sortByValue,
    page: currentPage,
    perPage: 10,
  });

  const { totalPages } = await authorsPromise;

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
      <Card className="grid grid-cols-2 bg-secondary gap-10 p-4 ">
        <Suspense
          fallback={fallbackSkeletion({ Skeleton: AuthorSkeleton, count: 9 })}
        >
          <Await promise={authorsPromise}>
            {({ authorsData: data }) =>
              data?.length > 0 ? (
                data.map((author) => (
                  <AuthorInfo key={author.id} label={true} author={author} />
                ))
              ) : (
                <RecordsNotFound />
              )
            }
          </Await>
        </Suspense>
      </Card>
    </div>
  );
};
export default AuthorsPage;
