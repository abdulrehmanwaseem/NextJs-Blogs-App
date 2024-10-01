import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const AuthorSkeleton = () => {
  return (
    <Card key="skeleton" className="w-full lg:w-[480px] shadow-md">
      <CardContent className="space-y-4 mt-4">
        <div className="flex items-center justify-center">
          <Skeleton className="w-32 h-32 rounded-full" />
        </div>

        <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Name</p>
          <Skeleton className="h-4 w-24" />
        </div>

        <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Bio</p>
          <Skeleton className="h-4 w-32" />
        </div>

        <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Email</p>
          <Skeleton className="h-4 w-40" />
        </div>

        <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Joined At</p>
          <Skeleton className="h-4 w-20" />
        </div>

        <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Total Posts</p>
          <Skeleton className="h-4 w-10" />
        </div>

        <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Total Blogs Ratings</p>
          <Skeleton className="h-4 w-10" />
        </div>

        <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Total Blogs Comments</p>
          <Skeleton className="h-4 w-10" />
        </div>
      </CardContent>
    </Card>
  );
};
