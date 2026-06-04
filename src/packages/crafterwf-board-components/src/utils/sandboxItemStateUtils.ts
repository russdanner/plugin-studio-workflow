/** Local copy of Studio ItemDisplay state helpers (avoid broken `craftercms.components.utils` external). */

export type SandboxItemStateMap = Record<string, boolean | undefined>;

export function getItemStateId(stateMap: SandboxItemStateMap): string | null {
  switch (true) {
    case stateMap.deleted:
      return 'deleted';
    case stateMap.systemProcessing:
      return 'systemProcessing';
    case stateMap.locked:
      return 'locked';
    case stateMap.disabled:
      return 'disabled';
    case stateMap.submittedToLive:
      return 'submittedToLive';
    case stateMap.submittedToStaging:
      return 'submittedToStaging';
    case stateMap.submitted:
      return 'submitted';
    case stateMap.scheduled:
      return 'scheduled';
    case stateMap.new:
      return 'new';
    case stateMap.modified:
      return 'modified';
    case stateMap.publishing:
      return 'publishing';
    case stateMap.staged:
      return 'staged';
    case stateMap.live:
      return 'live';
    default:
      return null;
  }
}

export function isInWorkflow(stateMap: SandboxItemStateMap | undefined): boolean {
  return stateMap
    ? Boolean(
        stateMap.deleted ||
          stateMap.disabled ||
          stateMap.systemProcessing ||
          stateMap.locked ||
          stateMap.submittedToLive ||
          stateMap.submittedToStaging ||
          stateMap.submitted ||
          stateMap.scheduled ||
          stateMap.new ||
          stateMap.modified ||
          stateMap.publishing
      )
    : false;
}
