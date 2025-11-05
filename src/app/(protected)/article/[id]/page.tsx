"use client";
import React, { useEffect, useState } from "react";
import { Button, Label } from "@/components/ui";
import { useRouter, useParams } from "next/navigation";
import { useArticle } from "@/app/_hooks/use-article";
import { ArticleType } from "@/lib/types";
import { RiLoader5Fill } from "react-icons/ri";
import { PiBookOpen } from "react-icons/pi";
import { parseJsonBlock } from "@/lib/utils/get-clean-text";

const ArticlePage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [quizzes, setQuizzes] = useState<string>(""); // tur orulsan uur page der gargah

  const { allArticles, refetchGetAllArticles } = useArticle();
  const params = useParams();
  const { id } = params;
  const [selectedArticle, setSelectedArticle] = useState<ArticleType>();
  // console.log(selectedArticle, "selectedArticle");
  const selectedArticleContent = selectedArticle?.content;

  useEffect(() => {
    if (id) {
      const foundArticle = allArticles.find((artic) => artic.id === id);
      console.log(foundArticle, "foundArticle");
      setSelectedArticle(foundArticle);
    }
  }, [allArticles]);

  const generateQuiz = async (articleId: string) => {
    setLoading(true);
    setQuizzes(""); // tur zuur bichsen

    const response = await fetch(`/api/article${articleId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ selectedArticleContent }),
      // article db der hadgalad article tus bur uurin id -tei id ugch yavulad quizzes generate hiih
    });
    const result = await response.json();
    // const resultRes = result.text;

    console.log(result.text, "RESULT");
    if (result.text) {
      setQuizzes(result.text);
    } else {
      alert("Failed to generate quizzes");
    }
    setLoading(false);
    // router.push("/quizzes");
  };

  const quizzesObj = parseJsonBlock(quizzes);
  console.log(quizzesObj);

  return (
    <div className="w-full h-full bg-secondary flex justify-center">
      <div className="bg-background max-w-214 flex flex-col p-7 mt-12 mx-64 rounded-lg h-fit gap-5 text-muted-foreground border border-border">
        <div className="flex flex-col gap-5">
          <div className="flex gap-2 items-center text-2xl leading-8 font-semibold text-foreground">
            <img src="/article-icon.svg" alt="" className="w-6 h-6" />
            <div>Article Quiz Generator</div>
          </div>

          <>
            {!selectedArticle && (
              <div className="flex justify-center">
                <RiLoader5Fill size={24} className="animate-spin" />
              </div>
            )}
          </>

          <div className="flex flex-col gap-2 text-sm leading-5">
            <div className="flex gap-1 items-center">
              <PiBookOpen size={16} className="text-foreground" />
              <Label className="font-semibold">Summarized content</Label>
            </div>

            <div className="text-2xl leading-8 font-semibold text-foreground">
              {selectedArticle?.title}
            </div>

            <div className="text-foreground">{selectedArticle?.summary}</div>
          </div>

          <div className="flex justify-between">
            <Button
              variant={"outline"}
              className="h-10 text-secondary-foreground"
            >
              See content
            </Button>
            {selectedArticle && (
              <Button
                onClick={() => generateQuiz(selectedArticle?.id)}
                className="h-10"
              >
                {loading && <RiLoader5Fill className="animate-spin" />}
                Take a quiz
              </Button>
            )}
          </div>

          {/* tur zuur gargav uur hudas der gargah */}
          <div>
            {quizzesObj &&
              quizzesObj.map((el: any) => <div>{el.question}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ArticlePage;
