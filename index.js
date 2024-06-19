const XLSX = require('xlsx');

let workbook;
let flashcardsSheet;
let materiasSheet;

// Carrega o arquivo XLSX
function loadWorkbook() {
    workbook = XLSX.readFile('bd.xlsx');
    flashcardsSheet = workbook.Sheets['Flashcards'];
    materiasSheet = workbook.Sheets['Materias'];
    loadMaterias();
}

// Carrega as matérias da planilha e imprime no console (ajuste para a sua necessidade)
function loadMaterias() {
    let materias = XLSX.utils.sheet_to_json(materiasSheet);
    console.log("Matérias disponíveis:");
    materias.forEach(materia => {
        console.log(materia.Nome);
    });
}

// Função para carregar flashcards
function loadFlashcards(selectedMateria, selectedCount) {
    let flashcards = XLSX.utils.sheet_to_json(flashcardsSheet);
    if (selectedMateria !== 'all') {
        flashcards = flashcards.filter(card => card.Materia === selectedMateria);
    }
    let slicedFlashcards = flashcards.slice(0, selectedCount === 'all' ? flashcards.length : parseInt(selectedCount));
    displayFlashcards(slicedFlashcards);
}

// Função para exibir flashcards (aqui, apenas imprime no console)
function displayFlashcards(flashcards) {
    flashcards.forEach((card, index) => {
        console.log(`Card ${index + 1}: ${card.Question} - ${card.Answer}`);
    });
}

// Chamada de exemplo
loadWorkbook();
setTimeout(() => {
    // Chama a função para carregar e exibir flashcards
    loadFlashcards('all', 'all'); // Substitua 'all' pelos filtros desejados
}, 1000);
