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
