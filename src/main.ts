import "reflect-metadata";
import { dirname, importx } from "@discordx/importer";
import { Koa } from "@discordx/koa";
import { ActivityType, Interaction } from "discord.js";
import { IntentsBitField } from "discord.js";
import { Client } from "discordx";

import dotenv from "dotenv";
import log4js from "log4js";

dotenv.config();
//import publicIp from 'public-ip';
//const ipv4 = await publicIp.v4();
//const appenders = process.env.DEBUG=='0' ? ["file", "out"] : ["out"]
const appenders = ["file", "out"]
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
    default: { appenders: appenders, level: "info" },
    BOT: { appenders: appenders, level: "info" },
    API: { appenders: appenders, level: "info" },
  },
});

export const botLogger = log4js.getLogger("BOT");
botLogger.addContext("date", Date.now());
export const apiLogger = log4js.getLogger("API");
apiLogger.addContext("date", Date.now());

export const bot = new Client({
  // To only use global commands (use @Guild for specific guild command), comment this line
  // botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)],

  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.GuildVoiceStates,
  ],
  // Discord intents

  // Debug logs are disabled in silent mode
  silent: true,
  simpleCommand: {
    prefix: "!",
  },
});

bot.once("ready", async () => {

  await bot.clearApplicationCommands(
    ...bot.guilds.cache.map((g) => g.id)
  );

  await bot.guilds.fetch();
  await bot.initApplicationCommands();
  

  bot.user!.setActivity(`Thy mum's moaning`, { type: ActivityType.Listening });

  botLogger.log("Info", `Started. Version: ${process.env.WS_VERSION}`);
});

bot.on("interactionCreate", (interaction: Interaction) => {
  bot.executeInteraction(interaction);
});

/*bot.on("messageCreate", (message: Message) => {
  bot.executeCommand(message);
});*/

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
    apiLogger.log("Info", `Server Started. Visit http://localhost:${port}/`);
  });
}

run();
