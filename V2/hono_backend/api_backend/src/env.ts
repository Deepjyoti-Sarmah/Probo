import { z } from "zod"

const EnvSchema = z.object({
  PORT: z.coerce.number().default(3000),
  JWT_SECRET: z.string().min(6),
  REDIS_URL: z.string().default("redis://localhost:6379")
})

export type env = z.infer<typeof EnvSchema>;

const env = EnvSchema.parse(process.env);

if (!env) {
  console.error("Invalid env: ")
  console.error(JSON.stringify(env))
  process.exit(1)
}

export default env;
