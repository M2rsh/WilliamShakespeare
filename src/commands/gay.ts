import { createCanvas, loadImage } from "@napi-rs/canvas";
import { ApplicationCommandOptionType, AttachmentBuilder, Colors, CommandInteraction, EmbedBuilder, User } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import { ErrorHandler } from "../utils/error_handler.js";

@Discord()
export class Command {
  @Slash({name: "gay", description: "Make someone gay", dmPermission: true })
  async command(
    @SlashOption({
      name: "user",
      description: "User to get avatar of",
      required: false,
      type: ApplicationCommandOptionType.User,
    }) user: User | undefined,
    @SlashOption({
      name: "opacity",
      description: "Gay flag opacity. 0-100",
      required: false,
      type: ApplicationCommandOptionType.Number,
    }) __opacity: number | undefined,
    interaction: CommandInteraction
  ): Promise<void> {
    try {
      const _user = user ? user : interaction.user
      const _opacity = __opacity || 40
      if(_opacity<0 || _opacity>100) {
        
        ErrorHandler('Invalid opacity. Use value between 0 and 100', interaction)
        return
      }
      const opacity = _opacity / 100
      const canvas = createCanvas(512, 512);
      const ctx = canvas.getContext('2d')
      ctx.drawImage(await loadImage(`${_user.displayAvatarURL({ size: 512 })}`), 0, 0, canvas.height, canvas.width);
      ctx.globalAlpha = opacity || 80 / 100;
      ctx.drawImage(await loadImage("https://i.imgur.com/cfyergX.jpg"), 0, 0, canvas.height, canvas.width)
      ctx.globalAlpha = 1;
      //ctx.font = '48px "Roboto"';
      //ctx.strokeText("balls", 256, 256);
      
      const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'processed.png' });
      const embed = new EmbedBuilder()
        .setDescription(`${_user} is gay :rainbow_flag:`)
        .setColor(Colors.Purple)
        .setImage("attachment://processed.png")
        .setTimestamp();

      interaction.reply({ embeds: [embed], files: [attachment] });
    } catch (e) {
      await ErrorHandler(e, interaction);
    }
  }
}
