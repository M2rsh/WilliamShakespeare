import { ApplicationCommandOptionType, CommandInteraction, EmbedBuilder, User } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import { ErrorHandler } from "../utils/error_handler.js";
@Discord()
export class Command {
  @Slash({name: "iq", description: "Get someone's IQ", dmPermission: true })
  async command(
    @SlashOption({
      name: "user",
      description: "User to rate",
      required: false,
      type: ApplicationCommandOptionType.User,
    })
    user: User | undefined,
    interaction: CommandInteraction
  ) {
    try {
      const iq = Math.floor(Math.random() * 200);
      const embed = new EmbedBuilder()
        .setDescription(
          `${user ? user : interaction.user} ${iq <= 10 ? "has extreme brain damage, with an IQ of" : "IQ is"} ${iq}`
        )
        .setColor("#c4a7e7")
        .setTimestamp();
      interaction.reply({ embeds: [embed] });
    } catch (e) {
      await ErrorHandler(e, interaction);
    }
  }
}
