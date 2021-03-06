function initCanvas(){
    var ctx = document.getElementById('my_canvas').getContext('2d');
    var backgorundImage = new Image();
    var naveImage = new Image();
    var enemiespic1 = new Image();
    var enemiespic2 = new Image();

    backgorundImage.src = "imagenes/background-pic.jpg";
    naveImage.src = "imagenes/spaceship-pic.png";

    enemiespic1.src = "imagenes/enemigo1.png";
    enemiespic2.src = "imagenes/enemigo2.png";

    var canvasWidth = ctx.canvas.width;
    var canvasHeight = ctx.canvas.height;

    var enemyTemplate = function(options){
        return{
            id: options.id || '',
            x: options.x || '',
            y: options.y || '',
            w: options.w || '',
            h: options.h || '',
            image: options.image || enemiespic1,
        }
    }

    var enemies = [
        new enemyTemplate({id : "enemy1", x: 100, y:-20, w:80, h:30}),
        new enemyTemplate({id : "enemy2", x: 225, y:-20, w:50, h:30}),
        new enemyTemplate({id : "enemy3", x: 350, y:-20, w:50, h:30}),
        new enemyTemplate({id : "enemy4", x: 100, y:-70, w:80, h:30}),
        new enemyTemplate({id : "enemy5", x: 225, y:-70, w:80, h:30}),
        new enemyTemplate({id : "enemy6", x: 350, y:-70, w:50, h:30}),
        new enemyTemplate({id : "enemy7", x: 475, y:-20, w:50, h:30})
    ];

    var renderEnemies = function(enemyList){
        for(var i = 0; i < enemyList.length; i++){
            var enemy = enemyList[i];
            ctx.drawImage(enemy.image, enemy.x, enemy.y += .5, enemy.w, enemy.h);
            launcher.hitDetectLowerLevel(enemy);
        }
    }

    function Launcher(){
        this.y = 500,
        this.x = canvasWidth * 0.5 - 25,
        this.w = 100,
        this.h = 100,
        this.direction,
        this.bg = "white",
        this.misiles = [];

        this.gameStatus = {
            over: false,
            message: "",
            fillStyle: 'red',
            font: 'italic bold 36px Arial, sans-serif',
        }

        this.render = function(){

            if (this.direction == 'left'){
                this.x -= 5;
            }

            else if (this.direction == 'right'){
                this.x += 5;
            }

            else if (this.direction == 'upArrow'){
                this.y -= 5;
            }

            else if (this.direction == 'downArrow'){
                this.y += 5;
            }


            ctx.fillStyle = this.bg;
            ctx.drawImage(backgorundImage, 10, 10);
            ctx.drawImage(naveImage, this.x, this.y, 100, 90);
        
            for(var i = 0; i <this.misiles.length; i++){
                var m = this.misiles[i];
                ctx.fillRect(m.x, m.y -= 5, m.w, m.h);
                this.hitDetect(m , i);

                if (m.y <= 0){
                    this.misiles.splice(i, 1);
                }
            }

            if(enemies.length == 0){
                clearInterval(animateInterval);
                ctx.fillStyle = 'yellow';
                ctx.font = this.gameStatus.font;
                ctx.fillText('has vencido', canvasWidth * 0.5 - 80, 50);
            }
        }

        this.hitDetect = function(m, mi){
            for ( var i = 0; i < enemies.length; i++){
                var e = enemies[i];

                if(m.x <= e.x + e.w && m.x + m.w >= e.x &&
                    m.y >= e.y && m.y <= e.y + e.h){
                    enemies.splice(i, 1);
                    document.querySelector('.barra').innerHTML = "Increible ";
                }
            }
        }

        this.hitDetectLowerLevel = function(enemy){
            if(enemy.y > 550){
                this.gameStatus.over = true;
                this.gameStatus.message = 'Has Perdido';
            }

            if((enemy.y < this.y + 25 && enemy.y > this.y - 25)&&
            (enemy.x < this.x + 45 && enemy.x > this.x -45)){
                this.gameStatus.over = true;
                this.gameStatus.message = 'Estas muerto!'
            }

            if(this.gameStatus.over == true){
                clearInterval(animateInterval);
                ctx.fillStyle = this.gameStatus.fillStyle;
                ctx.font = this.gameStatus.font;

                ctx.fillText(this.gameStatus.message, canvasWidth * 0.5 - 80, 50);
            }
        }
    }

    var launcher = new Launcher();

    function animate(){
        ctx.clearRect(0,0,canvasWidth,canvasHeight);
        launcher.render();
        renderEnemies(enemies);
    }

    var animateInterval = setInterval(animate, 6);

    document.addEventListener('keydown', function(event){
        if(event.code == 'Numpad4'){
            launcher.direction = 'left';
            if(launcher.x < canvasWidth  *0.2 - 130){
                launcher.x += 0;
                launcher.direction = '';
            }
        }
    });

    document.addEventListener('keyup', function(event){
        if (event.code == 'Numpad4'){
            launcher.x += 0;
            launcher.direction = '';
        }
    });

    document.addEventListener('keydown', function(event){
        if(event.code == 'Numpad6'){
            launcher.direction = 'right';
            if(launcher.x > canvasWidth - 110){
                launcher.x -= 0;
                launcher.direction = '';
            }
        }
    });

    document.addEventListener('keyup', function(event){
        if (event.code == 'Numpad6'){
            launcher.x -= 0;
            launcher.direction = '';
        }
    });

    document.addEventListener('keydown', function(event){
        if(event.code == 'Numpad8'){
            launcher.direction = 'upArrow';
            if(launcher.y < canvasHeight * 0.2 - 80){
                launcher.y += 0;
                launcher.direction = '';
            }
        }
    });

    document.addEventListener('keyup', function(event){
        if (event.code == 'Numpad8'){
            launcher.y -= 0;
            launcher.direction = '';
        }
    });

    document.addEventListener('keydown', function(event){
        if(event.code == 'Numpad5'){
            launcher.direction = 'downArrow';
            if(launcher.y > canvasHeight - 110){
                launcher.y -= 0;
                launcher.direction = '';
            }
        }
    });

    document.addEventListener('keyup', function(event){
        if (event.code == 'Numpad5'){
            launcher.y -= 0;
            launcher.direction = '';
        }
    });

    document.addEventListener('keydown', function(event){
        if(event.code == 'KeyP'){
            this.location.reload();
        }
    });

    document.addEventListener('keydown', function(event){
        if(event.code == 'Space'){
            launcher.misiles.push({
                x: launcher.x + launcher.w * 0.5,
                y: launcher.y,
                w: 3,
                h: 10,
            });
        }
    });
    
}



window.addEventListener('load', function(event){
    initCanvas();
});