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
exports.RCON = void 0;
const assert_1 = __importDefault(require("assert"));
const events_1 = require("events");
const util_1 = require("util");
const TCPClient_1 = __importDefault(require("./TCPClient"));
const encoder = new util_1.TextEncoder();
class RCON extends events_1.EventEmitter {
    constructor() {
        super();
        this.isLoggedIn = false;
        this.socket = null;
        this.requestID = 0;
    }
    get isConnected() {
        return this.socket && this.socket.isConnected || false;
    }
    connect(host, port = 25575, options = {}) {
        (0, assert_1.default)(typeof host === 'string', `Expected 'host' to be a 'string', got '${typeof host}'`);
        (0, assert_1.default)(host.length > 1, `Expected 'host' to have a length greater than 0, got ${host.length}`);
        (0, assert_1.default)(typeof port === 'number', `Expected 'port' to be a 'number', got '${typeof port}'`);
        (0, assert_1.default)(Number.isInteger(port), `Expected 'port' to be an integer, got '${port}'`);
        (0, assert_1.default)(port >= 0, `Expected 'port' to be greater than or equal to 0, got '${port}'`);
        (0, assert_1.default)(port <= 65535, `Expected 'port' to be less than or equal to 65535, got '${port}'`);
        (0, assert_1.default)(typeof options === 'object', `Expected 'options' to be an 'object', got '${typeof options}'`);
        return new Promise((resolve, reject) => {
            var _a;
            this.socket = new TCPClient_1.default();
            const timeout = setTimeout(() => {
                var _a;
                reject(new Error('Failed to connect to RCON server within timeout duration'));
                (_a = this.socket) === null || _a === void 0 ? void 0 : _a.close();
            }, (_a = options === null || options === void 0 ? void 0 : options.timeout) !== null && _a !== void 0 ? _a : 1000 * 5);
            this.socket.connect(Object.assign({ host, port }, options))
                .then(() => {
                clearTimeout(timeout);
                resolve();
            })
                .catch((error) => {
                clearTimeout(timeout);
                reject(error);
            });
        });
    }
    login(password, options = {}) {
        (0, assert_1.default)(typeof password === 'string', `Expected 'password' to be a 'string', got '${typeof password}'`);
        (0, assert_1.default)(password.length > 1, `Expected 'password' to have a length greater than 0, got ${password.length}`);
        (0, assert_1.default)(typeof options === 'object', `Expected 'options' to be an 'object', got '${typeof options}'`);
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (this.socket === null || !this.socket.isConnected)
                return reject(new Error('login() attempted before RCON has connected'));
            const timeout = setTimeout(() => {
                var _a;
                reject(new Error('Failed to connect to RCON server within timeout duration'));
                (_a = this.socket) === null || _a === void 0 ? void 0 : _a.close();
            }, (_a = options === null || options === void 0 ? void 0 : options.timeout) !== null && _a !== void 0 ? _a : 1000 * 5);
            this.isLoggedIn = false;
            const passwordBytes = encoder.encode(password);
            // Login packet
            // https://wiki.vg/RCON#3:_Login
            {
                this.socket.writeInt32LE(10 + passwordBytes.byteLength);
                this.socket.writeInt32LE(this.requestID++);
                this.socket.writeInt32LE(3);
                this.socket.writeBytes(passwordBytes);
                this.socket.writeBytes(Uint8Array.from([0x00, 0x00]));
                yield this.socket.flush(false);
            }
            // Login response packet
            // https://wiki.vg/RCON#3:_Login
            {
                const packetLength = yield this.socket.readInt32LE();
                this.socket.ensureBufferedData(packetLength);
                const requestID = yield this.socket.readInt32LE();
                if (requestID === -1)
                    throw new Error('Invalid RCON password');
                const packetType = yield this.socket.readInt32LE();
                if (packetType !== 2)
                    throw new Error('Expected server to send packet type 2, received ' + packetType);
                yield this.socket.readBytes(2);
            }
            this.isLoggedIn = true;
            clearTimeout(timeout);
            resolve();
            process.nextTick(() => __awaiter(this, void 0, void 0, function* () {
                while (this.socket !== null && this.socket.isConnected && this.isLoggedIn) {
                    try {
                        yield this._readPacket();
                    }
                    catch (e) {
                        this.emit('error', e);
                    }
                }
            }));
        }));
    }
    run(command) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, assert_1.default)(typeof command === 'string', `Expected 'command' to be a 'string', got '${typeof command}'`);
            (0, assert_1.default)(command.length > 1, `Expected 'command' to have a length greater than 0, got ${command.length}`);
            if (this.socket === null || !this.socket.isConnected)
                throw new Error('run() attempted before RCON has connected');
            if (!this.isLoggedIn)
                throw new Error('run() attempted before RCON has successfully logged in');
            const commandBytes = encoder.encode(command);
            const requestID = this.requestID++;
            this.socket.writeInt32LE(10 + commandBytes.byteLength);
            this.socket.writeInt32LE(requestID);
            this.socket.writeInt32LE(2);
            this.socket.writeBytes(commandBytes);
            this.socket.writeBytes(Uint8Array.from([0x00, 0x00]));
            yield this.socket.flush(false);
            return requestID;
        });
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, assert_1.default)(typeof command === 'string', `Expected 'command' to be a 'string', got '${typeof command}'`);
            (0, assert_1.default)(command.length > 1, `Expected 'command' to have a length greater than 0, got ${command.length}`);
            const requestID = yield this.run(command);
            return new Promise((resolve) => {
                const listenerFunc = (data) => {
                    if (data.requestID !== requestID)
                        return;
                    this.removeListener('message', listenerFunc);
                    resolve(data.message);
                };
                this.on('message', listenerFunc);
            });
        });
    }
    _readPacket() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.socket === null || !this.socket.isConnected || !this.isLoggedIn)
                return Promise.reject(new Error('Attempted to read packet when socket was disconnected or RCON was not logged in'));
            const packetLength = yield this.socket.readInt32LE();
            yield this.socket.ensureBufferedData(packetLength);
            const requestID = yield this.socket.readInt32LE();
            const packetType = yield this.socket.readInt32LE();
            if (packetType === 0) {
                const message = yield this.socket.readStringNT();
                yield this.socket.readBytes(1);
                this.emit('message', { requestID, message });
            }
            else {
                yield this.socket.readBytes(packetLength - 8);
            }
        });
    }
    close() {
        var _a;
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.close();
    }
}
exports.RCON = RCON;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUkNPTi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdHJ1Y3R1cmUvUkNPTi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBNEI7QUFDNUIsbUNBQXNDO0FBRXRDLCtCQUFtQztBQUNuQyw0REFBb0M7QUFFcEMsTUFBTSxPQUFPLEdBQUcsSUFBSSxrQkFBVyxFQUFFLENBQUM7QUFpQmxDLE1BQU0sSUFBSyxTQUFRLHFCQUFZO0lBSzlCO1FBQ0MsS0FBSyxFQUFFLENBQUM7UUFMRixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLFdBQU0sR0FBcUIsSUFBSSxDQUFDO1FBQ2hDLGNBQVMsR0FBRyxDQUFDLENBQUM7SUFJdEIsQ0FBQztJQUVELElBQUksV0FBVztRQUNkLE9BQU8sSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsSUFBSSxLQUFLLENBQUM7SUFDeEQsQ0FBQztJQUVELE9BQU8sQ0FBQyxJQUFZLEVBQUUsSUFBSSxHQUFHLEtBQUssRUFBRSxVQUFtQyxFQUFFO1FBQ3hFLElBQUEsZ0JBQU0sRUFBQyxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUUsMENBQTBDLE9BQU8sSUFBSSxHQUFHLENBQUMsQ0FBQztRQUMzRixJQUFBLGdCQUFNLEVBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsd0RBQXdELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQy9GLElBQUEsZ0JBQU0sRUFBQyxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUUsMENBQTBDLE9BQU8sSUFBSSxHQUFHLENBQUMsQ0FBQztRQUMzRixJQUFBLGdCQUFNLEVBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSwwQ0FBMEMsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUNsRixJQUFBLGdCQUFNLEVBQUMsSUFBSSxJQUFJLENBQUMsRUFBRSwwREFBMEQsSUFBSSxH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