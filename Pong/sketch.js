class Bola {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.xSpeed = Math.random() * 10 - 5;
        this.ySpeed = Math.random() * 10 - 5;
    }

    move() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if (this.x > width - this.r || this.x < this.r) {
            this.x = width / 2;
            this.y = height / 2;
            this.xSpeed *= -1;
        }

        if (this.y > height - this.r || this.y < this.r) {
            this.ySpeed *= -1;
        }
    }

    show() {
        fill(255);
        ellipse(this.x, this.y, this.r, this.r);
    }
}



// posicao da bola
let x = 200;
let y = 200;

// raio da bola
const ballRadius = 50;

// velocidade da bola aleatorias
let xSpeed = Math.random() * 10 -5;
let ySpeed = Math.random() * 10 -5;

let bola;

//Funcao setup do p5js
function setup() {
    // Cria o canvas com largura e altura de 400 pixels
    createCanvas(800, 400);
    bola = new Bola(x, y, ballRadius);
}

//Funcao draw do p5js
function draw() {
    // Limpa o canvas com a cor de fundo
    background(0);

    bola.move();
    bola.show();
}