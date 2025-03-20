"use client"; // Il codice deve essere eseguito solo nel client

import { makeServer } from "@/server";
import { useEffect } from "react";

export function useMirage() {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.info("Start mirage server");
      makeServer();
    }
  }, []);
}
