document.addEventListener('DOMContentLoaded', function() {
    const materiaSelect = document.getElementById('materia-select');
    const flashcardCountSelect = document.getElementById('flashcard-count');
    const flashcardContainer = document.getElementById('flashcard-container');
    const controls = document.getElementById('controls');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    let flashcards = [];
    let currentFlashcardIndex = 0;

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
            .then(data => {
                flashcards = data;
                currentFlashcardIndex = 0;
                flashcardContainer.innerHTML = ''; // Clear previous flashcards
                controls.style.display = 'flex';
                showFlashcard(currentFlashcardIndex);
                updateControls();
            });
    });

    function showFlashcard(index) {
        flashcardContainer.innerHTML = '';
        if (index < flashcards.length && index >= 0) {
            let card = flashcards[index];
            let cardDiv = document.createElement('div');
            let question = document.createElement('h3');
            question.textContent = card.Question;
            let answer = document.createElement('p');
            answer.textContent = card.Answer;
            answer.classList.add('answer');
            let showAnswerBtn = document.createElement('button');
            showAnswerBtn.textContent = 'Mostrar Resposta';
            showAnswerBtn.classList.add('show-answer');
            showAnswerBtn.addEventListener('click', () => {
                answer.style.display = 'block';
                showAnswerBtn.style.display = 'none';
            });
            cardDiv.appendChild(question);
            cardDiv.appendChild(answer);
            cardDiv.appendChild(showAnswerBtn);
            flashcardContainer.appendChild(cardDiv);
        } else {
            flashcardContainer.innerHTML = '<p>Não há mais flashcards.</p>';
            controls.style.display = 'none';
        }
    }

    function updateControls() {
        prevButton.disabled = currentFlashcardIndex <= 0;
        nextButton.disabled = currentFlashcardIndex >= flashcards.length - 1;
    }

    window.showPreviousFlashcard = function() {
        if (currentFlashcardIndex > 0) {
            currentFlashcardIndex--;
            showFlashcard(currentFlashcardIndex);
            updateControls();
        }
    };

    window.showNextFlashcard = function() {
        if (currentFlashcardIndex < flashcards.length - 1) {
            currentFlashcardIndex++;
            showFlashcard(currentFlashcardIndex);
            updateControls();
        }
    };
});
