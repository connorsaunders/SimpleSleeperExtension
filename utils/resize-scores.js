export function resizeScoreElement() {
    // Select all score elements within the class `.roster-score-and-projection-matchup`
    const scoreElements = document.querySelectorAll(".roster-score-and-projection-matchup .score");
    
    // Loop through all the matching elements and apply the styles
    scoreElements.forEach(scoreElement => {
        scoreElement.style.fontSize = "22px";      // Adjust the size as needed
        scoreElement.style.fontWeight = "normal";  // Unbold the text by setting it to "normal"
    });
}
