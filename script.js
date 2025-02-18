const gridContainer = document.getElementById('grid-container');
const gridHeight = 40;
const gridWidth = 100;
const fuzziness = 0.7;
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
var animInterval = 0;



let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    const rect = gridContainer.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
});

// Define the function f(x, y) that returns a character based on the position (x, y)
function f(x, y) {
    x = x / 2 - mouseX / 8;
    y = y / 2 - mouseY / 16;

    var val = Math.exp(-(Math.pow(x, 2) + Math.pow(y, 2)));

    if (val < 0) {
        return ' ';
    } else if (val < 1) {
        return '.';
    } else if (val < 2) {
        return 'o';
    } else if (val < 3) {
        return '0';
    }
}

function createGrid(rows, cols) {
  gridContainer.style.gridTemplateColumns = `repeat(${cols}, 8px)`;
  gridContainer.style.gridTemplateRows = `repeat(${rows}, 16px)`;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const cell = document.createElement('div');
      cell.classList.add('grid-cell');
      cell.textContent = f(x, y); // Use the function f(x, y) to set the character
      gridContainer.appendChild(cell);
    }
  }
}

function animateGrid() {
  const cells = document.querySelectorAll('.grid-cell');
  cells.forEach(cell => {
    setInterval(() => {
      cell.textContent = characters[Math.floor(Math.random() * characters.length)];
    }, Math.random() * 1000 + 500);
  });
}
    

function updateGrid() {
    const cells = document.querySelectorAll('.grid-cell');
    cells.forEach((cell, index) => {
        if (Math.random() < (1-fuzziness)) { // 50% chance to update the cell
            const x = index % gridWidth;
            const y = Math.floor(index / gridWidth);
            cell.textContent = f(x, y);
        }
    });

    animInterval += 1;
    
    if (animInterval > 50) {
        animInterval = 0;
    }
        
    requestAnimationFrame(updateGrid);
}

gridContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('grid-cell')) {
    event.target.textContent = characters[Math.floor(Math.random() * characters.length)];
  }
});

createGrid(gridHeight, gridWidth);
requestAnimationFrame(updateGrid);