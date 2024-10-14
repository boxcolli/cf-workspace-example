import { createRoute, z } from "@hono/zod-openapi"
import { zValidator } from "@hono/zod-validator"
import { tags } from "./config"

const req = z.object({
  name: z.string().optional().openapi({ example: "John Doe" }),
})

const res = z.object({
  msg: z.string().openapi({ example: "Hello, World!" }),
})

const route = createRoute({
  path: "/",
  method: "get",
  tags,
  request: { query: req },
  middleware: [zValidator("query", req)],
  responses: {
    200: {
      content: {
        "application/json": { schema: res },
      },
      description: "ok",
    },
  },
})

export default {
  route,
  schema: { req, res },
}