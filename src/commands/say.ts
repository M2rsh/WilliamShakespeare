import { RateLimit, TIME_UNIT } from "@discordx/utilities";
import { ApplicationCommandOptionType, CommandInteraction } from "discord.js";
import { Discord, Guard, Slash, SlashOption } from "discordx";
import { ErrorHandler } from "../utils/error_handler.js";

@Discord()
export class Command {
  @Slash({name: "say", description: "Say something as bot", dmPermission: true })
  @Guard(RateLimit(TIME_UNIT.seconds, 5, {
    message: "This command is on cooldown. Please wait until {until}.", ephemeral: true
  }))
  async command(
    @SlashOption({name: "text", description: "What do you want me to say?", required: true, type: ApplicationCommandOptionType.String })
    text: string,
    interaction: CommandInteraction
  ): Promise<void> {
    try {
      var text = text.replaceAll("@everyone", "@\u200Beveryone");
      text.length > 2000 ? (text = text.substring(0, 2000)) : text;
      // Allow a little bit of trolling.
      if (text.indexOf("<@") > -1) {
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
