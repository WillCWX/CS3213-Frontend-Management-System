const path = require('path')

const rootDir = path.resolve(__dirname, '..')

/** resolves from test to snapshot path */
module.exports = {
  // resolves from test to snapshot path
  resolveSnapshotPath: (testPath: string, snapshotExtension: string) =>
    testPath.replace('src', '__snapshots__') + snapshotExtension,

  // resolves from snapshot to test path
  resolveTestPath: (snapshotFilePath: string, snapshotExtension: string) =>
    snapshotFilePath
      .replace('__snapshots__', 'src')
      .slice(0, -snapshotExtension.length),

  // Example test path, used for preflight consistency check of the implementation above
  testPathForConsistencyCheck: 'some/src/example.test.js',
};