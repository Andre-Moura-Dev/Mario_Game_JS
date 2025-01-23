// Elements Game
const gameContainer = document.getElementById('game-container');
const mario = document.getElementById('mario');
const groundHeight = 50;

let isJumping = false;
let isMovingRight = false;
let isMovingLeft = false;
let velocityY = 0;
const gravity = 1;
let marioX = 50;
let marioY = gameContainer.clientHeight - groundHeight - mario.offsetHeight;

// Função para criar blocos Dinamicamente
function criarBloco(x, y) {
    const bloco = document.createElement('div');
    bloco.classList.add('bloco');
    bloco.style.left = `${x}px`;
    bloco.style.bottom = `${y}px`;
    gameContainer.appendChild(bloco);
}

// Função para criar inimigos dinamicamente
function criarInimigo(x, y) {
    const inimigo = document.createElement('div');
    inimigo.classList.add('inimigo');
    inimigo.style.left = `${x}px`;
    inimigo.style.right = `${y}px`;
    gameContainer.appendChild(inimigo);
}

criarBloco(200, 100);
criarBloco(300, 100);
criarInimigo(400, 50);
criarInimigo(600, 50);

// Controle de movimento do mario
document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowRight') isMovingRight = true;
    if (e.code === 'ArrowLeft') isMovingLeft = true;
    if (e.code === 'Space' && !isJumping) {
        isJumping = true;
        velocityY = 20;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.code === 'ArrowRight') isMovingRight = false;
    if (e.code === 'ArrowLeft') isMovingLeft = false;

});

// Detecção de colisão
function detectarColisao(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();

    return (
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top
    );
}

// Atualizar a posição do Mario e verificar colisões
function atualizar() {
    //Gravidade e pulo
    if (isJumping) {
        marioY += velocityY;
        velocityY -= gravity;
        if (marioY <= gameContainer.clientHeight - groundHeight - mario.offsetHeight) {
            marioY = gameContainer.clientHeight - groundHeight - mario.offsetHeight;
            isJumping = false;
        }
    }

    // Movimento Horizontal
    if (isMovingRight) marioX += 5;
    if (isMovingLeft) marioY -= 5;

    // Atualizar a posição do Mario
    mario.style.left = `${marioX}px`;
    mario.style.bottom = `${marioY}px`;

    // Colisões com blocos e inimigos
    document.querySelectorAll('.bloco').forEach((bloco) => {
        if (detectarColisao(mario, bloco)) {
            alert("Colisão com o bloco!");
        }
    });

    document.querySelectorAll('.inimigo').forEach((inimigo) => {
        if (detectarColisao(mario, inimigo)) {
            alert("Colisão com o inimigo!");
        }
    });

    requestAnimationFrame(atualizar);
}

// Iniciar o Looping do jogo
atualizar();