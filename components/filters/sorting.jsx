"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const Sorting = ({ search, sortOrder, sortBy }) => {
  const { replace } = useRouter();
  const pathname = usePathname();

  const [sorting, setSorting] = useState({
    sortOrder,
    sortBy,
  });

  useEffect(() => {
    const { sortOrder, sortBy } = sorting;

    const queryParams = new URLSearchParams();
    if (search) queryParams.set("search", search);
    if (sortOrder) queryParams.set("sortOrder", sortOrder);
    if (sortBy) queryParams.set("sortBy", sortBy);

    replace(`${pathname}?${queryParams.toString()}`);
  }, [sorting]);

  return (
    <>
      <Select
        value={sorting.sortBy || "Created At"}
        onValueChange={(value) =>
          setSorting((prev) => ({ ...prev, sortBy: value }))
        }
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="createdAt">Created At</SelectItem>
          <SelectItem value="name">Name</SelectItem>
        </SelectContent>
      </Select>
      <Button
        className="h-8 pr-[0.60rem] pl-[0.60rem]"
        onClick={() =>
          setSorting((prev) => ({
            ...prev,
            sortOrder: prev.sortOrder === "asc" ? "desc" : "asc",
          }))
        }
      >
        {sorting.sortOrder === "asc" ? (
          <FaSortAmountDown size={16} />
        ) : (
          <FaSortAmountUp size={16} />
        )}
      </Button>
    </>
  );
};
