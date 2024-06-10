const boxes = document.querySelectorAll(".game-square");
const currUser = document.querySelector("#curr-user");
const currUserBar = document.querySelector("h2");
const winningConditions = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];

const playerXBoxes = [];
const winningXBoxes = [];
let playerXCounter = 0;

const playerOBoxes = [];
const winningOBoxes = [];
let playerOCounter = 0;

let roundCounter = 0;
let symbol = true;

const winningBoxesChange = (WBoxesIDs)=>{
    WBoxesIDs.forEach((WBoxID)=>{
        boxes[WBoxID-1].setAttribute("won","won");
    })
}

const winChecker = () =>{
    winningConditions.forEach((cond)=>{
        playerXBoxes.forEach((PXBox)=>{
            if(cond.includes(PXBox) === true){
                playerXCounter++;
                winningXBoxes.push(PXBox);
            }
            if(playerXCounter === 3){
                currUserBar.textContent = "X have won the game";
                roundCounter = 9;
                winningBoxesChange(winningXBoxes);
                return 
            }
        })
        playerXCounter = 0;
        winningXBoxes.splice(0,winningXBoxes.length)
        
        playerOBoxes.forEach((POBox)=>{
            if(cond.includes(POBox) === true){
                playerOCounter++;
                winningOBoxes.push(POBox);
            }
            if(playerOCounter === 3){
                currUserBar.textContent = "O have won the game";
                roundCounter = 9;
                winningBoxesChange(winningOBoxes);
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
        currUser.textContent = symbol == true?"O":"X";

        if(symbol == true){
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
    box.addEventListener("click",()=>{if(roundCounter < 9){playerMove(box)}})
});