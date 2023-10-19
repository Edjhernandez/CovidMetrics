module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    // setupFiles: ['./jest.setup.ts'],
    setupFilesAfterEnv: ['./jest.setup.ts'],
    moduleNameMapper: {
        "^.+\\.svg$": "jest-svg-transformer",
	"\\.(css|less|scss)$": "identity-obj-proxy",
  }
}