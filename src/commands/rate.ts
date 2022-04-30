import { CommandInteraction, MessageEmbed, User } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";

@Discord()
export class Command {
  @Slash("rate", { description: "Rate something" })
  async rate(
    @SlashOption("thing", { description: "Thing you want to rate" }) thing: string,
    @SlashOption("user", { description: "Test", required: false, type: "USER" }) user: User | undefined,
    interaction: CommandInteraction,
  ) {
    const embed = new MessageEmbed()
      .setDescription(`${user ? user: interaction.user} is ${Math.floor(Math.random() * 100)}% ${thing}`)
      .setColor("#ffc800")
      .setTimestamp();
    interaction.reply({ embeds: [embed] });
  }
}
