export type ArticleType = {
  id: string;
  title: string;
  content: string;
  summary: string;
  userId?: string;
  createdat: string;
  updatedat: string;
};

export type QuizType = {
  id: string;
  question: string;
  options: string[];
  answer: string;
  articleid: string;
  createdat: string;
  updatedat: string;
};

export type ScoreType = {
  id: string;
  quizid: string;
  userid?: string;
  score: number;
  createdat: string;
  updatedat: string;
};

export type AttemptType = {
  id: string;
  quizid: string;
  userid?: string;
  score: number;
  timeSpent: number;
  createdat: string;
  updatedat: string;
};
