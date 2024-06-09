const boxes = document.querySelectorAll(".game-square");
const currUser = document.querySelector("#curr-user");
const currUserBar = document.querySelector("h2");
const winningConditions = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];

let roundCounter = 0;
let symbol = true;

const playerMove = (box) =>{
    if (box.attributes.used.value == "no") {        
        // console.log(box.attributes.used.value);
        boxes[box.id -1].textContent = symbol == true?"X":"O"; 
        currUser.textContent = symbol == true?"O":"X";
        symbol = !symbol;

        // changing used attribute
        box.setAttribute("used","yes");

        //changing the current user bar
        roundCounter++;
        roundCounter == 9?currUserBar.textContent = "End of a game":"";
    } else{
        alert("YOU CAN'T PUT A SYMBOL IN A BOX MORE THAN ONCE!");
    };
};

boxes.forEach((box) => {
    box.addEventListener("click",()=>{if(roundCounter < 9){playerMove(box)}})
});