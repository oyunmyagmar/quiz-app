"use client";
import { ArticleType } from "@/lib/types";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export const useArticle = () => {
  const [allArticles, setAllArticles] = useState<ArticleType[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<ArticleType | null>(
    null
  );
  const { articleId } = useParams<{ articleId: string }>();

  const getAllArticles = async () => {
    const resultData = await fetch("/api/articles");
    const { data } = await resultData.json();

    if (data) {
      setAllArticles(data);
    }
  };

  const getSelectedArticle = async () => {
    const resData = await fetch(`/api/article/${articleId}`);
    const { data } = await resData.json();

    if (data) {
      setSelectedArticle(data);
    }
  };

  useEffect(() => {
    getAllArticles();
    if (articleId) {
      getSelectedArticle();
    }
  }, []);

  return {
    allArticles,
    selectedArticle,
  };
};
