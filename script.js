const choices = ['rock', 'paper', 'scissors'];
let playerScore = 0;
let computerScore = 0;

const buttonElements = document.querySelectorAll('.choice');
const resultElement = document.getElementById('result');
const playerChoiceElement = document.getElementById('playerChoice');
const computerChoiceElement = document.getElementById('computerChoice');
const playerScoreElement = document.getElementById('playerScore');
const computerScoreElement = document.getElementById('computerScore');

buttonElements.forEach(button => {
  button.addEventListener('click', () => {
    const playerChoice = button.id;
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    const result = getResult(playerChoice, computerChoice);
    displayChoices(playerChoice, computerChoice);
    resultElement.textContent = result;
  });
});
buttonElements.forEach(button => {
    button.addEventListener('click', () => {
      const playerChoice = button.id;
      const computerChoice = choices[Math.floor(Math.random() * choices.length)];
      const result = getResult(playerChoice, computerChoice);
      displayChoices(playerChoice, computerChoice);
      resultElement.textContent = result;
    });
  });
  
  function getResult(player, computer) {
    if (player === computer) {
      return "Égalité!";
    } else if ((player === 'rock' && computer === 'scissors') ||
               (player === 'paper' && computer === 'rock') ||
               (player === 'scissors' && computer === 'paper')) {
      playerScore++;
      playerScoreElement.textContent = playerScore;
      return "Vous avez gagné!";
    } else {
      computerScore++;
      computerScoreElement.textContent = computerScore;
      return "L'ordinateur a gagné!";
    }
  }
  
  function displayChoices(player, computer) {
    playerChoiceElement.src = `${player}.png`;
    computerChoiceElement.src = `${computer}.png`;
    playerChoiceElement.style.display = 'inline';
    computerChoiceElement.style.display = 'inline';
  }