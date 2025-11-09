"use client";
import { Button } from "@/components/ui";
import { useRouter } from "next/navigation";
import { useArticle } from "../_hooks/use-article";
import { useState } from "react";

export function AppSidebar() {
  const [open, setOpen] = useState<boolean>(false);
  const { allArticles } = useArticle();
  const router = useRouter();

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
              <Button
                onClick={() =>
                  router.push(`/article/${article.id}/generated-article`)
                }
                key={article.id}
                variant={"ghost"}
                className="h-auto w-fit text-base px-0 has-[>svg]:px-0 py-2.5 text-left cursor-pointer"
              >
                {article.title}
              </Button>
            ))}
          </div>
        </div>
      )}

      <Button
        onClick={handleSidebar}
        variant={"ghost"}
        className="w-10 h-10 px-2"
      >
        <img src="/sidebar.svg" alt="" />
      </Button>
    </div>
  );
}
