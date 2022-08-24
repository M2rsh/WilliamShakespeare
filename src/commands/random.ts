import { ApplicationCommandOptionType, CommandInteraction, EmbedBuilder } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import { ErrorHandler } from "../utils/error_handler.js";

@Discord()
export class Command {
  @Slash({name: "random", description: "Sends a random number", dmPermission: true })
  async command(
    @SlashOption({name: "min", description: "Minimum number", type: ApplicationCommandOptionType.Integer })
    min: number,
    @SlashOption({name: "max", description: "Maximum number", type: ApplicationCommandOptionType.Integer })
    max: number,
    interaction: CommandInteraction
  ): Promise<void> {
    try {
        if (max > 2000 || min > 2000) { return ErrorHandler("Maximum number is 2000", interaction) }
        if (min >= max) { return ErrorHandler("Minimum number must be smaller than maximum", interaction) }
        const embed = new EmbedBuilder()
            .setFields({name: `Random number between ${min}-${max}`, value: Math.floor((Math.random() * (max-min)) + min).toString()})
            .setColor("#c4a7e7")
            .setTimestamp()
        interaction.reply({ embeds: [embed] });
    } catch (e) {
      await ErrorHandler(e, interaction);
    }
  }
}
