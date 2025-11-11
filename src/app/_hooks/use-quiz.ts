import { QuizType } from "@/lib/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useQuiz = () => {
  const [selectedArticleQuizzes, setSelectedArticleQuizzes] = useState<
    QuizType[]
  >([]);
  const { articleId } = useParams<{ articleId: string }>();

  const getSelectedArticleQuizzes = async () => {
    const resultData = await fetch(`/api/article/${articleId}/quizzes`);
    const { data } = await resultData.json();

    // console.log({ data }, "datadata");

    if (data) {
      setSelectedArticleQuizzes(data);
    }
  };
  useEffect(() => {
    getSelectedArticleQuizzes();
  }, []);

  return { selectedArticleQuizzes };
};
