import "./src/env";
import path from "node:path";
import type { PrismaConfig } from "prisma";

export default {
  earlyAccess: true,
  schema: path.join("src", "schema"),
} satisfies PrismaConfig;
