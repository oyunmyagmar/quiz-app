import React from "react";
import {
  DateAndTime,
  MemberLimit,
  SessionDescription,
  Sessions,
  StudySessionTitle,
  SessionType,
} from "./_components";
import { Button } from "@/components/ui/button";

const CreateSessionPage = () => {
  return (
    <div className="w-full h-screen text-white flex justify-between mt-[47px] mb-[219px]">
      <div className="max-w-[457px] w-full bg-white/5 flex flex-col gap-5">
        <div className="text-4xl leading-10 font-semibold">Sessions</div>
        <Sessions />
      </div>

      <div className="max-w-[621px] w-full h-full px-[31px] py-[70px] flex flex-col gap-5 rounded-[10px] shadow-xs bg-[#0E1B2EFF]">
        <div>
          <div className="w-[290px] text-4xl leading-10 font-semibold text-neutral-200">
            Create New Session
          </div>
          <div className="text-sm leading-5 text-[#BDC1CAFF]">
            Define the details for your next learning session.
          </div>
        </div>
        <StudySessionTitle />
        <SessionDescription />
        <div className="w-full flex justify-between">
          <MemberLimit />
          <DateAndTime />
        </div>

        <SessionType />
        <Button className="w-full h-[46px] rounded-full bg-[#2563EB] hover:bg-[#1d4ed8]">
          Create Session
        </Button>
      </div>
    </div>
  );
};
export default CreateSessionPage;
