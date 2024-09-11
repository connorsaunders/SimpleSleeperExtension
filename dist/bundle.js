/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./utils/color-players.js":
/*!********************************!*\
  !*** ./utils/color-players.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   colorPlayers: () => (/* binding */ colorPlayers)
/* harmony export */ });
function colorPlayers(allPlayers) {
  // Reset the colors of in-game items
  resetInGameItemColors();

  // Grab all players scores
  const allPlayersScores = allPlayers ? allPlayers.querySelectorAll(".player-scoring .score") : [];

  // Declare max difference to 0
  let maxDifference = 0;

  // Calculate the max difference between any 2 players of the same position (for conditional formatting)
  for (let i = 0; i < allPlayersScores.length; i += 2) {
    const score1 = parseFloat(allPlayersScores[i].textContent.trim()) || 0;
    const score2 = parseFloat(allPlayersScores[i + 1].textContent.trim()) || 0;
    maxDifference = Math.max(maxDifference, Math.abs(score1 - score2));
  }

  // Iterate through each player score and apply colors
  for (let i = 0; i < allPlayersScores.length; i += 2) {
    const score1Element = allPlayersScores[i];
    const score2Element = allPlayersScores[i + 1];
    const isScore1Dash = score1Element.textContent.trim() === "-";
    const isScore2Dash = score2Element.textContent.trim() === "-";
    let score1 = isScore1Dash ? 0 : parseFloat(score1Element.textContent);
    let score2 = isScore2Dash ? 0 : parseFloat(score2Element.textContent);
    // Reset colors if both scores are dashes
    if (isScore1Dash && isScore2Dash) {
      score1Element.closest('.matchup-player-item').style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
      score2Element.closest('.matchup-player-item').style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
      continue; // Skip further processing if both are dashes
    }
    const difference = parseFloat((score1 - score2).toFixed(2));
    const intensity = Math.abs(difference) / maxDifference * 0.15 + 0.05;
    const playerItem1 = score1Element.closest('.matchup-player-item');
    const playerItem2 = score2Element.closest('.matchup-player-item');
    playerItem1.style.borderRadius = playerItem2.style.borderRadius = '8px';
    if (score1 < score2) {
      // Color based on comparison, if not a dash
      if (!isScore1Dash) {
        playerItem1.style.backgroundColor = `rgba(255, 0, 0, ${intensity})`;
      }
      if (!isScore2Dash) {
        playerItem2.style.backgroundColor = `rgba(0, 128, 0, ${intensity})`;
      }
    } else if (score1 > score2) {
      // Color based on comparison, if not a dash
      if (!isScore1Dash) {
        playerItem1.style.backgroundColor = `rgba(0, 128, 0, ${intensity})`;
      }
      if (!isScore2Dash) {
        playerItem2.style.backgroundColor = `rgba(255, 0, 0, ${intensity})`;
      }
    } else {
      // Both scores are equal
      if (!isScore1Dash) {
        playerItem1.style.backgroundColor = `rgba(255, 255, 0, ${intensity + 0.01})`;
      }
      if (!isScore2Dash) {
        playerItem2.style.backgroundColor = `rgba(255, 255, 0, ${intensity + 0.01})`;
      }
    }
    console.log("DIFFERENCE: ", difference);
    function formatDifference(difference) {
      // Ensure difference has two decimal places
      let formattedDifference = difference.toFixed(2);

      // Add .00 or .x0 if needed
      if (!formattedDifference.includes('.')) {
        formattedDifference += '.00';
      } else if (formattedDifference.split('.')[1].length === 1) {
        formattedDifference += '0';
      }
      return formattedDifference;
    }
    const uniqueId1 = `difference-${i}`;
    const uniqueId2 = `difference-${i + 1}`;

    // Find or create the difference element for score1
    let differenceElement1 = document.querySelector(`#${uniqueId1}`);
    if (!differenceElement1) {
      differenceElement1 = document.createElement('div');
      differenceElement1.id = uniqueId1;
      differenceElement1.className = 'score-difference-added'; // Optional: Add a class for styling
      differenceElement1.style.fontSize = '9px';
      differenceElement1.style.textAlign = 'center';
      differenceElement1.style.marginTop = '3px';
      score1Element.parentNode.insertBefore(differenceElement1, score1Element.nextSibling);
    }
    // Update text content of the existing or newly created element
    differenceElement1.textContent = difference > 0 ? `+${formatDifference(difference)}` : formatDifference(difference);
    differenceElement1.style.color = difference > 0 ? 'rgb(4,204,188)' : difference < 0 ? 'rgb(251,44,107)' : 'white';

    // Find or create the difference element for score2
    let differenceElement2 = document.querySelector(`#${uniqueId2}`);
    if (!differenceElement2) {
      differenceElement2 = document.createElement('div');
      differenceElement2.id = uniqueId2;
      differenceElement2.className = 'score-difference-added'; // Optional: Add a class for styling
      differenceElement2.style.fontSize = '9px';
      differenceElement2.style.textAlign = 'center';
      differenceElement2.style.marginTop = '3px';
      score2Element.parentNode.insertBefore(differenceElement2, score2Element.nextSibling);
    }
    // Calculate the difference for score2Element
    let differenceScore2 = parseFloat((score2 - score1).toFixed(2));

    // Update text content of the existing or newly created element
    differenceElement2.textContent = differenceScore2 > 0 ? `+${formatDifference(differenceScore2)}` : formatDifference(differenceScore2);
    differenceElement2.style.color = differenceScore2 < 0 ? 'rgb(251,44,107)' : differenceScore2 > 0 ? 'rgb(4,204,188)' : 'white';
  }
}
function resetInGameItemColors() {
  const inGameItems = document.querySelectorAll(".matchup-player-body-item.in-game-flip, .matchup-player-body-item.in-game");
  inGameItems.forEach(item => {
    // Reset styles of the main element
    item.style.backgroundColor = 'rgba(255, 255, 255, 0.04)'; // White with 4% opacity
  });
}

/***/ }),

/***/ "./utils/score-difference.js":
/*!***********************************!*\
  !*** ./utils/score-difference.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   displayScoreDifference: () => (/* binding */ displayScoreDifference)
/* harmony export */ });
// src/scoreDifference.js

function displayScoreDifference(users, scores) {
  console.log('displayScoreDifference function is running');
  let retryCount = 0;
  const maxRetries = 1;

  // Check scores function
  function checkScores() {
    // Users and Scores captured:
    if (users.length === 2 && scores.length === 2) {
      // Check if either score contains '-'
      const isScore1Dash = scores[0].textContent.trim() === "-";
      const isScore2Dash = scores[1].textContent.trim() === "-";

      // Declare my score and opponent's score 
      let myScore = isScore1Dash ? 0 : parseFloat(scores[0].textContent);
      let opponentScore = isScore2Dash ? 0 : parseFloat(scores[1].textContent);

      // Difference:
      const difference = myScore - opponentScore;

      // Add difference element:
      let displayText = "";
      // Losing (negative difference):
      if (difference < 0) {
        displayText = `Losing by ${difference.toFixed(2)}`;
        // Winning (positive difference):
      } else if (difference > 0) {
        displayText = `Winning by ${difference.toFixed(2)}`;
        // Tied:
      } else {
        displayText = 'Tied';
      }

      // Create or update element scoreDifferenceDisplay
      let differenceElement = document.querySelector("#scoreDifferenceDisplay");
      if (!differenceElement) {
        differenceElement = document.createElement("div");
        differenceElement.id = "scoreDifferenceDisplay";
        document.body.appendChild(differenceElement);
      }

      // Update display element traits:
      differenceElement.textContent = displayText;
      differenceElement.style.padding = '10px';
      differenceElement.style.textAlign = 'center';
      differenceElement.style.backgroundColor = difference < 0 ? 'rgba(255, 0, 0, 0.15)' : difference === 0 ? 'rgba(64, 64, 64, 0.15)' : 'rgba(0, 128, 0, 0.15)';
      differenceElement.style.fontSize = '16px';
      differenceElement.style.marginTop = '0px';
      differenceElement.style.marginBottom = '10px';
      differenceElement.style.borderRadius = '8px';

      // Insert the element:
      const matchupHeader = document.querySelector('.matchup-row');
      if (matchupHeader && matchupHeader.parentNode) {
        matchupHeader.parentNode.insertBefore(differenceElement, matchupHeader.nextSibling);
      }

      // Change colors for header:
      const ownerItems = document.querySelectorAll('.matchup-owner-item');
      if (ownerItems.length === 2) {
        const ownerItem1 = ownerItems[0];
        const ownerItem2 = ownerItems[1];
        if (difference < 0) {
          ownerItem1.style.backgroundColor = 'rgba(255, 0, 0, 0.15)';
          ownerItem2.style.backgroundColor = 'rgba(0, 128, 0, 0.15)';
        } else if (difference > 0) {
          ownerItem1.style.backgroundColor = 'rgba(0, 128, 0, 0.15)';
          ownerItem2.style.backgroundColor = 'rgba(255, 0, 0, 0.15)';
        } else {
          // tie
          ownerItem1.style.backgroundColor = 'rgba(64, 64, 64, 0.15)';
          ownerItem2.style.backgroundColor = 'rgba(64, 64, 64, 0.15)';
        }
      }
    } else if (retryCount >= maxRetries) {
      console.log('Max retries reached, giving up...');
    } else {
      console.log('Could not find the scores, retrying...');
      retryCount++;
      setTimeout(checkScores, 1000); // Retry after a short delay
    }
  }
  checkScores();
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!*******************************!*\
  !*** ./src/content-script.js ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_color_players__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/color-players */ "./utils/color-players.js");
/* harmony import */ var _utils_score_difference__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/score-difference */ "./utils/score-difference.js");



// Mutation Observer
window.addEventListener("load", function () {
  const observer = new MutationObserver(function (mutations) {
    observer.disconnect();
    mutations.forEach(function (mutation) {
      main();
    });
    observeDOM();
  });
  function observeDOM() {
    observer.observe(document.body, {
      childList: true,
      characterData: true,
      subtree: true
    });
  }
  observeDOM();
});

// Main functionality:
let oldPlayers = null; // Store the previous state globally

function main() {
  // Fetch the current players section
  const allPlayers = document.querySelector(".player-section");

  // Ensure that `allPlayers` exists and has changed since the last call
  if (allPlayers && oldPlayers !== allPlayers.innerHTML) {
    const users = document.querySelectorAll(".matchup-row .user");
    const scores = document.querySelectorAll(".matchup-row .user .score");

    // Apply the custom color formatting and score difference display
    (0,_utils_color_players__WEBPACK_IMPORTED_MODULE_0__.colorPlayers)(allPlayers);
    (0,_utils_score_difference__WEBPACK_IMPORTED_MODULE_1__.displayScoreDifference)(users, scores);

    // Update the oldPlayers state to the current one
    oldPlayers = allPlayers.innerHTML;
  }
}
/******/ })()
;
//# sourceMappingURL=bundle.js.map