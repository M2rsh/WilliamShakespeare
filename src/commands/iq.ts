import { ApplicationCommandOptionType, CommandInteraction, EmbedBuilder, PermissionsBitField, User } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import { ErrorHandler } from "../utils/error_handler.js";
@Discord()
export class Command {
  @Slash({name: "iq", description: "Calculate IQ", dmPermission: true, defaultMemberPermissions: PermissionsBitField.Flags.UseApplicationCommands })
  async iq(
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
