import { Get, Router } from "@discordx/koa";
import type { Context } from "koa";

@Router()
export class API {
  @Get("/")
  index(context: Context): void {
    context.body = `
    <html>
    <head>
      <meta name="title" content="William Shakespeare API" />
      <meta
        name="description"
        content="API for William Shakespeare Discord bot"
      />
      <meta name="robots" content="noindex, nofollow" />
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="author" content="M2rsh" />
      <style>
        body {
          background-color: #252232;
          color: #daddcd;
          font-family: "Lato", sans-serif;
          font-family: "Nunito", sans-serif;
        }
  
        a {
          color: #ffb183;
          text-decoration: none;
        }
        a:hover {
          color: #ffb183;
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
        <a href="guilds">Guilds</a>
      </div>
    </body>
  </html>  
    `;
  }
}
