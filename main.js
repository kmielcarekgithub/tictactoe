//game variables
const boxes = document.querySelectorAll(".game-square");
let currUser = document.querySelector("#curr-user");
const main = document.querySelector("main");
const currUserBar = document.querySelector("h2");
const winningConditions = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
let roundCounter = 0;
let symbol = true;
let gameStatus = false;
let playAgainButtonStatus = false;

//playerX variables
const playerXBoxes = [];
const winningXBoxes = [];
let playerXCounter = 0;

//playerO variables
const playerOBoxes = [];
const winningOBoxes = [];
let playerOCounter = 0;

//start of the game
const startDiv = document.createElement("div");
startDiv.setAttribute("id","startDiv");
document.body.appendChild(startDiv);
const gameStartText = document.createElement("h3");
gameStartText.innerText = "Start a game!";
const gamePlayButton = document.createElement("button");
gamePlayButton.setAttribute("id","gamePlayButton");
gamePlayButton.textContent = "Play";
startDiv.appendChild(gameStartText);
startDiv.appendChild(gamePlayButton);

//game functions
const gameAgainButton = document.createElement("button");
const playAgain = () => {
    if (gameStatus === false) {
        if(playAgainButtonStatus===false){
            gameAgainButton.setAttribute("id","gamePlayAgainButton");
            gameAgainButton.textContent = "Play again!"
            main.appendChild(gameAgainButton);
        }
        playAgainButtonStatus=true;
        gameAgainButton.addEventListener("click",()=>{
        
        gameStatus = true;
        playerOCounter= 0;
        playerXCounter = 0;
        playerOBoxes.length = 0;
        playerXBoxes.length = 0;
        winningOBoxes.length = 0;
        winningXBoxes.length = 0;
        roundCounter = 0;
        symbol = true;
        currUserBar.innerHTML = 'Current User: <span id="curr-user">X</span>';
        currUser = document.querySelector("#curr-user");
        boxes.forEach((box)=>{
            box.textContent = "";
            box.setAttribute("used","no");
            box.removeAttribute("won");
        })
    })
    }
}

const winningBoxesChange = (WBoxesIDs)=>{
    if (gameStatus === true) {
        WBoxesIDs.forEach((WBoxID)=>{
            boxes[WBoxID-1].setAttribute("won","won");
        })
    }
}

const winChecker = () =>{
    winningConditions.forEach((cond)=>{
        playerXBoxes.forEach((PXBox)=>{
            if(cond.includes(PXBox)){
                playerXCounter++;
                winningXBoxes.push(PXBox);
            }
            if(playerXCounter === 3){
                currUserBar.textContent = "X have won the game";
                roundCounter = 9;
                winningBoxesChange(winningXBoxes);
                gameStatus = false;
                playAgain()
                return 
            }
        })
        playerXCounter = 0;
        winningXBoxes.splice(0,winningXBoxes.length)
        
        playerOBoxes.forEach((POBox)=>{
            if(cond.includes(POBox)){
                playerOCounter++;
                winningOBoxes.push(POBox);
            }
            if(playerOCounter === 3){
                currUserBar.textContent = "O have won the game";
                roundCounter = 9;
                winningBoxesChange(winningOBoxes);
                gameStatus = false;
                playAgain()
                return 
            }
        })
        playerOCounter = 0;
        winningOBoxes.splice(0,winningOBoxes.length)
    })
}


const playerMove = (box) =>{
    if (box.attributes.used.value == "no") {        
        // console.log(box.attributes.used.value);
        box.textContent = symbol == true?"X":"O"; 
        currUser.textContent = symbol == false?"X":"O";
        console.log("dis")
        if(symbol){
            playerXBoxes.push(Number(box.id))
        }else if(symbol == false){
            playerOBoxes.push(Number(box.id))
        }
        symbol = !symbol;

        // changing used attribute
        box.setAttribute("used","yes");

        // checking if someone have won
        winChecker()

        //changing the current user bar
        roundCounter++;
        roundCounter == 9?currUserBar.textContent = "End of a game":"";
    } else{
        alert("YOU CAN'T PUT A SYMBOL IN THE SAME BOX MORE THAN ONCE!");
    };
};

boxes.forEach((box) => {
    box.addEventListener("click",()=>{if(roundCounter < 9 && gameStatus){playerMove(box)}})
});

gamePlayButton.addEventListener("click",()=>{
    gameStatus = true;
    startDiv.style.display = "none";
})