module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature
        'fix',      // Bug fix
        'chore',    // Build / tooling / deps
        'docs',     // Documentation
        'test',     // Tests
        'refactor', // Code refactor (no feature/fix)
        'style',    // Formatting, missing semi-colons, etc.
        'perf',     // Performance improvement
        'ci',       // CI/CD changes
        'revert',   // Revert a commit
      ],
    ],
    'subject-case': [2, 'always', 'lower-case'],
    'subject-max-length': [2, 'always', 100],
    'body-max-line-length': [1, 'always', 120],
    'scope-case': [2, 'always', 'lower-case'],
  },
}
