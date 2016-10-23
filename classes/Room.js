var Player = require('./Player.js');
var MyGameServer = require('../game/MyGameServer.js');

class Room {
    constructor(data){
        this.roomID = data.roomID;
        this.roomName = data.roomName;
        this.inGame = false;
        this.players = [];
        this.config = data.config;
        this.gameServer = null;
    }

    ListData(){
        return {
            roomID: this.roomID,
            roomName: this.roomName,
            playerCount: this.players.length
        };
    }

    PlayerListData(){
        var players = [];

        for(var i = 0; i < this.players.length; i++){
            players.push(this.players[i].ListData());
        }

        return players;
    }

    AddPlayer(playerID, playerSocket){
        for(var i = 0; i < this.players.length; i++){
            if(this.players[i].playerID == playerID){
                return;
            }
        }

        this.players.push(new Player({
            playerID: playerID,
            playerName: 'Player ' + (this.players.length + 1),
            playerColor: this.config.playerColors[this.config.defaultPlayerColor],
            playerReady: false,
            playerSocket: playerSocket
        }));
    }

    UpdatePlayer(player){
        for(var i = 0; i < this.players.length; i++){
            if(this.players[i].playerID == player.playerID){
                this.players[i].Update(player);
            }
        }
    }

    RemovePlayer(playerID){
        for(var i = 0; i < this.players.length; i++){
            if(this.players[i].playerID == playerID){
                this.players.splice(i, 1);
                return this.roomID;
            }
        }

        return null;
    }

    StartGame(){
        if(this.inGame == true) return false;

        this.inGame = true;

        this.gameServer = new MyGameServer({
            room: this
        });

        this.gameServer.BaseStartGame();

        return true;
    }

    SetInGame(){
        this.inGame = true;
    }

    IsReadyToStart(){
        for(var i = 0; i < this.players.length; i++){
            if(this.players[i].playerReady == false){
                return false;
            }
        }

        return this.players.length >= this.config.minPlayerToStartGame;
    }

    GetPlayerIDs(){
        var playerIDs = [];

        for(var i = 0; i < this.players.length; i++){
            playerIDs.push(this.players[i].playerID);
        }

        return playerIDs;
    }

    GetPlayerSocket(playerID){
        for(var i = 0; i < this.players.length; i++){
            if(this.players[i].playerID == playerID){
                return this.players[i].playerSocket;
            }
        }

        return null;
    }

    GetPlayer(playerID){
        for(var i = 0; i < this.players.length; i++){
            if(this.players[i].playerID == playerID){
                return this.players[i];
            }
        }

        return null;
    }
}

module.exports = Room;