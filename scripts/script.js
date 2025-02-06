let questions = []; 
let currentQuestionIndex = 0;

async function getAllQuestions() {
    try {
        const triviaQuestionsApi = new TriviaQuestions();
        questions = await triviaQuestionsApi.getQuestion();
        
        showQuestion(questions[currentQuestionIndex]);
    } catch (error) {
        console.error("problem getting data", error);
    }
  }

getAllQuestions(); 

function showQuestion(questionData) {

    const questionContainerEl = document.querySelector(".question-container");
    questionContainerEl.innerHTML = ""; 

    const questionEl = document.createElement("p");
    questionEl.classList.add("question");
    questionEl.innerHTML = questionData.question; 
    questionContainerEl.appendChild(questionEl);

    const answersListEl = document.createElement("ul");
    answersListEl.classList.add("answers")
   
    const shuffledAnswers = [...questionData.incorrect_answers, questionData.correct_answer]
        .sort(() => Math.random() - 0.5);

    shuffledAnswers.forEach ((answer) => {
        const liEl = document.createElement("li");
        liEl.classList.add("answers__choice");
        liEl.textContent = answer;

        liEl.addEventListener("click", (event) => {
            event.preventDefault();
            handleAnswerClick(event, answer, questionData.correct_answer);
        });
        answersListEl.appendChild(liEl);
    });

    questionContainerEl.appendChild(answersListEl);


    const nextBtnEl = document.createElement("div"); // its not a button because we are not submitting a form
    nextBtnEl.classList.add("question-container__nextBtn");
    nextBtnEl.innerText = "Next Question";
    questionContainerEl.appendChild(nextBtnEl);

    nextBtnEl.addEventListener("click", () => {
        currentQuestionIndex++;

        if(currentQuestionIndex === questions.length) {
            alert("You've finished the quiz!");
        }
        
        showQuestion(questions[currentQuestionIndex]);
    });
}

function handleAnswerClick(event, selectedAnswer, correct_answer) {
    const allAnswers = document.querySelectorAll(".answers__choice");

    if(selectedAnswer === correct_answer) {
        event.target.style.backgroundColor = "#47CEAC"; 
    } else {
        event.target.style.backgroundColor = "#E76158"; 

        allAnswers.forEach(answer=> {
            if(answer.innerText === correct_answer) {
                answer.style.backgroundColor = "#47CEAC";
            }
        });
    }
}
