// reset-in-game-colors.js
export function resetInGameItemColors() {
    const inGameItems = document.querySelectorAll(".matchup-player-body-item.in-game-flip, .matchup-player-body-item.in-game");
    inGameItems.forEach(item => {
        // Reset styles of the main element
        item.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
        item.style.boxShadow = ''; // Reset box-shadow if needed
        item.classList.remove('player-item'); // Remove the class if it's no longer needed
    });
}
