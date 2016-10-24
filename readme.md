# unity3d-webgl-socket-lobby-server

This is the server of the Unity3D-WebGL-Socket-Lobby-System.
To get the system run, you also need two more packages:

* [the client package](https://github.com/daspete/unity3d-webgl-socket-lobby-client)
* [the Unity3D AssetStore package]()

A detailed tutorial, on how to use this system is available at [http://tutorials.daspete.at/unity3d/webglsocketlobby](http://tutorials.daspete.at/unity3d/webglsocketlobby)

If you like this package, you would do me a favour, if you [buy me a coffee](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=ZWWDTMU7SM9NY) ;)

## Requirements
* NodeJS 6.2

## Installation
Clone this repository to a destination of your choice, then go to the repository folder and start
```
nvm install
```

in the shell.

## Editing the server

### The server class
There is already a little game server example located at `/game/MyGameServer.js`.

The server is started, when every player in the current lobby room is ready.

After a countdown, the `StartGame` function is called.

### Adding socket events
To add socket event listeners, you can use the `this.AddEvent` function.

For example, if you send a message from the client, you can receive it this way

```javascript
this.AddEvent({
    event: 'send-message',
    callback: function(data){
        console.log(data);
    }
});
```

### Sending messages to all players
To send a message to all servers, you can use the `this.SendToAllPlayers` function.

For example: 
```javascript
this.SendToAllPlayers({
    event: 'set-player-position',
    data: {
        x: 100,
        y: 50
    }
});
```

### Sending messages to one player
To send a message to a specific player, you can use the `this.SendToOnePlayer` function

For example:
```javascript
this.SendToOnePlayer({
    playerID: 'the player id you want to send',
    event: 'send-message',
    data: {
        message: 'hi there'
    }
});
```

### The room object
In the game server class exists an instance of the room class, which holds the room id and the currently connected players

To get the current players, you can use `this.room.players`

If you want to get just the player ids, you can use `this.room.GetPlayerIDs();` which gives you an array of all current player ids

If you want to get the player object of a specific player id, you can use `this.room.GetPlayer(playerID);`, which gives you the player object, or null, if it wasn't found

### The player object
The player has multiple properties, like

* playerID - the id of the player
* playerName - the name of the player
* playerColor - the color of the player (represented by an array of the [r,g,b,a] values)
* playerSocket - the socket object of the player (if you want to use it directly)

