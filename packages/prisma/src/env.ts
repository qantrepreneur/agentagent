import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

const env = createEnv({
  server: {
    DATABASE_USERNAME: z.string().nonempty(),
    DATABASE_PASSWORD: z.string().nonempty(),
    DATABASE_URL: z.string().nonempty(),
  },
  runtimeEnv: process.env,
});

export default env;
