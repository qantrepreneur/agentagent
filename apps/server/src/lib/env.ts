import { z } from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

const env = createEnv({
  server: {
    CORS_ORIGIN: z.string().nonempty(),
    BETTER_AUTH_SECRET: z.string().nonempty(),
    BETTER_AUTH_URL: z.string().nonempty(),
    OPENROUTER_API_KEY: z.string().nonempty(),
  },
  experimental__runtimeEnv: process.env,
});

export default env;
