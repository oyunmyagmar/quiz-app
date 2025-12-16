import { QuizType } from "@/lib/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useQuiz = () => {
  const [selectedArticleQuizzes, setSelectedArticleQuizzes] = useState<
    QuizType[]
  >([]);
  const { articleId } = useParams<{ articleId: string }>();

  const getSelectedArticleQuizzes = async () => {
    if (!articleId) {
      return;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/article/${articleId}/quizzes`
    );

    if (!response.ok) {
      toast.error("Failed to get quizzes!");
    }

    const { data } = await response.json();
    if (data) {
      setSelectedArticleQuizzes(data);
    }
  };

  useEffect(() => {
    getSelectedArticleQuizzes();
  }, []);

  return { selectedArticleQuizzes };
};
