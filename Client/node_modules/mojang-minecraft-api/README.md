[![npm version](https://badgen.net/npm/v/mojang-minecraft-api)](https://www.npmjs.com/package/mojang-minecraft-api)
[![npm license](https://badgen.net/npm/license/mojang-minecraft-api)](https://www.npmjs.com/package/mojang-minecraft-api)
[![npm module downloads](https://badgen.net/npm/dt/mojang-minecraft-api)](https://www.npmjs.com/package/mojang-minecraft-api)

# mojang-minecraft-api
🎮 Wrapper for the [Mojang](https://wiki.vg/Mojang_API) API

## Installation  
```
npm install mojang-minecraft-api
```

## Functions

<dl>
<dt><a href="#getServiceStatus">getServiceStatus()</a> ⇒ <code>Object</code></dt>
<dd><p>Gets the current service status of various Mojang services</p>
</dd>
<dt><a href="#getUUID">getUUID(username)</a> ⇒ <code>Object</code></dt>
<dd><p>Gets the UUID of a player</p>
</dd>
<dt><a href="#getNameHistory">getNameHistory(uuid)</a> ⇒ <code>Object</code></dt>
<dd><p>Gets the name history of a player</p>
</dd>
<dt><a href="#getNameHistoryByName">getNameHistoryByName(username)</a> ⇒ <code>Object</code></dt>
<dd><p>Gets the name history of a player</p>
</dd>
<dt><a href="#getUUIDs">getUUIDs(names)</a> ⇒ <code>Object</code></dt>
<dd><p>Gets the UUIDs for multiple players</p>
</dd>
<dt><a href="#getProfile">getProfile(uuid)</a> ⇒ <code>Object</code></dt>
<dd><p>Gets the profile of a player</p>
</dd>
<dt><a href="#getProfileByName">getProfileByName(username)</a> ⇒ <code>Object</code></dt>
<dd><p>Gets the profile of a player</p>
</dd>
<dt><a href="#getSkinData">getSkinData(uuid)</a> ⇒ <code>Object</code></dt>
<dd><p>Gets the skin data of a player</p>
</dd>
<dt><a href="#getSkinDataByName">getSkinDataByName(username)</a> ⇒ <code>Object</code></dt>
<dd><p>Gets the skin data of a player</p>
</dd>
<dt><a href="#getSkinURL">getSkinURL(uuid)</a> ⇒ <code>string</code></dt>
<dd><p>Gets the skin URL of a player</p>
</dd>
<dt><a href="#getSkinURLByName">getSkinURLByName(username)</a> ⇒ <code>string</code></dt>
<dd><p>Gets the skin URL of a player</p>
</dd>
<dt><a href="#getPlayerHead">getPlayerHead(uuid)</a> ⇒ <code>string</code></dt>
<dd><p>Gets the player head image of a player</p>
</dd>
<dt><a href="#getPlayerHeadByName">getPlayerHeadByName(username)</a> ⇒ <code>string</code></dt>
<dd><p>Gets the player head image of a player</p>
</dd>
</dl>

<a name="getServiceStatus"></a>

## getServiceStatus() ⇒ <code>Object</code>
Gets the current service status of various Mojang services

**Kind**: global function
**Returns**: <code>Object</code> - - An Object that contains the status of various Mojang services
<a name="getUUID"></a>

## getUUID(username) ⇒ <code>Object</code>
Gets the UUID of a player

**Kind**: global function
**Returns**: <code>Object</code> - - This will return the UUID of the name that is provided

| Param | Type | Description |
| --- | --- | --- |
| username | <code>string</code> | The username of the player |

<a name="getNameHistory"></a>

## getNameHistory(uuid) ⇒ <code>Object</code>
Gets the name history of a player

**Kind**: global function
**Returns**: <code>Object</code> - - This will return all the usernames this user used in the past and the one they are using currently.

| Param | Type | Description |
| --- | --- | --- |
| uuid | <code>string</code> | The UUID from the player |

<a name="getNameHistoryByName"></a>

## getNameHistoryByName(username) ⇒ <code>Object</code>
Gets the name history of a player

**Kind**: global function
**Returns**: <code>Object</code> - - This will return all the usernames this user used in the past and the one they are using currently.

| Param | Type | Description |
| --- | --- | --- |
| username | <code>string</code> | The username of the player |

<a name="getUUIDs"></a>

## getUUIDs(names) ⇒ <code>Object</code>
Gets the UUIDs for multiple players

**Kind**: global function
**Returns**: <code>Object</code> - - This will return the UUID's and names of the players that are provided

| Param | Type | Description |
| --- | --- | --- |
| names | <code>Array.&lt;string&gt;</code> | An array with player names |

<a name="getProfile"></a>

## getProfile(uuid) ⇒ <code>Object</code>
Gets the profile of a player

**Kind**: global function
**Returns**: <code>Object</code> - - This will return the player's username and other additional information (e.g. skins)

| Param | Type | Description |
| --- | --- | --- |
| uuid | <code>string</code> | The UUID from the player |

<a name="getProfileByName"></a>

## getProfileByName(username) ⇒ <code>Object</code>
Gets the profile of a player

**Kind**: global function
**Returns**: <code>Object</code> - - This will return the player's username and other additional information (e.g. skins)

| Param | Type | Description |
| --- | --- | --- |
| username | <code>string</code> | The username of the player |

<a name="getSkinData"></a>

## getSkinData(uuid) ⇒ <code>Object</code>
Gets the skin data of a player

**Kind**: global function
**Returns**: <code>Object</code> - - This will return the player's skin information (e.g. skin url)

| Param | Type | Description |
| --- | --- | --- |
| uuid | <code>string</code> | The UUID from the player |

<a name="getSkinDataByName"></a>

## getSkinDataByName(username) ⇒ <code>Object</code>
Gets the skin data of a player

**Kind**: global function
**Returns**: <code>Object</code> - - This will return the player's skin information (e.g. skin URL)

| Param | Type | Description |
| --- | --- | --- |
| username | <code>string</code> | The username of the player |

<a name="getSkinURL"></a>

## getSkinURL(uuid) ⇒ <code>string</code>
Gets the skin URL of a player

**Kind**: global function
**Returns**: <code>string</code> - - This will return the URL of the player skin

| Param | Type | Description |
| --- | --- | --- |
| uuid | <code>string</code> | The UUID from the player |

<a name="getSkinURLByName"></a>

## getSkinURLByName(username) ⇒ <code>string</code>
Gets the skin URL of a player

**Kind**: global function
**Returns**: <code>string</code> - - This will return the URL of the player skin

| Param | Type | Description |
| --- | --- | --- |
| username | <code>string</code> | The username of the player |

<a name="getPlayerHead"></a>

## getPlayerHead(uuid) ⇒ <code>string</code>
Gets the player head image of a player

**Kind**: global function
**Returns**: <code>string</code> - - This will return a base64 string of the player head image (8x8)

| Param | Type | Description |
| --- | --- | --- |
| uuid | <code>string</code> | The UUID from the player |

<a name="getPlayerHeadByName"></a>

## getPlayerHeadByName(username) ⇒ <code>string</code>
Gets the player head image of a player

**Kind**: global function
**Returns**: <code>string</code> - - This will return a base64 string of the player head image (8x8)

| Param | Type | Description |
| --- | --- | --- |
| username | <code>string</code> | The username of the player |