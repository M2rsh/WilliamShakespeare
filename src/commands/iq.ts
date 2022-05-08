import { CommandInteraction, MessageEmbed, User } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";

@Discord()
export class Command {
  @Slash("iq", { description: "Calculate IQ" })
  async iq(
    @SlashOption("user", { description: "User to rate", required: false, type: "USER" }) user: User | undefined,
    interaction: CommandInteraction,
  ) {
    const embed = new MessageEmbed()
      .setDescription(`${user ? user: interaction.user} IQ is ${Math.floor(Math.random() * 200)}`)
      .setColor("#ffc800")
      .setTimestamp();
    interaction.reply({ embeds: [embed] });
  }
}
