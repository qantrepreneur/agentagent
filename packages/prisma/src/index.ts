import env from "./env";
import { PrismaClient } from "./generated/client";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: env.DATABASE_URL,
    },
  },
});

export default prisma;
