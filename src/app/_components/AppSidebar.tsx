"use client";

import { Button } from "@/components/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArticleType } from "@/lib/types";
import useSWR from "swr";

export function AppSidebar() {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const { data: allArticles = [] } = useSWR<ArticleType[]>(
    `/articles`,
    fetcher
  );

  async function fetcher(path: string) {
    const response = await fetch("/api" + path);

    if (response.ok) {
      const { data } = await response.json();
      return data;
    }
    return null;
  }

  const handleSidebar = () => {
    setOpen(!open);
  };

  return (
    <div className="w-fit mt-14 flex items-stretch gap-2 p-4">
      {open && (
        <div className="max-w-55 flex flex-col gap-2">
          <div className="text-xl leading-7 font-semibold text-foreground py-1.5">
            History
          </div>

          <div className="flex flex-col gap-1">
            {allArticles.map((article) => (
              <div className="flex items-center">
                <Button
                  onClick={() => {
                    router.push(`/article/${article.id}/generated-article`);
                  }}
                  key={article.id}
                  variant={"ghost"}
                  className="h-auto w-fit text-base px-0 has-[>svg]:px-0 py-2.5 text-left cursor-pointer"
                >
                  {article.title}
                </Button>
                <Button variant={"outline"} />
              </div>
            ))}
          </div>
        </div>
      )}

      <Button
        onClick={handleSidebar}
        variant={"ghost"}
        className="w-10 h-10 px-2 cursor-pointer"
      >
        <img src="/sidebar.svg" alt="" />
      </Button>
    </div>
  );
}
