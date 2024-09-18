console.log("Welcome to Tic Tac Toe")
let music = new Audio("music.mp3")
let audioTurn = new Audio("ting.mp3")
let gameover = new Audio("gameover.mp3")
let turn = "X";
let isgameover=false;
let scoreX = 0; 
let scoreO = 0;
const changeTurn=()=>{
    return turn === "X"?"O":"X"
}
function updateScore() {
    document.getElementById('scoreX').innerText = scoreX; 
    document.getElementById('scoreO').innerText = scoreO; 
}
function checkDraw() {
    let boxtexts = document.getElementsByClassName('boxtext');
    let filledBoxes = Array.from(boxtexts).every(box => box.innerText !== '');
    if (filledBoxes && !isgameover) {
        document.querySelector('.info').innerText = "It's a draw!";
        isgameover = true;
    }
}

const handleWin = (winner, winCombination) => {
    document.querySelector('.info').innerText = winner + " won";
    isgameover = true;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "400px";
    document.querySelector(".line").style.transform = `translate(${winCombination[3]}vw, ${winCombination[4]}vw) rotate(${winCombination[5]}deg)`;
    document.querySelector(".line").style.width = "20vw";
    if (winner === 'X') {
        scoreX++; 
    } else if (winner === 'O') {
        scoreO++;
    }
    updateScore();
}

const checkWin = () => {
    let boxtexts = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 7, 7, 0],
        [3, 4, 5, 7, 17, 0],
        [6, 7, 8, 7, 27, 0],
        [0, 3, 6, -3, 17, 90],
        [1, 4, 7, 7, 17, 90],
        [2, 5, 8, 17, 17, 90],
        [0, 4, 8, 7, 17, 45],
        [2, 4, 6, 7, 17, 135],
    ];
    wins.forEach(e => {
        if ((boxtexts[e[0]].innerText === boxtexts[e[1]].innerText) &&
            (boxtexts[e[1]].innerText === boxtexts[e[2]].innerText) &&
            (boxtexts[e[0]].innerText !== "")) {
                let winner = boxtexts[e[0]].innerText;  
                console.log("Winner Detected:", winner);
                console.log(scoreO,scoreX);
                handleWin(winner, e);
                music.play();
            }
    });
        checkDraw();
}
let boxes=document.getElementsByClassName("box");
Array.from(boxes).forEach(element =>{
    let boxtext=element.querySelector('.boxtext');
    element.addEventListener('click',()=>{
        if(boxtext.innerText===''){
            boxtext.innerText=turn;
            turn =changeTurn();
            audioTurn.play();
            checkWin();
            if(!isgameover){
            document.getElementsByClassName("info")[0].innerText ="Turn for "+turn;
            }
        }
    })
})
reset.addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
        element.classList.remove('disabled'); 
    });
    turn = "X"; 
    isgameover = false;
    document.querySelector(".line").style.width = "0vw";
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px";
    music.pause();
    music.currentTime = 0;
});