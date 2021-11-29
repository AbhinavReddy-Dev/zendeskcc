module.exports = {
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"], // this is the KEY
  // note it should be in the top level of the exported object.
  collectCoverage: true,
  collectCoverageFrom: ["src/Components/**/*.js", "!**/node_modules/**"],
  coveragePathIgnorePatterns: ["src/jest.config.js", "src/serviceWorker.js"],
  coverageReporters: ["html", "text", "text-summary", "cobertura"],
  testMatch: ["**/*.test.js"],

  projects: [
    {
      displayName: "backend",
      testEnvironment: "node",
      testMatch: ["<rootDir>/server/**/*.test.js"],
    },
    {
      displayName: "frontend",
      testEnvironment: "jsdom",
      testMatch: ["<rootDir>/src/components/**/*.test.js"],
    },
  ],
};
