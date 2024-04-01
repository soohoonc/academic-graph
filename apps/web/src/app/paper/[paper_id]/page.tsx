import { getServerAuthSession } from "@/server/auth";
import { notFound } from "next/navigation";

interface PaperPageProps {
  params: {
    paper_id: string;
  };
}
const PaperPage = async ({ params }: PaperPageProps) => {
  const session = await getServerAuthSession();
  const paper = null;
  // const paper = await api.paper.get.query({ id: params.paper_id });
  console.log(paper, params.paper_id);
  if (!params.paper_id && !paper) {
    notFound();
  }
  return (
    <div>
      Paper viewed by: {session?.user?.email}, for paper id: {params.paper_id}{" "}
    </div>
  );
};

export default PaperPage;
