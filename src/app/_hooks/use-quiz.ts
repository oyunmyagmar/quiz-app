import { QuizType } from "@/lib/types";
import { useState } from "react";

export const useQuiz = () => {
  const [allQuizzes, setAllQuizzes] = useState<QuizType[]>([]);

  const getAllQuizzes = async () => {
    const resultData = await fetch(`/api/article/${articleId}/quizzes`);
    const { data } = await resultData.json();

    console.log(data, "DATADATA");
  };
};
