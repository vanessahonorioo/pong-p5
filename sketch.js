//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 22;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadexBolinha = 6;
let velocidadeyBolinha = 6;

//variáveis da raquete
let xRaquete = 2;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//variáveis da raqueteOponente
let xRaqueteOponente = 588;
let yRaqueteOponente = 150;
let velocidadeyOponente;

let colidiu = false

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilhaSonora;

function preload() {
  trilhaSonora = loadSound("trilha.mp3")
  raquetada = loadSound("raquetada.mp3")
  ponto = loadSound("ponto.mp3")
}

function setup() {
  createCanvas(600, 400);
  trilhaSonora.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  colisaoRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  colisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  incluiPlacar();
  marcaPonto();
  bolinhaNaoFicaPresa();
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadexBolinha;
  yBolinha += velocidadeyBolinha;
}

function verificaColisaoBorda() {
  if (xBolinha + raio > width ||
    xBolinha - raio < 0) {
    velocidadexBolinha *= -1;
  }
  if (yBolinha + raio > height ||
    yBolinha - raio < 0) {
    velocidadeyBolinha *= -1
  }
}

function mostraRaquete(x, y) {
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
  yRaquete = constrain(yRaquete, 10, 310);
}

function colisaoRaquete(x, y) {
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu) {
    velocidadexBolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente() {
  if (keyIsDown(87)) {
    yRaqueteOponente -= 10;
  }
  if (keyIsDown(83)) {
    yRaqueteOponente += 10;
  }
  yRaqueteOponente = constrain(yRaqueteOponente, 10, 310);
}

function incluiPlacar() {
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect(430, 10, 40, 20);
  fill(255);
  text(pontosDoOponente, 450, 26);
}

function marcaPonto() {
  if (xBolinha > 589) {
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 11) {
    pontosDoOponente += 1;
    ponto.play();
  }
}

function bolinhaNaoFicaPresa() {
  if (xBolinha - raio < 0) {
    xBolinha = 20
  }
}