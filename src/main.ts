import "reflect-metadata";
import { dirname, importx } from "@discordx/importer";
import { Koa } from "@discordx/koa";
import type { Interaction, Message } from "discord.js";
import { Intents } from "discord.js";
import { Client } from "discordx";

import dotenv from "dotenv";
import log4js from "log4js";

dotenv.config();
//import publicIp from 'public-ip';
//const ipv4 = await publicIp.v4();

log4js.configure({
  appenders: {
    out: { type: "stdout" },
    file: {
      type: "multiFile",
      base: "logs/",
      property: "date",
      extension: ".log",
    },
  },
  categories: {
    default: { appenders: ["out", "file"], level: "info" },
  },
});
export const logger = log4js.getLogger("default");
logger.addContext("date", Date.now());

export const bot = new Client({
  // To only use global commands (use @Guild for specific guild command), comment this line
  botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)],

  // Discord intents
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],

  // Debug logs are disabled in silent mode
  silent: true,
  simpleCommand: {
    prefix: "!",
  },
});

bot.once("ready", async () => {
  await bot.guilds.fetch();
  await bot.initApplicationCommands();
  await bot.initApplicationPermissions();

  /*
  await bot.clearApplicationCommands(
    ...bot.guilds.cache.map((g) => g.id)
  );
  */

  bot.user!.setActivity(`Thy mum's moaning`, { type: "LISTENING" });

  logger.log("Info", "Bot Started");
});

bot.on("interactionCreate", (interaction: Interaction) => {
  bot.executeInteraction(interaction);
});

bot.on("messageCreate", (message: Message) => {
  bot.executeCommand(message);
});

async function run() {
  // The following syntax should be used in the commonjs environment
  //
  // await importx(__dirname + "/{events,commands,api}/**/*.{ts,js}");

  // The following syntax should be used in the ECMAScript environment
  await importx(
    dirname(import.meta.url) + "/{events,commands,api}/**/*.{ts,js}"
  );

  if (!process.env.BOT_TOKEN) {
    throw Error("Could not find BOT_TOKEN in your environment");
  }
  await bot.login(process.env.BOT_TOKEN);

  // ************* rest api section: start **********

  // api: prepare server
  const server = new Koa();
  await server.build();
  const port = process.env.PORT ?? 3000;
  server.listen(port, () => {
    logger.log("Info", `API Server Started. Visit http://localhost:${port}/`);
  });
}

run();
