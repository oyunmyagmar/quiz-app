import React from "react";
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import { TbPacman } from "react-icons/tb";

export const SideBarDrawer = () => {
  return (
    <div>
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
  );
};
