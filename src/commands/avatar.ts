import { ApplicationCommandOptionType, CommandInteraction, EmbedBuilder, PermissionsBitField, User } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import { ErrorHandler } from "../utils/error_handler.js";

@Discord()
export class Command {
  @Slash({name: "avatar", description: "Get someones avatar", dmPermission: true, defaultMemberPermissions: PermissionsBitField.Flags.UseApplicationCommands })
  async command(
    @SlashOption({
        name: "user",
        description: "User to get avatar of",
        required: false,
        type: ApplicationCommandOptionType.User,
    })
    user: User | undefined,
    interaction: CommandInteraction
  ): Promise<void> {
    try {
      const _user = user ? user : interaction.user
      
      const embed = new EmbedBuilder()
        .setDescription(`${_user}'s avatar`)
        .setColor("#c4a7e7")
        .setImage(`${_user.displayAvatarURL({size: 1024})}`)
        .setTimestamp();
      interaction.reply({embeds: [embed]});
    } catch (e) {
      await ErrorHandler(e, interaction);
    }
  }
}
