"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseAddress = void 0;
const addressMatch = /^([^:]+)(?::(\d{1,5}))?$/;
function parseAddress(value, defaultPort = 25565) {
    const match = value.match(addressMatch);
    if (!match)
        return null;
    const port = match[2] ? parseInt(match[2]) : defaultPort;
    if (isNaN(port) || port < 1 || port > 65535)
        return null;
    return {
        host: match[1],
        port
    };
}
exports.parseAddress = parseAddress;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VBZGRyZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWwvcGFyc2VBZGRyZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUtBLE1BQU0sWUFBWSxHQUFHLDBCQUEwQixDQUFDO0FBRWhELFNBQWdCLFlBQVksQ0FBQyxLQUFhLEVBQUUsV0FBVyxHQUFHLEtBQUs7SUFDOUQsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN4QyxJQUFJLENBQUMsS0FBSztRQUFFLE9BQU8sSUFBSSxDQUFDO0lBRXhCLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUM7SUFDekQsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxJQUFJLEdBQUcsS0FBSztRQUFFLE9BQU8sSUFBSSxDQUFDO0lBRXpELE9BQU87UUFDTixJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNkLElBQUk7S0FDSixDQUFDO0FBQ0gsQ0FBQztBQVhELG9DQVdDIn0=