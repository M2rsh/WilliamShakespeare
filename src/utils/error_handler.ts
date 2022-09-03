import { botLogger } from "../main.js";
import { EmbedBuilder } from "discord.js";
import { replyOrFollowUp } from "./utils.js";

export async function ErrorHandler(e: any, interaction: any) {
  await replyOrFollowUp(interaction, {
      embeds: [
        new EmbedBuilder()
          .setTitle(`An error occurred!`)
          .setDescription(`\`${e.message || e}\``)
          .setColor("#eb6f92")
          .setTimestamp(),
      ],
    })
    .then((msg: any) => {
      setTimeout(async function () {
        msg.delete();
      }, 15000);
    });
  botLogger.error(
    e,
    `User: '${interaction.user?.username}' - '${interaction.user?.id}'`
  );
  return;
}