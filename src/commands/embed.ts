import {
  ApplicationCommandOptionType,
  CommandInteraction,
  EmbedBuilder,
} from "discord.js";
import { Discord, Slash, SlashChoice, SlashOption } from "discordx";
import { ErrorHandler } from "../utils/error_handler.js";

@Discord()
export class Command {
  @Slash({
    name: "embed",
    description: "Create an Embed",
    dmPermission: true,
  })
  async command(
    @SlashOption({
      name: "title",
      description: "Embed Title",
      required: false,
      type: ApplicationCommandOptionType.String,
    })
    title: string | undefined,
    @SlashOption({
      name: "description",
      description: "Embed Description",
      required: false,
      type: ApplicationCommandOptionType.String,
    })
    description: string | undefined,

    @SlashChoice({ name: "White", value: "#ffffff" })
    @SlashChoice({ name: "Black", value: "#000000" })
    @SlashChoice({ name: "Gray", value: "#808080" })
    @SlashChoice({ name: "Silver", value: "#c0c0c0" })
    @SlashChoice({ name: "Red", value: "#ff0000" })
    @SlashChoice({ name: "Maroon", value: "#800000" })
    @SlashChoice({ name: "Orange", value: "#ffa500" })
    @SlashChoice({ name: "Yellow", value: "#ffff00" })
    @SlashChoice({ name: "Olive", value: "#808000" })
    @SlashChoice({ name: "Green", value: "#00ff00" })
    @SlashChoice({ name: "Lime", value: "#00ff00" })
    @SlashChoice({ name: "Cyan", value: "#00ffff" })
    @SlashChoice({ name: "Teal", value: "#008080" })
    @SlashChoice({ name: "Blue", value: "#0000ff" })
    @SlashChoice({ name: "Navy", value: "#000080" })
    @SlashChoice({ name: "Pink", value: "#ffc0cb" })
    @SlashChoice({ name: "Purple", value: "#ff00ff" })
    @SlashChoice({ name: "Magenta", value: "#ff00ff" })
    @SlashChoice({ name: "Fuchsia", value: "#ff00ff" })
    @SlashOption({
      name: "colour",
      description: "Embed Colour",
      required: false,
      type: ApplicationCommandOptionType.String,
    })
    colour: any,

    @SlashOption({
      name: "timestamp",
      description: "Embed Timestamp",
      required: false,
      type: ApplicationCommandOptionType.Boolean,
    })
    timestamp: boolean | false,
    interaction: CommandInteraction
  ) {
    try {
      description
        ? (description = description.replaceAll("\\n", "\n"))
        : void 0;
      if (
        title === undefined &&
        (description === undefined || description.match(/^\s*$/))
      ) {
        title = "Someone forgot to add a title and a description";
        description = "May this user drown in laughter";
      }
      const embed = new EmbedBuilder().setColor(colour || "#c4a7e7");
      title ? embed.setTitle(title) : void 0;
      description ? embed.setDescription(description) : void 0;
      timestamp ? embed.setTimestamp() : void 0;

      interaction.reply({ embeds: [embed] });
    } catch (e) {
      await ErrorHandler(e, interaction);
    }
  }
}
