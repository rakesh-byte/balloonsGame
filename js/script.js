let colors = ["blue", "yellow", "violet", "red", "green"];
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let body = document.body;
let scores = document.querySelectorAll('.score');
let num = 0;
let total = 10;

function createBalloon(){
    let div = document.createElement('div');
    let rand =Math.floor(Math.random() * colors.length);
    div.className = 'balloon balloon-'+ colors[rand];

    rand = Math.floor(Math.random() * (windowWidth-100));
    div.style.left = rand +'px';

    body.appendChild(div);
    animateBalloons(div);
}

function animateBalloons(elem)  {
    let pos = 0;
    let interval = setInterval(frame , 10)
    function frame(){
        if(pos >= (windowHeight + 200)){
            clearInterval(interval);
            deleteBalloon(elem);
        }
        else { 
            pos++; 
            elem.style.top = windowHeight - pos + 'px';
        }
    }
}

function deleteBalloon(elem){
    elem.remove();
    num++;
    updateScore();
}

function updateScore(){
    for( let i = 0; i<scores.length; i++)
    {
        scores[i].textContent = num;
    }
}

document.addEventListener('click', function(event){
    if(event.target.classList.contains('balloon')){
        deleteBalloon(event.target);

    }
});