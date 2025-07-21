"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ClientWrapper({ children }) {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      router.push("/login");
    }
  }, []);

  return children;
}
