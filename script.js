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

function init(){
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
                tableHTML += 'X';
            } else if (fields[index] === 'circle') {
                tableHTML += 'O';
            }
            tableHTML += '</td>';
        }

        tableHTML += '</tr>';
    }

    tableHTML += '</table>';
    container.innerHTML = tableHTML;
}