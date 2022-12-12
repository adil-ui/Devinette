let inputName = document.querySelector("#inputName");
let gamerName = document.querySelector("#gamerName");
let auth = document.querySelector(".auth");
let game = document.querySelector(".game");
let lose = document.querySelector(".lose");
let success = document.querySelector(".success");
let labelEasy = document.querySelector("#labelEasy");
let labelMedium = document.querySelector("#labelMedium");
let labelDifficult = document.querySelector("#labelDifficult");
/*
let easy = document.querySelector("#easy");
let medium = document.querySelector("#medium");
let difficult = document.querySelector("#difficult")
*/
let levelRadio = document.querySelectorAll('.levelRadio')
let message = document.querySelector(".message");
let btnValide = document.querySelector('#btn_valide')
let btnValideNumber = document.querySelector('#btnValideNumber')
let paraPrincipale = document.querySelector('#paraPrincipale')
let ParaErreur  = document.querySelector('#ParaErreur')
let pointsMessage = document.querySelector('#pointsMessage')
let trialsMessage = document.querySelector('#trialsMessage')
let score = document.querySelector('#score')
let email = document.querySelector('#inputEmail')
let password = document.querySelector('#inputPassword')
let authError = document.querySelector('#authError')
let rundomNumber
let name;
let minNumber
let maxNumber
let myPoint
let myTrial
authError.style.color ="red"
score.innerText = 0

btnValide.addEventListener('click', (event) => {
    event.preventDefault()
    if (email.value && password.value) {
        fetch('https://reqres.in/api/login',{
            method: "POST",
            headers :{ "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email.value,
                password : password.value
            })
        })
        .then(response => response.json()).then(result => {
            if(result.token){
                localStorage.setItem("name", inputEmail.value);
                auth.style.display = "none";
                gamerName.innerText = localStorage.getItem("name");
                game.style.display = "block";
            }else{
                authError.innerHTML = "User Not Found"
            }
        })
        
    }else {
        authError.innerHTML = 'fill the empty fields'
    }

})

/*
btnValide.addEventListener('click', (event) => {
    event.preventDefault()
  if (inputName.value != "") {
    localStorage.setItem("name", inputName.value.toUpperCase());
    auth.style.display = "none";
    gamerName.innerText = localStorage.getItem("name");
    game.style.display = "block";
  }
})

if (localStorage.getItem("name")) {
    auth.style.display = "none";
    gamerName.innerText = localStorage.getItem("name");
    game.style.display = "block";
}
*/

if (localStorage.getItem("myScore")) {
    score.innerText = localStorage.getItem("myScore");
}


function selectLevel(minNum, maxNum, points, trials) {
    paraPrincipale.style.display = "none"
    paraMain.style.color = "#CCFF00";
    paraMain.innerText = `Entrez un nombre entier entre ${minNum} et ${maxNum}`;
    paraTrial.innerText = `Vous avez ${trials} Essais pour deviner`;
    paraPoint.innerText = `Pour chaque nombre valide vous gagnez ${points} point`;
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
    labelEasy.style.color ="#00ff00"
    labelMedium.style.color = "#cbfd00"
    labelDifficult.style.color = "#cbfd00"
    labelEasy.style.fontWeight ="bold"
    labelMedium.style.fontWeight = "normal"
    labelDifficult.style.fontWeight = "normal"
    console.log(rundomNumber)

}

function mediumLevel() {
    selectLevel(10, 100, 3, 5);
    labelMedium.style.color ="#00ff00"
    labelEasy.style.color ="#cbfd00"
    labelDifficult.style.color = "#cbfd00"
    labelMedium.style.fontWeight ="bold"
    labelEasy.style.fontWeight = "normal"
    labelDifficult.style.fontWeight = "normal"

    console.log(rundomNumber)

}

function difficultLevel() {
    selectLevel(100, 1000, 5, 10);
    labelDifficult.style.color ="#00ff00"
    labelMedium.style.color ="#cbfd00"
    labelEasy.style.color ="#cbfd00"
    labelDifficult.style.fontWeight = "bold"
    labelEasy.style.fontWeight = "normal"
    labelMedium.style.fontWeight = "normal"
    console.log(rundomNumber)

}

btnValideNumber.addEventListener('click', (event) =>{
    event.preventDefault();
    Array.from(levelRadio).forEach(elt => elt.disabled = true)
    if (numberEnter.value == rundomNumber) {
        let scorePoint = parseInt(score.innerText) + myPoint
       localStorage.setItem("myScore", scorePoint);
       score.innerText = localStorage.getItem("myScore");
       game.style.display = 'none'
       success.style.display = 'block'
    }else if(numberEnter.value > maxNumber || numberEnter.value < minNumber){
        paraTrial.style.display = 'none'
        paraPoint.style.display = 'none'
        paraMain.style.color = "red";
        paraMain.innerText = `Entrez un nombre entier entre ${minNumber} et  ${maxNumber}`;
        pointsMessage.innerText = "";
        trialsMessage.innerText = `Il vous reste ${myTrial} Essai`;
    }
     else {
        paraTrial.style.display = 'none'
        paraPoint.style.display = 'none'
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

let btnYes = document.querySelector('#btnYes')
let btnNo = document.querySelector('#btnNo')

btnYes.addEventListener('click', (event) =>{
    event.preventDefault()
    lose.style.display = 'none'
    game.style.display = 'block'
    Array.from(levelRadio).forEach(elt => elt.disabled = false)
    numberEnter.focus()
window.location.reload()

})

btnNo.addEventListener('click', (event) =>{
    event.preventDefault()
    lose.style.display = 'none'
    auth.style.display = 'block'
})

btnSuccessYes.addEventListener('click', (event) =>{
    event.preventDefault()
    success.style.display = 'none'
    game.style.display = 'block'
    Array.from(levelRadio).forEach(elt => elt.disabled = false)
    numberEnter.focus()
window.location.reload()

})

btnSuccessNo.addEventListener('click', (event) =>{
    event.preventDefault()
    success.style.display = 'none'
    auth.style.display = 'block'
})
