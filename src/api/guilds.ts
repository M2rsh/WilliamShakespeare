import { Get, Router } from "@discordx/koa";
import { BaseGuild } from "discord.js";
import type { Context } from "koa";

import { bot } from "../main.js";
@Router()
export class API {
  @Get()
  guilds(context: Context): void {
    context.body = JSON.stringify(JSON.parse('{'+`${bot.guilds.cache.map((g) => `"${g.name}": {"id": ${g.id}, "owner": ${g.ownerId}, "description": "${g.description}"}`)}`+'}'), null, 3);
  }
  @Get()
  info(context: Context): void {
    context.body = `Balls!`;
  }
}
