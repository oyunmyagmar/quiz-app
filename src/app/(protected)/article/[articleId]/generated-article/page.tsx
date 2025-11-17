"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PiBookOpen } from "react-icons/pi";
import {
  QuizGeneratorHeading,
  SeeMoreContent,
  SummarizedContentComp,
  TotalScoreComp,
} from "@/app/_components";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Button,
  Dialog,
  DialogTrigger,
  Label,
  Separator,
} from "@/components/ui";
import { useArticle } from "@/app/_hooks/use-article";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { QuizAllAttempts, QuizPrevResults } from "@/lib/types";
import { LuCircleCheck } from "react-icons/lu";
import { IoCloseCircleOutline } from "react-icons/io5";

const GeneratedArticlePage = () => {
  const { selectedArticle } = useArticle();
  const { articleId } = useParams<{ articleId: string }>();
  const [quizAllAttempts, setQuizAllAttempts] = useState<QuizAllAttempts[]>([]);
  const [quizPrevResults, setQuizPrevResults] = useState<QuizPrevResults[]>([]);
  const { user } = useUser();
  const router = useRouter();

  const getQuizResults = async () => {
    const response = await fetch(
      `/api/article/${articleId}/quizzes/attempt-scores`
    );

    if (!response.ok) {
      toast("Failed to get quiz results");
    }

    const { attempts, results } = await response.json();
    console.log({ attempts }, { results });
    if (results) {
      setQuizPrevResults(results);
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

          <Drawer direction="right">
            <DrawerTrigger asChild>
              <Button
                onClick={getQuizResults}
                size={"lg"}
                variant={"outline"}
                className="w-fit cursor-pointer"
              >
                View previous results
              </Button>
            </DrawerTrigger>

            <DrawerContent className="data-[vaul-drawer-direction=right]:sm:max-w-80">
              <DrawerHeader className="p-5">
                <DrawerTitle>User: {user?.firstName}</DrawerTitle>
                <DrawerDescription>Previous attempts {}</DrawerDescription>
              </DrawerHeader>

              <Tabs defaultValue="account" className="w-full px-5">
                {quizAllAttempts &&
                  quizAllAttempts.map((attempt, i) => (
                    <div key={attempt.id}>
                      <TotalScoreComp
                        attempt={attempt}
                        quizPrevResults={quizPrevResults}
                      />
                      <TabsList>
                        <TabsTrigger value={`attempt${i}`}>
                          Attempt {i + 1}:
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value={`attempt${i}`}>
                        <div className="flex justify-between text-sm leading-5 font-medium">
                          <div> Time spent: {attempt.timespent}</div>
                        </div>

                        {quizPrevResults
                          .filter((res) => res.attemptid === attempt.id)
                          .map((el, i) => (
                            <div
                              key={el.id}
                              className="flex gap-1 text-xs leading-4 font-medium"
                            >
                              <div>
                                {el.useranswer !== el.correctanswer ? (
                                  <IoCloseCircleOutline className="text-red-700" />
                                ) : (
                                  <LuCircleCheck className="text-green-500" />
                                )}
                              </div>
                              <div className="flex flex-col gap-0.5">
                                <div className="text-muted-foreground">
                                  {i + 1}. {""}
                                </div>
                                <div className="text-foreground">
                                  {el.useranswer}
                                </div>
                                <div className="text-green-500">
                                  {el.correctanswer !== el.useranswer &&
                                    `Your answer: ${el.correctanswer}`}
                                </div>
                                <Separator className="w-full border-t border-dashed" />
                              </div>
                            </div>
                          ))}
                      </TabsContent>
                    </div>
                  ))}
              </Tabs>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
};
export default GeneratedArticlePage;
