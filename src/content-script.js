import { colorPlayers } from "../utils/color-players";
import { displayScoreDifference } from "../utils/score-difference";

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
function main() {

    // Fetch both users (opponent and yourself)
    // Fetch both scores for users (2 divs)
    // Fetch all players sections (opponent and your players grouped by position)
    // Filter above by scores only
    const users = document.querySelectorAll(".matchup-row .user");
    const scores = document.querySelectorAll(".matchup-row .user .score");
    const allPlayers = document.querySelector(".player-section"); 

    colorPlayers(allPlayers);
    displayScoreDifference(users, scores);
}
