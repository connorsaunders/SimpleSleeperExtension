// check-flex-grow.js
import { colorStatus } from './add-playing-redzone';

export function checkFlexGrow(playerItem, itemIndex) {
    const possessionIndicator = playerItem.querySelector('.possession-indicator-rate .divider div');
    if (possessionIndicator) {
        const computedStyle = window.getComputedStyle(possessionIndicator);
        const flexGrowValue = parseFloat(computedStyle.flexGrow);

        // Log the flex-grow value
        console.log(`Flex-grow value for player ${itemIndex} is ${flexGrowValue}, which is ${flexGrowValue >= 0.80 ? '>= 0.80' : '< 0.80'}`);

        // Apply the appropriate styles using colorStatus based on the flex-grow value
        const isInRedzone = flexGrowValue >= 0.80;
        colorStatus(playerItem, isInRedzone);
    }
}
