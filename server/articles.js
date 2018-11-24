    //Listeners to manage articles
function listen(socket, database){

    socket.on('uploadArticle', (data) => {
        let query = 'SELECT id, admin FROM users WHERE email = ?;';

        database.query(query, [data.userData.email])
        .then(rows => {

            if(rows[0].admin){
                query = 'INSERT INTO rooms (author, title, content) VALUES(?, ?, ?);';
                database.query(query, [rows[0].id, data.title, data.content])
                .then(rows => {});
            }

        });

    });


    socket.on('articlesRequest', (data) => {
        let query = 'SELECT fiName, faName, pseudo, articles.id, title, date\
        FROM `articles`,`users` WHERE `users`.`id` = `articles`.`author`';

        database.query(query)
        .then(rows => {
            socket.emit('articlesRequest', rows);
        });

    });


    socket.on('viewArticle', (data) => {
        let query = 'SELECT content FROM articles where id = ?;';

        database.query(query, [data.id])
        .then(rows => {
            socket.emit('viewArticle', rows);
        });

    });

}

//Export func

module.exports = {listen};
