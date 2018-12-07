    //Function to create events listeners
function listen(socket, database){

    socket.on('createRoom', (data) => {
        let query = 'SELECT id FROM users WHERE email = ?;';

        database.query(query, [data.userData.email])
        .then(rows => {

            query = 'INSERT INTO rooms (author, name) VALUES(?, ?);';
            return database.query(query, [rows[0].id, data.roomName]);
        })

        .then(rows => {});

    });


    socket.on('roomsRequest', (data) => {
        let query = 'SELECT fiName, faName, pseudo, rooms.id, name, date\
        FROM `rooms`,`users` WHERE `users`.`id` = `rooms`.`author`';

        database.query(query)
        .then(rows => {
            socket.emit('roomsRequest', rows)
        });

    });


    socket.on('joinRoom', (data) => {

        let query = 'SELECT fiName, faName, pseudo, content, date\
        FROM `messages`,`users`\
        WHERE `users`.`id` = `messages`.`author` AND `messages`.`room` = ?\
        LIMIT 50';

        database.query(query, [data.id])
        .then(rows => {

                //Notice room that new user has joined
            socket.join("chat"+data.roomNumber);
            socket.in("chat"+data.roomNumber).emit('joinRoom', data.userData);

                //Fetch messages to new user
            socket.emit('fetchMessages', rows);
        });


        socket.join("chat"+data.roomNumber);
        socket.in("chat"+data.roomNumber).emit('joinRoom', data.userData);
    });


    socket.on('message', (data) => {
            //Send messages to other room members
        socket.broadcast.emit('message', data);

        let id;
        let query = 'SELECT id FROM users WHERE email = ?;';

        database.query(query, [data.userData.email])
        .then(rows => {
            id = rows[0].id;

            query = 'INSERT INTO messages (author, room, content) VALUES(?, ?, ?);';
            return database.query(query, [id, data.roomNumber, data.message]);
        })
        .then(rows => {});

    });


    socket.on('leaveRoom', (data) => {
        socket.leave("chat"+data.roomNumber);
        socket.in("chat"+data.roomNumber).emit('leaveRoom', data.userData);
    });

}

    //Export func

module.exports = {listen};
