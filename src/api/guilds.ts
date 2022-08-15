import { Get, Router } from "@discordx/koa";
import type { Context } from "koa";

import { bot } from "../main.js";
@Router()
export class API {
  @Get()
  guilds(ctx: Context): void {
    ctx.type = "application/json";
    ctx.body = JSON.parse(
      "{" +
        `${bot.guilds.cache.map(
          (g) =>
            `"${g.name}": {"id": ${g.id}, "owner": ${g.ownerId}, "description": "${g.description}"}`
        )}` +
        "}"
    );
  }
  @Get()
  info(ctx: Context): void {
    ctx.body = "Balls!";
  }
}
