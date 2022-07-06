import { logger } from "../main.js";
import { MessageEmbed } from "discord.js";

export function ErrorHandler(e: any, interaction: any) {
  interaction.channel
    ?.send({
      embeds: [
        new MessageEmbed()
          .setTitle(`Hey ${interaction.user.tag}! An error occurred`)
          .setDescription(`\`\`\`${e.message}\`\`\``)
          .setColor("#ff0000")
          .setTimestamp(),
      ],
    })
    .then((msg: any) => {
      setTimeout(async function () {
        msg.delete();
      }, 15000);
    });
  logger.error(
    e.message,
    `User: '${interaction.user?.username}' - '${interaction.user?.id}'`
  );
  return;
}