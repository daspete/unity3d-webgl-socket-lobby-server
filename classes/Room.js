var Player = require('./Player.js');

class Room {
    constructor(data){
        this.roomID = data.roomID;
        this.roomName = data.roomName;
        this.inGame = false;
        this.players = [];
        this.config = data.config;

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

    AddPlayer(playerID){
        for(var i = 0; i < this.players.length; i++){
            if(this.players[i].playerID == playerID){
                return;
            }
        }

        this.players.push(new Player({
            playerID: playerID,
            playerName: 'Player ' + (this.players.length + 1),
            playerColor: this.config.playerColors[this.config.defaultPlayerColor],
            playerReady: false
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
}

module.exports = Room;