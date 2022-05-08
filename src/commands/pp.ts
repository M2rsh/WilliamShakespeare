import { CommandInteraction, MessageEmbed, User } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";

@Discord()
export class Command {
  @Slash("pp", { description: "Measure PP" })
  async pp(
    @SlashOption("user", { description: "User to rate", required: false, type: "USER" }) user: User | undefined,
    interaction: CommandInteraction,
  ) {
    const _user = user ? user: interaction.user
    var pp = undefined;
    if ((_user.id).toString()!='897913186114744390') {
      pp = Number((Math.random() * 35).toFixed(2));
    } else {
      pp = -35.00;
    }
    const embed = new MessageEmbed()
      .setDescription(`${_user} PP size is ${pp}cm (${(pp/2.54).toFixed(2)}inch)`)
      .setColor("#ffc800")
      .setTimestamp();
    interaction.reply({ embeds: [embed] });
  }
}
