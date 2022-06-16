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

## Which functions can you find?
In the project you can find a very large assortment of additions. Below is a summary:

### Server list
In the start screen you can see all the servers that are infected with the plugin.![image](https://user-images.githubusercontent.com/57497005/174076623-ddf6e232-968e-4f26-8fa8-aefb22638f42.png)


### Player Settings
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
> Rename

> Lore

> Enchantments!

- Give an item from the saved items to a player

### Irritation panel ([Picture of the troll menu](https://user-images.githubusercontent.com/57497005/174078265-7cea0a87-e337-40bd-9d3c-f162e47a4a6d.png))
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
- Option to perform multiple actions at once

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

More features to come but my hands can't type faster.

## Rules
The plugin is made for educational purposes only. It is forbidden to use this in practice. I just made it to expand my knowledge. Because of this I decided to omit certain things so that it is not possible to use by a script kiddy.

You can judge my code, but just keep in mind that this is made from 5 months of experience. Keep your judgment reasonable.
