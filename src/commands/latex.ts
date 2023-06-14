import { RateLimit, TIME_UNIT } from "@discordx/utilities";
import { ApplicationCommandOptionType, CommandInteraction } from "discord.js";
import { Discord, Guard, Slash, SlashOption } from "discordx";
import { ErrorHandler } from "../utils/error_handler.js";

const start =
  "https://latex.codecogs.com/png.image?" +
  encodeURIComponent("\\color{white}");

@Discord()
export class Command {
  @Slash({
    name: "latex",
    description:
      "Render LaTeX code as image and send it. Generated using codecogs.",
    dmPermission: true
  })
  @Guard(
    RateLimit(TIME_UNIT.seconds, 5, {
      message: "This command is on cooldown. Please wait until {until}.",
      ephemeral: true
    })
  )
  async command(
    @SlashOption({
      name: "code",
      description: "LaTeX code to render",
      required: true,
      type: ApplicationCommandOptionType.String
    })
    code: string,
    interaction: CommandInteraction
  ): Promise<void> {
    try {
      code.length > 2000 ? (code = code.substring(0, 2000)) : code;
      let url = start + encodeURIComponent(code);
      interaction.reply({ content: url });
    } catch (e) {
      await ErrorHandler(e, interaction);
    }
  }
}
