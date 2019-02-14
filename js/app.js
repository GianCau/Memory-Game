/*
 * Create a list that holds all of your cards
 */

let arrayCards = ['fa-diamond','fa-paper-plane-o','fa-anchor','fa-bolt','fa-cube','fa-leaf','fa-bicycle','fa-bomb','fa-diamond','fa-paper-plane-o','fa-anchor','fa-bolt','fa-cube','fa-leaf','fa-bicycle','fa-bomb']

const restart = document.querySelector('.restart')
const cards = document.querySelectorAll('.card')
const childCards = document.querySelectorAll('.card > .fa')

// cardsArray convert a NodeList to an Array
const cardsArray = Array.prototype.slice.call(cards);
const childrenCardsArray = Array.prototype.slice.call(childCards);
//this array contains the cards that have a "show" class.
let cardList = [];



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


// on click of the restart button it will mix the cards random
restart.addEventListener('click', function (e) {

	let newRandomCards = shuffle(arrayCards)
	reset()
	changeCardPosition(childCards,newRandomCards)
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

	cards.forEach((item)=> {

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

	})

})

//this function add the pressed card toi an array list

function openedCards(card) {
	if (card.classList.contains('show')) {
		card.classList.remove('show')
		card.classList.remove('open')
	} else {
		card.classList.add('show')
		card.classList.add('open')
	}

	cardList.push(card.id)

	if (cardList.length == 2) {

		cardsMatch(cardList)

	}
}

// this function checks if the cards matches

function cardsMatch(cardArray) {

	let cardOne = document.getElementById(cardArray[0]).childNodes[1].className.slice(3);
	let cardOTwo = document.getElementById(cardArray[1]).childNodes[1].className.slice(3);

	if (cardOne == cardOTwo ) {

		document.getElementById(cardArray[0]).classList.add("match")
		document.getElementById(cardArray[1]).classList.add("match")
		cardList.length = 0

	}else{

		setTimeout(() => { removeClass(cardArray)},1000)
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
