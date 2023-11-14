module.exports = {
    collectCoverage: true,
    testEnvironment: 'node',
    collectCoverageFrom: ['src/**/*.{js,jsx}'],
    coverageDirectory: 'coverage',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '@prisma/client': "<rootDir>/tests/__mocks__/@prisma/client.js",
  },
}