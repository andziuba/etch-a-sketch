const grid = document.getElementById("grid");
const squares = document.getElementsByClassName("square");
const buttons = document.querySelectorAll("#container button");
const coloredSquare = document.getElementsByClassName("colored");
const slider = document.getElementById("slider");
const output = document.getElementById("current-size");

let mode = "black";
let size = 16;

output.textContent = slider.value;

let pointerDown = false;

function clearGrid() {
    Array.from(coloredSquare).forEach((coloredSquare) => {
        coloredSquare.style.backgroundColor = "#D9DCD6"
        coloredSquare.classList.remove("colored");
    });
}

function getRandomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function draw(e) {
    if (e.type === "mouseover" && !pointerDown) return;
    e.target.classList.add("colored");
    if (mode === "rainbow") e.target.style.backgroundColor = getRandomColor();
    else e.target.style.backgroundColor = "#000000";
}

function createGrid() {
    grid.innerHTML = "";
    grid.style.gridTemplateColumns = `repeat(${size}, auto)`;

    for (let i = 0; i < size * size; i++) {
        let square = document.createElement("div");
        square.classList.add("square");
        
        // mouse events
        square.addEventListener("mouseover", draw);
        square.addEventListener("mousedown", () => (pointerDown = true));
        square.addEventListener("mouseup", () => (pointerDown = false)); 
        
        // touch events
        square.addEventListener("touchstart", draw);
        square.addEventListener("touchmove", draw);
        square.addEventListener("touchend", () => (pointerDown = false));

        grid.appendChild(square);
    }
}

function handleButtonClick(button) {
    clearGrid();    // clears grid in all cases (includes clicking "clear" button)
    if (button.id === "black") mode = "black";
    else if (button.id === "rainbow") mode = "rainbow";
}

function handleSliderInput() {
    output.textContent = slider.value;
    size = slider.value;
    clearGrid();
    createGrid();
}

// change size of grid
slider.addEventListener("input", handleSliderInput);

// initialize grid
createGrid();

// handle button clicks
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        handleButtonClick(button);
    });
});

// ensure that slider goes back to default after refreshing page
slider.value = 16;
output.innerHTML = 16;
