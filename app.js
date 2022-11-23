// ---------- SELECTORS ----------

const formContainer = document.querySelector('#form-container');
const form = document.querySelector('#form');
const formPlayer1Name = document.querySelector('#form__player1-name');
const formPlayer2Name = document.querySelector('#form__player2-name');
const formButton = document.querySelector('#form__button');

const gameContainer = document.querySelector('#game-container');


// ---------- EVENTS ----------


formPlayer1Name.addEventListener("input", catchName);
formPlayer2Name.addEventListener("input", catchName);
form.addEventListener('submit', initGame);


// ---------- CLASSES ----------

class InfoGame {
  constructor() {
    this.player1 = {
      name: '',
      points: 0,
      choice: '',
      color: 'text-green'
    };
    this.player2 = {
      name: '',
      points: 0,
      choice: '',
      color: 'text-orange'
    };
    this.playerInTurn = '';
    this.choices = ['rock', 'paper', 'scissors'];

  };

  saveNames(playerNumber, playerName) {
    this[playerNumber].name = playerName
  };

  saveChoice(playerNumber, choice) {
    this[playerNumber].choice = choice
  };

  addPoint(playerNumber) {
    this[playerNumber].points += 1
  }

  changePlayerInTurn() {
    switch (this.playerInTurn) {
      case this.player1.name:
        this.playerInTurn = this.player2.name
        break;
      case this.player2.name:
        this.playerInTurn = this.player1.name
        break;
      default:
        break;
    }
  }

  resetScore() {
    this.player1.points = 0;
    this.player2.points = 0
  }
};

let infoGame = new InfoGame();



// ---------- FUNCTIONS ----------


function catchName(e) {
  // Guardar el nombre de cada jugador en la instancia infoGame
  const { name, value } = e.target;
  infoGame.saveNames( name, value);

  // Habilitar el botón si los dos nombres están registrados
  const namesComplete = !!infoGame.player1.name && !!infoGame.player2.name;
  formButton.disabled = !namesComplete;
};

function initGame(e) {
  e.preventDefault();

  infoGame.playerInTurn = infoGame.player1.name; // Asignar al jugador 1 como jugador en turno
  hiddenContainer(formContainer); // Ocultar el formulario
  showContainer(gameContainer); // Mostrar el juego
  drawScore(); // Dibujar el registro de puntuación en función de la información guardada en la instancia infoGame
  drawChoicesPanel(infoGame.playerInTurn); // Dibujar las opciones de selección y la instrucción de inicio del juego en función del jugador en turno
};

function drawScore() {
  const players = [ infoGame.player1, infoGame.player2 ]
  
  // Crear el contenedor para el registro de la puntuación
  const scoreContainer = document.createElement('div');
  scoreContainer.className = 'mb-8 px-2 flex justify-between items-center text-center';

  // Dibujar la información de cada jugador y agregarla al conteneder de la puntuación
  players.map( player => {
    const playerInfo = document.createElement('div');
    
    const playerName = document.createElement('h3');
    playerName.className = `text-3xl font-bold ${player.color}`;
    playerName.textContent = player.name;
    
    const playerPoints = document.createElement('p');
    playerPoints.className = `text-lg`;
    playerPoints.textContent = `Score: ${player.points}`;
    
    playerInfo.append(playerName, playerPoints);

    scoreContainer.append(playerInfo)
  });

  gameContainer.append(scoreContainer); // Agregar el registro de puntuación al contenedor general del juego
};

function drawChoicesPanel() {
  // Crear el contenedor para las opciones de juego
  const choicePanelContainer = document.createElement('div');

  // Mensaje que indica cuál jugador está en turno
  const playerInTurnMessage = document.createElement('h3');
  playerInTurnMessage.className = 'pb-7 text-center text-3xl text-zinc-500';
  playerInTurnMessage.textContent = `${infoGame.playerInTurn}, take your pick.`;
  
  // Dibujar las tres opciones del juego: piedra, papel & tijeras
  const choices = document.createElement('div');
  choices.className = 'flex flex-wrap justify-center gap-3'

    // Vincular la función handleChoice a cada una de las opciones de juego y asignar la imagen correspondiente
    infoGame.choices.map( choice => {
      const button = document.createElement('button');
      button.addEventListener( 'click', handleChoice );
      const img = document.createElement('img');
      img.className = 'w-32'
      img.src = `./public/images/${choice}.png`;
      img.alt = choice;
      button.append(img);
      choices.append(button)
    })

  // Agregar las opciones de juego al contenedor y éste al contenedor general del juego
  choicePanelContainer.append(playerInTurnMessage, choices);
  gameContainer.append(choicePanelContainer);
};

function drawResult(player1Choice, player2Choice, winner) {
  // Crear el contenedor para el resultado de la ronda jugada
  const resultContainer = document.createElement('div');

  // Dibujar las opciones seleccionadas por cada jugador con su imagen correspondiente
  const choices = document.createElement('div');
  choices.className = 'flex justify-around';
    const player1ChoiceImg = document.createElement('img');
    player1ChoiceImg.className = 'w-32';
    player1ChoiceImg.src = `./public/images/${player1Choice}.png`;
    const player2ChoiceImg = document.createElement('img');
    player2ChoiceImg.className = 'w-32';
    player2ChoiceImg.src = `./public/images/${player2Choice}.png`;
  choices.append(player1ChoiceImg, player2ChoiceImg);

  // Dibujar el mensaje que indica el resultado de la ronda jugada
  const result = document.createElement('h2');
  result.textContent = winner === 'tie' ? "It's tie!" : `${winner} wins!`;
  result.className = 'py-5 text-center text-3xl text-zinc-500';

  // Dibujar el contenedor para los botones
  const buttons = document.createElement('div');
  buttons.className = 'flex justify-around';

    // Botón para jugar una nueva ronda asociado a la función nextRound
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next Round';
    nextButton.className = 'px-5 py-0.5 text-lg text-white bg-green/80 rounded-md duration-300 hover:bg-green/100 disabled:opacity-50';
    nextButton.addEventListener('click', nextRound);

    // Botón para reiniciar el juego asociado a la función resetGame
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset Game';
    resetButton.className = 'px-5 py-0.5 text-lg text-white bg-orange/80 rounded-md duration-300 hover:bg-orange/100 disabled:opacity-50';
    resetButton.addEventListener('click', resetGame);

    // Agregar los botones a su respectivo contenedor
    buttons.append(nextButton, resetButton);

  // Agregar las opciones seleccionadas, el mensaje y los botones al contenedor del resultado y éste al contenedor general del juego
  resultContainer.append(choices, result, buttons);
  gameContainer.append(resultContainer);
}

// Función para administrar la selección hecha por cada jugador
function handleChoice (e) {
  switch (infoGame.playerInTurn) {
    
    case infoGame.player1.name:
      infoGame.saveChoice('player1', e.target.alt); // Guardar la selección del jugador 1 en la instancia infoGame
      infoGame.changePlayerInTurn(); // Asignar al jugador 2 como jugador en turno
      cleanGameContainer(); // Limpiar el contenedor del juego
      drawScore(); // Redibujar el registro de puntuación
      drawChoicesPanel(); // Redibujar las opciones de juego con la indicación correspondiente para el jugador 2
      break;
    case infoGame.player2.name:
      infoGame.saveChoice('player2', e.target.alt); // Guardar la selección del jugador 2 en la instancia infoGame
      infoGame.changePlayerInTurn(); // Asignar al jugador 1 como jugador en turno
      getResult( infoGame.player1, infoGame.player2 ); // Calcular el resultado de la ronda
      break;
    default:
      break;
  };
};

const getResult = (player1, player2) => {
  let winner 

  switch (player1.choice + player2.choice) {
    case 'scissorspaper':
    case 'rockscissors':
    case 'paperrock':
      infoGame.addPoint('player1'); // Agregar un punto al jugador 1
      winner = player1.name; // Asignar el nombre del jugador 1 a la variable winner
      break;
    case 'paperscissors':
    case 'scissorsrock':
    case 'rockpaper':
      infoGame.addPoint('player2'); // Agregar un punto al jugador 2
      winner = player2.name; // Asignar el nombre del jugador 1 a la variable winner
      break;
    case 'paperpaper':
    case 'scissorsscissors':
    case 'rockrock':
      winner = "tie"; // Asignar tie a la variable winner
      break;
    default:
      break;
  };
  cleanGameContainer() // Limpiar el contenedor del juego
  drawScore(); // Redibujar el registro de puntuación
  drawResult(player1.choice, player2.choice, winner); // Dibujar el mensaje con el resultado de la ronda
}; 

function nextRound() {
  cleanGameContainer(); // Limpiar el contenedor del juego
  drawScore(); // Redibujar el registro de puntuación
  drawChoicesPanel(); // Redibujar las opciones de juego con la indicación correspondiente para el jugador 1
};

function resetGame() {
  cleanData(); // Resetear la información guardada en la instancia infoGame y el valor de los inputs en el formulacio inicial
  cleanGameContainer(); // Limpiar el contenedor del juego
  hiddenContainer(gameContainer); // Ocultar el contenedor del juego
  showContainer(formContainer); // Mostrar el formulario inicial
};

function cleanData() {
  infoGame.resetScore();
  formPlayer1Name.value = '';
  formPlayer2Name.value = '';
  formButton.disabled = true;
};

// Limpiar el contenedor del juego
function cleanGameContainer() {
  while(gameContainer.firstChild) {
    gameContainer.removeChild(gameContainer.firstChild);
  }
}

// Funciones para mostrar y ocultar componentes
function showContainer( container ) {
  container.classList.replace('hidden', 'block');
};
function hiddenContainer( container ) {
  container.classList.replace('block', 'hidden');
};