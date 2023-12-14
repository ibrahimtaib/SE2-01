module.exports = {
  collectCoverage: true,
  testEnvironment: "node",
  collectCoverageFrom: [
    "src/**/*.{js,jsx}",
    "!src/test*/**",
    "!src/*.js",
    "!src/controllers/prisma.js",
    "!src/routes/auth.js"
  ],
  coverageDirectory: "coverage",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
