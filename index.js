const wrapper = document.getElementById("wrapper");
let question = 0;
let data;
const randomNumbers = (min, max) => {
  return Math.round(Math.random() * (max - min)) + min;
};
let eins;
let zwei;
let drei;
let vier;
let number;

let right_answers = 0;

let ob = {
  1: "e",
  2: "z",
  3: "d",
  4: "v",
};

async function startQuiz() {
  data = await fetch("https://the-trivia-api.com/questions");
  data = await data.json();
  displayQuestion();
}
function displayQuestion() {
  number = randomNumbers(1, 4);
  let ans_eins =
    number == 1
      ? data[question].correctAnswer
      : data[question].incorrectAnswers[0];
  let ans_zwei =
    number == 2
      ? data[question].correctAnswer
      : data[question].incorrectAnswers[1];
  let ans_drei =
    number == 3
      ? data[question].correctAnswer
      : data[question].incorrectAnswers[2];
  let ans_vier =
    number == 4
      ? data[question].correctAnswer
      : data[question].incorrectAnswers[3];
  wrapper.innerHTML = "";
  let inner = ` <div class="question-wrapper">
                <div class="border-upper">
                <div class="upper">
                <p>Question 1/10</p>
                <p>Time Left: 10</p>
                </div>
                </div>
                <div class="body">
                <h3>${data[question].question}</h3>
                <div class="answers">
                <div class="field e" onclick="check(this)">${ans_eins}</div>
                <div class="field z" onclick="check(this)">${ans_zwei}</div>
                <div class="field d" onclick="check(this)">${ans_drei}</div>
                <div class="field v" onclick="check(this)">${ans_vier}</div>
                </div></div>
                </div>`;
  wrapper.innerHTML += inner;
  eins = document.querySelector(".e");
  eins = document.querySelector(".z");
  eins = document.querySelector(".d");
  eins = document.querySelector(".v");
}

function check(e) {
  question++;
  if (question < data.length) {
    displayQuestion();
    if (e.classList.contains(ob[number])) {
      right_answers += 1;
    }
    return "";
  }
  wrapper.innerHTML = `<a href="#" class="end"><div >${right_answers} / ${data.length}</div></a>`;
}

/*
<div class="question-wrapper">
        <div class="border-upper">
          <div class="upper">
            <p>Question 1/10</p>
            <p>Time Left: 10</p>
          </div>
        </div>
    </div>
*/
