import { CommandInteraction, EmbedBuilder } from "discord.js";
import { Discord, Slash } from "discordx";
import { ErrorHandler } from "../utils/error_handler.js";

@Discord()
export class Command {
    @Slash({ name: "serverinfo", description: "Current server info", dmPermission: false })
    async command(
        interaction: CommandInteraction
    ): Promise<void> {
        try {
            const embed = new EmbedBuilder()
                .setDescription(`${interaction.guild?.name}'s info`)
                .setColor("#c4a7e7")
                .addFields(
                    { name: "Owner", value: `${await interaction.guild?.fetchOwner()}`, inline: true },
                    { name: 'Description', value: `${interaction.guild?.description}`, inline: true },
                    { name: 'ID', value: `${interaction.guild?.id}`, inline: true },
                    { name: 'Created At', value: `${interaction.guild?.createdAt}`, inline: true },
                    { name: 'Preferred Locale', value: `${interaction.guild?.preferredLocale}`, inline: true },
                    { name: 'Members', value: `${interaction.guild?.memberCount}`, inline: true },
                    { name: 'Channels', value: `${(await interaction.guild?.channels.fetch())?.size}`, inline: true },
                )
                .setTimestamp()
            // It's unclean i don't like it
            /*if (interaction.guild?.members.me?.permissions.has(PermissionsBitField.Flags.Administrator)) {
                embed.addFields({ name: 'Banned Members', value: `${(await interaction.guild?.bans.fetch())?.size}`, inline: true },)
            }*/
            if (interaction.guild?.iconURL() != null) {
                embed.setThumbnail(interaction.guild?.iconURL())
            }
            interaction.reply({ embeds: [embed] })
        } catch (e) {
            await ErrorHandler(e, interaction);
        }
    }
}
