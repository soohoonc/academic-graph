// "use client";

// import { useRouter } from "next/navigation";
// import { useState } from "react";

// import { api } from "@/trpc/react";

// export function CreatePost() {
//   const router = useRouter();
//   const [doi, setDoi] = useState("");

//   const createPaper = api.paper.create.useMutation({
//     onSuccess: () => {
//       router.refresh();
//       setDoi("");
//     },
//   });

//   return (
//     <form
//       onSubmit={(e) => {
//         e.preventDefault();
//         createPaper.mutate({ doi });
//       }}
//       className="flex flex-col gap-2"
//     >
//       <input
//         type="text"
//         placeholder="Title"
//         value={doi}
//         onChange={(e) => setDoi(e.target.value)}
//         className="w-full rounded-full px-4 py-2 text-black"
//       />
//       <button
//         type="submit"
//         className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
//         disabled={createPaper.isLoading}
//       >
//         {createPaper.isLoading ? "Submitting..." : "Submit"}
//       </button>
//     </form>
//   );
// }
