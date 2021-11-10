module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  cache: false,
  roots: [
    "<rootDir>"
  ],
  setupFiles: ["<rootDir>/tests/unit/setup.js"],
  // TODO: can i fucking specify unit tests not in the fucking tests folder without losing my fucking mind??
  // "test:unit": "vue-cli-service test:unit --testPathIgnorePatterns=['<rootDir>/node_modules/', '<rootDir>/tests/']",

  // TODO: this runs unit tests everywhere (e2e tests dont have '.spec.' in them)
  testMatch: [
    "<rootDir>/**/*.spec.[jt]s?(x)",
  ],
  transformIgnorePatterns: ['/node_modules/(?!@babel)'],
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    // '<rootDir>/tests/unit/setupAfterEnv.js'
  ]

}
