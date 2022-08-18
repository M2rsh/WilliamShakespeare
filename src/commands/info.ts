import { CommandInteraction, EmbedBuilder, PermissionsBitField } from "discord.js";
import { Discord, Slash } from "discordx";
import { ErrorHandler } from "../utils/error_handler.js";
import { getRelativeTime } from "../utils/utils.js";

@Discord()
export class Command {
    @Slash({ name: "info", description: "Bot info", dmPermission: true, defaultMemberPermissions: PermissionsBitField.Flags.UseApplicationCommands })
    async command(
        interaction: CommandInteraction
    ): Promise<void> {
        try {
            const embed = new EmbedBuilder()
                .setDescription(`${interaction.client.user}'s info`)
                .setColor("#c4a7e7")
                .addFields(
                    { name: "Version", value: `${process.env.WS_VERSION}` },
                    { name: 'Guilds', value: `${interaction.client.guilds.cache.size}`, inline: true },
                    { name: 'Users', value: `${interaction.client.users.cache.size}`, inline: true },
                    { name: 'Channels', value: `${interaction.client.channels.cache.size}`, inline: true },
                    { name: 'Started', value: `${getRelativeTime(Number(interaction.client.uptime))}`, inline: true },
                )
            if (interaction.client.user?.displayAvatarURL() != null) {
                embed.setThumbnail(interaction.client.user.displayAvatarURL({ size: 1024 }))
            }
            interaction.reply({ embeds: [embed] })
        } catch (e) {
            ErrorHandler(e, interaction);
        }
    }
}
