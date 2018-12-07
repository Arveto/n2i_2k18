<template>
<div id="root">
    <Header v-bind:loggedIn="loggedIn" v-bind:userData="userData" @switchView="switchView" @logOff="logOff" />
    <Signup v-show="view == 'Signup'" v-bind:socket="socket" @signUp="signUp" />
    <Login v-show="view == 'Login'" v-bind:socket="socket" @signIn="signIn" />
    <Account v-show="view == 'Account'" v-bind:socket="socket" v-bind:userData="userData" />
    <Articles v-show="view == 'Articles'" v-bind:socket="socket" v-bind:articles="articles" @switchView="switchView" />
    <Writer v-show="view == 'Writer'" v-bind:socket="socket" v-bind:userData="userData" />
    <Reader v-show="view == 'Reader'" v-bind:article="article" />
    <!-- <Messenger v-show="view == 'Messenger'"/> -->
    <Messenger v-bind:socket="socket" />

    <CanvasError message="Page introuvable, quelle indignité" />
</div>
</template>



<script>
import io from 'socket.io-client'
let socket = io.connect('localhost:3000');

import Header from '@/components/Header'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import Account from '@/components/Account'
import Articles from '@/components/articles/List'
import Writer from '@/components/articles/Writer'
import Reader from '@/components/articles/Reader'
import Messenger from '@/components/messenger/Messenger'
import CanvasError from '@/components/CanvasError'


var data = {
    view: 'Home',
    socket: socket,
    loggedIn: false,
    userData: {
        fiName: '',
        faName: '',
        pseudo: '',
        email: '',
        admin: 0
    },
    articles: [],
    article: {}
};


export default {
    components: {
        Header,
        Login,
        Signup,
        Account,
        Articles,
        Writer,
        Reader,
        Messenger,
        CanvasError
    },

    data() {
        return data;

    },

    mounted() {
        //Update main user data on account edit
        socket.on('faNameEditSuccess', (data) => {
            this.userData.faName = data.faName;
        });
        socket.on('fiNameEditSuccess', (data) => {
            this.userData.fiName = data.fiName;
        });
        socket.on('pseudoEditSuccess', (data) => {
            this.userData.pseudo = data.pseudo;
        });
        socket.on('emailEditSuccess', (data) => {
            this.userData.email = data.email;
        });
        socket.on('passwordEditSuccess', () => {
            console.log("Password updated !");
        });


        //Request articles
        socket.emit('articlesRequest');

        socket.on('articlesRequest', (data) => {
            this.articles = data;
        });

        socket.on('viewArticle', (data) => {
            for (let i = 0; i < this.articles.length; i++) {
                if (this.articles[i].id == data.id) {
                    this.article = this.articles[i];
                    this.article.content = data.content;
                    console.log("Article found, updating");
                    break;
                }
            }
        });

        /*******************************************/

        var canvas = document.createElement('canvas');
        canvas.id = "myCanvas";
        canvas.width = window.innerWidth -100;
        canvas.height = window.innerHeight - 200;
        canvas.style.zIndex = 8;
        canvas.style.position = 'absolute';
        canvas.style.top = "10vh";

        var body = document.getElementsByTagName("body")[0];
        body.appendChild(canvas);

        var ctx = canvas.getContext("2d");
        var ballRadius = 10;
        var x = canvas.width / 2;
        var y = canvas.height - 30;
        var dx = 2;
        var dy = -2;
        var paddleHeight = 10;
        var paddleWidth = 75;
        var paddleX = (canvas.width - paddleWidth) / 2;
        var rightPressed = false;
        var leftPressed = false;
        var brickRowCount = 5;
        var brickColumnCount = 3;
        var brickWidth = 75;
        var brickHeight = 20;
        var brickPadding = 10;
        var brickOffsetTop = 30;
        var brickOffsetLeft = canvas.width /2 - brickRowCount * 20;
        var score = 0;
        var lives = 3;
        var bricks = [];
        for (var c = 0; c < brickColumnCount; c++) {
            bricks[c] = [];
            for (var r = 0; r < brickRowCount; r++) {
                bricks[c][r] = {
                    x: 0,
                    y: 0,
                    status: 1
                };
            }
        }
        document.addEventListener("keydown", keyDownHandler, false);
        document.addEventListener("keyup", keyUpHandler, false);
        document.addEventListener("mousemove", mouseMoveHandler, false);

        function keyDownHandler(e) {
            if (e.keyCode == 39) {
                rightPressed = true;
            } else if (e.keyCode == 37) {
                leftPressed = true;
            }
        }

        function keyUpHandler(e) {
            if (e.keyCode == 39) {
                rightPressed = false;
            } else if (e.keyCode == 37) {
                leftPressed = false;
            }
        }

        function mouseMoveHandler(e) {
            var relativeX = e.clientX - canvas.offsetLeft;
            if (relativeX > 0 && relativeX < canvas.width) {
                paddleX = relativeX - paddleWidth / 2;
            }
        }

        function collisionDetection() {
            for (var c = 0; c < brickColumnCount; c++) {
                for (var r = 0; r < brickRowCount; r++) {
                    var b = bricks[c][r];
                    if (b.status == 1) {
                        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                            dy = -dy;
                            b.status = 0;
                            score++;
                            if (score == brickRowCount * brickColumnCount) {
                                alert("YOU WIN, CONGRATS!");
                            }
                        }
                    }
                }
            }
        }

        function drawBall() {
            ctx.beginPath();
            ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }

        function drawPaddle() {
            ctx.beginPath();
            ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }

        function drawBricks() {
            for (var c = 0; c < brickColumnCount; c++) {
                for (var r = 0; r < brickRowCount; r++) {
                    if (bricks[c][r].status == 1) {
                        var brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
                        var brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
                        bricks[c][r].x = brickX;
                        bricks[c][r].y = brickY;
                        ctx.beginPath();
                        ctx.rect(brickX, brickY, brickWidth, brickHeight);
                        ctx.fillStyle = "#0095DD";
                        ctx.fill();
                        ctx.closePath();
                    }
                }
            }
        }

        function drawScore() {
            ctx.font = "16px Arial";
            ctx.fillStyle = "#0095DD";
            ctx.fillText("Score: " + score, 8, 20);
        }

        function drawLives() {
            ctx.font = "16px Arial";
            // ctx.fillStyle = "#0095DD";
            ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBricks();
            drawBall();
            drawPaddle();
            drawScore();
            drawLives();
            collisionDetection();
            if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
                dx = -dx;
            }
            if (y + dy < ballRadius) {
                dy = -dy;
            } else if (y + dy > canvas.height - ballRadius) {
                if (x > paddleX && x < paddleX + paddleWidth) {
                    dy = -dy;
                } else {
                    lives--;
                    if (!lives) {
                        alert("GAME OVER");
                    } else {
                        x = canvas.width / 2;
                        y = canvas.height - 30;
                        dx = 3;
                        dy = -3;
                        paddleX = (canvas.width - paddleWidth) / 2;
                    }
                }
            }
            if (rightPressed && paddleX < canvas.width - paddleWidth) {
                paddleX += 7;
            } else if (leftPressed && paddleX > 0) {
                paddleX -= 7;
            }
            x += dx;
            y += dy;
            requestAnimationFrame(draw);
        }
        draw();
    },

    methods: {
        //Methods triggered on components events
        switchView: function(component) {
            this.view = component;
        },

        signIn: function(userData) {
            this.loggedIn = true;
            this.userData = userData;
            this.view = 'Home';
            console.log(this.userData.admin);

            console.log(this.userData);
        },

        signUp: function(userData) {
            this.loggedIn = true;
            this.userData = userData;
            this.view = 'Home';

            console.log(this.userData);
        },

        logOff: function() {
            this.loggedIn = false;

            this.userData = {
                fiName: '',
                faName: '',
                pseudo: '',
                email: ''
            };

            this.view = 'Home';
        }
    }
}
</script>



<style scoped>
.container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
        'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
}

.subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
}

.links {
    padding-top: 15px;
}

#myCanvas {
    /* margin-top: -100vh; */
    position: absolute;
    top: 0;
    left: 0;
}
</style>
