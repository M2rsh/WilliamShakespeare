import { ApplicationCommandOptionType, CommandInteraction, EmbedBuilder, PermissionsBitField, User } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import { ErrorHandler } from "../utils/error_handler.js";
@Discord()
export class Command {
  @Slash({name: "rate", description: "Rate something", dmPermission: true, defaultMemberPermissions: PermissionsBitField.Flags.UseApplicationCommands })
  async rate(
    @SlashOption({name: "thing", description: "Thing to rate" }) thing: string,
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
        .setColor("#ffc800")
        .setTimestamp();
      interaction.reply({ embeds: [embed] });
    } catch (e) {
      ErrorHandler(e, interaction);
    }
  }
}
