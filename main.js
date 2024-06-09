const boxes = document.querySelectorAll(".game-square");
const currUser = document.querySelector("#curr-user");
const winningConditions = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];

let symbol = true;
const playerMove = (box) =>{
    console.log(box.id);
    boxes[box.id -1].textContent = symbol == true?"X":"O"; 
    symbol = !symbol;
    currUser.textContent = symbol == true?"X":"O"
}
boxes.forEach((box) => {
    box.addEventListener("click",()=>{playerMove(box)})
});