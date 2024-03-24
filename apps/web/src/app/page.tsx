import { unstable_noStore as noStore } from "next/cache";

import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import Header from "@/components/header";
import Dashboard from "@/components/dashboard";

export default async function Home() {
  noStore();
  const session = await getServerAuthSession();
  const hello = await api.user.hello.query({ text: "from tRPC" });
  // const userPapers = await api.user.g
  const userPapers: Paper[] = []
  return (
    <main className="min-h-screen">
      <div className="flex flex-col min-h-screen">
        <Header session={session}/>
        <div className="">
          <Dashboard session={session} userPapers={userPapers} />
          {hello.greeting}
        </div>
      </div>
    </main>
  );
}
