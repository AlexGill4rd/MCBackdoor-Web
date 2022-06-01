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
exports.scanLAN = void 0;
const assert_1 = __importDefault(require("assert"));
const dgram_1 = __importDefault(require("dgram"));
const util_1 = require("util");
const decoder = new util_1.TextDecoder('utf8');
const pattern = /\[MOTD\](.*)\[\/MOTD\]\[AD\](\d{1,5})\[\/AD\]/;
function scanLAN(options) {
    (0, assert_1.default)(typeof options === 'object' || typeof options === 'undefined', `Expected 'options' to be an 'object' or 'undefined', got '${typeof options}'`);
    if (typeof options === 'object') {
        (0, assert_1.default)(typeof options.scanTime === 'number' || typeof options.scanTime === 'undefined', `Expected 'options.scanTime' to be a 'number' or 'undefined', got '${typeof options.scanTime}'`);
        if (typeof options.scanTime === 'number') {
            (0, assert_1.default)(options.scanTime > 0, `Expected 'options.scanTime' to be greater than or equal to 0, got '${options.scanTime}'`);
        }
    }
    const servers = [];
    const socket = dgram_1.default.createSocket('udp4');
    socket.on('message', (message, info) => {
        const match = decoder.decode(message).match(pattern);
        if (!match || match.length < 3)
            return;
        let port = parseInt(match[2]);
        if (isNaN(port))
            port = 25565;
        if (servers.some((server) => server.host === info.address && server.port === port))
            return;
        servers.push({
            host: info.address,
            port,
            motd: match[1]
        });
    });
    socket.bind(4445, () => {
        socket.addMembership('224.0.2.60');
    });
    return new Promise((resolve, reject) => {
        var _a;
        const timeout = setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            yield new Promise((resolve) => socket.close(resolve));
            resolve(servers);
        }), (_a = options === null || options === void 0 ? void 0 : options.scanTime) !== null && _a !== void 0 ? _a : 1000 * 5);
        socket.on('error', (error) => {
            socket.close();
            clearTimeout(timeout);
            reject(error);
        });
    });
}
exports.scanLAN = scanLAN;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NhbkxBTi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zY2FuTEFOLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUE0QjtBQUM1QixrREFBMEI7QUFDMUIsK0JBQW1DO0FBWW5DLE1BQU0sT0FBTyxHQUFHLElBQUksa0JBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN4QyxNQUFNLE9BQU8sR0FBRywrQ0FBK0MsQ0FBQztBQUVoRSxTQUFnQixPQUFPLENBQUMsT0FBd0I7SUFDL0MsSUFBQSxnQkFBTSxFQUFDLE9BQU8sT0FBTyxLQUFLLFFBQVEsSUFBSSxPQUFPLE9BQU8sS0FBSyxXQUFXLEVBQUUsNkRBQTZELE9BQU8sT0FBTyxHQUFHLENBQUMsQ0FBQztJQUV0SixJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsRUFBRTtRQUNoQyxJQUFBLGdCQUFNLEVBQUMsT0FBTyxPQUFPLENBQUMsUUFBUSxLQUFLLFFBQVEsSUFBSSxPQUFPLE9BQU8sQ0FBQyxRQUFRLEtBQUssV0FBVyxFQUFFLHFFQUFxRSxPQUFPLE9BQU8sQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBRXpMLElBQUksT0FBTyxPQUFPLENBQUMsUUFBUSxLQUFLLFFBQVEsRUFBRTtZQUN6QyxJQUFBLGdCQUFNLEVBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQUUsc0VBQXNFLE9BQU8sQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1NBQ3hIO0tBQ0Q7SUFFRCxNQUFNLE9BQU8sR0FBb0IsRUFBRSxDQUFDO0lBRXBDLE1BQU0sTUFBTSxHQUFHLGVBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFMUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDdEMsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUM7WUFBRSxPQUFPO1FBRXZDLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QixJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFBRSxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBRTlCLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsT0FBTyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDO1lBQUUsT0FBTztRQUUzRixPQUFPLENBQUMsSUFBSSxDQUFDO1lBQ1osSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ2xCLElBQUk7WUFDSixJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUNkLENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO1FBQ3RCLE1BQU0sQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDcEMsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFOztRQUN0QyxNQUFNLE9BQU8sR0FBRyxVQUFVLENBQUMsR0FBUyxFQUFFO1lBQ3JDLE1BQU0sSUFBSSxPQUFPLENBQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUU1RCxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbEIsQ0FBQyxDQUFBLEVBQUUsTUFBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsUUFBUSxtQ0FBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFbEMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFZLEVBQUUsRUFBRTtZQUNuQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7WUFFZixZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFdEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2YsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztBQUNKLENBQUM7QUFsREQsMEJBa0RDIn0=