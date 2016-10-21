class Player{
    constructor(data){
        this.playerID = data.playerID;
        this.playerName = data.playerName;
        this.playerColor = data.playerColor;
        this.playerReady = false;
    }

    ListData(){
        return {
            playerID: this.playerID,
            playerName: this.playerName,
            playerColor: this.playerColor,
            playerReady: this.playerReady
        };
    }

    Update(player){
        this.playerName = player.playerName;
        this.playerColor = player.playerColor;
        this.playerReady = player.playerReady;
    }
}

module.exports = Player;