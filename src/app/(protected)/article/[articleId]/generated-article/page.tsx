"use client";
import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogTrigger, Label } from "@/components/ui";
import { ArticleType } from "@/lib/types";
import { useParams, useRouter } from "next/navigation";
import { PiBookOpen } from "react-icons/pi";
import { SeeMoreContent } from "@/app/_components";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";

const GeneratedArticlePage = () => {
  const [selectedArticle, setSelectedArticle] = useState<ArticleType | null>(
    null
  );
  const { articleId } = useParams<{ articleId: string }>();
  const router = useRouter();

  const getSelectedArticle = async () => {
    const response = await fetch(`/api/article/${articleId}`);

    if (response.ok) {
      const { data } = await response.json();
      if (data) {
        setSelectedArticle(data);
      }
    }
  };

  useEffect(() => {
    getSelectedArticle();
  }, []);

  const getResults = async () => {
    const response = await fetch(`/api/article/${articleId}/quizzes/attempts`);

    if (response.ok) {
      const { data } = await response.json();

      console.log(data);
    }
  };

  return (
    <div className="w-full h-full bg-secondary flex justify-center">
      <div className="bg-background flex flex-col p-7 mt-26 mx-64 rounded-lg h-fit gap-5 text-primary border border-border">
        <div className="flex gap-2 items-center">
          <img src="/article-icon.svg" alt="" className="w-6 h-6" />
          <div className="text-2xl leading-8 font-semibold">
            Generated Article
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <PiBookOpen size={16} className="text-foreground" />
            <div className="text-sm leading-5 font-semibold text-[#737373]">
              Summarized content
            </div>
          </div>
          <div className="text-2xl leading-8 font-semibold">
            {selectedArticle?.title}
          </div>
          <div className="text-sm leading-5">{selectedArticle?.summary}</div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-1 items-center">
            <img src="/article-note.svg" alt="" className="px-0.5 py-[px]" />
            <Label className="text-muted-foreground">Article Content</Label>
          </div>
          <div className="text-sm leading-5 line-clamp-3">
            {selectedArticle?.content}
          </div>
          <div className="flex justify-end">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant={"ghost"}
                  size={"lg"}
                  className="w-fit h-7 py-1 cursor-pointer"
                >
                  See more
                </Button>
              </DialogTrigger>
              {selectedArticle && (
                <SeeMoreContent selectedArticle={selectedArticle} />
              )}
            </Dialog>
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            onClick={() => router.push(`/article/${articleId}/quizzes`)}
            size={"lg"}
            className="w-fit cursor-pointer"
          >
            Take a quiz
          </Button>

          <Drawer direction="right">
            <DrawerTrigger asChild>
              <Button
                onClick={getResults}
                size={"lg"}
                variant={"outline"}
                className="w-fit cursor-pointer"
              >
                View previous results
              </Button>
            </DrawerTrigger>

            <DrawerContent className="data-[vaul-drawer-direction=right]:sm:max-w-fit">
              <DrawerHeader className="p-5">
                <DrawerTitle>User:</DrawerTitle>
                <DrawerDescription>History </DrawerDescription>
              </DrawerHeader>

              <Tabs defaultValue="account" className="w-fit px-5">
                <TabsList>
                  <TabsTrigger value="quiz">Quizzes</TabsTrigger>
                  <TabsTrigger value="attempt">Attempts</TabsTrigger>
                  <TabsTrigger value="score">Scores</TabsTrigger>
                </TabsList>

                <TabsContent value="quiz">Quizzes list</TabsContent>
                <TabsContent value="attempt">Quiz attempts</TabsContent>
                <TabsContent value="score">Quiz scores </TabsContent>
              </Tabs>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
};
export default GeneratedArticlePage;
