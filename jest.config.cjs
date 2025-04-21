const path = require("path");

module.exports = {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@context/(.*)$": "<rootDir>/src/context/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
  },  
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.app.json",
    },
  },  
  collectCoverageFrom: ["src/**/*.{ts,tsx, js,jsx}"],
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/dist/"],
};
