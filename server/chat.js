    //Function to create events listeners
function listen(socket, database){

    socket.on('joinRoom', (data) => {
        socket.join("chat"+data.roomNumber);
        io.sockets.in("chat"+data.roomNumber).emit('joinRoom', data.userData);
    });


    socket.on('message', (data) => {
            //Send messages to other room members
        io.sockets.in("chat"+data.roomNumber).emit('message', data.message);

        let id;
        let query = 'SELECT id FROM users WHERE email = ?;';

        database.query(query, [data.userData.email])
        .then(rows => {
            id = rows[0].id;

            query = 'INSERT INTO char (author, room, content) VALUES(?, ?, ?);';
            return database.query(query; [id, data.roomNumber, data.message]);
        })
        .then(rows => {});

    });


    socket.on('leaveRoom', (data) => {
        socket.leave("chat"+data.roomNumber);
        io.sockets.in("chat"+data.roomNumber).emit('leaveRoom', data.userData);
    });

}

    //Export func
    
module.exports = {listen};
