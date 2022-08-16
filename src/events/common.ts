import type { ArgsOf, Client } from "discordx";
import { Discord, On } from "discordx";
import { logger } from "../main.js";
@Discord()
export class commonEvents {
  @On("guildCreate")
  async onGuildCreate(
    [interaction]: ArgsOf<"guildCreate">,
    client: Client
  ): Promise<void> {
    await client.guilds.fetch();
    await client.initApplicationCommands();
    //logger.info(`Guild: '${interaction.name}', ID: '${interaction.id}'`);
  }
  @On("interactionCreate")
  onInteraction(
    [interaction]: ArgsOf<"interactionCreate">,
    client: Client
  ): void {
    process.on("uncaughtException", (e) => {
      // nothin
      // This is just to make sure bot won't completely crash if error occurs
    });
    if (!interaction.isCommand()) return;
    logger.info(
      `User: '${interaction.user?.username}', Command: '${interaction.commandName}'`
    );
  }
}
