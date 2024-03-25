import { unstable_noStore as noStore } from "next/cache";

import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import Header from "@/components/header";
import Dashboard from "@/components/dashboard";
import { type Paper } from "@academic-graph/db/types";;

export default async function Home() {
  noStore();
  const session = await getServerAuthSession();
  const papers = await api.paper.get({ limit: 10 }) as Paper[];
  return (
    <main className="min-h-screen">
      <div className="flex flex-col min-h-screen">
        <Header session={session}/>
        <div className="flex flex-col justify-center items-center">
          <Dashboard session={session} userPapers={papers} />
        </div>
      </div>
    </main>
  );
}
