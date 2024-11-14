"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/Login");
  }, [router]);

  return <div>Redirecting...</div>;
};

export default Page;
