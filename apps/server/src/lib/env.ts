import { z } from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

const env = createEnv({
  server: {
    CORS_ORIGIN: z.string().nonempty(),
    BETTER_AUTH_SECRET: z.string().nonempty(),
    BETTER_AUTH_URL: z.string().nonempty(),
    GOOGLE_GENERATIVE_AI_API_KEY: z.string().optional(),
  },
  experimental__runtimeEnv: process.env,
});

export default env;
