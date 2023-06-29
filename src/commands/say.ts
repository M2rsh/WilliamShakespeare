import { RateLimit, TIME_UNIT } from "@discordx/utilities";
import { ApplicationCommandOptionType, CommandInteraction } from "discord.js";
import { Discord, Guard, Slash, SlashOption } from "discordx";
import { ErrorHandler } from "../utils/error_handler.js";

@Discord()
export class Command {
  @Slash({name: "say", description: "Say something as bot", dmPermission: true })
  async command(
    @SlashOption({name: "text", description: "What do you want me to say?", required: true, type: ApplicationCommandOptionType.String })
    @SlashOption({name: "reply", description: "Message URL or ID to reply to", required: false, type: ApplicationCommandOptionType.String })
    @SlashOption({name: "attachments", description: "Message URL or ID to reply to", required: false, type: ApplicationCommandOptionType.String })
    text: string,
    interaction: CommandInteraction
  ): Promise<void> {
    try {
      text = text.replaceAll("@everyone", "@\u200Beveryone");
      let cope = text.indexOf("<@") > -1 || ;
      text.length > 2000 ? (text = text.substring(0, 2000)) : text;
      // Allow a little bit of trolling.
      if (cope) {
        await interaction.reply({ content: text, ephemeral: true });
        interaction.channel?.send({ content: text });
      } else{
        interaction.reply({ content: text })
      }
    } catch (e) {
      await ErrorHandler(e, interaction);
    }
  }
}
