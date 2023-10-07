//////////////////////////////////////////////////////////////////////////
//                          Content loaded log
//////////////////////////////////////////////////////////////////////////
window.addEventListener("load", function() {
    const observer = new MutationObserver(function(mutations) {
        // Disconnect observer to prevent further mutations during processing
        observer.disconnect();
        
        mutations.forEach(function(mutation) {
            console.log("Mutation detected on body:", mutation);
            checkScores();
        });

        // Re-observe after processing
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


//////////////////////////////////////////////////////////////////////////
//                          Style definitions
//////////////////////////////////////////////////////////////////////////
const styles = `
    .hover-effect.red:hover {
        background-color: rgba(255, 0, 0, 0.50) !important; // for red
    }
    .hover-effect.green:hover {
        background-color: rgba(0, 128, 0, 0.50) !important; // for green
    }
    .hover-effect.yellow:hover {
        background-color: rgba(255, 255, 0, 0.50) !important; // for yellow
    }
`;


const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

let retryCount = 0;
const maxRetries = 10;
let interval;

function checkScores() {
    console.log("***** ATTEMPTING TO FIND SCORES *****");

    const users = document.querySelectorAll(".matchup-row .user");
    console.log("******FOUND USERS********:", users.length);

    const scores = document.querySelectorAll(".matchup-row .user .score");
    console.log("******SCORES********:", scores);

    const firstPlayerSection = document.querySelector(".player-section"); // Gets the first .player-section
    const playerScoresInFirstSection = firstPlayerSection ? firstPlayerSection.querySelectorAll(".player-scoring .score") : [];
    console.log("******FOUND PLAYER SCORES IN FIRST SECTION********:", playerScoresInFirstSection.length);
    
    if (playerScoresInFirstSection.length === 18) {
        // Calculate the maximum difference in scores across all matchups.
        let maxDifference = 0;
        for (let i = 0; i < playerScoresInFirstSection.length; i += 2) {
            const score1 = parseFloat(playerScoresInFirstSection[i].textContent.trim()) || 0;
            const score2 = parseFloat(playerScoresInFirstSection[i + 1].textContent.trim()) || 0;
            maxDifference = Math.max(maxDifference, Math.abs(score1 - score2));
        }
    
        for (let i = 0; i < playerScoresInFirstSection.length; i += 2) {
            const score1Element = playerScoresInFirstSection[i];
            const score2Element = playerScoresInFirstSection[i + 1];
    
            // Check if either score contains '-'
            const isScore1Dash = score1Element.textContent.trim() === "-";
            const isScore2Dash = score2Element.textContent.trim() === "-";
    
            let score1 = isScore1Dash ? 0 : parseFloat(score1Element.textContent);
            let score2 = isScore2Dash ? 0 : parseFloat(score2Element.textContent);
    
            const difference = Math.abs(score1 - score2);
            const intensity = difference / maxDifference * 0.15 + 0.05;  // Adjust the intensity based on the difference, with a minimum of 0.05
    
            const playerItem1 = score1Element.closest('.matchup-player-item');
            const playerItem2 = score2Element.closest('.matchup-player-item');
    
            if (isScore1Dash) {
                resetBackgroundColor(playerItem1);
            }
            if (isScore2Dash) {
                resetBackgroundColor(playerItem2);
            }
    
            if (score1 < score2) {
                if (playerItem1 && !isScore1Dash) {
                    playerItem1.style.backgroundColor = `rgba(255, 0, 0, ${intensity})`;
                    playerItem1.style.borderRadius = '8px';
                }
                if (playerItem2 && !isScore2Dash) {
                    playerItem2.style.backgroundColor = `rgba(0, 128, 0, ${intensity})`;
                    playerItem2.style.borderRadius = '8px';
                }
            } else if (score1 > score2) {
                if (playerItem1 && !isScore1Dash) {
                    playerItem1.style.backgroundColor = `rgba(0, 128, 0, ${intensity})`;
                    playerItem1.style.borderRadius = '8px';
                }
                if (playerItem2 && !isScore2Dash) {
                    playerItem2.style.backgroundColor = `rgba(255, 0, 0, ${intensity})`;
                    playerItem2.style.borderRadius = '8px';
                }
            } else {  // they are tied
                if (playerItem1 && !isScore1Dash) {
                    playerItem1.style.backgroundColor = `rgba(255, 255, 0, ${intensity})`;
                    playerItem1.style.borderRadius = '8px';
                }
                if (playerItem2 && !isScore2Dash) {
                    playerItem2.style.backgroundColor = `rgba(255, 255, 0, ${intensity})`;
                    playerItem2.style.borderRadius = '8px';
                }
            }
        }
    }
    


    if (users.length === 2 && scores.length === 2) {
        // Check if either score contains '-'
        const isScore1Dash = scores[0].textContent.trim() === "-";
        const isScore2Dash = scores[1].textContent.trim() === "-";

        let score1 = isScore1Dash ? 0 : parseFloat(scores[0].textContent);
        let score2 = isScore2Dash ? 0 : parseFloat(scores[1].textContent);

        const difference = score1 - score2;

    let displayText = "";
    if (difference < 0) {
        displayText = `Losing by ${difference.toFixed(2)}`;
    } else if (difference > 0) {
        displayText = `Winning by ${difference.toFixed(2)}`;
    } else {
        displayText = 'Tied'
    }

    let displayElement = document.querySelector("#scoreDifferenceDisplay");

    if (!displayElement) {
        displayElement = document.createElement("div");
        displayElement.id = "scoreDifferenceDisplay"; 
        document.body.appendChild(displayElement);
    }

    displayElement.textContent = displayText;

    displayElement.style.padding = '10px';
    displayElement.style.textAlign = 'center';
    displayElement.style.backgroundColor = difference < 0 ? 'rgba(255, 0, 0, 0.15)' : (difference === 0 ? 'rgba(255, 255, 0, 0.15)' : 'rgba(0, 128, 0, 0.15)');
    displayElement.style.fontSize = '16px';
    displayElement.style.marginTop = '0px'; 
    displayElement.style.marginBottom = '10px'; 
    displayElement.style.borderRadius = '8px';

    const matchupHeader = document.querySelector('.matchup-row');
    if (matchupHeader && matchupHeader.parentNode) {
        matchupHeader.parentNode.insertBefore(displayElement, matchupHeader.nextSibling);
    }

    const ownerItems = document.querySelectorAll('.matchup-owner-item');
        if (ownerItems.length === 2) {
            const ownerItem1 = ownerItems[0];
            const ownerItem2 = ownerItems[1];

            if (isScore1Dash) {
                resetBackgroundColor(ownerItem1);
            }
            if (isScore2Dash) {
                resetBackgroundColor(ownerItem2);
            }

            if (difference < 0) {
                if (!isScore1Dash) {
                    ownerItem1.style.backgroundColor = 'rgba(255, 0, 0, 0.15)';
                }
                if (!isScore2Dash) {
                    ownerItem2.style.backgroundColor = 'rgba(0, 128, 0, 0.15)';
                }
            } else if (difference > 0) {
                if (!isScore1Dash) {
                    ownerItem1.style.backgroundColor = 'rgba(0, 128, 0, 0.15)';
                }
                if (!isScore2Dash) {
                    ownerItem2.style.backgroundColor = 'rgba(255, 0, 0, 0.15)';
                }
            } else {  // tie
                if (!isScore1Dash) {
                    ownerItem1.style.backgroundColor = 'rgba(255, 255, 0, 0.15)';
                }
                if (!isScore2Dash) {
                    ownerItem2.style.backgroundColor = 'rgba(255, 255, 0, 0.15)';
                }
            }
        }

        clearInterval(interval);
    } else if (retryCount >= maxRetries) {
    console.log('Max retries reached, giving up...');
    clearInterval(interval);
} else {
    console.log('Could not find the scores, retrying...');
    retryCount++;
}
}
function resetBackgroundColor(element) {
    if (element) {
        element.style.backgroundColor = '';
        element.style.borderRadius = '';
    }
}


interval = setInterval(checkScores, 1000);

