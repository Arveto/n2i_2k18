
    //Function to create events listeners
function listen(socket, database){
        //TODO Testing


        //*** Sign up/in **

    socket.on('signUp', (user) => {
        console.log('signUp request !');

        let query;

            //First, check that email is not already used
        let mailAvalaible;
        query = 'SELECT id FROM users WHERE email = ?;';
        database.query(query, [user.email])
        .then(rows => {
            mailAvalaible = !!rows.length;
            console.log("mailAvalaible = "+mailAvalaible);
        });

            //Add user to DB
        if(mailAvalaible){
            query = 'INSERT INTO users (faName, fiName, pseudo, email, password) VALUES(?, ?, ?, ?, ?);';
            database.query(query, [user.faName, user.fiName, user.pseudo, user.password])
            .then(rows => {
                console.log("User added!")
                socket.emit('signUpSuccess', { inscriptionDate: new Date.now() });
            });
        }
        else {
            socket.emit('signUpFailure');
        }

    });



    socket.on('signIn', (user) => {
        console.log('signIn request !');

        let query = 'SELECT fiName, faName, pseudo, inscriptionDate, admin \
        FROM users WHERE email = ? AND password = ?;';
        database.query(query, [user.email, user.password])
        .then(rows => {

            if(rows.length == 1){
                socket.emit('signInSuccess', rows[0]);
            }
            else {
                socket.emit('signInFailure');
            }

        });
    });


        //*** Account edits ***

    socket.on('faNameEdit', (user) => {
        console.log('faNameEdit request !');

        let query = 'UPDATE users SET faName = ? WHERE email = ?;'
        database.query(query, [user.faName, user.email])
        .then(rows => {
            socket.emit('faNameEditSuccess');
        });
    });


    socket.on('fiNameEdit', (user) => {
        console.log('fiNameEdit request !');

        let query = 'UPDATE users SET fiName = ? WHERE email = ?;'
        database.query(query, [user.fiName, user.email])
        .then(rows => {
            socket.emit('fiNameEditSuccess');
        });
    });


    socket.on('pseudoEdit', (user) => {
        console.log('pseudoEdit request !');

        let query = 'UPDATE users SET pseudo = ? WHERE email = ?;'
        database.query(query, [user.pseudo, user.email])
        .then(rows => {
            socket.emit('pseudoEditSuccess');
        });
    });


    socket.on('emailEdit', (user) => {
        console.log('emailEdit request !');

        let query;

            //First, check that email is not already used
        let mailAvalaible;
        query = 'SELECT id FROM users WHERE email = ?;';
        database.query(query, [user.email])
        .then(rows => {
            mailAvalaible = !!rows.length;
            console.log("mailAvalaible = "+mailAvalaible);
        });

        if(mailAvalaible){
            let query = 'UPDATE users SET email = ? WHERE email = ?;'
            database.query(query, [user.newEmail, user.email])
            .then(rows => {
                socket.emit('emailEditSuccess');
            });
        }
    });


    socket.on('passwordEdit', (user) => {
        console.log('passwordEdit request !');

        let query = 'UPDATE users SET password = ? WHERE email = ?;'
        database.query(query, [user.password, user.email])
        .then(rows => {
            socket.emit('passwordEditSuccess');
        });
    });
}


    //Export func
module.exports = {listen};
