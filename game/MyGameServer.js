var GameServer = require('./GameServer.js');

class MyGameServer extends GameServer {

    constructor(data){
        super(data);

        this.targetActive = false;
        this.playerTimes = {};
    }

    StartGame(){
        this.AddEvent({
            event: 'player-got-position',
            callback: this.OnPlayerGotPosition.bind(this)
        });

        this.StartGameRound();
    }

    StartGameRound(){
        if(this.isRunning == false) return;

        var playerIDs = this.room.GetPlayerIDs();

        for(var i = 0; i < playerIDs.length; i++){
            this.playerTimes[playerIDs[i]] = null;
        }

        setTimeout(this.SetTarget.bind(this), 5000);
    }

    SetTarget(){
        this.targetActive = true;

        this.SendToAllPlayers({
            event: 'set-goal-position',
            data: {
                x: Math.random() * 20,
                y: Math.random() * 20
            }
        });

        setTimeout(this.StartGameRound.bind(this), 5000);
    }

    OnPlayerGotPosition(data){
        data = JSON.parse(data);
        
        if(typeof this.playerTimes[data.playerID] === 'undefined') return;
        if(this.playerTimes[data.playerID] !== null) return;

        this.playerTimes[data.playerID] = data.clickTime;

        if(this.targetActive == true) {
            this.targetActive = false;

            this.SendToOnePlayer({
                playerID: data.playerID,
                event: 'player-won-round'
            });
        } else {
            this.SendToOnePlayer({
                playerID: data.playerID,
                event: 'player-lost-round'
            });    
        }

        
    }


}

module.exports = MyGameServer;