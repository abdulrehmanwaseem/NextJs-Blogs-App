"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const PaginationComponent = ({ currentPage, totalPages }) => {
  const { replace } = useRouter();
  const pathname = usePathname();

  const [page, setPage] = useState(currentPage);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams();
    if (page !== 1) {
      queryParams.set("page", page);
    } else {
      queryParams.delete("page");
    }

    replace(`${pathname}?${queryParams.toString()}`);
  }, [page]);

  const handlePrevious = () => {
    if (page > 1) {
      handlePageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      handlePageChange(page + 1);
    }
  };

  const getPageItems = () => {
    const pageItems = [];
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 2);

    // First Page
    pageItems.push(
      <PaginationItem key={1}>
        <PaginationLink
          onClick={() => handlePageChange(1)}
          isActive={1 === currentPage}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    // Start ellipsis
    if (startPage > 2) {
      pageItems.push(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Add pages around the current page
    for (let i = startPage; i <= endPage; i++) {
      pageItems.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => handlePageChange(i)}
            isActive={i === currentPage}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // End ellipsis
    if (endPage < totalPages - 1) {
      pageItems.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // last page
    if (totalPages > 1 && totalPages !== endPage) {
      pageItems.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            onClick={() => handlePageChange(totalPages)}
            isActive={totalPages === currentPage}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pageItems;
  };

  return (
    <Pagination className={"mx-0 justify-end"}>
      <PaginationContent>
        {/* Prev Page Btn */}
        <PaginationItem>
          <PaginationPrevious onClick={handlePrevious} />
        </PaginationItem>

        {/* Pages */}
        {getPageItems()}

        {/* Next Page Btn */}
        <PaginationItem>
          <PaginationNext onClick={handleNext} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
