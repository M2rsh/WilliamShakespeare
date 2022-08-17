import { createCanvas, loadImage } from "@napi-rs/canvas";
import { ApplicationCommandOptionType, AttachmentBuilder, Colors, CommandInteraction, EmbedBuilder, PermissionsBitField, User } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import { ErrorHandler } from "../utils/error_handler.js";

@Discord()
export class Command {
  @Slash({name: "gay", description: "Make someone gay", dmPermission: true, defaultMemberPermissions: PermissionsBitField.Flags.UseApplicationCommands })
  async test(
    @SlashOption({
      name: "user",
      description: "User to get avatar of",
      required: false,
      type: ApplicationCommandOptionType.User,
    })
    user: User | undefined,
    interaction: CommandInteraction
  ): Promise<void> {
    try {
      const _user = user ? user : interaction.user

      const canvas = createCanvas(512, 512);
      const ctx = canvas.getContext('2d')
      ctx.drawImage(await loadImage(`${_user.displayAvatarURL({ size: 512 })}`), 0, 0, canvas.height, canvas.width);
      ctx.globalAlpha = 0.3;
      ctx.drawImage(await loadImage("https://i.imgur.com/cfyergX.jpg"), 0, 0, canvas.height, canvas.width)
      ctx.globalAlpha = 1;
      //ctx.font = '48px "Roboto"';
      //ctx.strokeText("balls", 256, 256);
      
      const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'processed.png' });
      const embed = new EmbedBuilder()
        .setColor(Colors.Purple)
        .setImage("attachment://processed.png")
        .setTimestamp();

      interaction.reply({ embeds: [embed], files: [attachment] });
    } catch (e) {
      ErrorHandler(e, interaction);
    }
  }
}
