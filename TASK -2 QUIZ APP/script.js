const quizData = [
    {
      question: "1. There are ___ levels of heading in HTML",
      choices: ["Three", "Four", "Five", " Six"],
      correctChoice: 3,
    },
    {
      question: "2. Which of the following can read and render HTML web pages",
      choices: ["Server", "head Tak", "web browser", "empty"],
      correctChoice: 2,
    },
    {
      question: "3. Among the following operators identify the one which is used to allocate memory to array variables in JavaScript.",
      choices: ["new", "new malloc", "alloc", "malloc"],
      correctChoice: 0,
    },
    {
        question: "4. Why were cookies designed?",
        choices: ["for server-side programming", "for client-side programming", "both a and b", "None"],
        correctChoice: 0,
      },
      {
        question: "5. What are variables used in JavaScript programs",
        choices: ["Varying randomly", "Storing numbers,dates and other values", "Used as a header files", "None of above"],
        correctChoice: 1,
      },
    // Add more quiz questions here
  ];
  
  const quizContainer = document.getElementById("quiz");
  const questionElement = document.getElementById("question");
  const choicesElement = document.getElementById("choices");
  const resultElement = document.getElementById("result");
  const scoreElement = document.getElementById("score");
  const restartButton = document.getElementById("restart");
  const timerElement = document.getElementById("timer");
  
  let currentQuestion = 0;
  let score = 0;
  let timer;
  
  function showQuestion() {
    const currentQuizData = quizData[currentQuestion];
    questionElement.textContent = currentQuizData.question;
  
    choicesElement.innerHTML = "";
    currentQuizData.choices.forEach((choice, index) => {
      const choiceButton = document.createElement("button");
      choiceButton.classList.add("choice");
      choiceButton.textContent = choice;
      choiceButton.addEventListener("click", () => checkAnswer(index));
      choicesElement.appendChild(document.createElement("li")).appendChild(choiceButton);
    });
  
    // Start the timer
    let timeLeft = 30;
    timerElement.textContent = `${timeLeft}s`;
    timer = setInterval(() => {
      timeLeft--;
      timerElement.textContent = `${timeLeft}s`;
  
      if (timeLeft === 0) {
        clearInterval(timer);
        checkAnswer(-1); // -1 indicates no answer selected within the time limit
      }
    }, 1000);
  }
  
  function checkAnswer(choiceIndex) {
    clearInterval(timer); // Stop the timer
  
    const currentQuizData = quizData[currentQuestion];
    const choiceButtons = choicesElement.getElementsByClassName("choice");
  
    // Disable all choice buttons after an answer is selected
    for (let i = 0; i < choiceButtons.length; i++) {
      choiceButtons[i].disabled = true;
    }
  
    if (choiceIndex === currentQuizData.correctChoice) {
      choiceButtons[choiceIndex].style.backgroundColor = "#80ff80"; // Green color for correct answer
      score++;
    } else if (choiceIndex !== -1) {
      choiceButtons[choiceIndex].style.backgroundColor = "#ff8080"; // Red color for incorrect answer
    }
  
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      setTimeout(showQuestion, 1000); // Delay to show the next question
    } else {
      setTimeout(showResult, 1000); // Delay to show the final result
    }
  }
  
  function showResult() {
    quizContainer.style.display = "none";
    resultElement.style.display = "block";
  
    let comment;
    if (score === quizData.length) {
      comment = "Perfect! 🎉 You got all the answers correct!";
    } else if (score >= quizData.length / 2) {
      comment = "Great job! 🙂 You did well!";
    } else {
      comment = "Better luck next time! 😕 Keep learning!";
    }
  
    scoreElement.innerHTML = `Your score: ${score}/${quizData.length}<br>${comment}`;
    restartButton.style.display = "block";
  }
  
  function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    quizContainer.style.display = "block";
    resultElement.style.display = "none";
    restartButton.style.display = "none";
    showQuestion();
  }
  
  restartButton.addEventListener("click", restartQuiz);
  
  showQuestion();
  