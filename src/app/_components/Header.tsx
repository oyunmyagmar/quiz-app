"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  Button,
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
import { TbPacman } from "react-icons/tb";

export const Header = () => {
  const router = useRouter();
  return (
    <header className="w-screen fixed z-50 px-6 py-2.5 bg-background border border-input">
      <div className="flex justify-between items-center">
        <div
          onClick={() => router.push("/")}
          className="text-2xl leading-9 font-semibold cursor-pointer"
        >
          Quiz app
        </div>

        <Drawer direction="right">
          <DrawerTrigger>
            <Button variant={"outline"} className="rounded-full cursor-pointer">
              <TbPacman size={16} />
            </Button>
          </DrawerTrigger>

          <DrawerContent className="data-[vaul-drawer-direction=right]:sm:max-w-fit">
            <DrawerHeader>
              <DrawerTitle>User:</DrawerTitle>
              <DrawerDescription>History </DrawerDescription>
            </DrawerHeader>

            <Tabs defaultValue="account" className="w-fit px-5">
              <TabsList>
                <TabsTrigger value="article">Articles</TabsTrigger>
                <TabsTrigger value="quiz">Quizzes</TabsTrigger>
                <TabsTrigger value="attempt">Attempts</TabsTrigger>
                <TabsTrigger value="score">Scores</TabsTrigger>
              </TabsList>
              <TabsContent value="article">Uploaded articles list.</TabsContent>
              <TabsContent value="quiz">Quizzes list</TabsContent>
              <TabsContent value="attempt">Quiz attempts</TabsContent>
              <TabsContent value="score">Quiz scores </TabsContent>
            </Tabs>
          </DrawerContent>
        </Drawer>
      </div>
    </header>
  );
};
