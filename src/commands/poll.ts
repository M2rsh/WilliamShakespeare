import {
  ButtonInteraction,
  CommandInteraction,
  MessageActionRow,
  MessageButton,
  MessageEmbed,
} from "discord.js";
import { ButtonComponent, Discord, Slash, SlashOption } from "discordx";

@Discord()
export class Command {
  @Slash("poll", { description: "Start a poll" })
  async say(
    @SlashOption("message", { description: "Message" }) message: string,
    @SlashOption("option1", { description: "Option 1" }) option1: string,
    @SlashOption("option2", { description: "Option 2" }) option2: string,
    @SlashOption("option3", {
      description: "Option 3",
      required: false,
      type: "STRING",
    })
    option3: string | undefined,
    @SlashOption("option4", {
      description: "Option 4",
      required: false,
      type: "STRING",
    })
    option4: string | undefined,
    @SlashOption("option5", {
      description: "Option 5",
      required: false,
      type: "STRING",
    })
    option5: string | undefined,
    @SlashOption("option6", {
      description: "Option 6",
      required: false,
      type: "STRING",
    })
    option6: string | undefined,
    @SlashOption("option7", {
      description: "Option 7",
      required: false,
      type: "STRING",
    })
    option7: string | undefined,
    @SlashOption("option8", {
      description: "Option 8",
      required: false,
      type: "STRING",
    })
    option8: string | undefined,
    @SlashOption("option9", {
      description: "Option 9",
      required: false,
      type: "STRING",
    })
    option9: string | undefined,
    @SlashOption("option10", {
      description: "Option 10",
      required: false,
      type: "STRING",
    })
    option10: string | undefined,
    interaction: CommandInteraction
  ) {
    await interaction.deferReply({ ephemeral: true });
    return;
    /*var options = {
      option1: { name: `${option1}`, votes: 0 },
      option2: { name: `${option2}`, votes: 0 },
      option3: { name: `${option3}`, votes: 0 },
      option4: { name: `${option4}`, votes: 0 },
      option5: { name: `${option5}`, votes: 0 },
      option6: { name: `${option6}`, votes: 0 },
      option7: { name: `${option7}`, votes: 0 },
      option8: { name: `${option8}`, votes: 0 },
      option9: { name: `${option9}`, votes: 0 },
      option10: { name: `${option10}`, votes: 0 },
    };
    const embed = new MessageEmbed()
      .setDescription(`${message}`)
      .setAuthor(
        `${interaction.user.username}`,
        `${interaction.user.avatarURL()}`
      )
      .setColor("#ffc800")
      .setTimestamp();
    // I know this is horrible but yeah penis balls
    const row1 = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("option1")
        .setLabel(`${options.option1.name} ${options.option1.votes}`)
        .setStyle("PRIMARY"),
      new MessageButton()
        .setCustomId("option2")
        .setLabel(`${options.option1.name} ${options.option1.votes}`)
        .setStyle("PRIMARY")
    );

    interaction.reply({
      embeds: [embed],
      components: [row1 row2],
    });
    interaction.editReply({
      embeds: [embed],
      components: [row1 row2],
    });*/
  }

  @ButtonComponent("option1")
  option1(interaction: ButtonInteraction): void {
    return;
    /*this.options.option1.votes++;
    interaction.editReply({
      embeds: [embed],
      components: [row1 row2],
    });*/
  }
  @ButtonComponent("option2")
  option2(interaction: ButtonInteraction): void {
    /*
    this.options.option2.votes++;
    interaction.editReply({
      embeds: [embed],
      components: [row1 row2],
    });*/
  }
}
