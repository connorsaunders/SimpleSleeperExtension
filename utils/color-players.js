export function colorPlayers(allPlayers) {
    const allPlayersScores = allPlayers ? allPlayers.querySelectorAll(".player-scoring .score") : [];
    // Declare max difference of 2
    let maxDifference = 0;

    // Calculate the max difference between any 2 players of the same position
    for (let i = 0; i < allPlayersScores.length; i += 2) {
        const score1 = parseFloat(allPlayersScores[i].textContent.trim()) || 0;
        const score2 = parseFloat(allPlayersScores[i + 1].textContent.trim()) || 0;
        maxDifference = Math.max(maxDifference, Math.abs(score1 - score2));
    }

    // Iterate through each player score and apply colors
    for (let i = 0; i < allPlayersScores.length; i += 2) {
        const score1Element = allPlayersScores[i];
        const score2Element = allPlayersScores[i + 1];
        // console.log("Score 1:", score1Element);
        // console.log("Score 2:", score2Element);

        if (!score2Element) continue; // Skip if the second score is undefined
    
        const isScore1Dash = score1Element.textContent.trim() === "-";
        const isScore2Dash = score2Element.textContent.trim() === "-";
        let score1 = isScore1Dash ? 0 : parseFloat(score1Element.textContent);
        let score2 = isScore2Dash ? 0 : parseFloat(score2Element.textContent);
    
        const difference = parseFloat((score1 - score2).toFixed(2));
        const intensity = Math.abs(difference) / maxDifference * 0.15 + 0.05;

        const playerItem1 = score1Element.closest('.matchup-player-item'),
              playerItem2 = score2Element.closest('.matchup-player-item');
  
        playerItem1.style.borderRadius = playerItem2.style.borderRadius = '8px';

        if (score1 < score2) {
            playerItem1.style.backgroundColor = `rgba(255, 0, 0, ${intensity})`;
            playerItem2.style.backgroundColor = `rgba(0, 128, 0, ${intensity})`;
        } else if (score1 > score2) {
            playerItem1.style.backgroundColor = `rgba(0, 128, 0, ${intensity})`;
            playerItem2.style.backgroundColor = `rgba(255, 0, 0, ${intensity})`;
        } else {
            playerItem1.style.backgroundColor = `rgba(255, 255, 0, ${intensity + 0.05})`;
            playerItem2.style.backgroundColor = `rgba(255, 255, 0, ${intensity + 0.05})`;
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
        differenceElement1.textContent = difference >= 0 ? `+${formatDifference(difference)}` : formatDifference(difference);
        differenceElement1.style.color = difference > 0 ? 'rgb(4,204,188)' : (difference < 0 ? 'rgb(251,44,107)' : 'white');

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
        differenceElement2.style.color = differenceScore2 < 0 ? 'rgb(251,44,107)' : (differenceScore2 > 0 ? 'rgb(4,204,188)' : 'white');

    }        
}
