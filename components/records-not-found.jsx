import { HiXCircle } from "react-icons/hi2";
import { Card } from "./ui/card";

const RecordsNotFound = () => {
  return (
    <Card className="relative col-span-full h-52 w-full p-12 flex flex-col items-center justify-center">
      <HiXCircle className="h-8 w-8 text-red-500" />
      <h3 className="font-semibold text-xl">No records found</h3>
      <p className="text-zinc-500 text-sm">
        We found no search results for these filters.
      </p>
    </Card>
  );
};

export default RecordsNotFound;
