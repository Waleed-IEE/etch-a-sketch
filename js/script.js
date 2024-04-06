const container = document.querySelector(".container");
let leftMouseDown = false, rightMouseDown = false;
let grid;
let defaultColor = true;

const button = document.querySelector(".change-grid-size");
const resetButton = document.querySelector(".reset-grid-drawing");
const defaultColorButton = document.querySelector(".default-color");
const rainbowColorButton = document.querySelector(".rainbow-color");

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

defaultColorButton.addEventListener("click", () => defaultColor = true);
rainbowColorButton.addEventListener("click", () => defaultColor = false);

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
function darkenColorValues(rgbString){
    rgbArray = extractColorValues(rgbString);
    let darkenColor = 0.9;
    let red = rgbArray[0] * darkenColor;
    let green = rgbArray[1] * darkenColor;
    let blue = rgbArray[2] * darkenColor;
    rgbArrayDarkened = [red, green, blue];
    return rgbArrayDarkened;
}
function extractColorValues(rgbString){
    const rgbValues = rgbString.substring(4, rgbString.length - 1);
    const rgbArray = rgbValues.split(',').map(Number);
    return rgbArray;
}
function drawOrErase(event){
    if(leftMouseDown){
        let classesString = getTagClasses(event);
        let changeColor = document.querySelector(classesString);

        if (defaultColor === false){
            if (changeColor.style.backgroundColor === "" || changeColor.style.backgroundColor === "black"){
                    let red = Math.floor(Math.random() * 256);
                    let green = Math.floor(Math.random() * 256);
                    let blue = Math.floor(Math.random() * 256);
                    changeColor.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
            
            }
            else {
                let rgbArrayDarkened = darkenColorValues(changeColor.style.backgroundColor);
                let red = rgbArrayDarkened[0];
                let green = rgbArrayDarkened[1];
                let blue = rgbArrayDarkened[2];
                changeColor.style.cssText = `background-color: rgb(${red}, ${green}, ${blue});`;
            }
        }
        else if(defaultColor === true){
            changeColor.style.backgroundColor = `black`;
        }
    }
    if (rightMouseDown){
        let classesString = getTagClasses(event);
        let removeColor = document.querySelector(classesString);
        removeColor.style.backgroundColor = "";
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