"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  // automatically redirect to /builder/experience
  const router = useRouter();
  useEffect(() => {
    router.push("/builder/experience");
  }, [router]);

  return null;
}
