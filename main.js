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

let border;
let right_answers = 0;

let timer = 10;

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
                <p>Question ${question + 1}/10</p>
                <p></p>
                </div>
                </div>
                <div class="body">
                <h3>${data[question].question}</h3>
                <div class="answers">
                <div class="field e" onclick="check(this)">${
                  ans_eins ? ans_eins : ""
                }</div>
                <div class="field z" onclick="check(this)">${
                  ans_zwei ? ans_zwei : ""
                }</div>
                <div class="field d" onclick="check(this)">${
                  ans_drei ? ans_drei : ""
                }</div>
                <div class="field v ${
                  !ans_vier ? "none" : ""
                }" onclick="check(this)">${ans_vier ? ans_vier : ""}</div>
                </div></div>
                </div>`;
  wrapper.innerHTML += inner;
  eins = document.querySelector(".e");
  eins = document.querySelector(".z");
  eins = document.querySelector(".d");
  eins = document.querySelector(".v");
  border = document.querySelector(".border-upper");
  setInterval(checkTime, 1000);
}

function check(e) {
  question++;
  if (question < data.length) {
    if (e.classList.contains(ob[number])) {
      right_answers += 1;
      e.classList.add("right");
      setTimeout(() => "", 1000);
      displayQuestion();
    }
    setTimeout(() => "", 1000);
    displayQuestion();
    return "";
  }
  wrapper.innerHTML = `<a href="#" class="end"><div >${right_answers} / ${data.length}</div></a>`;
}
function checkTime() {
  if (border.offsetWidth > 700) {
    question++;
    displayQuestion();
  }
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
