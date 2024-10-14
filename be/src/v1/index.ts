import { OpenAPIHono } from '@hono/zod-openapi'
import hello from "./hello"

const app = new OpenAPIHono<{ Bindings: Env }>()

app.route("/hello", hello.app)

const api = {
  hello: hello.api,
}

export default { app, api }
