import { ApplicationCommandOptionType, CommandInteraction, EmbedBuilder } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import { ErrorHandler } from "../utils/error_handler.js";

const responses = ["As I see it, yes.", "Ask again later.", "Better not tell you now.", "Cannot predict now.",
    "Don\u2060t count on it.", "It is certain.", "It is decidedly so.", "Most likely.", "My reply is no.", "My sources say no.",
    "Outlook not so good.", "Outlook good.", "Reply hazy, try again.", "Signs point to yes.", "Very doubtful.", "Without a doubt.",
    "Yes.", "Definitely yes.", "You may rely on it.", "I fucked your mother"]

@Discord()
export class Command {
    @Slash({ name: "8ball", description: "8ball of wisdom", dmPermission: true })
    async command(
        @SlashOption({ name: "question", description: "What is your question?", required: true, type:ApplicationCommandOptionType.String })
        question: string,
        interaction: CommandInteraction
    ): Promise<void> {
        try {
            if (question.length > 2000) { return ErrorHandler("Question's lenght cannot be over 2000 characters.", interaction) }
            const embed = new EmbedBuilder()
                .setDescription(`${interaction.user} asked a question`)
                .setFields({ name: "Question", value: question },{ name: "Answer", value: responses[Math.floor(Math.random() * responses.length)] })
                .setColor("#c4a7e7")
                .setTimestamp()
            interaction.reply({ embeds: [embed] });
        } catch (e) {
            await ErrorHandler(e, interaction);
        }
    }
}
