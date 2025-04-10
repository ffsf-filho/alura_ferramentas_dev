let bolaImagem;
let jogadorImagem;
let computadorImagem;
let fundoImagem;

class Raquete{
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    show() {
        //desenha a raquete com a imagem da raquete
        if (this.x == 30) {         
            image(jogadorImagem, this.x, this.y, this.w, this.h);
        }
        else {
            image(computadorImagem, this.x, this.y, this.w, this.h);
        }
        //fill(255);
        //rect(this.x, this.y, this.w, this.h);
    }

    move() {
        //se a raquete for controlada pelo mouse, a posicao da raquete sera igual a posicao do mouse
        if (this.x == 30) {
            this.y = mouseY;
        }
        else{
            //se a bola esta na parte superior do canvas, a raquete ira se mover para cima
            if (this.y < bola.y) {
                this.y += 5;
            } else  {
                //se a bola esta na parte inferior do canvas, a raquete ira se mover para baixo
                this.y -= 5;
            }
        }

        //limitar a raquete ao tamanho do canvas
        if (this.y < 0) {
            this.y = 0;
        }

        if (this.y > height - this.h) {
            this.y = height - this.h;
        }
   }
}

class Bola {
    constructor() {
        this.r = 25;
        this.reset();
    }

    reset() {
        this.x = width / 2;
        this.y = height / 2;
        this.xSpeed = Math.random() * 5 - 2.5;
        this.ySpeed = Math.random() * 5 - 2.5;
        //angulo de rotacao atual da bola
        this.angle = 0;
    }

    move() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        
        //rotaciona de acordo com a velocidade x e y
        this.angle += Math.sqrt(this.xSpeed * this.xSpeed + this.ySpeed * this.ySpeed) / 30;

        if (this.x > width - this.r || this.x < this.r) {
            this.reset();
        }

        if (this.y > height - this.r || this.y < this.r) {
            this.ySpeed *= -1;
        }

        //colisão com a raquete
        if (this.x < jogador.x + jogador.w && this.x > jogador.x && this.y > jogador.y && this.y < jogador.y + jogador.h) {
            this.xSpeed *= -1;
            this.xSpeed *= 1.1;
            this.ySpeed *= 1.1;
            this.x = jogador.x + jogador.w + this.r / 2;
        }

        // colisão com a raquete do computador
        //use a funcao colideCirculoRetangulo para verificar a colisao entre a bola e a raquete do computador
        //onde circulo é raio e cx,cy
        //e retângulo e x, y, w, h  
        if (colideCirculoRetangulo(this.x, this.y, this.r / 2, computador.x, computador.y, computador.w, computador.h)) {
            this.xSpeed *= -1;
            this.xSpeed *= 1.1;
            this.ySpeed *= 1.1;             
            this.x = computador.x - this.r / 2;
        }
    }

    show() {
        //rotaciona antes de desenhar a bola
        push();
        translate(this.x, this.y);
        rotate(this.angle);
        //desenha a bola com a imagem da bola rotacionada
        imageMode(CENTER);
        image(bolaImagem, 0, 0, this.r, this.r);
        pop();
        
        //desenha a bola com a imagem da bola
        //image(bolaImagem, this.x - this.r/2, this.y - this.r/2, this.r, this.r);
        ///fill(255);
        //ellipse(this.x, this.y, this.r, this.r);
    }
}

// velocidade da bola aleatorias
let xSpeed = Math.random() * 10 -5;
let ySpeed = Math.random() * 10 -5;

//verifica a colisao da bola com a raquete do jogador e do computador
//onde circulo é raio e cx,cy
//e retângulo e x, y, w, h
function colideCirculoRetangulo(cx, cy, ra, rx, ry, rw, rh) {
    let testX = cx;
    let testY = cy;

    if (cx < rx) {
        testX = rx;
    } else if (cx > rx + rw) {
        testX = rx + rw;
    }

    if (cy < ry) {
        testY = ry;
    } else if (cy > ry + rh) {
        testY = ry + rh;
    }

    let distX = cx - testX;
    let distY = cy - testY;
    let distance = Math.sqrt((distX * distX) + (distY * distY));

    return distance <= ra;
}


let bola;
let jogador;
let computador;

function preload() {
    // Precarrega a imagem da bola
    bolaImagem = loadImage('bola.png');
    jogadorImagem = loadImage('barra01.png');
    computadorImagem = loadImage('barra02.png');
    fundoImagem = loadImage('fundo2.png');
}

//Funcao setup do p5js
function setup() {
    // Cria o canvas com largura e altura de 400 pixels
    createCanvas(800, 400);
    bola = new Bola();
    jogador = new Raquete(30, height / 2 - 50, 10, 60);
    computador = new Raquete(width - 40, height / 2 - 50, 10, 60);
}

//Funcao draw do p5js
function draw() {
    // Limpa o canvas com a cor de fundo
    //background(0);
    //desenha o fundo com a imagem do fundo
    image(fundoImagem, 0, 0, width, height);

    bola.move();
    bola.show();
    jogador.move();
    jogador.show();
    computador.move();
    computador.show();
}