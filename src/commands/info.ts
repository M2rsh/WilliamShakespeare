import { CommandInteraction, EmbedBuilder } from "discord.js";
import { Discord, Slash } from "discordx";
import { ErrorHandler } from "../utils/error_handler.js";
import { getRelativeTime } from "../utils/utils.js";

@Discord()
export class Command {
    @Slash({ name: "info", description: "Bot info", dmPermission: true })
    async command(
        interaction: CommandInteraction
    ): Promise<void> {
        try {
            const embed = new EmbedBuilder()
                .setDescription(`${interaction.client.user}'s info`)
                .setColor("#c4a7e7")
                .addFields(
                    { name: "Version", value: `${process.env.WS_VERSION}`, inline: true },
                    { name: "Owner", value: `<@846298981797724161>`, inline: true },
                    { name: "Discord Server", value: `[Server Link](https://discord.gg/dfKMTx9Eea)`, inline: true },
                    { name: "Source", value: `[Github Link](https://github.com/M2rsh/WilliamShakespeare)`, inline: true },
                    { name: "API", value: `[API Link](http://bot.m2rsh.cf/)`, inline: true },
                    { name: 'Servers', value: `${interaction.client.guilds.cache.size}`, inline: true },
                    { name: 'Cached Users', value: `${interaction.client.users.cache.size}`, inline: true },
                    { name: 'Channels', value: `${interaction.client.channels.cache.size}`, inline: true },
                    { name: 'Started', value: `${getRelativeTime(Number(interaction.client.uptime))}`, inline: true },
                )
                .setTimestamp()
            if (interaction.client.user?.displayAvatarURL() != null) {
                embed.setThumbnail(interaction.client.user.displayAvatarURL({ size: 1024 }))
            }
            interaction.reply({ embeds: [embed] })
        } catch (e) {
            await ErrorHandler(e, interaction);
        }
    }
}
