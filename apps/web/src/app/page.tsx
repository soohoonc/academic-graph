import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import Graph from "@/components/graph";

export default async function Home() {
  noStore();
  // const hello = await api.post.hello.query({ text: "from tRPC" });
  // const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen">
      <Header />
      <Sidebar />
      <Graph />
      {/* {hello.greeting} */}
    </main>
  );
}
