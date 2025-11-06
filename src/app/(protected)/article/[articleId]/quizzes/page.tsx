"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui";
import { IoCloseOutline } from "react-icons/io5";
import { useParams } from "next/navigation";
import { QuizType } from "@/lib/types";
import { AiOutlineLoading } from "react-icons/ai";

// interface QuizParams {
//   articleId: string;
// }
const QuizPage = () => {
  const { articleId } = useParams();
  const [allQuizzes, setAllQuizzes] = useState<QuizType[]>([]);
  const [step, setStep] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (articleId) {
      const getAllQuizzes = async () => {
        setLoading(true);
        const response = await fetch(`/api/article/${articleId}/quizzes`);
        const { data } = await response.json();
        console.log(data, "DATADATA");

        if (data) {
          setAllQuizzes(data);
        }
        setLoading(false);
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
      <div className="min-w-[494px] flex flex-col mt-30 mx-50 gap-6 text-foreground">
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center text-2xl leading-8 font-semibold">
              <img src="/article-icon.svg" alt="" className="w-6 h-6" />
              <div>Quick test</div>
            </div>
            <div className="text-base leading-6 font-medium text-muted-foreground">
              Take a quick test about your knowledge from your content
            </div>
          </div>

          <Button variant={"outline"} className="h-10 has-[>svg]:px-4">
            <IoCloseOutline size={16} />
          </Button>
        </div>

        <div className="w-full bg-background rounded-lg p-7 border border-border flex flex-col gap-5">
          {loading && (
            <div className="flex justify-center">
              <AiOutlineLoading size={24} className="animate-spin" />
            </div>
          )}

          {articleQuizes.map((quiz, i) => {
            return (
              step === i && (
                <>
                  <div className="flex justify-between text-xl leading-7 font-medium">
                    <div className="w-auto">{quiz.question}</div>
                    <div>
                      {i + 1}
                      <span className="text-base leading-6 text-muted-foreground">
                        /5
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {quiz.options.map((opt) => (
                      <Button
                        onClick={quizStepHandler}
                        key={opt}
                        variant={"outline"}
                        className="w-auto min-h-10 h-auto whitespace-pre-wrap"
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
