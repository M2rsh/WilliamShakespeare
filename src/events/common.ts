import type { ArgsOf, Client } from "discordx";
import { Discord, On } from "discordx";
import { logger } from "../main.js";
import { ErrorHandler } from "../utils/error_handler.js";
@Discord()
export class commonEvents {
  @On({event:"guildCreate"})
  async onGuildCreate(
    [interaction]: ArgsOf<"guildCreate">,
    client: Client
  ): Promise<void> {
    await client.guilds.fetch();
    await client.initApplicationCommands();
    //logger.info(`Guild: '${interaction.name}', ID: '${interaction.id}'`);
  }
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
    logger.info(
      `User: '${interaction.user?.tag}', Command: '${interaction.commandName}', Options '${interaction.options.data.map((o) => ` ${o.name}: "${o.value}"`)} '.`
    );
  }
}
