function getComputerChoice() {
    let randomNumber = Math.random();
    if(randomNumber < 1/3) {
        return "Rock"
    } else if (randomNumber < 2/3) {
        return "Paper"
    } else {
        return "Scissors"
    }
}

//---------------------- playRound and his help functions ---------------
function playRound(playerSelection, computerSelection) {
    let isWin = judger(inputParser(playerSelection), inputParser(computerSelection));
    let result = sayIt(isWin);
    return result + " " + playerSelection + " beats " + computerSelection;
}

function inputParser(selection) {
    if ("Rock".localeCompare(selection, undefined, {sensitivity: 'accent'}) === 0) {
        return 0;
    }
    else if ("Paper".localeCompare(selection, undefined, {sensitivity: 'accent'}) === 0) {
        return 1;
    }
    else if ("Scissors".localeCompare(selection, undefined, {sensitivity: 'accent'}) === 0) {
        return 2;
    }
}

function judger(first, second) {
    let diff = first - second;
    if (diff === 2) {
        return -1;
    }
    if (diff === -2) {
        return 1;
    }
    return diff;
}

function sayIt(isWin) {
    if (isWin < 0) {
        return "You Lose!"
    }
    if (isWin === 0) {
        return "Tied!"
    }
    if (isWin > 0) {
        return "You Win!"
    }
}
//----------------------------


function judgeRound(playerSelection, computerSelection) {
    let isWin = judger(inputParser(playerSelection), inputParser(computerSelection));
    return isWin;
}

function game() {
    let record = "";
    let isWin = 0;
    for (let i = 0; i < 5; i++) {
        let playerSelection = prompt("What is your selection, rock, paper or scissors?")
        let computerSelection = getComputerChoice();
        isWin += judgeRound(playerSelection, computerSelection);
        record += playRound(playerSelection, computerSelection) + "\n";
    }
    return sayIt(isWin) + " records:\n" + record;
}

const selections = document.querySelectorAll(".selections button");
const result = document.querySelector(".results");
const points = document.querySelector(".points");

let yourPoint = 0;
let comPoint = 0;
let roundCount = 0;
function oneClick(event) {
    let computerSelection = getComputerChoice();
    let playerSelection = this.id;
    let isWin = judgeRound(playerSelection, computerSelection);
    if (isWin > 0) yourPoint++;
    if (isWin < 0) comPoint++;
    roundCount++;
    const record = document.createElement("p");
    record.textContent = `Round ${roundCount}   ${playerSelection} beat ${computerSelection}`;
    points.textContent = `your Point: ${yourPoint}  computer Point: ${comPoint}`;
    result.appendChild(record);
}

selections.forEach(selection => selection.addEventListener('click', oneClick));