import { CommandInteraction, MessageEmbed, User } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import { ErrorHandler } from "../utils/error_handler.js";

@Discord()
export class Command {
  @Slash("pp", { description: "Measure PP" })
  async pp(
    @SlashOption("user", { description: "User to rate", required: false, type: "USER" }) user: User | undefined,
    interaction: CommandInteraction,
  ) {
    try {
    const pp = Number((Math.random() * 35).toFixed(2));
    const embed = new MessageEmbed()
      .setDescription(`${user ? user: interaction.user} PP size is ${pp}cm (${(pp/2.54).toFixed(2)}inch)`)
      .setColor("#ffc800")
      .setTimestamp();
    interaction.reply({ embeds: [embed] });
    } catch(e){
      ErrorHandler(e, interaction);
    }
  }
}
