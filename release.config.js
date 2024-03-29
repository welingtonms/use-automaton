module.exports = {
	branches: [ 'main', { name: 'beta', prerelease: true } ],
	plugins: [
		[
			'@semantic-release/commit-analyzer',
			{
				preset: 'angular',
				releaseRules: [
					{ type: 'refactor', release: 'patch' },
					{ type: 'style', release: 'patch' },
					{ type: 'release', release: 'patch' },
				],
				parserOpts: {
					noteKeywords: [ 'BREAKING CHANGE', 'BREAKING CHANGES' ],
				},
			},
		],
		'@semantic-release/release-notes-generator',
		[
			'@semantic-release/changelog',
			{
				changelogFile: 'CHANGELOG.md',
			},
		],
		[
			'@semantic-release/npm',
			{
				npmPublish: true,
			},
		],
		'@semantic-release/github',
		[
			'@semantic-release/git',
			{
				assets: [ 'package.json', 'CHANGELOG.md' ],
				message:
					'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
			},
		],
	],
};
