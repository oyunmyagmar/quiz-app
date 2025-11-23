"use client";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LoaderCircle, TextSearch } from "lucide-react";
import { MockTopicType } from "@/lib/types";
import { useMockTopic } from "@/app/_hooks/use-mock-topic";

export const StudySessionTitle = () => {
  const [studySessionTitleValue, setStudySessionTitleValue] =
    useState<string>("");
  const [foundMockTopics, setFoundMockTopics] = useState<
    MockTopicType[] | null
  >(null);
  const [open, setOpen] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(-1);
  const { mockTopics, loading, setLoading } = useMockTopic();

  const handleStudySessionTitleInputChange = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setStudySessionTitleValue(value);
    setIndex(-1);
    if (value.length === 0) {
      setOpen(false);
      setFoundMockTopics(null);
      setLoading(false);
      return;
    }
    setOpen(true);
    setLoading(true);
    setFoundMockTopics(mockTopics);
    setLoading(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!foundMockTopics?.length) return;
    switch (e.key) {
      case "Enter":
        e.preventDefault();
        if (index >= 0 && index < foundMockTopics.length) {
          const selectedMockTopic = foundMockTopics[index].mockTitle;
          setStudySessionTitleValue(selectedMockTopic);
        } else if (studySessionTitleValue.trim()) {
          setStudySessionTitleValue(studySessionTitleValue);
        }
        setOpen(false);
        break;
      case "ArrowUp":
        e.preventDefault();
        setIndex((prev) => (prev <= 0 ? foundMockTopics.length - 1 : prev - 1));
        break;
      case "ArrowDown":
        e.preventDefault();
        setIndex((prev) => (prev >= foundMockTopics.length - 1 ? 0 : prev + 1));
    }
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <Label>Study Session Title</Label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <div className="w-full flex items-center">
            <TextSearch className="pl-2" />
            <Input
              value={studySessionTitleValue}
              onChange={handleStudySessionTitleInputChange}
              onKeyDown={handleKeyDown}
              type="text"
              placeholder="Type here..."
              className="w-full -ml-6 pl-8 border-[#323743FF]"
            />
          </div>
        </PopoverTrigger>

        <PopoverContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
          side="bottom"
          align="center"
          sideOffset={2}
          className="w-(--radix-popover-trigger-width) bg-[#000000FF]/90 border-[#323743FF] text-[#BDC1CAFF]"
        >
          <div>
            {loading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              foundMockTopics?.map((topic, i) => (
                <div
                  key={topic._id}
                  onMouseEnter={() => setIndex(i)}
                  onClick={() => {
                    setStudySessionTitleValue(topic.mockTitle);
                    setOpen(false);
                  }}
                  className={
                    i === index
                      ? "bg-[#0E1B2EFF] rounded-xs pl-1.5 cursor-pointer"
                      : ""
                  }
                >
                  {topic.mockTitle}
                </div>
              ))
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
