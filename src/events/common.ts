import type { ArgsOf, Client } from "discordx";
import { Discord, On } from "discordx";
import { botLogger } from "../main.js";
//import { ErrorHandler } from "../utils/error_handler.js";

@Discord()
export class commonEvents {
  /*@On({event:"guildCreate"}) // I have no idea if this is still necesary but im too lazy to check so it will just be here in case lol
  async onGuildCreate(
    [interaction]: ArgsOf<"guildCreate">,
    client: Client
  ): Promise<void> {
    await client.guilds.fetch();
    await client.initApplicationCommands();
    //logger.info(`Guild: '${interaction.name}', ID: '${interaction.id}'`);
  }*/
  @On({event:"interactionCreate"})
  onInteraction(
    [interaction]: ArgsOf<"interactionCreate">,
    client: Client
  ): void {
    process.on("uncaughtException", (e) => {
      // nothin
      // This is just to make sure bot won't completely crash if error occurs
      // memory leak moment
    });
    if (!interaction.isCommand()) return;
    botLogger.info(
      `User: '${interaction.user?.tag}', Command: '${interaction.commandName}', Options '${interaction.options.data.map((o) => ` ${o.name}: "${o.value}"`)} '.`
    );
  }
}
