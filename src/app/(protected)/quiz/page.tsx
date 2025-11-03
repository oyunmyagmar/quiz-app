import React from "react";
import { Button } from "@/components/ui";
import { IoCloseOutline } from "react-icons/io5";

const QuizPage = () => {
  return (
    <div className="w-full h-full bg-secondary flex justify-center">
      <div className="flex flex-col mt-30 mx-50 gap-6">
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <img src="/article-icon.svg" />
              <div>Quick test</div>
            </div>
            <div>Take a quick test about your knowledge from your content </div>
          </div>
          <Button variant={"outline"} className="h-10">
            <IoCloseOutline size={16} />
          </Button>
        </div>

        <div className="w-full bg-background rounded-lg p-7 border border-border">
          <div className="flex flex-col gap-5">
            <div className="flex justify-between">
              <div>What was Genghis Khan’s birth name?</div>
              <div>{"1"}/5</div>
            </div>
            <div className="flex flex-wrap">
              {["Yesugei", "Temüjin", "Jamukha", "Toghrul"].map((el) => (
                <Button variant={"outline"} className="w-1/2 h-10">
                  {el}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default QuizPage;
