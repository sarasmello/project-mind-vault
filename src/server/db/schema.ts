import {
  sqliteTable,
  text,
  integer,
  real,
  index,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

// ─── DOMÍNIOS DE DESEMPENHO (8) ──────────────────────────────────────────────

export const domains = sqliteTable("domains", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  longDescription: text("long_description"),
  color: text("color").notNull(),
  icon: text("icon").notNull(),
  order: integer("order").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
});

// ─── ATIVIDADES DOS DOMÍNIOS ──────────────────────────────────────────────────

export const activities = sqliteTable("activities", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  domainId: text("domain_id")
    .notNull()
    .references(() => domains.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  order: integer("order").notNull(),
});

// ─── RESULTADOS ESPERADOS ─────────────────────────────────────────────────────

export const outcomes = sqliteTable("outcomes", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  domainId: text("domain_id")
    .notNull()
    .references(() => domains.id),
  text: text("text").notNull(),
  order: integer("order").notNull(),
});

// ─── PRINCÍPIOS DE ENTREGA (12) ───────────────────────────────────────────────

export const principles = sqliteTable("principles", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  shortDescription: text("short_description").notNull(),
  fullDescription: text("full_description").notNull(),
  rationale: text("rationale").notNull(),
  examples: text("examples").notNull(), // JSON array
  color: text("color").notNull(),
  order: integer("order").notNull(),
});

// ─── RELAÇÃO DOMÍNIO ↔ PRINCÍPIOS (N:N) ──────────────────────────────────────

export const domainPrinciples = sqliteTable(
  "domain_principles",
  {
    domainId: text("domain_id")
      .notNull()
      .references(() => domains.id),
    principleId: text("principle_id")
      .notNull()
      .references(() => principles.id),
    relevance: text("relevance"),
  },
  (table) => [primaryKey({ columns: [table.domainId, table.principleId] })]
);

// ─── DILEMAS DO SIMULADOR ─────────────────────────────────────────────────────

export const dilemmas = sqliteTable(
  "dilemmas",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    domainId: text("domain_id").references(() => domains.id),
    scenario: text("scenario").notNull(),
    context: text("context"),
    correctPrincipleId: text("correct_principle_id")
      .notNull()
      .references(() => principles.id),
    explanation: text("explanation").notNull(),
    tip: text("tip"),
    difficulty: text("difficulty", {
      enum: ["easy", "medium", "hard"],
    })
      .notNull()
      .default("medium"),
    options: text("options").notNull(), // JSON array de 5 slugs
    createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
      () => new Date()
    ),
  },
  (table) => [index("dilemmas_domain_idx").on(table.domainId)]
);

// ─── RESPOSTAS DOS DILEMAS ────────────────────────────────────────────────────

export const dilemmaAnswers = sqliteTable(
  "dilemma_answers",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    dilemmaId: text("dilemma_id")
      .notNull()
      .references(() => dilemmas.id),
    principleId: text("principle_id")
      .notNull()
      .references(() => principles.id),
    isCorrect: integer("is_correct", { mode: "boolean" }).notNull(),
    sessionId: text("session_id").notNull(),
    answeredAt: integer("answered_at", { mode: "timestamp" }).$defaultFn(
      () => new Date()
    ),
  },
  (table) => [index("answers_session_idx").on(table.sessionId)]
);

// ─── PROGRESSO FLASHCARDS (SM-2) ──────────────────────────────────────────────

export const flashcardProgress = sqliteTable(
  "flashcard_progress",
  {
    cardId: text("card_id").primaryKey(),
    interval: integer("interval").notNull().default(1),
    easiness: real("easiness").notNull().default(2.5),
    repetitions: integer("repetitions").notNull().default(0),
    nextReview: integer("next_review", { mode: "timestamp" }).notNull(),
    lastReview: integer("last_review", { mode: "timestamp" }).notNull(),
    quality: integer("quality").notNull(),
  },
  (table) => [
    index("flashcard_next_review_idx").on(table.nextReview),
  ]
);

// ─── MODELOS E MÉTODOS ────────────────────────────────────────────────────────

export const models = sqliteTable(
  "models",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    type: text("type", {
      enum: [
        "analysis",
        "planning",
        "communication",
        "estimation",
        "risk",
        "quality",
        "other",
      ],
    }).notNull(),
    domainIds: text("domain_ids").notNull(),   // JSON array
    approaches: text("approaches").notNull(),   // JSON array
    summary: text("summary").notNull(),
    whenToUse: text("when_to_use").notNull(),
    howToUse: text("how_to_use").notNull(),
    example: text("example").notNull(),
    tags: text("tags").notNull(),              // JSON array
    references: text("references"),
    createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
      () => new Date()
    ),
  },
  (table) => [index("models_type_idx").on(table.type)]
);

// ─── RELATIONS ────────────────────────────────────────────────────────────────

export const domainsRelations = relations(domains, ({ many }) => ({
  activities: many(activities),
  outcomes: many(outcomes),
  domainPrinciples: many(domainPrinciples),
  dilemmas: many(dilemmas),
}));

export const principlesRelations = relations(principles, ({ many }) => ({
  domainPrinciples: many(domainPrinciples),
  dilemmas: many(dilemmas),
}));

export const domainPrinciplesRelations = relations(
  domainPrinciples,
  ({ one }) => ({
    domain: one(domains, {
      fields: [domainPrinciples.domainId],
      references: [domains.id],
    }),
    principle: one(principles, {
      fields: [domainPrinciples.principleId],
      references: [principles.id],
    }),
  })
);

export const dilemmasRelations = relations(dilemmas, ({ one, many }) => ({
  domain: one(domains, {
    fields: [dilemmas.domainId],
    references: [domains.id],
  }),
  correctPrinciple: one(principles, {
    fields: [dilemmas.correctPrincipleId],
    references: [principles.id],
  }),
  answers: many(dilemmaAnswers),
}));
