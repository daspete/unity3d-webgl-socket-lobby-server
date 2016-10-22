var GameServer = require('./GameServer.js');

class MyGameServer extends GameServer {

    constructor(data){
        super(data);

        this.targetActive = false;
    }

    StartGame(){
        this.socket.on('player-got-position', this.OnPlayerGotPosition.bind(this));

        setTimeout(this.SetTarget.bind(this), 5000);
    }

    SetTarget(){
        this.targetActive = true;

        this.SendToAllPlayers({
            fn: 'set-goal-position',
            data: {
                x: Math.random() * 100 + 50,
                y: Math.random() * 100 + 50
            }
        });
    }

    OnPlayerGotPosition(data){
        if(this.targetActive == false) return;

        this.targetActive = false;

        data = JSON.parse(data);

        console.log('Player got position');
    }


}

module.exports = MyGameServer;