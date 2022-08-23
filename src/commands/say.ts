import { CommandInteraction } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import { ErrorHandler } from "../utils/error_handler.js";

@Discord()
export class Command {
  @Slash({name: "say", description: "Say something", dmPermission: true })
  async command(
    @SlashOption({name: "text", description: "What do you want me to say?" })
    text: string,
    interaction: CommandInteraction
  ): Promise<void> {
    try {
      var text = text.replaceAll("@", "@\u200B");
      text.length > 2000 ? (text = text.substring(0, 2000)) : text;
      await interaction.deferReply({ ephemeral: true });
      interaction.channel?.send({ content: text });
    } catch (e) {
      await ErrorHandler(e, interaction);
    }
  }
}
