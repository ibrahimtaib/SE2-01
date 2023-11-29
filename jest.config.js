module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,jsx}'],
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleDirectories: ["node_modules", "src/controllers"],
    testPathIgnorePatterns: ["/__mocks__/nodemailer.js" ],
}