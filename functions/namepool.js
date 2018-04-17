/*
 * When adding new items to one of the arrays, make sure there exists
 * an item in the other array starting with a same character.
 * Otherwise the word will never get used due to the app setup, 
 * which pairs adjectives with substantives starting with a same character.
 */

module.exports.getAdjectives = () => {
    return [
        "sexy",
        "clumsy",
        "grumpy",
        "helpful",
        "famous",
        "fancy",
        "handsome",
        "clean",
        "angry",
        "adorable"
    ];
};

module.exports.getSubstantives = () => {
    return [
        "satsuma",
        "carrot",
        "ginger",
        "fig",
        "fennel",
        "lemon",
        "melon",
        "cherry",
        "apple",
        "avocado",
        "hillosipuli"
    ];
};

