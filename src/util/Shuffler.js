/*  From: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

    Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArrayInPlace(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

export default shuffleArrayInPlace;