const container = document.querySelector(".container");
let leftMouseDown = false, rightMouseDown = false;
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

function drawOrErase(event){
    if(leftMouseDown){
        let classesString = getTagClasses(event);
        let changeColor = document.querySelector(classesString);
        let red = Math.floor(Math.random() * 256);
        let green = Math.floor(Math.random() * 256);
        let blue = Math.floor(Math.random() * 256);
        changeColor.style.cssText = `background-color: rgb(${red}, ${green}, ${blue});`;
    }
    if (rightMouseDown){
        let classesString = getTagClasses(event);
        let removeColor = document.querySelector(classesString);
        removeColor.style.backgroundColor = "white";
    }
}

function createEventListeners(){
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => {
        square.addEventListener("mousedown", (e) => {
            if (e.button === 0){
                leftMouseDown = true;
            }
            else if (e.button === 2){
                rightMouseDown = true;
            }
            drawOrErase(e);
        });
        square.addEventListener("mouseup", () => {
            leftMouseDown = false;
            rightMouseDown = false;
        });
        square.addEventListener("mouseover", drawOrErase);
        square.addEventListener("dragstart", (e) => e.preventDefault());
        square.addEventListener("contextmenu", (e) => e.preventDefault());
    });
    
    
}

setupGrid();

/*
// To make the squares only change color when the mouse is depressed AND moving through the grid
    window.addEventListener('mousedown', (e) => {
        if(e.button === 0){
            leftMouseDown = true;
        }
        else if (e.button === 2){
            rightMouseDown = true;
        }
    });
    window.addEventListener('mouseup', () => {
        leftMouseDown = false;
        rightMouseDown = false;
    });
*/