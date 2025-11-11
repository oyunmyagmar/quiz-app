"use client";
import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogTrigger, Label } from "@/components/ui";
import { useRouter, useParams } from "next/navigation";
import { PiBookOpen } from "react-icons/pi";
import { LuLoaderCircle, LuChevronLeft } from "react-icons/lu";
import { ArticleType } from "@/lib/types";
import { toast } from "sonner";
import { SeeMoreContent } from "@/app/_components";

const ArticlePage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { articleId } = useParams<{ articleId: string }>();
  const [selectedArticle, setSelectedArticle] = useState<ArticleType | null>(
    null
  );
  const router = useRouter();

  const getSelectedArticle = async () => {
    const response = await fetch(`/api/article/${articleId}`);

    if (response.ok) {
      const { data } = await response.json();
      if (data) {
        setSelectedArticle(data);
      }
    }
  };

  useEffect(() => {
    getSelectedArticle();
  }, []);

  const generateQuiz = async (articleId: string) => {
    if (!selectedArticle?.summary || !articleId) {
      toast.warning("Article summary or id is required");
      return;
    }

    setLoading(true);

    const response = await fetch(`/api/article/${articleId}/quizzes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        selectedArticleSummary: selectedArticle.summary,
        articleId,
      }),
    });

    if (response.ok) {
      toast.success("Quiz added to DB successfully");
      setLoading(false);
      router.push(`/article/${articleId}/quizzes`);
    } else {
      toast.error("Error while generating or adding quiz to DB!");
    }
  };

  return (
    <div className="w-full h-full bg-secondary flex justify-center">
      <div className="mt-26 flex flex-col mx-64 gap-6">
        <Button
          onClick={() => router.push("/")}
          variant={"outline"}
          size={"lg"}
          className="w-fit"
        >
          <LuChevronLeft size={16} />
        </Button>

        <div className="bg-background flex flex-col p-7 rounded-lg h-fit gap-5 text-foreground font-semibold border border-border">
          <div className="flex gap-2 items-center">
            <img src="/article-icon.svg" alt="" className="w-6 h-6" />
            <div className="text-2xl leading-8">Article Quiz Generator</div>
          </div>

          <div className="flex flex-col gap-2 text-sm leading-5">
            <div className="flex gap-2 items-center">
              <PiBookOpen size={16} />
              <Label className="text-[#737373]">Summarized content</Label>
            </div>
            <>
              {!selectedArticle && (
                <div className="flex justify-center items-center">
                  <LuLoaderCircle size={24} className="animate-spin" />
                </div>
              )}
            </>
            {selectedArticle && (
              <div className="flex flex-col gap-2">
                <div className="text-2xl leading-8">
                  {selectedArticle?.title}
                </div>
                <div className="font-normal">{selectedArticle?.summary}</div>
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant={"outline"}
                  size={"lg"}
                  className="px-4 text-secondary-foreground cursor-pointer"
                >
                  See content
                </Button>
              </DialogTrigger>
              {selectedArticle && (
                <SeeMoreContent selectedArticle={selectedArticle} />
              )}
            </Dialog>

            <Button
              disabled={loading || !selectedArticle || !articleId}
              size={"lg"}
              onClick={() => generateQuiz(articleId)}
              className="px-4 cursor-pointer"
            >
              {loading && <LuLoaderCircle className="animate-spin" />}
              Take a quiz
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ArticlePage;
