module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    // setupFiles: ['./jest.setup.ts'],
    setupFilesAfterEnv: ['./jest.setup.ts'],
    moduleNameMapper: {
        '^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg|webp)$': 'jest-transform-stub',
	"\\.(css|less|scss)$": "identity-obj-proxy",
  },  
}

