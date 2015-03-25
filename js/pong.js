;(function(){

//Main game function
    //tells objects in bodies array to update.
    //stores gameSize pulled from canvasId
    var Game = function(canvasId){
        var canvas = document.getElementById(canvasId);
        var screen = canvas.getContext('2d');
        var gameSize = {x: canvas.width, y: canvas.height};
        var self = this;
//bodies array
        this.bodies = [new Player1(this, gameSize), new Player2(this, gameSize),new Ball(self, gameSize)];
//update function
        var tick = function(){
        self.update();
        self.draw(screen,gameSize);
        requestAnimationFrame(tick);
        };
        tick();
    };
//constructor for game() function. tells bodies to update, and draw
    Game.prototype = {
        update: function(){
            new collision(this.bodies[2],this.bodies[0]);
            new collision(this.bodies[2],this.bodies[1]);
            for(var i =0 ; i < this.bodies.length; i++){
                this.bodies[i].update();
            }
        },
        draw:function(screen,gameSize){
            screen.clearRect(0,0,gameSize.x,gameSize.y);
            for(var i =0 ; i < this.bodies.length; i++){
                drawRect(screen, this.bodies[i]);
            }
        }
    };
//P1 object, declares size and start position of P1
    var Player1= function(game, gameSize){
        this.size = {x:30,y:gameSize.y / 3};
        this.game = game;
        this.gameSize = gameSize;
        this.center = {x: 0, y:gameSize.y/2};
        this.keyboarder = new Keyboarder();
    };
//constructor for P1, updates position based on keyboard input
    Player1.prototype = {
        update:function(){
            if (this.keyboarder.isDown(this.keyboarder.KEYS.S) && this.center.y < (5*this.gameSize.y / 6)){
               this.center.y += 4;
            }else if(this.keyboarder.isDown(this.keyboarder.KEYS.W) && this.center.y > this.size.y /2 ){
                this.center.y -= 4;
            }
        }
    };
//P2, same as P1 aside from position
    var Player2= function(game, gameSize){
        this.size = {x:30,y:gameSize.y / 3};
        this.game = game;
        this.gameSize = gameSize;
        this.center = {x: gameSize.x, y:gameSize.y/2};
        this.keyboarder = new Keyboarder();
    };
//constructor for P2, same as P1
    Player2.prototype = {
        update:function(){
            if (this.keyboarder.isDown(this.keyboarder.KEYS.DOWN) && this.center.y < (5*this.gameSize.y / 6)){
                this.center.y += 4;
            }else if(this.keyboarder.isDown(this.keyboarder.KEYS.UP) && this.center.y > this.size.y /2 ){
                this.center.y -= 4;
            }
        }
    };
//Ball function, gives ball random velocity, tells it to start at the center.
    var Ball = function(game , gameSize){
        var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
        var rand = Math.random();
        this.velocity = {x: plusOrMinus * (3 + Math.random()) * rand , y: plusOrMinus * (1 + Math.random()) * rand };
        this.size = {x : 15, y : 15 };
        this.center = {x: gameSize.x /2 , y: gameSize.y /2};
        this.gameSize = gameSize;
        this.game = game;
        this.end = false;
    };
//Ball constructor, tells ball to bounce and add velocity.
    Ball.prototype = {
        update: function () {
           for(var i = 0; i<1;i++){
               if(this.center.x < 0 || this.center.x > this.gameSize.x) {
                   if(this.end){
                    break;
                   };
                   this.end = true;
                   alert("Game over");
                   this.velocity.x = 0;
                   this.velocity.y =0;
               }
           };
        this.center.x += this.velocity.x;
        if(this.center.y < 0 || this.center.y > this.gameSize.y) {
            this.velocity.y = -this.velocity.y + (-this.velocity.y * 0.1);
        };
        this.center.y += this.velocity.y;
        }
    };

//Draw function, draws object
    var drawRect = function(screen, body){
        screen.fillRect(body.center.x - body.size.x /2,
                body.center.y - body.size.y /2, body.size.x,body.size.y);
    };
//Keyboard input function
    //reads if keys are being pressed and takes the event code
    //isDown() returns boolean of key down = true, key up = false
    var Keyboarder = function(
        ){
        var keyState = {};

        window.addEventListener('keydown' , function(e){
            keyState[e.keyCode] = true;
        });
        window.addEventListener('keyup' , function(e){
            keyState[e.keyCode] = false;
        });
        this.KEYS = {DOWN: 40, UP:38,W:87 , S: 83};

        this.isDown = function(keyCode){
            return keyState[keyCode] === true;
        };

    };

    var collision = function (ball, paddle) {
       if(
           ball === paddle ||
               ((ball.center.y +  (ball.size.y / 2)) < (paddle.center.y - (paddle.size.y / 2))) || //ball is under paddle
               ((ball.center.y -  (ball.size.y / 2)) > (paddle.center.y + (paddle.size.y / 2))) || //ball is over paddle
               ((ball.center.x +  (ball.size.x / 2)) < (paddle.center.x - (paddle.size.x / 2))) || //ball is left from the paddle
               ((ball.center.x -  (ball.size.x / 2)) > (paddle.center.x + (paddle.size.x / 2))) //ball is right from the paddle
           ){

            }else{
             ball.velocity.x =  -ball.velocity.x - (ball.velocity.x * 0.1);
            };

    };

//calls game() function when button is pressed
    var start = document.getElementById('start');
    start.addEventListener('click' , function(e){
       new Game('screen');
    });
})();