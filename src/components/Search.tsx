"use client";

import { useServices } from "@contexts/services";
import { SearchIcon } from "@icons";
import Link from "next/link";
import { LegacyRef, startTransition, useMemo, useRef, useState } from "react";
import { IService } from "types/service";
import { useOnClickOutside } from "usehooks-ts";
import Button from "./Button";
import Tag from "./Tag";

interface IEntries {
  id: number;
  title: string;
  slug: string;
  categoryTitle?: string;
}

const Search = () => {
  const { categories } = useServices();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<IEntries[]>([]);
  const searchRef: LegacyRef<HTMLDivElement> = useRef(null);
  useOnClickOutside(searchRef, () => setResults([]));

  const entries = useMemo(() => {
    const services: IEntries[] = [];
    categories.forEach((category) => {
      services.push({
        id: category.id,
        title: category.title,
        slug: category.slug,
      });
      category.services?.forEach(
        (service: Pick<IService, "id" | "slug" | "title">) =>
          services.push({
            id: service.id,
            title: service.title,
            slug: service.slug,
            categoryTitle: category.title,
          })
      );
    });

    return services;
  }, [categories]);

  const handleInputChange = (event: any) => {
    const query = event.target.value;
    setQuery(query);

    startTransition(() => {
      if (query.length > 1) {
        setResults([
          ...entries.filter((s) =>
            s.title.toLowerCase().includes(query.toLowerCase())
          ),
        ]);
      } else {
        setResults([]);
      }
    });
  };

  const handleFocus = () => {
    if (searchRef.current) {
      searchRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative" ref={searchRef}>
      <input
        className="appearance-none shadow-xl h-14 px-4 mt-7 rounded-xl focus-visible:outline-none placeholder:text-slate-400 focus:border-0 w-full"
        placeholder="Quel service recherchez-vous ?"
        onChange={handleInputChange}
        value={query}
        onFocus={handleFocus}
      />
      <Button className="absolute right-2 bottom-1.5">
        <SearchIcon />
      </Button>

      {results.length > 0 && (
        <div className="absolute bg-white py-3 z-10 w-full rounded mt-1 drop-shadow-md flex flex-col">
          {results.slice(0, 5).map(({ title, slug, categoryTitle }) => (
            <Link
              className="pl-4 py-2 hover:no-underline hover:bg-slate-100 flex items-center"
              href={`/services/${slug}`}
              key={slug}
            >
              {categoryTitle && (
                <>
                  <Tag
                    backgroundColor="bg-slate-200"
                    textColor="text-slate-700"
                    text={categoryTitle}
                  />
                  <span className="pl-1 pr-2"> - </span>
                </>
              )}{" "}
              {title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
