import { z } from "zod";
import { type Paper, selectPapersSchema } from "@academic-graph/db/types";

import {
  createTRPCRouter,
  // protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const paperRouter = createTRPCRouter({
  hello: publicProcedure
    // .input(z.object({ text: z.string() }))
    .output(z.object({ greeting: z.string() }))
    .query(({}) => {
      return {
        greeting: `Hello (papers)`,
      };
    }),
    // .query(({ input }) => {
    //   return {
    //     greeting: `Hello (papers) ${input.text}`,
    //   };
    // }),

  getMany: publicProcedure
    .input(z.object({ limit: z.number().int().positive() }))
    .output(z.array(selectPapersSchema))
    .query(async ({ ctx, input }) => {
      // const result: Paper[] = await ctx.db.query.papers.findMany({
      //   limit: input.limit,
      // });
      return [];
    }),

  // create: protectedProcedure
  //   .input(z.object({ doi: z.string().min(1) }))
  //   .mutation(async ({ ctx, input }) => {
  //     const paper: Paper = await getPaper(input.doi)
  //     await ctx.db.insert(papers).values({
  //       doi: input.doi,
  //       title: paper.title,
  //       abstract: paper.abstract,
  //       n_citation: paper.n_citation,
  //       url: paper.url,
  //     });
  //   }),

  // getLatest: publicProcedure.query(({ ctx }) => {
  //   return ctx.db.query.posts.findFirst({
  //     orderBy: (posts, { desc }) => [desc(posts.createdAt)],
  //   });
  // }),

  // getSecretMessage: protectedProcedure.query(() => {
  //   return "you can now see this secret message!";
  // }),
});
