import { CommandInteraction, InteractionReplyOptions, MessageComponentInteraction, PermissionResolvable } from "discord.js";

const units : any = {
    year: 24 * 60 * 60 * 1000 * 365,
    month: (24 * 60 * 60 * 1000 * 365) / 12,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000
};

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

export const getRelativeTime = (_elapsed : any) => {
    const elapsed = -_elapsed;
    // "Math.abs" accounts for both "past" & "future" scenarios
    for (const u in units) {
        if (Math.abs(elapsed) > units[u] || u == 'second') {
            return rtf.format(Math.round(elapsed / units[u]), u as Intl.RelativeTimeFormatUnit);
        }
    }
};

export async function replyOrFollowUp(interaction: CommandInteraction | MessageComponentInteraction, replyOptions: (InteractionReplyOptions & { ephemeral?: boolean }) | string): Promise<void> {
    // if interaction is already replied
    if (interaction.replied) {
        await interaction.followUp(replyOptions);
        return;
    }

    // if interaction is deferred but not replied
    if (interaction.deferred) {
        await interaction.editReply(replyOptions);
        return;
    }

    // if interaction is not handled yet
    await interaction.reply(replyOptions);
}

export async function hasPermission(interaction: CommandInteraction, permission: PermissionResolvable) {
    return interaction.guild?.members.me?.permissions.has(permission)
}
