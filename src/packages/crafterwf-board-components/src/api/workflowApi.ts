import { pluginGet, pluginPost } from './pluginHttp';
import CardRecord from '../types/CardRecord';
import { normalizeBoardBackgroundId } from '../colors';
import { normalizeStepActionType, StepActionType } from '../stepActions';
import {
  CONTENT_RULE_BLOCKED_MESSAGE,
  defaultContentRule,
  defaultRoleRule,
  evaluateStepMove,
  StepContentRule,
  StepRoleRule
} from '../stepRules';

export const PLUGIN_SERVICE_BASE = '/studio/api/2/plugin/script/plugins/org/rd/plugin/crafterwf/crafterwf';

export interface BoardView {
  board: {
    id: string;
    name: string;
    url: null;
    prefs: { backgroundColor?: string; backgroundImage?: string };
  };
  lists: Array<{
    id: string;
    name: string;
    color?: string;
    actionType?: StepActionType;
    allowAddPackage?: boolean;
    roleRule?: StepRoleRule;
    contentRule?: StepContentRule;
    moveBlocked?: boolean;
    moveBlockedMessage?: string;
    cards: CardRecord[];
  }>;
  currentUserGroups?: string[];
}

export interface BoardStepPackageApi {
  id: string;
  title: string;
  description?: string;
  position: number;
  coverColor?: string;
  status: string;
  attachmentCount: number;
  commentCount: number;
  dueOn?: string;
  contentPaths?: string[];
  contentTypes?: string[];
}

export interface BoardApiResponse {
  currentUser?: {
    username?: string;
    groups?: string[];
  };
  workflow: {
    id: string;
    name: string;
    description?: string;
    backgroundUrl?: string;
    position?: number;
  };
  workflowSteps: Array<{
    id: string;
    name: string;
    position: number;
    color?: string;
    isTerminal?: boolean;
    actionType?: string;
    allowAddPackage?: boolean;
    roleRule?: StepRoleRule;
    contentRule?: StepContentRule;
    workflowPackages: BoardStepPackageApi[];
  }>;
}

function normalizeRoleRule(rule?: StepRoleRule): StepRoleRule {
  if (!rule) {
    return defaultRoleRule();
  }
  return {
    mode: rule.mode === 'include' || rule.mode === 'exclude' ? rule.mode : 'all',
    roles: rule.roles ?? []
  };
}

function normalizeContentRule(rule?: StepContentRule): StepContentRule {
  if (!rule) {
    return defaultContentRule();
  }
  return {
    mode: rule.mode === 'any' ? 'any' : 'all',
    pathPatterns: rule.pathPatterns ?? [],
    contentTypes: rule.contentTypes ?? []
  };
}

export function isListMoveBlockedForPackage(
  list: Pick<BoardView['lists'][number], 'roleRule' | 'contentRule' | 'moveBlocked' | 'moveBlockedMessage'>,
  packageSummary: { contentPaths?: string[]; contentTypes?: string[] },
  userGroups: string[]
): { blocked: boolean; message?: string } {
  if (list.moveBlocked) {
    return { blocked: true, message: list.moveBlockedMessage };
  }
  const result = evaluateStepMove(
    normalizeRoleRule(list.roleRule),
    normalizeContentRule(list.contentRule),
    userGroups,
    packageSummary.contentPaths ?? [],
    packageSummary.contentTypes ?? []
  );
  return { blocked: !result.allowed, message: result.message };
}

export function mapBoardResponse(result: BoardApiResponse): BoardView {
  const bg = result.workflow.backgroundUrl;
  const isImage = bg && /^https?:\/\//i.test(bg);
  const userGroups = result.currentUser?.groups ?? [];
  return {
    board: {
      id: result.workflow.id,
      name: result.workflow.name,
      url: null,
      prefs: {
        backgroundColor: isImage ? undefined : normalizeBoardBackgroundId(bg),
        backgroundImage: isImage ? bg : undefined
      }
    },
    currentUserGroups: userGroups,
    lists: result.workflowSteps.map((step) => {
      const roleRule = normalizeRoleRule(step.roleRule);
      const contentRule = normalizeContentRule(step.contentRule);
      return {
        id: step.id,
        name: step.name,
        color: step.color,
        actionType: normalizeStepActionType(step.actionType),
        allowAddPackage: step.allowAddPackage === true,
        roleRule,
        contentRule,
        cards: step.workflowPackages.map((pkg) => ({
          id: pkg.id,
          name: pkg.title,
          desc: pkg.description || '',
          dueOn: pkg.dueOn,
          url: null,
          cover: { color: pkg.coverColor || 'blue' },
          badges: {
            attachments: pkg.attachmentCount || 0,
            comments: pkg.commentCount || 0
          },
          contentPaths: pkg.contentPaths ?? [],
          contentTypes: pkg.contentTypes ?? []
        }))
      };
    })
  };
}

export function loadBoard(siteId: string, workflowId?: string) {
  let url = `${PLUGIN_SERVICE_BASE}/workflow/board.json?siteId=${encodeURIComponent(siteId)}`;
  if (workflowId) {
    url += `&workflowId=${encodeURIComponent(workflowId)}`;
  }
  return pluginGet(url);
}

export function createPackage(
  siteId: string,
  workflowStepId: string,
  title: string,
  description: string,
  coverColor: string
) {
  const url =
    `${PLUGIN_SERVICE_BASE}/workflow-package/create.json?siteId=${encodeURIComponent(siteId)}` +
    `&workflowStepId=${encodeURIComponent(workflowStepId)}` +
    `&title=${encodeURIComponent(title)}` +
    `&description=${encodeURIComponent(description)}` +
    `&coverColor=${encodeURIComponent(coverColor)}`;
  return pluginPost(url);
}

export function movePackage(
  siteId: string,
  workflowPackageId: string,
  workflowStepId: string,
  index: number
) {
  const url =
    `${PLUGIN_SERVICE_BASE}/workflow-package/move.json?siteId=${encodeURIComponent(siteId)}` +
    `&workflowPackageId=${encodeURIComponent(workflowPackageId)}` +
    `&workflowStepId=${encodeURIComponent(workflowStepId)}` +
    `&index=${index}`;
  return pluginPost(url);
}

export interface PackageActionResult {
  stepActionFailed?: boolean | number | string;
  stepActionStatus?: string;
  stepActionMessage?: string;
  userMessage?: string;
  /** Some API serializers may expose the failure text as `message`. */
  message?: string;
  reverted?: boolean;
  workflowStepId?: string;
  step_action_failed?: boolean | number | string;
  step_action_status?: string;
  step_action_message?: string;
  user_message?: string;
  moveBlocked?: boolean;
  moveBlockedReason?: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

function looksLikeStepActionResult(value: unknown): value is PackageActionResult {
  if (!isRecord(value)) {
    return false;
  }
  return (
    'stepActionFailed' in value ||
    'step_action_failed' in value ||
    'moveBlocked' in value ||
    value.moveBlocked === true ||
    value.stepActionStatus === 'failed' ||
    value.step_action_status === 'failed' ||
    (typeof value.userMessage === 'string' && value.userMessage.trim().length > 0) ||
    (typeof value.user_message === 'string' && value.user_message.trim().length > 0)
  );
}

function deepCollectStepActionResults(value: unknown, depth = 0, found: PackageActionResult[] = []): PackageActionResult[] {
  if (!isRecord(value) || depth > 8) {
    return found;
  }

  if (looksLikeStepActionResult(value)) {
    found.push(value as PackageActionResult);
  }

  for (const nested of Object.values(value)) {
    if (isRecord(nested)) {
      deepCollectStepActionResults(nested, depth + 1, found);
    }
  }

  return found;
}

function collectResponseCandidates(response: unknown): PackageActionResult[] {
  const ajaxBody = (response as { response?: unknown })?.response;
  if (!isRecord(ajaxBody)) {
    return [];
  }

  return deepCollectStepActionResults(ajaxBody);
}

export function extractPackageActionResult(response: unknown): PackageActionResult | undefined {
  const flagged = collectResponseCandidates(response);
  if (flagged.length > 0) {
    return flagged[0];
  }

  const ajaxBody = (response as { response?: unknown })?.response;
  if (!isRecord(ajaxBody)) {
    return undefined;
  }

  const payload =
    ajaxBody.result ??
    (isRecord(ajaxBody.response) ? ajaxBody.response.result : undefined) ??
    ajaxBody;

  return isRecord(payload) ? (payload as PackageActionResult) : undefined;
}

function isStepActionFailed(result?: PackageActionResult): boolean {
  if (!result) {
    return false;
  }
  if (result.stepActionStatus === 'failed' || result.step_action_status === 'failed') {
    return true;
  }
  const userMessage = (result.userMessage || result.user_message || '').trim();
  if (userMessage.length > 0) {
    return true;
  }
  const flag = result.stepActionFailed ?? result.step_action_failed;
  if (flag === true || flag === 1 || flag === 'true') {
    return true;
  }
  if (result.reverted === true) {
    const note = (
      result.stepActionMessage ||
      result.step_action_message ||
      result.message ||
      ''
    ).trim();
    return note.length > 0;
  }
  return false;
}

export function getStepActionFailureMessage(result?: PackageActionResult): string | null {
  if (!isStepActionFailed(result)) {
    return null;
  }
  const text = (
    result?.stepActionMessage ||
    result?.step_action_message ||
    result?.userMessage ||
    result?.user_message ||
    result?.moveBlockedReason ||
    result?.message ||
    ''
  ).trim();
  return text || 'The step action failed. The package was moved back to the previous step.';
}

/** Resolve a step-action failure message from a move/create package ajax response. */
export function getPackageActionFailureMessage(response: unknown): string | null {
  const flaggedCandidates = collectResponseCandidates(response);
  for (const candidate of flaggedCandidates) {
    const message = getStepActionFailureMessage(candidate);
    if (message) {
      return message;
    }
  }
  return getStepActionFailureMessage(extractPackageActionResult(response));
}

export function archivePackage(siteId: string, workflowPackageId: string) {
  const url =
    `${PLUGIN_SERVICE_BASE}/workflow-package/archive.json?siteId=${encodeURIComponent(siteId)}` +
    `&workflowPackageId=${encodeURIComponent(workflowPackageId)}`;
  return pluginPost(url);
}

export function updatePackageTitle(siteId: string, workflowPackageId: string, title: string) {
  const url =
    `${PLUGIN_SERVICE_BASE}/workflow-package/update-title.json?siteId=${encodeURIComponent(siteId)}` +
    `&workflowPackageId=${encodeURIComponent(workflowPackageId)}` +
    `&title=${encodeURIComponent(title)}`;
  return pluginPost(url);
}

export function updatePackageDescription(siteId: string, workflowPackageId: string, description: string) {
  const url =
    `${PLUGIN_SERVICE_BASE}/workflow-package/update-description.json?siteId=${encodeURIComponent(siteId)}` +
    `&workflowPackageId=${encodeURIComponent(workflowPackageId)}` +
    `&description=${encodeURIComponent(description)}`;
  return pluginPost(url);
}

export function updatePackageDueOn(siteId: string, workflowPackageId: string, dueOn: string | null) {
  let url =
    `${PLUGIN_SERVICE_BASE}/workflow-package/update-due-on.json?siteId=${encodeURIComponent(siteId)}` +
    `&workflowPackageId=${encodeURIComponent(workflowPackageId)}`;
  url += dueOn ? `&dueOn=${encodeURIComponent(dueOn)}` : '&dueOn=';
  return pluginPost(url);
}

export function getWorkflowPackage(siteId: string, workflowPackageId: string) {
  const url =
    `${PLUGIN_SERVICE_BASE}/workflow-package/get.json?siteId=${encodeURIComponent(siteId)}` +
    `&workflowPackageId=${encodeURIComponent(workflowPackageId)}`;
  return pluginGet(url);
}

export function loadPackageDetails(siteId: string, workflowPackageId: string, server: string) {
  const url =
    `${PLUGIN_SERVICE_BASE}/workflow-package/details.json?siteId=${encodeURIComponent(siteId)}` +
    `&workflowPackageId=${encodeURIComponent(workflowPackageId)}` +
    `&server=${encodeURIComponent(server)}`;
  return pluginGet(url);
}

export function attachContent(
  siteId: string,
  workflowPackageId: string,
  contentPath: string,
  displayName: string,
  server: string
) {
  const resolvedName =
    displayName?.trim() && displayName !== 'undefined' && displayName !== 'null'
      ? displayName.trim()
      : contentPath.split('/').filter(Boolean).pop() || contentPath;

  const url =
    `${PLUGIN_SERVICE_BASE}/workflow-package/attach-content.json?siteId=${encodeURIComponent(siteId)}` +
    `&workflowPackageId=${encodeURIComponent(workflowPackageId)}` +
    `&contentPath=${encodeURIComponent(contentPath)}` +
    `&displayName=${encodeURIComponent(resolvedName)}` +
    `&server=${encodeURIComponent(server)}`;
  return pluginPost(url);
}

export function removeAttachment(
  siteId: string,
  workflowPackageId: string,
  attachmentId: string,
  attachmentType: 'content' | 'link' = 'content'
) {
  const url =
    `${PLUGIN_SERVICE_BASE}/workflow-package/remove-attachment.json?siteId=${encodeURIComponent(siteId)}` +
    `&workflowPackageId=${encodeURIComponent(workflowPackageId)}` +
    `&attachmentId=${encodeURIComponent(attachmentId)}` +
    `&attachmentType=${attachmentType}`;
  return pluginPost(url);
}

export const COMMENT_TARGET = {
  WORKFLOW_PACKAGE: 'workflow_package',
  CONTENT: 'content'
} as const;

export type CommentTargetType = (typeof COMMENT_TARGET)[keyof typeof COMMENT_TARGET];

export interface WorkflowComment {
  id: string;
  targetId: string;
  targetType: CommentTargetType;
  body: string;
  authorId?: number;
  authorUsername?: string;
  workflowStepId?: string;
  workflowStepName?: string;
  createdOn?: string;
  resolvedOn?: string | null;
  resolved?: boolean;
  archivedOn?: string | null;
  archived?: boolean;
}

/** @deprecated Use WorkflowComment */
export type PackageComment = WorkflowComment;

export interface ContentPackageWithComments {
  workflowPackageId: string;
  workflowId?: string;
  workflowName?: string;
  title: string;
  coverColor?: string;
  workflowStepId?: string;
  workflowStepName?: string;
  dueOn?: string;
  comments: WorkflowComment[];
}

export interface ContentCommentsResult {
  contentPath: string;
  contentComments: WorkflowComment[];
  packages: ContentPackageWithComments[];
}

export function findPackagesByContentPath(
  siteId: string,
  contentPath: string,
  includeResolved = true,
  includeArchived = false
) {
  const url =
    `${PLUGIN_SERVICE_BASE}/workflow-package/packages-by-content.json?siteId=${encodeURIComponent(siteId)}` +
    `&contentPath=${encodeURIComponent(contentPath)}` +
    `&includeResolved=${includeResolved ? 'true' : 'false'}` +
    `&includeArchived=${includeArchived ? 'true' : 'false'}`;
  return pluginGet(url);
}

export function listComments(
  siteId: string,
  targetType: CommentTargetType,
  targetId: string,
  includeResolved = true,
  includeArchived = false
) {
  const url =
    `${PLUGIN_SERVICE_BASE}/comment/list.json?siteId=${encodeURIComponent(siteId)}` +
    `&targetType=${encodeURIComponent(targetType)}` +
    `&targetId=${encodeURIComponent(targetId)}` +
    `&includeResolved=${includeResolved ? 'true' : 'false'}` +
    `&includeArchived=${includeArchived ? 'true' : 'false'}`;
  return pluginGet(url);
}

export function listPackageComments(
  siteId: string,
  workflowPackageId: string,
  includeResolved = true,
  includeArchived = false
) {
  return listComments(siteId, COMMENT_TARGET.WORKFLOW_PACKAGE, workflowPackageId, includeResolved, includeArchived);
}

export function createComment(
  siteId: string,
  targetType: CommentTargetType,
  targetId: string,
  body: string,
  mentionedUserIds?: number[]
) {
  let url =
    `${PLUGIN_SERVICE_BASE}/comment/create.json?siteId=${encodeURIComponent(siteId)}` +
    `&targetType=${encodeURIComponent(targetType)}` +
    `&targetId=${encodeURIComponent(targetId)}` +
    `&body=${encodeURIComponent(body)}`;
  if (mentionedUserIds?.length) {
    url += `&mentionedUserIds=${mentionedUserIds.join(',')}`;
  }
  return pluginPost(url);
}

export function createPackageComment(
  siteId: string,
  workflowPackageId: string,
  body: string,
  mentionedUserIds?: number[]
) {
  return createComment(siteId, COMMENT_TARGET.WORKFLOW_PACKAGE, workflowPackageId, body, mentionedUserIds);
}

export function createContentComment(
  siteId: string,
  contentPath: string,
  body: string,
  mentionedUserIds?: number[]
) {
  return createComment(siteId, COMMENT_TARGET.CONTENT, contentPath, body, mentionedUserIds);
}

export function resolveComment(siteId: string, commentId: string, resolved: boolean) {
  const url =
    `${PLUGIN_SERVICE_BASE}/comment/resolve.json?siteId=${encodeURIComponent(siteId)}` +
    `&commentId=${encodeURIComponent(commentId)}` +
    `&resolved=${resolved ? 'true' : 'false'}`;
  return pluginPost(url);
}

export function archiveComment(siteId: string, commentId: string, archived: boolean) {
  const url =
    `${PLUGIN_SERVICE_BASE}/comment/archive.json?siteId=${encodeURIComponent(siteId)}` +
    `&commentId=${encodeURIComponent(commentId)}` +
    `&archived=${archived ? 'true' : 'false'}`;
  return pluginPost(url);
}
