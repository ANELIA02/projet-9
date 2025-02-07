
const questions = [
    {
        question: "Quelle est la capitale de la France ?",
        options: ["Londres", "Berlin", "Paris", "Madrid"],
        reponseCorrecte: 2
    },
    {
        question: "Combien font 2 + 2 ?",
        options: ["3", "4", "5", "6"],
        reponseCorrecte: 1
    },
    {
        question: "Quelle est la plus grande planète du système solaire ?",
        options: ["Mars", "Venus", "Jupiter", "Saturne"],
        reponseCorrecte: 2
    }
];


let questionActuelle = 0;
let score = 0;


const questionElement = document.getElementById("question");
const choixElement = document.getElementById("choix");
const suivantButton = document.getElementById("suivant");
const scoreElement = document.getElementById("score");
const quizElement = document.getElementById("quiz");
const resultatElement = document.getElementById("resultat");
const scoreFinalElement = document.getElementById("score-final");
const recommencerButton = document.getElementById("recommencer");


function afficherQuestion() {
    const question = questions[questionActuelle];
    questionElement.textContent = question.question;
    
    choixElement.innerHTML = "";
    question.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("btn");
        button.addEventListener("click", () => verifierReponse(index));
        choixElement.appendChild(button);
    });
    
    suivantButton.style.display = "none";
}


function verifierReponse(choix) {
    const question = questions[questionActuelle];
    const boutons = choixElement.getElementsByClassName("btn");
    
    for (let bouton of boutons) {
        bouton.disabled = true;
    }
    
    if (choix === question.reponseCorrecte) {
        boutons[choix].classList.add("correct");
        score++;
    } else {
        boutons[choix].classList.add("incorrect");
        boutons[question.reponseCorrecte].classList.add("correct");
    }
    
    scoreElement.textContent = `Score: ${score}`;
    suivantButton.style.display = "block";
}


suivantButton.addEventListener("click", () => {
    questionActuelle++;
    if (questionActuelle < questions.length) {
        afficherQuestion();
    } else {
        afficherResultat();
    }
});


function afficherResultat() {
    quizElement.classList.add("cache");
    resultatElement.classList.remove("cache");
    scoreFinalElement.textContent = `Votre score final est: ${score} sur ${questions.length}`;
}


recommencerButton.addEventListener("click", () => {
    questionActuelle = 0;
    score = 0;
    scoreElement.textContent = "Score: 0";
    quizElement.classList.remove("cache");
    resultatElement.classList.add("cache");
    afficherQuestion();
});


afficherQuestion();