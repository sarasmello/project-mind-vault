import { initTRPC } from "@trpc/server";
import { ZodError } from "zod";
import { db } from "@/server/db";

export const createTRPCContext = async () => {
  return { db };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
      },
    };
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;
