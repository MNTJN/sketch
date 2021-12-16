'use strict';

const defaultGridWidth = 10;
let currentColor = '#000';

/* DOM Elements */
const gridContainer = document.querySelector('.grid-container');
const gridWithDisplayValue = document.querySelector('.grid-width-display');
const gridWidthPicker = document.querySelector('.grid-width-picker');
const eraserButton = document.querySelector('.eraser-button');
const colorPicker = document.querySelector('.box-color-picker');
const currentColorDisplay = document.querySelector('.current-color-display');
const clearButton = document.querySelector('.clear-button');

const resizeGrid = (gridWidth) => {
    gridContainer.style.gridTemplateColumns = `repeat(${gridWidth}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${gridWidth}, 1fr)`;
};
const drawGrid = (gridWidth) => {
    for(let i = 0  ; i < gridWidth * gridWidth ; i++){
        let newGridBox = document.createElement('div');
        newGridBox.setAttribute('class',`grid-box grid-box-${i}`);
        newGridBox.addEventListener('mouseover', changeColorOnMouseOver);
        gridContainer.appendChild(newGridBox);
    };
}
const initGrid = (gridWidth) => {
    gridContainer.textContent = '';
    drawGrid(gridWidth);
    resizeGrid(gridWidth);
}
const changeColorOnMouseOver = (e) => {
    e.target.style.backgroundColor = currentColor;
}

/* Event Listeners */
gridWidthPicker.addEventListener('change', function(e){
    initGrid(e.target.valueAsNumber);
});
gridWidthPicker.addEventListener('input', function(e){
    gridWithDisplayValue.textContent = `Grid width : ${e.target.value} x ${e.target.value}`;
});
clearButton.addEventListener('click', function(){
    const gridBoxes = document.querySelectorAll('.grid-box');
    let gridBoxesArray = Array.from(gridBoxes);
    gridBoxesArray.forEach(gridBox => gridBox.style.backgroundColor = "#fff");
});
eraserButton.addEventListener('click', function(){
    if(currentColor == '#fff'){
        currentColor = colorPicker.value;
        currentColorDisplay.style.backgroundColor = currentColor;
        eraserButton.textContent = `eraser`;
    }
    else{
        currentColor = '#fff';
        currentColorDisplay.style.backgroundColor = '#fff';
        eraserButton.textContent = `eraser off`;
    }
});
colorPicker.addEventListener('input', function(e){
    currentColor = e.target.value;
    currentColorDisplay.style.backgroundColor = currentColor;
    eraserButton.textContent = `eraser`;
});

initGrid(defaultGridWidth);