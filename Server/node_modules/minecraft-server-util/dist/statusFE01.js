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
exports.statusFE01 = void 0;
const assert_1 = __importDefault(require("assert"));
const minecraft_motd_util_1 = require("minecraft-motd-util");
const TCPClient_1 = __importDefault(require("./structure/TCPClient"));
const srvRecord_1 = require("./util/srvRecord");
/**
 * @deprecated
 */
function statusFE01(host, port = 25565, options) {
    process.emitWarning('Use of statusFE01() has been deprecated since 5.2.0 in favor of a statusLegacy(). This method will be removed during the next major release of the minecraft-server-util library.', 'DeprecationWarning');
    (0, assert_1.default)(typeof host === 'string', `Expected 'host' to be a 'string', got '${typeof host}'`);
    (0, assert_1.default)(host.length > 1, `Expected 'host' to have a length greater than 0, got ${host.length}`);
    (0, assert_1.default)(typeof port === 'number', `Expected 'port' to be a 'number', got '${typeof port}'`);
    (0, assert_1.default)(Number.isInteger(port), `Expected 'port' to be an integer, got '${port}'`);
    (0, assert_1.default)(port >= 0, `Expected 'port' to be greater than or equal to 0, got '${port}'`);
    (0, assert_1.default)(port <= 65535, `Expected 'port' to be less than or equal to 65535, got '${port}'`);
    (0, assert_1.default)(typeof options === 'object' || typeof options === 'undefined', `Expected 'options' to be an 'object' or 'undefined', got '${typeof options}'`);
    if (typeof options === 'object') {
        (0, assert_1.default)(typeof options.enableSRV === 'boolean' || typeof options.enableSRV === 'undefined', `Expected 'options.enableSRV' to be a 'boolean' or 'undefined', got '${typeof options.enableSRV}'`);
        (0, assert_1.default)(typeof options.timeout === 'number' || typeof options.timeout === 'undefined', `Expected 'options.timeout' to be a 'number' or 'undefined', got '${typeof options.timeout}'`);
        if (typeof options.timeout === 'number') {
            (0, assert_1.default)(Number.isInteger(options.timeout), `Expected 'options.timeout' to be an integer, got '${options.timeout}'`);
            (0, assert_1.default)(options.timeout >= 0, `Expected 'options.timeout' to be greater than or equal to 0, got '${options.timeout}'`);
        }
    }
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const socket = new TCPClient_1.default();
        const timeout = setTimeout(() => {
            socket === null || socket === void 0 ? void 0 : socket.close();
            reject(new Error('Timed out while retrieving server status'));
        }, (_a = options === null || options === void 0 ? void 0 : options.timeout) !== null && _a !== void 0 ? _a : 1000 * 5);
        try {
            let srvRecord = null;
            if (typeof options === 'undefined' || typeof options.enableSRV === 'undefined' || options.enableSRV) {
                srvRecord = yield (0, srvRecord_1.resolveSRV)(host);
                if (srvRecord) {
                    host = srvRecord.host;
                    port = srvRecord.port;
                }
            }
            yield socket.connect({ host, port, timeout: (_b = options === null || options === void 0 ? void 0 : options.timeout) !== null && _b !== void 0 ? _b : 1000 * 5 });
            // Ping packet
            // https://wiki.vg/Server_List_Ping#1.4_to_1.5
            {
                socket.writeBytes(Uint8Array.from([0xFE, 0x01]));
                yield socket.flush(false);
            }
            // Server to client packet
            // https://wiki.vg/Server_List_Ping#Server_to_client
            {
                const kickIdentifier = yield socket.readByte();
                if (kickIdentifier !== 0xFF)
                    throw new Error('Expected server to send 0xFF kick packet, got ' + kickIdentifier);
                const remainingLength = yield socket.readInt16BE();
                const remainingData = yield socket.readBytes(remainingLength * 2);
                const [protocolVersionString, version, motdString, onlinePlayersString, maxPlayersString] = remainingData.slice(6).swap16().toString('utf16le').split('\0');
                const motd = (0, minecraft_motd_util_1.parse)(motdString);
                socket.close();
                clearTimeout(timeout);
                resolve({
                    protocolVersion: parseInt(protocolVersionString),
                    version,
                    players: {
                        online: parseInt(onlinePlayersString),
                        max: parseInt(maxPlayersString)
                    },
                    motd: {
                        raw: (0, minecraft_motd_util_1.format)(motd),
                        clean: (0, minecraft_motd_util_1.clean)(motd),
                        html: (0, minecraft_motd_util_1.toHTML)(motd)
                    },
                    srvRecord
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
exports.statusFE01 = statusFE01;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHVzRkUwMS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zdGF0dXNGRTAxLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUE0QjtBQUM1Qiw2REFBbUU7QUFDbkUsc0VBQThDO0FBRzlDLGdEQUE4QztBQUU5Qzs7R0FFRztBQUNILFNBQWdCLFVBQVUsQ0FBQyxJQUFZLEVBQUUsSUFBSSxHQUFHLEtBQUssRUFBRSxPQUEyQjtJQUNqRixPQUFPLENBQUMsV0FBVyxDQUFDLG1MQUFtTCxFQUFFLG9CQUFvQixDQUFDLENBQUM7SUFFL04sSUFBQSxnQkFBTSxFQUFDLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRSwwQ0FBMEMsT0FBTyxJQUFJLEdBQUcsQ0FBQyxDQUFDO0lBQzNGLElBQUEsZ0JBQU0sRUFBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSx3REFBd0QsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDL0YsSUFBQSxnQkFBTSxFQUFDLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRSwwQ0FBMEMsT0FBTyxJQUFJLEdBQUcsQ0FBQyxDQUFDO0lBQzNGLElBQUEsZ0JBQU0sRUFBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLDBDQUEwQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO0lBQ2xGLElBQUEsZ0JBQU0sRUFBQyxJQUFJLElBQUksQ0FBQyxFQUFFLDBEQUEwRCxJQUFJLEdBQUcsQ0FBQyxDQUFDO0lBQ3JGLElBQUEsZ0JBQU0sRUFBQyxJQUFJLElBQUksS0FBSyxFQUFFLDJEQUEyRCxJQUFJLEdBQUcsQ0FBQyxDQUFDO0lBQzFGLElBQUEsZ0JBQU0sRUFBQyxPQUFPLE9BQU8sS0FBSyxRQUFRLElBQUksT0FBTyxPQUFPLEtBQUssV0FBVyxFQUFFLDZEQUE2RCxPQUFPLE9BQU8sR0FBRyxDQUFDLENBQUM7SUFFdEosSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLEVBQUU7UUFDaEMsSUFBQSxnQkFBTSxFQUFDLE9BQU8sT0FBTyxDQUFDLFNBQVMsS0FBSyxTQUFTLElBQUksT0FBTyxPQUFPLENBQUMsU0FBUyxLQUFLLFdBQVcsRUFBRSx1RUFBdUUsT0FBTyxPQUFPLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUMvTCxJQUFBLGdCQUFNLEVBQUMsT0FBTyxPQUFPLENBQUMsT0FBTyxLQUFLLFFBQVEsSUFBSSxPQUFPLE9BQU8sQ0FBQyxPQUFPLEtBQUssV0FBVyxFQUFFLG9FQUFvRSxPQUFPLE9BQU8sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBRXJMLElBQUksT0FBTyxPQUFPLENBQUMsT0FBTyxLQUFLLFFBQVEsRUFBRTtZQUN4QyxJQUFBLGdCQUFNLEVBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUscURBQXFELE9BQU8sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1lBQ25ILElBQUEsZ0JBQU0sRUFBQyxPQUFPLENBQUMsT0FBTyxJQUFJLENBQUMsRUFBRSxxRUFBcUUsT0FBTyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7U0FDdEg7S0FDRDtJQUVELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7O1FBQzVDLE1BQU0sTUFBTSxHQUFHLElBQUksbUJBQVMsRUFBRSxDQUFDO1FBRS9CLE1BQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDL0IsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLEtBQUssRUFBRSxDQUFDO1lBRWhCLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDLENBQUM7UUFDL0QsQ0FBQyxFQUFFLE1BQUEsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLE9BQU8sbUNBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRWpDLElBQUk7WUFDSCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFFckIsSUFBSSxPQUFPLE9BQU8sS0FBSyxXQUFXLElBQUksT0FBTyxPQUFPLENBQUMsU0FBUyxLQUFLLFdBQVcsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFO2dCQUNwRyxTQUFTLEdBQUcsTUFBTSxJQUFBLHNCQUFVLEVBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRW5DLElBQUksU0FBUyxFQUFFO29CQUNkLElBQUksR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDO29CQUN0QixJQUFJLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztpQkFDdEI7YUFDRDtZQUVELE1BQU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQUEsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLE9BQU8sbUNBQUksSUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFNUUsY0FBYztZQUNkLDhDQUE4QztZQUM5QztnQkFDQyxNQUFNLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqRCxNQUFNLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDMUI7WUFFRCwwQkFBMEI7WUFDMUIsb0RBQW9EO1lBQ3BEO2dCQUNDLE1BQU0sY0FBYyxHQUFHLE1BQU0sTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUMvQyxJQUFJLGNBQWMsS0FBSyxJQUFJO29CQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0RBQWdELEdBQUcsY0FBYyxDQUFDLENBQUM7Z0JBRWhILE1BQU0sZUFBZSxHQUFHLE1BQU0sTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUNuRCxNQUFNLGFBQWEsR0FBRyxNQUFNLE1BQU0sQ0FBQyxTQUFTLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUVsRSxNQUFNLENBQUMscUJBQXFCLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxtQkFBbUIsRUFBRSxnQkFBZ0IsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFNUosTUFBTSxJQUFJLEdBQUcsSUFBQSwyQkFBSyxFQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUUvQixNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBRWYsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUV0QixPQUFPLENBQUM7b0JBQ1AsZUFBZSxFQUFFLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQztvQkFDaEQsT0FBTztvQkFDUCxPQUFPLEVBQUU7d0JBQ1IsTUFBTSxFQUFFLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQzt3QkFDckMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQztxQkFDL0I7b0JBQ0QsSUFBSSxFQUFFO3dCQUNMLEdBQUcsRUFBRSxJQUFBLDRCQUFNLEVBQUMsSUFBSSxDQUFDO3dCQUNqQixLQUFLLEVBQUUsSUFBQSwyQkFBSyxFQUFDLElBQUksQ0FBQzt3QkFDbEIsSUFBSSxFQUFFLElBQUEsNEJBQU0sRUFBQyxJQUFJLENBQUM7cUJBQ2xCO29CQUNELFNBQVM7aUJBQ1QsQ0FBQyxDQUFDO2FBQ0g7U0FDRDtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1gsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRXRCLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxLQUFLLEVBQUUsQ0FBQztZQUVoQixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDVjtJQUNGLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDSixDQUFDO0FBM0ZELGdDQTJGQyJ9