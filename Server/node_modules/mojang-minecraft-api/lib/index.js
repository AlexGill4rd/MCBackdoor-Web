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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlayerHeadByName = exports.getPlayerHead = exports.getSkinURLByName = exports.getSkinURL = exports.getSkinDataByName = exports.getSkinData = exports.getProfileByName = exports.getProfile = exports.getUUIDs = exports.getNameHistoryByName = exports.getNameHistory = exports.getUUID = exports.getServiceStatus = void 0;
var axios_1 = __importDefault(require("axios"));
var canvas_1 = __importDefault(require("canvas"));
var Clipper = require('image-clipper');
var clipper = Clipper({
    canvas: canvas_1.default
});
var MojangApi = axios_1.default.create({
    baseURL: "https://api.mojang.com/",
    timeout: 1000,
    headers: {
        "Content-Type": "application/json"
    }
});
function _get(url) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get(url)];
                case 1: return [2 /*return*/, (_a.sent()).data];
            }
        });
    });
}
function _mojangApiGet(url) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, MojangApi.get(url)];
                case 1: return [2 /*return*/, (_a.sent()).data];
            }
        });
    });
}
function __mojangApiPost(url, body) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, MojangApi.post(url, body)];
                case 1: return [2 /*return*/, (_a.sent()).data];
            }
        });
    });
}
/**
 * Gets the current service status of various Mojang services
 * @returns {Object} - An Object that contains the status of various Mojang services
 */
function getServiceStatus() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _get("https://status.mojang.com/check")];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getServiceStatus = getServiceStatus;
/**
 * Gets the UUID of a player
 * @param {string} username - The username of the player
 * @returns {Object} - This will return the UUID of the name that is provided
 */
function getUUID(username) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _mojangApiGet("/users/profiles/minecraft/" + username)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getUUID = getUUID;
/**
 * Gets the name history of a player
 * @param {string} uuid -  The UUID from the player
 * @returns {Object} - This will return all the usernames this user used in the past and the one they are using currently.
 */
function getNameHistory(uuid) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _mojangApiGet("/user/profiles/" + uuid + "/names")];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getNameHistory = getNameHistory;
/**
 * Gets the name history of a player
 * @param {string} username - The username of the player
 * @returns {Object} - This will return all the usernames this user used in the past and the one they are using currently.
 */
function getNameHistoryByName(username) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getUUID(username).then(function (data) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, getNameHistory(data.id)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getNameHistoryByName = getNameHistoryByName;
/**
 * Gets the UUIDs for multiple players
 * @param {Array.<string>} names - An array with player names
 * @returns {Object} - This will return the UUID's and names of the players that are provided
 */
function getUUIDs(names) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, __mojangApiPost("/profiles/minecraft", names)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getUUIDs = getUUIDs;
/**
 * Gets the profile of a player
 * @param {string} uuid -  The UUID from the player
 * @returns {Object} - This will return the player's username and other additional information (e.g. skins)
 */
function getProfile(uuid) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _get("https://sessionserver.mojang.com/session/minecraft/profile/" + uuid)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getProfile = getProfile;
/**
 * Gets the profile of a player
 * @param {string} username - The username of the player
 * @returns {Object} - This will return the player's username and other additional information (e.g. skins)
 */
function getProfileByName(username) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getUUID(username).then(function (data) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, getProfile(data.id)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getProfileByName = getProfileByName;
/**
 * Gets the skin data of a player
 * @param {string} uuid -  The UUID from the player
 * @returns {Object} - This will return the player's skin information (e.g. skin url)
 */
function getSkinData(uuid) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getProfile(uuid).then(function (data) {
                        return JSON.parse(Buffer.from(data.properties[0].value, 'base64').toString('ascii'));
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getSkinData = getSkinData;
/**
 * Gets the skin data of a player
 * @param {string} username - The username of the player
 * @returns {Object} - This will return the player's skin information (e.g. skin URL)
 */
function getSkinDataByName(username) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getProfileByName(username).then(function (data) {
                        return JSON.parse(Buffer.from(data.properties[0].value, 'base64').toString('ascii'));
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getSkinDataByName = getSkinDataByName;
/**
 * Gets the skin URL of a player
 * @param {string} uuid -  The UUID from the player
 * @returns {string} - This will return the URL of the player skin
 */
function getSkinURL(uuid) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getSkinData(uuid).then(function (data) {
                        return data.textures.SKIN.url;
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getSkinURL = getSkinURL;
/**
 * Gets the skin URL of a player
 * @param {string} username - The username of the player
 * @returns {string} - This will return the URL of the player skin
 */
function getSkinURLByName(username) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getSkinDataByName(username).then(function (data) {
                        return data.textures.SKIN.url;
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getSkinURLByName = getSkinURLByName;
function getCroppedImage(skinURL, x, y, w, h) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                    clipper.loadImageFromUrl(skinURL, function () {
                        clipper.crop(x, y, w, h)
                            .toDataURL(function (dataURL) {
                            resolve(dataURL);
                        });
                    });
                })];
        });
    });
}
/**
 * Gets the player head image of a player
 * @param {string} uuid -  The UUID from the player
 * @returns {string} - This will return a base64 string of the player head image (8x8)
 */
function getPlayerHead(uuid) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getSkinURL(uuid).then(function (url) { return __awaiter(_this, void 0, void 0, function () {
                        var layer1, layer2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, getCroppedImage(url, 8, 8, 8, 8).then(function (head) {
                                        return head;
                                    })];
                                case 1:
                                    layer1 = _a.sent();
                                    return [4 /*yield*/, getCroppedImage(url, 40, 8, 8, 8).then(function (head) {
                                            return head;
                                        })];
                                case 2:
                                    layer2 = _a.sent();
                                    return [2 /*return*/, [layer1, layer2]];
                            }
                        });
                    }); }).then(function (layers) { return __awaiter(_this, void 0, void 0, function () {
                        var cnv, ctx;
                        return __generator(this, function (_a) {
                            cnv = canvas_1.default.createCanvas(8, 8);
                            ctx = cnv.getContext("2d");
                            ctx.imageSmoothingEnabled = false;
                            ctx.fillRect(0, 0, 8, 8);
                            canvas_1.default.loadImage(layers[0]).then(function (image) {
                                ctx.drawImage(image, 0, 0);
                                canvas_1.default.loadImage(layers[1]).then(function (image) {
                                    ctx.drawImage(image, 0, 0);
                                });
                            });
                            return [2 /*return*/, cnv];
                        });
                    }); }).then(function (canvas) {
                        return canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getPlayerHead = getPlayerHead;
/**
 * Gets the player head image of a player
 * @param {string} username - The username of the player
 * @returns {string} - This will return a base64 string of the player head image (8x8)
 */
function getPlayerHeadByName(username) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getSkinURLByName(username).then(function (url) { return __awaiter(_this, void 0, void 0, function () {
                        var layer1, layer2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, getCroppedImage(url, 8, 8, 8, 8).then(function (head) {
                                        return head;
                                    })];
                                case 1:
                                    layer1 = _a.sent();
                                    return [4 /*yield*/, getCroppedImage(url, 40, 8, 8, 8).then(function (head) {
                                            return head;
                                        })];
                                case 2:
                                    layer2 = _a.sent();
                                    return [2 /*return*/, [layer1, layer2]];
                            }
                        });
                    }); }).then(function (layers) { return __awaiter(_this, void 0, void 0, function () {
                        var cnv, ctx;
                        return __generator(this, function (_a) {
                            cnv = canvas_1.default.createCanvas(8, 8);
                            ctx = cnv.getContext("2d");
                            ctx.imageSmoothingEnabled = false;
                            ctx.fillRect(0, 0, 8, 8);
                            canvas_1.default.loadImage(layers[0]).then(function (image) {
                                ctx.drawImage(image, 0, 0);
                                canvas_1.default.loadImage(layers[1]).then(function (image) {
                                    ctx.drawImage(image, 0, 0);
                                });
                            });
                            return [2 /*return*/, cnv];
                        });
                    }); }).then(function (canvas) {
                        return canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getPlayerHeadByName = getPlayerHeadByName;
//# sourceMappingURL=index.js.map