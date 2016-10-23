var port = process.env.PORT || 3000,
    io = require('socket.io')(port),
    Rooms = require('./classes/Rooms.js'),
    config = null,
    rooms = null,
    globalSocket = null,
    roomSocket = null;

globalSocket = io.on('connection', function(socket){
    console.log('Connected: ' + socket.id);

    socket.on('set-config', function(data){
        if(config != null) return;

        config = data.config;

        rooms = new Rooms(config);
    });

    socket.on('get-connection-id', function(callback){
        callback(socket.id);
    });
});

roomSocket = io.of('/rooms');
roomSocket.on('player-got-position', function(){
    console.log('player got test2');
});
roomSocket.on('connection', function(socket){
    socket.emit('get-room-list');

    socket.on('disconnect', function(){
        var roomID = rooms.RemovePlayer(socket.id.substr(7));

        if(roomID != null) socket.broadcast.to(roomID).emit('get-player-list', roomID);
        
        socket.broadcast.emit('get-room-list');
    });

    socket.on('create-room', function(data, callback){
        var playerID = socket.id.substr(7);
        var roomID = 'room' + playerID;
        
        socket.join(roomID);

        var room = rooms.AddRoom({
            roomID: roomID,
            roomName: data.roomName,
            playerID: playerID,
            playerSocket: socket
        });

        socket.broadcast.emit('get-room-list');

        callback(room.ListData());
    });

    socket.on('join-room', function(data, callback){
        var room = rooms.FindRoom(data.roomID);
        
        if(room == null) return;

        socket.join(data.roomID);

        room.AddPlayer(socket.id.substr(7), socket);

        socket.broadcast.emit('get-room-list');
        socket.broadcast.to(data.roomID).emit('get-player-list', data.roomID);

        callback(room.ListData());
    });

    socket.on('leave-room', function(data, callback){
        rooms.RemovePlayerFromRoom({
            roomID: data.roomID,
            playerID: socket.id.substr(7)
        });

        rooms.CleanRooms();

        socket.broadcast.emit('get-room-list');
        socket.broadcast.to(data.roomID).emit('get-player-list', data.roomID);

        socket.leave(data.roomID);

        callback();
    });

    socket.on('update-player', function(data){
        data = JSON.parse(data.updateData);

        var room = rooms.FindRoom(data.roomID);

        if(room == null) return;

        room.UpdatePlayer(data.player);

        socket.broadcast.to(data.roomID).emit('get-player-list', data.roomID);

        if(rooms.IsRoomReadyToStart(data.roomID)){
            socket.broadcast.to(data.roomID).emit('room-is-ready');
            socket.emit('room-is-ready');
        }
    });

    socket.on('start-game', function(data, callback){
        var room = rooms.FindRoom(data.roomID);

        if(room == null) return;

        if(room.StartGame() == true){
            io.sockets.in(data.roomID).emit('start-game');
        }

        callback();
    });

    socket.on('get-room-list', function(callback){
        var _rooms = [];

        callback({ rooms: rooms.GetOpenRooms() });
    });

    socket.on('get-player-list', function(data, callback){
        var room = rooms.FindRoom(data.roomID);

        if(room == null) return;

        callback({ players: room.PlayerListData() });
    });

});