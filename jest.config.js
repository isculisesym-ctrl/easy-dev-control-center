module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './',
  testMatch: ['**/__tests__/**/*.test.ts', '**/?(*.)+(spec|test).ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/__tests__/**',
    '!src/bin/**',
  ],
  coveragePathIgnorePatterns: ['/node_modules/'],
  setupFilesAfterEnv: [],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(chalk|ansi-styles|supports-color|strip-ansi)/)',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
