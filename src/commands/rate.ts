import { ApplicationCommandOptionType, CommandInteraction, EmbedBuilder, User } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import { ErrorHandler } from "../utils/error_handler.js";
@Discord()
export class Command {
  @Slash({name: "rate", description: "Rate something", dmPermission: true })
  async command(
    @SlashOption({name: "thing", description: "Thing to rate", required: true, type: ApplicationCommandOptionType.String }) thing: string,
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
      const embed = new EmbedBuilder()
        .setDescription(
          `${user ? user : interaction.user} is ${Math.floor(
            Math.random() * 100
          )}% ${thing}`
        )
        .setColor("#c4a7e7")
        .setTimestamp();
      interaction.reply({ embeds: [embed] });
    } catch (e) {
      await ErrorHandler(e, interaction);
    }
  }
}
