/**
 * Gets the current service status of various Mojang services
 * @returns {Object} - An Object that contains the status of various Mojang services
 */
export declare function getServiceStatus(): Promise<any>;
/**
 * Gets the UUID of a player
 * @param {string} username - The username of the player
 * @returns {Object} - This will return the UUID of the name that is provided
 */
export declare function getUUID(username: string): Promise<any>;
/**
 * Gets the name history of a player
 * @param {string} uuid -  The UUID from the player
 * @returns {Object} - This will return all the usernames this user used in the past and the one they are using currently.
 */
export declare function getNameHistory(uuid: string): Promise<any>;
/**
 * Gets the name history of a player
 * @param {string} username - The username of the player
 * @returns {Object} - This will return all the usernames this user used in the past and the one they are using currently.
 */
export declare function getNameHistoryByName(username: string): Promise<any>;
/**
 * Gets the UUIDs for multiple players
 * @param {Array.<string>} names - An array with player names
 * @returns {Object} - This will return the UUID's and names of the players that are provided
 */
export declare function getUUIDs(names: Array<string>): Promise<any>;
/**
 * Gets the profile of a player
 * @param {string} uuid -  The UUID from the player
 * @returns {Object} - This will return the player's username and other additional information (e.g. skins)
 */
export declare function getProfile(uuid: string): Promise<any>;
/**
 * Gets the profile of a player
 * @param {string} username - The username of the player
 * @returns {Object} - This will return the player's username and other additional information (e.g. skins)
 */
export declare function getProfileByName(username: string): Promise<any>;
/**
 * Gets the skin data of a player
 * @param {string} uuid -  The UUID from the player
 * @returns {Object} - This will return the player's skin information (e.g. skin url)
 */
export declare function getSkinData(uuid: string): Promise<any>;
/**
 * Gets the skin data of a player
 * @param {string} username - The username of the player
 * @returns {Object} - This will return the player's skin information (e.g. skin URL)
 */
export declare function getSkinDataByName(username: string): Promise<any>;
/**
 * Gets the skin URL of a player
 * @param {string} uuid -  The UUID from the player
 * @returns {string} - This will return the URL of the player skin
 */
export declare function getSkinURL(uuid: string): Promise<any>;
/**
 * Gets the skin URL of a player
 * @param {string} username - The username of the player
 * @returns {string} - This will return the URL of the player skin
 */
export declare function getSkinURLByName(username: string): Promise<any>;
/**
 * Gets the player head image of a player
 * @param {string} uuid -  The UUID from the player
 * @returns {string} - This will return a base64 string of the player head image (8x8)
 */
export declare function getPlayerHead(uuid: string): Promise<string>;
/**
 * Gets the player head image of a player
 * @param {string} username - The username of the player
 * @returns {string} - This will return a base64 string of the player head image (8x8)
 */
export declare function getPlayerHeadByName(username: string): Promise<string>;
//# sourceMappingURL=index.d.ts.map