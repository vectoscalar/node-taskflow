const customConditions = {
    greaterThan: (value, threshold) => value > threshold,
    lessThan: (value, threshold) => value < threshold,
    equals: (value, threshold) => value === threshold,
    contains: (value, substring) => value.includes(substring),
    startsWith: (value, prefix) => value.startsWith(prefix),
    endsWith: (value, suffix) => value.endsWith(suffix),
    isEven: (value) => value % 2 === 0,
    isOdd: (value) => value % 2 !== 0,
    // Add more custom conditions as needed.
};

export default customConditions