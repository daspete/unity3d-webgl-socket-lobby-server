class GameServer {

    constructor(data){
        this.room = data.room;
        this.isRunning = false;
    }

    BaseStartGame(){
        if(this.isRunning == true) return;

        this.isRunning = true;

        this.StartGame();
    }

    AddEvent(data){
        for(var i = 0; i < this.room.players.length; i++){
            this.room.players[i].playerSocket.on(data.event, data.callback);
        }
    }

    StartGame(){}

    StopGame(){
        this.isRunning = false;
    }

    SendToAllPlayers(data){
        for(var i = 0; i < this.room.players.length; i++){
            this.room.players[i].playerSocket.emit(data.event, data.data);
        }
    }

    SendToOnePlayer(data){
        var playerSocket = this.room.GetPlayerSocket(data.playerID);

        if(playerSocket == null) return;

        playerSocket.emit(data.event, data.data);
    }

}

module.exports = GameServer;