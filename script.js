c = document.getElementById("canvas");
ctx = c.getContext("2d");

// STORAGE GET
let previousscore = window.localStorage.getItem('Highscore');
let convertedscore = JSON.parse(previousscore);
document.querySelector('#first').innerHTML = convertedscore;
// JUMP

document.addEventListener('keydown', function(e) {
    e.preventDefault();
    if (e.key == " " && died == false) {
            bird.y = bird.y - 70;
            velocity = 2;
    }
});

document.addEventListener('click', function() {
    if (died == false) {
        bird.y = bird.y - 70;
        velocity = 2;
    }
});

document.querySelector('button').addEventListener('click', function() {
    document.querySelector('#first').innerHTML = 0;
    window.localStorage.clear();
        window.localStorage.setItem('Highscore', JSON.stringify(document.querySelector('#first').innerHTML));
});

// VARIABLES
let randomheight = Math.floor(Math.random() * (170 - 10)) + 10;

let pipes = [
    [c.width - 170, 0, 30, randomheight]
];
let pipesdown = [
    [c.width - 170, pipes[0][3] + 120, 30, c.height - pipes[0][1]]
];

let velocity = 2;

let score = 0;

let died = false;

let bird = {
    x : 40,
    y : 150,
    width : 25,
    height : 25,
}




// GAME LOOP

setInterval(animation, 1000/30);

function animation() {
    if (died == false) {
        clear();
        drawbird(bird.x, bird.y, bird.width, bird.height);
        gravity();
        birdfall();
        checkifdied();
        drawpipe();
        deletepipe();
        drawscore();
    } else {
        deathscreen();
    }

}

setInterval(addpipe, 2000);

function addpipe() {
    if (died == false) {
        pipes.push([c.width, 0, 30,  Math.floor(Math.random() * (170 - 10)) + 10]);
        for (i = pipes.length - 1; i < pipes.length; i++) {
            pipesdown.push(
            [c.width, pipes[i][3] + 120, 30, c.height - pipes[i][1]]
        );
        }
    }   
}

function deletepipe() {
for (i = 0; i < pipes.length; i++) {
    if (pipes[i][0] < -28) {
        pipes.shift();
        pipesdown.shift();
        score++;
    }
}
}






// FUNCTIONS

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawbird(x, y, w, h) {
    ctx.fillStyle = "black";
    ctx.fillRect(x, y, w, h);
}

function birdfall() {
    bird.y = bird.y + velocity;
}

function checkifdied() {
    if (bird.y > canvas.height - 25) {
        pipes = [
            [c.width - 170, 0, 30, randomheight]
        ];
        pipesdown = [
            [c.width - 170, pipes[0][3] + 120, 30, c.height - pipes[0][1]]
        ];
        
        
        bird = {
            x : 40,
            y : 150,
            width : 25,
            height : 25,
        }

        velocity = 2;
        died = true;
    }
    if (bird.y <= 0) {
        bird.y = 1;
    }
    for (i = 0; i < pipes.length; i++) {
        if (bird.x + 25 >= pipes[i][0] && bird.y < pipes[i][3]) {
            if (bird.x > pipes[i][0] + 25) {
                return;
            } else {
            pipes = [
                [c.width - 170, 0, 30, randomheight]
            ];
            pipesdown = [
                [c.width - 170, pipes[0][3] + 120, 30, c.height - pipes[0][1]]
            ];
            
            
            bird = {
                x : 40,
                y : 150,
                width : 25,
                height : 25,
            }
            velocity = 2;
            died = true;
        }        
        }
        if (bird.x + 25 > pipesdown[i][0] && bird.y + 25 > pipes[i][3] + 120) {
            if (bird.x > pipesdown[i][0] + 25) {
                return;
            } else {
            pipes = [
                [c.width - 170, 0, 30, randomheight]
            ];
            pipesdown = [
                [c.width - 170, pipes[0][3] + 120, 30, c.height - pipes[0][1]]
            ];
            
            
            bird = {
                x : 40,
                y : 150,
                width : 25,
                height : 25,
            }       
            velocity = 2;
            died = true;
        }
        }
    }
}

function drawpipe() {
    for (i = 0; i < pipes.length; i++) {
        drawpipeup(pipes[i][0], pipes[i][1], pipes[i][2], pipes[i][3]);
        drawpipedown(pipesdown[i][0], pipesdown[i][1], pipesdown[i][2], pipesdown[i][3]);
        pipes[i][0] = pipes[i][0] - 4;
        pipesdown[i][0] = pipesdown[i][0] - 4;
    }
}

function drawpipeup(x, y, w, h) {
    ctx.fillStyle = "green";
    ctx.fillRect(x, y, w, h);
}

function drawpipedown(x, y, w, h) {
    ctx.fillStyle = "green";
    ctx.fillRect(x, y, w, h);
}

function gravity() {
    if (velocity == 7) {
        return;
    } else {
    velocity = velocity * 1.09;
    }
}

function drawscore() {
    ctx.fillStyle = "black";
    ctx.font = "15px Arial";
    ctx.fillText(score, 20, 25);
}

function deathscreen() {
        if (score > document.querySelector('#first').innerHTML) {
            document.querySelector('#first').innerHTML = score;
        }
        window.localStorage.clear();
        window.localStorage.setItem('Highscore', JSON.stringify(document.querySelector('#first').innerHTML));
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = "white";
    ctx.font = "20px Arial"
    ctx.fillText("You Died Idiot, press Space to replay.", 50, 100);
    ctx.fillText("Your Score :" + " " + score, 150, 200);
    document.addEventListener('keydown', function(e) {
        e.preventDefault();
        if (e.key == " " && died == true) {
            died = false;
            score = 0;
        }
    });
    document.addEventListener('click', function() {
        if (died == true) {
            died = false;
            score = 0;
        }
    });
}

document.querySelector('#first').innerHTML = currentscore;
