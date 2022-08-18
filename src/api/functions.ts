import { Get, Middleware, Router } from "@discordx/koa";
import type { Context, Next } from "koa";
import fs from "fs";
import { bot } from "../main.js";

function Authenticated(ctx: Context, next: Next) {
  if(ctx.query.key === process.env.AUTH_KEY) {
    return next();
  } else {
    ctx.type = "application/json";
    ctx.status = 401;
    ctx.body = {"error": 401, "message": "Unauthorized"};
    return;
  }
}

@Router()
export class API {
  @Get()
  guilds(ctx: Context, next: Next): Promise<Next> {
    ctx.type = "application/json";
    ctx.body = JSON.parse(
      "{" +
        `${bot.guilds.cache.map(
          (g) =>
            `"${g.name}": {"id": ${g.id}, "owner": ${g.ownerId}, "description": "${g.description}"}`
        )}` +
        "}"
    );
    return next()
  }
  @Get()
  @Middleware(Authenticated)
  logs(ctx: Context, next: Next): Promise<Next> {
    const _files = fs.readdirSync("logs/");
    var files : any = [];
    _files.forEach((file) => {
      if (file.endsWith(".log")) {
        files.push(+file.replace(".log", ""));
      }
    });

    ctx.body = fs.readFileSync(`logs/${Math.max(...files)}.log`, "utf8");
    return next()
  }
}
