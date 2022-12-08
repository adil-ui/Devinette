let inputName = document.querySelector("#inputName");
let gamerName = document.querySelector("#gamerName");
let auth = document.querySelector(".auth");
let game = document.querySelector(".game");
let lose = document.querySelector(".lose");
let success = document.querySelector(".success");
let message = document.querySelector(".message");
let btnValide = document.querySelector('#btn_valide')
let btnValideNumber = document.querySelector('#btnValideNumber')
let paraPrincipale = document.querySelector('#paraPrincipale')
let ParaErreur  = document.querySelector('#ParaErreur')
let pointsMessage = document.querySelector('#pointsMessage')
let trialsMessage = document.querySelector('#trialsMessage')
let score = document.querySelector('#score')
let rundomNumber
let name;
let minNumber
let maxNumber
let myPoint
let myTrial

btnValide.addEventListener('click', (event) => {
    event.preventDefault()
  if (inputName.value != "") {
    localStorage.setItem("name", inputName.value.toUpperCase());
    auth.style.display = "none";
    gamerName.innerText = localStorage.getItem("name");
    game.style.display = "block";
  }
})



function selectLevel(minNum, maxNum, points, trials) {
    paraPrincipale.style.display = "none"
    paraMain.style.color = "#CCFF00";
    paraMain.innerText = `Entrez un nombre entier entre ${minNum} et ${maxNum}`;
    paraTrial.innerText = `Vous avez ${trials} Essais pour deviner`;
    paraPoint.innerText = `Pour chaque nombre valide vous gagnez ${points} `;
    rundomNumber = Math.floor(Math.random() * maxNum);
    if (rundomNumber < minNum) {
        rundomNumber = rundomNumber + minNum;
    }
    myPoint = points;
    myTrial = trials;
    maxNumber = maxNum;
    minNumber = minNum;
    
}

function easyLevel() {
    selectLevel(1, 10, 1, 3);
    console.log(rundomNumber)

}

function mediumLevel() {
    selectLevel(10, 100, 3, 5);
    console.log(rundomNumber)

}

function difficultLevel() {
    selectLevel(100, 1000, 5, 10);
    console.log(rundomNumber)

}

btnValideNumber.addEventListener('click', (event) =>{
    event.preventDefault();
    if (numberEnter.value == rundomNumber) {
       score.innerText = parseInt(score.innerText + 1) 
       game.style.display = 'none'
       success.style.display = 'block'
    } else {
        paraMain.style.color = "red";
        paraMain.innerText = "Désolé ce n'est pas le bon nombre!";
        myTrial = myTrial - 1;
        pointsMessage.innerText = "";
        trialsMessage.innerText = `Il vous reste ${myTrial} Essai`;
    }
    if(myTrial == 0){
        game.style.display = "none"
        lose.style.display = "block"
    }
})



