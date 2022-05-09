// @remove-on-eject-begin
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @remove-on-eject-end
'use strict';

const babelJest = require('babel-jest');
const path = require("path");
const paths = require('../paths');

const hasJsxRuntime = (() => {
  if (process.env.DISABLE_NEW_JSX_TRANSFORM === 'true') {
    return false;
  }

  try {
    require.resolve('react/jsx-runtime');
    return true;
  } catch (e) {
    return false;
  }
})();

module.exports = babelJest.createTransformer({
  include: [
    'src',
    'test',
    path.join(
        paths.appNodeModules,
        "@protobuf-ts",
        "runtime"
    )
  ],
  plugins: [
    ["@babel/plugin-proposal-class-properties", {
      "loose": true
    }],
    ["@babel/plugin-transform-classes", {
      "loose": true
    }]
  ],
  presets: [
    [
      require.resolve('babel-preset-react-app'),
      {
        runtime: hasJsxRuntime ? 'automatic' : 'classic',
      },
    ],
  ],
  babelrc: false,
  configFile: false,
});
