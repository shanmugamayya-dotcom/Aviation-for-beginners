let questions = [];
let current = 0;
let score = 0;

fetch("questions.json")
    .then(res => res.json())
    .then(data => {
        questions = data;
        loadQuestion();
    });

function loadQuestion() {
    const q = questions[current];
    document.getElementById("questionText").innerText =
        "Question " + (current + 1) + ": " + q.question;

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    q.options.forEach((opt, index) => {
        const optHTML = `
            <div class="option">
                <label>
                    <input type="radio" name="option" value="${index}" onclick="checkAnswer(${index})">
                    ${opt}
                </label>
            </div>
        `;
        optionsDiv.innerHTML += optHTML;
    });
}

function checkAnswer(selected) {
    if (selected === questions[current].answer) {
        score++;
    }

    current++;

    if (current < questions.length) {
        loadQuestion();
    } else {
        document.getElementById("options").innerHTML = "";
        document.getElementById("questionText").innerText =
            "You have completed all questions.";

        document.getElementById("resultBtn").style.display = "inline-block";
    }
}

function showResult() {
    const percent = Math.round((score / questions.length) * 100);
    let resultText = "";

    if (score > 3) {
        resultText = "PASS – You scored " + percent + "%";
    } else {
        resultText = "FAIL – You scored " + percent + "%";
    }

    document.getElementById("resultBox").innerText = resultText;
}