// Prepare document for jQuery and run after HTML loads
$( document ).ready(function() {
    console.log( "ready!" );

// GLOBAL VARIABLES
//---------------------------------------------------
var characters = {
	"bobafett": {
		name: "Boba Fett",
		healthpoints: 120,
		attackpower: 8,
		counterattack: 15,
	},
	"chewy": {
		name: "Chewy",
		healthpoints: 180,
		attackpower: 17,
		counterattack: 4,
	},
	"darthvader": {
		name: "Darth Vader",
		healthpoints: 140,
		attackpower: 13,
		counterattack: 20,
	},
	"luke": {
		name: "Luke",
		healthpoints: 140,
		attackpower: 15,
		counterattack: 17,
	},
	"obiwan": {
		name: "Obi Wan",
		healthpoints: 110,
		attackpower: 13,
		counterattack: 17,
	},
	"yoda": {
		name: "Yoda",
		healthpoints: 90,
		attackpower: 12,
		counterattack: 21,
	},
}

var chosenCharacter
var chosenOpponent
var allOpponents
















// FUNCTIONS
//---------------------------------------------------



var applyClasses = function() {
	// Assign whichever fighter is clicked first to the chosenCharacter variable
	$(".fighter").off().on("click", function() {
		chosenCharacter = this;
		$(chosenCharacter).addClass('player1').removeClass('fighter');
		$('.fighter').addClass('opponent').removeClass('fighter');
		$("#choose").html("<h3>CHOOSE YOUR OPPONENT</h3>");
		$("#attacker").append($(this));
		applyClasses();
		console.log(chosenCharacter);
	});

// Change "Choose Your Fighter" to "Choose Your Opponent" and assign choice to chosenOpponent (prevent same choice twice)
	$(".opponent").off().on("click", function() {
		chosenOpponent = this;
		$(chosenOpponent).addClass('player2').removeClass('opponent');
		$('.opponent').addClass('others animated fadeOutDown').removeClass('opponent');
		$("#choose").html("<h3>FIGHT!</h3>");
		$("#defender").append($(this));
		$('#character-select').fadeOut(1000);
		$('#attack-button').removeClass('hide');
		applyClasses();
		console.log(chosenOpponent);
	});
}













// MAIN PROCESSES
//---------------------------------------------------


applyClasses();

})










// No matter what I do, I can't get the first on click event to stop running/assigning new characters
// into the chosenCharacter variable with each subsequent click.

// Also, I'm not 100% sure how I'm going to connect the divs I've created for each character in the HTML
// document with the characters array I've created in here with objects and properties that I'll need for
// the fighting to work




// * When the game starts, the player will choose a character by clicking on the fighter's picture. The player will fight as that character for the rest of the game.

//    * The player must then defeat all of the remaining fighters. Enemies should be moved to a different area of the screen.

//    * The player chooses an opponent by clicking on an enemy's picture.

//    * Once the player selects an opponent, that enemy is moved to a `defender area`.

//    * The player will now be able to click the `attack` button.
//      * Whenever the player clicks `attack`, their character damages the defender. The opponent will lose `HP` (health points). These points are displayed at the bottom of the defender's picture. 
//      * The opponent character will instantly counter the attack. When that happens, the player's character will lose some of their `HP`. These points are shown at the bottom of the player character's picture.

// 3. The player will keep hitting the attack button in an effort to defeat their opponent.

//    * When the defender's `HP` is reduced to zero or below, remove the enemy from the `defender area`. The player character can now choose a new opponent.

// 4. The player wins the game by defeating all enemy characters. The player loses the game the game if their character's `HP` falls to zero or below.

// ##### Option 2 Game design notes

// * Each character in the game has 3 attributes: `Health Points`, `Attack Power` and `Counter Attack Power`.

// * Each time the player attacks, their character's Attack Power increases by its base Attack Power. 
//   * For example, if the base Attack Power is 6, each attack will increase the Attack Power by 6 (12, 18, 24, 30 and so on).
// * The enemy character only has `Counter Attack Power`. 

//   * Unlike the player's `Attack Points`, `Counter Attack Power` never changes.

// * The `Health Points`, `Attack Power` and `Counter Attack Power` of each character must differ.

// * No characters in the game can heal or recover Health Points. 

//   * A winning player must pick their characters wisely by first fighting an enemy with low `Counter Attack Power`. This will allow them to grind `Attack Power` and to take on enemies before they lose all of their `Health Points`. Healing options would mess with this dynamic.

// * Your players should be able to win and lose the game no matter what character they choose. The challenge should come from picking the right enemies, not choosing the strongest player.