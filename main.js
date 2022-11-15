// All answwer options

const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');

// All our options

const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question'); //саме питання

const numberOfQuestion = document.getElementById('number-of-question'), //номер питання
      numberOfAllQuestions = document.getElementById('number-of-all-questions'); //кількість всіх питань

let indexOfQuestion, // індекс поточного питання
    indexOfPage = 0; // індекс сторінки

    const answersTracker = document.getElementById('answers-tracker'), //обгортка для трекера
          btnNext = document.getElementById('btn-next'); //кнопка Далі

let score = 0; //підсумковий результат вікторини

const correctAnswer = document.getElementById('correct-answer'), //кількість правильних відповідей
      numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'), //кількість всіх питань (в модальному вікні)
      btnTryAgain = document.getElementById('btn-try-again'); //кнопка "Почати заново вікторину"

const questions = [
    {
        question: 'Еней був парубок ...',
        options: [
            'Хоробрий',
            'Моторний',
            'Задворний',
            'Картонний',
        ],
        rightAnswer: 1
    },
    {
        question: 'Баба з возу ...',
        options: [
            'Руба бєрьозу',
            'З лану до столу',
            'Дістала розу',
            'Кобилі легше',
        ],
        rightAnswer: 3
    },
    {
        question: 'Перший гетьман України',
        options: [
            'Богдан Хмальницький',
            'Іван Мазепа',
            'Павло Скоропадський',
            'Петро Сивочолий',
        ],
        rightAnswer: 0
    }
];

numberOfAllQuestions.innerHTML = questions.length; // виводимо кількість питань

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question; // саме питання

    // мапимо відповіді
    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1; // встановлення номеру поточної сторінки
    indexOfPage++; //збільшення індексу сторінки
};

let completedAnswers = []; // масив для вже заданних питань

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false; // якір для перевірки однакових питань

    if(indexOfPage == questions.length) {
        quizOver()
    } else {
        if(completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
                if(item == randomNumber) {
                    hitDuplicate = true;
                }
            });
            if(hitDuplicate) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if(completedAnswers.length == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    }
    completedAnswers.push(indexOfQuestion);
};

const checkAnswer = el => {
    if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disabledOptions();
}

for(option of optionElements) {
    option.addEventListener('click', e => checkAnswer(e));
}

const disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct');
        }
    })
}

// видалення всіх класів зі всіх відповідей
const enableOption = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    })
};

const answertracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
}

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
}

const validate = () => {
    if(!optionElements[0].classList.contains('disabled')){
        alert('Вам потрібно обрати один з варіантів відповідей');
    } else {
        randomQuestion();
        enableOption();
    }
}

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML = questions.length;
};

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', () => {
    validate();
})

window.addEventListener('load', () => {
    randomQuestion();
    answertracker();
})