import axios from "axios"
import canvas from "canvas"

const Clipper = require('image-clipper');
var clipper = Clipper({
    canvas: canvas
})

const MojangApi = axios.create({
    baseURL: "https://api.mojang.com/",
    timeout: 1000,
    headers: {
        "Content-Type":"application/json"
    }
})

async function _get(url: string) {
    return (await axios.get(url)).data
}

async function _mojangApiGet(url: string) {
    return (await MojangApi.get(url)).data
}

async function __mojangApiPost(url: string, body: Array<string>) {
    return (await MojangApi.post(url, body)).data
}

/**
 * Gets the current service status of various Mojang services
 * @returns {Object} - An Object that contains the status of various Mojang services
 */
export async function getServiceStatus() {
    return await _get("https://status.mojang.com/check")
}

/**
 * Gets the UUID of a player
 * @param {string} username - The username of the player
 * @returns {Object} - This will return the UUID of the name that is provided
 */
export async function getUUID(username: string) {
    return await _mojangApiGet(`/users/profiles/minecraft/${username}`)
}

/**
 * Gets the name history of a player
 * @param {string} uuid -  The UUID from the player
 * @returns {Object} - This will return all the usernames this user used in the past and the one they are using currently.
 */
export async function getNameHistory(uuid: string) {
    return await _mojangApiGet(`/user/profiles/${uuid}/names`)
}

/**
 * Gets the name history of a player
 * @param {string} username - The username of the player
 * @returns {Object} - This will return all the usernames this user used in the past and the one they are using currently.
 */
export async function getNameHistoryByName(username: string) {
    return await getUUID(username).then(async (data)=>{
        return await getNameHistory(data.id)
    })
}

/**
 * Gets the UUIDs for multiple players
 * @param {Array.<string>} names - An array with player names
 * @returns {Object} - This will return the UUID's and names of the players that are provided
 */
export async function getUUIDs(names: Array<string>) {
    return await __mojangApiPost("/profiles/minecraft", names)
}

/**
 * Gets the profile of a player
 * @param {string} uuid -  The UUID from the player
 * @returns {Object} - This will return the player's username and other additional information (e.g. skins)
 */
export async function getProfile(uuid: string) {
    return await _get(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`)
}

/**
 * Gets the profile of a player
 * @param {string} username - The username of the player
 * @returns {Object} - This will return the player's username and other additional information (e.g. skins)
 */
export async function getProfileByName(username: string) {
    return await getUUID(username).then(async (data)=>{
        return await getProfile(data.id)
    })
}

/**
 * Gets the skin data of a player
 * @param {string} uuid -  The UUID from the player
 * @returns {Object} - This will return the player's skin information (e.g. skin url)
 */
export async function getSkinData(uuid: string) {
    return await getProfile(uuid).then((data)=>{
        return JSON.parse(Buffer.from(data.properties[0].value, 'base64').toString('ascii'))
    })
}

/**
 * Gets the skin data of a player
 * @param {string} username - The username of the player
 * @returns {Object} - This will return the player's skin information (e.g. skin URL)
 */
export async function getSkinDataByName(username: string) {
    return await getProfileByName(username).then((data)=>{
        return JSON.parse(Buffer.from(data.properties[0].value, 'base64').toString('ascii'))
    })
}

/**
 * Gets the skin URL of a player
 * @param {string} uuid -  The UUID from the player
 * @returns {string} - This will return the URL of the player skin
 */
export async function getSkinURL(uuid: string) {
    return await getSkinData(uuid).then((data)=>{
        return data.textures.SKIN.url
    })
}

/**
 * Gets the skin URL of a player
 * @param {string} username - The username of the player
 * @returns {string} - This will return the URL of the player skin
 */
export async function getSkinURLByName(username: string) {
    return await getSkinDataByName(username).then((data)=>{
        return data.textures.SKIN.url
    })
}

async function getCroppedImage(skinURL: string, x: number, y: number, w: number, h: number) {
    return new Promise(resolve=>{
        clipper.loadImageFromUrl(skinURL, ()=>{
            clipper.crop(x,y,w,h)
            .toDataURL((dataURL: string)=>{
                resolve(dataURL)
            })
        })
    })
}

/**
 * Gets the player head image of a player
 * @param {string} uuid -  The UUID from the player
 * @returns {string} - This will return a base64 string of the player head image (8x8)
 */
export async function getPlayerHead(uuid: string) {
    return await getSkinURL(uuid).then(async url=>{
        let layer1 = await getCroppedImage(url, 8,8,8,8).then(head=>{
            return head
        })
        let layer2 = await getCroppedImage(url, 40,8,8,8).then(head=>{
            return head
        })
        return [layer1, layer2]
    }).then(async layers=>{
        let cnv = canvas.createCanvas(8,8)
        let ctx = cnv.getContext("2d")
        ctx.imageSmoothingEnabled = false
        ctx.fillRect(0,0,8,8)
        canvas.loadImage(<string>layers[0]).then(image=>{
            ctx.drawImage(image, 0,0)
            canvas.loadImage(<string>layers[1]).then(image=>{
                ctx.drawImage(image, 0,0)
            })
        })
        return cnv
    }).then(canvas=>{
        return canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")
    })
}

/**
 * Gets the player head image of a player
 * @param {string} username - The username of the player
 * @returns {string} - This will return a base64 string of the player head image (8x8)
 */
export async function getPlayerHeadByName(username: string) {
    return await getSkinURLByName(username).then(async url=>{
        let layer1 = await getCroppedImage(url, 8,8,8,8).then(head=>{
            return head
        })
        let layer2 = await getCroppedImage(url, 40,8,8,8).then(head=>{
            return head
        })
        return [layer1, layer2]
    }).then(async layers=>{
        let cnv = canvas.createCanvas(8,8)
        let ctx = cnv.getContext("2d")
        ctx.imageSmoothingEnabled = false
        ctx.fillRect(0,0,8,8)
        canvas.loadImage(<string>layers[0]).then(image=>{
            ctx.drawImage(image, 0,0)
            canvas.loadImage(<string>layers[1]).then(image=>{
                ctx.drawImage(image, 0,0)
            })
        })
        return cnv
    }).then(canvas=>{
        return canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")
    })
}