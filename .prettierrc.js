module.exports = {
	useTabs: true,
	tabWidth: 4,
	printWidth: 80,
	singleQuote: true,
	trailingComma: 'es5',
	bracketSpacing: true,
	parenSpacing: true,
	jsxBracketSameLine: false,
	semi: true,
	arrowParens: 'always',
	overrides: [
		{
			files: '*.{css,sass,scss}',
			options: {
				singleQuote: false,
				parenSpacing: false,
			},
		},
	],
};
