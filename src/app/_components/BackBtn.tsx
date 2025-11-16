import React from "react";
import { Button } from "@/components/ui";
import { LuChevronLeft } from "react-icons/lu";
import { useRouter } from "next/navigation";

export const BackBtn = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push("/")}
      variant={"outline"}
      size={"lg"}
      className="w-fit"
    >
      <LuChevronLeft size={16} />
    </Button>
  );
};
