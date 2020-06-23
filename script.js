let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
// tipo de dimensao do jogo: duas dimensoes
let box = 32;
// tamanho de pixel da tela do quadrado da cobrinha
let snake = [];
snake[0] = {
    // inicio da cobrinha no canvas(centro do qaudrado cinza)
    x: 8 * box,
    y: 8 * box
}

let direction = "rigth";
// direção inicial do jogo ao carregar a página: rigth
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
    // a comida aparece em lugares diferentes do canvas
}

function criarBG() {
    context.fillStyle = "gray";
    // cor de fundo
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = " black";
        // cor da cobrinha
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood() {
    context.fillStyle = "darkred";
    // cor da comida da cobrinha
    context.fillRect(food.x, food.y, box, box)
    // coordenadas aleatorias da comida no canvas
}

document.addEventListener('keydown', update);
// funciona na função de baixo, fazendo so comandos do teclado funcionar

function update(event) {
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";
    // comando dos toques do teclado (que sao esses numeros referenciais) e transmitir para a cobrinha se mexer, chamado update
}

function iniciarJogo() {
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;
    // permite que a cobrinha nao 'bata' na tela e volte pelo outro lado do canvas ==>
    // quando chegar no limite do canvas, ela atingiu mais que 15(tamanho canvas),faltando um quadrado para ser o limite ==>
    // assim ela 'bate' na parede e retorna pelo outro lado (contrario ao movimento dado) ==>
    // 'bateu'na parede direita, volta para o lado contrario, a esquerda e continua andando ==>
    // para a direita

    for (i = 1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            // se a posição da cabeça for igual a do corpo, vai emitir um alerta
            clearInterval(jogo);
            alert('Game Over :(');
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;
    // coordenadas das cobrinhas que acrescenta um 'quadrado' a mais tendo a ilusao de se mover

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop();
    }
    else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    // snake.pop();
    // retira o ultimo elemento do array com ilusao de andar
    // comando retirado depois de add o if acima do mesmo, senao cobrinha nao aumenta de tamanho

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 100);
    // 100 milisegundos de atualização para iniciar o jogo e velocidade da cobrinha

