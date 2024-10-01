"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useDebounce } from "use-debounce";
import { Input } from "../ui/input";

export const Search = ({ search }) => {
  const { replace } = useRouter();
  const pathname = usePathname();

  const [text, setText] = useState(search);
  const [query] = useDebounce(text, 500);

  useEffect(() => {
    const queryParams = new URLSearchParams();
    if (query) {
      queryParams.set("search", query);
    } else {
      queryParams.delete("search");
    }

    // router.push(`/authors?${queryParams.toString()}`);
    replace(`${pathname}?${queryParams.toString()}`);
  }, [query]);

  return (
    <div className="relative">
      <Input
        value={text}
        placeholder="Search here..."
        className="w-72"
        onChange={(e) => setText(e.target.value)}
      />
      <span className="absolute right-3 top-2">
        <HiMagnifyingGlass
          className="h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </span>
    </div>
  );
};
