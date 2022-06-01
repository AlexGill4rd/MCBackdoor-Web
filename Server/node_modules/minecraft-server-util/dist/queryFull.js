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
exports.queryFull = void 0;
const assert_1 = __importDefault(require("assert"));
const minecraft_motd_util_1 = require("minecraft-motd-util");
const UDPClient_1 = __importDefault(require("./structure/UDPClient"));
const srvRecord_1 = require("./util/srvRecord");
function queryFull(host, port = 25565, options) {
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
            // Full stat request packet
            // https://wiki.vg/Query#Request_3
            {
                socket.writeUInt16BE(0xFEFD);
                socket.writeByte(0x00);
                socket.writeInt32BE(sessionID);
                socket.writeInt32BE(challengeToken);
                socket.writeBytes(Uint8Array.from([0x00, 0x00, 0x00, 0x00]));
                yield socket.flush(false);
            }
            // Full stat response packet
            // https://wiki.vg/Query#Response_3
            {
                const packetType = yield socket.readByte();
                if (packetType !== 0x00)
                    throw new Error('Expected server to send packet type 0x00, received ' + packetType);
                const serverSessionID = yield socket.readInt32BE();
                if (sessionID !== serverSessionID)
                    throw new Error('Server session ID mismatch, expected ' + sessionID + ', received ' + serverSessionID);
                yield socket.readBytes(11);
                const data = {};
                const players = [];
                // eslint-disable-next-line no-constant-condition
                while (true) {
                    const key = yield socket.readStringNT();
                    if (key.length < 1)
                        break;
                    const value = yield socket.readStringNT();
                    data[key] = value;
                }
                yield socket.readBytes(10);
                // eslint-disable-next-line no-constant-condition
                while (true) {
                    const username = yield socket.readStringNT();
                    if (username.length < 1)
                        break;
                    players.push(username);
                }
                const motd = (0, minecraft_motd_util_1.parse)(data.hostname);
                const plugins = data.plugins.split(/(?::|;) */g);
                socket.close();
                clearTimeout(timeout);
                resolve({
                    motd: {
                        raw: (0, minecraft_motd_util_1.format)(motd),
                        clean: (0, minecraft_motd_util_1.clean)(motd),
                        html: (0, minecraft_motd_util_1.toHTML)(motd)
                    },
                    version: data.version,
                    software: plugins[0],
                    plugins: plugins.slice(1),
                    map: data.map,
                    players: {
                        online: parseInt(data.numplayers),
                        max: parseInt(data.maxplayers),
                        list: players
                    },
                    hostIP: data.hostip,
                    hostPort: parseInt(data.hostport)
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
exports.queryFull = queryFull;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnlGdWxsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3F1ZXJ5RnVsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBNEI7QUFDNUIsNkRBQW1FO0FBQ25FLHNFQUE4QztBQUU5QyxnREFBOEM7QUFxQjlDLFNBQWdCLFNBQVMsQ0FBQyxJQUFZLEVBQUUsSUFBSSxHQUFHLEtBQUssRUFBRSxPQUFzQjs7SUFDM0UsSUFBQSxnQkFBTSxFQUFDLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRSwwQ0FBMEMsT0FBTyxJQUFJLEdBQUcsQ0FBQyxDQUFDO0lBQzNGLElBQUEsZ0JBQU0sRUFBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSx3REFBd0QsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDL0YsSUFBQSxnQkFBTSxFQUFDLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRSwwQ0FBMEMsT0FBTyxJQUFJLEdBQUcsQ0FBQyxDQUFDO0lBQzNGLElBQUEsZ0JBQU0sRUFBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLDBDQUEwQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO0lBQ2xGLElBQUEsZ0JBQU0sRUFBQyxJQUFJLElBQUksQ0FBQyxFQUFFLDBEQUEwRCxJQUFJLEdBQUcsQ0FBQyxDQUFDO0lBQ3JGLElBQUEsZ0JBQU0sRUFBQyxJQUFJLElBQUksS0FBSyxFQUFFLDJEQUEyRCxJQUFJLEdBQUcsQ0FBQyxDQUFDO0lBQzFGLElBQUEsZ0JBQU0sRUFBQyxPQUFPLE9BQU8sS0FBSyxRQUFRLElBQUksT0FBTyxPQUFPLEtBQUssV0FBVyxFQUFFLDZEQUE2RCxPQUFPLE9BQU8sR0FBRyxDQUFDLENBQUM7SUFFdEosSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLEVBQUU7UUFDaEMsSUFBQSxnQkFBTSxFQUFDLE9BQU8sT0FBTyxDQUFDLFNBQVMsS0FBSyxTQUFTLElBQUks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