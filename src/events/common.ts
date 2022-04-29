import type { ArgsOf, Client } from "discordx";
import { Discord, On } from "discordx";
import { logger } from "../main.js";
@Discord()
export class Example {
  @On("error")
  onError([error]: ArgsOf<"error">, client: Client): void {
    logger.error("Error", client.user?.username, error.message);
  }
  @On("interactionCreate")
  onInteraction(
    [interaction]: ArgsOf<"interactionCreate">,
    client: Client
  ): void {
    if (!interaction.isCommand()) return;
    logger.log(
      "Info",
      `User: '${interaction.user?.username}', Command: '${interaction.commandName}'`
    );
  }
}
