import React from "react";
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
  Button,
  Separator,
} from "@/components/ui";
import { LuCircleCheck } from "react-icons/lu";
import { IoCloseCircleOutline } from "react-icons/io5";

export const PrevAttemptsHistoryComp = () => {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button
          onClick={getQuizResults}
          size={"lg"}
          variant={"outline"}
          className="w-fit cursor-pointer"
        >
          View previous results
        </Button>
      </DrawerTrigger>

      <DrawerContent className="data-[vaul-drawer-direction=right]:sm:max-w-80">
        <DrawerHeader className="p-5">
          <DrawerTitle>User: {user?.firstName}</DrawerTitle>
          <DrawerDescription>Previous attempts {}</DrawerDescription>
        </DrawerHeader>

        <Tabs defaultValue="account" className="w-full px-5">
          {quizAllAttempts &&
            quizAllAttempts.map((attempt, i) => (
              <div key={attempt.id}>
                <TabsList>
                  <TabsTrigger value={`attempt${i}`}>
                    Attempt {i + 1}:
                  </TabsTrigger>
                </TabsList>

                <TabsContent value={`attempt${i}`}>
                  <TotalScoreComp
                    attempt={attempt}
                    quizPrevScoreResults={quizPrevScoreResults}
                  />
                  <div className="flex justify-between text-sm leading-5 font-medium">
                    <div> Time spent: {attempt.timespent}</div>
                  </div>
                  {quizPrevScoreResults
                    .filter((res) => res.attemptid === attempt.id)
                    .map((el, i) => (
                      <div
                        key={el.id}
                        className="flex gap-1 text-xs leading-4 font-medium"
                      >
                        <div>
                          {el.useranswer !== el.correctanswer ? (
                            <IoCloseCircleOutline className="text-red-700" />
                          ) : (
                            <LuCircleCheck className="text-green-500" />
                          )}
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <div className="text-muted-foreground">
                            {i + 1}. {""}
                          </div>
                          <div className="text-foreground">{el.useranswer}</div>
                          <div className="text-green-500">
                            {el.correctanswer !== el.useranswer &&
                              `Your answer: ${el.correctanswer}`}
                          </div>
                          <Separator className="w-full border-t border-dashed" />
                        </div>
                      </div>
                    ))}
                </TabsContent>
              </div>
            ))}
        </Tabs>
      </DrawerContent>
    </Drawer>
  );
};
