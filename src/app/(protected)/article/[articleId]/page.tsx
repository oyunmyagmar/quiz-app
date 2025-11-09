"use client";
import React, { useEffect, useState } from "react";
import { Button, Label } from "@/components/ui";
import { useRouter, useParams } from "next/navigation";
import { useArticle } from "@/app/_hooks/use-article";
import { ArticleType } from "@/lib/types";
import { PiBookOpen } from "react-icons/pi";
import { LuLoaderCircle } from "react-icons/lu";

const ArticlePage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { allArticles } = useArticle();
  const params = useParams();
  const { articleId } = params;
  const [selectedArticle, setSelectedArticle] = useState<ArticleType>();
  // console.log(selectedArticle, "selectedArticle");
  const selectedArticleContent = selectedArticle?.content;

  // useEffect(() => {
  //   if (articleId) {
  //     const foundArticle = allArticles.find((artic) => artic.id === articleId);
  //     console.log(foundArticle, "foundArticle");
  //     setSelectedArticle(foundArticle);
  //   }
  // }, []); // 1-iig avdag-iig bichih

  useEffect(() => {
    if (articleId) {
      const foundArticle = allArticles.find((artic) => artic.id === articleId);
      console.log(foundArticle, "foundArticle");
      setSelectedArticle(foundArticle);
    }
  }, [allArticles]);

  const generateQuiz = async (articleId: string) => {
    setLoading(true);

    const response = await fetch(`/api/article/${articleId}/quizzes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ selectedArticleContent, articleId }),
    });
    const result = await response.json();
    // const resultRes = result.text;

    // console.log(result.text, "RESULT");
    // if (result.text) {
    //   const quizzesObj = parseJsonBlock(result.text);
    //   setQuizzes(quizzesObj);
    // } else {
    //   alert("Failed to generate quizzes");
    // }

    setLoading(false);
    router.push(`/article/${articleId}/quizzes`);
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
            <div className="flex gap-1 items-center">
              <PiBookOpen size={16} className="text-foreground" />
              <Label className="text-[#737373]">Summarized content</Label>
            </div>
            <>
              {!selectedArticle && (
                <div className="flex justify-center items-center">
                  <LuLoaderCircle size={24} className="animate-spin" />
                </div>
              )}
            </>
            <div className="text-2xl leading-8">{selectedArticle?.title}</div>
            <div className="font-normal">{selectedArticle?.summary}</div>
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
              disabled={loading || !selectedArticle}
              size={"lg"}
              onClick={() => generateQuiz(selectedArticle?.id)}
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
