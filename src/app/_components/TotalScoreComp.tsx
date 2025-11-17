import { QuizAllAttempts, QuizPrevResults } from "@/lib/types";
import React from "react";

export const TotalScoreComp = ({
  attempt,
  quizPrevResults,
}: {
  attempt: QuizAllAttempts;
  quizPrevResults: QuizPrevResults[];
}) => {
  let userPrevScore = 0;

  quizPrevResults
    .filter((el) => el.attemptid === attempt.id)
    .forEach((item) => (userPrevScore += item.score));

  return <div>Total score:{userPrevScore}</div>;
};
