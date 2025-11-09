"use client";
import React, { useEffect, useState } from "react";
import { Button, Label } from "@/components/ui";
import { useRouter, useParams } from "next/navigation";
import { useArticle } from "@/app/_hooks/use-article";
import { PiBookOpen } from "react-icons/pi";
import { LuLoaderCircle } from "react-icons/lu";

const ArticlePage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { articleId } = useParams<{ articleId: string }>();
  const { selectedArticle } = useArticle();
  const [selectedArticleId, setSelectedArticleId] = useState<string>("");
  const [selectedArticleContent, setSelectedArticleContent] =
    useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (selectedArticle?.id === articleId) {
      setSelectedArticleId(selectedArticle.id);
    }
    if (selectedArticle) {
      setSelectedArticleContent(selectedArticle.content);
    }
  }, [selectedArticle, articleId]);

  const generateQuiz = async (articleId: string) => {
    if (!selectedArticleContent || !articleId) {
      alert("Article content or id is required");
      return;
    }

    setLoading(true);

    const response = await fetch(`/api/article/${articleId}/quizzes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ selectedArticleContent, articleId }),
    });

    if (response.ok) {
      setLoading(false);
      alert("Quiz added to DB successfully");
      router.push(`/article/${articleId}/quizzes`);
    } else {
      alert("Error while generating and adding quiz to DB!");
    }
  };

  return (
    <div className="w-full h-full bg-secondary flex justify-center">
      <div className="bg-background flex flex-col p-7 mt-26 mx-64 rounded-lg h-fit gap-5 text-foreground font-semibold border border-border">
        <div className="flex flex-col gap-5">
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
            {selectedArticle && selectedArticleId && (
              <div className="flex flex-col gap-2">
                <div className="text-2xl leading-8">
                  {selectedArticle.title}
                </div>
                <div className="font-normal">{selectedArticle.summary}</div>
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <Button
              variant={"outline"}
              size={"lg"}
              className="px-4 text-secondary-foreground"
            >
              See content
            </Button>
            <Button
              disabled={loading || !selectedArticle || !selectedArticleId}
              size={"lg"}
              onClick={() => generateQuiz(selectedArticleId)}
              className="px-4"
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
