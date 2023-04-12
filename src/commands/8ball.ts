import { ApplicationCommandOptionType, CommandInteraction, EmbedBuilder } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import { ErrorHandler } from "../utils/error_handler.js";

const responses = ["As I see it, yes.", "Ask again later.", "Better not tell you now.", "Cannot predict now.",
    "Don\u2060t count on it.", "It is certain.", "It is decidedly so.", "Most likely.", "My reply is no.", "My sources say no.",
    "Outlook not so good.", "Outlook good.", "Reply hazy, try again.", "Signs point to yes.", "Very doubtful.", "Without a doubt.",
    "Yes.", "Definitely yes.", "You may rely on it.", "I fucked your mother"]

const funnyQueries = [
    {
        query: "sex",
        response: "I fucked your GAY ASSHOLE",
        chance: 0.05
    },
    {
        query: "dupe",
        response: "How about you dupe some bitches bro",
        chance: 0.85
    },
    {
        query: "cum",
        response: "I did not cum on an 8 ball. I did not stick my dick anywhere near an 8 ball. I did not fuck an 8 ball.",
        chance: 0.35
    },
    {
        query: "cope",
        response: "Maybe just cope about it, how about nutting about it too.",
        chance: 0.75
    },
    {
        query: "gay sex",
        response: "I fucked your mother",
        chance: 0.99
    },
    {
        query: "lesbian sex",
        response: "I fucked your father",
        chance: 0.33
    },
    {
        query: "cum mod",
        response: "Hello, this is the Gay Sex Department. For more information about \"Cum Mod\", please press 1.",
        chance: 0.95
    },
    {
        query: "shitphobe",
        response: "Shit drinker 😋",
        chance: 0.85
    },
    {
        query: "pizza rolls",
        response: "Did you read the rules? The rules say \"Do not fuck yourself with pizza rolls\"",
        chance: 0.90
    }
]

@Discord()
export class Command {
    @Slash({ name: "8ball", description: "8ball of wisdom", dmPermission: true })
    async command(
        @SlashOption({ name: "question", description: "What is your question?", required: true, type: ApplicationCommandOptionType.String })
        question: string,
        interaction: CommandInteraction
    ): Promise<void> {
        try {
            if (question.length > 2000) { return ErrorHandler("Question's length cannot be over 2000 characters.", interaction) }
            let funnyResponse = "";
            let cleanedQuestion = question.toLowerCase().replaceAll(/[_\-\n\r\t+]/g, " ").replaceAll(/[^a-zA-Z0-9 ]/g, "");
            for (let i = 0; i < funnyQueries.length; i++) {
                if (cleanedQuestion.indexOf(funnyQueries[i].query) > -1 && Math.random() < funnyQueries[i].chance) {
                    funnyResponse = funnyQueries[i].response;
                    break;
                }
            }
            const embed = new EmbedBuilder()
                .setDescription(`${interaction.user} asked a question`)
                .setFields({ name: "Question", value: question }, { name: "Answer", value: funnyResponse ? funnyResponse : responses[Math.floor(Math.random() * responses.length)] })
                .setColor("#c4a7e7")
                .setTimestamp()
            interaction.reply({ embeds: [embed] });
        } catch (e) {
            await ErrorHandler(e, interaction);
        }
    }
}
