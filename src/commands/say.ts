import { CommandInteraction, MessageEmbed } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";

@Discord()
export class Command {
  @Slash("say", { description: "Say something" })
  async say(
    @SlashOption("text", { description: "What do you want me to say?" })
    text: string,
    interaction: CommandInteraction
  ) {
    interaction.channel?.send({ content: text });
    await interaction.deferReply({ ephemeral: true });
  }
}
