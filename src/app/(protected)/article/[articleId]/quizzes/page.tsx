"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui";
import { IoCloseOutline } from "react-icons/io5";
import { useParams } from "next/navigation";
import { QuizType } from "@/lib/types";

// interface QuizParams {
//   articleId: string;
// }
const QuizPage = () => {
  const { articleId } = useParams();
  const [allQuizzes, setAllQuizzes] = useState<QuizType[]>([]);
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    if (articleId) {
      const getAllQuizzes = async () => {
        const response = await fetch(`/api/article/${articleId}/quizzes`);
        const { data } = await response.json();
        console.log(data, "DATADATA");

        if (data) {
          setAllQuizzes(data);
        }
      };
      getAllQuizzes();
    }
  }, [articleId]);

  const articleQuizes = allQuizzes.filter(
    (item) => item.articleid === articleId
  );
  console.log({ articleQuizes });

  const quizStepHandler = () => {
    setStep((prev) => prev + 1);
  };

  return (
    <div className="w-full h-full bg-secondary flex justify-center">
      <div className="flex flex-col mt-30 mx-50 gap-6">
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <img src="/article-icon.svg" />
              <div>Quick test</div>
            </div>
            <div>Take a quick test about your knowledge from your content </div>
          </div>

          <Button variant={"outline"} className="h-10">
            <IoCloseOutline size={16} />
          </Button>
        </div>

        <div className="w-full bg-background rounded-lg p-7 border border-border flex flex-col gap-5">
          {articleQuizes.map((quiz, i) => {
            return (
              step === i && (
                <>
                  <div className="flex justify-between">
                    <div>{quiz.question}</div>
                    <div>{i}/5</div>
                  </div>
                  <div className="flex flex-wrap">
                    {quiz.options.map((opt) => (
                      <Button
                        onClick={quizStepHandler}
                        key={opt}
                        variant={"outline"}
                        className="w-1/2 h-10"
                      >
                        {opt}
                      </Button>
                    ))}
                  </div>
                </>
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default QuizPage;
