# unity3d-webgl-socket-lobby-server

This is the server of the Unity3D-WebGL-Socket-Lobby-System.
To get the system run, you also need two more packages:

* [the client package](https://github.com/daspete/unity3d-webgl-socket-lobby-client)
* [the Unity3D AssetStore package]()

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