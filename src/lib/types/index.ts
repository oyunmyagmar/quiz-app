export type UserType = {
  id: string;
  clerkid: string;
  email: string;
  name: string;
  createdat: string;
  updatedat: string;
};
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

export type QuizResultType = {
  quizQuestionId: string;
  question?: string;
  clientAnswer: string;
  quizCorrectAnswer: string;
  quizScore: number;
};

export type ScoreType = {
  id: string;
  quizid: string;
  userid?: string;
  score: number;
  useranswer: string;
  correctanswer: string;
  createdat: string;
  updatedat: string;
};

export type AttemptType = {
  id: string;
  articleid: string;
  quizid: string;
  userid?: string;
  score: number;
  timeSpent: number;
  createdat: string;
  updatedat: string;
};
