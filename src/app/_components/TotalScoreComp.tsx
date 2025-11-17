import { QuizAllAttemptsType, QuizPrevScoreResultsType } from "@/lib/types";
import React from "react";

export const TotalScoreComp = ({
  attempt,
  quizPrevScoreResults,
}: {
  attempt: QuizAllAttemptsType;
  quizPrevScoreResults: QuizPrevScoreResultsType[];
}) => {
  let userPrevScore = 0;

  quizPrevScoreResults
    .filter((el) => el.attemptid === attempt.id)
    .forEach((item) => (userPrevScore += item.score));

  return (
    <div className="text-sm leading-5 font-medium">
      Total score: {userPrevScore}
    </div>
  );
};
