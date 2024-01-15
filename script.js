let fields = [
    null,
    'cross',
    null,
    null,
    null,
    null,
    null,
    'circle',
    null,
]

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

            tableHTML += '<td>';
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
