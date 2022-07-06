import type { ArgsOf, Client } from "discordx";
import { Discord, On } from "discordx";
import { logger } from "../main.js";
@Discord()
export class Example {
  /*@On("error")
  onError([error]: ArgsOf<"error">, client: Client): void {
    logger.error("Error", client.user?.username, error.message);
  }*/
  @On("guildCreate")
  async onGuildCreate(
    [interaction]: ArgsOf<"guildCreate">,
    client: Client
  ): Promise<void> {
    await client.guilds.fetch();
    await client.initApplicationCommands();
    await client.initApplicationPermissions();
    //logger.info(`Guild: '${interaction.name}', ID: '${interaction.id}'`);
  }
  @On("interactionCreate")
  onInteraction(
    [interaction]: ArgsOf<"interactionCreate">,
    client: Client
  ): void {
    process.on("uncaughtException", (e) => {
      // nothin
    });
    if (!interaction.isCommand()) return;
    logger.info(
      `User: '${interaction.user?.username}', Command: '${interaction.commandName}'`
    );
  }
}
