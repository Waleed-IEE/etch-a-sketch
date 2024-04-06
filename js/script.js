const container = document.querySelector(".container");
let mouseDown = false;

function createGrid(grid = 16){
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
createGrid();

const squares = document.querySelectorAll(".square");
squares.forEach(square => {square.addEventListener("mouseover", (event) => {
    if(mouseDown){
        let parentClass = ` ${event.target.parentNode.className}`;
        let currentClass = ` ${event.target.className}`;

        let selectParentClass = parentClass.replace(/\s+/g, '.');
        let selectCurrentClass = currentClass.replace(/\s+/g, '.');
        
        let changeColor = document.querySelector(`${selectParentClass} ${selectCurrentClass}`);

        console.log(selectParentClass, selectCurrentClass);
        changeColor.style.backgroundColor = "red";
    }
})});

// To make the squares only change color when the mouse is depressed AND moving through the grid
window.addEventListener('mousedown', () => {
    mouseDown = true;
  });
window.addEventListener('mouseup', () => {
    mouseDown = false;
  });