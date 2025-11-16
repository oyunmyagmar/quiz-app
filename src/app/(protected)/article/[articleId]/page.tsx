"use client";
import React, { useState } from "react";
import { Button, Dialog, DialogTrigger, Label } from "@/components/ui";
import { useRouter, useParams } from "next/navigation";
import { PiBookOpen } from "react-icons/pi";
import { LuLoaderCircle } from "react-icons/lu";
import { toast } from "sonner";
import {
  BackBtn,
  QuizGeneratorHeading,
  SeeMoreContent,
} from "@/app/_components";
import { useArticle } from "@/app/_hooks/use-article";

const ArticlePage = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const { selectedArticle } = useArticle();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

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

    if (!response.ok) {
      toast.error("Error while generating or adding quiz to DB!");
    }

    toast.success("Quiz added to DB successfully");
    setLoading(false);
    router.push(`/article/${articleId}/quizzes`);
  };

  return (
    <div className="w-full h-full bg-secondary flex justify-center">
      <div className="mt-26 flex flex-col mx-64 gap-6">
        <BackBtn />

        <div className="bg-background flex flex-col p-7 rounded-lg h-fit gap-5 text-foreground font-semibold border border-border">
          <QuizGeneratorHeading />

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
