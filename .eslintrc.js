module.exports = {
	"root": true,
	"env": {
		"browser": true,
		"commonjs": true,
		"es6": true,
		"node": true
	},
	"extends": "eslint:recommended",
	"parserOptions": {
		"ecmaVersion": 2018
	},
	"rules": {
		"indent": [
			"error",
			"tab",
			{ "SwitchCase": 1 }
		],
		"linebreak-style": [
			"error",
			"windows"
		],
		"quotes": [
			"error",
			"single",
			{ "allowTemplateLiterals": true }
		],
		"semi": [
			"error",
			"always"
		],
		"no-console": 0,
		"global-require": "error",
		"arrow-parens": ["error", "as-needed"],
		"no-confusing-arrow": "error",
		"no-template-curly-in-string": "error",
		"no-empty-function": "error",
		"no-throw-literal": "error",
		"space-before-function-paren": "error",
		"no-unused-vars": ["error", { "args": "none", "ignoreRestSiblings": true, "vars": "all" }],
		"strict": ["error", "global"]
	}
};
