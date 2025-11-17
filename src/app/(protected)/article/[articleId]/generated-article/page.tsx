"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  PrevAttemptsHistoryComp,
  QuizGeneratorHeading,
  SeeMoreContent,
  SummarizedContentComp,
  TotalScoreComp,
} from "@/app/_components";
import { Button, Dialog, DialogTrigger, Label } from "@/components/ui";
import { useArticle } from "@/app/_hooks/use-article";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { QuizAllAttemptsType, QuizPrevScoreResultsType } from "@/lib/types";

const GeneratedArticlePage = () => {
  const { selectedArticle } = useArticle();
  const { articleId } = useParams<{ articleId: string }>();
  const [quizAllAttempts, setQuizAllAttempts] = useState<QuizAllAttemptsType[]>(
    []
  );
  const [quizPrevScoreResults, setQuizPrevScoreResults] = useState<
    QuizPrevScoreResultsType[]
  >([]);
  const { user } = useUser();
  const router = useRouter();

  const getQuizResults = async () => {
    const response = await fetch(
      `/api/article/${articleId}/quizzes/attempt-scores`
    );

    if (!response.ok) {
      toast("Failed to get quiz results");
    }

    const { attempts, scores } = await response.json();
    console.log({ attempts }, { scores });
    if (scores) {
      setQuizPrevScoreResults(scores);
    }
    if (attempts) {
      setQuizAllAttempts(attempts);
    }
  };

  return (
    <div className="w-full h-full bg-secondary flex justify-center">
      <div className="bg-background flex flex-col p-7 mt-26 mx-64 rounded-lg h-fit gap-5 text-primary border border-border">
        <QuizGeneratorHeading />

        {selectedArticle && (
          <SummarizedContentComp selectedArticle={selectedArticle} />
        )}

        <div className="flex flex-col gap-2">
          <div className="flex gap-1 items-center">
            <img src="/article-note.svg" alt="" className="px-0.5 py-[px]" />
            <Label className="text-muted-foreground">Article Content</Label>
          </div>
          <div className="text-sm leading-5 line-clamp-3">
            {selectedArticle?.content}
          </div>
          <div className="flex justify-end">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant={"ghost"}
                  size={"lg"}
                  className="w-fit h-7 py-1 cursor-pointer"
                >
                  See more
                </Button>
              </DialogTrigger>
              {selectedArticle && (
                <SeeMoreContent selectedArticle={selectedArticle} />
              )}
            </Dialog>
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            onClick={() => router.push(`/article/${articleId}/quizzes`)}
            size={"lg"}
            className="w-fit cursor-pointer"
          >
            Take a quiz
          </Button>

          <PrevAttemptsHistoryComp />
        </div>
      </div>
    </div>
  );
};
export default GeneratedArticlePage;
