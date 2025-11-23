"use client";

import React, { useState } from "react";
import { CreateMockTopic } from "./_components";

const MockDatasPage = () => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="w-full h-screen text-white flex flex-col bg-white/10 rounded-2xl p-5 gap-6">
      <CreateMockTopic setLoading={setLoading} loading={loading} />

      <div></div>
    </div>
  );
};
export default MockDatasPage;
