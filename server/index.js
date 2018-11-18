
    //*** Modules ***

//Import
const express = require('express');
const consola = require('consola');
const { Nuxt, Builder } = require('nuxt');
const app = express();
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;

var io = require('socket.io');
const mysql = require('mysql');

//Custom modules
const databaseWrapper = require('./db_wrapper.js');
const accountsEvents = require('./accounts_events.js');
const chat = require('./chat.js');


/******************************************************************************/
    //*** Init modules ***

//*** Server port ***
app.set('port', port)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js');
config.dev = !(process.env.NODE_ENV === 'production');


//*** Database ***
var dbConfig = {
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'n2i_template'
};

var database = new databaseWrapper.Database(mysql, dbConfig);


/******************************************************************************/
    //*** Start server ***

async function start() {
        //*** Set up server ***

    // Init Nuxt.js
    const nuxt = new Nuxt(config);

    // Build only in dev mode
    if (config.dev) {
        const builder = new Builder(nuxt);
        await builder.build();
    }

    // Give nuxt middleware to express
    app.use(nuxt.render);

    // Listen the server
    let server = app.listen(port, host);
    consola.ready({
        message: `Server listening on http://${host}:${port}`,
        badge: true
    });


        //*** Socket.io events ***

    io = io.listen(server);

    io.sockets.on('connection', (socket) => {
        console.log('id: ' + socket.id + ' is connected');

        accountsEvents.listen(socket, database);
        chat.listen(socket, database);

        socket.on("message", (data)=>{
          console.log("message : " + data.content);
          socket.broadcast.emit("message", data);
          socket.emit("messageRecived", data);
        })
    });

}

start();
