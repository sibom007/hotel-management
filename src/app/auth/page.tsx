import { auth } from "@/lib/auth";
import AuthView from "@/modules/auth/view/Auth-view";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/");
  }

  return <AuthView />;
}

export default Page;
