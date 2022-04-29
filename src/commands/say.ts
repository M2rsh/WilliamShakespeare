import { CommandInteraction, MessageEmbed } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";

@Discord()
export class Command {
  @Slash("say", { description: "Say something" })
  add(
    @SlashOption("text", { description: "What do you want me to say?" })
    text: string,
    interaction: CommandInteraction
  ): void {
    interaction.channel?.send({ content: text });
    const embed = new MessageEmbed()
      .setTitle("Your Message was sent.")
      .setColor("#ffc800")
      .setDescription(`\`${text}\``)
      .setTimestamp();
    interaction.reply({ embeds: [embed], ephemeral: true });
  }
}
