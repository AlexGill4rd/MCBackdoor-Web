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
exports.writeVarInt = exports.readVarInt = void 0;
function readVarInt(readByte) {
    return __awaiter(this, void 0, void 0, function* () {
        let numRead = 0;
        let result = 0;
        let read, value;
        do {
            if (numRead > 4)
                throw new Error('VarInt exceeds data bounds');
            read = yield readByte();
            value = (read & 0b01111111);
            result |= (value << (7 * numRead));
            numRead++;
            if (numRead > 5)
                throw new Error('VarInt is too big');
        } while ((read & 0b10000000) != 0);
        return result;
    });
}
exports.readVarInt = readVarInt;
function writeVarInt(value) {
    let buf = Buffer.alloc(0);
    do {
        let temp = value & 0b01111111;
        value >>>= 7;
        if (value != 0) {
            temp |= 0b10000000;
        }
        buf = Buffer.concat([buf, Buffer.from([temp])]);
    } while (value != 0);
    return buf;
}
exports.writeVarInt = writeVarInt;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFyaW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWwvdmFyaW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLFNBQXNCLFVBQVUsQ0FBQyxRQUErQjs7UUFDL0QsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNmLElBQUksSUFBWSxFQUFFLEtBQWEsQ0FBQztRQUVoQyxHQUFHO1lBQ0YsSUFBSSxPQUFPLEdBQUcsQ0FBQztnQkFBRSxNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7WUFFL0QsSUFBSSxHQUFHLE1BQU0sUUFBUSxFQUFFLENBQUM7WUFDeEIsS0FBSyxHQUFHLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxDQUFDO1lBQzVCLE1BQU0sSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBRW5DLE9BQU8sRUFBRSxDQUFDO1lBRVYsSUFBSSxPQUFPLEdBQUcsQ0FBQztnQkFBRSxNQUFNLElBQUksS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7U0FDdEQsUUFBUSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFFbkMsT0FBTyxNQUFNLENBQUM7SUFDZixDQUFDO0NBQUE7QUFsQkQsZ0NBa0JDO0FBRUQsU0FBZ0IsV0FBVyxDQUFDLEtBQWE7SUFDeEMsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUUxQixHQUFHO1FBQ0YsSUFBSSxJQUFJLEdBQUcsS0FBSyxHQUFHLFVBQVUsQ0FBQztRQUU5QixLQUFLLE1BQU0sQ0FBQyxDQUFDO1FBRWIsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFO1lBQ2YsSUFBSSxJQUFJLFVBQVUsQ0FBQztTQUNuQjtRQUVELEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNoRCxRQUFRLEtBQUssSUFBSSxDQUFDLEVBQUU7SUFFckIsT0FBTyxHQUFHLENBQUM7QUFDWixDQUFDO0FBaEJELGtDQWdCQyJ9