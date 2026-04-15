import { router } from "./trpc";
import { domainsRouter } from "./routers/domains";
import { principlesRouter } from "./routers/principles";

export const appRouter = router({
  domains: domainsRouter,
  principles: principlesRouter,
});

export type AppRouter = typeof appRouter;
