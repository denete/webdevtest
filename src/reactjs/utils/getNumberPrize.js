const getNumberPrize = (value) => {
    var matches = [];
    const regex = /\d|\$|,/g;
    matches = value.match(regex);
    return matches.join("");
};

export { getNumberPrize };