const game = () => {
  let pScore = 0;
  let cScore = 0;

  const startGame = () => {
    const playBtn = document.querySelector(".intro button");
    const introScreen = document.querySelector(".intro");
    const match = document.querySelector(".match");

    playBtn.addEventListener("click", () => {
      introScreen.classList.add("fadeOut");
      match.classList.add("fadeIn");
    });
  };
  //Play Match
  const playMatch = () => {
    const options = document.querySelectorAll(".options button");
    const playerHand = document.querySelector(".player-hand");
    const computerHand = document.querySelector(".computer-hand");
    const hands = document.querySelectorAll(".hands img");

    hands.forEach((hand) => {
      hand.addEventListener("animationend", function () {
        this.style.animation = "";
      });
    });

    //Computer Options
    const computerOptions = ["piedra", "papel", "tijera"];

    options.forEach((option) => {
      option.addEventListener("click", function () {
        //computer Choice
        const computerNumber = Math.floor(Math.random() * 3);
        const computerChoice = computerOptions[computerNumber];

        setTimeout(() => {
          //Here is where we call compare hands
          compareHands(this.textContent, computerChoice);

          //Update Images
          playerHand.src = `./assets/${this.textContent}.png`;
          computerHand.src = `./assets/${computerChoice}.png`;
        }, 2000);

        playerHand.style.animation = "shakePlayer 2s ease";
        computerHand.style.animation = "shakeComputer 2s ease";
      });
    });
  };

  const updateScore = () => {
    const playerScore = document.querySelector(".player-score p");
    const computerScore = document.querySelector(".computer-score p");
    const playerHand = document.querySelector(".player-hand");
    const computerHand = document.querySelector(".computer-hand");
    playerScore.textContent = pScore;
    computerScore.textContent = cScore;
  };

  const compareHands = (playerChoice, computerChoice) => {
    const playerHand = document.querySelector(".player-hand");
    const computerHand = document.querySelector(".computer-hand");
    //Update Text
    const winner = document.querySelector(".winner");
    //Checking for a tie
    if (playerChoice === computerChoice) {
      playerHand.style.animation = "playerTie 250ms linear";
      computerHand.style.animation = "computerTie 250ms linear";
      winner.textContent = "Empate";
      return;
    }
    //Check for piedra
    if (playerChoice === "piedra") {
      if (computerChoice === "tijera") {
        winner.textContent = "Jugador Gana!!";
        playerHand.style.animation = "playerWins 250ms linear";
        computerHand.style.animation = "computerLose 250ms ease-out 250ms";
        pScore++;
        setInterval(createHeart, 300);
        updateScore();
        removeHeart();
        return;
      } else {
        winner.textContent = "Gana Computadora";
        computerHand.style.animation = "computerWins 250ms linear";
        playerHand.style.animation = "playerLose 250ms ease-out 250ms";
        cScore++;
        updateScore();
        return;
      }
    }
    //Check for papel
    if (playerChoice === "papel") {
      if (computerChoice === "tijera") {
        winner.textContent = "Gana Computadora";
        computerHand.style.animation = "computerWins 250ms linear";
        playerHand.style.animation = "playerLose 250ms ease-out 250ms";
        cScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "Jugador Gana!!";
        playerHand.style.animation = "playerWins 250ms linear";
        computerHand.style.animation = "computerLose 500ms ease-out";
        pScore++;
        setInterval(createHeart, 300);
        updateScore();
        removeHeart();
        return;
      }
    }
    //Check for tijera
    if (playerChoice === "tijera") {
      if (computerChoice === "piedra") {
        winner.textContent = "Gana Computadora";
        computerHand.style.animation = "computerWins 250ms linear";
        playerHand.style.animation = "playerLose 250ms ease-out 250ms";
        cScore++;
        return;
      } else {
        winner.textContent = "Jugador Gana!!";
        playerHand.style.animation = "playerWins 250ms linear";
        computerHand.style.animation = "computerLose 500ms ease-out";
        pScore++;
        setInterval(createHeart, 300);
        updateScore();
        removeHeart();
        return;
      }
    }
  };

  startGame();
  playMatch();
};

//start the game funcion
game();

function removeHeart() {
  const corazones = document.querySelectorAll("div.heart");
  console.log(corazones);
  corazones.forEach((corazon) => {
    console.log(corazon);
    // corazon.addEventListener("animationend", function () {
      corazon.style.animation = "";
      corazon.remove();
  //  });
  });
}

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 2 + 3 + "s";
  heart.innerText = "👏";
  document.body.appendChild(heart);
}
