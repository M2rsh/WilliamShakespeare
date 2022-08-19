import { CommandInteraction, PermissionsBitField } from "discord.js";
import { Discord, Guild, Slash } from "discordx";
import { ErrorHandler } from "../utils/error_handler.js";

@Discord()
export class Command {
  @Slash({name: "stfu", description: "Shut the fuck up boyetrash", dmPermission: false, defaultMemberPermissions: PermissionsBitField.Flags.UseApplicationCommands })
  async command(
    interaction: CommandInteraction
  ): Promise<void> {
    try {
      await interaction.deferReply({ ephemeral: true });
      interaction.channel?.send({ content: "Shut the fuck up <@560205926758612994>" });
    } catch (e) {
      await ErrorHandler(e, interaction);
    }
  }
}
