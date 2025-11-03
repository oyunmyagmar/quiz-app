"use client";
import React, { useState } from "react";
import { Button, Label } from "@/components/ui";
import { PiBookOpen } from "react-icons/pi";
import { useRouter } from "next/navigation";

const ArticlePage = () => {
  const [summarizedContent, setSummarizedContent] = useState<string>("");
  const router = useRouter();

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
            <Button onClick={() => router.push("/quiz")} className="h-10">
              Take a quiz
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ArticlePage;
