/**
 * @format
 */

module.exports = {
  project: {
    ios: {},
    android: {},
  },
  // Same layout as the citizen app, so `npx react-native-asset` finds the DM
  // Sans faces and copies them into both native projects.
  assets: ['./src/assets/fonts'],
};
