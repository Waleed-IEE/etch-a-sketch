const container = document.querySelector(".container");

function createGrid(grid = 16){
    for(let i = 0; i < grid;i++){
        let subdiv = document.createElement("div");
        subdiv.className = `subdiv ${i + 1}`;
        container.appendChild(subdiv);
        for(let j = 0; j < grid; j++){
            let div = document.createElement("div");
            div.className = `square ${j + 1}`;
            subdiv.appendChild(div);
        }
    }
}
createGrid();