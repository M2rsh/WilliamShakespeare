import { Get, Router } from "@discordx/koa";
import type { Context } from "koa";

import { bot } from "../main.js";
@Router()
export class API {
  @Get()
  guilds(context: Context): void {
    context.body = `${bot.guilds.cache.map((g) => `${g.id}: ${g.name}\n`)}`;
  }
}
