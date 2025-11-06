"use client";
import { ArticleType } from "@/lib/types";
import React, { useEffect, useState } from "react";

export const useArticle = () => {
  const [allArticles, setAllArticles] = useState<ArticleType[]>([]);
  console.log(allArticles, "ALLARTICLES");

  const getAllArticles = async () => {
    const resultData = await fetch("/api/articles");
    const { data } = await resultData.json();

    if (data?.rows) {
      setAllArticles(data.rows);
    }
  };
  useEffect(() => {
    getAllArticles();
  }, []);

  return { allArticles };
};
