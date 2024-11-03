module.exports = {
  preset: "ts-jest", // or remove this line if not using TypeScript
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"], // Ensure this path is correct
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy", // Mock CSS imports
  },
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
};
