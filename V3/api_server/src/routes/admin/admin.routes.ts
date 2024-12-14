import { zValidator } from "@hono/zod-validator";
import { z } from 'zod'
import { Hono, type Context } from "hono";
import { authMiddleware } from "../../middlewares/auth.middlewares.js";

const adminRoute = new Hono()
  .post("/create/category/",
    authMiddleware,
    zValidator("json",
      z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        icon: z.string().min(1)
      })
    ),
    async (c: Context) => {


    }
  )

export default adminRoute;
