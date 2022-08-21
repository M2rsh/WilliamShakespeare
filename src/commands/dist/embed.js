"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.Command = void 0;
var discord_js_1 = require("discord.js");
var discordx_1 = require("discordx");
var error_handler_js_1 = require("../utils/error_handler.js");
var Command = /** @class */ (function () {
    function Command() {
    }
    Command.prototype.command = function (title, description, colour, timestamp, interaction) {
        return __awaiter(this, void 0, void 0, function () {
            var embed, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 1, , 3]);
                        if (title && description === undefined) {
                            title = "Someone forgot to add a title and a description";
                            description = "May this user drown in laughter";
                        }
                        embed = new discord_js_1.EmbedBuilder()
                            .setTitle(title || "")
                            .setDescription(description || "")
                            .setColor(colour || "#c4a7e7");
                        if (timestamp) {
                            embed.setTimestamp();
                        }
                        interaction.reply({ embeds: [embed] });
                        return [3 /*break*/, 3];
                    case 1:
                        e_1 = _a.sent();
                        return [4 /*yield*/, error_handler_js_1.ErrorHandler(e_1, interaction)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        discordx_1.Slash({ name: "embed", description: "Creates Embed", dmPermission: true, defaultMemberPermissions: discord_js_1.PermissionsBitField.Flags.UseApplicationCommands }),
        __param(0, discordx_1.SlashOption({
            name: "title",
            description: "Embed Title",
            required: false,
            type: discord_js_1.ApplicationCommandOptionType.String
        })),
        __param(1, discordx_1.SlashOption({
            name: "description",
            description: "Embed Description",
            required: false,
            type: discord_js_1.ApplicationCommandOptionType.String
        })),
        __param(2, discordx_1.SlashChoice({ name: "White", value: "#ffffff" })),
        __param(2, discordx_1.SlashChoice({ name: "Black", value: "#000000" })),
        __param(2, discordx_1.SlashChoice({ name: "Gray", value: "#808080" })),
        __param(2, discordx_1.SlashChoice({ name: "Silver", value: "#c0c0c0" })),
        __param(2, discordx_1.SlashChoice({ name: "Red", value: "#ff0000" })),
        __param(2, discordx_1.SlashChoice({ name: "Maroon", value: "#800000" })),
        __param(2, discordx_1.SlashChoice({ name: "Orange", value: "#ffa500" })),
        __param(2, discordx_1.SlashChoice({ name: "Yellow", value: "#ffff00" })),
        __param(2, discordx_1.SlashChoice({ name: "Olive", value: "#808000" })),
        __param(2, discordx_1.SlashChoice({ name: "Green", value: "#00ff00" })),
        __param(2, discordx_1.SlashChoice({ name: "Lime", value: "#00ff00" })),
        __param(2, discordx_1.SlashChoice({ name: "Cyan", value: "#00ffff" })),
        __param(2, discordx_1.SlashChoice({ name: "Teal", value: "#008080" })),
        __param(2, discordx_1.SlashChoice({ name: "Blue", value: "#0000ff" })),
        __param(2, discordx_1.SlashChoice({ name: "Navy", value: "#000080" })),
        __param(2, discordx_1.SlashChoice({ name: "Pink", value: "#ffc0cb" })),
        __param(2, discordx_1.SlashChoice({ name: "Purple", value: "#ff00ff" })),
        __param(2, discordx_1.SlashChoice({ name: "Magenta", value: "#ff00ff" })),
        __param(2, discordx_1.SlashChoice({ name: "Fuchsia", value: "#ff00ff" })),
        __param(2, discordx_1.SlashOption({
            name: "colour",
            description: "Embed Colour",
            required: false,
            type: discord_js_1.ApplicationCommandOptionType.String
        })),
        __param(3, discordx_1.SlashOption({
            name: "timestamp",
            description: "Embed Timestamp",
            required: false,
            type: discord_js_1.ApplicationCommandOptionType.Boolean
        }))
    ], Command.prototype, "command");
    Command = __decorate([
        discordx_1.Discord()
    ], Command);
    return Command;
}());
exports.Command = Command;
