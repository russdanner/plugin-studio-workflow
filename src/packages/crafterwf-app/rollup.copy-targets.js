const path = require('path');

/**
 * Optional post-build copy into the Crafter Studio plugin static-assets tree.
 * Set PLUGIN_DEPLOY_PATH to enable, e.g.:
 *   PLUGIN_DEPLOY_PATH=../../../authoring/static-assets/plugins/org/rd/plugin/crafterwf/apps/crafterwf yarn dist
 */
function getPluginCopyTargets() {
  const deployPath = process.env.PLUGIN_DEPLOY_PATH;
  if (!deployPath) {
    return [];
  }
  return [
    {
      src: './dist/*',
      dest: path.resolve(deployPath)
    }
  ];
}

module.exports = { getPluginCopyTargets };
