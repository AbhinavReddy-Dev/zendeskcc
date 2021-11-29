module.exports = {
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"], // this is the KEY
  // note it should be in the top level of the exported object.
  collectCoverage: true,
  coverageReporters: ["json", "html"],

  projects: [
    {
      displayName: "backend",
      testEnvironment: "node",
      testMatch: ["<rootDir>/server/**/*.test.js"],
    },
    {
      displayName: "frontend",
      testEnvironment: "jsdom",
      testMatch: ["<rootDir>/src/**/*.test.js"],
    },
  ],
};
