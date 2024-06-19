const express = require('express');
const app = express();
const XLSX = require('xlsx');
const port = process.env.PORT || 3000;

let workbook;
let flashcardsSheet;
let materiasSheet;

// Função para carregar o arquivo XLSX
function loadWorkbook() {
    workbook = XLSX.readFile('bd.xlsx');
    flashcardsSheet = workbook.Sheets['Flashcards'];
    materiasSheet = workbook.Sheets['Materias'];
}

// Função para carregar as matérias e retornar como JSON
function loadMaterias() {
    let materias = XLSX.utils.sheet_to_json(materiasSheet);
    return materias;
}

// Função para carregar e filtrar flashcards
function loadFlashcards(selectedMateria, selectedCount) {
    let flashcards = XLSX.utils.sheet_to_json(flashcardsSheet);
    if (selectedMateria !== 'all') {
        flashcards = flashcards.filter(card => card.Materia === selectedMateria);
    }
    return flashcards.slice(0, selectedCount === 'all' ? flashcards.length : parseInt(selectedCount));
}

// Configuração das rotas do servidor
app.get('/', (req, res) => {
    res.send('Welcome to the Flashcards API! Use /materias to see available subjects and /flashcards to access flashcards.');
});

app.get('/materias', (req, res) => {
    res.json(loadMaterias());
});

app.get('/flashcards', (req, res) => {
    const { materia, count } = req.query;
    res.json(loadFlashcards(materia || 'all', count || 'all'));
});

// Inicializa o servidor
app.listen(port, () => {
    loadWorkbook(); // Carrega o workbook quando o servidor inicia
    console.log(`Server running on port ${port}`);
});
