import { relations, sql } from "drizzle-orm";
import { 
  pgSchema,
  pgTable,
  index,
  serial,
  text,
  timestamp,
  primaryKey,
  integer,
  varchar,
  bigint
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */

// export const posts = pgTable(
//   "post",
//   {
//     id: serial("id").primaryKey(),
//     name: varchar("name", { length: 256 }),
//     createdById: varchar("createdById", { length: 255 }).notNull(),
//     createdAt: timestamp("created_at")
//       .default(sql`CURRENT_TIMESTAMP`)
//       .notNull(),
//     updatedAt: timestamp("updatedAt")
//   },
//   (example) => ({
//     createdByIdIdx: index("createdById_idx").on(example.createdById),
//     nameIndex: index("name_idx").on(example.name),
//   })
// );

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
 })

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
}));

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
     id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({ columns: [account.provider, account.providerAccountId] }),
  })
  )

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
 })

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
 )

 // application schema

 export const authors = pgTable(
  "authors",
  {
    id: serial("id").primaryKey(),
    name: text("name"),
    bio: text("bio"),
  },
 )

 export const keywords = pgTable(
  "keywords", 
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
  }
 )

 export const papers = pgTable(
  "papers",
  {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    abstract: text("abstract"),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"),
    n_citation: integer("n_citation"),
    doi: text("doi"),
    url: text("url"),
  },
  (paper) => ({
    titleIndex: index("title_idx").on(paper.title),
  })
 )

 export const authorUsers = pgTable(
  "authorUsers",
  {
    authorId: integer("authorId").notNull().references(() => authors.id, { onDelete: "cascade" }),
    userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  },
  (au) => ({
    compoundKey: primaryKey({ columns: [au.authorId, au.userId] }),
  })
 )

 export const authorRelations = relations(authors, ({ one }) => ({
    users: one(users),
  }));

 export const paperAuthors = pgTable(
  "paperAuthors",
  {
    paperId: integer("paperId").notNull().references(() => papers.id, { onDelete: "cascade" }),
    authorId: integer("authorId").notNull().references(() => authors.id, { onDelete: "cascade" }),
  },
  (pa) => ({
    compoundKey: primaryKey({ columns: [pa.paperId, pa.authorId] }),
  })
 )

 export const paperKeywords = pgTable(
  "paperKeywords",
  {
    paperId: integer("paperId").notNull().references(() => papers.id, { onDelete: "cascade" }),
    keywordId: integer("keywordId").notNull().references(() => keywords.id, { onDelete: "cascade" }),
  },
  (pk) => ({
    compoundKey: primaryKey({ columns: [pk.paperId, pk.keywordId] }),
  })
 )

 export const paperReferences = pgTable(
  "paperReferences",
  {
    paperId: integer("paperId").notNull().references(() => papers.id, { onDelete: "cascade" }),
    referenceId: integer("referenceId").notNull().references(() => papers.id, { onDelete: "cascade" }),
  },
  (pc) => ({
    compoundKey: primaryKey({ columns: [pc.paperId, pc.referenceId] }),
  })
  )

  export const paperRelations = relations(papers, ({ many }) => ({
    authors: many(authors),
    keywords: many(keywords),
    references: many(papers),
  }));