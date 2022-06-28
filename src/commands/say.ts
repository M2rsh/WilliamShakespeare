import { CommandInteraction, MessageEmbed } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";

@Discord()
export class Command {
  @Slash("say", { description: "Say something" })
  async say(
    @SlashOption("text", { description: "What do you want me to say?" })
    text: string,
    interaction: CommandInteraction
  ): Promise<void> {
    var text = text.replaceAll("@", "@\u200B")
    if(text.length>2000) {
      interaction.reply({ content: "Error: Message is over 2000 characters.", ephemeral: true });
      throw Error("Message is over 2000 characters.");
    } else {
      await interaction.deferReply({ ephemeral: true });
      interaction.channel?.send({ content: text });
    }
  }
}
