"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import {
  Input,
} from "@/components/MaterialComponents/Material-Tailwind";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
const Search = ({ search }) => {
  const router = useRouter();
  const initialRender = useRef(true);

  const [text, setText] = useState(search);
  const [query] = useDebounce(text, 750);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (!query) {
      router.push("/shop");
    } else {
      router.push(`/shop?search=${query}`);
    }
  }, [query]);

  return (
    <div className="relative rounded-md shadow-sm">
      <Input
        label="Search"
        value={text}
        onChange={(e) => setText(e.target.value)}
        icon={<MagnifyingGlassIcon className="h-5 w-5" />}
      />
    </div>
  );
};

export default Search;
