    //Listeners to manage articles
function listen(socket, database){

    socket.on('uploadArticle', (data) => {
        let query = 'SELECT id, admin FROM users WHERE email = ?;';

        database.query(query, [data.userData.email])
        .then(rows => {

            if(rows[0].admin){
                query = 'INSERT INTO articles (author, title, content) VALUES(?, ?, ?);';
                database.query(query, [rows[0].id, data.title, data.content])
                .then(rows => {
                    socket.emit('uploadArticle');
                });
            }

        });

    });


    socket.on('articlesRequest', () => {
        let query = 'SELECT fiName, faName, pseudo, articles.id, title, date\
        FROM `articles`,`users` WHERE `users`.`id` = `articles`.`author` LIMIT 25;';

        database.query(query)
        .then(rows => {
            socket.emit('articlesRequest', rows);
        });

    });


    socket.on('viewArticle', (data) => {
        let query = 'SELECT content, id FROM articles where id = ?;';

        database.query(query, [data.id])
        .then(rows => {
            socket.emit('viewArticle', rows[0]);
        });

    });

}

//Export func

module.exports = {listen};
