import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export const CardSkeleton = () => {
  return (
    <Card className="relative overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <CardHeader className="p-4">
        <Skeleton className="h-60 rounded-lg" />
      </CardHeader>
      <CardContent className="px-4">
        <Skeleton className="h-6 mb-2" />
        <Skeleton className="h-20" />
      </CardContent>
      <CardFooter className="flex justify-between px-4 pb-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-md" />
          <div>
            <Skeleton className="h-2 w-24" />
            <Skeleton className="h-2 w-16 mt-1" />
          </div>
        </div>
        <Skeleton className="h-8 w-16" />
      </CardFooter>
    </Card>
  );
};
