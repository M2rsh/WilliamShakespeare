import { CommandInteraction, MessageEmbed, User } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";

@Discord()
export class Command {
  @Slash("pp", { description: "Measure PP" })
  async rate(
    @SlashOption("user", { description: "User to rate", required: false, type: "USER" }) user: User | undefined,
    interaction: CommandInteraction,
  ) {
    const pp = Number((Math.random() * 20).toFixed(2));
    const embed = new MessageEmbed()
      .setDescription(`${user ? user: interaction.user} PP size is ${pp}cm (${(pp/2.54).toFixed(2)}inch)`)
      .setColor("#ffc800")
      .setTimestamp();
    interaction.reply({ embeds: [embed] });
  }
}
