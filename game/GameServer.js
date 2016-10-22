class GameServer {

    constructor(data){
        this.socket = data.roomSocket;
        this.room = data.room;
        this.isRunning = false;
    }

    BaseStartGame(){
        if(this.isRunning == true) return;

        this.isRunning = true;

        this.socket.on('send-to-all-players', this.SendToAllPlayers.bind(this));
        this.socket.on('send-to-one-player', this.SendToOnePlayer.bind(this));
        this.socket.on('send-to-server', this.SendToServer.bind(this));

        this.StartGame();
    }

    StartGame(){}

    StopGame(){
        this.isRunning = false;
    }

    SendToAllPlayers(data){
        this.socket.to(this.room.roomID).emit(data.fn, data.data);
    }

    SendToOnePlayer(data){
        this.socket.to(data.playerID).emit(data.fn, data.data);
    }

    SendToServer(data){
        data = JSON.parse(data);
    }

}

module.exports = GameServer;