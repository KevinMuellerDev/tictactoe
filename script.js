let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
]

const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
    [0, 4, 8], [2, 4, 6], // diagonal
];


function init() {
    render();
}

function render() {
    const container = document.getElementById('container');
    let tableHTML = '<table>';

    for (let i = 0; i < 3; i++) {
        tableHTML += '<tr>';

        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;

            tableHTML += `<td onclick="handleClick(${index})">`;
            if (fields[index] === 'cross') {
                tableHTML += generateAnimatedCross();
            } else if (fields[index] === 'circle') {
                tableHTML += generateAnimatedCircle();
            }
            tableHTML += '</td>';
        }

        tableHTML += '</tr>';
    }

    tableHTML += '</table>';
    container.innerHTML = tableHTML;
}

function generateAnimatedCircle() {
    const svgCode = `
        <svg width="70" height="70" xmlns="http://www.w3.org/2000/svg">
            <circle cx="35" cy="35" r="30" fill="none" stroke="#00B0EF" stroke-width="5">
                <animate attributeName="r" values="0;30" dur="200ms" begin="0s" repeatCount="1" fill="freeze" />
            </circle>
        </svg>
    `;
    return svgCode;
}

function generateAnimatedCross() {
    const color = '#FFC000';
    const width = 70;
    const height = 70;

    const svgHtml = `
      <svg width="${width}" height="${height}">
        <line x1="0" y1="0" x2="${width}" y2="${height}"
          stroke="${color}" stroke-width="5">
          <animate attributeName="x2" values="0; ${width}" dur="200ms" />
          <animate attributeName="y2" values="0; ${height}" dur="200ms" />
        </line>
        <line x1="${width}" y1="0" x2="0" y2="${height}"
          stroke="${color}" stroke-width="5">
          <animate attributeName="x2" values="${width}; 0" dur="200ms" />
          <animate attributeName="y2" values="0; ${height}" dur="200ms" />
        </line>
      </svg>
    `;

    return svgHtml;
}

function handleClick(index) {
    const currentPlayer = fields.filter(item => item !== null).length % 2 === 0 ? 'cross' : 'circle';

    if (!fields[index]) {
        fields[index] = currentPlayer;

        const tdElement = document.querySelectorAll('td')[index];
        tdElement.innerHTML = currentPlayer === 'cross' ? generateAnimatedCross() : generateAnimatedCircle();
        tdElement.onclick = null;  // Remove the onclick function after a move

        if (isGameFinished()) {
            const winCombination = getWinningCombination();
            drawWinningLine(winCombination);
        }
    }
}

function drawWinningLine(combination) {
    const lineColor = '#ffffff';
    const lineWidth = 5;

    const startCell = document.querySelectorAll(`td`)[combination[0]];
    const endCell = document.querySelectorAll(`td`)[combination[2]];
    const startRect = startCell.getBoundingClientRect();
    const endRect = endCell.getBoundingClientRect();

    const lineLength = Math.sqrt(
        Math.pow(endRect.left - startRect.left, 2) + Math.pow(endRect.top - startRect.top, 2)
    );
    const lineAngle = Math.atan2(endRect.top - startRect.top, endRect.left - startRect.left);

    const line = document.createElement('div');
    line.style.position = 'absolute';
    line.style.width = `${lineLength}px`;
    line.style.height = `${lineWidth}px`;
    line.style.backgroundColor = lineColor;
    line.style.top = `${startRect.top + startRect.height / 2 - lineWidth / 2} px`;
    line.style.left = `${startRect.left + startRect.width / 2} px`;
    line.style.transform = `rotate(${lineAngle}rad)`;
    line.style.transformOrigin = 'top left';
    document.getElementById('container').appendChild(line);
}

function isGameFinished() {
    return fields.every((field) => field !== null) || getWinningCombination() !== null;
}

function getWinningCombination() {
    for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
        const [a, b, c] = WINNING_COMBINATIONS[i];
        if (fields[a] === fields[b] && fields[b] === fields[c] && fields[a] !== null) {
            return WINNING_COMBINATIONS[i];
        }
    }
    return null;
}

