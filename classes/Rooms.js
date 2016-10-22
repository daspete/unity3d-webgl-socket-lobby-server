var Room = require('./Room.js');

class Rooms {
    constructor(config){
        this.config = config;
        this.rooms = [];
    }

    AddRoom(data){
        var room = new Room({
            roomID: data.roomID,
            roomName: data.roomName,
            config: this.config
        });

        room.AddPlayer(data.playerID);
        
        this.rooms.push(room);

        return room;
    }

    FindRoom(roomID){
        for(var i = 0; i < this.rooms.length; i++){
            if(this.rooms[i].roomID == roomID){
                return this.rooms[i];
            }
        }

        return null;
    }

    GetOpenRooms(){
        var rooms = [];

        for(var i = 0; i < this.rooms.length; i++){
            if(this.rooms[i].players.length > 0 && this.rooms[i].inGame == false){
                rooms.push(this.rooms[i].ListData());
            }
        }

        return rooms;
    }

    GetRoomPlayers(roomID){
        var room = this.FindRoom(roomID);

        if(room == null) return null;

        return room.PlayerListData();
    }

    RemovePlayerFromRoom(data){
        var room = this.FindRoom(data.roomID);

        if(room == null) return;

        room.RemovePlayer(data.playerID);
    }

    RemovePlayer(playerID){
        var roomID = null;

        for(var i = 0; i < this.rooms.length; i++){
            var playerRoomID = this.rooms[i].RemovePlayer(playerID);

            if(playerRoomID != null){
                roomID = playerRoomID;
                break;
            }
        }

        this.CleanRooms();

        return roomID;
    }

    IsRoomReadyToStart(roomID){
        var room = this.FindRoom(roomID);

        if(room == null) return false;

        return room.IsReadyToStart();
    }

    CleanRooms(){
        for(var i = 0; i < this.rooms.length; i++){
            if(this.rooms[i].players.length == 0){
                if(this.rooms[i].gameServer != null){
                    this.rooms[i].gameServer.StopGame();    
                }
                this.rooms.splice(i, 1);
                i--;
            }
        }
    }


}

module.exports = Rooms;