import type { Context } from "hono"

export const onRampInr = async (c: Context) => {
  const parseData = OnRampInrSchema.safeParse(c.req.json())
  if (!parseData.success) {
    return c.json({ message: "Invalid Input" }, { status: 400 })
  }

  try {
    const { amount } = parseData.data;

  } catch (error) {
    return c.json({ message: "error while onramping Inr" }, { status: 500 })
  }
}
