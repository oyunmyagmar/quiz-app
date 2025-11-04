"use client";
import React, { useState } from "react";
import { Button, Input, Label, Textarea } from "@/components/ui";
import { PiBookOpen } from "react-icons/pi";
import { useRouter } from "next/navigation";
import Markdown from "react-markdown";

const ArticlePage = () => {
  const [summarizedContent, setSummarizedContent] = useState<string>("");
  const router = useRouter();
  const [article, setArticle] = useState<string>("");
  const [quizzes, setQuizzes] = useState<string>(""); // tur orulsan uur page der gargah

  //article get huselt hiij db der hadgalsan article avah
  //generated summary get huselt hij db der hadgalsan summary avah

  const generateQuiz = async () => {
    setQuizzes(""); // tur zuur bichsen

    const response = await fetch("/api/quizzes-mock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ article }), // tur zuur input nemeed input -ees article avaad quiz usgej uzvel
    });

    const result = await response.json();
    console.log(result, "RESULT");
    if (result.text) {
      setQuizzes(result.text);
    } else {
      alert("Failed to generate quizzes");
    }
    // router.push("/quiz");
  };

  return (
    <div className="w-full h-full bg-secondary flex justify-center">
      <div className="bg-background max-w-214 flex flex-col p-7 mt-12 mx-64 rounded-lg h-fit gap-5 text-muted-foreground border border-border">
        <div className="flex flex-col gap-5">
          <div className="flex gap-2 items-center text-2xl leading-8 font-semibold text-foreground">
            <img src="/article-icon.svg" alt="" className="w-6 h-6" />
            <div>Article Quiz Generator</div>
          </div>
          <div className="flex flex-col gap-2 text-sm leading-5">
            <div className="flex gap-1 items-center">
              <PiBookOpen size={16} className="text-foreground" />
              <Label className="font-semibold">Summarized content</Label>
            </div>

            <div className="text-2xl leading-8 font-semibold text-foreground">
              Genghis khan{"article title"}
            </div>

            <div className="text-foreground">
              Genghis Khan, born Temüjin around 1162, was the founder of the
              Mongol Empire. After his father's death, Temüjin's family was left
              in poverty, and he later killed his half-brother to secure his
              position. He built alliances with leaders like Jamukha and
              Toghrul, and despite being defeated in battle and briefly under
              the Jin dynasty, he rose to power by defeating rivals. By 1206,
              after overcoming the Naiman tribe and executing Jamukha, Temüjin
              became the undisputed ruler of the Mongol steppe, eventually
              leading a series of successful military campaigns that expanded
              his empire across China and Central Asia.{"summarized content"}
            </div>
          </div>
          <div className="flex justify-between">
            <Button
              variant={"outline"}
              className="h-10 text-secondary-foreground"
            >
              See content
            </Button>
            <Button onClick={generateQuiz} className="h-10">
              Take a quiz
            </Button>
          </div>

          {/* tur zuur */}
          <Textarea
            value={article}
            onChange={(e) => setArticle(e.target.value)}
          />

          <div>
            <Markdown>{quizzes && quizzes}</Markdown>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ArticlePage;
