import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import * as z from "zod";

import { authors, papers } from "./schema";

export const insertAuthorsSchema = createInsertSchema(authors);
export const selectAuthorsSchema = createSelectSchema(authors);

export const insertPapersSchema = createInsertSchema(papers);
export const selectPapersSchema = createSelectSchema(papers);

export type Paper = z.infer<typeof selectPapersSchema>;
export type Author = z.infer<typeof selectAuthorsSchema>;