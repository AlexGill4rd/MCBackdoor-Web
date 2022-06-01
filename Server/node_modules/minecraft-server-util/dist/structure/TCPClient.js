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
const net_1 = __importDefault(require("net"));
const events_1 = require("events");
const util_1 = require("util");
const varint_1 = require("../util/varint");
const encoder = new util_1.TextEncoder();
const decoder = new util_1.TextDecoder('utf8');
class TCPClient extends events_1.EventEmitter {
    constructor() {
        super(...arguments);
        this.isConnected = false;
        this.socket = null;
        this.data = Buffer.alloc(0);
    }
    connect(options) {
        return new Promise((resolve, reject) => {
            this.socket = net_1.default.createConnection(options);
            const connectHandler = () => {
                var _a, _b, _c, _d;
                this.isConnected = true;
                (_a = this.socket) === null || _a === void 0 ? void 0 : _a.removeListener('connect', connectHandler);
                (_b = this.socket) === null || _b === void 0 ? void 0 : _b.removeListener('error', errorHandler);
                (_c = this.socket) === null || _c === void 0 ? void 0 : _c.removeListener('timeout', timeoutHandler);
                (_d = this.socket) === null || _d === void 0 ? void 0 : _d.removeListener('close', closeHandler);
                resolve();
            };
            const errorHandler = (error) => {
                var _a;
                (_a = this.socket) === null || _a === void 0 ? void 0 : _a.destroy();
                reject(error);
            };
            const timeoutHandler = () => __awaiter(this, void 0, void 0, function* () {
                var _a;
                (_a = this.socket) === null || _a === void 0 ? void 0 : _a.destroy();
                reject(new Error('Socket timed out while connecting'));
            });
            const closeHandler = (hasError) => {
                var _a;
                this.isConnected = false;
                (_a = this.socket) === null || _a === void 0 ? void 0 : _a.destroy();
                if (!hasError)
                    reject();
                this.emit('close');
            };
            this.socket.on('data', (data) => {
                this.data = Buffer.concat([this.data, data]);
                this.emit('data');
            });
            this.socket.on('connect', () => connectHandler());
            this.socket.on('error', (error) => errorHandler(error));
            this.socket.on('timeout', () => timeoutHandler());
            this.socket.on('close', (hasError) => closeHandler(hasError));
        });
    }
    readByte() {
        return this.readUInt8();
    }
    writeByte(value) {
        this.writeUInt8(value);
    }
    readBytes(length) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureBufferedData(length);
            const value = this.data.slice(0, length);
            this.data = this.data.slice(length);
            return value;
        });
    }
    writeBytes(data) {
        this.data = Buffer.concat([this.data, data]);
    }
    readUInt8() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureBufferedData(1);
            const value = this.data.readUInt8(0);
            this.data = this.data.slice(1);
            return value;
        });
    }
    writeUInt8(value) {
        const data = Buffer.alloc(1);
        data.writeUInt8(value);
        this.data = Buffer.concat([this.data, data]);
    }
    readInt8() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureBufferedData(1);
            const value = this.data.readInt8(0);
            this.data = this.data.slice(1);
            return value;
        });
    }
    writeInt8(value) {
        const data = Buffer.alloc(1);
        data.writeInt8(value);
        this.data = Buffer.concat([this.data, data]);
    }
    readUInt16BE() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureBufferedData(2);
            const value = this.data.readUInt16BE(0);
            this.data = this.data.slice(2);
            return value;
        });
    }
    writeUInt16BE(value) {
        const data = Buffer.alloc(2);
        data.writeUInt16BE(value);
        this.data = Buffer.concat([this.data, data]);
    }
    readInt16BE() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureBufferedData(2);
            const value = this.data.readInt16BE(0);
            this.data = this.data.slice(2);
            return value;
        });
    }
    writeInt16BE(value) {
        const data = Buffer.alloc(2);
        data.writeInt16BE(value);
        this.data = Buffer.concat([this.data, data]);
    }
    readUInt16LE() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureBufferedData(2);
            const value = this.data.readUInt16LE(0);
            this.data = this.data.slice(2);
            return value;
        });
    }
    writeUInt16LE(value) {
        const data = Buffer.alloc(2);
        data.writeUInt16LE(value);
        this.data = Buffer.concat([this.data, data]);
    }
    readInt16LE() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureBufferedData(2);
            const value = this.data.readInt16LE(0);
            this.data = this.data.slice(2);
            return value;
        });
    }
    writeInt16LE(value) {
        const data = Buffer.alloc(2);
        data.writeInt16LE(value);
        this.data = Buffer.concat([this.data, data]);
    }
    readUInt32BE() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureBufferedData(4);
            const value = this.data.readUInt32BE(0);
            this.data = this.data.slice(4);
            return value;
        });
    }
    writeUInt32BE(value) {
        const data = Buffer.alloc(4);
        data.writeUInt32BE(value);
        this.data = Buffer.concat([this.data, data]);
    }
    readInt32BE() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureBufferedData(4);
            const value = this.data.readInt32BE(0);
            this.data = this.data.slice(4);
            return value;
        });
    }
    writeInt32BE(value) {
        const data = Buffer.alloc(4);
        data.writeInt32BE(value);
        this.data = Buffer.concat([this.data, data]);
    }
    readUInt32LE() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureBufferedData(4);
            const value = this.data.readUInt32LE(0);
            this.data = this.data.slice(4);
            return value;
        });
    }
    writeUInt32LE(value) {
        const data = Buffer.alloc(4);
        data.writeUInt32LE(value);
        this.data = Buffer.concat([this.data, data]);
    }
    readInt32LE() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureBufferedData(4);
            const value = this.data.readInt32LE(0);
            this.data = this.data.slice(4);
            return value;
        });
    }
    writeInt32LE(value) {
        const data = Buffer.alloc(4);
        data.writeInt32LE(value);
        this.data = Buffer.concat([this.data, data]);
    }
    readUInt64BE() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureBufferedData(8);
            const value = this.data.readBigUInt64BE(0);
            this.data = this.data.slice(8);
            return value;
        });
    }
    writeUInt64BE(value) {
        const data = Buffer.alloc(8);
        data.writeBigUInt64BE(value);
        this.data = Buffer.concat([this.data, data]);
    }
    readInt64BE() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureBufferedData(8);
            const value = this.data.readBigInt64BE(0);
            this.data = this.data.slice(8);
            return value;
        });
    }
    writeInt64BE(value) {
        const data = Buffer.alloc(8);
        data.writeBigInt64BE(value);
        this.data = Buffer.concat([this.data, data]);
    }
    readUInt64LE() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureBufferedData(8);
            const value = this.data.readBigUInt64LE(0);
            this.data = this.data.slice(8);
            return value;
        });
    }
    writeUInt64LE(value) {
        const data = Buffer.alloc(8);
        data.writeBigUInt64LE(value);
        this.data = Buffer.concat([this.data, data]);
    }
    readInt64LE() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureBufferedData(8);
            const value = this.data.readBigInt64LE(0);
            this.data = this.data.slice(8);
            return value;
        });
    }
    writeInt64LE(value) {
        const data = Buffer.alloc(8);
        data.writeBigInt64LE(value);
        this.data = Buffer.concat([this.data, data]);
    }
    readFloatBE() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureBufferedData(4);
            const value = this.data.readFloatBE(0);
            this.data = this.data.slice(4);
            return value;
        });
    }
    writeFloatBE(value) {
        const data = Buffer.alloc(4);
        data.writeFloatBE(value);
        this.data = Buffer.concat([this.data, data]);
    }
    readFloatLE() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureBufferedData(4);
            const value = this.data.readFloatLE(0);
            this.data = this.data.slice(4);
            return value;
        });
    }
    writeFloatLE(value) {
        const data = Buffer.alloc(4);
        data.writeFloatLE(value);
        this.data = Buffer.concat([this.data, data]);
    }
    readDoubleBE() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureBufferedData(8);
            const value = this.data.readDoubleBE(0);
            this.data = this.data.slice(8);
            return value;
        });
    }
    writeDoubleBE(value) {
        const data = Buffer.alloc(8);
        data.writeDoubleBE(value);
        this.data = Buffer.concat([this.data, data]);
    }
    readDoubleLE() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureBufferedData(8);
            const value = this.data.readDoubleLE(0);
            this.data = this.data.slice(8);
            return value;
        });
    }
    writeDoubleLE(value) {
        const data = Buffer.alloc(8);
        data.writeDoubleLE(value);
        this.data = Buffer.concat([this.data, data]);
    }
    readVarInt() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, varint_1.readVarInt)(() => this.readByte());
        });
    }
    writeVarInt(value) {
        this.writeBytes((0, varint_1.writeVarInt)(value));
    }
    readString(length) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.readBytes(length);
            return decoder.decode(data);
        });
    }
    writeString(value) {
        this.writeBytes(encoder.encode(value));
    }
    readStringVarInt() {
        return __awaiter(this, void 0, void 0, function* () {
            const length = yield this.readVarInt();
            const data = yield this.readBytes(length);
            return decoder.decode(data);
        });
    }
    writeStringVarInt(value) {
        const data = encoder.encode(value);
        this.writeVarInt(data.byteLength);
        this.writeBytes(data);
    }
    readStringNT() {
        return __awaiter(this, void 0, void 0, function* () {
            let buf = Buffer.alloc(0);
            let value;
            while ((value = yield this.readByte()) !== 0x00) {
                buf = Buffer.concat([buf, Buffer.from([value])]);
            }
            return decoder.decode(buf);
        });
    }
    writeStringNT(value) {
        const data = encoder.encode(value);
        this.writeBytes(data);
        this.writeByte(0x00);
    }
    writeStringBytes(value) {
        this.writeBytes(encoder.encode(value));
    }
    readStringUntil(byte) {
        return __awaiter(this, void 0, void 0, function* () {
            let buf = Buffer.alloc(0);
            let value;
            while ((value = yield this.readByte()) !== byte) {
                buf = Buffer.concat([buf, Buffer.from([value])]);
            }
            return decoder.decode(buf);
        });
    }
    flush(prefixLength = true) {
        if (!this.socket)
            return Promise.resolve();
        return new Promise((resolve, reject) => {
            var _a;
            let buf = this.data;
            if (prefixLength) {
                buf = Buffer.concat([(0, varint_1.writeVarInt)(buf.byteLength), buf]);
            }
            (_a = this.socket) === null || _a === void 0 ? void 0 : _a.write(buf, (error) => {
                if (error)
                    return reject(error);
                resolve();
            });
            this.data = Buffer.alloc(0);
        });
    }
    close() {
        var _a, _b, _c;
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.removeAllListeners();
        (_b = this.socket) === null || _b === void 0 ? void 0 : _b.end();
        (_c = this.socket) === null || _c === void 0 ? void 0 : _c.destroy();
    }
    ensureBufferedData(byteLength) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.data.byteLength >= byteLength)
                return Promise.resolve();
            return this._waitForData(byteLength);
        });
    }
    _waitForData(byteLength = 1) {
        return new Promise((resolve, reject) => {
            const dataHandler = () => {
                if (this.data.byteLength >= byteLength) {
                    this.removeListener('data', dataHandler);
                    this.removeListener('close', closeHandler);
                    resolve();
                }
            };
            const closeHandler = () => {
                this.removeListener('data', dataHandler);
                this.removeListener('close', closeHandler);
                reject(new Error('Socket closed unexpectedly while waiting for data'));
            };
            this.on('data', () => dataHandler());
            this.on('close', () => closeHandler());
        });
    }
}
exports.default = TCPClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVENQQ2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3N0cnVjdHVyZS9UQ1BDbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBa0M7QUFDbEMsbUNBQXNDO0FBQ3RDLCtCQUFnRDtBQUNoRCwyQ0FBeUQ7QUFFekQsTUFBTSxPQUFPLEdBQUcsSUFBSSxrQkFBVyxFQUFFLENBQUM7QUFDbEMsTUFBTSxPQUFPLEdBQUcsSUFBSSxrQkFBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRXhDLE1BQU0sU0FBVSxTQUFRLHFCQUFZO0lBQXBDOztRQUNRLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ25CLFdBQU0sR0FBa0IsSUFBSSxDQUFDO1FBQzdCLFNBQUksR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBbWZoQyxDQUFDO0lBamZBLE9BQU8sQ0FBQyxPQUEyQjtRQUNsQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3RDLElBQUksQ0FBQyxNQUFNLEdBQUcsYUFBRyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRTVDLE1BQU0sY0FBYyxHQUFHLEdBQUcsRUFBRTs7Z0JBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUV4QixNQUFBLElBQUksQ0FBQyxNQUFNLDBDQUFFLGNBQWMsQ0FBQyxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUM7Z0JBQ3ZELE1BQUEsSUFBSSxDQUFDLE1BQU0sMENBQUUsY0FBYyxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFDbkQsTUFBQSxJQUFJLENBQUMsTUFBTSwwQ0FBRSxjQUFjLENBQUMsU0FBUyxFQUFFLGNBQWMsQ0FBQyxDQUFDO2dCQUN2RCxNQUFBLElBQUksQ0FBQyxNQUFNLDBDQUFFLGNBQWMsQ0FBQyxPQUFPLEVBQUUsWUFB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