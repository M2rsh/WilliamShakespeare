import {
  ApplicationCommandOptionType,
  CommandInteraction,
  EmbedBuilder,
  WebhookClient
} from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import { ErrorHandler } from "../utils/error_handler.js";
import { botLogger } from "../main.js";

botLogger.log("Info", process.env.WEBHOOK_URL);

var webhook: any;
if (process.env.WEBHOOK_URL) {
  webhook = new WebhookClient({
    url: process.env.WEBHOOK_URL
  });
  botLogger.log("Info", `Webhook Initialized Successfully`);
}

@Discord()
export class Command {
  @Slash({
    name: "message",
    description: "Send a message to a special channel",
    dmPermission: true
  })
  async command(
    @SlashOption({
      name: "message",
      description: "Message to send",
      required: true,
      type: ApplicationCommandOptionType.String
    })
    message: string,
    interaction: CommandInteraction
  ) {
    try {
      const embed = new EmbedBuilder()
        .setDescription(message)
        .setFooter({ text: interaction.guild?.name || "From DMs" })
        .setColor("#c4a7e7")
        .setTimestamp();

      webhook.send({
        username: interaction.user.username,
        avatarURL: interaction.user.avatarURL(),
        embeds: [embed]
      });

      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`Message sent`)
            .setColor("#c4a7e7")
            .setTimestamp()
        ]
      });
    } catch (e) {
      await ErrorHandler(e, interaction);
    }
  }
}
