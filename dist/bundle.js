/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./utils/add-heat-map.js":
/*!*******************************!*\
  !*** ./utils/add-heat-map.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   colorPlayers: () => (/* binding */ colorPlayers)
/* harmony export */ });
/* harmony import */ var _reset_in_game_colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reset-in-game-colors */ "./utils/reset-in-game-colors.js");
/* harmony import */ var _reset_score_difference__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reset-score-difference */ "./utils/reset-score-difference.js");
/* harmony import */ var _check_flex_grow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./check-flex-grow */ "./utils/check-flex-grow.js");
// Add heatmap to players 
 // Import resetInGameItemColors
 // Import resetScoreDifference
 // Import checkFlexGrow

function colorPlayers(allPlayers) {
  // Reset in-game color scheme and individual player score differences
  (0,_reset_in_game_colors__WEBPACK_IMPORTED_MODULE_0__.resetInGameItemColors)();
  (0,_reset_score_difference__WEBPACK_IMPORTED_MODULE_1__.resetScoreDifference)();

  // Fetch all players scores:
  const allPlayersScores = allPlayers ? allPlayers.querySelectorAll(".player-scoring .score") : [];

  // Declare max difference for any 2 starters
  let maxDifference = 0;

  // Calculate the max difference between any 2 players of the same position (for conditional formatting)
  for (let i = 0; i < allPlayersScores.length; i += 2) {
    const score1 = parseFloat(allPlayersScores[i].textContent.trim()) || 0;
    const score2 = parseFloat(allPlayersScores[i + 1].textContent.trim()) || 0;
    maxDifference = Math.max(maxDifference, Math.abs(score1 - score2));
  }

  // Iterate through players and add conditionally formatted colors + differences
  for (let i = 0; i < allPlayersScores.length; i += 2) {
    const score1Element = allPlayersScores[i];
    const score2Element = allPlayersScores[i + 1];
    const isScore1Dash = score1Element.textContent.trim() === "-";
    const isScore2Dash = score2Element.textContent.trim() === "-";
    let score1 = isScore1Dash ? 0 : parseFloat(score1Element.textContent);
    let score2 = isScore2Dash ? 0 : parseFloat(score2Element.textContent);
    const playerItem1 = score1Element.closest('.matchup-player-item');
    const playerItem2 = score2Element.closest('.matchup-player-item');

    // Call the function for both playerItem1 and playerItem2
    (0,_check_flex_grow__WEBPACK_IMPORTED_MODULE_2__.checkFlexGrow)(playerItem1, 1);
    (0,_check_flex_grow__WEBPACK_IMPORTED_MODULE_2__.checkFlexGrow)(playerItem2, 2);

    // Reset colors if both scores are dashes
    if (isScore1Dash && isScore2Dash) {
      const uniqueId1 = `difference-${i}`;
      const uniqueId2 = `difference-${i + 1}`;
      playerItem1.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
      playerItem2.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
      const differenceElement1 = document.querySelector(`#${uniqueId1}`);
      const differenceElement2 = document.querySelector(`#${uniqueId2}`);
      if (differenceElement1) {
        differenceElement1.textContent = "0.00";
        differenceElement1.style.color = 'white';
      }
      if (differenceElement2) {
        differenceElement2.textContent = "0.00";
        differenceElement2.style.color = 'white';
      }
    }
    if (isScore1Dash) {
      playerItem1.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
    }
    if (isScore2Dash) {
      playerItem2.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
    }
    playerItem1.style.borderRadius = playerItem2.style.borderRadius = '10px';
    playerItem1.style.boxShadow = '1px 1px 3px rgba(0, 0, 0, 0.3)';
    playerItem2.style.borderRadius = playerItem2.style.borderRadius = '10px';
    playerItem2.style.boxShadow = '1px 1px 3px rgba(0, 0, 0, 0.3)';
    const difference = parseFloat((score1 - score2).toFixed(2));
    const intensity = Math.abs(difference) / maxDifference * 0.15 + 0.05;
    if (score1 < score2) {
      if (!isScore1Dash) {
        playerItem1.style.backgroundColor = `rgba(255, 0, 0, ${intensity})`;
      }
      if (!isScore2Dash) {
        playerItem2.style.backgroundColor = `rgba(0, 128, 0, ${intensity})`;
      }
    } else if (score1 > score2) {
      if (!isScore1Dash) {
        playerItem1.style.backgroundColor = `rgba(0, 128, 0, ${intensity})`;
      }
      if (!isScore2Dash) {
        playerItem2.style.backgroundColor = `rgba(255, 0, 0, ${intensity})`;
      }
    } else {
      if (!isScore1Dash) {
        playerItem1.style.backgroundColor = `rgba(255, 255, 0, ${intensity + 0.01})`;
      }
      if (!isScore2Dash) {
        playerItem2.style.backgroundColor = `rgba(255, 255, 0, ${intensity + 0.01})`;
      }
    }
    const uniqueId1 = `difference-${i}`;
    const uniqueId2 = `difference-${i + 1}`;
    let differenceElement1 = document.querySelector(`#${uniqueId1}`);
    if (!differenceElement1) {
      differenceElement1 = document.createElement('div');
      differenceElement1.id = uniqueId1;
      differenceElement1.className = 'score-difference-added';
      differenceElement1.style.fontSize = '9px';
      differenceElement1.style.textAlign = 'center';
      differenceElement1.style.marginTop = '3px';
      score1Element.parentNode.insertBefore(differenceElement1, score1Element.nextSibling);
    }
    differenceElement1.textContent = difference > 0 ? `+${difference.toFixed(2)}` : difference.toFixed(2);
    differenceElement1.style.color = difference > 0 ? 'rgb(4,204,188)' : difference < 0 ? 'rgb(251,44,107)' : 'white';
    let differenceElement2 = document.querySelector(`#${uniqueId2}`);
    if (!differenceElement2) {
      differenceElement2 = document.createElement('div');
      differenceElement2.id = uniqueId2;
      differenceElement2.className = 'score-difference-added';
      differenceElement2.style.fontSize = '9px';
      differenceElement2.style.textAlign = 'center';
      differenceElement2.style.marginTop = '3px';
      score2Element.parentNode.insertBefore(differenceElement2, score2Element.nextSibling);
    }
    let differenceScore2 = parseFloat((score2 - score1).toFixed(2));
    differenceElement2.textContent = differenceScore2 > 0 ? `+${differenceScore2.toFixed(2)}` : differenceScore2.toFixed(2);
    differenceElement2.style.color = differenceScore2 < 0 ? 'rgb(251,44,107)' : differenceScore2 > 0 ? 'rgb(4,204,188)' : 'white';
  }
}

/***/ }),

/***/ "./utils/add-playing-redzone.js":
/*!**************************************!*\
  !*** ./utils/add-playing-redzone.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   colorStatus: () => (/* binding */ colorStatus)
/* harmony export */ });
function colorStatus(playerItem, isInRedzone) {
  if (!playerItem) {
    console.error("playerItem is undefined or null.");
    return; // Exit early if the playerItem is not valid
  }

  // Now safely apply the styles
  playerItem.style.borderRadius = '15px';
  if (isInRedzone) {
    playerItem.style.outline = '1px solid rgba(251, 44, 107, 0.5)';
    loadStylesheet('./css/redzone.css');
  } else {
    playerItem.style.outline = '2.5px solid rgba(255, 255, 0, 0.5)';
    loadStylesheet('./css/playing.css');
  }
  playerItem.classList.add('player-item');
}
function loadStylesheet(href) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = chrome.runtime.getURL(href);
  document.head.appendChild(link);
}

/***/ }),

/***/ "./utils/check-flex-grow.js":
/*!**********************************!*\
  !*** ./utils/check-flex-grow.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkFlexGrow: () => (/* binding */ checkFlexGrow)
/* harmony export */ });
/* harmony import */ var _add_playing_redzone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./add-playing-redzone */ "./utils/add-playing-redzone.js");
// check-flex-grow.js

function checkFlexGrow(playerItem, itemIndex) {
  const possessionIndicator = playerItem.querySelector('.possession-indicator-rate .divider div');
  if (possessionIndicator) {
    const computedStyle = window.getComputedStyle(possessionIndicator);
    const flexGrowValue = parseFloat(computedStyle.flexGrow);

    // Log the flex-grow value
    console.log(`Flex-grow value for player ${itemIndex} is ${flexGrowValue}, which is ${flexGrowValue >= 0.80 ? '>= 0.80' : '< 0.80'}`);

    // Apply the appropriate styles using colorStatus based on the flex-grow value
    const isInRedzone = flexGrowValue >= 0.80;
    (0,_add_playing_redzone__WEBPACK_IMPORTED_MODULE_0__.colorStatus)(playerItem, isInRedzone);
  }
}

/***/ }),

/***/ "./utils/reset-in-game-colors.js":
/*!***************************************!*\
  !*** ./utils/reset-in-game-colors.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resetInGameItemColors: () => (/* binding */ resetInGameItemColors)
/* harmony export */ });
// reset-in-game-colors.js
function resetInGameItemColors() {
  const inGameItems = document.querySelectorAll(".matchup-player-body-item.in-game-flip, .matchup-player-body-item.in-game");
  inGameItems.forEach(item => {
    // Reset styles of the main element
    item.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
    item.style.boxShadow = ''; // Reset box-shadow if needed
    item.classList.remove('player-item'); // Remove the class if it's no longer needed
  });
}

/***/ }),

/***/ "./utils/reset-score-difference.js":
/*!*****************************************!*\
  !*** ./utils/reset-score-difference.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resetScoreDifference: () => (/* binding */ resetScoreDifference)
/* harmony export */ });
// reset-score-difference.js
function resetScoreDifference() {
  // Reset difference elements
  const differenceElements = document.querySelectorAll('.score-difference-added');
  differenceElements.forEach(diffElem => {
    diffElem.textContent = '0.00';
    diffElem.style.color = 'white';
  });
}

/***/ }),

/***/ "./utils/resize-scores.js":
/*!********************************!*\
  !*** ./utils/resize-scores.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resizeScoreElement: () => (/* binding */ resizeScoreElement)
/* harmony export */ });
////////////////////////////////////////////////////////////////////////////
// Resize the scores of both teams 
////////////////////////////////////////////////////////////////////////////

function resizeScoreElement() {
  // Select all score elements within the class `.roster-score-and-projection-matchup`
  const scoreElements = document.querySelectorAll(".roster-score-and-projection-matchup .score");

  // Loop through all the matching elements (2) and apply the styles
  scoreElements.forEach(scoreElement => {
    scoreElement.style.fontSize = "18px";
    scoreElement.style.fontWeight = "normal";
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
////////////////////////////////////////////////////////////////////////////
// Create score differential element, add conditional colors to team scores
////////////////////////////////////////////////////////////////////////////

function displayScoreDifference(users, scores) {
  console.log('displayScoreDifference function is running');
  let retryCount = 0;
  const maxRetries = 1;

  ////////////////////////////////////////////////////////////////////////////
  // Check scores
  ////////////////////////////////////////////////////////////////////////////
  function checkScores() {
    // Users and scores captured:
    if (users.length === 2 && scores.length === 2) {
      ////////////////////////////////////////////////////////////////////////////
      // Capture my score and opponents
      ////////////////////////////////////////////////////////////////////////////
      // Check if either score contains '-'
      const isScore1Dash = scores[0].textContent.trim() === "-";
      const isScore2Dash = scores[1].textContent.trim() === "-";

      // Declare my score and opponent's score 
      let myScore = isScore1Dash ? 0 : parseFloat(scores[0].textContent);
      let opponentScore = isScore2Dash ? 0 : parseFloat(scores[1].textContent);

      // Difference:
      const difference = myScore - opponentScore;

      ////////////////////////////////////////////////////////////////////////////
      // Create element display text
      ////////////////////////////////////////////////////////////////////////////
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
      ////////////////////////////////////////////////////////////////////////////
      // Create or update element scoreDifferenceDisplay
      ////////////////////////////////////////////////////////////////////////////
      let differenceElement = document.querySelector("#scoreDifferenceDisplay");
      if (!differenceElement) {
        differenceElement = document.createElement("div");
        differenceElement.id = "scoreDifferenceDisplay";
        document.body.appendChild(differenceElement);
      }
      ////////////////////////////////////////////////////////////////////////////
      // Update display element traits:
      ////////////////////////////////////////////////////////////////////////////
      differenceElement.textContent = displayText;
      differenceElement.style.padding = '10px';
      differenceElement.style.textAlign = 'center';
      differenceElement.style.backgroundColor = difference < 0 ? 'rgba(255, 0, 0, 0.15)' : difference === 0 ? 'rgba(64, 64, 64, 0.15)' : 'rgba(0, 128, 0, 0.15)';
      differenceElement.style.fontSize = '16px';
      differenceElement.style.marginTop = '0px';
      differenceElement.style.marginBottom = '10px';
      differenceElement.style.borderRadius = '8px';
      //differenceElement.style.outline = difference < 0 ? '2px solid rgba(0, 0, 0, 0.4)' : (difference === 0 ? '2px solid rgba(0, 0, 0, 0.4)' : '2px solid rgba(0, 0, 0, 0.4)');
      differenceElement.style.boxShadow = '1px 1px 3px rgba(0, 0, 0, 0.3)';

      ////////////////////////////////////////////////////////////////////////////
      // Insert element:
      ////////////////////////////////////////////////////////////////////////////
      const matchupHeader = document.querySelector('.matchup-row');
      if (matchupHeader && matchupHeader.parentNode) {
        matchupHeader.parentNode.insertBefore(differenceElement, matchupHeader.nextSibling);
      }

      ////////////////////////////////////////////////////////////////////////////
      // Conditional color of score difference element:
      ////////////////////////////////////////////////////////////////////////////
      const ownerItems = document.querySelectorAll('.matchup-owner-item');
      if (ownerItems.length === 2) {
        const ownerItem1 = ownerItems[0];
        const ownerItem2 = ownerItems[1];
        ownerItem1.style.boxShadow = '1px 1px 3px rgba(0, 0, 0, 0.3)';
        ownerItem2.style.boxShadow = '1px 1px 3px rgba(0, 0, 0, 0.3)';
        if (difference < 0) {
          ownerItem1.style.backgroundColor = 'rgba(255, 0, 0, 0.15)';
          ownerItem2.style.backgroundColor = 'rgba(0, 128, 0, 0.15)';
          // ownerItem1.style.outline = '3px 3px 5px rgba(0, 0, 0, 0.3)'; 
          // ownerItem2.style.outline = '3px 3px 5px rgba(0, 0, 0, 0.3)'; 
        } else if (difference > 0) {
          ownerItem1.style.backgroundColor = 'rgba(0, 128, 0, 0.15)';
          ownerItem2.style.backgroundColor = 'rgba(255, 0, 0, 0.15)';
        } else {
          // tie
          ownerItem1.style.backgroundColor = 'rgba(64, 64, 64, 0.15)';
          ownerItem2.style.backgroundColor = 'rgba(64, 64, 64, 0.15)';
          // ownerItem1.style.outline = '3px 3px 5px rgba(0, 0, 0, 0.3)'; 
          // ownerItem2.style.outline = '3px 3px 5px rgba(0, 0, 0, 0.3)';                                 
        }
      }
      // Potential refactor/remove:
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
/* harmony import */ var _utils_add_heat_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/add-heat-map */ "./utils/add-heat-map.js");
/* harmony import */ var _utils_score_difference__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/score-difference */ "./utils/score-difference.js");
/* harmony import */ var _utils_resize_scores__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/resize-scores */ "./utils/resize-scores.js");
/* harmony import */ var _utils_add_playing_redzone__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/add-playing-redzone */ "./utils/add-playing-redzone.js");





////////////////////////////////////////////////////////////////////////////
// Mutation Observer:
////////////////////////////////////////////////////////////////////////////
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

////////////////////////////////////////////////////////////////////////////
// Main functionality:
////////////////////////////////////////////////////////////////////////////
let oldPlayers = null; // Store the previous state globally

function main() {
  // Fetch the current players section
  const allPlayers = document.querySelector(".player-section");

  // Ensure that `allPlayers` exists and has changed since the last call 
  if (allPlayers && oldPlayers !== allPlayers.innerHTML) {
    const users = document.querySelectorAll(".matchup-row .user");
    const scores = document.querySelectorAll(".matchup-row .user .score");

    // Apply the custom color formatting and score difference display
    (0,_utils_add_heat_map__WEBPACK_IMPORTED_MODULE_0__.colorPlayers)(allPlayers);
    (0,_utils_score_difference__WEBPACK_IMPORTED_MODULE_1__.displayScoreDifference)(users, scores);
    (0,_utils_resize_scores__WEBPACK_IMPORTED_MODULE_2__.resizeScoreElement)(); // Call the imported resize function

    // Update the oldPlayers state to the current one
    oldPlayers = allPlayers.innerHTML;
  }
}
/******/ })()
;
//# sourceMappingURL=bundle.js.map