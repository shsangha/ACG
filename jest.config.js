module.exports = {
  transform: {
    "^.+\\.jsx?$": `<rootDir>/jest-preprocess.js`,
  },
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/__mocks__/file-mock.js`,
    "animation.gsap":
      "<rootDir>/node_modules/scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js",
  },
  testPathIgnorePatterns: [`node_modules`, `.cache`, `public`],
  transformIgnorePatterns: [
    `node_modules/(?!(gatsby)/)`,
    "node_modules/?!(gsap)",
  ],
  globals: {
    __PATH_PREFIX__: ``,
  },

  testURL: `http://localhost`,
  setupFiles: [
    `<rootDir>/loadershim.js`,
    "<rootDir>/setupTestFiles/fetchMock.js",
    "<rootDir>/setupTestFiles/intersectionObserverMock.js",
  ],
  setupFilesAfterEnv: ["<rootDir>/setupTestFiles/extendDomMatchers.js"],
}
