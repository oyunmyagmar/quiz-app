"use client";
import { Button } from "@/components/ui";
import { useRouter } from "next/navigation";
import { useArticle } from "../_hooks/use-article";

export function AppSidebar() {
  const { allArticles } = useArticle();
  const router = useRouter();

  const handleHideSidebar = () => {};

  return (
    <div className="w-full mt-14 flex gap-2 p-4">
      <div className="flex-1">
        <div className="flex flex-col gap-2">
          <div className="text-xl leading-7 font-semibold text-foreground py-1.5">
            History
          </div>
          <div className="flex flex-col gap-1">
            {allArticles.map((article) => (
              <Button
                onClick={() => router.push(`/article/${article.id}`)}
                variant={"ghost"}
                className="h-11 w-fit text-base px-0 has-[>svg]:px-0"
              >
                {article.title}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <Button
        onClick={handleHideSidebar}
        variant={"ghost"}
        className="h-10 px-2"
      >
        <img src="/sidebar.svg" alt="" />
      </Button>
    </div>
  );
}
