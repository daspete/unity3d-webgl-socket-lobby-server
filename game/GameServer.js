class GameServer {

    constructor(data){
        this.roomSocket = data.roomSocket;
        this.socket = this.roomSocket.nsp;
        this.room = data.room;
    }

    StartGame(){
        this.GameLoop();
    }

    GameLoop(){
        this.socket.to(this.room.roomID).emit('game-tick');

        setTimeout(this.GameLoop.bind(this), 5000);
    }

}

module.exports = GameServer;