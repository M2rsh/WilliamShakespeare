import { CommandInteraction, EmbedBuilder } from "discord.js";
import { Discord, Slash } from "discordx";
import { ErrorHandler } from "../utils/error_handler.js";
import { faker } from '@faker-js/faker';

@Discord()
export class Command {
    @Slash({ name: "cat", description: "Random cat image", dmPermission: true })
    async command(
        interaction: CommandInteraction
    ): Promise<void> {
        try {
            fetch(faker.image.cats())
                .then(response => {
                    const embed = new EmbedBuilder()
                        .setDescription(`Random cat image`)
                        .setImage(response.url)
                        .setColor("#c4a7e7")
                        .setTimestamp()
                    interaction.reply({ embeds: [embed] });
                })
        } catch (e) {
            await ErrorHandler(e, interaction);
        }
    }
}
