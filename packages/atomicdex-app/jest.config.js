const ipc = require('./__mocks__/electron-better-ipc.js');

module.exports = {
  // verbose: true,
  testURL: 'http://localhost/',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/internals/mocks/fileMock.js',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    'electron-util': '<rootDir>/__mocks__/electron-util.js',
    'electron-better-ipc': '<rootDir>/__mocks__/electron-better-ipc.js',
    electron: '<rootDir>/internals/mocks/electron.js',
    level$: '<rootDir>/internals/mocks/level.js',
    'utils/config$': '<rootDir>/__mocks__/config.js'
  },
  moduleFileExtensions: ['js', 'json'],
  moduleDirectories: ['node_modules', 'app/node_modules'],
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  // collectCoverageFrom: [
  //   'app/**/*.{js,jsx}',
  //   '!app/dist/**',
  //   '!**/node_modules/**',
  //   '!**/packages/**'
  // ],
  setupFiles: ['./internals/scripts/CheckBuiltsExist.js'],
  testRegex: '(/__tests__/.*)\\.jsx?$',
  collectCoverage: true,
  globals: {
    ipc
  }
};
