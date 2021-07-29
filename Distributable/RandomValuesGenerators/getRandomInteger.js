export default function getRandomInteger({ minimalValue, maximalValue }) {
    return Math.floor((Math.random() * (maximalValue - minimalValue + 1)) + minimalValue);
}
