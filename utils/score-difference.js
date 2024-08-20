// src/scoreDifference.js

export function displayScoreDifference(users, scores) {
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
            differenceElement.style.backgroundColor = difference < 0 ? 'rgba(255, 0, 0, 0.15)' : (difference === 0 ? 'rgba(255, 255, 0, 0.15)' : 'rgba(0, 128, 0, 0.15)');
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
            setTimeout(checkScores, 1000); // Retry after a short delay
        }
    }

    checkScores();
}
