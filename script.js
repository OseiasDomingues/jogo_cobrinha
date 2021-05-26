//js snake game
/*-------------------------------------------------------*/
//Variaveis
let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
//Posição
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
//Funções
/*-------------------------------------------------------*/
//Criação do Background
function criarBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}
//Criação da Cobrinha
function criarCobrinha(){
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box,box);
    }
}
function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box , box);
}
//Evento tecla 
document.addEventListener('keydown', update);
//Teclas pressionadas definem ação
function update(event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}
//Jogo
function iniciarJogo(){

    

    //Atravessar a parede
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0  && direction == "up") snake[0].y = 16 * box;
    //Fim de jogo
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Game Over :(');
        }
    }

    //Chamar metodos e definir variaveis X,Y
    criarBG();
    criarCobrinha();
    drawFood();
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    //Definir direção e tamanho
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;
    //Pegar comida
    if(snakeX != food.x || snakeY != food.y){
        //Retirar ultima parte
        snake.pop();       
    }
    else{
        //Gera nova comida
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;        
    }    
    //Parte retirada aparece na frente
    let newHead = {
         x : snakeX,
         y : snakeY
    }
    snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 100);


