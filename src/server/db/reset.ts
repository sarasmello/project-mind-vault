import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "local.db");

if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
  console.log("🗑️  Banco removido:", dbPath);
}

console.log("✅ Reset concluído. Execute: pnpm db:push && pnpm db:seed");
process.exit(0);
