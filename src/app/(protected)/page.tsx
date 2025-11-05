"use client";
import React, { useEffect, useState } from "react";
import { Button, Input, Label, Textarea } from "@/components/ui";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cleanText } from "@/lib/utils/get-clean-text";
import { useArticle } from "../_hooks/use-article";

const Homepage = () => {
  const [articleTitle, setArticleTitle] = useState<string>("");
  const [articleContent, setArticleContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [summarizedContent, setSummarizedContent] = useState<string>(""); // tur zur bichsen ur hudas der harulah
  const { allArticles, refetchGetAllArticles } = useArticle();

  const generateSummary = async () => {
    setLoading(true);
    setSummarizedContent(""); //tur zuur end bichsen uur huudas ruu hiih? gehdee asuuh

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ articleTitle, articleContent }),
    });

    const result = await response.json();
    // console.log(result, "RESULT");
    if (result.text) {
      setSummarizedContent(result.text); // uur hudas der harulah
    } else {
      alert("Failed to generate summary");
    }

    const cleanedAricleTitle = cleanText(articleTitle);
    const cleanedArticleContent = cleanText(articleContent);
    const cleanedSummary = cleanText(result.text);
    // console.log(
    //   cleanedAricleTitle,
    //   cleanedArticleContent,
    //   cleanedSummary,
    //   "CLEANEDDAAT"
    // );

    const res = await fetch("/api/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: cleanedAricleTitle,
        content: cleanedArticleContent,
        summary: cleanedSummary,
      }),
    });

    const { data } = await res.json();
    console.log(data, "RES-RESULT");

    if (res.ok) {
      alert("Article added to DB successfully");
    } else {
      alert("Failed to add article to DB");
    }

    setLoading(false);
    // setArticleTitle("");
    // setArticleContent("");
    // router.push(`/article/${id}`);
  };

  return (
    <div className="w-full h-full bg-secondary flex justify-center">
      <div className="bg-background max-w-214 flex flex-col p-7 mt-12 mx-64 rounded-lg h-fit gap-5 text-muted-foreground border border-border">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center text-2xl leading-8 font-semibold text-foreground">
            <img src="/article-icon.svg" alt="" className="w-6 h-6" />
            <div>Article Quiz Generator</div>
          </div>

          <div className="text-base leading-[19.2px]">
            Paste your article below to generate a summarize and quiz question.
            Your articles will saved in the sidebar for future reference.
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1 text-sm leading-5">
            <div className="flex gap-1 items-center">
              <img src="/article-note.svg" alt="" className="px-0.5 py-[px]" />
              <Label className="font-semibold">Article Title</Label>
            </div>
            <Input
              value={articleTitle}
              onChange={(e) => setArticleTitle(e.target.value)}
              placeholder="Enter a title for your article..."
              className="py-2 text-foreground"
            />
          </div>

          <div className="flex flex-col gap-1 text-sm leading-5">
            <div className="flex gap-1 items-center">
              <img src="/article-note.svg" alt="" className="px-0.5 py-[px]" />
              <Label className="font-semibold">Article Content</Label>
            </div>

            <Textarea
              value={articleContent}
              onChange={(e) => setArticleContent(e.target.value)}
              placeholder="Paste your article content here..."
              className="min-h-30 text-foreground"
            />
          </div>

          <div className="flex justify-end">
            <Button
              onClick={generateSummary}
              className="w-fit h-10"
              disabled={!articleTitle || !articleContent}
            >
              {loading && (
                <AiOutlineLoading3Quarters className="animate-spin" />
              )}
              Generate summary
            </Button>
          </div>

          {/* tur zur gargaj bga */}
          <div>{summarizedContent && summarizedContent}</div>
        </div>
      </div>
    </div>
  );
};
export default Homepage;
