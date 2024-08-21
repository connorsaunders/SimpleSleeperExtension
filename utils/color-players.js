export function colorPlayers(allPlayers) {

    const allPlayersScores = allPlayers ? allPlayers.querySelectorAll(".player-scoring .score") : [];

    console.log('colorPlayers function is running');

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

        const isScore1Dash = score1Element.textContent.trim() === "-";
        const isScore2Dash = score2Element.textContent.trim() === "-";
        let score1 = isScore1Dash ? 0 : parseFloat(score1Element.textContent);
        let score2 = isScore2Dash ? 0 : parseFloat(score2Element.textContent);

        const difference = Math.abs(score1 - score2);
        const intensity = difference / maxDifference * 0.15 + 0.05;

        const playerItem1 = score1Element.closest('.matchup-player-item');
        const playerItem2 = score2Element.closest('.matchup-player-item');

        playerItem1.style.borderRadius = '8px';
        playerItem2.style.borderRadius = '8px';

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

        // // Create and insert "Here" element below each player item
        // const hereElement1 = document.createElement('div');
        // hereElement1.textContent = 'Here';
        // hereElement1.className = 'color-label'; // Optional: Add a class for styling
        // playerItem1.appendChild(hereElement1);

        // const hereElement2 = document.createElement('div');
        // hereElement2.textContent = 'Here';
        // hereElement2.className = 'color-label'; // Optional: Add a class for styling
        // playerItem2.appendChild(hereElement2);
    }
}
