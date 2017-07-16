"use strict"
const insideCircle = function (xClick, yClick, xCenter, yCenter, radius) {
    let dx = xCenter - xClick;
    let dy = yCenter - yClick;

    if (( (((dx ** 2) + (dy ** 2))) ** 0.5) < radius) {
        return true;
    } else {
        return false;
    }
}
export {insideCircle};
