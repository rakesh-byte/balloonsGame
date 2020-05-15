let colors = ['yellow', 'red', 'blue', 'violet', 'green'];
let windowWidth = window.innerWidth;    //width of windows
let windowHeight = window.innerHeight;  //height of windows
let body = document.body;
let scores = document.querySelectorAll('.score');   //all score classes by default stored in array
let num = 0;                            //score inital count
let total = 100;                        //total number of ballons
let currentBallon = 0;
let gameOver = false;                   //for button reatart
let totalShadow = document.querySelector('.total-shadow');
let startBtn = document.querySelector('.start-game-button');    //to select for background music

//creating div for ballons

function createBalloon() {
	let div = document.createElement('div');
	let rand = Math.floor(Math.random()*colors.length); //randomly selecting colors from colors array
	div.className = 'balloon balloon-'+colors[rand];

	rand = Math.floor(Math.random() * (windowWidth - 100)); //width of window - 100 to prevent ballons from overflowing to the screen
    div.style.left = rand + 'px';
    
    //Unique id of the balloons
	div.dataset.number = currentBallon;
	currentBallon++;

	body.appendChild(div);  //apending div to the html file
	animateBalloon(div);    //ballons apearing from bottom to top
}

// function to float balloons from top to bottom
function animateBalloon(elem){
	let pos = 0;
    let random = Math.floor(Math.random() * 6 - 3);
    
    //interval in millisecs for ballons which increase after every 10 ballons
	let interval = setInterval(frame, 12 - Math.floor(num / 10) + random);

	function frame(){
		if(pos >= (windowHeight + 200) && (document.querySelector('[data-number="'+elem.dataset.number+'"]') !== null)) {
			clearInterval(interval);
			gameOver = true;
		} else{
			pos++;
			elem.style.top = windowHeight - pos + 'px';
		}
	}
}


//function for removing balloon
function deleteBalloon(elem){
		elem.remove();
		num++;
		updateScore();
		playBallSound();
}

//playing pop sound on popping balloon
function playBallSound(){
	let audio = document.createElement('audio');
	audio.src = 'sounds/pop.mp3';
	audio.play();
}

//Score update function
function updateScore(){
	for(let i = 0; i < scores.length; i++){
		scores[i].textContent = num;
	}
}

//function to start game
function startGame(){
	restartGame();
	let timeout = 0;

	let loop = setInterval(function(){
        timeout = Math.floor(Math.random() * 600 - 100);
        //if condition to check game is not over and total number not reached 100
		if(!gameOver && num !== total){
			createBalloon();
        }
        //to check game is over and total number not reached to 100
        else if(num !== total) {
			clearInterval(loop);
			totalShadow.style.display = 'flex';
			totalShadow.querySelector('.lose').style.display = 'block';
        } 
        //winning block display
        else {
			clearInterval(loop);
			totalShadow.style.display = 'flex';
			totalShadow.querySelector('.win').style.display = 'block';
		}
		
	}, 800 + timeout);
}

//function to restart game after pressing restart yes button

function restartGame(){
	let forRemoving = document.querySelectorAll('.balloon');
	for(let i = 0; i < forRemoving.length; i++){
        //clearing all previous games balloons
        forRemoving[i].remove();
	}
	gameOver = false; //updating for new game
    
    //score count set to 0
    num = 0;            
	updateScore();
}

//selectin ballons on screen to pop

document.addEventListener('click', function(event){
	if(event.target.classList.contains('balloon')){
		deleteBalloon(event.target);
	}
})

// event listner for Yes button
document.querySelector('.restart').addEventListener('click', function(){
	totalShadow.style.display = 'none';
	totalShadow.querySelector('.win').style.display = 'none';
	totalShadow.querySelector('.lose').style.display = 'none';

	startGame();
});

// event listner for no button
document.querySelector('.cencel').addEventListener('click', function(){
	totalShadow.style.display = 'none';
});

//// event listner for Start button
startBtn.addEventListener('click', function() {
	startGame();
	document.querySelector('.bg-music').play();
	document.querySelector('.start-game-window').style.display = 'none';
});
















