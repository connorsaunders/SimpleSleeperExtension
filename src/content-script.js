import { colorPlayers } from "../utils/color-players";
import { displayScoreDifference } from "../utils/score-difference";

// Mutation Observer
window.addEventListener("load", function () {
    const observer = new MutationObserver(function (mutations) {
        observer.disconnect();

        mutations.forEach(function (mutation) {
            checkScores();
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

// Background color changes
const style = document.createElement('style');
style.textContent = `
    .in-game {
        background-color: transparent !important;
    }
    .in-game-flip {
        background-color: transparent !important;
    }
`;

document.head.appendChild(style);
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
document.head.appendChild(styleSheet);

// Check scores function
function checkScores() {
    // Fetch both users (opponent and yourself)
    const users = document.querySelectorAll(".matchup-row .user");

    // Fetch both scores for users (2 divs)
    const scores = document.querySelectorAll(".matchup-row .user .score");

    // Fetch all players sections (opponent and your players grouped by position)
    const allPlayers = document.querySelector(".player-section"); 
    
    // Filter above by scores only
    const allPlayersScores = allPlayers ? allPlayers.querySelectorAll(".player-scoring .score") : [];

    colorPlayers(allPlayersScores);
    displayScoreDifference(users, scores);
}
