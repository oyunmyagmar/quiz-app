"use client";
import React, { useEffect, useState } from "react";
import { Button, Label } from "@/components/ui";
import { useRouter, useParams } from "next/navigation";
import { useArticle } from "@/app/_hooks/use-article";
import { PiBookOpen } from "react-icons/pi";
import { LuLoaderCircle } from "react-icons/lu";
import { ArticleType } from "@/lib/types";

const ArticlePage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { articleId } = useParams<{ articleId: string }>();
  const [selectedArticle, setSelectedArticle] = useState<ArticleType>();
  const router = useRouter();

  const getSelectedArticle = async () => {
    const resData = await fetch(`/api/article/${articleId}`);
    const { data } = await resData.json();

    if (data) {
      setSelectedArticle(data);
    }
  };
  useEffect(() => {
    getSelectedArticle();
  }, []);

  const generateQuiz = async (articleId: string) => {
    if (!selectedArticle?.summary || !articleId) {
      alert("Article content or id is required");
      return;
    }

    setLoading(true);

    const response = await fetch(`/api/article/${articleId}/quizzes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ summary: selectedArticle.summary, articleId }),
    });

    if (response.ok) {
      alert("Quiz added to DB successfully");
      router.push(`/article/${articleId}/quizzes`);
      setLoading(false);
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
            <Button
              variant={"outline"}
              size={"lg"}
              className="px-4 text-secondary-foreground"
            >
              See content
            </Button>
            <Button
              disabled={loading || !selectedArticle || !articleId}
              size={"lg"}
              onClick={() => generateQuiz(articleId)}
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
