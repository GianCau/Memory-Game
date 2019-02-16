/*
 * Create a list that holds all of your cards
 */

let arrayCards = ['fa-diamond','fa-paper-plane-o','fa-anchor','fa-bolt','fa-cube','fa-leaf','fa-bicycle','fa-bomb','fa-diamond','fa-paper-plane-o','fa-anchor','fa-bolt','fa-cube','fa-leaf','fa-bicycle','fa-bomb']

const restart = document.querySelector('.restart')
const cards = document.querySelectorAll('.card')
const childCards = document.querySelectorAll('.card > .fa')
const moves = document.querySelector('.moves')
const stars = document.querySelectorAll('.fa-star')
let time = document.querySelector('.displayTime');

// cardsArray convert a NodeList to an Array
const cardsArray = Array.prototype.slice.call(cards);
const childrenCardsArray = Array.prototype.slice.call(childCards);
//this array contains the cards that have a "show" class.
let cardList = [];
//this variable count how many moved did the user do
let cont = 0
//this variable counts how many matches did the user get
let countMatches = 0



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


// on click of the restart button it will mix the cards random
restart.addEventListener('click', function () {

	resetAllTheGame()

})

//this function show the new disposition from the cards
function changeCardPosition(cards,newRandomCards) {

	cards.forEach(function(val,index){

		let newClass = newRandomCards[index];

		let currentClass = val.className.slice(3)

		//remove the class from val
		val.classList.remove(currentClass);

		//add the new class to val
		val.classList.add(newClass);

	})

}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {

	var currentIndex = array.length, temporaryValue, randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

//this function cleans up all the class in the elements

function reset() {

	cards.forEach((item) => {

		if (item.classList.contains("show") || item.classList.contains("match")) {
			item.classList.remove('show')
			item.classList.remove('open')
			item.classList.remove('match')
			cardList.length = 0
		}
	})
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


// click on Cards

cards.forEach((e) => {

	e.addEventListener('click', function (param) {

		const target = param.target

		openedCards(target)
		startsCounter()

	})

})

//this function count the stars

function startsCounter() {

	if (cont == 25) {

		stars[0].classList.add('hide')

	} else if (cont == 40) {

		stars[1].classList.add('hide')

	} else {

		console.log('test');

	}
}

//this function add the pressed card toi an array list

function openedCards(card) {

	if (card.classList.contains('show'))
	{

		card.classList.remove('show')
		card.classList.remove('open')

	} else {
		card.classList.add('show')
		card.classList.add('open')

		counter(card)
	}

	cardList.push(card.id)

	if (cardList.length == 2) {

		cardsMatch(cardList)

	}
}

//this function count how many moves did the user do

function counter() {

	cont += 1
	if (cont == 1) {
		timer()
	}
	moves.textContent = cont

}


// this function checks if the cards matches

function cardsMatch(cardArray) {

	let cardOne = document.getElementById(cardArray[0]).childNodes[1].className.slice(3);
	let cardOTwo = document.getElementById(cardArray[1]).childNodes[1].className.slice(3);

	if ( document.getElementById(cardArray[0]).id == document.getElementById(cardArray[1]).id) {

		removeClass(cardArray)

	}else if(cardOne == cardOTwo){

		document.getElementById(cardArray[0]).classList.add("match")
		document.getElementById(cardArray[1]).classList.add("match")
		cardList.length = 0
		playAgain ()
		matchAll()

	}else{

		setTimeout(() => { removeClass(cardArray)},600)
	}

}

//this function check if all the cards as a match class

function matchAll() {

	countMatches += 1

	//this metho it will stop the timer
	clearInterval(timer);

	if(countMatches == 8){
		playAgain ()
	}

}
//this function remove the "show" class

function removeClass() {

	document.getElementById(cardList[0]).classList.remove("show")
	document.getElementById(cardList[0]).classList.remove("open")

	document.getElementById(cardList[1]).classList.remove("show")
	document.getElementById(cardList[1]).classList.remove("open")
	cardList.length = 0

}

//Timer inspired by https://stackoverflow.com/questions/20618355/the-simplest-possible-javascript-countdown-timer
const timer = function timer() {
    let minutes = 0;
    let seconds = 0;
    gameInterval = setInterval(function () {
        seconds = parseInt(seconds, 10) + 1;
        minutes = parseInt(minutes, 10);
        if (seconds >= 60) {
            minutes += 1;
            seconds = 0;
        }

        seconds = seconds < 10 ? "0" + seconds : seconds;
        minutes = minutes < 10 ? "0" + minutes : minutes;

        time.innerHTML = minutes + ":" + seconds;
        lastTime.textContent = time.textContent;
    }, 1000);
}

function clearTimer() {

	time.innerHTML = `00:00`;

}

function endOfGame() {
	clearInterval(gameInterval);
}

function playAgain () {
	if(confirm(`You win the game in ${cont} moves!!!
	Du you what to play again?
	` )){

		resetAllTheGame()
	}
}

function resetAllTheGame() {
	let newRandomCards = shuffle(arrayCards)
	reset()
	changeCardPosition(childCards,newRandomCards)
	cont = 0
	moves.textContent =  cont
	stars[0].classList.remove('hide')
	stars[1].classList.remove('hide')
	endOfGame()
	clearTimer()
}