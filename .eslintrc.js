module.exports = {
	"root": true,
	"env": {
		"browser": true,
		"commonjs": true,
		"es6": true,
		"node": true
	},
	"extends": ["plugin:prettier/recommended"],
	"parserOptions": {
		"ecmaVersion": 2018
	},
	"rules": {
		"linebreak-style": [
			"error",
			"windows"
		],
		"no-console": 0,
		"global-require": "error",
		"no-template-curly-in-string": "error",
		"no-empty-function": "error",
		"no-throw-literal": "error",
		"no-unused-vars": ["error", {
			"args": "none",
			"ignoreRestSiblings": true,
			"vars": "all"
		}],
		"strict": ["error", "global"]
	}
};
