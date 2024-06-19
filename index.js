const express = require('express');
const path = require('path');
const XLSX = require('xlsx');
const app = express();
const port = process.env.PORT || 3000; // Replit utiliza a variável process.env.PORT

app.use(express.static('public')); // Serve static files from 'public' directory

let workbook;
let flashcardsSheet;
let materiasSheet;

function loadWorkbook() {
    try {
        workbook = XLSX.readFile('bd.xlsx');
        flashcardsSheet = workbook.Sheets['Flashcards'];
        materiasSheet = workbook.Sheets['Materia'];
    } catch (error) {
        console.error('Erro ao carregar a planilha:', error);
    }
}

// Rota padrão para servir o HTML principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API para materias
app.get('/materias', (req, res) => {
    try {
        let materias = XLSX.utils.sheet_to_json(materiasSheet);
        res.json(materias);
    } catch (error) {
        res.status(500).send('Erro ao obter materias');
    }
});

// API para flashcards
app.get('/flashcards', (req, res) => {
    try {
        const { materia, count } = req.query;
        let flashcards = XLSX.utils.sheet_to_json(flashcardsSheet);
        if (materia !== 'all') {
            flashcards = flashcards.filter(card => card.Materia === materia);
        }
        flashcards = flashcards.slice(0, count === 'all' ? flashcards.length : parseInt(count));
        res.json(flashcards);
    } catch (error) {
        res.status(500).send('Erro ao obter flashcards');
    }
});

// Inicia o servidor
app.listen(port, () => {
    loadWorkbook();
    console.log(`Server running on port ${port}`);
});
