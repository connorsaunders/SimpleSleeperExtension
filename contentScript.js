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

// Declare variables
let retryCount = 0;
const maxRetries = 1;

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

    // Declare max difference of 2
    let maxDifference = 0;

    // Iterate through each player score
    // score 1 = your score
    // score 2 = opponent score
    // maxDifference = the maximum difference between any 2 players of the same position
    // Needed for conditional formatting
    for (let i = 0; i < allPlayersScores.length; i += 2) {
        const score1 = parseFloat(allPlayersScores[i].textContent.trim()) || 0;
        const score2 = parseFloat(allPlayersScores[i + 1].textContent.trim()) || 0;
        maxDifference = Math.max(maxDifference, Math.abs(score1 - score2));
    }

    // Iterate through each player score
    // score1Element = player on your team's score
    // score2Element = player on your opponents's score
    // difference = difference between player of same positions scores
    // Add intensity factor with difference * max difference
    for (let i = 0; i < allPlayersScores.length; i += 2) {
        const score1Element = allPlayersScores[i];
        const score2Element = allPlayersScores[i + 1];

        // Trim negatives for list of all positive differences
        const isScore1Dash = score1Element.textContent.trim() === "-";
        const isScore2Dash = score2Element.textContent.trim() === "-";
        let score1 = isScore1Dash ? 0 : parseFloat(score1Element.textContent);
        let score2 = isScore2Dash ? 0 : parseFloat(score2Element.textContent);

        // Get difference
        const difference = Math.abs(score1 - score2);
        const intensity = difference / maxDifference * 0.15 + 0.05; 

        // Get both players of the same positions' cards
        const playerItem1 = score1Element.closest('.matchup-player-item');
        const playerItem2 = score2Element.closest('.matchup-player-item');

        playerItem1.style.borderRadius = '8px';
        playerItem2.style.borderRadius = '8px';

        // Compare positional players:
        // Yours is winning:
        if (score1 < score2) {
                playerItem1.style.backgroundColor = `rgba(255, 0, 0, ${intensity})`;
                playerItem2.style.backgroundColor = `rgba(0, 128, 0, ${intensity})`;
        // Opponent is winning:
        } else if (score1 > score2) {
                playerItem1.style.backgroundColor = `rgba(0, 128, 0, ${intensity})`;
                playerItem2.style.backgroundColor = `rgba(255, 0, 0, ${intensity})`;
        // Tied:
        } else { 
                playerItem1.style.backgroundColor = `rgba(255, 255, 0, ${intensity+.05})`;
                playerItem2.style.backgroundColor = `rgba(255, 255, 0, ${intensity+.05})`;
        }
    }

    // Users and Scores captured:
    if (users.length === 2 && scores.length === 2) {
        // Check if either score contains '-'
        const isScore1Dash = scores[0].textContent.trim() === "-";
        const isScore2Dash = scores[1].textContent.trim() === "-";

        // Declare my score and opponents score 
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
            displayText = 'Tied'
        }
        
        // Create element scoreDifferenceDisplay
        let differenceElement = document.querySelector("#scoreDifferenceDisplay");

        // Add displayElement traits:
        if (!differenceElement) {
            differenceElement = document.createElement("div");
            differenceElement.id = "scoreDifferenceDisplay";
            document.body.appendChild(differenceElement);
            differenceElement.textContent = displayText;
            differenceElement.style.padding = '10px';
            differenceElement.style.textAlign = 'center';
            differenceElement.style.backgroundColor = difference < 0 ? 'rgba(255, 0, 0, 0.15)' : (difference === 0 ? 'rgba(255, 255, 0, 0.15)' : 'rgba(0, 128, 0, 0.15)');
            differenceElement.style.fontSize = '16px';
            differenceElement.style.marginTop = '0px';
            differenceElement.style.marginBottom = '10px';
            differenceElement.style.borderRadius = '8px';
        }

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
            } else {  // tie
                    ownerItem1.style.backgroundColor = 'rgba(255, 255, 0, 0.15)';
                    ownerItem2.style.backgroundColor = 'rgba(255, 255, 0, 0.15)';
                }
            }
        

    } else if (retryCount >= maxRetries) {
        console.log('Max retries reached, giving up...');
    } else {
        console.log('Could not find the scores, retrying...');
        retryCount++;
    }
}

// Reset colors
function resetBackgroundColor(element) {
    if (element) {
        element.style.backgroundColor = '';
        element.style.borderRadius = '';
    }
}

