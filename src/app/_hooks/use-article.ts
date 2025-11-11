"use client";
import React, { useEffect, useState } from "react";
import { ArticleType } from "@/lib/types";

export const useArticle = () => {
  const [allArticles, setAllArticles] = useState<ArticleType[]>([]);

  const getAllArticles = async () => {
    const resultData = await fetch("/api/articles");
    const { data } = await resultData.json();

    if (data) {
      setAllArticles(data);
    }
  };

  useEffect(() => {
    getAllArticles();
  }, []);

  return {
    allArticles,
    refetchGetAllArticles: getAllArticles,
  };
};
