import { createCanvas, loadImage } from "@napi-rs/canvas";
import { ApplicationCommandOptionType, AttachmentBuilder, Colors, CommandInteraction, EmbedBuilder, PermissionsBitField, User } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import { ErrorHandler } from "../utils/error_handler.js";
import Moment from "moment";
import { bot } from "../main.js";
@Discord()
export class Command {
  @Slash({name: "licence", description: "Create a licence", dmPermission: true, defaultMemberPermissions: PermissionsBitField.Flags.UseApplicationCommands })
  async command(
    @SlashOption({
      name: "user",
      description: "User to get avatar of",
      required: false,
      type: ApplicationCommandOptionType.User,
    }) user: User | undefined,
    interaction: CommandInteraction
  ): Promise<void> {
    try {
      const _user = user ? await bot.users.fetch(user) : interaction.user
      const canvas = createCanvas(1600, 800);
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = '#e0def4'
      ctx.drawImage(await loadImage('https://i.imgur.com/tjppSrL.png'), 0, 0, canvas.width, canvas.height)
      ctx.drawImage(await loadImage(`${_user.displayAvatarURL({ size: 512 })}`), 191, 191, 418, 418);
      ctx.drawImage(await loadImage(`${interaction.client.user?.displayAvatarURL({ size: 256 })}`), 20, 20, 128, 128);
      ctx.drawImage(await loadImage("https://i.imgur.com/CdyJqkl.png"), canvas.width-148, canvas.height-148, 128, 128);
      ctx.font = '70px sans-serif';
      ctx.fillText("Meme Stealing Licence", 640, 256); 
      ctx.font = '35px sans-serif';
      ctx.fillText(`Issued By`, 191, 55)
      ctx.fillText(`https://m2rsh.cf/bot-invite/`, 191, 150)
      ctx.font = '50px sans-serif';
      ctx.fillText(`${interaction.client.user?.username}`, 191, 110)
      ctx.fillText(_user.tag, 640, 350);
      ctx.fillText(_user.id, 640, 420);
      ctx.fillText(`Issued on ${Moment().format('ll')}`, 640, 490);
      ctx.fillText(`Expiring on ${Moment().add(5, 'years').format('ll')}`, 640, 550);


      const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'processed.png' });
      const embed = new EmbedBuilder()
        .setDescription(`${_user} Meme stealing licence`)
        .setColor("#c4a7e7")
        .setImage("attachment://processed.png")
        .setTimestamp();

      interaction.reply({ embeds: [embed], files: [attachment] });
    } catch (e) {
      ErrorHandler(e, interaction);
    }
  }
}
