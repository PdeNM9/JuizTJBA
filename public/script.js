document.addEventListener('DOMContentLoaded', function() {
    const materiaSelect = document.getElementById('materia-select');
    const flashcardCountSelect = document.getElementById('flashcard-count');
    const flashcardContainer = document.getElementById('flashcard-container');

    fetch('/materias').then(response => response.json()).then(data => {
        data.forEach(materia => {
            let option = document.createElement('option');
            option.value = materia.Nome;
            option.textContent = materia.Nome;
            materiaSelect.appendChild(option);
        });
    });

    document.querySelector('button').addEventListener('click', function() {
        fetch(`/flashcards?materia=${materiaSelect.value}&count=${flashcardCountSelect.value}`)
            .then(response => response.json())
            .then(flashcards => {
                flashcardContainer.innerHTML = ''; // Clear previous flashcards
                flashcards.forEach(card => {
                    let cardDiv = document.createElement('div');
                    cardDiv.innerHTML = `<h3>${card.Question}</h3><p>${card.Answer}</p>`;
                    flashcardContainer.appendChild(cardDiv);
                });
            });
    });
});
