export function colorStatus(playerItem, isInRedzone) {
    if (!playerItem) {
        console.error("playerItem is undefined or null.");
        return; // Exit early if the playerItem is not valid
    }

    // Now safely apply the styles
    playerItem.style.borderRadius = '15px';

    if (isInRedzone) {
        playerItem.style.outline = '1px solid rgba(251, 44, 107, 0.5)';
        loadStylesheet('./css/redzone.css');
    } else {
        playerItem.style.outline = '2.5px solid rgba(255, 255, 0, 0.5)';
        loadStylesheet('./css/playing.css');
    }

    playerItem.classList.add('player-item');
}

function loadStylesheet(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = chrome.runtime.getURL(href);
    document.head.appendChild(link);
}