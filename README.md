# Backdoor project for minecraft servers
The idea of the plugin is to backdoor a server through a plugin. The plugin is injected into a normal plugin that the server owner places in his server. When the plugin reaches the plugins folder and the owner starts up the server, I will have remote access to various functions that I have built in through this plugin.

## What is the goal?
I developed the plugin because it was on my bucket list to one day make a RAT. But not a RAT that allows you to access someone's computer, but a remote control panel that allows me to control the server.

## Why is the plugin not english?
The plugin is in Dutch to reduce the risk that it will be used for malicious purposes. Moreover, I am also Dutch.

## Learning & Help
If you want to learn something don't be afraid to take a look at the code and do a PR if you wish.

## What did I use for the project?
For the project I used several useful and important frameworks and programming languages.

### Java
I used Java to write the plugin in minecraft. In the plugin I communicated with sockets to the web page.
### Socket.IO
Socket io is used to control the entire communication system of the project. Whenever necessary, the Java client will forward the requested information to the API server and receive an answer back if desired. The web client is thus able to retrieve information from, for example, the players.
### React
I used React to build the UI of the web page. An extremely useful framework to create a user-friendly web page.
### NodeJS
I use Nodejs to control the backend and communication. The minecraft server will always surf to the Nodejs server with the data first. And the nodejs server will then process what the final destination of the data is.
### SASS
I use Sass for easy styling for CSS. In sass you get the possibility to create functions and apply parenting. Which makes it very easy. Sass just converts the text to CSS.
### Typescript
I use typescript instead of javascript. Typescript is the same as javascript but only with some more features. For example, you have to assign variables to a type and properties work differently.

### MySQL
I use MySQL to store player data and other important information. If you search through the code you will find the names of the tables and login data.

## Which functions can you find?
In the project you can find a very large assortment of additions. Below is a summary:

### Server list
In the start screen you can see all the servers that are infected with the plugin.
![image](https://user-images.githubusercontent.com/57497005/180844499-dd5bc6d9-fde6-43ed-af9a-73f41c82b7b0.png)


## Player Panel
- Get the player list
- Make a player operator
- Customize a player's game mode
- Crash the server
- Kick a player from the server
- Teleport a player to a location
- Whitelist a player
- Kill a player
- Ban a player
- Spam a player with PM messages
- Leak a player's data
- Adjust the player's experience level
- Option to kick the player every time he joined
- Adjust a player's inventory LIVE
- Adjust a player's enderchest LIVE
- Store items you find interesting ([Image illustrating the save panel](https://user-images.githubusercontent.com/57497005/174077946-0e5be262-154e-48ae-9a34-121c621ffd0b.png))
- Drop items from inventory
- Edit an item ([Image illustrating the edit panel](https://user-images.githubusercontent.com/57497005/174077302-d3f9eac9-6a25-49a1-9bd4-1414fadb8b05.png))
> Rename, Lore, Enchantments

- Give an item from the saved items to a player
- Edit player experience
- Get player experience

### Irritation panel
- Teleport the player to a random location
- Reset the player's food level
- Rotate the player 180°
- Spawn a web below the player
- Change the speed of the player
- Give the player an Earrape
- Set the player on fire
- Freeze the player
- Set the player's health very low
- Have the player say is or execute a command
- Teleport the player into the sky
- Let the player invade the void
- Make the player invisible
- Make the players around the player invisible for the player
- Option to perform multiple actions at once

![Page](https://user-images.githubusercontent.com/57497005/174078265-7cea0a87-e337-40bd-9d3c-f162e47a4a6d.png)
### Player information
- Player name
- Player UniqueID
- Player public ipaddress
- Player operator status
- Player health
- Player game mode
- Player location
- Player World
- Player server ipaddress

![Page](https://user-images.githubusercontent.com/57497005/175658466-0133aa9d-5273-40f0-baf8-e12834fe4044.png)
## Server Panel
### Dashboard
- Get the ipaddress from the server
- Get MOTD from the server
- Change the version of the server. (So the main jar)
- Close the server
- Reload the server
- View the chat from the server
- Filter the chat. (On Posts & Players)
- Customize the server icon of the server
- View the number of players
- View the memory consumption
- Get the server TPS
- Get the environment where the sever is hosted
- Get the number of cores of the CPU
- Get the player list

![Page](https://user-images.githubusercontent.com/57497005/180844330-9cce763e-2c79-4242-a424-3a240b5649ae.png)
### Console ([Page](https://user-images.githubusercontent.com/57497005/175658236-97155eac-999e-4dee-901c-c9690cebbf12.png))
- Watch the server's live console
- Execute commands in the console
- Filter the console by messages
### File explorer
- View the server files
- Upload a file in a directory
- Download a file from the server
- Edit a file from the server
- Get info about a traffic jam
- Delete files
- Delete Folders
- Open directories
- Edit a file and save it on the server

![Page](https://user-images.githubusercontent.com/57497005/175658593-4635ae01-c577-4be9-b6ae-0180134a33ed.png)
### Banned Menu ([Page](https://user-images.githubusercontent.com/57497005/175658165-7b6c6d68-e2cd-4bae-ac11-1f4132f117f9.png))
- Get the banned players
- Unban a player
- Get info about a banned player
### Whitelist Menu ([Page](https://user-images.githubusercontent.com/57497005/175658219-2394450c-1fcd-4c77-b8db-25e6d61f6dc5.png))
- Get the whitelisted player from the server
- Add a player to the whitelist. (Also players who have not previously joined the server)
- Remove players from whitelist
- Find a player
- Get all the players who have ever joined the server as a choice to add to the whitelist
### Mob Spawner
This allows you to spawn different types of mobs with their own settings in the world. The location can be set according to your wishes.
- Select mob types
- Change displayname
- Set spawn amount
- Set spawn location
> World / Player
- Settings
> Glow, Godmode, Gravity, Customname visible

![Page](https://user-images.githubusercontent.com/57497005/180843849-81267663-a11e-4409-a54a-12939865fb6a.png)

### Armor Editing
There is a new feature where it is possible to perform different actions on a player's armor. Below is a list of the new control options.
- Added a skin viewer. You can now view the player's skin here.
- You can clear all the items the player is wearing and has in his offhand.
- You can see all the armor the player is wearing and what he is holding in his offhand!
- Continuing on the player's skin. You can also download it here.
- Back to the items. You can equip the item, edit it, drop it (the player can't pick it up anymore), delete it, view info and finally store it in the vault to access for later use.

#### What does the new menu look like now?
![image of panel](https://user-images.githubusercontent.com/57497005/182044684-5dd91679-400e-44bd-8c8e-37edd8a75e20.png)


More features to come but my hands can't type faster.

## Rules
The plugin is made for educational purposes only. It is forbidden to use this in practice. I just made it to expand my knowledge. Because of this I decided to omit certain things so that it is not possible to use by a script kiddy.

You can judge my code, but just keep in mind that this is made from 5 months of experience. Keep your judgment reasonable.
