import { PluginDescriptor } from '@craftercms/studio-ui';
import Board from './components/Board';
import OpenBoardDialogPanelButton from './components/OpenBoardDialogPanelButton';
import ContentCommentsPanel from './components/contentComments/ContentCommentsPanel';
import ContentCommentsToolbarButton from './components/contentComments/ContentCommentsToolbarButton';
import NotificationsPanel from './components/notifications/NotificationsPanel';
import NotificationsToolbarButton from './components/notifications/NotificationsToolbarButton';
import TasksPanel from './components/tasks/TasksPanel';
import TasksToolbarButton from './components/tasks/TasksToolbarButton';
import CalendarDialog from './calendar/CalendarDialog';
import CalendarToolbarButton from './calendar/CalendarToolbarButton';
import ActiveWorkflowsToolbarButton from './components/activeWorkflows/ActiveWorkflowsToolbarButton';
import WorkflowBypassGuard from './components/workflowBypass/WorkflowBypassGuard';
import ProjectToolsConfiguration from './components/projectTools/ProjectToolsConfiguration';
import { projectToolsConfigurationWidgetId } from './consts';
import { messages } from './messages';

const plugin: PluginDescriptor = {
  locales: {
    en: {
      [messages.projectToolsTitle.id]: messages.projectToolsTitle.defaultMessage
    }
  },
  scripts: undefined,
  stylesheets: undefined,
  id: 'org.rd.plugin.crafterwf',
  widgets: {
    'org.rd.plugin.crafterwf.openBoardButton': OpenBoardDialogPanelButton,
    'org.rd.plugin.crafterwf.board': Board,
    'org.rd.plugin.crafterwf.contentCommentsToolbarButton': ContentCommentsToolbarButton,
    'org.rd.plugin.crafterwf.contentCommentsPanel': ContentCommentsPanel,
    'org.rd.plugin.crafterwf.notificationsToolbarButton': NotificationsToolbarButton,
    'org.rd.plugin.crafterwf.notificationsPanel': NotificationsPanel,
    'org.rd.plugin.crafterwf.tasksToolbarButton': TasksToolbarButton,
    'org.rd.plugin.crafterwf.tasksPanel': TasksPanel,
    'org.rd.plugin.crafterwf.calendarToolbarButton': CalendarToolbarButton,
    'org.rd.plugin.crafterwf.calendarDialog': CalendarDialog,
    'org.rd.plugin.crafterwf.activeWorkflowsToolbarButton': ActiveWorkflowsToolbarButton,
    'org.rd.plugin.crafterwf.workflowBypassGuard': WorkflowBypassGuard,
    [projectToolsConfigurationWidgetId]: ProjectToolsConfiguration
  }
};

export {
  OpenBoardDialogPanelButton,
  Board,
  ContentCommentsPanel,
  ContentCommentsToolbarButton,
  NotificationsPanel,
  NotificationsToolbarButton,
  TasksPanel,
  TasksToolbarButton,
  CalendarDialog,
  CalendarToolbarButton,
  ActiveWorkflowsToolbarButton,
  WorkflowBypassGuard,
  ProjectToolsConfiguration,
  projectToolsConfigurationWidgetId
};

export default plugin;
