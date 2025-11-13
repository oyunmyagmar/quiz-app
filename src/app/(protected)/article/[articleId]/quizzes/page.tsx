"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui";
import { LuLoaderCircle } from "react-icons/lu";
import { useParams } from "next/navigation";
import { QuizResultType, QuizScoresType, QuizType } from "@/lib/types";
import { CancelAndRestartQuiz, QuizCompletedComp } from "@/app/_components";

const QuizPage = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const [selectedArticleQuizzes, setSelectedArticleQuizzes] = useState<
    QuizType[]
  >([]);
  // const { selectedArticleQuizzes } = useQuiz();
  const [step, setStep] = useState<number>(0);
  const [quizResult, setQuizResult] = useState<QuizResultType[]>([]);
  const [quizScores, setQuizScores] = useState<QuizScoresType[]>([]); // hereggui bj mgad
  const [loading, setLoading] = useState<boolean>(false);
  const [sec, setSec] = useState<number>(0);
  const [timeIsRunning, setTimeIsRunning] = useState<boolean>(false);
  let timeSpentOnQuiz =
    (Math.floor(sec / 60) < 10 ? "0" : "") +
    Math.floor(sec / 60) +
    ":" +
    (sec % 60 < 10 ? "0" : "") +
    (sec % 60);

  const getSelectedArticleQuizzes = async () => {
    if (!articleId) {
      return;
    }
    const response = await fetch(`/api/article/${articleId}/quizzes`);
    if (response.ok) {
      const { data } = await response.json();
      if (data) {
        setSelectedArticleQuizzes(data);
      }
    }
  };

  useEffect(() => {
    getSelectedArticleQuizzes();
  }, [articleId]);

  console.log({ selectedArticleQuizzes });

  const quizStepScoreHandler = (selectedAnswerI: string, quiz: QuizType) => {
    const quizCorrectAnswer = quiz.options[JSON.parse(quiz.answer)];
    const clientAnswer = quiz.options[JSON.parse(selectedAnswerI)];

    if (quizCorrectAnswer === clientAnswer) {
      const newQuizScores = [
        ...quizScores,
        { quizQuestionId: quiz.id, quizScore: 1 },
      ];
      setQuizScores(newQuizScores);
    } else if (quizCorrectAnswer !== clientAnswer) {
      const newQuizScores = [
        ...quizScores,
        { quizQuestionId: quiz.id, quizScore: 0 },
      ];
      setQuizScores(newQuizScores);
    }

    const newQuizResult = [
      ...quizResult,
      {
        question: quiz.question,
        userAnswerString: clientAnswer,
        correctAnswerString: quizCorrectAnswer,
      },
    ];
    if (newQuizResult) {
      setQuizResult(newQuizResult);
    }

    setStep((prev) => prev + 1);
  };

  const restartQuizHandler = () => {
    setStep(0);
    setQuizResult([]);
    setQuizScores([]);
    setSec(0);
  };

  useEffect(() => {
    if (step === 0) {
      setTimeIsRunning(true);
    } else if (step >= selectedArticleQuizzes.length) {
      setTimeIsRunning(false);
    }
  }, [step]);

  useEffect(() => {
    if (!timeIsRunning) {
      return;
    }
    const timer = setInterval(() => {
      setSec((prevSec) => prevSec + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeIsRunning]);

  useEffect(() => {
    if (selectedArticleQuizzes.length) {
      if (step > selectedArticleQuizzes.length - 1) {
        console.log("STEP", step, selectedArticleQuizzes.length - 1);
        const saveTimeSpent = async () => {
          await fetch(`/api/article/${articleId}/quizzes/attempts`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sec, articleId }),
          });
        };
        saveTimeSpent();
      }
    }
  }, [step]);

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

          <div className="text-base leading-6 font-medium text-muted-foreground">
            Timer: {timeSpentOnQuiz}
          </div>

          <div className="w-full bg-background rounded-lg p-7 border border-border">
            {loading && (
              <div className="h-fit flex justify-center">
                <LuLoaderCircle size={24} className="animate-spin" />
              </div>
            )}

            {selectedArticleQuizzes.map((quiz, i) => {
              return (
                step === i && (
                  <div key={quiz.id} className="flex flex-col gap-5">
                    <div className="flex gap-2 text-xl leading-7 font-medium">
                      <div className="w-auto">{quiz.question}</div>
                      <div>
                        {i + 1}
                        <span className="text-base leading-6 text-muted-foreground">
                          /5
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {quiz.options.map((option, index) => (
                        <Button
                          onClick={() => {
                            quizStepScoreHandler(index.toString(), quiz);
                          }}
                          key={option}
                          variant={"outline"}
                          className="w-auto min-h-10 h-auto whitespace-pre-wrap cursor-pointer"
                        >
                          {option}
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
          setLoading={setLoading}
          loading={loading}
        />
      )}
    </div>
  );
};
export default QuizPage;
