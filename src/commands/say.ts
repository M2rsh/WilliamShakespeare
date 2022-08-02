import { CommandInteraction } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import { ErrorHandler } from "../utils/error_handler.js";

@Discord()
export class Command {
  @Slash("say", { description: "Say something" })
  async say(
    @SlashOption("text", { description: "What do you want me to say?" })
    text: string,
    interaction: CommandInteraction
  ): Promise<void> {
    try {
      var text = text.replaceAll("@", "@\u200B");
      text.length > 2000 ? (text = text.substring(0, 2000)) : text;
      await interaction.deferReply({ ephemeral: true });
      interaction.channel?.send({ content: text });
    } catch (e) {
      ErrorHandler(e, interaction);
    }
  }
}
