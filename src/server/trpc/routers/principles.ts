import { z } from "zod";
import { eq, asc } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { router, publicProcedure } from "../trpc";
import { principles } from "@/server/db/schema";

export const principlesRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.query.principles.findMany({
      orderBy: asc(principles.order),
    });
  }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const principle = await ctx.db.query.principles.findFirst({
        where: eq(principles.slug, input.slug),
        with: {
          domainPrinciples: { with: { domain: true } },
        },
      });

      if (!principle) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Princípio não encontrado" });
      }

      return principle;
    }),
});
