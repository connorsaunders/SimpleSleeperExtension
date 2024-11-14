// Add heatmap to players 
import { resetInGameItemColors } from './reset-in-game-colors'; // Import resetInGameItemColors
import { resetScoreDifference } from './reset-score-difference'; // Import resetScoreDifference
import { checkFlexGrow } from './check-flex-grow'; // Import checkFlexGrow

export function colorPlayers(allPlayers) {

    // Reset in-game color scheme and individual player score differences
    resetInGameItemColors();
    resetScoreDifference();
    
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
        checkFlexGrow(playerItem1, 1);
        checkFlexGrow(playerItem2, 2);
        
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
        playerItem1.style.boxShadow = '1px 1px 3px rgba(0, 0, 0, 0.3)'
        playerItem2.style.borderRadius = playerItem2.style.borderRadius = '10px';
        playerItem2.style.boxShadow = '1px 1px 3px rgba(0, 0, 0, 0.3)'

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
        differenceElement1.style.color = difference > 0 ? 'rgb(4,204,188)' : (difference < 0 ? 'rgb(251,44,107)' : 'white');

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
        differenceElement2.style.color = differenceScore2 < 0 ? 'rgb(251,44,107)' : (differenceScore2 > 0 ? 'rgb(4,204,188)' : 'white');
    }
}