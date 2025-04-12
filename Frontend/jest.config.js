/** @type {import('jest').Config} */
const config = {
    transform: {
        '^.+\\.scss$': 'sass-jest',
        '^.+\\.jsx?$': 'babel-jest',
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleNameMapper: {
        "\\.scss$": "identity-obj-proxy",
    },
    testEnvironment: "jest-environment-jsdom",
};

module.exports = config;