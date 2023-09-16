/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	clearMocks: true,
	coverageProvider: "v8",
	moduleFileExtensions: ["ts", "js", "json", "node"],
	roots: ["."],
	testMatch: ["**/__test__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
	transform: {
		"^.+\\.(ts|tsx)$": "ts-jest",
	},
}
