"use client";
import React, { useEffect, useState } from "react";
import { useArticle } from "@/app/_hooks/use-article";
import { Button, Label } from "@/components/ui";
import { ArticleType } from "@/lib/types";
import { useParams, useRouter } from "next/navigation";
import { PiBookOpen } from "react-icons/pi";

const GeneratedArticlePage = () => {
  const { selectedArticle } = useArticle();
  const { articleId } = useParams<{ articleId: string }>();
  const [article, setArticle] = useState<ArticleType | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (selectedArticle?.id === articleId) {
      setArticle(selectedArticle);
    }
  }, [selectedArticle, articleId]);

  return (
    <div className="w-full h-full bg-secondary flex justify-center">
      <div className="bg-background flex flex-col p-7 mt-26 mx-64 rounded-lg h-fit gap-5 text-primary border border-border">
        <div className="flex gap-2 items-center">
          <img src="/article-icon.svg" alt="" className="w-6 h-6" />
          <div className="text-2xl leading-8 font-semibold">
            Generated Article
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <PiBookOpen size={16} className="text-foreground" />
            <div className="text-sm leading-5 font-semibold text-[#737373]">
              Summarized content
            </div>
          </div>
          <div className="text-2xl leading-8 font-semibold">
            {article?.title}
          </div>
          <div className="text-sm leading-5">{article?.summary}</div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-1 items-center">
            <img src="/article-note.svg" alt="" className="px-0.5 py-[px]" />
            <Label className="text-muted-foreground">Article Content</Label>
          </div>
          <div className="text-sm leading-5 line-clamp-3">
            {article?.content}
          </div>
          <div className="flex justify-end">
            <Button variant={"ghost"} className="w-fit h-7 py-1">
              See more
            </Button>
          </div>
        </div>

        <Button
          onClick={() => router.push(`/article/${articleId}/quizzes`)}
          size={"lg"}
          className="w-fit cursor-pointer"
        >
          Take a quiz
        </Button>
      </div>
    </div>
  );
};
export default GeneratedArticlePage;
