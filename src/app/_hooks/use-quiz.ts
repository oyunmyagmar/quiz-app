import { QuizType } from "@/lib/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useQuiz = () => {
  const [selectedArticleQuizzes, setSelectedArticleQuizzes] = useState<
    QuizType[]
  >([]);
  const { articleId } = useParams<{ articleId: string }>();

  useEffect(() => {
    if (!articleId) return;

    const getSelectedArticleQuizzes = async () => {
      const response = await fetch(`/api/article/${articleId}/quizzes`);
      const { data } = await response.json();

      if (data) {
        setSelectedArticleQuizzes(data);
      }
    };

    getSelectedArticleQuizzes();
  }, []);

  return { selectedArticleQuizzes };
};
