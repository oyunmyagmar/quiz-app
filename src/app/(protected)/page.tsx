import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const Homepage = () => {
  return (
    <div className="w-full h-full bg-secondary flex justify-center">
      <div className="bg-background w-214 flex flex-col p-7 mt-12 rounded-lg h-fit gap-5 text-muted-foreground border border-border">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center text-2xl leading-8 font-semibold text-foreground">
            <img src="/article-icon.svg" alt="" className="w-6 h-6" />
            <div>Article Quiz Generator</div>
          </div>
          <div className="text-base leading-[19.2px]">
            Paste your article below to generate a summarize and quiz question.
            Your articles will saved in the sidebar for future reference.
          </div>
        </div>

        <div className="flex flex-col gap-1 text-sm leading-5">
          <div className="flex gap-1 items-center">
            <img src="/article-note.svg" alt="" className="px-0.5 py-[px]" />
            <Label className="font-semibold">Article Title</Label>
          </div>
          <Input
            placeholder="Enter a title for your article..."
            className="py-2"
          />
        </div>

        <div className="flex flex-col gap-1 text-sm leading-5">
          <div className="flex gap-1 items-center">
            <img src="/article-note.svg" alt="" className="px-0.5 py-[px]" />
            <Label className="font-semibold">Article Content</Label>
          </div>

          <Textarea
            placeholder="Paste your article content here..."
            className=" min-h-30"
          />
        </div>
        <div className="flex justify-end">
          <Button className="w-fit h-10">Generate summary</Button>
        </div>
      </div>
    </div>
  );
};
export default Homepage;
