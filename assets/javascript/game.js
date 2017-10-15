// Prepare document for jQuery and run after HTML loads
$(document).ready(function() {
// GLOBAL VARIABLES
//---------------------------------------------------
	var characters = {
		"Boba Fett": {
			name: "Boba Fett",
			healthpoints: 120,
			attackpower: 8,
			counterattack: 15,
			imageUrl: "assets/images/bobafett.png"
		},
		"Chewy": {
			name: "Chewy",
			healthpoints: 180,
			attackpower: 17,
			counterattack: 4,
			imageUrl: "assets/images/chewy.png"
		},
		"Darth Vader": {
			name: "Darth Vader",
			healthpoints: 140,
			attackpower: 13,
			counterattack: 20,
			imageUrl: "assets/images/darthvader.png"
		},
		"Luke": {
			name: "Luke",
			healthpoints: 140,
			attackpower: 15,
			counterattack: 17,
			imageUrl: "assets/images/luke.png"
		},
		"Obi Wan": {
			name: "Obi Wan",
			healthpoints: 110,
			attackpower: 13,
			counterattack: 17,
			imageUrl: "assets/images/obiwan.png"
		},
		"Yoda": {
			name: "Yoda",
			healthpoints: 90,
			attackpower: 12,
			counterattack: 21,
			imageUrl: "assets/images/yoda.png"
		}
	};

	//Will be populated when the player selects a character.
	var currSelectedCharacter;
	// Populated with all characters player did not pick.
	var combatants = [];
	// Populated when player picks an opponent.
	var currDefender;
	// Will keep track of damage and turns.
	var turnCounter = 1;
	// Tracks number of defeated opponents.
	var killCount = 0;



// FUNCTIONS
//---------------------------------------------------

	// This function will render the characters to the page.
	// The character rendered and the area they are rendered to.
	var renderOne = function(character, renderArea, charStatus) {
		var charDiv = $("<div class='character' data-name='" + character.name + "'>");
		var charName = $("<div class='character-name'>").text(character.name);
		var charImage = $("<img class='character-image'>").attr("src", character.imageUrl);
		var charHealth = $("<div class='character-health'>").text(character.healthpoints);
		charDiv.append(charName).append(charImage).append(charHealth);
		$(renderArea).append(charDiv);

		// If the character is an enemy or defender (the active opponent), add the appropriate class.
		if (charStatus === "enemy") {
			$(charDiv).addClass("enemy");
		}
		else if (charStatus === "defender") {
			// Populate currDefender with the selected opponents information.
			currDefender = character;
			$(charDiv).addClass("target-enemy");
		}
	};

	var renderMessage = function (message) {
		// Builds the message and appends it to the page.
		var gameMessageSet = $("#game-messages");
		var newMessage = $("<div>").text(message);
		gameMessageSet.append(newMessage);
		// If we get this specific message passed in, clear the message
		if (message === "clearMessage") {
			gameMessageSet.text("");
		}
	}

	var renderCharacters = function(charObj, areaRender) {
		// "characters-section" is the div where all our characters begin
		// If true, render all characters to the starting area.
		if (areaRender === "#characters-section") {
			$(areaRender).empty();
			// Loop through the characters object and call the renderOne function.
			for (var key in charObj) {
				if (charObj.hasOwnProperty(key)) {
					renderOne(charObj[key], areaRender, "");
				}
			}
		}

		// "selected-character" is the div where our selected character a
		// If true, render the selected player character to this area.
		if (areaRender === "#selected-character") {
			renderOne(charObj, areaRender, "");
		}

		// "available-to-attack" is the div where our "inactive" opponent
		// If true, render the selected character to this area
		if (areaRender === "#available-to-attack-section") {
			// Loop through the combatants array and call the renderOne function.
			for (var i = 0; i < charObj.length; i++) {
				renderOne(charObj[i], areaRender, "enemy");
			}
			// Creates an on click event for each enemy.
			$(document).on("click", ".enemy", function() {
				var name = ($(this).attr("data-name"));

				// If there is no defender, the clicked enemy will become the defender.
				if ($("#defender").children().length === 0) {
					renderCharacters(name, "#defender");
					$(this).hide();
					renderMessage("clearMessage");
				}
			});
		}

		// "defender" is the div where the active opponent appears.
		// If true, render the selected enemy in this location.
		if (areaRender === "#defender") {
			$(areaRender).empty();
			for (var i = 0; i < combatants.length; i++) {
				if (combatants[i].name === charObj) {
					renderOne(combatants[i], areaRender, "defender");
				}
			}
		}

		// Re-render defender when attacked.
		if (areaRender === "playerDamage") {
			$("#defender").empty();
			renderOne(charObj, "#defender", "defender");
		}

		// Re-render player when counterattacked.
		if (areaRender === "enemyDamage") {
			$("#selected-character").empty();
			renderOne(charObj, "#selected-character", "");
		}

		// Remove defeated enemy.
		if (areaRender === "enemyDefeated") {
			$("#defender").empty();
			var gameStateMessage = "You have defeated " + charObj.name + ", choose your next opponent.";
			renderMessage(gameStateMessage);
		}
	};

	// Function which handles restarting the game after defeat or victory.
	var restartGame = function(inputEndGame) {
		
		// When the restart button is clicked, reload the page.
		var restart = $("<button>Restart</button>").click(function() {
			location.reload();
		});

		// Build div that will display the victory/defeat message
		var gameState = $("<div>").text(inputEndGame);

		// Render the restart button and victory/defeat message to page.
		$("body").append(gameState);
		$("body").append(restart);
	};

	$(document).on("click", ".character", function() {
		var name = $(this).attr("data-name");
		// If a player has not yet been chosen...
		if (!currSelectedCharacter) {
			// We populate currSelectedCharacter with the selected character's information
			currSelectedCharacter = characters[name];
			// We then loop through the remaining characters and push them to the combatants array.
			for (var key in characters) {
				if (key !== name) {
					combatants.push(characters[key]);
				}
			}

			console.log(combatants);
			// Hide the character select div.
			$("#characters-section").hide();

			// Then render our selected character and our combatants.
			renderCharacters(currSelectedCharacter, "#selected-character");
			renderCharacters(combatants, "#available-to-attack-section");
		}
	});

	// When you click the attack button, run the following game logic...
	$("#attack-button").on("click", function() {
		if ($("#defender").children().length !== 0) {

			// Creates messages for player's attack and opponent counterattack
			var attackMessage = "You attacked " + currDefender.name + " for " + (currSelectedCharacter.attack * turnCounter) + " damage.";
			var counterAttackMessage = currDefender.name + " attacked you back for " + currDefender.enemyCounterAttack + " damage.";
			renderMessage("clearMessage");


			// Reduce enemy health by player attack value
			currDefender.healthpoints -= (currSelectedCharacter.attack * turnCounter)

			// If the enemy still has health...
			if (currDefender.healthpoints > 0) {

				// Render the enemy's updated character icon.
				renderCharacters(currDefender, "playerDamage");

				// Render the combat messages.
				renderMessage(attackMessage);
				renderMessage(counterAttackMessage);

				// Reduce your health by the opponent's counter attack value.
				currSelectedCharacter.healthpoints -= currDefender.enemyCounterAttack;

				// Render the player's updated character card
				renderCharacters(currSelectedCharacter, "enemyDamage");

				// If player has less than zero health the game ends
				if (currSelectedCharacter.health <= 0) {
					renderMessage("clearMessage");
					restartGame("You have been killed");
					$("attack-button").unbind("click");
				} 
			}
			else {
				// Remove character icon
				renderCharacters(currDefender, "enemyDefeated");
				// Increment the kill count
				killCount++;
				// If all opponents have been killed, player wins
				if (killCount >= 5) {
					renderMessage("clearMessage");
					renderMessage("You Won!");
				}
			}
		}
		turnCounter++;
	});
		













// MAIN PROCESSES
//---------------------------------------------------

// Render all characters to the page when the game starts
	renderCharacters(characters, "#characters-section");
});