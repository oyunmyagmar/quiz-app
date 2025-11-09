"use client";
import React, { useState } from "react";
import { Button, Input, Label, Textarea } from "@/components/ui";
import { useRouter } from "next/navigation";
import { cleanText } from "@/lib/utils/get-clean-text";
import { LuLoaderCircle } from "react-icons/lu";

const Homepage = () => {
  const [articleTitle, setArticleTitle] = useState<string>("");
  const [articleContent, setArticleContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const generateSummary = async () => {
    if (!articleTitle || !articleContent) {
      alert("All fields are required!");
      return;
    }

    setLoading(true);

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ articleTitle, articleContent }),
    });

    if (!response.ok) {
      alert("Failed to generate summary!");
    }

    const result = await response.json();

    const cleanedAricleTitle = cleanText(articleTitle);
    const cleanedArticleContent = cleanText(articleContent);
    const cleanedSummary = cleanText(result.text);

    const res = await fetch("/api/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: cleanedAricleTitle,
        content: cleanedArticleContent,
        summary: cleanedSummary,
      }),
    });

    if (res.ok) {
      const { data } = await res.json();
      setLoading(false);
      setArticleTitle("");
      setArticleContent("");
      alert("Article added to DB successfully");
      if (data?.id) {
        router.push(`/article/${data.id}`);
      }
    } else {
      alert("Failed to add article to DB!");
    }
  };

  return (
    <div className="w-full h-full bg-secondary flex justify-center">
      <div className="bg-background flex flex-col p-7 mt-26 mx-64 rounded-lg h-fit gap-5 text-muted-foreground border border-border">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <img src="/article-icon.svg" alt="" className="w-6 h-6" />
            <div className="text-2xl leading-8 font-semibold text-foreground">
              Article Quiz Generator
            </div>
          </div>
          <div className="text-base leading-[19px]">
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
              className="h-10 py-2 text-foreground"
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
              size={"lg"}
              className="w-fit px-4"
              disabled={!articleTitle || !articleContent}
            >
              {loading && <LuLoaderCircle className="animate-spin" />}
              Generate summary
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Homepage;
