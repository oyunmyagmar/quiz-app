"use client";

import { useUser } from "@clerk/nextjs";
import { AppSidebar, Header } from "../_components";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { UserResource } from "@clerk/shared/index-DUJxisRL";
import { toast } from "sonner";
import { UserType } from "@/lib/types";
import { Toaster } from "@/components/ui";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const [quizAppUser, setQuizAppUser] = useState<UserType | null>(null);
  const router = useRouter();
  console.log({ quizAppUser });

  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/login");
    }

    if (isLoaded && user) {
      registerUser(user);
    }
  }, [isLoaded, user]);

  const registerUser = async (user: UserResource) => {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: user.firstName,
      }),
    });

    if (response.ok) {
      toast("User registered successfully");
      const { data } = await response.json();
      if (data) {
        setQuizAppUser(data);
      }
    } else {
      alert("User register error");
    }
  };

  if (!isLoaded) {
    return (
      <div className="w-screen h-screen flex">
        <div className="flex w-full h-full items-center justify-center">
          <AiOutlineLoading className="animate-spin" />
          <div>Loading</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex">
      <AppSidebar />
      <Header />
      {children}
      <Toaster position="top-center" />
    </div>
  );
}
