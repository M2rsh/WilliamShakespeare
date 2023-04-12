import { createCanvas, loadImage } from "@napi-rs/canvas";
import { ApplicationCommandOptionType, AttachmentBuilder, Colors, CommandInteraction, EmbedBuilder, User } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import { ErrorHandler } from "../utils/error_handler.js";

@Discord()
export class Command {
  @Slash({name: "gaysex", description: "GAY SEX", dmPermission: true })
  async command(
    interaction: CommandInteraction
  ): Promise<void> {
    try {
      interaction.reply({ files: [{attachment: "./src/assets/videos/GAY-SEX.mp4", name: "video.mp4"}] });
    } catch (e) {
      await ErrorHandler(e, interaction);
    }
  }
}
