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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryBasic = void 0;
const assert_1 = __importDefault(require("assert"));
const minecraft_motd_util_1 = require("minecraft-motd-util");
const UDPClient_1 = __importDefault(require("./structure/UDPClient"));
const srvRecord_1 = require("./util/srvRecord");
function queryBasic(host, port = 25565, options) {
    var _a;
    (0, assert_1.default)(typeof host === 'string', `Expected 'host' to be a 'string', got '${typeof host}'`);
    (0, assert_1.default)(host.length > 1, `Expected 'host' to have a length greater than 0, got ${host.length}`);
    (0, assert_1.default)(typeof port === 'number', `Expected 'port' to be a 'number', got '${typeof port}'`);
    (0, assert_1.default)(Number.isInteger(port), `Expected 'port' to be an integer, got '${port}'`);
    (0, assert_1.default)(port >= 0, `Expected 'port' to be greater than or equal to 0, got '${port}'`);
    (0, assert_1.default)(port <= 65535, `Expected 'port' to be less than or equal to 65535, got '${port}'`);
    (0, assert_1.default)(typeof options === 'object' || typeof options === 'undefined', `Expected 'options' to be an 'object' or 'undefined', got '${typeof options}'`);
    if (typeof options === 'object') {
        (0, assert_1.default)(typeof options.enableSRV === 'boolean' || typeof options.enableSRV === 'undefined', `Expected 'options.enableSRV' to be a 'boolean' or 'undefined', got '${typeof options.enableSRV}'`);
        (0, assert_1.default)(typeof options.sessionID === 'number' || typeof options.sessionID === 'undefined', `Expected 'options.sessionID' to be a 'number' or 'undefined', got '${typeof options.sessionID}'`);
        (0, assert_1.default)(typeof options.timeout === 'number' || typeof options.timeout === 'undefined', `Expected 'options.timeout' to be a 'number' or 'undefined', got '${typeof options.timeout}'`);
        if (typeof options.timeout === 'number') {
            (0, assert_1.default)(Number.isInteger(options.timeout), `Expected 'options.timeout' to be an integer, got '${options.timeout}'`);
            (0, assert_1.default)(options.timeout >= 0, `Expected 'options.timeout' to be greater than or equal to 0, got '${options.timeout}'`);
        }
    }
    const sessionID = ((_a = options === null || options === void 0 ? void 0 : options.sessionID) !== null && _a !== void 0 ? _a : 1) & 0x0F0F0F0F;
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        var _b;
        const socket = new UDPClient_1.default(host, port);
        const timeout = setTimeout(() => {
            socket === null || socket === void 0 ? void 0 : socket.close();
            reject(new Error('Timed out while querying server for status'));
        }, (_b = options === null || options === void 0 ? void 0 : options.timeout) !== null && _b !== void 0 ? _b : 1000 * 5);
        try {
            let srvRecord = null;
            if (typeof options === 'undefined' || typeof options.enableSRV === 'undefined' || options.enableSRV) {
                srvRecord = yield (0, srvRecord_1.resolveSRV)(host, 'udp');
                if (srvRecord) {
                    host = srvRecord.host;
                    port = srvRecord.port;
                }
            }
            // Request packet
            // https://wiki.vg/Query#Request
            {
                socket.writeUInt16BE(0xFEFD);
                socket.writeByte(0x09);
                socket.writeInt32BE(sessionID);
                yield socket.flush(false);
            }
            let challengeToken;
            // Response packet
            // https://wiki.vg/Query#Response
            {
                const packetType = yield socket.readByte();
                if (packetType !== 0x09)
                    throw new Error('Expected server to send packet type 0x09, received ' + packetType);
                const serverSessionID = yield socket.readInt32BE();
                if (sessionID !== serverSessionID)
                    throw new Error('Server session ID mismatch, expected ' + sessionID + ', received ' + serverSessionID);
                challengeToken = parseInt(yield socket.readStringNT());
                if (isNaN(challengeToken))
                    throw new Error('Server sent an invalid challenge token');
            }
            // Basic stat request packet
            // https://wiki.vg/Query#Request_2
            {
                socket.writeUInt16BE(0xFEFD);
                socket.writeByte(0x00);
                socket.writeInt32BE(sessionID);
                socket.writeInt32BE(challengeToken);
                yield socket.flush(false);
            }
            // Basic stat response packet
            // https://wiki.vg/Query#Response_2
            {
                const packetType = yield socket.readByte();
                if (packetType !== 0x00)
                    throw new Error('Expected server to send packet type 0x00, received ' + packetType);
                const serverSessionID = yield socket.readInt32BE();
                if (sessionID !== serverSessionID)
                    throw new Error('Server session ID mismatch, expected ' + sessionID + ', received ' + serverSessionID);
                const motdString = yield socket.readStringNT();
                const gameType = yield socket.readStringNT();
                const map = yield socket.readStringNT();
                const onlinePlayers = yield socket.readStringNT();
                const maxPlayers = yield socket.readStringNT();
                const hostPort = yield socket.readInt16LE();
                const hostIP = yield socket.readStringNT();
                const motd = (0, minecraft_motd_util_1.parse)(motdString);
                socket.close();
                clearTimeout(timeout);
                resolve({
                    motd: {
                        raw: (0, minecraft_motd_util_1.format)(motd),
                        clean: (0, minecraft_motd_util_1.clean)(motd),
                        html: (0, minecraft_motd_util_1.toHTML)(motd)
                    },
                    gameType,
                    map,
                    players: {
                        online: parseInt(onlinePlayers),
                        max: parseInt(maxPlayers)
                    },
                    hostPort,
                    hostIP
                });
            }
        }
        catch (e) {
            clearTimeout(timeout);
            socket === null || socket === void 0 ? void 0 : socket.close();
            reject(e);
        }
    }));
}
exports.queryBasic = queryBasic;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnlCYXNpYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9xdWVyeUJhc2ljLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUE0QjtBQUM1Qiw2REFBbUU7QUFDbkUsc0VBQThDO0FBRTlDLGdEQUE4QztBQWtCOUMsU0FBZ0IsVUFBVSxDQUFDLElBQVksRUFBRSxJQUFJLEdBQUcsS0FBSyxFQUFFLE9BQXNCOztJQUM1RSxJQUFBLGdCQUFNLEVBQUMsT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFLDBDQUEwQyxPQUFPLElBQUksR0FBRyxDQUFDLENBQUM7SUFDM0YsSUFBQSxnQkFBTSxFQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLHdEQUF3RCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUMvRixJQUFBLGdCQUFNLEVBQUMsT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFLDBDQUEwQyxPQUFPLElBQUksR0FBRyxDQUFDLENBQUM7SUFDM0YsSUFBQSxnQkFBTSxFQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsMENBQTBDLElBQUksR0FBRyxDQUFDLENBQUM7SUFDbEYsSUFBQSxnQkFBTSxFQUFDLElBQUksSUFBSSxDQUFDLEVBQUUsMERBQTBELElBQUksR0FBRyxDQUFDLENBQUM7SUFDckYsSUFBQSxnQkFBTSxFQUFDLElBQUksSUFBSSxLQUFLLEVBQUUsMkRBQTJELElBQUksR0FBRyxDQUFDLENBQUM7SUFDMUYsSUFBQSxnQkFBTSxFQUFDLE9BQU8sT0FBTyxLQUFLLFFBQVEsSUFBSSxPQUFPLE9BQU8sS0FBSyxXQUFXLEVBQUUsNkRBQTZELE9BQU8sT0FBTyxHQUFHLENBQUMsQ0FBQztJQUV0SixJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsRUFBRTtRQUNoQyxJQUFBLGdCQUFNLEVBQUMsT0FBTyxPQUFPLENBQUMsU0FBUyxLQUFLLFNBQVMsSUFB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