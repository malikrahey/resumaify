"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

function Builder() {
  // automatically redirect to /builder/experience
  const router = useRouter();
  useEffect(() => {
    router.push("/experience");
  }, [router]);

  return null;
}



export default Builder