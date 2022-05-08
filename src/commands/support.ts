import { CommandInteraction, MessageEmbed } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";

@Discord()
export class Command {
  @Slash("support", { description: "Support Development" })
  async support(
    interaction: CommandInteraction
  ): Promise<void> {
    const embed = new MessageEmbed()
        .setDescription(`
        **Support Development**

        <:PAYPAL:972912795588907028> [PayPal](https://www.paypal.com/donate/?hosted_button_id=6KY42GNYCREWN)
        <:Ethereum:972916431547146240> ETH \`0xE059f14b787CFcCFC8ee3f2d1e13B1d1f808EB8a\`
        
        `)
        .setColor("#ffc800")
        .setTimestamp();
    await interaction.reply({ embeds: [embed] })
  }
}
