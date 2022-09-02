import { ApplicationCommandOptionType, CommandInteraction } from "discord.js";
import { Discord, Slash, SlashChoice, SlashOption } from "discordx";
import { ErrorHandler } from "../utils/error_handler.js";

@Discord()
export class Command {
  @Slash({name: "stfu", description: "Shut the fuck up boyetrash", dmPermission: false })
  async command(
    @SlashChoice({ name: "Boyetrash", value: "<@560205926758612994>" })
    @SlashChoice({ name: "Coderunner", value: "<@934178009664069632>" })
    @SlashChoice({ name: "Funtimes909", value: "<@652755888230236160>" })

    @SlashChoice({ name: "Lizzy Bo Bizzy Mc Skizzy", value: "<@846298981797724161>" })

    @SlashChoice({ name: "Festive", value: "<@958165110352928818>" })

    @SlashOption({
      name: "user",
      description: "Common users who should shut the fuck up",
      required: false,
      type: ApplicationCommandOptionType.String,
    })
    user: string | undefined,
    interaction: CommandInteraction
  ): Promise<void> {
    try {
      await interaction.deferReply({ ephemeral: true });
      interaction.channel?.send({ content: `Shut the fuck up ${user ? user : "<@560205926758612994>"}` });
    } catch (e) {
      await ErrorHandler(e, interaction);
    }
  }
}
