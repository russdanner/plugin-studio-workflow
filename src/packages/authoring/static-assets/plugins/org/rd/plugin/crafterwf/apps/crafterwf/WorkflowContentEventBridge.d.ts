/**
 * Preview / in-context saves use Studio's preview content pipeline, which does not run
 * content-type controller.groovy lifecycle scripts. Bridge those saves to the plugin
 * content-event REST endpoint so workflow listeners still run.
 */
export declare function WorkflowContentEventBridge(): any;
export default WorkflowContentEventBridge;
