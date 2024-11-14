// reset-score-difference.js
export function resetScoreDifference() {
    // Reset difference elements
    const differenceElements = document.querySelectorAll('.score-difference-added');
    differenceElements.forEach(diffElem => {
        diffElem.textContent = '0.00';
        diffElem.style.color = 'white';
    });
}
