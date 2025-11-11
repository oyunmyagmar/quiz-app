"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui";
import { LuLoaderCircle } from "react-icons/lu";
import { useParams, useRouter } from "next/navigation";
import { QuizResultType, QuizScoresType, QuizType } from "@/lib/types";
import { useQuiz } from "@/app/_hooks/use-quiz";
import { CancelAndRestartQuiz, QuizCompletedComp } from "@/app/_components";

const QuizPage = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const { selectedArticleQuizzes } = useQuiz();
  const [step, setStep] = useState<number>(0);
  const [quizResult, setQuizResult] = useState<QuizResultType[]>([]);
  const [quizScores, setQuizScores] = useState<QuizScoresType[]>([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [min, setMin] = useState<number>(0);
  const [sec, setSec] = useState<number>(0);
  let timeSpent = 0;

  if (min > 0) {
    timeSpent = min * 60 + sec;
  } else timeSpent = sec;
  console.log({ timeSpent });

  const quizStepScoreHandler = (
    quizQuestion: string,
    selectedAnswerI: string,
    quizAnswerI: string,
    quiz: QuizType
  ) => {
    const quizCorrectAnswer = quiz.options[JSON.parse(quizAnswerI)];

    const clientAnswer = quiz.options[JSON.parse(selectedAnswerI)];

    console.log("QUIZ ANSWER", Number(quizAnswerI));

    const newQuizResult = [
      ...quizResult,
      {
        question: quizQuestion,
        userAnswerString: clientAnswer,
        correctAnswerString: quizCorrectAnswer,
      },
    ];
    if (newQuizResult) {
      setQuizResult(newQuizResult);
    }

    if (selectedAnswerI === quizAnswerI) {
      const newQuizScores = [
        ...quizScores,
        { quizQuestionId: quiz.id, quizScore: 1 },
      ];
      setQuizScores(newQuizScores);
    } else if (selectedAnswerI !== quizAnswerI) {
      const newQuizScores = [
        ...quizScores,
        { quizQuestionId: quiz.id, quizScore: 0 },
      ];
      setQuizScores(newQuizScores);
    }

    setStep((prev) => prev + 1);
  };

  const restartQuizHandler = () => {
    setStep(0);
    setQuizResult([]);
    setQuizScores([]);
    setSec(0);
    setMin(0);
  };

  // useEffect(() => {
  //   if (step === 0) {
  //     const interval = setInterval(() => {
  //       setSec((prevSec) => {
  //         if (prevSec >= 59) {
  //           setMin((prevMin) => prevMin + 1);
  //           return 0;
  //         }
  //         return prevSec + 1;
  //       });
  //     }, 1000);
  //     return () => {
  //       clearInterval(interval);
  //     };
  //   } else if (step >= selectedArticleQuizzes.length - 1) return;
  // }, [selectedArticleQuizzes.length]);

  return (
    <div className="w-full h-full bg-secondary flex justify-center">
      {step < selectedArticleQuizzes.length ? (
        <div className="flex flex-col mt-44 mx-50 gap-6 text-foreground">
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

            <CancelAndRestartQuiz restartQuizHandler={restartQuizHandler} />
          </div>

          <div>
            {min}:{sec}
          </div>
          <div className="w-full bg-background rounded-lg p-7 border border-border">
            {isLoading && (
              <div className="h-fit flex justify-center">
                <LuLoaderCircle size={24} className="animate-spin" />
              </div>
            )}

            {selectedArticleQuizzes.map((quiz, i) => {
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
                            quizStepScoreHandler(
                              quiz.question,
                              JSON.stringify(index),
                              quiz.answer,
                              quiz
                            )
                          }
                          key={opt}
                          variant={"outline"}
                          className="w-auto min-h-10 h-auto whitespace-pre-wrap cursor-pointer"
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
        <QuizCompletedComp
          selectedArticleQuizzes={selectedArticleQuizzes}
          quizResult={quizResult}
          quizScores={quizScores}
          restartQuizHandler={restartQuizHandler}
          articleId={articleId}
        />
      )}
    </div>
  );
};
export default QuizPage;
