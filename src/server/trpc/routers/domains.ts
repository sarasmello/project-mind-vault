import { z } from "zod";
import { eq, asc } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { router, publicProcedure } from "../trpc";
import { domains } from "@/server/db/schema";

export const domainsRouter = router({
  // Retorna todos os 8 domínios com seus princípios relacionados
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.query.domains.findMany({
      with: {
        domainPrinciples: {
          with: { principle: true },
        },
      },
      orderBy: asc(domains.order),
    });
  }),

  // Retorna um domínio completo pelo slug
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const domain = await ctx.db.query.domains.findFirst({
        where: eq(domains.slug, input.slug),
        with: {
          activities: { orderBy: (a: { order: unknown }, { asc }: { asc: (col: unknown) => unknown }) => [asc(a.order)] },
          outcomes: { orderBy: (o: { order: unknown }, { asc }: { asc: (col: unknown) => unknown }) => [asc(o.order)] },
          domainPrinciples: { with: { principle: true } },
        },
      });

      if (!domain) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Domínio não encontrado" });
      }

      return domain;
    }),
});
