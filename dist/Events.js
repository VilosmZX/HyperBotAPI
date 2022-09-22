"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = require("./Utils");
function default_1(client) {
    return __awaiter(this, void 0, void 0, function* () {
        client.ev.on('connection.update', (update) => __awaiter(this, void 0, void 0, function* () {
            const { connection } = update;
            if (connection === 'open')
                console.log('Bot is online!');
        }));
        client.ev.on('creds.update', () => __awaiter(this, void 0, void 0, function* () { return yield client.saveCreds(); }));
        client.ev.on('messages.upsert', ({ messages }) => __awaiter(this, void 0, void 0, function* () {
            const { key: { remoteJid, participant }, pushName, message } = messages[0];
            const countryCode = (0, Utils_1.extractCountryCode)(participant);
        }));
    });
}
exports.default = default_1;
