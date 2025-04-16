export default {
  preset: 'ts-jest/presets/default-esm', // Use the ESM-compatible preset
  testEnvironment: 'node',
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '^@src/(.*)$': '<rootDir>/src/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@config$': '<rootDir>/src/config.ts',
    '^@general/(.*)$': '<rootDir>/src/general/$1',
  },
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.(mts|ts|cts|js)$': [
      'ts-jest',
      {
        useESM: true, // Enable ESM in ts-jest
      },
    ],
  },
  setupFiles: ['<rootDir>/.jest/setEnvVars.js'], // Add environment setup
};
