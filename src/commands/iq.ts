import { ApplicationCommandOptionType, CommandInteraction, EmbedBuilder, User } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import { ErrorHandler } from "../utils/error_handler.js";
@Discord()
export class Command {
  @Slash("iq", { description: "Calculate IQ" })
  async iq(
    @SlashOption("user", {
      description: "User to rate",
      required: false,
      type: ApplicationCommandOptionType.User,
    })
    user: User | undefined,
    interaction: CommandInteraction
  ) {
    try {
      const embed = new EmbedBuilder()
        .setDescription(
          `${user ? user : interaction.user} IQ is ${Math.floor(
            Math.random() * 200
          )}`
        )
        .setColor("#ffc800")
        .setTimestamp();
      interaction.reply({ embeds: [embed] });
    } catch (e) {
      ErrorHandler(e, interaction);
    }
  }
}
