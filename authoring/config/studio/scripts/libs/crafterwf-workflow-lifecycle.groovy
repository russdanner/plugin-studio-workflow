/*
 * Reference snippet — Crafter Studio does NOT support `include` in controller.groovy.
 * Copy the block below into each content-type controller.groovy after CommonLifecycleApi.execute().
 * install-plugin.sh patches controllers automatically via patch-content-lifecycle-controllers.py.
 *
 * import plugins.org.rd.plugin.crafterwf.WorkflowContentLifecycleBridge
 * try {
 *     WorkflowContentLifecycleBridge.handle(
 *         applicationContext, site, path, contentType, contentLifecycleOperation, user
 *     )
 * } catch (Exception ignored) {
 * }
 */
