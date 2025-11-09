"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui";
import { IoCloseOutline, IoCloseCircleOutline } from "react-icons/io5";
import { LuCircleCheck, LuBookmark, LuLoaderCircle } from "react-icons/lu";
import { RxReload } from "react-icons/rx";
import { useParams, useRouter } from "next/navigation";
import { QuizType } from "@/lib/types";

// interface QuizParams {
//   articleId: string;
// }

interface QuizResultType {
  question: string;
  userAnswerIndex: string;
  correctAnsIndex: string;
  userAnswerString?: string;
  correctAnswerString?: string;
}
interface QuizScoresType {
  quizQuestionId: string;
  quizScore: number;
}

const QuizPage = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const [allQuizzes, setAllQuizzes] = useState<QuizType[]>([]);
  const [step, setStep] = useState<number>(0);
  const [quizResult, setQuizResult] = useState<QuizResultType[]>([]);
  const [quizScores, setQuizScores] = useState<QuizScoresType[]>([]);
  let userScore = 0;
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  let [min, setMin] = useState<number>(0);
  let [sec, setSec] = useState<number>(0);

  quizScores.forEach((item) => (userScore = userScore + item.quizScore));
  console.log({ quizScores });
  console.log({ userScore });

  useEffect(() => {
    if (articleId) {
      const getAllQuizzes = async () => {
        setIsLoading(true);
        const response = await fetch(`/api/article/${articleId}/quizzes`);
        const { data } = await response.json();

        if (data) {
          setAllQuizzes(data);
        }
        setIsLoading(false);
      };
      getAllQuizzes();
    }
  }, [articleId]);

  const articleQuizzes = allQuizzes.filter(
    (item) => item.articleid === articleId
  );
  // console.log({ articleQuizzes });

  const quizStepScoreHandler = (
    quizQuestion: string,
    selectedAnswerI: string,
    quizAnswerI: string,
    quiz: QuizType
  ) => {
    const quizTrueAnswer = quiz.options.find(
      (opt, i) => JSON.stringify(i) === quizAnswerI
    );
    const clientAnswer = quiz.options.find(
      (opt, i) => JSON.stringify(i) === selectedAnswerI
    );

    const newQuizResult = [
      ...quizResult,
      {
        question: quizQuestion,
        userAnswerIndex: selectedAnswerI,
        correctAnsIndex: quizAnswerI,
        userAnswerString: clientAnswer,
        correctAnswerString: quizTrueAnswer,
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
  // console.log({ correctAnswer });
  // console.log({ quizResult });

  const restartQuizHandler = () => {
    setStep(0);
    setQuizResult([]);
    setQuizScores([]);
  };

  const saveQuizScoreHandler = async (quizScores: QuizScoresType[]) => {
    setLoading(true);
    const res = await fetch(`/api/article/${articleId}/quizzes/score`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quizScores }),
    });

    if (res.ok) {
      alert("Score added to DB successfully");
      setLoading(false);
      router.push("/");
    } else {
      alert("Failed to save score to DB!");
    }
  };

  const cancelAndRestartQuiz = () => {
    setOpen(false);
    restartQuizHandler();
  };

  // useEffect(() => {
  //   setInterval(() => {
  //     if (step === 0) {
  //       setSec((prev) => prev + 1);

  //       if (sec > 60) {
  //         setMin((prev) => prev + 1);
  //       }
  //     }
  //   }, 1000);
  // }, [step === 0]);

  return (
    <div className="w-full h-full bg-secondary flex justify-center">
      {step < articleQuizzes.length ? (
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

            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogTrigger asChild>
                <Button
                  onClick={() => setOpen(true)}
                  variant={"outline"}
                  className="h-10 has-[>svg]:px-4 cursor-pointer"
                >
                  <IoCloseOutline size={16} />
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent className="sm:max-w-[450px] border-0 rounded-xl gap-6">
                <AlertDialogHeader className="gap-1.5">
                  <AlertDialogTitle className="text-2xl leading-8 text-foreground">
                    Are you sure?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="leading-5 text-[#B91C1C]">
                    If you press 'Cancel', this quiz will restart from the
                    beginning.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="gap-11">
                  <Button
                    onClick={() => setOpen(false)}
                    className="w-[calc(50%-22px)] h-10 cursor-pointer"
                  >
                    Go back
                  </Button>
                  <Button
                    onClick={cancelAndRestartQuiz}
                    variant={"outline"}
                    className="w-[calc(50%-22px)] h-10 cursor-pointer"
                  >
                    Cancel quiz
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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

            {articleQuizzes.map((quiz, i) => {
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
              Your score: {userScore}
              <span className="text-base leading-6 font-medium text-muted-foreground">
                /{articleQuizzes.length}
              </span>
            </div>

            <div className="flex flex-col gap-5">
              {quizResult.map((res, i) => (
                <div key={i} className="flex gap-3">
                  <div>
                    {res.userAnswerString !== res.correctAnswerString ? (
                      <IoCloseCircleOutline
                        size={22}
                        className="text-red-700"
                      />
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
                onClick={() => saveQuizScoreHandler(quizScores)}
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
      )}
    </div>
  );
};
export default QuizPage;
