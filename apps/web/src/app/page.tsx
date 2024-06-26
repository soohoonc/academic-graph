import { unstable_noStore as noStore } from "next/cache";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import Header from "@/components/header";
import Dashboard from "@/components/dashboard";
import { type Paper } from "@academic-graph/db/types";

export default async function Home() {
  noStore();
  const session = await getServerAuthSession();
  const papers: Paper[] = await api.paper.getMany.query({ limit: 10 }).then(res => {
    return res ?? [] as Paper[];
  });
  return (
    <main className="min-h-screen">
      <div className="flex min-h-screen flex-col">
        <Header session={session} />
        <div className="flex flex-col items-center justify-center">
          <Dashboard session={session} userPapers={papers} />
        </div>
      </div>
    </main>
  );
}
