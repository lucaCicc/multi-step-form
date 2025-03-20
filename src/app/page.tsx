import { MainRoutes } from "@/types";
import { redirect } from "next/navigation";

/**
 *
 *
 */
export default function Home() {
  redirect(MainRoutes.STEP_ONE);
}
