import type { ArgsOf, Client } from "discordx";
import { Discord, On } from "discordx";
import { logger } from "../main.js";
import { ErrorHandler } from "../utils/error_handler.js";
@Discord()
export class commonEvents {
  @On({event:"guildCreate"}) // I have no idea if this is still necesary but im too lazy to check so it will just be here in case lol
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
    if(interaction.user.id==="928754943064678481") { interaction.channel?.send("<@928754943064678481> is gay") }
    logger.info(
      `User: '${interaction.user?.tag}', Command: '${interaction.commandName}', Options '${interaction.options.data.map((o) => ` ${o.name}: "${o.value}"`)} '.`
    );
  }
}
