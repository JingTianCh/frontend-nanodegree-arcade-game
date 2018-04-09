// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x=x;
    this.y=y;
    this.speed=speed||(Math.random()*100+150);
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += dt * this.speed;
    if(this.x>=450){
    this.x=0;
    this.y=55+83*Math.floor(Math.random()*3);}
    this.checkCollision(player);
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player=function(x,y){
    this.x=x;
    this.y=y;
    var roleImages = [
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png'];
    var index = Math.floor(Math.random() * roleImages.length);
    this.sprite = roleImages[index];
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update=function(dt){

};

Player.prototype.handleInput=function(movement){
    switch (movement) {
        case 'left':
            if ((this.x >= 101) && (this.x <= 404)) {
                this.x -= 101;
            }
            break;
        case 'right':
            if ((this.x >= 0) && (this.x <= 403)) {
                this.x += 101;
            }
            break;
        case 'up':
            if (this.y >= 55) {
                this.y -= 83;
            }
            if (this.y === -28) {
                dateEnd = Date.now();
                alert("You won within " + (dateEnd - dateStart) / 1000 + "s!");
                var con = confirm("Play Again?");
                dateStart = Date.now();

                this.reset();
            }
            break;
        case 'down':
            if (this.y <= 386) {
                this.y += 83;
            }
            break;
    }
    
};

Player.prototype.reset=function(){
    this.x=2*101;
    this.y=83*4+55;
};

Enemy.prototype.checkCollision=function(player){
    if((this.y===player.y)&&(Math.abs(this.x-player.x)<=30)){
        player.reset();
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies =[];
for(var i=0;i<5;i++){
    var random=Math.floor(Math.random()*3);
    var newEnemy= new Enemy(0,55+83*(random));
    allEnemies.push(newEnemy);
}
var player = new Player(101*2,83*4+55);
var dateStart= new Date();
var dateEnd=new Date();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
