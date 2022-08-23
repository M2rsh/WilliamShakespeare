import { ApplicationCommandOptionType, CommandInteraction, EmbedBuilder, GuildMember, PermissionsBitField, User } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import { ErrorHandler } from "../utils/error_handler.js";
import { hasPermission } from "../utils/utils.js";
@Discord()
export class Command {
  @Slash({ name: "ban", description: "Bans user", dmPermission: false, defaultMemberPermissions: PermissionsBitField.Flags.BanMembers })
  async command(
    @SlashOption({ name: "user", description: "User", type: ApplicationCommandOptionType.User, })
    _user: User,
    @SlashOption({ name: "reason", description: "Reason", type: ApplicationCommandOptionType.String, required: false})
    reason: string | undefined,

    /*@SlashChoice({ name: "Don't Delete", value: 0 })
    @SlashChoice({ name: "6 Hours", value: 1 })
    @SlashChoice({ name: "12 Hours", value: 2 })
    @SlashChoice({ name: "24 Hours", value: 3 })
    @SlashChoice({ name: "3 Days", value: 4 })
    @SlashChoice({ name: "7 Days", value: 5 })
    @SlashOption({
      name: "delete_message_days",
      description: "Delete message days",
      required: false,
      type: ApplicationCommandOptionType.String,
    })
    deleteMessageDays: number | undefined,*/
    interaction: CommandInteraction,
  ): Promise<void> {
    try {
      if(!(await hasPermission(interaction, PermissionsBitField.Flags.BanMembers))) { return ErrorHandler('I don\'t have permission to do that.', interaction) }
      const user: GuildMember | undefined = await interaction.guild?.members.fetch(_user.id)
      if (!user) { throw Error("Member cannot be found.") }
      const author: GuildMember | undefined = await interaction.guild?.members.fetch(interaction.user.id)
      if (!author) { throw Error("Something went wrong.") }
      if ((interaction.guild?.members.me?.roles.highest.position || 0) <= user.roles.highest.position) { return ErrorHandler('I cannot ban this user.', interaction) }
      if (user.roles.highest.position > author.roles.highest.position) { return ErrorHandler('You cannot ban user that is higher or the same hierarchy level as you.', interaction) }
      var embed = new EmbedBuilder()
        .setDescription(`<:bonk:1011574424845156373> You've been banned from \`${interaction.guild}\``)
        .setFields({ name: "Reason", value: `${reason}`, inline: true }, { name: "Banned by", value: `${author}`, inline: true })
        .setColor("#c4a7e7")
      user.send({ embeds: [embed] })
      
      user.ban({reason: `${reason} | Banned by ${author?.id}` })

      var embed = new EmbedBuilder()
        .setDescription(`<:bonk:1011574424845156373> Banned ${user}`)
        .setFields({ name: "Reason", value: `${reason}`, inline: true }, { name: "Banned by", value: `${author}`, inline: true })
        .setColor("#c4a7e7")
      interaction.reply({ embeds: [embed] })
    } catch (e) {
      await ErrorHandler(e, interaction);
    }
  }
}
