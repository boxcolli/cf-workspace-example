import { OpenAPIHono } from "@hono/zod-openapi"
import get from "./get"
import { hc } from "hono/client"

const app = new OpenAPIHono<{ Bindings: Env }>()

const getRoute = app.openapi(get.route, async c => {
  const data = c.req.valid("query")
  const name = data.name

  if (name) {
    return c.json({ msg: `Hello, ${name}`}, 200)
  }

  return c.json({ msg: `Hello, World!` }, 200)
})

const api = {
  get: {
    ...get.schema,
    route: (url: string) => hc<typeof getRoute>(url).index.$get,
  },
}

export default { app, api }
