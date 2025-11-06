"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui";
import { IoCloseOutline } from "react-icons/io5";
import { useParams } from "next/navigation";
import { QuizType } from "@/lib/types";
import { AiOutlineLoading } from "react-icons/ai";
import { CgCloseO } from "react-icons/cg";
import { LuCircleCheck } from "react-icons/lu";
import { RxReload } from "react-icons/rx";
import { LuBookmark } from "react-icons/lu";

// interface QuizParams {
//   articleId: string;
// }
const QuizPage = () => {
  const { articleId } = useParams();
  const [allQuizzes, setAllQuizzes] = useState<QuizType[]>([]);
  const [step, setStep] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [correctAnswer, setCorrectAnswer] = useState<string[]>([]);
  const [wrongAnswer, setWrongAnswer] = useState<string[]>([]);

  useEffect(() => {
    if (articleId) {
      const getAllQuizzes = async () => {
        setLoading(true);
        const response = await fetch(`/api/article/${articleId}/quizzes`);
        const { data } = await response.json();

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

  const quizStepHandler = (
    selectedAnswerI: string,
    rightAnswerI: string,
    question: string
  ) => {
    if (selectedAnswerI === rightAnswerI) {
      correctAnswer.push(selectedAnswerI);
    } else {
      wrongAnswer.push(selectedAnswerI);
    }
    setStep((prev) => prev + 1);
  };
  console.log({ correctAnswer });
  console.log({ wrongAnswer });

  return (
    <div className="w-full h-full bg-secondary flex justify-center">
      {step < articleQuizes.length ? (
        <div className="min-w-[428px] flex flex-col mt-30 mx-50 gap-6 text-foreground">
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

          <div className="w-full bg-background rounded-lg p-7 border border-border">
            {loading && (
              <div className="flex justify-center">
                <AiOutlineLoading size={24} className="animate-spin" />
              </div>
            )}

            {articleQuizes.map((quiz, i) => {
              return (
                step === i && (
                  <div key={quiz.id} className="flex flex-col gap-5">
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
                      {quiz.options.map((opt, index) => (
                        <Button
                          onClick={() =>
                            quizStepHandler(
                              JSON.stringify(index),
                              quiz.answer,
                              quiz.question
                            )
                          }
                          key={opt}
                          variant={"outline"}
                          className="w-auto min-h-10 h-auto whitespace-pre-wrap"
                        >
                          {opt}
                        </Button>
                      ))}
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>
      ) : (
        <div className="min-w-[428px] flex flex-col mt-30 mx-50 gap-6 text-foreground">
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
              Your score: 2{" "}
              <span className="text-base leading-6 font-medium text-muted-foreground">
                /{articleQuizes.length}
              </span>
            </div>

            <div className="flex flex-col gap-5">
              {Array.from({ length: 5 }).map((el, i) => (
                <div className="flex gap-3">
                  <div>
                    <CgCloseO size={22} className="text-red-700" />{" "}
                    <LuCircleCheck size={22} className="text-green-500" />
                  </div>
                  <div className="flex flex-col gap-1 text-xs leading-4 font-medium">
                    <div className="text-muted-foreground">
                      <span>{i + 1}</span>What was Genghis Khan’s birth name?
                    </div>
                    <div>Your answer: Toghrul</div>
                    <div className="text-green-500">Correct: Temüjin</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between">
              <Button variant={"outline"}>
                <RxReload size={16} />
                Restart quiz
              </Button>
              <Button>
                <LuBookmark size={16} />
                Save and leave
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default QuizPage;
