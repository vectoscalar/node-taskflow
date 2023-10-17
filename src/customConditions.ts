const customConditions = {
    gt: (value, threshold) => value > threshold,
    lt: (value, threshold) => value < threshold,
    eq: (value, threshold) => value === threshold,
    contains: (value, substring) => value.includes(substring),
    sw: (value, prefix) => value.startsWith(prefix),
    ew: (value, suffix) => value.endsWith(suffix),   
    even: (value) => value % 2 === 0,
    odd: (value) => value % 2 !== 0,
    // Add more custom conditions as needed.
};

export default customConditions;
