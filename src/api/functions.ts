import { Get, Middleware, Router } from "@discordx/koa";
import type { Context, Next } from "koa";
import fs from "fs";
import { bot } from "../main.js";
import { log, Authenticated } from "../utils/api.js";

@Middleware(log)
@Router()
export class API {
  @Get()
  @Middleware(Authenticated)
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
    var files: any = [];
    _files.forEach((file: string) => {
      if (file.endsWith(".log")) {
        files.push(+file.replace(".log", ""));
      }
    });
    ctx.body = fs.readFileSync(`logs/${Math.max(...files)}.log`, "utf8");
    return next()
  }
  @Get("/robots.txt")
  robots(ctx: Context, next: Next): Promise<Next> {
    ctx.body = `User-agent: Googlebot
Disallow: /
User-agent: googlebot-image
Disallow: /
User-agent: googlebot-mobile
Disallow: /
User-agent: MSNBot
Disallow: /
User-agent: Slurp
Disallow: /
User-agent: Teoma
Disallow: /
User-agent: Gigabot
Disallow: /
User-agent: Robozilla
Disallow: /
User-agent: Nutch
Disallow: /
User-agent: ia_archiver
Disallow: /
User-agent: baiduspider
Disallow: /
User-agent: naverbot
Disallow: /
User-agent: yeti
Disallow: /
User-agent: yahoo-mmcrawler
Disallow: /
User-agent: psbot
Disallow: /
User-agent: yahoo-blogs/v3.9
Disallow: /
User-agent: *
Disallow: /
Disallow: /`
    return next()
  }
}
