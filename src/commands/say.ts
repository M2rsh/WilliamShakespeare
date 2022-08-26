import { RateLimit, TIME_UNIT } from "@discordx/utilities";
import { CommandInteraction } from "discord.js";
import { Discord, Guard, Slash, SlashOption } from "discordx";
import { ErrorHandler } from "../utils/error_handler.js";

@Discord()
export class Command {
  @Slash({name: "say", description: "Say something as bot", dmPermission: true })
  @Guard(RateLimit(TIME_UNIT.seconds, 2, {
    message: "This command is on cooldown. Please wait until {until}.", ephemeral: true
  }))
  async command(
    @SlashOption({name: "text", description: "What do you want me to say?" })
    text: string,
    interaction: CommandInteraction
  ): Promise<void> {
    try {
      var text = text.replaceAll("@", "@\u200B");
      text.length > 2000 ? (text = text.substring(0, 2000)) : text;
      //await interaction.deferReply({ ephemeral: true });
      //interaction.channel?.send({ content: text });
      interaction.reply({ content: text })
    } catch (e) {
      await ErrorHandler(e, interaction);
    }
  }
}
