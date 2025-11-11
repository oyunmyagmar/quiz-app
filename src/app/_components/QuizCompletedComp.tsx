"use client";
import React, { useState } from "react";
import { RxReload } from "react-icons/rx";
import { Button } from "@/components/ui";
import { LuCircleCheck, LuBookmark } from "react-icons/lu";
import { IoCloseCircleOutline } from "react-icons/io5";
import { QuizResultType, QuizScoresType, QuizType } from "@/lib/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
// quiz props-oor yavulah endes correct answer gargah

export const QuizCompletedComp = ({
  selectedArticleQuizzes,
  quizResult,
  quizScores,
  restartQuizHandler,
  articleId,
}: {
  selectedArticleQuizzes: QuizType[];
  quizResult: QuizResultType[];
  quizScores: QuizScoresType[];
  restartQuizHandler: () => void;
  articleId: string;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  let userScore = 0;
  quizScores.forEach((item) => (userScore += item.quizScore));
  const router = useRouter();

  const saveQuizScoresHandler = async (quizScores: QuizScoresType[]) => {
    if (!quizScores) {
      toast.warning("Quiz score is required");
    }

    setLoading(true);

    const res = await fetch(`/api/article/${articleId}/quizzes/scores`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quizScores }),
    });

    if (res.ok) {
      toast.success("Score added to DB successfully");
      setLoading(false);
      router.push("/");
    } else {
      toast.error("Failed to save score to DB!");
    }
  };

  return (
    <div className="flex flex-col mt-44 mx-50 gap-6 text-foreground">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center text-2xl leading-8 font-semibold">
          <img src="/article-icon.svg" alt="" className="w-6 h-6" />
          <div>Quiz completed</div>
        </div>
        <div className="text-base leading-6 font-medium text-muted-foreground">
          Let’s see what you did
        </div>
      </div>

      <div className="w-full bg-background rounded-lg p-7 border border-border flex flex-col gap-7">
        <div className="text-2xl leading-8 font-semibold">
          Your score: {userScore}
          <span className="text-base leading-6 font-medium text-muted-foreground">
            /{selectedArticleQuizzes.length}
          </span>
        </div>

        <div className="flex flex-col gap-5">
          {quizResult.map((res, i) => (
            <div key={i} className="flex gap-3">
              <div>
                {res.userAnswerString !== res.correctAnswerString ? (
                  <IoCloseCircleOutline size={22} className="text-red-700" />
                ) : (
                  <LuCircleCheck size={22} className="text-green-500" />
                )}
              </div>
              <div className="flex flex-col gap-1 text-xs leading-4 font-medium">
                <div className="text-muted-foreground">
                  <span>{i + 1}. </span>
                  {res.question}
                </div>
                <div>Your answer: {res.userAnswerString}</div>
                <div className="text-green-500">
                  {res.userAnswerString !== res.correctAnswerString &&
                    `Correct: ${res.correctAnswerString}`}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <Button
            onClick={restartQuizHandler}
            variant={"outline"}
            size={"lg"}
            className="cursor-pointer"
          >
            <RxReload size={16} />
            Restart quiz
          </Button>
          <Button
            onClick={() => saveQuizScoresHandler(quizScores)}
            disabled={loading}
            size={"lg"}
            className="cursor-pointer"
          >
            <LuBookmark size={16} />
            Save and leave
          </Button>
        </div>
      </div>
    </div>
  );
};
