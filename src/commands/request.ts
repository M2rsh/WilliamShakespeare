import { CommandInteraction, EmbedBuilder } from "discord.js";
import { Discord, Slash } from "discordx";
import { ErrorHandler } from "../utils/error_handler.js";

async function replyToCommand(interaction: CommandInteraction){
  const embed = new EmbedBuilder()
    .setDescription(`You can **report a bug** or **request a feature** through
    
    [Github Issues](https://github.com/M2rsh/WilliamShakespeare/issues)
    or
    [Discord Server](https://discord.gg/rsnfmXuQKK)
    `)
    .setColor("#c4a7e7")
    .setTimestamp()
  interaction.reply({embeds: [embed]})
}

@Discord()
export class Command {
  @Slash({name: "request", description: "Request a Feature", dmPermission: true })
  async request(
    interaction: CommandInteraction
  ): Promise<void> {
    try {
      await replyToCommand(interaction)
    } catch (e) {
      await ErrorHandler(e, interaction);
    }
  }
  @Slash({name: "bug", description: "Report a Bug", dmPermission: true })
  async command(
    interaction: CommandInteraction
  ): Promise<void> {
    try {
      await replyToCommand(interaction)
    } catch (e) {
      await ErrorHandler(e, interaction);
    }
  }
}

