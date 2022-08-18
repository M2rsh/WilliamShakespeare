import { Get, Middleware, Router } from "@discordx/koa";
import type { Context } from "koa";
import { log } from "./utils.js";

@Middleware(log)
@Router()
export class API {
  @Get("/")
  index(context: Context): void {
    context.body = `
    <html>
    <head>
      <meta name="title" content="William Shakespeare API">
      <meta name="description" content="an API for William Shakespeare botMore info at https://discord.gg/dfKMTx9Eea">
      <meta name="keywords" content="ddd, ddd">
      <meta name="robots" content="noindex, nofollow">
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="language" content="English">
      <meta name="author" content="M2rsh - Lizzy Bo Bizzy Mc Skizzy">
      <meta name="theme-color" content="#f6c177">
      <meta property="og:image" content="https://cdn.discordapp.com/avatars/969292707019247717/71e3f6be7d431b0aa247d22f9b00e665.webp?size=512" />
      <meta name="twitter:card" content="summary_large_image">
      <style>
        body {
          background-color: #1f1d2e;
          color: #e0def4;
          font-family: "Lato", sans-serif;
          font-family: "Nunito", sans-serif;
        }
  
        a {
          color: #f6c177;
          text-decoration: none;
        }
        a:hover {
          color: #ebbcba;
          text-decoration: underline;
        }
  
      </style>
    </head>
    <body>
      <div style="text-align: center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Shakespeare.jpg/220px-Shakespeare.jpg"
          alt="William Shakespeare"
        />
        <h1>
          William Shakespeare Bot API
          <p style="font-size: 0.4em">
            Powered by <a href="https://koajs.com/">koa</a> and
            <a href="https://www.npmjs.com/package/@discordx/koa"
              >@discordx/koa</a
            >
          </p>
        </h1>
  
        <h2>Routes:</h2>
        <p><a href="logs">Logs</a> <br/><br/> - Requires authentication</p>
        <p><a href="guilds">Guilds</a></p>
      </div>
    </body>
  </html>  
    `;
  }
}
