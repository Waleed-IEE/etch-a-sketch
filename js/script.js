const container = document.querySelector(".container");
let mouseDown = false;
let grid;

const button = document.querySelector(".change-grid-size");
const resetButton = document.querySelector(".reset-grid-drawing");

function buttonClickEvent() {
    let userInput, checkValue = false;
    do{
        userInput = prompt("Enter a number that is 0 < YOUR_INPUT < 101", 16);
        grid = +userInput;
        checkValue = isNaN(grid) || grid < 1 || grid > 100;
        if (checkValue){
            alert(`INVALID input! You typed: ${userInput}\nPlease enter a number that's bigger than 0 and smaller or equal to 100`);
        }
    }while(checkValue);
    resetGrid(grid);
}
function resetGrid(){

    while(container.firstChild){
        container.removeChild(container.firstChild);
    }
    setupGrid(grid);
}

button.addEventListener("click", buttonClickEvent);
resetButton.addEventListener("click", resetGrid);

function setupGrid(grid = 16){
    createGrid(grid);
    createEventListeners();
}
function createGrid(grid){
    for(let i = 0; i < grid;i++){
        let subdiv = document.createElement("div");
        subdiv.className = `subdiv i-${i + 1}`;
        container.appendChild(subdiv);
        for(let j = 0; j < grid; j++){
            let div = document.createElement("div");
            div.className = `square j-${j + 1}`;
            subdiv.appendChild(div);
        }
    }
}

function getTagClasses(event){
    let parentClass = ` ${event.target.parentNode.className}`;
    let currentClass = ` ${event.target.className}`;
    let selectParentClass = parentClass.replace(/\s+/g, '.');
    let selectCurrentClass = currentClass.replace(/\s+/g, '.');

    let classesString = `${selectParentClass} ${selectCurrentClass}`;
    return classesString
}

function createEventListeners(){
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => {square.addEventListener("mouseover", (event) => {
        if(mouseDown){
            let classesString = getTagClasses(event);
            let changeColor = document.querySelector(classesString);
            changeColor.style.backgroundColor = "red";
        }
    })});
    squares.forEach(square => {square.addEventListener("dragstart", (e) => e.preventDefault())});
    squares.forEach(square => {square.addEventListener("contextmenu", (e) => {
        e.preventDefault()
    })});
    
    // To make the squares only change color when the mouse is depressed AND moving through the grid
    window.addEventListener('mousedown', () => {
        mouseDown = true;
    });
    window.addEventListener('mouseup', () => {
        mouseDown = false;
    });
}

setupGrid();