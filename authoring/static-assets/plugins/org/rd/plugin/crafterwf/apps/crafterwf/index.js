const React = craftercms.libs.React;
const { useState, useRef, useEffect, useContext, useLayoutEffect, useMemo: useMemo$1, useCallback: useCallback$1, createContext } = craftercms.libs.React;
const React__default = craftercms.libs.React && Object.prototype.hasOwnProperty.call(craftercms.libs.React, 'default') ? craftercms.libs.React['default'] : craftercms.libs.React;
const RefreshRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/RefreshRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/RefreshRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/RefreshRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/RefreshRounded');
const SettingsRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/SettingsRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/SettingsRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/SettingsRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/SettingsRounded');
const { Box, Typography, Stack, MenuItem, Avatar, Chip, Button, TextField, Popper, Paper, List, ListItemButton, IconButton, CircularProgress, Checkbox, FormControl, InputLabel, Select, Accordion, AccordionSummary, AccordionDetails, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, TableSortLabel, Tooltip, Divider, Dialog, DialogContent, Card, CardHeader, CardActions: CardActions$1, Badge, DialogTitle, DialogActions, cardClasses, Fab, ToggleButtonGroup, ToggleButton, Menu: Menu$1, ListItemText: ListItemText$1, Popover, RadioGroup, FormControlLabel, Radio, Autocomplete, FormLabel, Tabs, Tab } = craftercms.libs.MaterialUI;
const { connect, Provider, useSelector, useDispatch } = craftercms.libs.ReactRedux;
const ReactDOM = craftercms.libs.ReactDOM && Object.prototype.hasOwnProperty.call(craftercms.libs.ReactDOM, 'default') ? craftercms.libs.ReactDOM['default'] : craftercms.libs.ReactDOM;
const { ApiResponseErrorState } = craftercms.components;
const AttachmentRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/AttachmentRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/AttachmentRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/AttachmentRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/AttachmentRounded');
const EditRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/EditRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/EditRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/EditRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/EditRounded');
const CheckRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/CheckRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/CheckRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/CheckRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/CheckRounded');
const CloseRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/CloseRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/CloseRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/CloseRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/CloseRounded');
const { fetchContentXML, fetchSandboxItem, fetchItemsByPath } = craftercms.services.content;
const ClearRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/ClearRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/ClearRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/ClearRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/ClearRounded');
const List$1 = craftercms.libs.MaterialUI.List && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.List, 'default') ? craftercms.libs.MaterialUI.List['default'] : craftercms.libs.MaterialUI.List;
const ListItem = craftercms.libs.MaterialUI.ListItem && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.ListItem, 'default') ? craftercms.libs.MaterialUI.ListItem['default'] : craftercms.libs.MaterialUI.ListItem;
const ListItemText = craftercms.libs.MaterialUI.ListItemText && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.ListItemText, 'default') ? craftercms.libs.MaterialUI.ListItemText['default'] : craftercms.libs.MaterialUI.ListItemText;
const ItemTypeIcon = craftercms.components.ItemTypeIcon && Object.prototype.hasOwnProperty.call(craftercms.components.ItemTypeIcon, 'default') ? craftercms.components.ItemTypeIcon['default'] : craftercms.components.ItemTypeIcon;
const ItemStateIcon = craftercms.components.ItemStateIcon && Object.prototype.hasOwnProperty.call(craftercms.components.ItemStateIcon, 'default') ? craftercms.components.ItemStateIcon['default'] : craftercms.components.ItemStateIcon;
const ItemPublishingTargetIcon = craftercms.components.ItemPublishingTargetIcon && Object.prototype.hasOwnProperty.call(craftercms.components.ItemPublishingTargetIcon, 'default') ? craftercms.components.ItemPublishingTargetIcon['default'] : craftercms.components.ItemPublishingTargetIcon;
const SendRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/SendRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/SendRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/SendRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/SendRounded');
const { fetchAll, me } = craftercms.services.users;
const { get, post, del } = craftercms.utils.ajax;
const ExpandMoreRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/ExpandMoreRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/ExpandMoreRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/ExpandMoreRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/ExpandMoreRounded');
const { createAction } = craftercms.libs.ReduxToolkit;
const { getPreviewURLFromPath } = craftercms.utils.path;
const Menu = craftercms.libs.MaterialUI.Menu && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.Menu, 'default') ? craftercms.libs.MaterialUI.Menu['default'] : craftercms.libs.MaterialUI.Menu;
const MenuItem$1 = craftercms.libs.MaterialUI.MenuItem && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.MenuItem, 'default') ? craftercms.libs.MaterialUI.MenuItem['default'] : craftercms.libs.MaterialUI.MenuItem;
const Divider$1 = craftercms.libs.MaterialUI.Divider && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.Divider, 'default') ? craftercms.libs.MaterialUI.Divider['default'] : craftercms.libs.MaterialUI.Divider;
const MoreVertRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/MoreVertRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/MoreVertRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/MoreVertRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/MoreVertRounded');
const IconButton$1 = craftercms.libs.MaterialUI.IconButton && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.IconButton, 'default') ? craftercms.libs.MaterialUI.IconButton['default'] : craftercms.libs.MaterialUI.IconButton;
const Search = craftercms.components.Search && Object.prototype.hasOwnProperty.call(craftercms.components.Search, 'default') ? craftercms.components.Search['default'] : craftercms.components.Search;
const { createCustomDocumentEventListener } = craftercms.utils.dom;
const ChevronRightRounded = craftercms.utils.constants.components.get('@mui/icons-material/ChevronRightRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/ChevronRightRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/ChevronRightRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/ChevronRightRounded');
const Collapse = craftercms.libs.MaterialUI.Collapse && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.Collapse, 'default') ? craftercms.libs.MaterialUI.Collapse['default'] : craftercms.libs.MaterialUI.Collapse;
const ListItemButton$1 = craftercms.libs.MaterialUI.ListItemButton && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.ListItemButton, 'default') ? craftercms.libs.MaterialUI.ListItemButton['default'] : craftercms.libs.MaterialUI.ListItemButton;
const ToolsPanelListItemButton = craftercms.components.ToolsPanelListItemButton && Object.prototype.hasOwnProperty.call(craftercms.components.ToolsPanelListItemButton, 'default') ? craftercms.components.ToolsPanelListItemButton['default'] : craftercms.components.ToolsPanelListItemButton;
const CommentRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/CommentRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/CommentRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/CommentRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/CommentRounded');
const NotificationsNoneRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/NotificationsNoneRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/NotificationsNoneRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/NotificationsNoneRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/NotificationsNoneRounded');
const ContentPasteRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/ContentPasteRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/ContentPasteRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/ContentPasteRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/ContentPasteRounded');
const ChevronLeftRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/ChevronLeftRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/ChevronLeftRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/ChevronLeftRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/ChevronLeftRounded');
const { map, catchError } = craftercms.libs.rxjs;
const { forkJoin, of } = craftercms.libs.rxjs;
const AccountTreeOutlinedIcon = craftercms.utils.constants.components.get('@mui/icons-material/AccountTreeOutlined') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/AccountTreeOutlined'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/AccountTreeOutlined')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/AccountTreeOutlined');
const TaskAltRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/TaskAltRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/TaskAltRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/TaskAltRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/TaskAltRounded');
const CalendarMonthRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/CalendarMonthRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/CalendarMonthRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/CalendarMonthRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/CalendarMonthRounded');
const CheckCircleRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/CheckCircleRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/CheckCircleRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/CheckCircleRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/CheckCircleRounded');
const ErrorOutlineRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/ErrorOutlineRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/ErrorOutlineRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/ErrorOutlineRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/ErrorOutlineRounded');
const AddRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/AddRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/AddRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/AddRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/AddRounded');
const DeleteOutlineRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/DeleteOutlineRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/DeleteOutlineRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/DeleteOutlineRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/DeleteOutlineRounded');
const DragIndicatorRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/DragIndicatorRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/DragIndicatorRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/DragIndicatorRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/DragIndicatorRounded');
const RuleRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/RuleRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/RuleRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/RuleRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/RuleRounded');
const ArrowDropDownRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/ArrowDropDownRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/ArrowDropDownRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/ArrowDropDownRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/ArrowDropDownRounded');
const { fetchAll: fetchAll$1 } = craftercms.services.groups;

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

/**
 * Adapted from React: https://github.com/facebook/react/blob/master/packages/shared/formatProdErrorMessage.js
 *
 * Do not require this module directly! Use normal throw error calls. These messages will be replaced with error codes
 * during build.
 * @param {number} code
 */
function formatProdErrorMessage(code) {
  return "Minified Redux error #" + code + "; visit https://redux.js.org/Errors?code=" + code + " for the full message or " + 'use the non-minified dev environment for full errors. ';
}

// Inlined version of the `symbol-observable` polyfill
var $$observable = (function () {
  return typeof Symbol === 'function' && Symbol.observable || '@@observable';
})();

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var randomString = function randomString() {
  return Math.random().toString(36).substring(7).split('').join('.');
};

var ActionTypes = {
  INIT: "@@redux/INIT" + randomString(),
  REPLACE: "@@redux/REPLACE" + randomString(),
  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  }
};

/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  var proto = obj;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}

/**
 * @deprecated
 *
 * **We recommend using the `configureStore` method
 * of the `@reduxjs/toolkit` package**, which replaces `createStore`.
 *
 * Redux Toolkit is our recommended approach for writing Redux logic today,
 * including store setup, reducers, data fetching, and more.
 *
 * **For more details, please read this Redux docs page:**
 * **https://redux.js.org/introduction/why-rtk-is-redux-today**
 *
 * `configureStore` from Redux Toolkit is an improved version of `createStore` that
 * simplifies setup and helps avoid common bugs.
 *
 * You should not be using the `redux` core package by itself today, except for learning purposes.
 * The `createStore` method from the core `redux` package will not be removed, but we encourage
 * all users to migrate to using Redux Toolkit for all Redux code.
 *
 * If you want to use `createStore` without this visual deprecation warning, use
 * the `legacy_createStore` import instead:
 *
 * `import { legacy_createStore as createStore} from 'redux'`
 *
 */

function createStore$1(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {
    throw new Error(formatProdErrorMessage(0) );
  }

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error(formatProdErrorMessage(1) );
    }

    return enhancer(createStore$1)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error(formatProdErrorMessage(2) );
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;
  /**
   * This makes a shallow copy of currentListeners so we can use
   * nextListeners as a temporary list while dispatching.
   *
   * This prevents any bugs around consumers calling
   * subscribe/unsubscribe in the middle of a dispatch.
   */

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */


  function getState() {
    if (isDispatching) {
      throw new Error(formatProdErrorMessage(3) );
    }

    return currentState;
  }
  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */


  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error(formatProdErrorMessage(4) );
    }

    if (isDispatching) {
      throw new Error(formatProdErrorMessage(5) );
    }

    var isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      if (isDispatching) {
        throw new Error(formatProdErrorMessage(6) );
      }

      isSubscribed = false;
      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
      currentListeners = null;
    };
  }
  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */


  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error(formatProdErrorMessage(7) );
    }

    if (typeof action.type === 'undefined') {
      throw new Error(formatProdErrorMessage(8) );
    }

    if (isDispatching) {
      throw new Error(formatProdErrorMessage(9) );
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;

    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }
  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */


  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error(formatProdErrorMessage(10) );
    }

    currentReducer = nextReducer; // This action has a similiar effect to ActionTypes.INIT.
    // Any reducers that existed in both the new and old rootReducer
    // will receive the previous state. This effectively populates
    // the new state tree with any relevant data from the old one.

    dispatch({
      type: ActionTypes.REPLACE
    });
  }
  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */


  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          throw new Error(formatProdErrorMessage(11) );
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe: unsubscribe
        };
      }
    }, _ref[$$observable] = function () {
      return this;
    }, _ref;
  } // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.


  dispatch({
    type: ActionTypes.INIT
  });
  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[$$observable] = observable, _ref2;
}

function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(this, arguments));
  };
}
/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass an action creator as the first argument,
 * and get a dispatch wrapped function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */


function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error(formatProdErrorMessage(16) );
  }

  var boundActionCreators = {};

  for (var key in actionCreators) {
    var actionCreator = actionCreators[key];

    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }

  return boundActionCreators;
}

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */
function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  });
}

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */

function applyMiddleware() {
  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function () {
      var store = createStore.apply(void 0, arguments);

      var _dispatch = function dispatch() {
        throw new Error(formatProdErrorMessage(15) );
      };

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch() {
          return _dispatch.apply(void 0, arguments);
        }
      };
      var chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = compose.apply(void 0, chain)(store.dispatch);
      return _objectSpread2(_objectSpread2({}, store), {}, {
        dispatch: _dispatch
      });
    };
  };
}

function areInputsEqual$1(newInputs, lastInputs) {
  if (newInputs.length !== lastInputs.length) {
    return false;
  }

  for (var i = 0; i < newInputs.length; i++) {
    if (newInputs[i] !== lastInputs[i]) {
      return false;
    }
  }

  return true;
}

function useMemoOne(getResult, inputs) {
  var initial = useState(function () {
    return {
      inputs: inputs,
      result: getResult()
    };
  })[0];
  var isFirstRun = useRef(true);
  var committed = useRef(initial);
  var useCache = isFirstRun.current || Boolean(inputs && committed.current.inputs && areInputsEqual$1(inputs, committed.current.inputs));
  var cache = useCache ? committed.current : {
    inputs: inputs,
    result: getResult()
  };
  useEffect(function () {
    isFirstRun.current = false;
    committed.current = cache;
  }, [cache]);
  return cache.result;
}
function useCallbackOne(callback, inputs) {
  return useMemoOne(function () {
    return callback;
  }, inputs);
}
var useMemo = useMemoOne;
var useCallback = useCallbackOne;

var isProduction = "production" === 'production';
var prefix$2 = 'Invariant failed';
function invariant$1(condition, message) {
    if (condition) {
        return;
    }
    if (isProduction) {
        throw new Error(prefix$2);
    }
    var provided = typeof message === 'function' ? message() : message;
    var value = provided ? "".concat(prefix$2, ": ").concat(provided) : prefix$2;
    throw new Error(value);
}

var getRect = function getRect(_ref) {
  var top = _ref.top,
      right = _ref.right,
      bottom = _ref.bottom,
      left = _ref.left;
  var width = right - left;
  var height = bottom - top;
  var rect = {
    top: top,
    right: right,
    bottom: bottom,
    left: left,
    width: width,
    height: height,
    x: left,
    y: top,
    center: {
      x: (right + left) / 2,
      y: (bottom + top) / 2
    }
  };
  return rect;
};
var expand = function expand(target, expandBy) {
  return {
    top: target.top - expandBy.top,
    left: target.left - expandBy.left,
    bottom: target.bottom + expandBy.bottom,
    right: target.right + expandBy.right
  };
};
var shrink = function shrink(target, shrinkBy) {
  return {
    top: target.top + shrinkBy.top,
    left: target.left + shrinkBy.left,
    bottom: target.bottom - shrinkBy.bottom,
    right: target.right - shrinkBy.right
  };
};

var shift = function shift(target, shiftBy) {
  return {
    top: target.top + shiftBy.y,
    left: target.left + shiftBy.x,
    bottom: target.bottom + shiftBy.y,
    right: target.right + shiftBy.x
  };
};

var noSpacing$1 = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
};
var createBox = function createBox(_ref2) {
  var borderBox = _ref2.borderBox,
      _ref2$margin = _ref2.margin,
      margin = _ref2$margin === void 0 ? noSpacing$1 : _ref2$margin,
      _ref2$border = _ref2.border,
      border = _ref2$border === void 0 ? noSpacing$1 : _ref2$border,
      _ref2$padding = _ref2.padding,
      padding = _ref2$padding === void 0 ? noSpacing$1 : _ref2$padding;
  var marginBox = getRect(expand(borderBox, margin));
  var paddingBox = getRect(shrink(borderBox, border));
  var contentBox = getRect(shrink(paddingBox, padding));
  return {
    marginBox: marginBox,
    borderBox: getRect(borderBox),
    paddingBox: paddingBox,
    contentBox: contentBox,
    margin: margin,
    border: border,
    padding: padding
  };
};

var parse = function parse(raw) {
  var value = raw.slice(0, -2);
  var suffix = raw.slice(-2);

  if (suffix !== 'px') {
    return 0;
  }

  var result = Number(value);
  !!isNaN(result) ? invariant$1(false) : void 0;
  return result;
};

var getWindowScroll$1 = function getWindowScroll() {
  return {
    x: window.pageXOffset,
    y: window.pageYOffset
  };
};

var offset = function offset(original, change) {
  var borderBox = original.borderBox,
      border = original.border,
      margin = original.margin,
      padding = original.padding;
  var shifted = shift(borderBox, change);
  return createBox({
    borderBox: shifted,
    border: border,
    margin: margin,
    padding: padding
  });
};
var withScroll = function withScroll(original, scroll) {
  if (scroll === void 0) {
    scroll = getWindowScroll$1();
  }

  return offset(original, scroll);
};
var calculateBox = function calculateBox(borderBox, styles) {
  var margin = {
    top: parse(styles.marginTop),
    right: parse(styles.marginRight),
    bottom: parse(styles.marginBottom),
    left: parse(styles.marginLeft)
  };
  var padding = {
    top: parse(styles.paddingTop),
    right: parse(styles.paddingRight),
    bottom: parse(styles.paddingBottom),
    left: parse(styles.paddingLeft)
  };
  var border = {
    top: parse(styles.borderTopWidth),
    right: parse(styles.borderRightWidth),
    bottom: parse(styles.borderBottomWidth),
    left: parse(styles.borderLeftWidth)
  };
  return createBox({
    borderBox: borderBox,
    margin: margin,
    padding: padding,
    border: border
  });
};
var getBox = function getBox(el) {
  var borderBox = el.getBoundingClientRect();
  var styles = window.getComputedStyle(el);
  return calculateBox(borderBox, styles);
};

var safeIsNaN = Number.isNaN ||
    function ponyfill(value) {
        return typeof value === 'number' && value !== value;
    };
function isEqual$2(first, second) {
    if (first === second) {
        return true;
    }
    if (safeIsNaN(first) && safeIsNaN(second)) {
        return true;
    }
    return false;
}
function areInputsEqual(newInputs, lastInputs) {
    if (newInputs.length !== lastInputs.length) {
        return false;
    }
    for (var i = 0; i < newInputs.length; i++) {
        if (!isEqual$2(newInputs[i], lastInputs[i])) {
            return false;
        }
    }
    return true;
}

function memoizeOne(resultFn, isEqual) {
    if (isEqual === void 0) { isEqual = areInputsEqual; }
    var lastThis;
    var lastArgs = [];
    var lastResult;
    var calledOnce = false;
    function memoized() {
        var newArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            newArgs[_i] = arguments[_i];
        }
        if (calledOnce && lastThis === this && isEqual(newArgs, lastArgs)) {
            return lastResult;
        }
        lastResult = resultFn.apply(this, newArgs);
        calledOnce = true;
        lastThis = this;
        lastArgs = newArgs;
        return lastResult;
    }
    return memoized;
}

var rafSchd = function rafSchd(fn) {
  var lastArgs = [];
  var frameId = null;

  var wrapperFn = function wrapperFn() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    lastArgs = args;

    if (frameId) {
      return;
    }

    frameId = requestAnimationFrame(function () {
      frameId = null;
      fn.apply(void 0, lastArgs);
    });
  };

  wrapperFn.cancel = function () {
    if (!frameId) {
      return;
    }

    cancelAnimationFrame(frameId);
    frameId = null;
  };

  return wrapperFn;
};

var rafSchd$1 = rafSchd;

function log(type, message) {

  {
    return;
  }
}
log.bind(null, 'warn');
log.bind(null, 'error');

function noop() {}

function getOptions(shared, fromBinding) {
  return _extends({}, shared, {}, fromBinding);
}

function bindEvents(el, bindings, sharedOptions) {
  var unbindings = bindings.map(function (binding) {
    var options = getOptions(sharedOptions, binding.options);
    el.addEventListener(binding.eventName, binding.fn, options);
    return function unbind() {
      el.removeEventListener(binding.eventName, binding.fn, options);
    };
  });
  return function unbindAll() {
    unbindings.forEach(function (unbind) {
      unbind();
    });
  };
}
var prefix = 'Invariant failed';
function RbdInvariant(message) {
  this.message = message;
}

RbdInvariant.prototype.toString = function toString() {
  return this.message;
};

function invariant(condition, message) {
  if (condition) {
    return;
  }

  {
    throw new RbdInvariant(prefix);
  }
}

var ErrorBoundary = function (_React$Component) {
  _inheritsLoose(ErrorBoundary, _React$Component);

  function ErrorBoundary() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.callbacks = null;
    _this.unbind = noop;

    _this.onWindowError = function (event) {
      var callbacks = _this.getCallbacks();

      if (callbacks.isDragging()) {
        callbacks.tryAbort();
      }

      var err = event.error;

      if (err instanceof RbdInvariant) {
        event.preventDefault();
      }
    };

    _this.getCallbacks = function () {
      if (!_this.callbacks) {
        throw new Error('Unable to find AppCallbacks in <ErrorBoundary/>');
      }

      return _this.callbacks;
    };

    _this.setCallbacks = function (callbacks) {
      _this.callbacks = callbacks;
    };

    return _this;
  }

  var _proto = ErrorBoundary.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.unbind = bindEvents(window, [{
      eventName: 'error',
      fn: this.onWindowError
    }]);
  };

  _proto.componentDidCatch = function componentDidCatch(err) {
    if (err instanceof RbdInvariant) {

      this.setState({});
      return;
    }

    throw err;
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.unbind();
  };

  _proto.render = function render() {
    return this.props.children(this.setCallbacks);
  };

  return ErrorBoundary;
}(React__default.Component);

var dragHandleUsageInstructions = "\n  Press space bar to start a drag.\n  When dragging you can use the arrow keys to move the item around and escape to cancel.\n  Some screen readers may require you to be in focus mode or to use your pass through key\n";

var position = function position(index) {
  return index + 1;
};

var onDragStart = function onDragStart(start) {
  return "\n  You have lifted an item in position " + position(start.source.index) + "\n";
};

var withLocation = function withLocation(source, destination) {
  var isInHomeList = source.droppableId === destination.droppableId;
  var startPosition = position(source.index);
  var endPosition = position(destination.index);

  if (isInHomeList) {
    return "\n      You have moved the item from position " + startPosition + "\n      to position " + endPosition + "\n    ";
  }

  return "\n    You have moved the item from position " + startPosition + "\n    in list " + source.droppableId + "\n    to list " + destination.droppableId + "\n    in position " + endPosition + "\n  ";
};

var withCombine = function withCombine(id, source, combine) {
  var inHomeList = source.droppableId === combine.droppableId;

  if (inHomeList) {
    return "\n      The item " + id + "\n      has been combined with " + combine.draggableId;
  }

  return "\n      The item " + id + "\n      in list " + source.droppableId + "\n      has been combined with " + combine.draggableId + "\n      in list " + combine.droppableId + "\n    ";
};

var onDragUpdate = function onDragUpdate(update) {
  var location = update.destination;

  if (location) {
    return withLocation(update.source, location);
  }

  var combine = update.combine;

  if (combine) {
    return withCombine(update.draggableId, update.source, combine);
  }

  return 'You are over an area that cannot be dropped on';
};

var returnedToStart = function returnedToStart(source) {
  return "\n  The item has returned to its starting position\n  of " + position(source.index) + "\n";
};

var onDragEnd = function onDragEnd(result) {
  if (result.reason === 'CANCEL') {
    return "\n      Movement cancelled.\n      " + returnedToStart(result.source) + "\n    ";
  }

  var location = result.destination;
  var combine = result.combine;

  if (location) {
    return "\n      You have dropped the item.\n      " + withLocation(result.source, location) + "\n    ";
  }

  if (combine) {
    return "\n      You have dropped the item.\n      " + withCombine(result.draggableId, result.source, combine) + "\n    ";
  }

  return "\n    The item has been dropped while not over a drop area.\n    " + returnedToStart(result.source) + "\n  ";
};

var preset = {
  dragHandleUsageInstructions: dragHandleUsageInstructions,
  onDragStart: onDragStart,
  onDragUpdate: onDragUpdate,
  onDragEnd: onDragEnd
};

var origin = {
  x: 0,
  y: 0
};
var add = function add(point1, point2) {
  return {
    x: point1.x + point2.x,
    y: point1.y + point2.y
  };
};
var subtract = function subtract(point1, point2) {
  return {
    x: point1.x - point2.x,
    y: point1.y - point2.y
  };
};
var isEqual = function isEqual(point1, point2) {
  return point1.x === point2.x && point1.y === point2.y;
};
var negate = function negate(point) {
  return {
    x: point.x !== 0 ? -point.x : 0,
    y: point.y !== 0 ? -point.y : 0
  };
};
var patch = function patch(line, value, otherValue) {
  var _ref;

  if (otherValue === void 0) {
    otherValue = 0;
  }

  return _ref = {}, _ref[line] = value, _ref[line === 'x' ? 'y' : 'x'] = otherValue, _ref;
};
var distance = function distance(point1, point2) {
  return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
};
var closest = function closest(target, points) {
  return Math.min.apply(Math, points.map(function (point) {
    return distance(target, point);
  }));
};
var apply = function apply(fn) {
  return function (point) {
    return {
      x: fn(point.x),
      y: fn(point.y)
    };
  };
};

var executeClip = (function (frame, subject) {
  var result = getRect({
    top: Math.max(subject.top, frame.top),
    right: Math.min(subject.right, frame.right),
    bottom: Math.min(subject.bottom, frame.bottom),
    left: Math.max(subject.left, frame.left)
  });

  if (result.width <= 0 || result.height <= 0) {
    return null;
  }

  return result;
});

var offsetByPosition = function offsetByPosition(spacing, point) {
  return {
    top: spacing.top + point.y,
    left: spacing.left + point.x,
    bottom: spacing.bottom + point.y,
    right: spacing.right + point.x
  };
};
var getCorners = function getCorners(spacing) {
  return [{
    x: spacing.left,
    y: spacing.top
  }, {
    x: spacing.right,
    y: spacing.top
  }, {
    x: spacing.left,
    y: spacing.bottom
  }, {
    x: spacing.right,
    y: spacing.bottom
  }];
};
var noSpacing = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
};

var scroll = function scroll(target, frame) {
  if (!frame) {
    return target;
  }

  return offsetByPosition(target, frame.scroll.diff.displacement);
};

var increase = function increase(target, axis, withPlaceholder) {
  if (withPlaceholder && withPlaceholder.increasedBy) {
    var _extends2;

    return _extends({}, target, (_extends2 = {}, _extends2[axis.end] = target[axis.end] + withPlaceholder.increasedBy[axis.line], _extends2));
  }

  return target;
};

var clip = function clip(target, frame) {
  if (frame && frame.shouldClipSubject) {
    return executeClip(frame.pageMarginBox, target);
  }

  return getRect(target);
};

var getSubject = (function (_ref) {
  var page = _ref.page,
      withPlaceholder = _ref.withPlaceholder,
      axis = _ref.axis,
      frame = _ref.frame;
  var scrolled = scroll(page.marginBox, frame);
  var increased = increase(scrolled, axis, withPlaceholder);
  var clipped = clip(increased, frame);
  return {
    page: page,
    withPlaceholder: withPlaceholder,
    active: clipped
  };
});

var scrollDroppable = (function (droppable, newScroll) {
  !droppable.frame ? invariant(false) : void 0;
  var scrollable = droppable.frame;
  var scrollDiff = subtract(newScroll, scrollable.scroll.initial);
  var scrollDisplacement = negate(scrollDiff);

  var frame = _extends({}, scrollable, {
    scroll: {
      initial: scrollable.scroll.initial,
      current: newScroll,
      diff: {
        value: scrollDiff,
        displacement: scrollDisplacement
      },
      max: scrollable.scroll.max
    }
  });

  var subject = getSubject({
    page: droppable.subject.page,
    withPlaceholder: droppable.subject.withPlaceholder,
    axis: droppable.axis,
    frame: frame
  });

  var result = _extends({}, droppable, {
    frame: frame,
    subject: subject
  });

  return result;
});
function values(map) {
  if (Object.values) {
    return Object.values(map);
  }

  return Object.keys(map).map(function (key) {
    return map[key];
  });
}
function findIndex(list, predicate) {
  if (list.findIndex) {
    return list.findIndex(predicate);
  }

  for (var i = 0; i < list.length; i++) {
    if (predicate(list[i])) {
      return i;
    }
  }

  return -1;
}
function find(list, predicate) {
  if (list.find) {
    return list.find(predicate);
  }

  var index = findIndex(list, predicate);

  if (index !== -1) {
    return list[index];
  }

  return undefined;
}
function toArray(list) {
  return Array.prototype.slice.call(list);
}

var toDroppableMap = memoizeOne(function (droppables) {
  return droppables.reduce(function (previous, current) {
    previous[current.descriptor.id] = current;
    return previous;
  }, {});
});
var toDraggableMap = memoizeOne(function (draggables) {
  return draggables.reduce(function (previous, current) {
    previous[current.descriptor.id] = current;
    return previous;
  }, {});
});
var toDroppableList = memoizeOne(function (droppables) {
  return values(droppables);
});
var toDraggableList = memoizeOne(function (draggables) {
  return values(draggables);
});

var getDraggablesInsideDroppable = memoizeOne(function (droppableId, draggables) {
  var result = toDraggableList(draggables).filter(function (draggable) {
    return droppableId === draggable.descriptor.droppableId;
  }).sort(function (a, b) {
    return a.descriptor.index - b.descriptor.index;
  });
  return result;
});

function tryGetDestination(impact) {
  if (impact.at && impact.at.type === 'REORDER') {
    return impact.at.destination;
  }

  return null;
}
function tryGetCombine(impact) {
  if (impact.at && impact.at.type === 'COMBINE') {
    return impact.at.combine;
  }

  return null;
}

var removeDraggableFromList = memoizeOne(function (remove, list) {
  return list.filter(function (item) {
    return item.descriptor.id !== remove.descriptor.id;
  });
});

var moveToNextCombine = (function (_ref) {
  var isMovingForward = _ref.isMovingForward,
      draggable = _ref.draggable,
      destination = _ref.destination,
      insideDestination = _ref.insideDestination,
      previousImpact = _ref.previousImpact;

  if (!destination.isCombineEnabled) {
    return null;
  }

  var location = tryGetDestination(previousImpact);

  if (!location) {
    return null;
  }

  function getImpact(target) {
    var at = {
      type: 'COMBINE',
      combine: {
        draggableId: target,
        droppableId: destination.descriptor.id
      }
    };
    return _extends({}, previousImpact, {
      at: at
    });
  }

  var all = previousImpact.displaced.all;
  var closestId = all.length ? all[0] : null;

  if (isMovingForward) {
    return closestId ? getImpact(closestId) : null;
  }

  var withoutDraggable = removeDraggableFromList(draggable, insideDestination);

  if (!closestId) {
    if (!withoutDraggable.length) {
      return null;
    }

    var last = withoutDraggable[withoutDraggable.length - 1];
    return getImpact(last.descriptor.id);
  }

  var indexOfClosest = findIndex(withoutDraggable, function (d) {
    return d.descriptor.id === closestId;
  });
  !(indexOfClosest !== -1) ? invariant(false) : void 0;
  var proposedIndex = indexOfClosest - 1;

  if (proposedIndex < 0) {
    return null;
  }

  var before = withoutDraggable[proposedIndex];
  return getImpact(before.descriptor.id);
});

var isHomeOf = (function (draggable, destination) {
  return draggable.descriptor.droppableId === destination.descriptor.id;
});

var noDisplacedBy = {
  point: origin,
  value: 0
};
var emptyGroups = {
  invisible: {},
  visible: {},
  all: []
};
var noImpact = {
  displaced: emptyGroups,
  displacedBy: noDisplacedBy,
  at: null
};

var isWithin = (function (lowerBound, upperBound) {
  return function (value) {
    return lowerBound <= value && value <= upperBound;
  };
});

var isPartiallyVisibleThroughFrame = (function (frame) {
  var isWithinVertical = isWithin(frame.top, frame.bottom);
  var isWithinHorizontal = isWithin(frame.left, frame.right);
  return function (subject) {
    var isContained = isWithinVertical(subject.top) && isWithinVertical(subject.bottom) && isWithinHorizontal(subject.left) && isWithinHorizontal(subject.right);

    if (isContained) {
      return true;
    }

    var isPartiallyVisibleVertically = isWithinVertical(subject.top) || isWithinVertical(subject.bottom);
    var isPartiallyVisibleHorizontally = isWithinHorizontal(subject.left) || isWithinHorizontal(subject.right);
    var isPartiallyContained = isPartiallyVisibleVertically && isPartiallyVisibleHorizontally;

    if (isPartiallyContained) {
      return true;
    }

    var isBiggerVertically = subject.top < frame.top && subject.bottom > frame.bottom;
    var isBiggerHorizontally = subject.left < frame.left && subject.right > frame.right;
    var isTargetBiggerThanFrame = isBiggerVertically && isBiggerHorizontally;

    if (isTargetBiggerThanFrame) {
      return true;
    }

    var isTargetBiggerOnOneAxis = isBiggerVertically && isPartiallyVisibleHorizontally || isBiggerHorizontally && isPartiallyVisibleVertically;
    return isTargetBiggerOnOneAxis;
  };
});

var isTotallyVisibleThroughFrame = (function (frame) {
  var isWithinVertical = isWithin(frame.top, frame.bottom);
  var isWithinHorizontal = isWithin(frame.left, frame.right);
  return function (subject) {
    var isContained = isWithinVertical(subject.top) && isWithinVertical(subject.bottom) && isWithinHorizontal(subject.left) && isWithinHorizontal(subject.right);
    return isContained;
  };
});

var vertical = {
  direction: 'vertical',
  line: 'y',
  crossAxisLine: 'x',
  start: 'top',
  end: 'bottom',
  size: 'height',
  crossAxisStart: 'left',
  crossAxisEnd: 'right',
  crossAxisSize: 'width'
};
var horizontal = {
  direction: 'horizontal',
  line: 'x',
  crossAxisLine: 'y',
  start: 'left',
  end: 'right',
  size: 'width',
  crossAxisStart: 'top',
  crossAxisEnd: 'bottom',
  crossAxisSize: 'height'
};

var isTotallyVisibleThroughFrameOnAxis = (function (axis) {
  return function (frame) {
    var isWithinVertical = isWithin(frame.top, frame.bottom);
    var isWithinHorizontal = isWithin(frame.left, frame.right);
    return function (subject) {
      if (axis === vertical) {
        return isWithinVertical(subject.top) && isWithinVertical(subject.bottom);
      }

      return isWithinHorizontal(subject.left) && isWithinHorizontal(subject.right);
    };
  };
});

var getDroppableDisplaced = function getDroppableDisplaced(target, destination) {
  var displacement = destination.frame ? destination.frame.scroll.diff.displacement : origin;
  return offsetByPosition(target, displacement);
};

var isVisibleInDroppable = function isVisibleInDroppable(target, destination, isVisibleThroughFrameFn) {
  if (!destination.subject.active) {
    return false;
  }

  return isVisibleThroughFrameFn(destination.subject.active)(target);
};

var isVisibleInViewport = function isVisibleInViewport(target, viewport, isVisibleThroughFrameFn) {
  return isVisibleThroughFrameFn(viewport)(target);
};

var isVisible = function isVisible(_ref) {
  var toBeDisplaced = _ref.target,
      destination = _ref.destination,
      viewport = _ref.viewport,
      withDroppableDisplacement = _ref.withDroppableDisplacement,
      isVisibleThroughFrameFn = _ref.isVisibleThroughFrameFn;
  var displacedTarget = withDroppableDisplacement ? getDroppableDisplaced(toBeDisplaced, destination) : toBeDisplaced;
  return isVisibleInDroppable(displacedTarget, destination, isVisibleThroughFrameFn) && isVisibleInViewport(displacedTarget, viewport, isVisibleThroughFrameFn);
};

var isPartiallyVisible = function isPartiallyVisible(args) {
  return isVisible(_extends({}, args, {
    isVisibleThroughFrameFn: isPartiallyVisibleThroughFrame
  }));
};
var isTotallyVisible = function isTotallyVisible(args) {
  return isVisible(_extends({}, args, {
    isVisibleThroughFrameFn: isTotallyVisibleThroughFrame
  }));
};
var isTotallyVisibleOnAxis = function isTotallyVisibleOnAxis(args) {
  return isVisible(_extends({}, args, {
    isVisibleThroughFrameFn: isTotallyVisibleThroughFrameOnAxis(args.destination.axis)
  }));
};

var getShouldAnimate = function getShouldAnimate(id, last, forceShouldAnimate) {
  if (typeof forceShouldAnimate === 'boolean') {
    return forceShouldAnimate;
  }

  if (!last) {
    return true;
  }

  var invisible = last.invisible,
      visible = last.visible;

  if (invisible[id]) {
    return false;
  }

  var previous = visible[id];
  return previous ? previous.shouldAnimate : true;
};

function getTarget(draggable, displacedBy) {
  var marginBox = draggable.page.marginBox;
  var expandBy = {
    top: displacedBy.point.y,
    right: 0,
    bottom: 0,
    left: displacedBy.point.x
  };
  return getRect(expand(marginBox, expandBy));
}

function getDisplacementGroups(_ref) {
  var afterDragging = _ref.afterDragging,
      destination = _ref.destination,
      displacedBy = _ref.displacedBy,
      viewport = _ref.viewport,
      forceShouldAnimate = _ref.forceShouldAnimate,
      last = _ref.last;
  return afterDragging.reduce(function process(groups, draggable) {
    var target = getTarget(draggable, displacedBy);
    var id = draggable.descriptor.id;
    groups.all.push(id);
    var isVisible = isPartiallyVisible({
      target: target,
      destination: destination,
      viewport: viewport,
      withDroppableDisplacement: true
    });

    if (!isVisible) {
      groups.invisible[draggable.descriptor.id] = true;
      return groups;
    }

    var shouldAnimate = getShouldAnimate(id, last, forceShouldAnimate);
    var displacement = {
      draggableId: id,
      shouldAnimate: shouldAnimate
    };
    groups.visible[id] = displacement;
    return groups;
  }, {
    all: [],
    visible: {},
    invisible: {}
  });
}

function getIndexOfLastItem(draggables, options) {
  if (!draggables.length) {
    return 0;
  }

  var indexOfLastItem = draggables[draggables.length - 1].descriptor.index;
  return options.inHomeList ? indexOfLastItem : indexOfLastItem + 1;
}

function goAtEnd(_ref) {
  var insideDestination = _ref.insideDestination,
      inHomeList = _ref.inHomeList,
      displacedBy = _ref.displacedBy,
      destination = _ref.destination;
  var newIndex = getIndexOfLastItem(insideDestination, {
    inHomeList: inHomeList
  });
  return {
    displaced: emptyGroups,
    displacedBy: displacedBy,
    at: {
      type: 'REORDER',
      destination: {
        droppableId: destination.descriptor.id,
        index: newIndex
      }
    }
  };
}

function calculateReorderImpact(_ref2) {
  var draggable = _ref2.draggable,
      insideDestination = _ref2.insideDestination,
      destination = _ref2.destination,
      viewport = _ref2.viewport,
      displacedBy = _ref2.displacedBy,
      last = _ref2.last,
      index = _ref2.index,
      forceShouldAnimate = _ref2.forceShouldAnimate;
  var inHomeList = isHomeOf(draggable, destination);

  if (index == null) {
    return goAtEnd({
      insideDestination: insideDestination,
      inHomeList: inHomeList,
      displacedBy: displacedBy,
      destination: destination
    });
  }

  var match = find(insideDestination, function (item) {
    return item.descriptor.index === index;
  });

  if (!match) {
    return goAtEnd({
      insideDestination: insideDestination,
      inHomeList: inHomeList,
      displacedBy: displacedBy,
      destination: destination
    });
  }

  var withoutDragging = removeDraggableFromList(draggable, insideDestination);
  var sliceFrom = insideDestination.indexOf(match);
  var impacted = withoutDragging.slice(sliceFrom);
  var displaced = getDisplacementGroups({
    afterDragging: impacted,
    destination: destination,
    displacedBy: displacedBy,
    last: last,
    viewport: viewport.frame,
    forceShouldAnimate: forceShouldAnimate
  });
  return {
    displaced: displaced,
    displacedBy: displacedBy,
    at: {
      type: 'REORDER',
      destination: {
        droppableId: destination.descriptor.id,
        index: index
      }
    }
  };
}

function didStartAfterCritical(draggableId, afterCritical) {
  return Boolean(afterCritical.effected[draggableId]);
}

var fromCombine = (function (_ref) {
  var isMovingForward = _ref.isMovingForward,
      destination = _ref.destination,
      draggables = _ref.draggables,
      combine = _ref.combine,
      afterCritical = _ref.afterCritical;

  if (!destination.isCombineEnabled) {
    return null;
  }

  var combineId = combine.draggableId;
  var combineWith = draggables[combineId];
  var combineWithIndex = combineWith.descriptor.index;
  var didCombineWithStartAfterCritical = didStartAfterCritical(combineId, afterCritical);

  if (didCombineWithStartAfterCritical) {
    if (isMovingForward) {
      return combineWithIndex;
    }

    return combineWithIndex - 1;
  }

  if (isMovingForward) {
    return combineWithIndex + 1;
  }

  return combineWithIndex;
});

var fromReorder = (function (_ref) {
  var isMovingForward = _ref.isMovingForward,
      isInHomeList = _ref.isInHomeList,
      insideDestination = _ref.insideDestination,
      location = _ref.location;

  if (!insideDestination.length) {
    return null;
  }

  var currentIndex = location.index;
  var proposedIndex = isMovingForward ? currentIndex + 1 : currentIndex - 1;
  var firstIndex = insideDestination[0].descriptor.index;
  var lastIndex = insideDestination[insideDestination.length - 1].descriptor.index;
  var upperBound = isInHomeList ? lastIndex : lastIndex + 1;

  if (proposedIndex < firstIndex) {
    return null;
  }

  if (proposedIndex > upperBound) {
    return null;
  }

  return proposedIndex;
});

var moveToNextIndex = (function (_ref) {
  var isMovingForward = _ref.isMovingForward,
      isInHomeList = _ref.isInHomeList,
      draggable = _ref.draggable,
      draggables = _ref.draggables,
      destination = _ref.destination,
      insideDestination = _ref.insideDestination,
      previousImpact = _ref.previousImpact,
      viewport = _ref.viewport,
      afterCritical = _ref.afterCritical;
  var wasAt = previousImpact.at;
  !wasAt ? invariant(false) : void 0;

  if (wasAt.type === 'REORDER') {
    var _newIndex = fromReorder({
      isMovingForward: isMovingForward,
      isInHomeList: isInHomeList,
      location: wasAt.destination,
      insideDestination: insideDestination
    });

    if (_newIndex == null) {
      return null;
    }

    return calculateReorderImpact({
      draggable: draggable,
      insideDestination: insideDestination,
      destination: destination,
      viewport: viewport,
      last: previousImpact.displaced,
      displacedBy: previousImpact.displacedBy,
      index: _newIndex
    });
  }

  var newIndex = fromCombine({
    isMovingForward: isMovingForward,
    destination: destination,
    displaced: previousImpact.displaced,
    draggables: draggables,
    combine: wasAt.combine,
    afterCritical: afterCritical
  });

  if (newIndex == null) {
    return null;
  }

  return calculateReorderImpact({
    draggable: draggable,
    insideDestination: insideDestination,
    destination: destination,
    viewport: viewport,
    last: previousImpact.displaced,
    displacedBy: previousImpact.displacedBy,
    index: newIndex
  });
});

var getCombinedItemDisplacement = (function (_ref) {
  var displaced = _ref.displaced,
      afterCritical = _ref.afterCritical,
      combineWith = _ref.combineWith,
      displacedBy = _ref.displacedBy;
  var isDisplaced = Boolean(displaced.visible[combineWith] || displaced.invisible[combineWith]);

  if (didStartAfterCritical(combineWith, afterCritical)) {
    return isDisplaced ? origin : negate(displacedBy.point);
  }

  return isDisplaced ? displacedBy.point : origin;
});

var whenCombining = (function (_ref) {
  var afterCritical = _ref.afterCritical,
      impact = _ref.impact,
      draggables = _ref.draggables;
  var combine = tryGetCombine(impact);
  !combine ? invariant(false) : void 0;
  var combineWith = combine.draggableId;
  var center = draggables[combineWith].page.borderBox.center;
  var displaceBy = getCombinedItemDisplacement({
    displaced: impact.displaced,
    afterCritical: afterCritical,
    combineWith: combineWith,
    displacedBy: impact.displacedBy
  });
  return add(center, displaceBy);
});

var distanceFromStartToBorderBoxCenter = function distanceFromStartToBorderBoxCenter(axis, box) {
  return box.margin[axis.start] + box.borderBox[axis.size] / 2;
};

var distanceFromEndToBorderBoxCenter = function distanceFromEndToBorderBoxCenter(axis, box) {
  return box.margin[axis.end] + box.borderBox[axis.size] / 2;
};

var getCrossAxisBorderBoxCenter = function getCrossAxisBorderBoxCenter(axis, target, isMoving) {
  return target[axis.crossAxisStart] + isMoving.margin[axis.crossAxisStart] + isMoving.borderBox[axis.crossAxisSize] / 2;
};

var goAfter = function goAfter(_ref) {
  var axis = _ref.axis,
      moveRelativeTo = _ref.moveRelativeTo,
      isMoving = _ref.isMoving;
  return patch(axis.line, moveRelativeTo.marginBox[axis.end] + distanceFromStartToBorderBoxCenter(axis, isMoving), getCrossAxisBorderBoxCenter(axis, moveRelativeTo.marginBox, isMoving));
};
var goBefore = function goBefore(_ref2) {
  var axis = _ref2.axis,
      moveRelativeTo = _ref2.moveRelativeTo,
      isMoving = _ref2.isMoving;
  return patch(axis.line, moveRelativeTo.marginBox[axis.start] - distanceFromEndToBorderBoxCenter(axis, isMoving), getCrossAxisBorderBoxCenter(axis, moveRelativeTo.marginBox, isMoving));
};
var goIntoStart = function goIntoStart(_ref3) {
  var axis = _ref3.axis,
      moveInto = _ref3.moveInto,
      isMoving = _ref3.isMoving;
  return patch(axis.line, moveInto.contentBox[axis.start] + distanceFromStartToBorderBoxCenter(axis, isMoving), getCrossAxisBorderBoxCenter(axis, moveInto.contentBox, isMoving));
};

var whenReordering = (function (_ref) {
  var impact = _ref.impact,
      draggable = _ref.draggable,
      draggables = _ref.draggables,
      droppable = _ref.droppable,
      afterCritical = _ref.afterCritical;
  var insideDestination = getDraggablesInsideDroppable(droppable.descriptor.id, draggables);
  var draggablePage = draggable.page;
  var axis = droppable.axis;

  if (!insideDestination.length) {
    return goIntoStart({
      axis: axis,
      moveInto: droppable.page,
      isMoving: draggablePage
    });
  }

  var displaced = impact.displaced,
      displacedBy = impact.displacedBy;
  var closestAfter = displaced.all[0];

  if (closestAfter) {
    var closest = draggables[closestAfter];

    if (didStartAfterCritical(closestAfter, afterCritical)) {
      return goBefore({
        axis: axis,
        moveRelativeTo: closest.page,
        isMoving: draggablePage
      });
    }

    var withDisplacement = offset(closest.page, displacedBy.point);
    return goBefore({
      axis: axis,
      moveRelativeTo: withDisplacement,
      isMoving: draggablePage
    });
  }

  var last = insideDestination[insideDestination.length - 1];

  if (last.descriptor.id === draggable.descriptor.id) {
    return draggablePage.borderBox.center;
  }

  if (didStartAfterCritical(last.descriptor.id, afterCritical)) {
    var page = offset(last.page, negate(afterCritical.displacedBy.point));
    return goAfter({
      axis: axis,
      moveRelativeTo: page,
      isMoving: draggablePage
    });
  }

  return goAfter({
    axis: axis,
    moveRelativeTo: last.page,
    isMoving: draggablePage
  });
});

var withDroppableDisplacement = (function (droppable, point) {
  var frame = droppable.frame;

  if (!frame) {
    return point;
  }

  return add(point, frame.scroll.diff.displacement);
});

var getResultWithoutDroppableDisplacement = function getResultWithoutDroppableDisplacement(_ref) {
  var impact = _ref.impact,
      draggable = _ref.draggable,
      droppable = _ref.droppable,
      draggables = _ref.draggables,
      afterCritical = _ref.afterCritical;
  var original = draggable.page.borderBox.center;
  var at = impact.at;

  if (!droppable) {
    return original;
  }

  if (!at) {
    return original;
  }

  if (at.type === 'REORDER') {
    return whenReordering({
      impact: impact,
      draggable: draggable,
      draggables: draggables,
      droppable: droppable,
      afterCritical: afterCritical
    });
  }

  return whenCombining({
    impact: impact,
    draggables: draggables,
    afterCritical: afterCritical
  });
};

var getPageBorderBoxCenterFromImpact = (function (args) {
  var withoutDisplacement = getResultWithoutDroppableDisplacement(args);
  var droppable = args.droppable;
  var withDisplacement = droppable ? withDroppableDisplacement(droppable, withoutDisplacement) : withoutDisplacement;
  return withDisplacement;
});

var scrollViewport = (function (viewport, newScroll) {
  var diff = subtract(newScroll, viewport.scroll.initial);
  var displacement = negate(diff);
  var frame = getRect({
    top: newScroll.y,
    bottom: newScroll.y + viewport.frame.height,
    left: newScroll.x,
    right: newScroll.x + viewport.frame.width
  });
  var updated = {
    frame: frame,
    scroll: {
      initial: viewport.scroll.initial,
      max: viewport.scroll.max,
      current: newScroll,
      diff: {
        value: diff,
        displacement: displacement
      }
    }
  };
  return updated;
});

function getDraggables(ids, draggables) {
  return ids.map(function (id) {
    return draggables[id];
  });
}

function tryGetVisible(id, groups) {
  for (var i = 0; i < groups.length; i++) {
    var displacement = groups[i].visible[id];

    if (displacement) {
      return displacement;
    }
  }

  return null;
}

var speculativelyIncrease = (function (_ref) {
  var impact = _ref.impact,
      viewport = _ref.viewport,
      destination = _ref.destination,
      draggables = _ref.draggables,
      maxScrollChange = _ref.maxScrollChange;
  var scrolledViewport = scrollViewport(viewport, add(viewport.scroll.current, maxScrollChange));
  var scrolledDroppable = destination.frame ? scrollDroppable(destination, add(destination.frame.scroll.current, maxScrollChange)) : destination;
  var last = impact.displaced;
  var withViewportScroll = getDisplacementGroups({
    afterDragging: getDraggables(last.all, draggables),
    destination: destination,
    displacedBy: impact.displacedBy,
    viewport: scrolledViewport.frame,
    last: last,
    forceShouldAnimate: false
  });
  var withDroppableScroll = getDisplacementGroups({
    afterDragging: getDraggables(last.all, draggables),
    destination: scrolledDroppable,
    displacedBy: impact.displacedBy,
    viewport: viewport.frame,
    last: last,
    forceShouldAnimate: false
  });
  var invisible = {};
  var visible = {};
  var groups = [last, withViewportScroll, withDroppableScroll];
  last.all.forEach(function (id) {
    var displacement = tryGetVisible(id, groups);

    if (displacement) {
      visible[id] = displacement;
      return;
    }

    invisible[id] = true;
  });

  var newImpact = _extends({}, impact, {
    displaced: {
      all: last.all,
      invisible: invisible,
      visible: visible
    }
  });

  return newImpact;
});

var withViewportDisplacement = (function (viewport, point) {
  return add(viewport.scroll.diff.displacement, point);
});

var getClientFromPageBorderBoxCenter = (function (_ref) {
  var pageBorderBoxCenter = _ref.pageBorderBoxCenter,
      draggable = _ref.draggable,
      viewport = _ref.viewport;
  var withoutPageScrollChange = withViewportDisplacement(viewport, pageBorderBoxCenter);
  var offset = subtract(withoutPageScrollChange, draggable.page.borderBox.center);
  return add(draggable.client.borderBox.center, offset);
});

var isTotallyVisibleInNewLocation = (function (_ref) {
  var draggable = _ref.draggable,
      destination = _ref.destination,
      newPageBorderBoxCenter = _ref.newPageBorderBoxCenter,
      viewport = _ref.viewport,
      withDroppableDisplacement = _ref.withDroppableDisplacement,
      _ref$onlyOnMainAxis = _ref.onlyOnMainAxis,
      onlyOnMainAxis = _ref$onlyOnMainAxis === void 0 ? false : _ref$onlyOnMainAxis;
  var changeNeeded = subtract(newPageBorderBoxCenter, draggable.page.borderBox.center);
  var shifted = offsetByPosition(draggable.page.borderBox, changeNeeded);
  var args = {
    target: shifted,
    destination: destination,
    withDroppableDisplacement: withDroppableDisplacement,
    viewport: viewport
  };
  return onlyOnMainAxis ? isTotallyVisibleOnAxis(args) : isTotallyVisible(args);
});

var moveToNextPlace = (function (_ref) {
  var isMovingForward = _ref.isMovingForward,
      draggable = _ref.draggable,
      destination = _ref.destination,
      draggables = _ref.draggables,
      previousImpact = _ref.previousImpact,
      viewport = _ref.viewport,
      previousPageBorderBoxCenter = _ref.previousPageBorderBoxCenter,
      previousClientSelection = _ref.previousClientSelection,
      afterCritical = _ref.afterCritical;

  if (!destination.isEnabled) {
    return null;
  }

  var insideDestination = getDraggablesInsideDroppable(destination.descriptor.id, draggables);
  var isInHomeList = isHomeOf(draggable, destination);
  var impact = moveToNextCombine({
    isMovingForward: isMovingForward,
    draggable: draggable,
    destination: destination,
    insideDestination: insideDestination,
    previousImpact: previousImpact
  }) || moveToNextIndex({
    isMovingForward: isMovingForward,
    isInHomeList: isInHomeList,
    draggable: draggable,
    draggables: draggables,
    destination: destination,
    insideDestination: insideDestination,
    previousImpact: previousImpact,
    viewport: viewport,
    afterCritical: afterCritical
  });

  if (!impact) {
    return null;
  }

  var pageBorderBoxCenter = getPageBorderBoxCenterFromImpact({
    impact: impact,
    draggable: draggable,
    droppable: destination,
    draggables: draggables,
    afterCritical: afterCritical
  });
  var isVisibleInNewLocation = isTotallyVisibleInNewLocation({
    draggable: draggable,
    destination: destination,
    newPageBorderBoxCenter: pageBorderBoxCenter,
    viewport: viewport.frame,
    withDroppableDisplacement: false,
    onlyOnMainAxis: true
  });

  if (isVisibleInNewLocation) {
    var clientSelection = getClientFromPageBorderBoxCenter({
      pageBorderBoxCenter: pageBorderBoxCenter,
      draggable: draggable,
      viewport: viewport
    });
    return {
      clientSelection: clientSelection,
      impact: impact,
      scrollJumpRequest: null
    };
  }

  var distance = subtract(pageBorderBoxCenter, previousPageBorderBoxCenter);
  var cautious = speculativelyIncrease({
    impact: impact,
    viewport: viewport,
    destination: destination,
    draggables: draggables,
    maxScrollChange: distance
  });
  return {
    clientSelection: previousClientSelection,
    impact: cautious,
    scrollJumpRequest: distance
  };
});

var getKnownActive = function getKnownActive(droppable) {
  var rect = droppable.subject.active;
  !rect ? invariant(false) : void 0;
  return rect;
};

var getBestCrossAxisDroppable = (function (_ref) {
  var isMovingForward = _ref.isMovingForward,
      pageBorderBoxCenter = _ref.pageBorderBoxCenter,
      source = _ref.source,
      droppables = _ref.droppables,
      viewport = _ref.viewport;
  var active = source.subject.active;

  if (!active) {
    return null;
  }

  var axis = source.axis;
  var isBetweenSourceClipped = isWithin(active[axis.start], active[axis.end]);
  var candidates = toDroppableList(droppables).filter(function (droppable) {
    return droppable !== source;
  }).filter(function (droppable) {
    return droppable.isEnabled;
  }).filter(function (droppable) {
    return Boolean(droppable.subject.active);
  }).filter(function (droppable) {
    return isPartiallyVisibleThroughFrame(viewport.frame)(getKnownActive(droppable));
  }).filter(function (droppable) {
    var activeOfTarget = getKnownActive(droppable);

    if (isMovingForward) {
      return active[axis.crossAxisEnd] < activeOfTarget[axis.crossAxisEnd];
    }

    return activeOfTarget[axis.crossAxisStart] < active[axis.crossAxisStart];
  }).filter(function (droppable) {
    var activeOfTarget = getKnownActive(droppable);
    var isBetweenDestinationClipped = isWithin(activeOfTarget[axis.start], activeOfTarget[axis.end]);
    return isBetweenSourceClipped(activeOfTarget[axis.start]) || isBetweenSourceClipped(activeOfTarget[axis.end]) || isBetweenDestinationClipped(active[axis.start]) || isBetweenDestinationClipped(active[axis.end]);
  }).sort(function (a, b) {
    var first = getKnownActive(a)[axis.crossAxisStart];
    var second = getKnownActive(b)[axis.crossAxisStart];

    if (isMovingForward) {
      return first - second;
    }

    return second - first;
  }).filter(function (droppable, index, array) {
    return getKnownActive(droppable)[axis.crossAxisStart] === getKnownActive(array[0])[axis.crossAxisStart];
  });

  if (!candidates.length) {
    return null;
  }

  if (candidates.length === 1) {
    return candidates[0];
  }

  var contains = candidates.filter(function (droppable) {
    var isWithinDroppable = isWithin(getKnownActive(droppable)[axis.start], getKnownActive(droppable)[axis.end]);
    return isWithinDroppable(pageBorderBoxCenter[axis.line]);
  });

  if (contains.length === 1) {
    return contains[0];
  }

  if (contains.length > 1) {
    return contains.sort(function (a, b) {
      return getKnownActive(a)[axis.start] - getKnownActive(b)[axis.start];
    })[0];
  }

  return candidates.sort(function (a, b) {
    var first = closest(pageBorderBoxCenter, getCorners(getKnownActive(a)));
    var second = closest(pageBorderBoxCenter, getCorners(getKnownActive(b)));

    if (first !== second) {
      return first - second;
    }

    return getKnownActive(a)[axis.start] - getKnownActive(b)[axis.start];
  })[0];
});

var getCurrentPageBorderBoxCenter = function getCurrentPageBorderBoxCenter(draggable, afterCritical) {
  var original = draggable.page.borderBox.center;
  return didStartAfterCritical(draggable.descriptor.id, afterCritical) ? subtract(original, afterCritical.displacedBy.point) : original;
};
var getCurrentPageBorderBox = function getCurrentPageBorderBox(draggable, afterCritical) {
  var original = draggable.page.borderBox;
  return didStartAfterCritical(draggable.descriptor.id, afterCritical) ? offsetByPosition(original, negate(afterCritical.displacedBy.point)) : original;
};

var getClosestDraggable = (function (_ref) {
  var pageBorderBoxCenter = _ref.pageBorderBoxCenter,
      viewport = _ref.viewport,
      destination = _ref.destination,
      insideDestination = _ref.insideDestination,
      afterCritical = _ref.afterCritical;
  var sorted = insideDestination.filter(function (draggable) {
    return isTotallyVisible({
      target: getCurrentPageBorderBox(draggable, afterCritical),
      destination: destination,
      viewport: viewport.frame,
      withDroppableDisplacement: true
    });
  }).sort(function (a, b) {
    var distanceToA = distance(pageBorderBoxCenter, withDroppableDisplacement(destination, getCurrentPageBorderBoxCenter(a, afterCritical)));
    var distanceToB = distance(pageBorderBoxCenter, withDroppableDisplacement(destination, getCurrentPageBorderBoxCenter(b, afterCritical)));

    if (distanceToA < distanceToB) {
      return -1;
    }

    if (distanceToB < distanceToA) {
      return 1;
    }

    return a.descriptor.index - b.descriptor.index;
  });
  return sorted[0] || null;
});

var getDisplacedBy = memoizeOne(function getDisplacedBy(axis, displaceBy) {
  var displacement = displaceBy[axis.line];
  return {
    value: displacement,
    point: patch(axis.line, displacement)
  };
});

var getRequiredGrowthForPlaceholder = function getRequiredGrowthForPlaceholder(droppable, placeholderSize, draggables) {
  var axis = droppable.axis;

  if (droppable.descriptor.mode === 'virtual') {
    return patch(axis.line, placeholderSize[axis.line]);
  }

  var availableSpace = droppable.subject.page.contentBox[axis.size];
  var insideDroppable = getDraggablesInsideDroppable(droppable.descriptor.id, draggables);
  var spaceUsed = insideDroppable.reduce(function (sum, dimension) {
    return sum + dimension.client.marginBox[axis.size];
  }, 0);
  var requiredSpace = spaceUsed + placeholderSize[axis.line];
  var needsToGrowBy = requiredSpace - availableSpace;

  if (needsToGrowBy <= 0) {
    return null;
  }

  return patch(axis.line, needsToGrowBy);
};

var withMaxScroll = function withMaxScroll(frame, max) {
  return _extends({}, frame, {
    scroll: _extends({}, frame.scroll, {
      max: max
    })
  });
};

var addPlaceholder = function addPlaceholder(droppable, draggable, draggables) {
  var frame = droppable.frame;
  !!isHomeOf(draggable, droppable) ? invariant(false) : void 0;
  !!droppable.subject.withPlaceholder ? invariant(false) : void 0;
  var placeholderSize = getDisplacedBy(droppable.axis, draggable.displaceBy).point;
  var requiredGrowth = getRequiredGrowthForPlaceholder(droppable, placeholderSize, draggables);
  var added = {
    placeholderSize: placeholderSize,
    increasedBy: requiredGrowth,
    oldFrameMaxScroll: droppable.frame ? droppable.frame.scroll.max : null
  };

  if (!frame) {
    var _subject = getSubject({
      page: droppable.subject.page,
      withPlaceholder: added,
      axis: droppable.axis,
      frame: droppable.frame
    });

    return _extends({}, droppable, {
      subject: _subject
    });
  }

  var maxScroll = requiredGrowth ? add(frame.scroll.max, requiredGrowth) : frame.scroll.max;
  var newFrame = withMaxScroll(frame, maxScroll);
  var subject = getSubject({
    page: droppable.subject.page,
    withPlaceholder: added,
    axis: droppable.axis,
    frame: newFrame
  });
  return _extends({}, droppable, {
    subject: subject,
    frame: newFrame
  });
};
var removePlaceholder = function removePlaceholder(droppable) {
  var added = droppable.subject.withPlaceholder;
  !added ? invariant(false) : void 0;
  var frame = droppable.frame;

  if (!frame) {
    var _subject2 = getSubject({
      page: droppable.subject.page,
      axis: droppable.axis,
      frame: null,
      withPlaceholder: null
    });

    return _extends({}, droppable, {
      subject: _subject2
    });
  }

  var oldMaxScroll = added.oldFrameMaxScroll;
  !oldMaxScroll ? invariant(false) : void 0;
  var newFrame = withMaxScroll(frame, oldMaxScroll);
  var subject = getSubject({
    page: droppable.subject.page,
    axis: droppable.axis,
    frame: newFrame,
    withPlaceholder: null
  });
  return _extends({}, droppable, {
    subject: subject,
    frame: newFrame
  });
};

var moveToNewDroppable = (function (_ref) {
  var previousPageBorderBoxCenter = _ref.previousPageBorderBoxCenter,
      moveRelativeTo = _ref.moveRelativeTo,
      insideDestination = _ref.insideDestination,
      draggable = _ref.draggable,
      draggables = _ref.draggables,
      destination = _ref.destination,
      viewport = _ref.viewport,
      afterCritical = _ref.afterCritical;

  if (!moveRelativeTo) {
    if (insideDestination.length) {
      return null;
    }

    var proposed = {
      displaced: emptyGroups,
      displacedBy: noDisplacedBy,
      at: {
        type: 'REORDER',
        destination: {
          droppableId: destination.descriptor.id,
          index: 0
        }
      }
    };
    var proposedPageBorderBoxCenter = getPageBorderBoxCenterFromImpact({
      impact: proposed,
      draggable: draggable,
      droppable: destination,
      draggables: draggables,
      afterCritical: afterCritical
    });
    var withPlaceholder = isHomeOf(draggable, destination) ? destination : addPlaceholder(destination, draggable, draggables);
    var isVisibleInNewLocation = isTotallyVisibleInNewLocation({
      draggable: draggable,
      destination: withPlaceholder,
      newPageBorderBoxCenter: proposedPageBorderBoxCenter,
      viewport: viewport.frame,
      withDroppableDisplacement: false,
      onlyOnMainAxis: true
    });
    return isVisibleInNewLocation ? proposed : null;
  }

  var isGoingBeforeTarget = Boolean(previousPageBorderBoxCenter[destination.axis.line] <= moveRelativeTo.page.borderBox.center[destination.axis.line]);

  var proposedIndex = function () {
    var relativeTo = moveRelativeTo.descriptor.index;

    if (moveRelativeTo.descriptor.id === draggable.descriptor.id) {
      return relativeTo;
    }

    if (isGoingBeforeTarget) {
      return relativeTo;
    }

    return relativeTo + 1;
  }();

  var displacedBy = getDisplacedBy(destination.axis, draggable.displaceBy);
  return calculateReorderImpact({
    draggable: draggable,
    insideDestination: insideDestination,
    destination: destination,
    viewport: viewport,
    displacedBy: displacedBy,
    last: emptyGroups,
    index: proposedIndex
  });
});

var moveCrossAxis = (function (_ref) {
  var isMovingForward = _ref.isMovingForward,
      previousPageBorderBoxCenter = _ref.previousPageBorderBoxCenter,
      draggable = _ref.draggable,
      isOver = _ref.isOver,
      draggables = _ref.draggables,
      droppables = _ref.droppables,
      viewport = _ref.viewport,
      afterCritical = _ref.afterCritical;
  var destination = getBestCrossAxisDroppable({
    isMovingForward: isMovingForward,
    pageBorderBoxCenter: previousPageBorderBoxCenter,
    source: isOver,
    droppables: droppables,
    viewport: viewport
  });

  if (!destination) {
    return null;
  }

  var insideDestination = getDraggablesInsideDroppable(destination.descriptor.id, draggables);
  var moveRelativeTo = getClosestDraggable({
    pageBorderBoxCenter: previousPageBorderBoxCenter,
    viewport: viewport,
    destination: destination,
    insideDestination: insideDestination,
    afterCritical: afterCritical
  });
  var impact = moveToNewDroppable({
    previousPageBorderBoxCenter: previousPageBorderBoxCenter,
    destination: destination,
    draggable: draggable,
    draggables: draggables,
    moveRelativeTo: moveRelativeTo,
    insideDestination: insideDestination,
    viewport: viewport,
    afterCritical: afterCritical
  });

  if (!impact) {
    return null;
  }

  var pageBorderBoxCenter = getPageBorderBoxCenterFromImpact({
    impact: impact,
    draggable: draggable,
    droppable: destination,
    draggables: draggables,
    afterCritical: afterCritical
  });
  var clientSelection = getClientFromPageBorderBoxCenter({
    pageBorderBoxCenter: pageBorderBoxCenter,
    draggable: draggable,
    viewport: viewport
  });
  return {
    clientSelection: clientSelection,
    impact: impact,
    scrollJumpRequest: null
  };
});

var whatIsDraggedOver = (function (impact) {
  var at = impact.at;

  if (!at) {
    return null;
  }

  if (at.type === 'REORDER') {
    return at.destination.droppableId;
  }

  return at.combine.droppableId;
});

var getDroppableOver = function getDroppableOver(impact, droppables) {
  var id = whatIsDraggedOver(impact);
  return id ? droppables[id] : null;
};

var moveInDirection = (function (_ref) {
  var state = _ref.state,
      type = _ref.type;
  var isActuallyOver = getDroppableOver(state.impact, state.dimensions.droppables);
  var isMainAxisMovementAllowed = Boolean(isActuallyOver);
  var home = state.dimensions.droppables[state.critical.droppable.id];
  var isOver = isActuallyOver || home;
  var direction = isOver.axis.direction;
  var isMovingOnMainAxis = direction === 'vertical' && (type === 'MOVE_UP' || type === 'MOVE_DOWN') || direction === 'horizontal' && (type === 'MOVE_LEFT' || type === 'MOVE_RIGHT');

  if (isMovingOnMainAxis && !isMainAxisMovementAllowed) {
    return null;
  }

  var isMovingForward = type === 'MOVE_DOWN' || type === 'MOVE_RIGHT';
  var draggable = state.dimensions.draggables[state.critical.draggable.id];
  var previousPageBorderBoxCenter = state.current.page.borderBoxCenter;
  var _state$dimensions = state.dimensions,
      draggables = _state$dimensions.draggables,
      droppables = _state$dimensions.droppables;
  return isMovingOnMainAxis ? moveToNextPlace({
    isMovingForward: isMovingForward,
    previousPageBorderBoxCenter: previousPageBorderBoxCenter,
    draggable: draggable,
    destination: isOver,
    draggables: draggables,
    viewport: state.viewport,
    previousClientSelection: state.current.client.selection,
    previousImpact: state.impact,
    afterCritical: state.afterCritical
  }) : moveCrossAxis({
    isMovingForward: isMovingForward,
    previousPageBorderBoxCenter: previousPageBorderBoxCenter,
    draggable: draggable,
    isOver: isOver,
    draggables: draggables,
    droppables: droppables,
    viewport: state.viewport,
    afterCritical: state.afterCritical
  });
});

function isMovementAllowed(state) {
  return state.phase === 'DRAGGING' || state.phase === 'COLLECTING';
}

function isPositionInFrame(frame) {
  var isWithinVertical = isWithin(frame.top, frame.bottom);
  var isWithinHorizontal = isWithin(frame.left, frame.right);
  return function run(point) {
    return isWithinVertical(point.y) && isWithinHorizontal(point.x);
  };
}

function getHasOverlap(first, second) {
  return first.left < second.right && first.right > second.left && first.top < second.bottom && first.bottom > second.top;
}

function getFurthestAway(_ref) {
  var pageBorderBox = _ref.pageBorderBox,
      draggable = _ref.draggable,
      candidates = _ref.candidates;
  var startCenter = draggable.page.borderBox.center;
  var sorted = candidates.map(function (candidate) {
    var axis = candidate.axis;
    var target = patch(candidate.axis.line, pageBorderBox.center[axis.line], candidate.page.borderBox.center[axis.crossAxisLine]);
    return {
      id: candidate.descriptor.id,
      distance: distance(startCenter, target)
    };
  }).sort(function (a, b) {
    return b.distance - a.distance;
  });
  return sorted[0] ? sorted[0].id : null;
}

function getDroppableOver$1(_ref2) {
  var pageBorderBox = _ref2.pageBorderBox,
      draggable = _ref2.draggable,
      droppables = _ref2.droppables;
  var candidates = toDroppableList(droppables).filter(function (item) {
    if (!item.isEnabled) {
      return false;
    }

    var active = item.subject.active;

    if (!active) {
      return false;
    }

    if (!getHasOverlap(pageBorderBox, active)) {
      return false;
    }

    if (isPositionInFrame(active)(pageBorderBox.center)) {
      return true;
    }

    var axis = item.axis;
    var childCenter = active.center[axis.crossAxisLine];
    var crossAxisStart = pageBorderBox[axis.crossAxisStart];
    var crossAxisEnd = pageBorderBox[axis.crossAxisEnd];
    var isContained = isWithin(active[axis.crossAxisStart], active[axis.crossAxisEnd]);
    var isStartContained = isContained(crossAxisStart);
    var isEndContained = isContained(crossAxisEnd);

    if (!isStartContained && !isEndContained) {
      return true;
    }

    if (isStartContained) {
      return crossAxisStart < childCenter;
    }

    return crossAxisEnd > childCenter;
  });

  if (!candidates.length) {
    return null;
  }

  if (candidates.length === 1) {
    return candidates[0].descriptor.id;
  }

  return getFurthestAway({
    pageBorderBox: pageBorderBox,
    draggable: draggable,
    candidates: candidates
  });
}

var offsetRectByPosition = function offsetRectByPosition(rect, point) {
  return getRect(offsetByPosition(rect, point));
};

var withDroppableScroll = (function (droppable, area) {
  var frame = droppable.frame;

  if (!frame) {
    return area;
  }

  return offsetRectByPosition(area, frame.scroll.diff.value);
});

function getIsDisplaced(_ref) {
  var displaced = _ref.displaced,
      id = _ref.id;
  return Boolean(displaced.visible[id] || displaced.invisible[id]);
}

function atIndex(_ref) {
  var draggable = _ref.draggable,
      closest = _ref.closest,
      inHomeList = _ref.inHomeList;

  if (!closest) {
    return null;
  }

  if (!inHomeList) {
    return closest.descriptor.index;
  }

  if (closest.descriptor.index > draggable.descriptor.index) {
    return closest.descriptor.index - 1;
  }

  return closest.descriptor.index;
}

var getReorderImpact = (function (_ref2) {
  var targetRect = _ref2.pageBorderBoxWithDroppableScroll,
      draggable = _ref2.draggable,
      destination = _ref2.destination,
      insideDestination = _ref2.insideDestination,
      last = _ref2.last,
      viewport = _ref2.viewport,
      afterCritical = _ref2.afterCritical;
  var axis = destination.axis;
  var displacedBy = getDisplacedBy(destination.axis, draggable.displaceBy);
  var displacement = displacedBy.value;
  var targetStart = targetRect[axis.start];
  var targetEnd = targetRect[axis.end];
  var withoutDragging = removeDraggableFromList(draggable, insideDestination);
  var closest = find(withoutDragging, function (child) {
    var id = child.descriptor.id;
    var childCenter = child.page.borderBox.center[axis.line];
    var didStartAfterCritical$1 = didStartAfterCritical(id, afterCritical);
    var isDisplaced = getIsDisplaced({
      displaced: last,
      id: id
    });

    if (didStartAfterCritical$1) {
      if (isDisplaced) {
        return targetEnd <= childCenter;
      }

      return targetStart < childCenter - displacement;
    }

    if (isDisplaced) {
      return targetEnd <= childCenter + displacement;
    }

    return targetStart < childCenter;
  });
  var newIndex = atIndex({
    draggable: draggable,
    closest: closest,
    inHomeList: isHomeOf(draggable, destination)
  });
  return calculateReorderImpact({
    draggable: draggable,
    insideDestination: insideDestination,
    destination: destination,
    viewport: viewport,
    last: last,
    displacedBy: displacedBy,
    index: newIndex
  });
});

var combineThresholdDivisor = 4;
var getCombineImpact = (function (_ref) {
  var draggable = _ref.draggable,
      targetRect = _ref.pageBorderBoxWithDroppableScroll,
      previousImpact = _ref.previousImpact,
      destination = _ref.destination,
      insideDestination = _ref.insideDestination,
      afterCritical = _ref.afterCritical;

  if (!destination.isCombineEnabled) {
    return null;
  }

  var axis = destination.axis;
  var displacedBy = getDisplacedBy(destination.axis, draggable.displaceBy);
  var displacement = displacedBy.value;
  var targetStart = targetRect[axis.start];
  var targetEnd = targetRect[axis.end];
  var withoutDragging = removeDraggableFromList(draggable, insideDestination);
  var combineWith = find(withoutDragging, function (child) {
    var id = child.descriptor.id;
    var childRect = child.page.borderBox;
    var childSize = childRect[axis.size];
    var threshold = childSize / combineThresholdDivisor;
    var didStartAfterCritical$1 = didStartAfterCritical(id, afterCritical);
    var isDisplaced = getIsDisplaced({
      displaced: previousImpact.displaced,
      id: id
    });

    if (didStartAfterCritical$1) {
      if (isDisplaced) {
        return targetEnd > childRect[axis.start] + threshold && targetEnd < childRect[axis.end] - threshold;
      }

      return targetStart > childRect[axis.start] - displacement + threshold && targetStart < childRect[axis.end] - displacement - threshold;
    }

    if (isDisplaced) {
      return targetEnd > childRect[axis.start] + displacement + threshold && targetEnd < childRect[axis.end] + displacement - threshold;
    }

    return targetStart > childRect[axis.start] + threshold && targetStart < childRect[axis.end] - threshold;
  });

  if (!combineWith) {
    return null;
  }

  var impact = {
    displacedBy: displacedBy,
    displaced: previousImpact.displaced,
    at: {
      type: 'COMBINE',
      combine: {
        draggableId: combineWith.descriptor.id,
        droppableId: destination.descriptor.id
      }
    }
  };
  return impact;
});

var getDragImpact = (function (_ref) {
  var pageOffset = _ref.pageOffset,
      draggable = _ref.draggable,
      draggables = _ref.draggables,
      droppables = _ref.droppables,
      previousImpact = _ref.previousImpact,
      viewport = _ref.viewport,
      afterCritical = _ref.afterCritical;
  var pageBorderBox = offsetRectByPosition(draggable.page.borderBox, pageOffset);
  var destinationId = getDroppableOver$1({
    pageBorderBox: pageBorderBox,
    draggable: draggable,
    droppables: droppables
  });

  if (!destinationId) {
    return noImpact;
  }

  var destination = droppables[destinationId];
  var insideDestination = getDraggablesInsideDroppable(destination.descriptor.id, draggables);
  var pageBorderBoxWithDroppableScroll = withDroppableScroll(destination, pageBorderBox);
  return getCombineImpact({
    pageBorderBoxWithDroppableScroll: pageBorderBoxWithDroppableScroll,
    draggable: draggable,
    previousImpact: previousImpact,
    destination: destination,
    insideDestination: insideDestination,
    afterCritical: afterCritical
  }) || getReorderImpact({
    pageBorderBoxWithDroppableScroll: pageBorderBoxWithDroppableScroll,
    draggable: draggable,
    destination: destination,
    insideDestination: insideDestination,
    last: previousImpact.displaced,
    viewport: viewport,
    afterCritical: afterCritical
  });
});

var patchDroppableMap = (function (droppables, updated) {
  var _extends2;

  return _extends({}, droppables, (_extends2 = {}, _extends2[updated.descriptor.id] = updated, _extends2));
});

var clearUnusedPlaceholder = function clearUnusedPlaceholder(_ref) {
  var previousImpact = _ref.previousImpact,
      impact = _ref.impact,
      droppables = _ref.droppables;
  var last = whatIsDraggedOver(previousImpact);
  var now = whatIsDraggedOver(impact);

  if (!last) {
    return droppables;
  }

  if (last === now) {
    return droppables;
  }

  var lastDroppable = droppables[last];

  if (!lastDroppable.subject.withPlaceholder) {
    return droppables;
  }

  var updated = removePlaceholder(lastDroppable);
  return patchDroppableMap(droppables, updated);
};

var recomputePlaceholders = (function (_ref2) {
  var draggable = _ref2.draggable,
      draggables = _ref2.draggables,
      droppables = _ref2.droppables,
      previousImpact = _ref2.previousImpact,
      impact = _ref2.impact;
  var cleaned = clearUnusedPlaceholder({
    previousImpact: previousImpact,
    impact: impact,
    droppables: droppables
  });
  var isOver = whatIsDraggedOver(impact);

  if (!isOver) {
    return cleaned;
  }

  var droppable = droppables[isOver];

  if (isHomeOf(draggable, droppable)) {
    return cleaned;
  }

  if (droppable.subject.withPlaceholder) {
    return cleaned;
  }

  var patched = addPlaceholder(droppable, draggable, draggables);
  return patchDroppableMap(cleaned, patched);
});

var update = (function (_ref) {
  var state = _ref.state,
      forcedClientSelection = _ref.clientSelection,
      forcedDimensions = _ref.dimensions,
      forcedViewport = _ref.viewport,
      forcedImpact = _ref.impact,
      scrollJumpRequest = _ref.scrollJumpRequest;
  var viewport = forcedViewport || state.viewport;
  var dimensions = forcedDimensions || state.dimensions;
  var clientSelection = forcedClientSelection || state.current.client.selection;
  var offset = subtract(clientSelection, state.initial.client.selection);
  var client = {
    offset: offset,
    selection: clientSelection,
    borderBoxCenter: add(state.initial.client.borderBoxCenter, offset)
  };
  var page = {
    selection: add(client.selection, viewport.scroll.current),
    borderBoxCenter: add(client.borderBoxCenter, viewport.scroll.current),
    offset: add(client.offset, viewport.scroll.diff.value)
  };
  var current = {
    client: client,
    page: page
  };

  if (state.phase === 'COLLECTING') {
    return _extends({
      phase: 'COLLECTING'
    }, state, {
      dimensions: dimensions,
      viewport: viewport,
      current: current
    });
  }

  var draggable = dimensions.draggables[state.critical.draggable.id];
  var newImpact = forcedImpact || getDragImpact({
    pageOffset: page.offset,
    draggable: draggable,
    draggables: dimensions.draggables,
    droppables: dimensions.droppables,
    previousImpact: state.impact,
    viewport: viewport,
    afterCritical: state.afterCritical
  });
  var withUpdatedPlaceholders = recomputePlaceholders({
    draggable: draggable,
    impact: newImpact,
    previousImpact: state.impact,
    draggables: dimensions.draggables,
    droppables: dimensions.droppables
  });

  var result = _extends({}, state, {
    current: current,
    dimensions: {
      draggables: dimensions.draggables,
      droppables: withUpdatedPlaceholders
    },
    impact: newImpact,
    viewport: viewport,
    scrollJumpRequest: scrollJumpRequest || null,
    forceShouldAnimate: scrollJumpRequest ? false : null
  });

  return result;
});

function getDraggables$1(ids, draggables) {
  return ids.map(function (id) {
    return draggables[id];
  });
}

var recompute = (function (_ref) {
  var impact = _ref.impact,
      viewport = _ref.viewport,
      draggables = _ref.draggables,
      destination = _ref.destination,
      forceShouldAnimate = _ref.forceShouldAnimate;
  var last = impact.displaced;
  var afterDragging = getDraggables$1(last.all, draggables);
  var displaced = getDisplacementGroups({
    afterDragging: afterDragging,
    destination: destination,
    displacedBy: impact.displacedBy,
    viewport: viewport.frame,
    forceShouldAnimate: forceShouldAnimate,
    last: last
  });
  return _extends({}, impact, {
    displaced: displaced
  });
});

var getClientBorderBoxCenter = (function (_ref) {
  var impact = _ref.impact,
      draggable = _ref.draggable,
      droppable = _ref.droppable,
      draggables = _ref.draggables,
      viewport = _ref.viewport,
      afterCritical = _ref.afterCritical;
  var pageBorderBoxCenter = getPageBorderBoxCenterFromImpact({
    impact: impact,
    draggable: draggable,
    draggables: draggables,
    droppable: droppable,
    afterCritical: afterCritical
  });
  return getClientFromPageBorderBoxCenter({
    pageBorderBoxCenter: pageBorderBoxCenter,
    draggable: draggable,
    viewport: viewport
  });
});

var refreshSnap = (function (_ref) {
  var state = _ref.state,
      forcedDimensions = _ref.dimensions,
      forcedViewport = _ref.viewport;
  !(state.movementMode === 'SNAP') ? invariant(false) : void 0;
  var needsVisibilityCheck = state.impact;
  var viewport = forcedViewport || state.viewport;
  var dimensions = forcedDimensions || state.dimensions;
  var draggables = dimensions.draggables,
      droppables = dimensions.droppables;
  var draggable = draggables[state.critical.draggable.id];
  var isOver = whatIsDraggedOver(needsVisibilityCheck);
  !isOver ? invariant(false) : void 0;
  var destination = droppables[isOver];
  var impact = recompute({
    impact: needsVisibilityCheck,
    viewport: viewport,
    destination: destination,
    draggables: draggables
  });
  var clientSelection = getClientBorderBoxCenter({
    impact: impact,
    draggable: draggable,
    droppable: destination,
    draggables: draggables,
    viewport: viewport,
    afterCritical: state.afterCritical
  });
  return update({
    impact: impact,
    clientSelection: clientSelection,
    state: state,
    dimensions: dimensions,
    viewport: viewport
  });
});

var getHomeLocation = (function (descriptor) {
  return {
    index: descriptor.index,
    droppableId: descriptor.droppableId
  };
});

var getLiftEffect = (function (_ref) {
  var draggable = _ref.draggable,
      home = _ref.home,
      draggables = _ref.draggables,
      viewport = _ref.viewport;
  var displacedBy = getDisplacedBy(home.axis, draggable.displaceBy);
  var insideHome = getDraggablesInsideDroppable(home.descriptor.id, draggables);
  var rawIndex = insideHome.indexOf(draggable);
  !(rawIndex !== -1) ? invariant(false) : void 0;
  var afterDragging = insideHome.slice(rawIndex + 1);
  var effected = afterDragging.reduce(function (previous, item) {
    previous[item.descriptor.id] = true;
    return previous;
  }, {});
  var afterCritical = {
    inVirtualList: home.descriptor.mode === 'virtual',
    displacedBy: displacedBy,
    effected: effected
  };
  var displaced = getDisplacementGroups({
    afterDragging: afterDragging,
    destination: home,
    displacedBy: displacedBy,
    last: null,
    viewport: viewport.frame,
    forceShouldAnimate: false
  });
  var impact = {
    displaced: displaced,
    displacedBy: displacedBy,
    at: {
      type: 'REORDER',
      destination: getHomeLocation(draggable.descriptor)
    }
  };
  return {
    impact: impact,
    afterCritical: afterCritical
  };
});

var patchDimensionMap = (function (dimensions, updated) {
  return {
    draggables: dimensions.draggables,
    droppables: patchDroppableMap(dimensions.droppables, updated)
  };
});

var offsetDraggable = (function (_ref) {
  var draggable = _ref.draggable,
      offset$1 = _ref.offset,
      initialWindowScroll = _ref.initialWindowScroll;
  var client = offset(draggable.client, offset$1);
  var page = withScroll(client, initialWindowScroll);

  var moved = _extends({}, draggable, {
    placeholder: _extends({}, draggable.placeholder, {
      client: client
    }),
    client: client,
    page: page
  });

  return moved;
});

var getFrame = (function (droppable) {
  var frame = droppable.frame;
  !frame ? invariant(false) : void 0;
  return frame;
});

var adjustAdditionsForScrollChanges = (function (_ref) {
  var additions = _ref.additions,
      updatedDroppables = _ref.updatedDroppables,
      viewport = _ref.viewport;
  var windowScrollChange = viewport.scroll.diff.value;
  return additions.map(function (draggable) {
    var droppableId = draggable.descriptor.droppableId;
    var modified = updatedDroppables[droppableId];
    var frame = getFrame(modified);
    var droppableScrollChange = frame.scroll.diff.value;
    var totalChange = add(windowScrollChange, droppableScrollChange);
    var moved = offsetDraggable({
      draggable: draggable,
      offset: totalChange,
      initialWindowScroll: viewport.scroll.initial
    });
    return moved;
  });
});

var publishWhileDraggingInVirtual = (function (_ref) {
  var state = _ref.state,
      published = _ref.published;
  var withScrollChange = published.modified.map(function (update) {
    var existing = state.dimensions.droppables[update.droppableId];
    var scrolled = scrollDroppable(existing, update.scroll);
    return scrolled;
  });

  var droppables = _extends({}, state.dimensions.droppables, {}, toDroppableMap(withScrollChange));

  var updatedAdditions = toDraggableMap(adjustAdditionsForScrollChanges({
    additions: published.additions,
    updatedDroppables: droppables,
    viewport: state.viewport
  }));

  var draggables = _extends({}, state.dimensions.draggables, {}, updatedAdditions);

  published.removals.forEach(function (id) {
    delete draggables[id];
  });
  var dimensions = {
    droppables: droppables,
    draggables: draggables
  };
  var wasOverId = whatIsDraggedOver(state.impact);
  var wasOver = wasOverId ? dimensions.droppables[wasOverId] : null;
  var draggable = dimensions.draggables[state.critical.draggable.id];
  var home = dimensions.droppables[state.critical.droppable.id];

  var _getLiftEffect = getLiftEffect({
    draggable: draggable,
    home: home,
    draggables: draggables,
    viewport: state.viewport
  }),
      onLiftImpact = _getLiftEffect.impact,
      afterCritical = _getLiftEffect.afterCritical;

  var previousImpact = wasOver && wasOver.isCombineEnabled ? state.impact : onLiftImpact;
  var impact = getDragImpact({
    pageOffset: state.current.page.offset,
    draggable: dimensions.draggables[state.critical.draggable.id],
    draggables: dimensions.draggables,
    droppables: dimensions.droppables,
    previousImpact: previousImpact,
    viewport: state.viewport,
    afterCritical: afterCritical
  });

  var draggingState = _extends({
    phase: 'DRAGGING'
  }, state, {
    phase: 'DRAGGING',
    impact: impact,
    onLiftImpact: onLiftImpact,
    dimensions: dimensions,
    afterCritical: afterCritical,
    forceShouldAnimate: false
  });

  if (state.phase === 'COLLECTING') {
    return draggingState;
  }

  var dropPending = _extends({
    phase: 'DROP_PENDING'
  }, draggingState, {
    phase: 'DROP_PENDING',
    reason: state.reason,
    isWaiting: false
  });

  return dropPending;
});

var isSnapping = function isSnapping(state) {
  return state.movementMode === 'SNAP';
};

var postDroppableChange = function postDroppableChange(state, updated, isEnabledChanging) {
  var dimensions = patchDimensionMap(state.dimensions, updated);

  if (!isSnapping(state) || isEnabledChanging) {
    return update({
      state: state,
      dimensions: dimensions
    });
  }

  return refreshSnap({
    state: state,
    dimensions: dimensions
  });
};

function removeScrollJumpRequest(state) {
  if (state.isDragging && state.movementMode === 'SNAP') {
    return _extends({
      phase: 'DRAGGING'
    }, state, {
      scrollJumpRequest: null
    });
  }

  return state;
}

var idle = {
  phase: 'IDLE',
  completed: null,
  shouldFlush: false
};
var reducer = (function (state, action) {
  if (state === void 0) {
    state = idle;
  }

  if (action.type === 'FLUSH') {
    return _extends({}, idle, {
      shouldFlush: true
    });
  }

  if (action.type === 'INITIAL_PUBLISH') {
    !(state.phase === 'IDLE') ? invariant(false) : void 0;
    var _action$payload = action.payload,
        critical = _action$payload.critical,
        clientSelection = _action$payload.clientSelection,
        viewport = _action$payload.viewport,
        dimensions = _action$payload.dimensions,
        movementMode = _action$payload.movementMode;
    var draggable = dimensions.draggables[critical.draggable.id];
    var home = dimensions.droppables[critical.droppable.id];
    var client = {
      selection: clientSelection,
      borderBoxCenter: draggable.client.borderBox.center,
      offset: origin
    };
    var initial = {
      client: client,
      page: {
        selection: add(client.selection, viewport.scroll.initial),
        borderBoxCenter: add(client.selection, viewport.scroll.initial),
        offset: add(client.selection, viewport.scroll.diff.value)
      }
    };
    var isWindowScrollAllowed = toDroppableList(dimensions.droppables).every(function (item) {
      return !item.isFixedOnPage;
    });

    var _getLiftEffect = getLiftEffect({
      draggable: draggable,
      home: home,
      draggables: dimensions.draggables,
      viewport: viewport
    }),
        impact = _getLiftEffect.impact,
        afterCritical = _getLiftEffect.afterCritical;

    var result = {
      phase: 'DRAGGING',
      isDragging: true,
      critical: critical,
      movementMode: movementMode,
      dimensions: dimensions,
      initial: initial,
      current: initial,
      isWindowScrollAllowed: isWindowScrollAllowed,
      impact: impact,
      afterCritical: afterCritical,
      onLiftImpact: impact,
      viewport: viewport,
      scrollJumpRequest: null,
      forceShouldAnimate: null
    };
    return result;
  }

  if (action.type === 'COLLECTION_STARTING') {
    if (state.phase === 'COLLECTING' || state.phase === 'DROP_PENDING') {
      return state;
    }

    !(state.phase === 'DRAGGING') ? invariant(false) : void 0;

    var _result = _extends({
      phase: 'COLLECTING'
    }, state, {
      phase: 'COLLECTING'
    });

    return _result;
  }

  if (action.type === 'PUBLISH_WHILE_DRAGGING') {
    !(state.phase === 'COLLECTING' || state.phase === 'DROP_PENDING') ? invariant(false) : void 0;
    return publishWhileDraggingInVirtual({
      state: state,
      published: action.payload
    });
  }

  if (action.type === 'MOVE') {
    if (state.phase === 'DROP_PENDING') {
      return state;
    }

    !isMovementAllowed(state) ? invariant(false) : void 0;
    var _clientSelection = action.payload.client;

    if (isEqual(_clientSelection, state.current.client.selection)) {
      return state;
    }

    return update({
      state: state,
      clientSelection: _clientSelection,
      impact: isSnapping(state) ? state.impact : null
    });
  }

  if (action.type === 'UPDATE_DROPPABLE_SCROLL') {
    if (state.phase === 'DROP_PENDING') {
      return removeScrollJumpRequest(state);
    }

    if (state.phase === 'COLLECTING') {
      return removeScrollJumpRequest(state);
    }

    !isMovementAllowed(state) ? invariant(false) : void 0;
    var _action$payload2 = action.payload,
        id = _action$payload2.id,
        newScroll = _action$payload2.newScroll;
    var target = state.dimensions.droppables[id];

    if (!target) {
      return state;
    }

    var scrolled = scrollDroppable(target, newScroll);
    return postDroppableChange(state, scrolled, false);
  }

  if (action.type === 'UPDATE_DROPPABLE_IS_ENABLED') {
    if (state.phase === 'DROP_PENDING') {
      return state;
    }

    !isMovementAllowed(state) ? invariant(false) : void 0;
    var _action$payload3 = action.payload,
        _id = _action$payload3.id,
        isEnabled = _action$payload3.isEnabled;
    var _target = state.dimensions.droppables[_id];
    !_target ? invariant(false) : void 0;
    !(_target.isEnabled !== isEnabled) ? invariant(false) : void 0;

    var updated = _extends({}, _target, {
      isEnabled: isEnabled
    });

    return postDroppableChange(state, updated, true);
  }

  if (action.type === 'UPDATE_DROPPABLE_IS_COMBINE_ENABLED') {
    if (state.phase === 'DROP_PENDING') {
      return state;
    }

    !isMovementAllowed(state) ? invariant(false) : void 0;
    var _action$payload4 = action.payload,
        _id2 = _action$payload4.id,
        isCombineEnabled = _action$payload4.isCombineEnabled;
    var _target2 = state.dimensions.droppables[_id2];
    !_target2 ? invariant(false) : void 0;
    !(_target2.isCombineEnabled !== isCombineEnabled) ? invariant(false) : void 0;

    var _updated = _extends({}, _target2, {
      isCombineEnabled: isCombineEnabled
    });

    return postDroppableChange(state, _updated, true);
  }

  if (action.type === 'MOVE_BY_WINDOW_SCROLL') {
    if (state.phase === 'DROP_PENDING' || state.phase === 'DROP_ANIMATING') {
      return state;
    }

    !isMovementAllowed(state) ? invariant(false) : void 0;
    !state.isWindowScrollAllowed ? invariant(false) : void 0;
    var _newScroll = action.payload.newScroll;

    if (isEqual(state.viewport.scroll.current, _newScroll)) {
      return removeScrollJumpRequest(state);
    }

    var _viewport = scrollViewport(state.viewport, _newScroll);

    if (isSnapping(state)) {
      return refreshSnap({
        state: state,
        viewport: _viewport
      });
    }

    return update({
      state: state,
      viewport: _viewport
    });
  }

  if (action.type === 'UPDATE_VIEWPORT_MAX_SCROLL') {
    if (!isMovementAllowed(state)) {
      return state;
    }

    var maxScroll = action.payload.maxScroll;

    if (isEqual(maxScroll, state.viewport.scroll.max)) {
      return state;
    }

    var withMaxScroll = _extends({}, state.viewport, {
      scroll: _extends({}, state.viewport.scroll, {
        max: maxScroll
      })
    });

    return _extends({
      phase: 'DRAGGING'
    }, state, {
      viewport: withMaxScroll
    });
  }

  if (action.type === 'MOVE_UP' || action.type === 'MOVE_DOWN' || action.type === 'MOVE_LEFT' || action.type === 'MOVE_RIGHT') {
    if (state.phase === 'COLLECTING' || state.phase === 'DROP_PENDING') {
      return state;
    }

    !(state.phase === 'DRAGGING') ? invariant(false) : void 0;

    var _result2 = moveInDirection({
      state: state,
      type: action.type
    });

    if (!_result2) {
      return state;
    }

    return update({
      state: state,
      impact: _result2.impact,
      clientSelection: _result2.clientSelection,
      scrollJumpRequest: _result2.scrollJumpRequest
    });
  }

  if (action.type === 'DROP_PENDING') {
    var reason = action.payload.reason;
    !(state.phase === 'COLLECTING') ? invariant(false) : void 0;

    var newState = _extends({
      phase: 'DROP_PENDING'
    }, state, {
      phase: 'DROP_PENDING',
      isWaiting: true,
      reason: reason
    });

    return newState;
  }

  if (action.type === 'DROP_ANIMATE') {
    var _action$payload5 = action.payload,
        completed = _action$payload5.completed,
        dropDuration = _action$payload5.dropDuration,
        newHomeClientOffset = _action$payload5.newHomeClientOffset;
    !(state.phase === 'DRAGGING' || state.phase === 'DROP_PENDING') ? invariant(false) : void 0;
    var _result3 = {
      phase: 'DROP_ANIMATING',
      completed: completed,
      dropDuration: dropDuration,
      newHomeClientOffset: newHomeClientOffset,
      dimensions: state.dimensions
    };
    return _result3;
  }

  if (action.type === 'DROP_COMPLETE') {
    var _completed = action.payload.completed;
    return {
      phase: 'IDLE',
      completed: _completed,
      shouldFlush: false
    };
  }

  return state;
});

var beforeInitialCapture = function beforeInitialCapture(args) {
  return {
    type: 'BEFORE_INITIAL_CAPTURE',
    payload: args
  };
};
var lift = function lift(args) {
  return {
    type: 'LIFT',
    payload: args
  };
};
var initialPublish = function initialPublish(args) {
  return {
    type: 'INITIAL_PUBLISH',
    payload: args
  };
};
var publishWhileDragging = function publishWhileDragging(args) {
  return {
    type: 'PUBLISH_WHILE_DRAGGING',
    payload: args
  };
};
var collectionStarting = function collectionStarting() {
  return {
    type: 'COLLECTION_STARTING',
    payload: null
  };
};
var updateDroppableScroll = function updateDroppableScroll(args) {
  return {
    type: 'UPDATE_DROPPABLE_SCROLL',
    payload: args
  };
};
var updateDroppableIsEnabled = function updateDroppableIsEnabled(args) {
  return {
    type: 'UPDATE_DROPPABLE_IS_ENABLED',
    payload: args
  };
};
var updateDroppableIsCombineEnabled = function updateDroppableIsCombineEnabled(args) {
  return {
    type: 'UPDATE_DROPPABLE_IS_COMBINE_ENABLED',
    payload: args
  };
};
var move = function move(args) {
  return {
    type: 'MOVE',
    payload: args
  };
};
var moveByWindowScroll = function moveByWindowScroll(args) {
  return {
    type: 'MOVE_BY_WINDOW_SCROLL',
    payload: args
  };
};
var updateViewportMaxScroll = function updateViewportMaxScroll(args) {
  return {
    type: 'UPDATE_VIEWPORT_MAX_SCROLL',
    payload: args
  };
};
var moveUp = function moveUp() {
  return {
    type: 'MOVE_UP',
    payload: null
  };
};
var moveDown = function moveDown() {
  return {
    type: 'MOVE_DOWN',
    payload: null
  };
};
var moveRight = function moveRight() {
  return {
    type: 'MOVE_RIGHT',
    payload: null
  };
};
var moveLeft = function moveLeft() {
  return {
    type: 'MOVE_LEFT',
    payload: null
  };
};
var flush = function flush() {
  return {
    type: 'FLUSH',
    payload: null
  };
};
var animateDrop = function animateDrop(args) {
  return {
    type: 'DROP_ANIMATE',
    payload: args
  };
};
var completeDrop = function completeDrop(args) {
  return {
    type: 'DROP_COMPLETE',
    payload: args
  };
};
var drop = function drop(args) {
  return {
    type: 'DROP',
    payload: args
  };
};
var dropPending = function dropPending(args) {
  return {
    type: 'DROP_PENDING',
    payload: args
  };
};
var dropAnimationFinished = function dropAnimationFinished() {
  return {
    type: 'DROP_ANIMATION_FINISHED',
    payload: null
  };
};

var lift$1 = (function (marshal) {
  return function (_ref) {
    var getState = _ref.getState,
        dispatch = _ref.dispatch;
    return function (next) {
      return function (action) {
        if (action.type !== 'LIFT') {
          next(action);
          return;
        }

        var _action$payload = action.payload,
            id = _action$payload.id,
            clientSelection = _action$payload.clientSelection,
            movementMode = _action$payload.movementMode;
        var initial = getState();

        if (initial.phase === 'DROP_ANIMATING') {
          dispatch(completeDrop({
            completed: initial.completed
          }));
        }

        !(getState().phase === 'IDLE') ? invariant(false) : void 0;
        dispatch(flush());
        dispatch(beforeInitialCapture({
          draggableId: id,
          movementMode: movementMode
        }));
        var scrollOptions = {
          shouldPublishImmediately: movementMode === 'SNAP'
        };
        var request = {
          draggableId: id,
          scrollOptions: scrollOptions
        };

        var _marshal$startPublish = marshal.startPublishing(request),
            critical = _marshal$startPublish.critical,
            dimensions = _marshal$startPublish.dimensions,
            viewport = _marshal$startPublish.viewport;
        dispatch(initialPublish({
          critical: critical,
          dimensions: dimensions,
          clientSelection: clientSelection,
          movementMode: movementMode,
          viewport: viewport
        }));
      };
    };
  };
});

var style = (function (marshal) {
  return function () {
    return function (next) {
      return function (action) {
        if (action.type === 'INITIAL_PUBLISH') {
          marshal.dragging();
        }

        if (action.type === 'DROP_ANIMATE') {
          marshal.dropping(action.payload.completed.result.reason);
        }

        if (action.type === 'FLUSH' || action.type === 'DROP_COMPLETE') {
          marshal.resting();
        }

        next(action);
      };
    };
  };
});

var curves = {
  outOfTheWay: 'cubic-bezier(0.2, 0, 0, 1)',
  drop: 'cubic-bezier(.2,1,.1,1)'
};
var combine = {
  opacity: {
    drop: 0,
    combining: 0.7
  },
  scale: {
    drop: 0.75
  }
};
var timings = {
  outOfTheWay: 0.2,
  minDropTime: 0.33,
  maxDropTime: 0.55
};
var outOfTheWayTiming = timings.outOfTheWay + "s " + curves.outOfTheWay;
var transitions = {
  fluid: "opacity " + outOfTheWayTiming,
  snap: "transform " + outOfTheWayTiming + ", opacity " + outOfTheWayTiming,
  drop: function drop(duration) {
    var timing = duration + "s " + curves.drop;
    return "transform " + timing + ", opacity " + timing;
  },
  outOfTheWay: "transform " + outOfTheWayTiming,
  placeholder: "height " + outOfTheWayTiming + ", width " + outOfTheWayTiming + ", margin " + outOfTheWayTiming
};

var moveTo = function moveTo(offset) {
  return isEqual(offset, origin) ? null : "translate(" + offset.x + "px, " + offset.y + "px)";
};

var transforms = {
  moveTo: moveTo,
  drop: function drop(offset, isCombining) {
    var translate = moveTo(offset);

    if (!translate) {
      return null;
    }

    if (!isCombining) {
      return translate;
    }

    return translate + " scale(" + combine.scale.drop + ")";
  }
};

var minDropTime = timings.minDropTime,
    maxDropTime = timings.maxDropTime;
var dropTimeRange = maxDropTime - minDropTime;
var maxDropTimeAtDistance = 1500;
var cancelDropModifier = 0.6;
var getDropDuration = (function (_ref) {
  var current = _ref.current,
      destination = _ref.destination,
      reason = _ref.reason;
  var distance$1 = distance(current, destination);

  if (distance$1 <= 0) {
    return minDropTime;
  }

  if (distance$1 >= maxDropTimeAtDistance) {
    return maxDropTime;
  }

  var percentage = distance$1 / maxDropTimeAtDistance;
  var duration = minDropTime + dropTimeRange * percentage;
  var withDuration = reason === 'CANCEL' ? duration * cancelDropModifier : duration;
  return Number(withDuration.toFixed(2));
});

var getNewHomeClientOffset = (function (_ref) {
  var impact = _ref.impact,
      draggable = _ref.draggable,
      dimensions = _ref.dimensions,
      viewport = _ref.viewport,
      afterCritical = _ref.afterCritical;
  var draggables = dimensions.draggables,
      droppables = dimensions.droppables;
  var droppableId = whatIsDraggedOver(impact);
  var destination = droppableId ? droppables[droppableId] : null;
  var home = droppables[draggable.descriptor.droppableId];
  var newClientCenter = getClientBorderBoxCenter({
    impact: impact,
    draggable: draggable,
    draggables: draggables,
    afterCritical: afterCritical,
    droppable: destination || home,
    viewport: viewport
  });
  var offset = subtract(newClientCenter, draggable.client.borderBox.center);
  return offset;
});

var getDropImpact = (function (_ref) {
  var draggables = _ref.draggables,
      reason = _ref.reason,
      lastImpact = _ref.lastImpact,
      home = _ref.home,
      viewport = _ref.viewport,
      onLiftImpact = _ref.onLiftImpact;

  if (!lastImpact.at || reason !== 'DROP') {
    var recomputedHomeImpact = recompute({
      draggables: draggables,
      impact: onLiftImpact,
      destination: home,
      viewport: viewport,
      forceShouldAnimate: true
    });
    return {
      impact: recomputedHomeImpact,
      didDropInsideDroppable: false
    };
  }

  if (lastImpact.at.type === 'REORDER') {
    return {
      impact: lastImpact,
      didDropInsideDroppable: true
    };
  }

  var withoutMovement = _extends({}, lastImpact, {
    displaced: emptyGroups
  });

  return {
    impact: withoutMovement,
    didDropInsideDroppable: true
  };
});

var drop$1 = (function (_ref) {
  var getState = _ref.getState,
      dispatch = _ref.dispatch;
  return function (next) {
    return function (action) {
      if (action.type !== 'DROP') {
        next(action);
        return;
      }

      var state = getState();
      var reason = action.payload.reason;

      if (state.phase === 'COLLECTING') {
        dispatch(dropPending({
          reason: reason
        }));
        return;
      }

      if (state.phase === 'IDLE') {
        return;
      }

      var isWaitingForDrop = state.phase === 'DROP_PENDING' && state.isWaiting;
      !!isWaitingForDrop ? invariant(false) : void 0;
      !(state.phase === 'DRAGGING' || state.phase === 'DROP_PENDING') ? invariant(false) : void 0;
      var critical = state.critical;
      var dimensions = state.dimensions;
      var draggable = dimensions.draggables[state.critical.draggable.id];

      var _getDropImpact = getDropImpact({
        reason: reason,
        lastImpact: state.impact,
        afterCritical: state.afterCritical,
        onLiftImpact: state.onLiftImpact,
        home: state.dimensions.droppables[state.critical.droppable.id],
        viewport: state.viewport,
        draggables: state.dimensions.draggables
      }),
          impact = _getDropImpact.impact,
          didDropInsideDroppable = _getDropImpact.didDropInsideDroppable;

      var destination = didDropInsideDroppable ? tryGetDestination(impact) : null;
      var combine = didDropInsideDroppable ? tryGetCombine(impact) : null;
      var source = {
        index: critical.draggable.index,
        droppableId: critical.droppable.id
      };
      var result = {
        draggableId: draggable.descriptor.id,
        type: draggable.descriptor.type,
        source: source,
        reason: reason,
        mode: state.movementMode,
        destination: destination,
        combine: combine
      };
      var newHomeClientOffset = getNewHomeClientOffset({
        impact: impact,
        draggable: draggable,
        dimensions: dimensions,
        viewport: state.viewport,
        afterCritical: state.afterCritical
      });
      var completed = {
        critical: state.critical,
        afterCritical: state.afterCritical,
        result: result,
        impact: impact
      };
      var isAnimationRequired = !isEqual(state.current.client.offset, newHomeClientOffset) || Boolean(result.combine);

      if (!isAnimationRequired) {
        dispatch(completeDrop({
          completed: completed
        }));
        return;
      }

      var dropDuration = getDropDuration({
        current: state.current.client.offset,
        destination: newHomeClientOffset,
        reason: reason
      });
      var args = {
        newHomeClientOffset: newHomeClientOffset,
        dropDuration: dropDuration,
        completed: completed
      };
      dispatch(animateDrop(args));
    };
  };
});

var getWindowScroll = (function () {
  return {
    x: window.pageXOffset,
    y: window.pageYOffset
  };
});

function getWindowScrollBinding(update) {
  return {
    eventName: 'scroll',
    options: {
      passive: true,
      capture: false
    },
    fn: function fn(event) {
      if (event.target !== window && event.target !== window.document) {
        return;
      }

      update();
    }
  };
}

function getScrollListener(_ref) {
  var onWindowScroll = _ref.onWindowScroll;

  function updateScroll() {
    onWindowScroll(getWindowScroll());
  }

  var scheduled = rafSchd$1(updateScroll);
  var binding = getWindowScrollBinding(scheduled);
  var unbind = noop;

  function isActive() {
    return unbind !== noop;
  }

  function start() {
    !!isActive() ? invariant(false) : void 0;
    unbind = bindEvents(window, [binding]);
  }

  function stop() {
    !isActive() ? invariant(false) : void 0;
    scheduled.cancel();
    unbind();
    unbind = noop;
  }

  return {
    start: start,
    stop: stop,
    isActive: isActive
  };
}

var shouldEnd = function shouldEnd(action) {
  return action.type === 'DROP_COMPLETE' || action.type === 'DROP_ANIMATE' || action.type === 'FLUSH';
};

var scrollListener = (function (store) {
  var listener = getScrollListener({
    onWindowScroll: function onWindowScroll(newScroll) {
      store.dispatch(moveByWindowScroll({
        newScroll: newScroll
      }));
    }
  });
  return function (next) {
    return function (action) {
      if (!listener.isActive() && action.type === 'INITIAL_PUBLISH') {
        listener.start();
      }

      if (listener.isActive() && shouldEnd(action)) {
        listener.stop();
      }

      next(action);
    };
  };
});

var getExpiringAnnounce = (function (announce) {
  var wasCalled = false;
  var isExpired = false;
  var timeoutId = setTimeout(function () {
    isExpired = true;
  });

  var result = function result(message) {
    if (wasCalled) {
      return;
    }

    if (isExpired) {
      return;
    }

    wasCalled = true;
    announce(message);
    clearTimeout(timeoutId);
  };

  result.wasCalled = function () {
    return wasCalled;
  };

  return result;
});

var getAsyncMarshal = (function () {
  var entries = [];

  var execute = function execute(timerId) {
    var index = findIndex(entries, function (item) {
      return item.timerId === timerId;
    });
    !(index !== -1) ? invariant(false) : void 0;

    var _entries$splice = entries.splice(index, 1),
        entry = _entries$splice[0];

    entry.callback();
  };

  var add = function add(fn) {
    var timerId = setTimeout(function () {
      return execute(timerId);
    });
    var entry = {
      timerId: timerId,
      callback: fn
    };
    entries.push(entry);
  };

  var flush = function flush() {
    if (!entries.length) {
      return;
    }

    var shallow = [].concat(entries);
    entries.length = 0;
    shallow.forEach(function (entry) {
      clearTimeout(entry.timerId);
      entry.callback();
    });
  };

  return {
    add: add,
    flush: flush
  };
});

var areLocationsEqual = function areLocationsEqual(first, second) {
  if (first == null && second == null) {
    return true;
  }

  if (first == null || second == null) {
    return false;
  }

  return first.droppableId === second.droppableId && first.index === second.index;
};
var isCombineEqual = function isCombineEqual(first, second) {
  if (first == null && second == null) {
    return true;
  }

  if (first == null || second == null) {
    return false;
  }

  return first.draggableId === second.draggableId && first.droppableId === second.droppableId;
};
var isCriticalEqual = function isCriticalEqual(first, second) {
  if (first === second) {
    return true;
  }

  var isDraggableEqual = first.draggable.id === second.draggable.id && first.draggable.droppableId === second.draggable.droppableId && first.draggable.type === second.draggable.type && first.draggable.index === second.draggable.index;
  var isDroppableEqual = first.droppable.id === second.droppable.id && first.droppable.type === second.droppable.type;
  return isDraggableEqual && isDroppableEqual;
};

var withTimings = function withTimings(key, fn) {
  fn();
};

var getDragStart = function getDragStart(critical, mode) {
  return {
    draggableId: critical.draggable.id,
    type: critical.droppable.type,
    source: {
      droppableId: critical.droppable.id,
      index: critical.draggable.index
    },
    mode: mode
  };
};

var execute = function execute(responder, data, announce, getDefaultMessage) {
  if (!responder) {
    announce(getDefaultMessage(data));
    return;
  }

  var willExpire = getExpiringAnnounce(announce);
  var provided = {
    announce: willExpire
  };
  responder(data, provided);

  if (!willExpire.wasCalled()) {
    announce(getDefaultMessage(data));
  }
};

var getPublisher = (function (getResponders, announce) {
  var asyncMarshal = getAsyncMarshal();
  var dragging = null;

  var beforeCapture = function beforeCapture(draggableId, mode) {
    !!dragging ? invariant(false) : void 0;
    withTimings('onBeforeCapture', function () {
      var fn = getResponders().onBeforeCapture;

      if (fn) {
        var before = {
          draggableId: draggableId,
          mode: mode
        };
        fn(before);
      }
    });
  };

  var beforeStart = function beforeStart(critical, mode) {
    !!dragging ? invariant(false) : void 0;
    withTimings('onBeforeDragStart', function () {
      var fn = getResponders().onBeforeDragStart;

      if (fn) {
        fn(getDragStart(critical, mode));
      }
    });
  };

  var start = function start(critical, mode) {
    !!dragging ? invariant(false) : void 0;
    var data = getDragStart(critical, mode);
    dragging = {
      mode: mode,
      lastCritical: critical,
      lastLocation: data.source,
      lastCombine: null
    };
    asyncMarshal.add(function () {
      withTimings('onDragStart', function () {
        return execute(getResponders().onDragStart, data, announce, preset.onDragStart);
      });
    });
  };

  var update = function update(critical, impact) {
    var location = tryGetDestination(impact);
    var combine = tryGetCombine(impact);
    !dragging ? invariant(false) : void 0;
    var hasCriticalChanged = !isCriticalEqual(critical, dragging.lastCritical);

    if (hasCriticalChanged) {
      dragging.lastCritical = critical;
    }

    var hasLocationChanged = !areLocationsEqual(dragging.lastLocation, location);

    if (hasLocationChanged) {
      dragging.lastLocation = location;
    }

    var hasGroupingChanged = !isCombineEqual(dragging.lastCombine, combine);

    if (hasGroupingChanged) {
      dragging.lastCombine = combine;
    }

    if (!hasCriticalChanged && !hasLocationChanged && !hasGroupingChanged) {
      return;
    }

    var data = _extends({}, getDragStart(critical, dragging.mode), {
      combine: combine,
      destination: location
    });

    asyncMarshal.add(function () {
      withTimings('onDragUpdate', function () {
        return execute(getResponders().onDragUpdate, data, announce, preset.onDragUpdate);
      });
    });
  };

  var flush = function flush() {
    !dragging ? invariant(false) : void 0;
    asyncMarshal.flush();
  };

  var drop = function drop(result) {
    !dragging ? invariant(false) : void 0;
    dragging = null;
    withTimings('onDragEnd', function () {
      return execute(getResponders().onDragEnd, result, announce, preset.onDragEnd);
    });
  };

  var abort = function abort() {
    if (!dragging) {
      return;
    }

    var result = _extends({}, getDragStart(dragging.lastCritical, dragging.mode), {
      combine: null,
      destination: null,
      reason: 'CANCEL'
    });

    drop(result);
  };

  return {
    beforeCapture: beforeCapture,
    beforeStart: beforeStart,
    start: start,
    update: update,
    flush: flush,
    drop: drop,
    abort: abort
  };
});

var responders = (function (getResponders, announce) {
  var publisher = getPublisher(getResponders, announce);
  return function (store) {
    return function (next) {
      return function (action) {
        if (action.type === 'BEFORE_INITIAL_CAPTURE') {
          publisher.beforeCapture(action.payload.draggableId, action.payload.movementMode);
          return;
        }

        if (action.type === 'INITIAL_PUBLISH') {
          var critical = action.payload.critical;
          publisher.beforeStart(critical, action.payload.movementMode);
          next(action);
          publisher.start(critical, action.payload.movementMode);
          return;
        }

        if (action.type === 'DROP_COMPLETE') {
          var result = action.payload.completed.result;
          publisher.flush();
          next(action);
          publisher.drop(result);
          return;
        }

        next(action);

        if (action.type === 'FLUSH') {
          publisher.abort();
          return;
        }

        var state = store.getState();

        if (state.phase === 'DRAGGING') {
          publisher.update(state.critical, state.impact);
        }
      };
    };
  };
});

var dropAnimationFinish = (function (store) {
  return function (next) {
    return function (action) {
      if (action.type !== 'DROP_ANIMATION_FINISHED') {
        next(action);
        return;
      }

      var state = store.getState();
      !(state.phase === 'DROP_ANIMATING') ? invariant(false) : void 0;
      store.dispatch(completeDrop({
        completed: state.completed
      }));
    };
  };
});

var dropAnimationFlushOnScroll = (function (store) {
  var unbind = null;
  var frameId = null;

  function clear() {
    if (frameId) {
      cancelAnimationFrame(frameId);
      frameId = null;
    }

    if (unbind) {
      unbind();
      unbind = null;
    }
  }

  return function (next) {
    return function (action) {
      if (action.type === 'FLUSH' || action.type === 'DROP_COMPLETE' || action.type === 'DROP_ANIMATION_FINISHED') {
        clear();
      }

      next(action);

      if (action.type !== 'DROP_ANIMATE') {
        return;
      }

      var binding = {
        eventName: 'scroll',
        options: {
          capture: true,
          passive: false,
          once: true
        },
        fn: function flushDropAnimation() {
          var state = store.getState();

          if (state.phase === 'DROP_ANIMATING') {
            store.dispatch(dropAnimationFinished());
          }
        }
      };
      frameId = requestAnimationFrame(function () {
        frameId = null;
        unbind = bindEvents(window, [binding]);
      });
    };
  };
});

var dimensionMarshalStopper = (function (marshal) {
  return function () {
    return function (next) {
      return function (action) {
        if (action.type === 'DROP_COMPLETE' || action.type === 'FLUSH' || action.type === 'DROP_ANIMATE') {
          marshal.stopPublishing();
        }

        next(action);
      };
    };
  };
});

var focus = (function (marshal) {
  var isWatching = false;
  return function () {
    return function (next) {
      return function (action) {
        if (action.type === 'INITIAL_PUBLISH') {
          isWatching = true;
          marshal.tryRecordFocus(action.payload.critical.draggable.id);
          next(action);
          marshal.tryRestoreFocusRecorded();
          return;
        }

        next(action);

        if (!isWatching) {
          return;
        }

        if (action.type === 'FLUSH') {
          isWatching = false;
          marshal.tryRestoreFocusRecorded();
          return;
        }

        if (action.type === 'DROP_COMPLETE') {
          isWatching = false;
          var result = action.payload.completed.result;

          if (result.combine) {
            marshal.tryShiftRecord(result.draggableId, result.combine.draggableId);
          }

          marshal.tryRestoreFocusRecorded();
        }
      };
    };
  };
});

var shouldStop = function shouldStop(action) {
  return action.type === 'DROP_COMPLETE' || action.type === 'DROP_ANIMATE' || action.type === 'FLUSH';
};

var autoScroll = (function (autoScroller) {
  return function (store) {
    return function (next) {
      return function (action) {
        if (shouldStop(action)) {
          autoScroller.stop();
          next(action);
          return;
        }

        if (action.type === 'INITIAL_PUBLISH') {
          next(action);
          var state = store.getState();
          !(state.phase === 'DRAGGING') ? invariant(false) : void 0;
          autoScroller.start(state);
          return;
        }

        next(action);
        autoScroller.scroll(store.getState());
      };
    };
  };
});

var pendingDrop = (function (store) {
  return function (next) {
    return function (action) {
      next(action);

      if (action.type !== 'PUBLISH_WHILE_DRAGGING') {
        return;
      }

      var postActionState = store.getState();

      if (postActionState.phase !== 'DROP_PENDING') {
        return;
      }

      if (postActionState.isWaiting) {
        return;
      }

      store.dispatch(drop({
        reason: postActionState.reason
      }));
    };
  };
});

var composeEnhancers = compose;
var createStore = (function (_ref) {
  var dimensionMarshal = _ref.dimensionMarshal,
      focusMarshal = _ref.focusMarshal,
      styleMarshal = _ref.styleMarshal,
      getResponders = _ref.getResponders,
      announce = _ref.announce,
      autoScroller = _ref.autoScroller;
  return createStore$1(reducer, composeEnhancers(applyMiddleware(style(styleMarshal), dimensionMarshalStopper(dimensionMarshal), lift$1(dimensionMarshal), drop$1, dropAnimationFinish, dropAnimationFlushOnScroll, pendingDrop, autoScroll(autoScroller), scrollListener, focus(focusMarshal), responders(getResponders, announce))));
});

var clean$1 = function clean() {
  return {
    additions: {},
    removals: {},
    modified: {}
  };
};
function createPublisher(_ref) {
  var registry = _ref.registry,
      callbacks = _ref.callbacks;
  var staging = clean$1();
  var frameId = null;

  var collect = function collect() {
    if (frameId) {
      return;
    }

    callbacks.collectionStarting();
    frameId = requestAnimationFrame(function () {
      frameId = null;
      var _staging = staging,
          additions = _staging.additions,
          removals = _staging.removals,
          modified = _staging.modified;
      var added = Object.keys(additions).map(function (id) {
        return registry.draggable.getById(id).getDimension(origin);
      }).sort(function (a, b) {
        return a.descriptor.index - b.descriptor.index;
      });
      var updated = Object.keys(modified).map(function (id) {
        var entry = registry.droppable.getById(id);
        var scroll = entry.callbacks.getScrollWhileDragging();
        return {
          droppableId: id,
          scroll: scroll
        };
      });
      var result = {
        additions: added,
        removals: Object.keys(removals),
        modified: updated
      };
      staging = clean$1();
      callbacks.publish(result);
    });
  };

  var add = function add(entry) {
    var id = entry.descriptor.id;
    staging.additions[id] = entry;
    staging.modified[entry.descriptor.droppableId] = true;

    if (staging.removals[id]) {
      delete staging.removals[id];
    }

    collect();
  };

  var remove = function remove(entry) {
    var descriptor = entry.descriptor;
    staging.removals[descriptor.id] = true;
    staging.modified[descriptor.droppableId] = true;

    if (staging.additions[descriptor.id]) {
      delete staging.additions[descriptor.id];
    }

    collect();
  };

  var stop = function stop() {
    if (!frameId) {
      return;
    }

    cancelAnimationFrame(frameId);
    frameId = null;
    staging = clean$1();
  };

  return {
    add: add,
    remove: remove,
    stop: stop
  };
}

var getMaxScroll = (function (_ref) {
  var scrollHeight = _ref.scrollHeight,
      scrollWidth = _ref.scrollWidth,
      height = _ref.height,
      width = _ref.width;
  var maxScroll = subtract({
    x: scrollWidth,
    y: scrollHeight
  }, {
    x: width,
    y: height
  });
  var adjustedMaxScroll = {
    x: Math.max(0, maxScroll.x),
    y: Math.max(0, maxScroll.y)
  };
  return adjustedMaxScroll;
});

var getDocumentElement = (function () {
  var doc = document.documentElement;
  !doc ? invariant(false) : void 0;
  return doc;
});

var getMaxWindowScroll = (function () {
  var doc = getDocumentElement();
  var maxScroll = getMaxScroll({
    scrollHeight: doc.scrollHeight,
    scrollWidth: doc.scrollWidth,
    width: doc.clientWidth,
    height: doc.clientHeight
  });
  return maxScroll;
});

var getViewport = (function () {
  var scroll = getWindowScroll();
  var maxScroll = getMaxWindowScroll();
  var top = scroll.y;
  var left = scroll.x;
  var doc = getDocumentElement();
  var width = doc.clientWidth;
  var height = doc.clientHeight;
  var right = left + width;
  var bottom = top + height;
  var frame = getRect({
    top: top,
    left: left,
    right: right,
    bottom: bottom
  });
  var viewport = {
    frame: frame,
    scroll: {
      initial: scroll,
      current: scroll,
      max: maxScroll,
      diff: {
        value: origin,
        displacement: origin
      }
    }
  };
  return viewport;
});

var getInitialPublish = (function (_ref) {
  var critical = _ref.critical,
      scrollOptions = _ref.scrollOptions,
      registry = _ref.registry;
  var viewport = getViewport();
  var windowScroll = viewport.scroll.current;
  var home = critical.droppable;
  var droppables = registry.droppable.getAllByType(home.type).map(function (entry) {
    return entry.callbacks.getDimensionAndWatchScroll(windowScroll, scrollOptions);
  });
  var draggables = registry.draggable.getAllByType(critical.draggable.type).map(function (entry) {
    return entry.getDimension(windowScroll);
  });
  var dimensions = {
    draggables: toDraggableMap(draggables),
    droppables: toDroppableMap(droppables)
  };
  var result = {
    dimensions: dimensions,
    critical: critical,
    viewport: viewport
  };
  return result;
});

function shouldPublishUpdate(registry, dragging, entry) {
  if (entry.descriptor.id === dragging.id) {
    return false;
  }

  if (entry.descriptor.type !== dragging.type) {
    return false;
  }

  var home = registry.droppable.getById(entry.descriptor.droppableId);

  if (home.descriptor.mode !== 'virtual') {
    return false;
  }

  return true;
}

var createDimensionMarshal = (function (registry, callbacks) {
  var collection = null;
  var publisher = createPublisher({
    callbacks: {
      publish: callbacks.publishWhileDragging,
      collectionStarting: callbacks.collectionStarting
    },
    registry: registry
  });

  var updateDroppableIsEnabled = function updateDroppableIsEnabled(id, isEnabled) {
    !registry.droppable.exists(id) ? invariant(false) : void 0;

    if (!collection) {
      return;
    }

    callbacks.updateDroppableIsEnabled({
      id: id,
      isEnabled: isEnabled
    });
  };

  var updateDroppableIsCombineEnabled = function updateDroppableIsCombineEnabled(id, isCombineEnabled) {
    if (!collection) {
      return;
    }

    !registry.droppable.exists(id) ? invariant(false) : void 0;
    callbacks.updateDroppableIsCombineEnabled({
      id: id,
      isCombineEnabled: isCombineEnabled
    });
  };

  var updateDroppableScroll = function updateDroppableScroll(id, newScroll) {
    if (!collection) {
      return;
    }

    !registry.droppable.exists(id) ? invariant(false) : void 0;
    callbacks.updateDroppableScroll({
      id: id,
      newScroll: newScroll
    });
  };

  var scrollDroppable = function scrollDroppable(id, change) {
    if (!collection) {
      return;
    }

    registry.droppable.getById(id).callbacks.scroll(change);
  };

  var stopPublishing = function stopPublishing() {
    if (!collection) {
      return;
    }

    publisher.stop();
    var home = collection.critical.droppable;
    registry.droppable.getAllByType(home.type).forEach(function (entry) {
      return entry.callbacks.dragStopped();
    });
    collection.unsubscribe();
    collection = null;
  };

  var subscriber = function subscriber(event) {
    !collection ? invariant(false) : void 0;
    var dragging = collection.critical.draggable;

    if (event.type === 'ADDITION') {
      if (shouldPublishUpdate(registry, dragging, event.value)) {
        publisher.add(event.value);
      }
    }

    if (event.type === 'REMOVAL') {
      if (shouldPublishUpdate(registry, dragging, event.value)) {
        publisher.remove(event.value);
      }
    }
  };

  var startPublishing = function startPublishing(request) {
    !!collection ? invariant(false) : void 0;
    var entry = registry.draggable.getById(request.draggableId);
    var home = registry.droppable.getById(entry.descriptor.droppableId);
    var critical = {
      draggable: entry.descriptor,
      droppable: home.descriptor
    };
    var unsubscribe = registry.subscribe(subscriber);
    collection = {
      critical: critical,
      unsubscribe: unsubscribe
    };
    return getInitialPublish({
      critical: critical,
      registry: registry,
      scrollOptions: request.scrollOptions
    });
  };

  var marshal = {
    updateDroppableIsEnabled: updateDroppableIsEnabled,
    updateDroppableIsCombineEnabled: updateDroppableIsCombineEnabled,
    scrollDroppable: scrollDroppable,
    updateDroppableScroll: updateDroppableScroll,
    startPublishing: startPublishing,
    stopPublishing: stopPublishing
  };
  return marshal;
});

var canStartDrag = (function (state, id) {
  if (state.phase === 'IDLE') {
    return true;
  }

  if (state.phase !== 'DROP_ANIMATING') {
    return false;
  }

  if (state.completed.result.draggableId === id) {
    return false;
  }

  return state.completed.result.reason === 'DROP';
});

var scrollWindow = (function (change) {
  window.scrollBy(change.x, change.y);
});

var getScrollableDroppables = memoizeOne(function (droppables) {
  return toDroppableList(droppables).filter(function (droppable) {
    if (!droppable.isEnabled) {
      return false;
    }

    if (!droppable.frame) {
      return false;
    }

    return true;
  });
});

var getScrollableDroppableOver = function getScrollableDroppableOver(target, droppables) {
  var maybe = find(getScrollableDroppables(droppables), function (droppable) {
    !droppable.frame ? invariant(false) : void 0;
    return isPositionInFrame(droppable.frame.pageMarginBox)(target);
  });
  return maybe;
};

var getBestScrollableDroppable = (function (_ref) {
  var center = _ref.center,
      destination = _ref.destination,
      droppables = _ref.droppables;

  if (destination) {
    var _dimension = droppables[destination];

    if (!_dimension.frame) {
      return null;
    }

    return _dimension;
  }

  var dimension = getScrollableDroppableOver(center, droppables);
  return dimension;
});

var config = {
  startFromPercentage: 0.25,
  maxScrollAtPercentage: 0.05,
  maxPixelScroll: 28,
  ease: function ease(percentage) {
    return Math.pow(percentage, 2);
  },
  durationDampening: {
    stopDampeningAt: 1200,
    accelerateAt: 360
  }
};

var getDistanceThresholds = (function (container, axis) {
  var startScrollingFrom = container[axis.size] * config.startFromPercentage;
  var maxScrollValueAt = container[axis.size] * config.maxScrollAtPercentage;
  var thresholds = {
    startScrollingFrom: startScrollingFrom,
    maxScrollValueAt: maxScrollValueAt
  };
  return thresholds;
});

var getPercentage = (function (_ref) {
  var startOfRange = _ref.startOfRange,
      endOfRange = _ref.endOfRange,
      current = _ref.current;
  var range = endOfRange - startOfRange;

  if (range === 0) {
    return 0;
  }

  var currentInRange = current - startOfRange;
  var percentage = currentInRange / range;
  return percentage;
});

var minScroll = 1;

var getValueFromDistance = (function (distanceToEdge, thresholds) {
  if (distanceToEdge > thresholds.startScrollingFrom) {
    return 0;
  }

  if (distanceToEdge <= thresholds.maxScrollValueAt) {
    return config.maxPixelScroll;
  }

  if (distanceToEdge === thresholds.startScrollingFrom) {
    return minScroll;
  }

  var percentageFromMaxScrollValueAt = getPercentage({
    startOfRange: thresholds.maxScrollValueAt,
    endOfRange: thresholds.startScrollingFrom,
    current: distanceToEdge
  });
  var percentageFromStartScrollingFrom = 1 - percentageFromMaxScrollValueAt;
  var scroll = config.maxPixelScroll * config.ease(percentageFromStartScrollingFrom);
  return Math.ceil(scroll);
});

var accelerateAt = config.durationDampening.accelerateAt;
var stopAt = config.durationDampening.stopDampeningAt;
var dampenValueByTime = (function (proposedScroll, dragStartTime) {
  var startOfRange = dragStartTime;
  var endOfRange = stopAt;
  var now = Date.now();
  var runTime = now - startOfRange;

  if (runTime >= stopAt) {
    return proposedScroll;
  }

  if (runTime < accelerateAt) {
    return minScroll;
  }

  var betweenAccelerateAtAndStopAtPercentage = getPercentage({
    startOfRange: accelerateAt,
    endOfRange: endOfRange,
    current: runTime
  });
  var scroll = proposedScroll * config.ease(betweenAccelerateAtAndStopAtPercentage);
  return Math.ceil(scroll);
});

var getValue = (function (_ref) {
  var distanceToEdge = _ref.distanceToEdge,
      thresholds = _ref.thresholds,
      dragStartTime = _ref.dragStartTime,
      shouldUseTimeDampening = _ref.shouldUseTimeDampening;
  var scroll = getValueFromDistance(distanceToEdge, thresholds);

  if (scroll === 0) {
    return 0;
  }

  if (!shouldUseTimeDampening) {
    return scroll;
  }

  return Math.max(dampenValueByTime(scroll, dragStartTime), minScroll);
});

var getScrollOnAxis = (function (_ref) {
  var container = _ref.container,
      distanceToEdges = _ref.distanceToEdges,
      dragStartTime = _ref.dragStartTime,
      axis = _ref.axis,
      shouldUseTimeDampening = _ref.shouldUseTimeDampening;
  var thresholds = getDistanceThresholds(container, axis);
  var isCloserToEnd = distanceToEdges[axis.end] < distanceToEdges[axis.start];

  if (isCloserToEnd) {
    return getValue({
      distanceToEdge: distanceToEdges[axis.end],
      thresholds: thresholds,
      dragStartTime: dragStartTime,
      shouldUseTimeDampening: shouldUseTimeDampening
    });
  }

  return -1 * getValue({
    distanceToEdge: distanceToEdges[axis.start],
    thresholds: thresholds,
    dragStartTime: dragStartTime,
    shouldUseTimeDampening: shouldUseTimeDampening
  });
});

var adjustForSizeLimits = (function (_ref) {
  var container = _ref.container,
      subject = _ref.subject,
      proposedScroll = _ref.proposedScroll;
  var isTooBigVertically = subject.height > container.height;
  var isTooBigHorizontally = subject.width > container.width;

  if (!isTooBigHorizontally && !isTooBigVertically) {
    return proposedScroll;
  }

  if (isTooBigHorizontally && isTooBigVertically) {
    return null;
  }

  return {
    x: isTooBigHorizontally ? 0 : proposedScroll.x,
    y: isTooBigVertically ? 0 : proposedScroll.y
  };
});

var clean$2 = apply(function (value) {
  return value === 0 ? 0 : value;
});
var getScroll = (function (_ref) {
  var dragStartTime = _ref.dragStartTime,
      container = _ref.container,
      subject = _ref.subject,
      center = _ref.center,
      shouldUseTimeDampening = _ref.shouldUseTimeDampening;
  var distanceToEdges = {
    top: center.y - container.top,
    right: container.right - center.x,
    bottom: container.bottom - center.y,
    left: center.x - container.left
  };
  var y = getScrollOnAxis({
    container: container,
    distanceToEdges: distanceToEdges,
    dragStartTime: dragStartTime,
    axis: vertical,
    shouldUseTimeDampening: shouldUseTimeDampening
  });
  var x = getScrollOnAxis({
    container: container,
    distanceToEdges: distanceToEdges,
    dragStartTime: dragStartTime,
    axis: horizontal,
    shouldUseTimeDampening: shouldUseTimeDampening
  });
  var required = clean$2({
    x: x,
    y: y
  });

  if (isEqual(required, origin)) {
    return null;
  }

  var limited = adjustForSizeLimits({
    container: container,
    subject: subject,
    proposedScroll: required
  });

  if (!limited) {
    return null;
  }

  return isEqual(limited, origin) ? null : limited;
});

var smallestSigned = apply(function (value) {
  if (value === 0) {
    return 0;
  }

  return value > 0 ? 1 : -1;
});
var getOverlap = function () {
  var getRemainder = function getRemainder(target, max) {
    if (target < 0) {
      return target;
    }

    if (target > max) {
      return target - max;
    }

    return 0;
  };

  return function (_ref) {
    var current = _ref.current,
        max = _ref.max,
        change = _ref.change;
    var targetScroll = add(current, change);
    var overlap = {
      x: getRemainder(targetScroll.x, max.x),
      y: getRemainder(targetScroll.y, max.y)
    };

    if (isEqual(overlap, origin)) {
      return null;
    }

    return overlap;
  };
}();
var canPartiallyScroll = function canPartiallyScroll(_ref2) {
  var rawMax = _ref2.max,
      current = _ref2.current,
      change = _ref2.change;
  var max = {
    x: Math.max(current.x, rawMax.x),
    y: Math.max(current.y, rawMax.y)
  };
  var smallestChange = smallestSigned(change);
  var overlap = getOverlap({
    max: max,
    current: current,
    change: smallestChange
  });

  if (!overlap) {
    return true;
  }

  if (smallestChange.x !== 0 && overlap.x === 0) {
    return true;
  }

  if (smallestChange.y !== 0 && overlap.y === 0) {
    return true;
  }

  return false;
};
var canScrollWindow = function canScrollWindow(viewport, change) {
  return canPartiallyScroll({
    current: viewport.scroll.current,
    max: viewport.scroll.max,
    change: change
  });
};
var getWindowOverlap = function getWindowOverlap(viewport, change) {
  if (!canScrollWindow(viewport, change)) {
    return null;
  }

  var max = viewport.scroll.max;
  var current = viewport.scroll.current;
  return getOverlap({
    current: current,
    max: max,
    change: change
  });
};
var canScrollDroppable = function canScrollDroppable(droppable, change) {
  var frame = droppable.frame;

  if (!frame) {
    return false;
  }

  return canPartiallyScroll({
    current: frame.scroll.current,
    max: frame.scroll.max,
    change: change
  });
};
var getDroppableOverlap = function getDroppableOverlap(droppable, change) {
  var frame = droppable.frame;

  if (!frame) {
    return null;
  }

  if (!canScrollDroppable(droppable, change)) {
    return null;
  }

  return getOverlap({
    current: frame.scroll.current,
    max: frame.scroll.max,
    change: change
  });
};

var getWindowScrollChange = (function (_ref) {
  var viewport = _ref.viewport,
      subject = _ref.subject,
      center = _ref.center,
      dragStartTime = _ref.dragStartTime,
      shouldUseTimeDampening = _ref.shouldUseTimeDampening;
  var scroll = getScroll({
    dragStartTime: dragStartTime,
    container: viewport.frame,
    subject: subject,
    center: center,
    shouldUseTimeDampening: shouldUseTimeDampening
  });
  return scroll && canScrollWindow(viewport, scroll) ? scroll : null;
});

var getDroppableScrollChange = (function (_ref) {
  var droppable = _ref.droppable,
      subject = _ref.subject,
      center = _ref.center,
      dragStartTime = _ref.dragStartTime,
      shouldUseTimeDampening = _ref.shouldUseTimeDampening;
  var frame = droppable.frame;

  if (!frame) {
    return null;
  }

  var scroll = getScroll({
    dragStartTime: dragStartTime,
    container: frame.pageMarginBox,
    subject: subject,
    center: center,
    shouldUseTimeDampening: shouldUseTimeDampening
  });
  return scroll && canScrollDroppable(droppable, scroll) ? scroll : null;
});

var scroll$1 = (function (_ref) {
  var state = _ref.state,
      dragStartTime = _ref.dragStartTime,
      shouldUseTimeDampening = _ref.shouldUseTimeDampening,
      scrollWindow = _ref.scrollWindow,
      scrollDroppable = _ref.scrollDroppable;
  var center = state.current.page.borderBoxCenter;
  var draggable = state.dimensions.draggables[state.critical.draggable.id];
  var subject = draggable.page.marginBox;

  if (state.isWindowScrollAllowed) {
    var viewport = state.viewport;

    var _change = getWindowScrollChange({
      dragStartTime: dragStartTime,
      viewport: viewport,
      subject: subject,
      center: center,
      shouldUseTimeDampening: shouldUseTimeDampening
    });

    if (_change) {
      scrollWindow(_change);
      return;
    }
  }

  var droppable = getBestScrollableDroppable({
    center: center,
    destination: whatIsDraggedOver(state.impact),
    droppables: state.dimensions.droppables
  });

  if (!droppable) {
    return;
  }

  var change = getDroppableScrollChange({
    dragStartTime: dragStartTime,
    droppable: droppable,
    subject: subject,
    center: center,
    shouldUseTimeDampening: shouldUseTimeDampening
  });

  if (change) {
    scrollDroppable(droppable.descriptor.id, change);
  }
});

var createFluidScroller = (function (_ref) {
  var scrollWindow = _ref.scrollWindow,
      scrollDroppable = _ref.scrollDroppable;
  var scheduleWindowScroll = rafSchd$1(scrollWindow);
  var scheduleDroppableScroll = rafSchd$1(scrollDroppable);
  var dragging = null;

  var tryScroll = function tryScroll(state) {
    !dragging ? invariant(false) : void 0;
    var _dragging = dragging,
        shouldUseTimeDampening = _dragging.shouldUseTimeDampening,
        dragStartTime = _dragging.dragStartTime;
    scroll$1({
      state: state,
      scrollWindow: scheduleWindowScroll,
      scrollDroppable: scheduleDroppableScroll,
      dragStartTime: dragStartTime,
      shouldUseTimeDampening: shouldUseTimeDampening
    });
  };

  var start$1 = function start$1(state) {
    !!dragging ? invariant(false) : void 0;
    var dragStartTime = Date.now();
    var wasScrollNeeded = false;

    var fakeScrollCallback = function fakeScrollCallback() {
      wasScrollNeeded = true;
    };

    scroll$1({
      state: state,
      dragStartTime: 0,
      shouldUseTimeDampening: false,
      scrollWindow: fakeScrollCallback,
      scrollDroppable: fakeScrollCallback
    });
    dragging = {
      dragStartTime: dragStartTime,
      shouldUseTimeDampening: wasScrollNeeded
    };

    if (wasScrollNeeded) {
      tryScroll(state);
    }
  };

  var stop = function stop() {
    if (!dragging) {
      return;
    }

    scheduleWindowScroll.cancel();
    scheduleDroppableScroll.cancel();
    dragging = null;
  };

  return {
    start: start$1,
    stop: stop,
    scroll: tryScroll
  };
});

var createJumpScroller = (function (_ref) {
  var move = _ref.move,
      scrollDroppable = _ref.scrollDroppable,
      scrollWindow = _ref.scrollWindow;

  var moveByOffset = function moveByOffset(state, offset) {
    var client = add(state.current.client.selection, offset);
    move({
      client: client
    });
  };

  var scrollDroppableAsMuchAsItCan = function scrollDroppableAsMuchAsItCan(droppable, change) {
    if (!canScrollDroppable(droppable, change)) {
      return change;
    }

    var overlap = getDroppableOverlap(droppable, change);

    if (!overlap) {
      scrollDroppable(droppable.descriptor.id, change);
      return null;
    }

    var whatTheDroppableCanScroll = subtract(change, overlap);
    scrollDroppable(droppable.descriptor.id, whatTheDroppableCanScroll);
    var remainder = subtract(change, whatTheDroppableCanScroll);
    return remainder;
  };

  var scrollWindowAsMuchAsItCan = function scrollWindowAsMuchAsItCan(isWindowScrollAllowed, viewport, change) {
    if (!isWindowScrollAllowed) {
      return change;
    }

    if (!canScrollWindow(viewport, change)) {
      return change;
    }

    var overlap = getWindowOverlap(viewport, change);

    if (!overlap) {
      scrollWindow(change);
      return null;
    }

    var whatTheWindowCanScroll = subtract(change, overlap);
    scrollWindow(whatTheWindowCanScroll);
    var remainder = subtract(change, whatTheWindowCanScroll);
    return remainder;
  };

  var jumpScroller = function jumpScroller(state) {
    var request = state.scrollJumpRequest;

    if (!request) {
      return;
    }

    var destination = whatIsDraggedOver(state.impact);
    !destination ? invariant(false) : void 0;
    var droppableRemainder = scrollDroppableAsMuchAsItCan(state.dimensions.droppables[destination], request);

    if (!droppableRemainder) {
      return;
    }

    var viewport = state.viewport;
    var windowRemainder = scrollWindowAsMuchAsItCan(state.isWindowScrollAllowed, viewport, droppableRemainder);

    if (!windowRemainder) {
      return;
    }

    moveByOffset(state, windowRemainder);
  };

  return jumpScroller;
});

var createAutoScroller = (function (_ref) {
  var scrollDroppable = _ref.scrollDroppable,
      scrollWindow = _ref.scrollWindow,
      move = _ref.move;
  var fluidScroller = createFluidScroller({
    scrollWindow: scrollWindow,
    scrollDroppable: scrollDroppable
  });
  var jumpScroll = createJumpScroller({
    move: move,
    scrollWindow: scrollWindow,
    scrollDroppable: scrollDroppable
  });

  var scroll = function scroll(state) {
    if (state.phase !== 'DRAGGING') {
      return;
    }

    if (state.movementMode === 'FLUID') {
      fluidScroller.scroll(state);
      return;
    }

    if (!state.scrollJumpRequest) {
      return;
    }

    jumpScroll(state);
  };

  var scroller = {
    scroll: scroll,
    start: fluidScroller.start,
    stop: fluidScroller.stop
  };
  return scroller;
});

var prefix$1 = 'data-rbd';
var dragHandle = function () {
  var base = prefix$1 + "-drag-handle";
  return {
    base: base,
    draggableId: base + "-draggable-id",
    contextId: base + "-context-id"
  };
}();
var draggable = function () {
  var base = prefix$1 + "-draggable";
  return {
    base: base,
    contextId: base + "-context-id",
    id: base + "-id"
  };
}();
var droppable = function () {
  var base = prefix$1 + "-droppable";
  return {
    base: base,
    contextId: base + "-context-id",
    id: base + "-id"
  };
}();
var scrollContainer = {
  contextId: prefix$1 + "-scroll-container-context-id"
};

var makeGetSelector = function makeGetSelector(context) {
  return function (attribute) {
    return "[" + attribute + "=\"" + context + "\"]";
  };
};

var getStyles = function getStyles(rules, property) {
  return rules.map(function (rule) {
    var value = rule.styles[property];

    if (!value) {
      return '';
    }

    return rule.selector + " { " + value + " }";
  }).join(' ');
};

var noPointerEvents = 'pointer-events: none;';
var getStyles$1 = (function (contextId) {
  var getSelector = makeGetSelector(contextId);

  var dragHandle$1 = function () {
    var grabCursor = "\n      cursor: -webkit-grab;\n      cursor: grab;\n    ";
    return {
      selector: getSelector(dragHandle.contextId),
      styles: {
        always: "\n          -webkit-touch-callout: none;\n          -webkit-tap-highlight-color: rgba(0,0,0,0);\n          touch-action: manipulation;\n        ",
        resting: grabCursor,
        dragging: noPointerEvents,
        dropAnimating: grabCursor
      }
    };
  }();

  var draggable$1 = function () {
    var transition = "\n      transition: " + transitions.outOfTheWay + ";\n    ";
    return {
      selector: getSelector(draggable.contextId),
      styles: {
        dragging: transition,
        dropAnimating: transition,
        userCancel: transition
      }
    };
  }();

  var droppable$1 = {
    selector: getSelector(droppable.contextId),
    styles: {
      always: "overflow-anchor: none;"
    }
  };
  var body = {
    selector: 'body',
    styles: {
      dragging: "\n        cursor: grabbing;\n        cursor: -webkit-grabbing;\n        user-select: none;\n        -webkit-user-select: none;\n        -moz-user-select: none;\n        -ms-user-select: none;\n        overflow-anchor: none;\n      "
    }
  };
  var rules = [draggable$1, dragHandle$1, droppable$1, body];
  return {
    always: getStyles(rules, 'always'),
    resting: getStyles(rules, 'resting'),
    dragging: getStyles(rules, 'dragging'),
    dropAnimating: getStyles(rules, 'dropAnimating'),
    userCancel: getStyles(rules, 'userCancel')
  };
});

var useIsomorphicLayoutEffect = typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.document.createElement !== 'undefined' ? useLayoutEffect : useEffect;

var getHead = function getHead() {
  var head = document.querySelector('head');
  !head ? invariant(false) : void 0;
  return head;
};

var createStyleEl = function createStyleEl(nonce) {
  var el = document.createElement('style');

  if (nonce) {
    el.setAttribute('nonce', nonce);
  }

  el.type = 'text/css';
  return el;
};

function useStyleMarshal(contextId, nonce) {
  var styles = useMemo(function () {
    return getStyles$1(contextId);
  }, [contextId]);
  var alwaysRef = useRef(null);
  var dynamicRef = useRef(null);
  var setDynamicStyle = useCallback(memoizeOne(function (proposed) {
    var el = dynamicRef.current;
    !el ? invariant(false) : void 0;
    el.textContent = proposed;
  }), []);
  var setAlwaysStyle = useCallback(function (proposed) {
    var el = alwaysRef.current;
    !el ? invariant(false) : void 0;
    el.textContent = proposed;
  }, []);
  useIsomorphicLayoutEffect(function () {
    !(!alwaysRef.current && !dynamicRef.current) ? invariant(false) : void 0;
    var always = createStyleEl(nonce);
    var dynamic = createStyleEl(nonce);
    alwaysRef.current = always;
    dynamicRef.current = dynamic;
    always.setAttribute(prefix$1 + "-always", contextId);
    dynamic.setAttribute(prefix$1 + "-dynamic", contextId);
    getHead().appendChild(always);
    getHead().appendChild(dynamic);
    setAlwaysStyle(styles.always);
    setDynamicStyle(styles.resting);
    return function () {
      var remove = function remove(ref) {
        var current = ref.current;
        !current ? invariant(false) : void 0;
        getHead().removeChild(current);
        ref.current = null;
      };

      remove(alwaysRef);
      remove(dynamicRef);
    };
  }, [nonce, setAlwaysStyle, setDynamicStyle, styles.always, styles.resting, contextId]);
  var dragging = useCallback(function () {
    return setDynamicStyle(styles.dragging);
  }, [setDynamicStyle, styles.dragging]);
  var dropping = useCallback(function (reason) {
    if (reason === 'DROP') {
      setDynamicStyle(styles.dropAnimating);
      return;
    }

    setDynamicStyle(styles.userCancel);
  }, [setDynamicStyle, styles.dropAnimating, styles.userCancel]);
  var resting = useCallback(function () {
    if (!dynamicRef.current) {
      return;
    }

    setDynamicStyle(styles.resting);
  }, [setDynamicStyle, styles.resting]);
  var marshal = useMemo(function () {
    return {
      dragging: dragging,
      dropping: dropping,
      resting: resting
    };
  }, [dragging, dropping, resting]);
  return marshal;
}

var getWindowFromEl = (function (el) {
  return el && el.ownerDocument ? el.ownerDocument.defaultView : window;
});

function isHtmlElement(el) {
  return el instanceof getWindowFromEl(el).HTMLElement;
}

function findDragHandle(contextId, draggableId) {
  var selector = "[" + dragHandle.contextId + "=\"" + contextId + "\"]";
  var possible = toArray(document.querySelectorAll(selector));

  if (!possible.length) {
    return null;
  }

  var handle = find(possible, function (el) {
    return el.getAttribute(dragHandle.draggableId) === draggableId;
  });

  if (!handle) {
    return null;
  }

  if (!isHtmlElement(handle)) {
    return null;
  }

  return handle;
}

function useFocusMarshal(contextId) {
  var entriesRef = useRef({});
  var recordRef = useRef(null);
  var restoreFocusFrameRef = useRef(null);
  var isMountedRef = useRef(false);
  var register = useCallback(function register(id, focus) {
    var entry = {
      id: id,
      focus: focus
    };
    entriesRef.current[id] = entry;
    return function unregister() {
      var entries = entriesRef.current;
      var current = entries[id];

      if (current !== entry) {
        delete entries[id];
      }
    };
  }, []);
  var tryGiveFocus = useCallback(function tryGiveFocus(tryGiveFocusTo) {
    var handle = findDragHandle(contextId, tryGiveFocusTo);

    if (handle && handle !== document.activeElement) {
      handle.focus();
    }
  }, [contextId]);
  var tryShiftRecord = useCallback(function tryShiftRecord(previous, redirectTo) {
    if (recordRef.current === previous) {
      recordRef.current = redirectTo;
    }
  }, []);
  var tryRestoreFocusRecorded = useCallback(function tryRestoreFocusRecorded() {
    if (restoreFocusFrameRef.current) {
      return;
    }

    if (!isMountedRef.current) {
      return;
    }

    restoreFocusFrameRef.current = requestAnimationFrame(function () {
      restoreFocusFrameRef.current = null;
      var record = recordRef.current;

      if (record) {
        tryGiveFocus(record);
      }
    });
  }, [tryGiveFocus]);
  var tryRecordFocus = useCallback(function tryRecordFocus(id) {
    recordRef.current = null;
    var focused = document.activeElement;

    if (!focused) {
      return;
    }

    if (focused.getAttribute(dragHandle.draggableId) !== id) {
      return;
    }

    recordRef.current = id;
  }, []);
  useIsomorphicLayoutEffect(function () {
    isMountedRef.current = true;
    return function clearFrameOnUnmount() {
      isMountedRef.current = false;
      var frameId = restoreFocusFrameRef.current;

      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, []);
  var marshal = useMemo(function () {
    return {
      register: register,
      tryRecordFocus: tryRecordFocus,
      tryRestoreFocusRecorded: tryRestoreFocusRecorded,
      tryShiftRecord: tryShiftRecord
    };
  }, [register, tryRecordFocus, tryRestoreFocusRecorded, tryShiftRecord]);
  return marshal;
}

function createRegistry() {
  var entries = {
    draggables: {},
    droppables: {}
  };
  var subscribers = [];

  function subscribe(cb) {
    subscribers.push(cb);
    return function unsubscribe() {
      var index = subscribers.indexOf(cb);

      if (index === -1) {
        return;
      }

      subscribers.splice(index, 1);
    };
  }

  function notify(event) {
    if (subscribers.length) {
      subscribers.forEach(function (cb) {
        return cb(event);
      });
    }
  }

  function findDraggableById(id) {
    return entries.draggables[id] || null;
  }

  function getDraggableById(id) {
    var entry = findDraggableById(id);
    !entry ? invariant(false) : void 0;
    return entry;
  }

  var draggableAPI = {
    register: function register(entry) {
      entries.draggables[entry.descriptor.id] = entry;
      notify({
        type: 'ADDITION',
        value: entry
      });
    },
    update: function update(entry, last) {
      var current = entries.draggables[last.descriptor.id];

      if (!current) {
        return;
      }

      if (current.uniqueId !== entry.uniqueId) {
        return;
      }

      delete entries.draggables[last.descriptor.id];
      entries.draggables[entry.descriptor.id] = entry;
    },
    unregister: function unregister(entry) {
      var draggableId = entry.descriptor.id;
      var current = findDraggableById(draggableId);

      if (!current) {
        return;
      }

      if (entry.uniqueId !== current.uniqueId) {
        return;
      }

      delete entries.draggables[draggableId];
      notify({
        type: 'REMOVAL',
        value: entry
      });
    },
    getById: getDraggableById,
    findById: findDraggableById,
    exists: function exists(id) {
      return Boolean(findDraggableById(id));
    },
    getAllByType: function getAllByType(type) {
      return values(entries.draggables).filter(function (entry) {
        return entry.descriptor.type === type;
      });
    }
  };

  function findDroppableById(id) {
    return entries.droppables[id] || null;
  }

  function getDroppableById(id) {
    var entry = findDroppableById(id);
    !entry ? invariant(false) : void 0;
    return entry;
  }

  var droppableAPI = {
    register: function register(entry) {
      entries.droppables[entry.descriptor.id] = entry;
    },
    unregister: function unregister(entry) {
      var current = findDroppableById(entry.descriptor.id);

      if (!current) {
        return;
      }

      if (entry.uniqueId !== current.uniqueId) {
        return;
      }

      delete entries.droppables[entry.descriptor.id];
    },
    getById: getDroppableById,
    findById: findDroppableById,
    exists: function exists(id) {
      return Boolean(findDroppableById(id));
    },
    getAllByType: function getAllByType(type) {
      return values(entries.droppables).filter(function (entry) {
        return entry.descriptor.type === type;
      });
    }
  };

  function clean() {
    entries.draggables = {};
    entries.droppables = {};
    subscribers.length = 0;
  }

  return {
    draggable: draggableAPI,
    droppable: droppableAPI,
    subscribe: subscribe,
    clean: clean
  };
}

function useRegistry() {
  var registry = useMemo(createRegistry, []);
  useEffect(function () {
    return function unmount() {
      requestAnimationFrame(registry.clean);
    };
  }, [registry]);
  return registry;
}

var StoreContext = React__default.createContext(null);

var getBodyElement = (function () {
  var body = document.body;
  !body ? invariant(false) : void 0;
  return body;
});

var visuallyHidden = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  margin: '-1px',
  border: '0',
  padding: '0',
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  'clip-path': 'inset(100%)'
};

var getId = function getId(contextId) {
  return "rbd-announcement-" + contextId;
};
function useAnnouncer(contextId) {
  var id = useMemo(function () {
    return getId(contextId);
  }, [contextId]);
  var ref = useRef(null);
  useEffect(function setup() {
    var el = document.createElement('div');
    ref.current = el;
    el.id = id;
    el.setAttribute('aria-live', 'assertive');
    el.setAttribute('aria-atomic', 'true');

    _extends(el.style, visuallyHidden);

    getBodyElement().appendChild(el);
    return function cleanup() {
      setTimeout(function remove() {
        var body = getBodyElement();

        if (body.contains(el)) {
          body.removeChild(el);
        }

        if (el === ref.current) {
          ref.current = null;
        }
      });
    };
  }, [id]);
  var announce = useCallback(function (message) {
    var el = ref.current;

    if (el) {
      el.textContent = message;
      return;
    }
  }, []);
  return announce;
}

var count = 0;
var defaults = {
  separator: '::'
};
function useUniqueId(prefix, options) {
  if (options === void 0) {
    options = defaults;
  }

  return useMemo(function () {
    return "" + prefix + options.separator + count++;
  }, [options.separator, prefix]);
}

function getElementId(_ref) {
  var contextId = _ref.contextId,
      uniqueId = _ref.uniqueId;
  return "rbd-hidden-text-" + contextId + "-" + uniqueId;
}
function useHiddenTextElement(_ref2) {
  var contextId = _ref2.contextId,
      text = _ref2.text;
  var uniqueId = useUniqueId('hidden-text', {
    separator: '-'
  });
  var id = useMemo(function () {
    return getElementId({
      contextId: contextId,
      uniqueId: uniqueId
    });
  }, [uniqueId, contextId]);
  useEffect(function mount() {
    var el = document.createElement('div');
    el.id = id;
    el.textContent = text;
    el.style.display = 'none';
    getBodyElement().appendChild(el);
    return function unmount() {
      var body = getBodyElement();

      if (body.contains(el)) {
        body.removeChild(el);
      }
    };
  }, [id, text]);
  return id;
}

var AppContext = React__default.createContext(null);

function usePrevious(current) {
  var ref = useRef(current);
  useEffect(function () {
    ref.current = current;
  });
  return ref;
}

function create() {
  var lock = null;

  function isClaimed() {
    return Boolean(lock);
  }

  function isActive(value) {
    return value === lock;
  }

  function claim(abandon) {
    !!lock ? invariant(false) : void 0;
    var newLock = {
      abandon: abandon
    };
    lock = newLock;
    return newLock;
  }

  function release() {
    !lock ? invariant(false) : void 0;
    lock = null;
  }

  function tryAbandon() {
    if (lock) {
      lock.abandon();
      release();
    }
  }

  return {
    isClaimed: isClaimed,
    isActive: isActive,
    claim: claim,
    release: release,
    tryAbandon: tryAbandon
  };
}

var tab = 9;
var enter = 13;
var escape = 27;
var space = 32;
var pageUp = 33;
var pageDown = 34;
var end = 35;
var home = 36;
var arrowLeft = 37;
var arrowUp = 38;
var arrowRight = 39;
var arrowDown = 40;

var _preventedKeys;
var preventedKeys = (_preventedKeys = {}, _preventedKeys[enter] = true, _preventedKeys[tab] = true, _preventedKeys);
var preventStandardKeyEvents = (function (event) {
  if (preventedKeys[event.keyCode]) {
    event.preventDefault();
  }
});

var supportedEventName = function () {
  var base = 'visibilitychange';

  if (typeof document === 'undefined') {
    return base;
  }

  var candidates = [base, "ms" + base, "webkit" + base, "moz" + base, "o" + base];
  var supported = find(candidates, function (eventName) {
    return "on" + eventName in document;
  });
  return supported || base;
}();

var primaryButton = 0;
var sloppyClickThreshold = 5;

function isSloppyClickThresholdExceeded(original, current) {
  return Math.abs(current.x - original.x) >= sloppyClickThreshold || Math.abs(current.y - original.y) >= sloppyClickThreshold;
}

var idle$1 = {
  type: 'IDLE'
};

function getCaptureBindings(_ref) {
  var cancel = _ref.cancel,
      completed = _ref.completed,
      getPhase = _ref.getPhase,
      setPhase = _ref.setPhase;
  return [{
    eventName: 'mousemove',
    fn: function fn(event) {
      var button = event.button,
          clientX = event.clientX,
          clientY = event.clientY;

      if (button !== primaryButton) {
        return;
      }

      var point = {
        x: clientX,
        y: clientY
      };
      var phase = getPhase();

      if (phase.type === 'DRAGGING') {
        event.preventDefault();
        phase.actions.move(point);
        return;
      }

      !(phase.type === 'PENDING') ? invariant(false) : void 0;
      var pending = phase.point;

      if (!isSloppyClickThresholdExceeded(pending, point)) {
        return;
      }

      event.preventDefault();
      var actions = phase.actions.fluidLift(point);
      setPhase({
        type: 'DRAGGING',
        actions: actions
      });
    }
  }, {
    eventName: 'mouseup',
    fn: function fn(event) {
      var phase = getPhase();

      if (phase.type !== 'DRAGGING') {
        cancel();
        return;
      }

      event.preventDefault();
      phase.actions.drop({
        shouldBlockNextClick: true
      });
      completed();
    }
  }, {
    eventName: 'mousedown',
    fn: function fn(event) {
      if (getPhase().type === 'DRAGGING') {
        event.preventDefault();
      }

      cancel();
    }
  }, {
    eventName: 'keydown',
    fn: function fn(event) {
      var phase = getPhase();

      if (phase.type === 'PENDING') {
        cancel();
        return;
      }

      if (event.keyCode === escape) {
        event.preventDefault();
        cancel();
        return;
      }

      preventStandardKeyEvents(event);
    }
  }, {
    eventName: 'resize',
    fn: cancel
  }, {
    eventName: 'scroll',
    options: {
      passive: true,
      capture: false
    },
    fn: function fn() {
      if (getPhase().type === 'PENDING') {
        cancel();
      }
    }
  }, {
    eventName: 'webkitmouseforcedown',
    fn: function fn(event) {
      var phase = getPhase();
      !(phase.type !== 'IDLE') ? invariant(false) : void 0;

      if (phase.actions.shouldRespectForcePress()) {
        cancel();
        return;
      }

      event.preventDefault();
    }
  }, {
    eventName: supportedEventName,
    fn: cancel
  }];
}

function useMouseSensor(api) {
  var phaseRef = useRef(idle$1);
  var unbindEventsRef = useRef(noop);
  var startCaptureBinding = useMemo(function () {
    return {
      eventName: 'mousedown',
      fn: function onMouseDown(event) {
        if (event.defaultPrevented) {
          return;
        }

        if (event.button !== primaryButton) {
          return;
        }

        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
          return;
        }

        var draggableId = api.findClosestDraggableId(event);

        if (!draggableId) {
          return;
        }

        var actions = api.tryGetLock(draggableId, stop, {
          sourceEvent: event
        });

        if (!actions) {
          return;
        }

        event.preventDefault();
        var point = {
          x: event.clientX,
          y: event.clientY
        };
        unbindEventsRef.current();
        startPendingDrag(actions, point);
      }
    };
  }, [api]);
  var preventForcePressBinding = useMemo(function () {
    return {
      eventName: 'webkitmouseforcewillbegin',
      fn: function fn(event) {
        if (event.defaultPrevented) {
          return;
        }

        var id = api.findClosestDraggableId(event);

        if (!id) {
          return;
        }

        var options = api.findOptionsForDraggable(id);

        if (!options) {
          return;
        }

        if (options.shouldRespectForcePress) {
          return;
        }

        if (!api.canGetLock(id)) {
          return;
        }

        event.preventDefault();
      }
    };
  }, [api]);
  var listenForCapture = useCallback(function listenForCapture() {
    var options = {
      passive: false,
      capture: true
    };
    unbindEventsRef.current = bindEvents(window, [preventForcePressBinding, startCaptureBinding], options);
  }, [preventForcePressBinding, startCaptureBinding]);
  var stop = useCallback(function () {
    var current = phaseRef.current;

    if (current.type === 'IDLE') {
      return;
    }

    phaseRef.current = idle$1;
    unbindEventsRef.current();
    listenForCapture();
  }, [listenForCapture]);
  var cancel = useCallback(function () {
    var phase = phaseRef.current;
    stop();

    if (phase.type === 'DRAGGING') {
      phase.actions.cancel({
        shouldBlockNextClick: true
      });
    }

    if (phase.type === 'PENDING') {
      phase.actions.abort();
    }
  }, [stop]);
  var bindCapturingEvents = useCallback(function bindCapturingEvents() {
    var options = {
      capture: true,
      passive: false
    };
    var bindings = getCaptureBindings({
      cancel: cancel,
      completed: stop,
      getPhase: function getPhase() {
        return phaseRef.current;
      },
      setPhase: function setPhase(phase) {
        phaseRef.current = phase;
      }
    });
    unbindEventsRef.current = bindEvents(window, bindings, options);
  }, [cancel, stop]);
  var startPendingDrag = useCallback(function startPendingDrag(actions, point) {
    !(phaseRef.current.type === 'IDLE') ? invariant(false) : void 0;
    phaseRef.current = {
      type: 'PENDING',
      point: point,
      actions: actions
    };
    bindCapturingEvents();
  }, [bindCapturingEvents]);
  useIsomorphicLayoutEffect(function mount() {
    listenForCapture();
    return function unmount() {
      unbindEventsRef.current();
    };
  }, [listenForCapture]);
}

var _scrollJumpKeys;

function noop$1() {}

var scrollJumpKeys = (_scrollJumpKeys = {}, _scrollJumpKeys[pageDown] = true, _scrollJumpKeys[pageUp] = true, _scrollJumpKeys[home] = true, _scrollJumpKeys[end] = true, _scrollJumpKeys);

function getDraggingBindings(actions, stop) {
  function cancel() {
    stop();
    actions.cancel();
  }

  function drop() {
    stop();
    actions.drop();
  }

  return [{
    eventName: 'keydown',
    fn: function fn(event) {
      if (event.keyCode === escape) {
        event.preventDefault();
        cancel();
        return;
      }

      if (event.keyCode === space) {
        event.preventDefault();
        drop();
        return;
      }

      if (event.keyCode === arrowDown) {
        event.preventDefault();
        actions.moveDown();
        return;
      }

      if (event.keyCode === arrowUp) {
        event.preventDefault();
        actions.moveUp();
        return;
      }

      if (event.keyCode === arrowRight) {
        event.preventDefault();
        actions.moveRight();
        return;
      }

      if (event.keyCode === arrowLeft) {
        event.preventDefault();
        actions.moveLeft();
        return;
      }

      if (scrollJumpKeys[event.keyCode]) {
        event.preventDefault();
        return;
      }

      preventStandardKeyEvents(event);
    }
  }, {
    eventName: 'mousedown',
    fn: cancel
  }, {
    eventName: 'mouseup',
    fn: cancel
  }, {
    eventName: 'click',
    fn: cancel
  }, {
    eventName: 'touchstart',
    fn: cancel
  }, {
    eventName: 'resize',
    fn: cancel
  }, {
    eventName: 'wheel',
    fn: cancel,
    options: {
      passive: true
    }
  }, {
    eventName: supportedEventName,
    fn: cancel
  }];
}

function useKeyboardSensor(api) {
  var unbindEventsRef = useRef(noop$1);
  var startCaptureBinding = useMemo(function () {
    return {
      eventName: 'keydown',
      fn: function onKeyDown(event) {
        if (event.defaultPrevented) {
          return;
        }

        if (event.keyCode !== space) {
          return;
        }

        var draggableId = api.findClosestDraggableId(event);

        if (!draggableId) {
          return;
        }

        var preDrag = api.tryGetLock(draggableId, stop, {
          sourceEvent: event
        });

        if (!preDrag) {
          return;
        }

        event.preventDefault();
        var isCapturing = true;
        var actions = preDrag.snapLift();
        unbindEventsRef.current();

        function stop() {
          !isCapturing ? invariant(false) : void 0;
          isCapturing = false;
          unbindEventsRef.current();
          listenForCapture();
        }

        unbindEventsRef.current = bindEvents(window, getDraggingBindings(actions, stop), {
          capture: true,
          passive: false
        });
      }
    };
  }, [api]);
  var listenForCapture = useCallback(function tryStartCapture() {
    var options = {
      passive: false,
      capture: true
    };
    unbindEventsRef.current = bindEvents(window, [startCaptureBinding], options);
  }, [startCaptureBinding]);
  useIsomorphicLayoutEffect(function mount() {
    listenForCapture();
    return function unmount() {
      unbindEventsRef.current();
    };
  }, [listenForCapture]);
}

var idle$2 = {
  type: 'IDLE'
};
var timeForLongPress = 120;
var forcePressThreshold = 0.15;

function getWindowBindings(_ref) {
  var cancel = _ref.cancel,
      getPhase = _ref.getPhase;
  return [{
    eventName: 'orientationchange',
    fn: cancel
  }, {
    eventName: 'resize',
    fn: cancel
  }, {
    eventName: 'contextmenu',
    fn: function fn(event) {
      event.preventDefault();
    }
  }, {
    eventName: 'keydown',
    fn: function fn(event) {
      if (getPhase().type !== 'DRAGGING') {
        cancel();
        return;
      }

      if (event.keyCode === escape) {
        event.preventDefault();
      }

      cancel();
    }
  }, {
    eventName: supportedEventName,
    fn: cancel
  }];
}

function getHandleBindings(_ref2) {
  var cancel = _ref2.cancel,
      completed = _ref2.completed,
      getPhase = _ref2.getPhase;
  return [{
    eventName: 'touchmove',
    options: {
      capture: false
    },
    fn: function fn(event) {
      var phase = getPhase();

      if (phase.type !== 'DRAGGING') {
        cancel();
        return;
      }

      phase.hasMoved = true;
      var _event$touches$ = event.touches[0],
          clientX = _event$touches$.clientX,
          clientY = _event$touches$.clientY;
      var point = {
        x: clientX,
        y: clientY
      };
      event.preventDefault();
      phase.actions.move(point);
    }
  }, {
    eventName: 'touchend',
    fn: function fn(event) {
      var phase = getPhase();

      if (phase.type !== 'DRAGGING') {
        cancel();
        return;
      }

      event.preventDefault();
      phase.actions.drop({
        shouldBlockNextClick: true
      });
      completed();
    }
  }, {
    eventName: 'touchcancel',
    fn: function fn(event) {
      if (getPhase().type !== 'DRAGGING') {
        cancel();
        return;
      }

      event.preventDefault();
      cancel();
    }
  }, {
    eventName: 'touchforcechange',
    fn: function fn(event) {
      var phase = getPhase();
      !(phase.type !== 'IDLE') ? invariant(false) : void 0;
      var touch = event.touches[0];

      if (!touch) {
        return;
      }

      var isForcePress = touch.force >= forcePressThreshold;

      if (!isForcePress) {
        return;
      }

      var shouldRespect = phase.actions.shouldRespectForcePress();

      if (phase.type === 'PENDING') {
        if (shouldRespect) {
          cancel();
        }

        return;
      }

      if (shouldRespect) {
        if (phase.hasMoved) {
          event.preventDefault();
          return;
        }

        cancel();
        return;
      }

      event.preventDefault();
    }
  }, {
    eventName: supportedEventName,
    fn: cancel
  }];
}

function useTouchSensor(api) {
  var phaseRef = useRef(idle$2);
  var unbindEventsRef = useRef(noop);
  var getPhase = useCallback(function getPhase() {
    return phaseRef.current;
  }, []);
  var setPhase = useCallback(function setPhase(phase) {
    phaseRef.current = phase;
  }, []);
  var startCaptureBinding = useMemo(function () {
    return {
      eventName: 'touchstart',
      fn: function onTouchStart(event) {
        if (event.defaultPrevented) {
          return;
        }

        var draggableId = api.findClosestDraggableId(event);

        if (!draggableId) {
          return;
        }

        var actions = api.tryGetLock(draggableId, stop, {
          sourceEvent: event
        });

        if (!actions) {
          return;
        }

        var touch = event.touches[0];
        var clientX = touch.clientX,
            clientY = touch.clientY;
        var point = {
          x: clientX,
          y: clientY
        };
        unbindEventsRef.current();
        startPendingDrag(actions, point);
      }
    };
  }, [api]);
  var listenForCapture = useCallback(function listenForCapture() {
    var options = {
      capture: true,
      passive: false
    };
    unbindEventsRef.current = bindEvents(window, [startCaptureBinding], options);
  }, [startCaptureBinding]);
  var stop = useCallback(function () {
    var current = phaseRef.current;

    if (current.type === 'IDLE') {
      return;
    }

    if (current.type === 'PENDING') {
      clearTimeout(current.longPressTimerId);
    }

    setPhase(idle$2);
    unbindEventsRef.current();
    listenForCapture();
  }, [listenForCapture, setPhase]);
  var cancel = useCallback(function () {
    var phase = phaseRef.current;
    stop();

    if (phase.type === 'DRAGGING') {
      phase.actions.cancel({
        shouldBlockNextClick: true
      });
    }

    if (phase.type === 'PENDING') {
      phase.actions.abort();
    }
  }, [stop]);
  var bindCapturingEvents = useCallback(function bindCapturingEvents() {
    var options = {
      capture: true,
      passive: false
    };
    var args = {
      cancel: cancel,
      completed: stop,
      getPhase: getPhase
    };
    var unbindTarget = bindEvents(window, getHandleBindings(args), options);
    var unbindWindow = bindEvents(window, getWindowBindings(args), options);

    unbindEventsRef.current = function unbindAll() {
      unbindTarget();
      unbindWindow();
    };
  }, [cancel, getPhase, stop]);
  var startDragging = useCallback(function startDragging() {
    var phase = getPhase();
    !(phase.type === 'PENDING') ? invariant(false) : void 0;
    var actions = phase.actions.fluidLift(phase.point);
    setPhase({
      type: 'DRAGGING',
      actions: actions,
      hasMoved: false
    });
  }, [getPhase, setPhase]);
  var startPendingDrag = useCallback(function startPendingDrag(actions, point) {
    !(getPhase().type === 'IDLE') ? invariant(false) : void 0;
    var longPressTimerId = setTimeout(startDragging, timeForLongPress);
    setPhase({
      type: 'PENDING',
      point: point,
      actions: actions,
      longPressTimerId: longPressTimerId
    });
    bindCapturingEvents();
  }, [bindCapturingEvents, getPhase, setPhase, startDragging]);
  useIsomorphicLayoutEffect(function mount() {
    listenForCapture();
    return function unmount() {
      unbindEventsRef.current();
      var phase = getPhase();

      if (phase.type === 'PENDING') {
        clearTimeout(phase.longPressTimerId);
        setPhase(idle$2);
      }
    };
  }, [getPhase, listenForCapture, setPhase]);
  useIsomorphicLayoutEffect(function webkitHack() {
    var unbind = bindEvents(window, [{
      eventName: 'touchmove',
      fn: function fn() {},
      options: {
        capture: false,
        passive: false
      }
    }]);
    return unbind;
  }, []);
}

var interactiveTagNames = {
  input: true,
  button: true,
  textarea: true,
  select: true,
  option: true,
  optgroup: true,
  video: true,
  audio: true
};

function isAnInteractiveElement(parent, current) {
  if (current == null) {
    return false;
  }

  var hasAnInteractiveTag = Boolean(interactiveTagNames[current.tagName.toLowerCase()]);

  if (hasAnInteractiveTag) {
    return true;
  }

  var attribute = current.getAttribute('contenteditable');

  if (attribute === 'true' || attribute === '') {
    return true;
  }

  if (current === parent) {
    return false;
  }

  return isAnInteractiveElement(parent, current.parentElement);
}

function isEventInInteractiveElement(draggable, event) {
  var target = event.target;

  if (!isHtmlElement(target)) {
    return false;
  }

  return isAnInteractiveElement(draggable, target);
}

var getBorderBoxCenterPosition = (function (el) {
  return getRect(el.getBoundingClientRect()).center;
});

function isElement(el) {
  return el instanceof getWindowFromEl(el).Element;
}

var supportedMatchesName = function () {
  var base = 'matches';

  if (typeof document === 'undefined') {
    return base;
  }

  var candidates = [base, 'msMatchesSelector', 'webkitMatchesSelector'];
  var value = find(candidates, function (name) {
    return name in Element.prototype;
  });
  return value || base;
}();

function closestPonyfill(el, selector) {
  if (el == null) {
    return null;
  }

  if (el[supportedMatchesName](selector)) {
    return el;
  }

  return closestPonyfill(el.parentElement, selector);
}

function closest$1(el, selector) {
  if (el.closest) {
    return el.closest(selector);
  }

  return closestPonyfill(el, selector);
}

function getSelector(contextId) {
  return "[" + dragHandle.contextId + "=\"" + contextId + "\"]";
}

function findClosestDragHandleFromEvent(contextId, event) {
  var target = event.target;

  if (!isElement(target)) {
    return null;
  }

  var selector = getSelector(contextId);
  var handle = closest$1(target, selector);

  if (!handle) {
    return null;
  }

  if (!isHtmlElement(handle)) {
    return null;
  }

  return handle;
}

function tryGetClosestDraggableIdFromEvent(contextId, event) {
  var handle = findClosestDragHandleFromEvent(contextId, event);

  if (!handle) {
    return null;
  }

  return handle.getAttribute(dragHandle.draggableId);
}

function findDraggable(contextId, draggableId) {
  var selector = "[" + draggable.contextId + "=\"" + contextId + "\"]";
  var possible = toArray(document.querySelectorAll(selector));
  var draggable$1 = find(possible, function (el) {
    return el.getAttribute(draggable.id) === draggableId;
  });

  if (!draggable$1) {
    return null;
  }

  if (!isHtmlElement(draggable$1)) {
    return null;
  }

  return draggable$1;
}

function preventDefault(event) {
  event.preventDefault();
}

function _isActive(_ref) {
  var expected = _ref.expected,
      phase = _ref.phase,
      isLockActive = _ref.isLockActive;
      _ref.shouldWarn;

  if (!isLockActive()) {

    return false;
  }

  if (expected !== phase) {

    return false;
  }

  return true;
}

function canStart(_ref2) {
  var lockAPI = _ref2.lockAPI,
      store = _ref2.store,
      registry = _ref2.registry,
      draggableId = _ref2.draggableId;

  if (lockAPI.isClaimed()) {
    return false;
  }

  var entry = registry.draggable.findById(draggableId);

  if (!entry) {
    return false;
  }

  if (!entry.options.isEnabled) {
    return false;
  }

  if (!canStartDrag(store.getState(), draggableId)) {
    return false;
  }

  return true;
}

function tryStart(_ref3) {
  var lockAPI = _ref3.lockAPI,
      contextId = _ref3.contextId,
      store = _ref3.store,
      registry = _ref3.registry,
      draggableId = _ref3.draggableId,
      forceSensorStop = _ref3.forceSensorStop,
      sourceEvent = _ref3.sourceEvent;
  var shouldStart = canStart({
    lockAPI: lockAPI,
    store: store,
    registry: registry,
    draggableId: draggableId
  });

  if (!shouldStart) {
    return null;
  }

  var entry = registry.draggable.getById(draggableId);
  var el = findDraggable(contextId, entry.descriptor.id);

  if (!el) {
    return null;
  }

  if (sourceEvent && !entry.options.canDragInteractiveElements && isEventInInteractiveElement(el, sourceEvent)) {
    return null;
  }

  var lock = lockAPI.claim(forceSensorStop || noop);
  var phase = 'PRE_DRAG';

  function getShouldRespectForcePress() {
    return entry.options.shouldRespectForcePress;
  }

  function isLockActive() {
    return lockAPI.isActive(lock);
  }

  function tryDispatch(expected, getAction) {
    if (_isActive({
      expected: expected,
      phase: phase,
      isLockActive: isLockActive,
      shouldWarn: true
    })) {
      store.dispatch(getAction());
    }
  }

  var tryDispatchWhenDragging = tryDispatch.bind(null, 'DRAGGING');

  function lift$1(args) {
    function completed() {
      lockAPI.release();
      phase = 'COMPLETED';
    }

    if (phase !== 'PRE_DRAG') {
      completed();
      !(phase === 'PRE_DRAG') ? invariant(false) : void 0;
    }

    store.dispatch(lift(args.liftActionArgs));
    phase = 'DRAGGING';

    function finish(reason, options) {
      if (options === void 0) {
        options = {
          shouldBlockNextClick: false
        };
      }

      args.cleanup();

      if (options.shouldBlockNextClick) {
        var unbind = bindEvents(window, [{
          eventName: 'click',
          fn: preventDefault,
          options: {
            once: true,
            passive: false,
            capture: true
          }
        }]);
        setTimeout(unbind);
      }

      completed();
      store.dispatch(drop({
        reason: reason
      }));
    }

    return _extends({
      isActive: function isActive() {
        return _isActive({
          expected: 'DRAGGING',
          phase: phase,
          isLockActive: isLockActive,
          shouldWarn: false
        });
      },
      shouldRespectForcePress: getShouldRespectForcePress,
      drop: function drop(options) {
        return finish('DROP', options);
      },
      cancel: function cancel(options) {
        return finish('CANCEL', options);
      }
    }, args.actions);
  }

  function fluidLift(clientSelection) {
    var move$1 = rafSchd$1(function (client) {
      tryDispatchWhenDragging(function () {
        return move({
          client: client
        });
      });
    });
    var api = lift$1({
      liftActionArgs: {
        id: draggableId,
        clientSelection: clientSelection,
        movementMode: 'FLUID'
      },
      cleanup: function cleanup() {
        return move$1.cancel();
      },
      actions: {
        move: move$1
      }
    });
    return _extends({}, api, {
      move: move$1
    });
  }

  function snapLift() {
    var actions = {
      moveUp: function moveUp$1() {
        return tryDispatchWhenDragging(moveUp);
      },
      moveRight: function moveRight$1() {
        return tryDispatchWhenDragging(moveRight);
      },
      moveDown: function moveDown$1() {
        return tryDispatchWhenDragging(moveDown);
      },
      moveLeft: function moveLeft$1() {
        return tryDispatchWhenDragging(moveLeft);
      }
    };
    return lift$1({
      liftActionArgs: {
        id: draggableId,
        clientSelection: getBorderBoxCenterPosition(el),
        movementMode: 'SNAP'
      },
      cleanup: noop,
      actions: actions
    });
  }

  function abortPreDrag() {
    var shouldRelease = _isActive({
      expected: 'PRE_DRAG',
      phase: phase,
      isLockActive: isLockActive,
      shouldWarn: true
    });

    if (shouldRelease) {
      lockAPI.release();
    }
  }

  var preDrag = {
    isActive: function isActive() {
      return _isActive({
        expected: 'PRE_DRAG',
        phase: phase,
        isLockActive: isLockActive,
        shouldWarn: false
      });
    },
    shouldRespectForcePress: getShouldRespectForcePress,
    fluidLift: fluidLift,
    snapLift: snapLift,
    abort: abortPreDrag
  };
  return preDrag;
}

var defaultSensors = [useMouseSensor, useKeyboardSensor, useTouchSensor];
function useSensorMarshal(_ref4) {
  var contextId = _ref4.contextId,
      store = _ref4.store,
      registry = _ref4.registry,
      customSensors = _ref4.customSensors,
      enableDefaultSensors = _ref4.enableDefaultSensors;
  var useSensors = [].concat(enableDefaultSensors ? defaultSensors : [], customSensors || []);
  var lockAPI = useState(function () {
    return create();
  })[0];
  var tryAbandonLock = useCallback(function tryAbandonLock(previous, current) {
    if (previous.isDragging && !current.isDragging) {
      lockAPI.tryAbandon();
    }
  }, [lockAPI]);
  useIsomorphicLayoutEffect(function listenToStore() {
    var previous = store.getState();
    var unsubscribe = store.subscribe(function () {
      var current = store.getState();
      tryAbandonLock(previous, current);
      previous = current;
    });
    return unsubscribe;
  }, [lockAPI, store, tryAbandonLock]);
  useIsomorphicLayoutEffect(function () {
    return lockAPI.tryAbandon;
  }, [lockAPI.tryAbandon]);
  var canGetLock = useCallback(function (draggableId) {
    return canStart({
      lockAPI: lockAPI,
      registry: registry,
      store: store,
      draggableId: draggableId
    });
  }, [lockAPI, registry, store]);
  var tryGetLock = useCallback(function (draggableId, forceStop, options) {
    return tryStart({
      lockAPI: lockAPI,
      registry: registry,
      contextId: contextId,
      store: store,
      draggableId: draggableId,
      forceSensorStop: forceStop,
      sourceEvent: options && options.sourceEvent ? options.sourceEvent : null
    });
  }, [contextId, lockAPI, registry, store]);
  var findClosestDraggableId = useCallback(function (event) {
    return tryGetClosestDraggableIdFromEvent(contextId, event);
  }, [contextId]);
  var findOptionsForDraggable = useCallback(function (id) {
    var entry = registry.draggable.findById(id);
    return entry ? entry.options : null;
  }, [registry.draggable]);
  var tryReleaseLock = useCallback(function tryReleaseLock() {
    if (!lockAPI.isClaimed()) {
      return;
    }

    lockAPI.tryAbandon();

    if (store.getState().phase !== 'IDLE') {
      store.dispatch(flush());
    }
  }, [lockAPI, store]);
  var isLockClaimed = useCallback(lockAPI.isClaimed, [lockAPI]);
  var api = useMemo(function () {
    return {
      canGetLock: canGetLock,
      tryGetLock: tryGetLock,
      findClosestDraggableId: findClosestDraggableId,
      findOptionsForDraggable: findOptionsForDraggable,
      tryReleaseLock: tryReleaseLock,
      isLockClaimed: isLockClaimed
    };
  }, [canGetLock, tryGetLock, findClosestDraggableId, findOptionsForDraggable, tryReleaseLock, isLockClaimed]);

  for (var i = 0; i < useSensors.length; i++) {
    useSensors[i](api);
  }
}

var createResponders = function createResponders(props) {
  return {
    onBeforeCapture: props.onBeforeCapture,
    onBeforeDragStart: props.onBeforeDragStart,
    onDragStart: props.onDragStart,
    onDragEnd: props.onDragEnd,
    onDragUpdate: props.onDragUpdate
  };
};

function getStore(lazyRef) {
  !lazyRef.current ? invariant(false) : void 0;
  return lazyRef.current;
}

function App(props) {
  var contextId = props.contextId,
      setCallbacks = props.setCallbacks,
      sensors = props.sensors,
      nonce = props.nonce,
      dragHandleUsageInstructions = props.dragHandleUsageInstructions;
  var lazyStoreRef = useRef(null);
  var lastPropsRef = usePrevious(props);
  var getResponders = useCallback(function () {
    return createResponders(lastPropsRef.current);
  }, [lastPropsRef]);
  var announce = useAnnouncer(contextId);
  var dragHandleUsageInstructionsId = useHiddenTextElement({
    contextId: contextId,
    text: dragHandleUsageInstructions
  });
  var styleMarshal = useStyleMarshal(contextId, nonce);
  var lazyDispatch = useCallback(function (action) {
    getStore(lazyStoreRef).dispatch(action);
  }, []);
  var marshalCallbacks = useMemo(function () {
    return bindActionCreators({
      publishWhileDragging: publishWhileDragging,
      updateDroppableScroll: updateDroppableScroll,
      updateDroppableIsEnabled: updateDroppableIsEnabled,
      updateDroppableIsCombineEnabled: updateDroppableIsCombineEnabled,
      collectionStarting: collectionStarting
    }, lazyDispatch);
  }, [lazyDispatch]);
  var registry = useRegistry();
  var dimensionMarshal = useMemo(function () {
    return createDimensionMarshal(registry, marshalCallbacks);
  }, [registry, marshalCallbacks]);
  var autoScroller = useMemo(function () {
    return createAutoScroller(_extends({
      scrollWindow: scrollWindow,
      scrollDroppable: dimensionMarshal.scrollDroppable
    }, bindActionCreators({
      move: move
    }, lazyDispatch)));
  }, [dimensionMarshal.scrollDroppable, lazyDispatch]);
  var focusMarshal = useFocusMarshal(contextId);
  var store = useMemo(function () {
    return createStore({
      announce: announce,
      autoScroller: autoScroller,
      dimensionMarshal: dimensionMarshal,
      focusMarshal: focusMarshal,
      getResponders: getResponders,
      styleMarshal: styleMarshal
    });
  }, [announce, autoScroller, dimensionMarshal, focusMarshal, getResponders, styleMarshal]);

  lazyStoreRef.current = store;
  var tryResetStore = useCallback(function () {
    var current = getStore(lazyStoreRef);
    var state = current.getState();

    if (state.phase !== 'IDLE') {
      current.dispatch(flush());
    }
  }, []);
  var isDragging = useCallback(function () {
    var state = getStore(lazyStoreRef).getState();
    return state.isDragging || state.phase === 'DROP_ANIMATING';
  }, []);
  var appCallbacks = useMemo(function () {
    return {
      isDragging: isDragging,
      tryAbort: tryResetStore
    };
  }, [isDragging, tryResetStore]);
  setCallbacks(appCallbacks);
  var getCanLift = useCallback(function (id) {
    return canStartDrag(getStore(lazyStoreRef).getState(), id);
  }, []);
  var getIsMovementAllowed = useCallback(function () {
    return isMovementAllowed(getStore(lazyStoreRef).getState());
  }, []);
  var appContext = useMemo(function () {
    return {
      marshal: dimensionMarshal,
      focus: focusMarshal,
      contextId: contextId,
      canLift: getCanLift,
      isMovementAllowed: getIsMovementAllowed,
      dragHandleUsageInstructionsId: dragHandleUsageInstructionsId,
      registry: registry
    };
  }, [contextId, dimensionMarshal, dragHandleUsageInstructionsId, focusMarshal, getCanLift, getIsMovementAllowed, registry]);
  useSensorMarshal({
    contextId: contextId,
    store: store,
    registry: registry,
    customSensors: sensors,
    enableDefaultSensors: props.enableDefaultSensors !== false
  });
  useEffect(function () {
    return tryResetStore;
  }, [tryResetStore]);
  return React__default.createElement(AppContext.Provider, {
    value: appContext
  }, React__default.createElement(Provider, {
    context: StoreContext,
    store: store
  }, props.children));
}

var count$1 = 0;
function useInstanceCount() {
  return useMemo(function () {
    return "" + count$1++;
  }, []);
}
function DragDropContext(props) {
  var contextId = useInstanceCount();
  var dragHandleUsageInstructions = props.dragHandleUsageInstructions || preset.dragHandleUsageInstructions;
  return React__default.createElement(ErrorBoundary, null, function (setCallbacks) {
    return React__default.createElement(App, {
      nonce: props.nonce,
      contextId: contextId,
      setCallbacks: setCallbacks,
      dragHandleUsageInstructions: dragHandleUsageInstructions,
      enableDefaultSensors: props.enableDefaultSensors,
      sensors: props.sensors,
      onBeforeCapture: props.onBeforeCapture,
      onBeforeDragStart: props.onBeforeDragStart,
      onDragStart: props.onDragStart,
      onDragUpdate: props.onDragUpdate,
      onDragEnd: props.onDragEnd
    }, props.children);
  });
}

var isEqual$1 = function isEqual(base) {
  return function (value) {
    return base === value;
  };
};

var isScroll = isEqual$1('scroll');
var isAuto = isEqual$1('auto');

var isEither = function isEither(overflow, fn) {
  return fn(overflow.overflowX) || fn(overflow.overflowY);
};

var isElementScrollable = function isElementScrollable(el) {
  var style = window.getComputedStyle(el);
  var overflow = {
    overflowX: style.overflowX,
    overflowY: style.overflowY
  };
  return isEither(overflow, isScroll) || isEither(overflow, isAuto);
};

var isBodyScrollable = function isBodyScrollable() {
  {
    return false;
  }
};

var getClosestScrollable = function getClosestScrollable(el) {
  if (el == null) {
    return null;
  }

  if (el === document.body) {
    return isBodyScrollable() ? el : null;
  }

  if (el === document.documentElement) {
    return null;
  }

  if (!isElementScrollable(el)) {
    return getClosestScrollable(el.parentElement);
  }

  return el;
};

var getScroll$1 = (function (el) {
  return {
    x: el.scrollLeft,
    y: el.scrollTop
  };
});

var getIsFixed = function getIsFixed(el) {
  if (!el) {
    return false;
  }

  var style = window.getComputedStyle(el);

  if (style.position === 'fixed') {
    return true;
  }

  return getIsFixed(el.parentElement);
};

var getEnv = (function (start) {
  var closestScrollable = getClosestScrollable(start);
  var isFixedOnPage = getIsFixed(start);
  return {
    closestScrollable: closestScrollable,
    isFixedOnPage: isFixedOnPage
  };
});

var getDroppableDimension = (function (_ref) {
  var descriptor = _ref.descriptor,
      isEnabled = _ref.isEnabled,
      isCombineEnabled = _ref.isCombineEnabled,
      isFixedOnPage = _ref.isFixedOnPage,
      direction = _ref.direction,
      client = _ref.client,
      page = _ref.page,
      closest = _ref.closest;

  var frame = function () {
    if (!closest) {
      return null;
    }

    var scrollSize = closest.scrollSize,
        frameClient = closest.client;
    var maxScroll = getMaxScroll({
      scrollHeight: scrollSize.scrollHeight,
      scrollWidth: scrollSize.scrollWidth,
      height: frameClient.paddingBox.height,
      width: frameClient.paddingBox.width
    });
    return {
      pageMarginBox: closest.page.marginBox,
      frameClient: frameClient,
      scrollSize: scrollSize,
      shouldClipSubject: closest.shouldClipSubject,
      scroll: {
        initial: closest.scroll,
        current: closest.scroll,
        max: maxScroll,
        diff: {
          value: origin,
          displacement: origin
        }
      }
    };
  }();

  var axis = direction === 'vertical' ? vertical : horizontal;
  var subject = getSubject({
    page: page,
    withPlaceholder: null,
    axis: axis,
    frame: frame
  });
  var dimension = {
    descriptor: descriptor,
    isCombineEnabled: isCombineEnabled,
    isFixedOnPage: isFixedOnPage,
    axis: axis,
    isEnabled: isEnabled,
    client: client,
    page: page,
    frame: frame,
    subject: subject
  };
  return dimension;
});

var getClient = function getClient(targetRef, closestScrollable) {
  var base = getBox(targetRef);

  if (!closestScrollable) {
    return base;
  }

  if (targetRef !== closestScrollable) {
    return base;
  }

  var top = base.paddingBox.top - closestScrollable.scrollTop;
  var left = base.paddingBox.left - closestScrollable.scrollLeft;
  var bottom = top + closestScrollable.scrollHeight;
  var right = left + closestScrollable.scrollWidth;
  var paddingBox = {
    top: top,
    right: right,
    bottom: bottom,
    left: left
  };
  var borderBox = expand(paddingBox, base.border);
  var client = createBox({
    borderBox: borderBox,
    margin: base.margin,
    border: base.border,
    padding: base.padding
  });
  return client;
};

var getDimension = (function (_ref) {
  var ref = _ref.ref,
      descriptor = _ref.descriptor,
      env = _ref.env,
      windowScroll = _ref.windowScroll,
      direction = _ref.direction,
      isDropDisabled = _ref.isDropDisabled,
      isCombineEnabled = _ref.isCombineEnabled,
      shouldClipSubject = _ref.shouldClipSubject;
  var closestScrollable = env.closestScrollable;
  var client = getClient(ref, closestScrollable);
  var page = withScroll(client, windowScroll);

  var closest = function () {
    if (!closestScrollable) {
      return null;
    }

    var frameClient = getBox(closestScrollable);
    var scrollSize = {
      scrollHeight: closestScrollable.scrollHeight,
      scrollWidth: closestScrollable.scrollWidth
    };
    return {
      client: frameClient,
      page: withScroll(frameClient, windowScroll),
      scroll: getScroll$1(closestScrollable),
      scrollSize: scrollSize,
      shouldClipSubject: shouldClipSubject
    };
  }();

  var dimension = getDroppableDimension({
    descriptor: descriptor,
    isEnabled: !isDropDisabled,
    isCombineEnabled: isCombineEnabled,
    isFixedOnPage: env.isFixedOnPage,
    direction: direction,
    client: client,
    page: page,
    closest: closest
  });
  return dimension;
});

var immediate = {
  passive: false
};
var delayed = {
  passive: true
};
var getListenerOptions = (function (options) {
  return options.shouldPublishImmediately ? immediate : delayed;
});

function useRequiredContext(Context) {
  var result = useContext(Context);
  !result ? invariant(false) : void 0;
  return result;
}

var getClosestScrollableFromDrag = function getClosestScrollableFromDrag(dragging) {
  return dragging && dragging.env.closestScrollable || null;
};

function useDroppablePublisher(args) {
  var whileDraggingRef = useRef(null);
  var appContext = useRequiredContext(AppContext);
  var uniqueId = useUniqueId('droppable');
  var registry = appContext.registry,
      marshal = appContext.marshal;
  var previousRef = usePrevious(args);
  var descriptor = useMemo(function () {
    return {
      id: args.droppableId,
      type: args.type,
      mode: args.mode
    };
  }, [args.droppableId, args.mode, args.type]);
  var publishedDescriptorRef = useRef(descriptor);
  var memoizedUpdateScroll = useMemo(function () {
    return memoizeOne(function (x, y) {
      !whileDraggingRef.current ? invariant(false) : void 0;
      var scroll = {
        x: x,
        y: y
      };
      marshal.updateDroppableScroll(descriptor.id, scroll);
    });
  }, [descriptor.id, marshal]);
  var getClosestScroll = useCallback(function () {
    var dragging = whileDraggingRef.current;

    if (!dragging || !dragging.env.closestScrollable) {
      return origin;
    }

    return getScroll$1(dragging.env.closestScrollable);
  }, []);
  var updateScroll = useCallback(function () {
    var scroll = getClosestScroll();
    memoizedUpdateScroll(scroll.x, scroll.y);
  }, [getClosestScroll, memoizedUpdateScroll]);
  var scheduleScrollUpdate = useMemo(function () {
    return rafSchd$1(updateScroll);
  }, [updateScroll]);
  var onClosestScroll = useCallback(function () {
    var dragging = whileDraggingRef.current;
    var closest = getClosestScrollableFromDrag(dragging);
    !(dragging && closest) ? invariant(false) : void 0;
    var options = dragging.scrollOptions;

    if (options.shouldPublishImmediately) {
      updateScroll();
      return;
    }

    scheduleScrollUpdate();
  }, [scheduleScrollUpdate, updateScroll]);
  var getDimensionAndWatchScroll = useCallback(function (windowScroll, options) {
    !!whileDraggingRef.current ? invariant(false) : void 0;
    var previous = previousRef.current;
    var ref = previous.getDroppableRef();
    !ref ? invariant(false) : void 0;
    var env = getEnv(ref);
    var dragging = {
      ref: ref,
      descriptor: descriptor,
      env: env,
      scrollOptions: options
    };
    whileDraggingRef.current = dragging;
    var dimension = getDimension({
      ref: ref,
      descriptor: descriptor,
      env: env,
      windowScroll: windowScroll,
      direction: previous.direction,
      isDropDisabled: previous.isDropDisabled,
      isCombineEnabled: previous.isCombineEnabled,
      shouldClipSubject: !previous.ignoreContainerClipping
    });
    var scrollable = env.closestScrollable;

    if (scrollable) {
      scrollable.setAttribute(scrollContainer.contextId, appContext.contextId);
      scrollable.addEventListener('scroll', onClosestScroll, getListenerOptions(dragging.scrollOptions));
    }

    return dimension;
  }, [appContext.contextId, descriptor, onClosestScroll, previousRef]);
  var getScrollWhileDragging = useCallback(function () {
    var dragging = whileDraggingRef.current;
    var closest = getClosestScrollableFromDrag(dragging);
    !(dragging && closest) ? invariant(false) : void 0;
    return getScroll$1(closest);
  }, []);
  var dragStopped = useCallback(function () {
    var dragging = whileDraggingRef.current;
    !dragging ? invariant(false) : void 0;
    var closest = getClosestScrollableFromDrag(dragging);
    whileDraggingRef.current = null;

    if (!closest) {
      return;
    }

    scheduleScrollUpdate.cancel();
    closest.removeAttribute(scrollContainer.contextId);
    closest.removeEventListener('scroll', onClosestScroll, getListenerOptions(dragging.scrollOptions));
  }, [onClosestScroll, scheduleScrollUpdate]);
  var scroll = useCallback(function (change) {
    var dragging = whileDraggingRef.current;
    !dragging ? invariant(false) : void 0;
    var closest = getClosestScrollableFromDrag(dragging);
    !closest ? invariant(false) : void 0;
    closest.scrollTop += change.y;
    closest.scrollLeft += change.x;
  }, []);
  var callbacks = useMemo(function () {
    return {
      getDimensionAndWatchScroll: getDimensionAndWatchScroll,
      getScrollWhileDragging: getScrollWhileDragging,
      dragStopped: dragStopped,
      scroll: scroll
    };
  }, [dragStopped, getDimensionAndWatchScroll, getScrollWhileDragging, scroll]);
  var entry = useMemo(function () {
    return {
      uniqueId: uniqueId,
      descriptor: descriptor,
      callbacks: callbacks
    };
  }, [callbacks, descriptor, uniqueId]);
  useIsomorphicLayoutEffect(function () {
    publishedDescriptorRef.current = entry.descriptor;
    registry.droppable.register(entry);
    return function () {
      if (whileDraggingRef.current) {
        dragStopped();
      }

      registry.droppable.unregister(entry);
    };
  }, [callbacks, descriptor, dragStopped, entry, marshal, registry.droppable]);
  useIsomorphicLayoutEffect(function () {
    if (!whileDraggingRef.current) {
      return;
    }

    marshal.updateDroppableIsEnabled(publishedDescriptorRef.current.id, !args.isDropDisabled);
  }, [args.isDropDisabled, marshal]);
  useIsomorphicLayoutEffect(function () {
    if (!whileDraggingRef.current) {
      return;
    }

    marshal.updateDroppableIsCombineEnabled(publishedDescriptorRef.current.id, args.isCombineEnabled);
  }, [args.isCombineEnabled, marshal]);
}

function noop$2() {}

var empty = {
  width: 0,
  height: 0,
  margin: noSpacing
};

var getSize = function getSize(_ref) {
  var isAnimatingOpenOnMount = _ref.isAnimatingOpenOnMount,
      placeholder = _ref.placeholder,
      animate = _ref.animate;

  if (isAnimatingOpenOnMount) {
    return empty;
  }

  if (animate === 'close') {
    return empty;
  }

  return {
    height: placeholder.client.borderBox.height,
    width: placeholder.client.borderBox.width,
    margin: placeholder.client.margin
  };
};

var getStyle = function getStyle(_ref2) {
  var isAnimatingOpenOnMount = _ref2.isAnimatingOpenOnMount,
      placeholder = _ref2.placeholder,
      animate = _ref2.animate;
  var size = getSize({
    isAnimatingOpenOnMount: isAnimatingOpenOnMount,
    placeholder: placeholder,
    animate: animate
  });
  return {
    display: placeholder.display,
    boxSizing: 'border-box',
    width: size.width,
    height: size.height,
    marginTop: size.margin.top,
    marginRight: size.margin.right,
    marginBottom: size.margin.bottom,
    marginLeft: size.margin.left,
    flexShrink: '0',
    flexGrow: '0',
    pointerEvents: 'none',
    transition: animate !== 'none' ? transitions.placeholder : null
  };
};

function Placeholder(props) {
  var animateOpenTimerRef = useRef(null);
  var tryClearAnimateOpenTimer = useCallback(function () {
    if (!animateOpenTimerRef.current) {
      return;
    }

    clearTimeout(animateOpenTimerRef.current);
    animateOpenTimerRef.current = null;
  }, []);
  var animate = props.animate,
      onTransitionEnd = props.onTransitionEnd,
      onClose = props.onClose,
      contextId = props.contextId;

  var _useState = useState(props.animate === 'open'),
      isAnimatingOpenOnMount = _useState[0],
      setIsAnimatingOpenOnMount = _useState[1];

  useEffect(function () {
    if (!isAnimatingOpenOnMount) {
      return noop$2;
    }

    if (animate !== 'open') {
      tryClearAnimateOpenTimer();
      setIsAnimatingOpenOnMount(false);
      return noop$2;
    }

    if (animateOpenTimerRef.current) {
      return noop$2;
    }

    animateOpenTimerRef.current = setTimeout(function () {
      animateOpenTimerRef.current = null;
      setIsAnimatingOpenOnMount(false);
    });
    return tryClearAnimateOpenTimer;
  }, [animate, isAnimatingOpenOnMount, tryClearAnimateOpenTimer]);
  var onSizeChangeEnd = useCallback(function (event) {
    if (event.propertyName !== 'height') {
      return;
    }

    onTransitionEnd();

    if (animate === 'close') {
      onClose();
    }
  }, [animate, onClose, onTransitionEnd]);
  var style = getStyle({
    isAnimatingOpenOnMount: isAnimatingOpenOnMount,
    animate: props.animate,
    placeholder: props.placeholder
  });
  return React__default.createElement(props.placeholder.tagName, {
    style: style,
    'data-rbd-placeholder-context-id': contextId,
    onTransitionEnd: onSizeChangeEnd,
    ref: props.innerRef
  });
}

var Placeholder$1 = React__default.memo(Placeholder);

var DroppableContext = React__default.createContext(null);

var AnimateInOut = function (_React$PureComponent) {
  _inheritsLoose(AnimateInOut, _React$PureComponent);

  function AnimateInOut() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;
    _this.state = {
      isVisible: Boolean(_this.props.on),
      data: _this.props.on,
      animate: _this.props.shouldAnimate && _this.props.on ? 'open' : 'none'
    };

    _this.onClose = function () {
      if (_this.state.animate !== 'close') {
        return;
      }

      _this.setState({
        isVisible: false
      });
    };

    return _this;
  }

  AnimateInOut.getDerivedStateFromProps = function getDerivedStateFromProps(props, state) {
    if (!props.shouldAnimate) {
      return {
        isVisible: Boolean(props.on),
        data: props.on,
        animate: 'none'
      };
    }

    if (props.on) {
      return {
        isVisible: true,
        data: props.on,
        animate: 'open'
      };
    }

    if (state.isVisible) {
      return {
        isVisible: true,
        data: state.data,
        animate: 'close'
      };
    }

    return {
      isVisible: false,
      animate: 'close',
      data: null
    };
  };

  var _proto = AnimateInOut.prototype;

  _proto.render = function render() {
    if (!this.state.isVisible) {
      return null;
    }

    var provided = {
      onClose: this.onClose,
      data: this.state.data,
      animate: this.state.animate
    };
    return this.props.children(provided);
  };

  return AnimateInOut;
}(React__default.PureComponent);

var zIndexOptions = {
  dragging: 5000,
  dropAnimating: 4500
};

var getDraggingTransition = function getDraggingTransition(shouldAnimateDragMovement, dropping) {
  if (dropping) {
    return transitions.drop(dropping.duration);
  }

  if (shouldAnimateDragMovement) {
    return transitions.snap;
  }

  return transitions.fluid;
};

var getDraggingOpacity = function getDraggingOpacity(isCombining, isDropAnimating) {
  if (!isCombining) {
    return null;
  }

  return isDropAnimating ? combine.opacity.drop : combine.opacity.combining;
};

var getShouldDraggingAnimate = function getShouldDraggingAnimate(dragging) {
  if (dragging.forceShouldAnimate != null) {
    return dragging.forceShouldAnimate;
  }

  return dragging.mode === 'SNAP';
};

function getDraggingStyle(dragging) {
  var dimension = dragging.dimension;
  var box = dimension.client;
  var offset = dragging.offset,
      combineWith = dragging.combineWith,
      dropping = dragging.dropping;
  var isCombining = Boolean(combineWith);
  var shouldAnimate = getShouldDraggingAnimate(dragging);
  var isDropAnimating = Boolean(dropping);
  var transform = isDropAnimating ? transforms.drop(offset, isCombining) : transforms.moveTo(offset);
  var style = {
    position: 'fixed',
    top: box.marginBox.top,
    left: box.marginBox.left,
    boxSizing: 'border-box',
    width: box.borderBox.width,
    height: box.borderBox.height,
    transition: getDraggingTransition(shouldAnimate, dropping),
    transform: transform,
    opacity: getDraggingOpacity(isCombining, isDropAnimating),
    zIndex: isDropAnimating ? zIndexOptions.dropAnimating : zIndexOptions.dragging,
    pointerEvents: 'none'
  };
  return style;
}

function getSecondaryStyle(secondary) {
  return {
    transform: transforms.moveTo(secondary.offset),
    transition: secondary.shouldAnimateDisplacement ? null : 'none'
  };
}

function getStyle$1(mapped) {
  return mapped.type === 'DRAGGING' ? getDraggingStyle(mapped) : getSecondaryStyle(mapped);
}

function getDimension$1(descriptor, el, windowScroll) {
  if (windowScroll === void 0) {
    windowScroll = origin;
  }

  var computedStyles = window.getComputedStyle(el);
  var borderBox = el.getBoundingClientRect();
  var client = calculateBox(borderBox, computedStyles);
  var page = withScroll(client, windowScroll);
  var placeholder = {
    client: client,
    tagName: el.tagName.toLowerCase(),
    display: computedStyles.display
  };
  var displaceBy = {
    x: client.marginBox.width,
    y: client.marginBox.height
  };
  var dimension = {
    descriptor: descriptor,
    placeholder: placeholder,
    displaceBy: displaceBy,
    client: client,
    page: page
  };
  return dimension;
}

function useDraggablePublisher(args) {
  var uniqueId = useUniqueId('draggable');
  var descriptor = args.descriptor,
      registry = args.registry,
      getDraggableRef = args.getDraggableRef,
      canDragInteractiveElements = args.canDragInteractiveElements,
      shouldRespectForcePress = args.shouldRespectForcePress,
      isEnabled = args.isEnabled;
  var options = useMemo(function () {
    return {
      canDragInteractiveElements: canDragInteractiveElements,
      shouldRespectForcePress: shouldRespectForcePress,
      isEnabled: isEnabled
    };
  }, [canDragInteractiveElements, isEnabled, shouldRespectForcePress]);
  var getDimension = useCallback(function (windowScroll) {
    var el = getDraggableRef();
    !el ? invariant(false) : void 0;
    return getDimension$1(descriptor, el, windowScroll);
  }, [descriptor, getDraggableRef]);
  var entry = useMemo(function () {
    return {
      uniqueId: uniqueId,
      descriptor: descriptor,
      options: options,
      getDimension: getDimension
    };
  }, [descriptor, getDimension, options, uniqueId]);
  var publishedRef = useRef(entry);
  var isFirstPublishRef = useRef(true);
  useIsomorphicLayoutEffect(function () {
    registry.draggable.register(publishedRef.current);
    return function () {
      return registry.draggable.unregister(publishedRef.current);
    };
  }, [registry.draggable]);
  useIsomorphicLayoutEffect(function () {
    if (isFirstPublishRef.current) {
      isFirstPublishRef.current = false;
      return;
    }

    var last = publishedRef.current;
    publishedRef.current = entry;
    registry.draggable.update(entry, last);
  }, [entry, registry.draggable]);
}

function preventHtml5Dnd(event) {
  event.preventDefault();
}

function Draggable(props) {
  var ref = useRef(null);
  var setRef = useCallback(function (el) {
    ref.current = el;
  }, []);
  var getRef = useCallback(function () {
    return ref.current;
  }, []);

  var _useRequiredContext = useRequiredContext(AppContext),
      contextId = _useRequiredContext.contextId,
      dragHandleUsageInstructionsId = _useRequiredContext.dragHandleUsageInstructionsId,
      registry = _useRequiredContext.registry;

  var _useRequiredContext2 = useRequiredContext(DroppableContext),
      type = _useRequiredContext2.type,
      droppableId = _useRequiredContext2.droppableId;

  var descriptor = useMemo(function () {
    return {
      id: props.draggableId,
      index: props.index,
      type: type,
      droppableId: droppableId
    };
  }, [props.draggableId, props.index, type, droppableId]);
  var children = props.children,
      draggableId = props.draggableId,
      isEnabled = props.isEnabled,
      shouldRespectForcePress = props.shouldRespectForcePress,
      canDragInteractiveElements = props.canDragInteractiveElements,
      isClone = props.isClone,
      mapped = props.mapped,
      dropAnimationFinishedAction = props.dropAnimationFinished;

  if (!isClone) {
    var forPublisher = useMemo(function () {
      return {
        descriptor: descriptor,
        registry: registry,
        getDraggableRef: getRef,
        canDragInteractiveElements: canDragInteractiveElements,
        shouldRespectForcePress: shouldRespectForcePress,
        isEnabled: isEnabled
      };
    }, [descriptor, registry, getRef, canDragInteractiveElements, shouldRespectForcePress, isEnabled]);
    useDraggablePublisher(forPublisher);
  }

  var dragHandleProps = useMemo(function () {
    return isEnabled ? {
      tabIndex: 0,
      role: 'button',
      'aria-describedby': dragHandleUsageInstructionsId,
      'data-rbd-drag-handle-draggable-id': draggableId,
      'data-rbd-drag-handle-context-id': contextId,
      draggable: false,
      onDragStart: preventHtml5Dnd
    } : null;
  }, [contextId, dragHandleUsageInstructionsId, draggableId, isEnabled]);
  var onMoveEnd = useCallback(function (event) {
    if (mapped.type !== 'DRAGGING') {
      return;
    }

    if (!mapped.dropping) {
      return;
    }

    if (event.propertyName !== 'transform') {
      return;
    }

    dropAnimationFinishedAction();
  }, [dropAnimationFinishedAction, mapped]);
  var provided = useMemo(function () {
    var style = getStyle$1(mapped);
    var onTransitionEnd = mapped.type === 'DRAGGING' && mapped.dropping ? onMoveEnd : null;
    var result = {
      innerRef: setRef,
      draggableProps: {
        'data-rbd-draggable-context-id': contextId,
        'data-rbd-draggable-id': draggableId,
        style: style,
        onTransitionEnd: onTransitionEnd
      },
      dragHandleProps: dragHandleProps
    };
    return result;
  }, [contextId, dragHandleProps, draggableId, mapped, onMoveEnd, setRef]);
  var rubric = useMemo(function () {
    return {
      draggableId: descriptor.id,
      type: descriptor.type,
      source: {
        index: descriptor.index,
        droppableId: descriptor.droppableId
      }
    };
  }, [descriptor.droppableId, descriptor.id, descriptor.index, descriptor.type]);
  return children(provided, mapped.snapshot, rubric);
}

var isStrictEqual = (function (a, b) {
  return a === b;
});

var whatIsDraggedOverFromResult = (function (result) {
  var combine = result.combine,
      destination = result.destination;

  if (destination) {
    return destination.droppableId;
  }

  if (combine) {
    return combine.droppableId;
  }

  return null;
});

var getCombineWithFromResult = function getCombineWithFromResult(result) {
  return result.combine ? result.combine.draggableId : null;
};

var getCombineWithFromImpact = function getCombineWithFromImpact(impact) {
  return impact.at && impact.at.type === 'COMBINE' ? impact.at.combine.draggableId : null;
};

function getDraggableSelector() {
  var memoizedOffset = memoizeOne(function (x, y) {
    return {
      x: x,
      y: y
    };
  });
  var getMemoizedSnapshot = memoizeOne(function (mode, isClone, draggingOver, combineWith, dropping) {
    return {
      isDragging: true,
      isClone: isClone,
      isDropAnimating: Boolean(dropping),
      dropAnimation: dropping,
      mode: mode,
      draggingOver: draggingOver,
      combineWith: combineWith,
      combineTargetFor: null
    };
  });
  var getMemoizedProps = memoizeOne(function (offset, mode, dimension, isClone, draggingOver, combineWith, forceShouldAnimate) {
    return {
      mapped: {
        type: 'DRAGGING',
        dropping: null,
        draggingOver: draggingOver,
        combineWith: combineWith,
        mode: mode,
        offset: offset,
        dimension: dimension,
        forceShouldAnimate: forceShouldAnimate,
        snapshot: getMemoizedSnapshot(mode, isClone, draggingOver, combineWith, null)
      }
    };
  });

  var selector = function selector(state, ownProps) {
    if (state.isDragging) {
      if (state.critical.draggable.id !== ownProps.draggableId) {
        return null;
      }

      var offset = state.current.client.offset;
      var dimension = state.dimensions.draggables[ownProps.draggableId];
      var draggingOver = whatIsDraggedOver(state.impact);
      var combineWith = getCombineWithFromImpact(state.impact);
      var forceShouldAnimate = state.forceShouldAnimate;
      return getMemoizedProps(memoizedOffset(offset.x, offset.y), state.movementMode, dimension, ownProps.isClone, draggingOver, combineWith, forceShouldAnimate);
    }

    if (state.phase === 'DROP_ANIMATING') {
      var completed = state.completed;

      if (completed.result.draggableId !== ownProps.draggableId) {
        return null;
      }

      var isClone = ownProps.isClone;
      var _dimension = state.dimensions.draggables[ownProps.draggableId];
      var result = completed.result;
      var mode = result.mode;

      var _draggingOver = whatIsDraggedOverFromResult(result);

      var _combineWith = getCombineWithFromResult(result);

      var duration = state.dropDuration;
      var dropping = {
        duration: duration,
        curve: curves.drop,
        moveTo: state.newHomeClientOffset,
        opacity: _combineWith ? combine.opacity.drop : null,
        scale: _combineWith ? combine.scale.drop : null
      };
      return {
        mapped: {
          type: 'DRAGGING',
          offset: state.newHomeClientOffset,
          dimension: _dimension,
          dropping: dropping,
          draggingOver: _draggingOver,
          combineWith: _combineWith,
          mode: mode,
          forceShouldAnimate: null,
          snapshot: getMemoizedSnapshot(mode, isClone, _draggingOver, _combineWith, dropping)
        }
      };
    }

    return null;
  };

  return selector;
}

function getSecondarySnapshot(combineTargetFor) {
  return {
    isDragging: false,
    isDropAnimating: false,
    isClone: false,
    dropAnimation: null,
    mode: null,
    draggingOver: null,
    combineTargetFor: combineTargetFor,
    combineWith: null
  };
}

var atRest = {
  mapped: {
    type: 'SECONDARY',
    offset: origin,
    combineTargetFor: null,
    shouldAnimateDisplacement: true,
    snapshot: getSecondarySnapshot(null)
  }
};

function getSecondarySelector() {
  var memoizedOffset = memoizeOne(function (x, y) {
    return {
      x: x,
      y: y
    };
  });
  var getMemoizedSnapshot = memoizeOne(getSecondarySnapshot);
  var getMemoizedProps = memoizeOne(function (offset, combineTargetFor, shouldAnimateDisplacement) {
    if (combineTargetFor === void 0) {
      combineTargetFor = null;
    }

    return {
      mapped: {
        type: 'SECONDARY',
        offset: offset,
        combineTargetFor: combineTargetFor,
        shouldAnimateDisplacement: shouldAnimateDisplacement,
        snapshot: getMemoizedSnapshot(combineTargetFor)
      }
    };
  });

  var getFallback = function getFallback(combineTargetFor) {
    return combineTargetFor ? getMemoizedProps(origin, combineTargetFor, true) : null;
  };

  var getProps = function getProps(ownId, draggingId, impact, afterCritical) {
    var visualDisplacement = impact.displaced.visible[ownId];
    var isAfterCriticalInVirtualList = Boolean(afterCritical.inVirtualList && afterCritical.effected[ownId]);
    var combine = tryGetCombine(impact);
    var combineTargetFor = combine && combine.draggableId === ownId ? draggingId : null;

    if (!visualDisplacement) {
      if (!isAfterCriticalInVirtualList) {
        return getFallback(combineTargetFor);
      }

      if (impact.displaced.invisible[ownId]) {
        return null;
      }

      var change = negate(afterCritical.displacedBy.point);

      var _offset = memoizedOffset(change.x, change.y);

      return getMemoizedProps(_offset, combineTargetFor, true);
    }

    if (isAfterCriticalInVirtualList) {
      return getFallback(combineTargetFor);
    }

    var displaceBy = impact.displacedBy.point;
    var offset = memoizedOffset(displaceBy.x, displaceBy.y);
    return getMemoizedProps(offset, combineTargetFor, visualDisplacement.shouldAnimate);
  };

  var selector = function selector(state, ownProps) {
    if (state.isDragging) {
      if (state.critical.draggable.id === ownProps.draggableId) {
        return null;
      }

      return getProps(ownProps.draggableId, state.critical.draggable.id, state.impact, state.afterCritical);
    }

    if (state.phase === 'DROP_ANIMATING') {
      var completed = state.completed;

      if (completed.result.draggableId === ownProps.draggableId) {
        return null;
      }

      return getProps(ownProps.draggableId, completed.result.draggableId, completed.impact, completed.afterCritical);
    }

    return null;
  };

  return selector;
}

var makeMapStateToProps = function makeMapStateToProps() {
  var draggingSelector = getDraggableSelector();
  var secondarySelector = getSecondarySelector();

  var selector = function selector(state, ownProps) {
    return draggingSelector(state, ownProps) || secondarySelector(state, ownProps) || atRest;
  };

  return selector;
};
var mapDispatchToProps = {
  dropAnimationFinished: dropAnimationFinished
};
var ConnectedDraggable = connect(makeMapStateToProps, mapDispatchToProps, null, {
  context: StoreContext,
  pure: true,
  areStatePropsEqual: isStrictEqual
})(Draggable);

function PrivateDraggable(props) {
  var droppableContext = useRequiredContext(DroppableContext);
  var isUsingCloneFor = droppableContext.isUsingCloneFor;

  if (isUsingCloneFor === props.draggableId && !props.isClone) {
    return null;
  }

  return React__default.createElement(ConnectedDraggable, props);
}
function PublicDraggable(props) {
  var isEnabled = typeof props.isDragDisabled === 'boolean' ? !props.isDragDisabled : true;
  var canDragInteractiveElements = Boolean(props.disableInteractiveElementBlocking);
  var shouldRespectForcePress = Boolean(props.shouldRespectForcePress);
  return React__default.createElement(PrivateDraggable, _extends({}, props, {
    isClone: false,
    isEnabled: isEnabled,
    canDragInteractiveElements: canDragInteractiveElements,
    shouldRespectForcePress: shouldRespectForcePress
  }));
}

function Droppable(props) {
  var appContext = useContext(AppContext);
  !appContext ? invariant(false) : void 0;
  var contextId = appContext.contextId,
      isMovementAllowed = appContext.isMovementAllowed;
  var droppableRef = useRef(null);
  var placeholderRef = useRef(null);
  var children = props.children,
      droppableId = props.droppableId,
      type = props.type,
      mode = props.mode,
      direction = props.direction,
      ignoreContainerClipping = props.ignoreContainerClipping,
      isDropDisabled = props.isDropDisabled,
      isCombineEnabled = props.isCombineEnabled,
      snapshot = props.snapshot,
      useClone = props.useClone,
      updateViewportMaxScroll = props.updateViewportMaxScroll,
      getContainerForClone = props.getContainerForClone;
  var getDroppableRef = useCallback(function () {
    return droppableRef.current;
  }, []);
  var setDroppableRef = useCallback(function (value) {
    droppableRef.current = value;
  }, []);
  useCallback(function () {
    return placeholderRef.current;
  }, []);
  var setPlaceholderRef = useCallback(function (value) {
    placeholderRef.current = value;
  }, []);
  var onPlaceholderTransitionEnd = useCallback(function () {
    if (isMovementAllowed()) {
      updateViewportMaxScroll({
        maxScroll: getMaxWindowScroll()
      });
    }
  }, [isMovementAllowed, updateViewportMaxScroll]);
  useDroppablePublisher({
    droppableId: droppableId,
    type: type,
    mode: mode,
    direction: direction,
    isDropDisabled: isDropDisabled,
    isCombineEnabled: isCombineEnabled,
    ignoreContainerClipping: ignoreContainerClipping,
    getDroppableRef: getDroppableRef
  });
  var placeholder = React__default.createElement(AnimateInOut, {
    on: props.placeholder,
    shouldAnimate: props.shouldAnimatePlaceholder
  }, function (_ref) {
    var onClose = _ref.onClose,
        data = _ref.data,
        animate = _ref.animate;
    return React__default.createElement(Placeholder$1, {
      placeholder: data,
      onClose: onClose,
      innerRef: setPlaceholderRef,
      animate: animate,
      contextId: contextId,
      onTransitionEnd: onPlaceholderTransitionEnd
    });
  });
  var provided = useMemo(function () {
    return {
      innerRef: setDroppableRef,
      placeholder: placeholder,
      droppableProps: {
        'data-rbd-droppable-id': droppableId,
        'data-rbd-droppable-context-id': contextId
      }
    };
  }, [contextId, droppableId, placeholder, setDroppableRef]);
  var isUsingCloneFor = useClone ? useClone.dragging.draggableId : null;
  var droppableContext = useMemo(function () {
    return {
      droppableId: droppableId,
      type: type,
      isUsingCloneFor: isUsingCloneFor
    };
  }, [droppableId, isUsingCloneFor, type]);

  function getClone() {
    if (!useClone) {
      return null;
    }

    var dragging = useClone.dragging,
        render = useClone.render;
    var node = React__default.createElement(PrivateDraggable, {
      draggableId: dragging.draggableId,
      index: dragging.source.index,
      isClone: true,
      isEnabled: true,
      shouldRespectForcePress: false,
      canDragInteractiveElements: true
    }, function (draggableProvided, draggableSnapshot) {
      return render(draggableProvided, draggableSnapshot, dragging);
    });
    return ReactDOM.createPortal(node, getContainerForClone());
  }

  return React__default.createElement(DroppableContext.Provider, {
    value: droppableContext
  }, children(provided, snapshot), getClone());
}

var isMatchingType = function isMatchingType(type, critical) {
  return type === critical.droppable.type;
};

var getDraggable = function getDraggable(critical, dimensions) {
  return dimensions.draggables[critical.draggable.id];
};

var makeMapStateToProps$1 = function makeMapStateToProps() {
  var idleWithAnimation = {
    placeholder: null,
    shouldAnimatePlaceholder: true,
    snapshot: {
      isDraggingOver: false,
      draggingOverWith: null,
      draggingFromThisWith: null,
      isUsingPlaceholder: false
    },
    useClone: null
  };

  var idleWithoutAnimation = _extends({}, idleWithAnimation, {
    shouldAnimatePlaceholder: false
  });

  var getDraggableRubric = memoizeOne(function (descriptor) {
    return {
      draggableId: descriptor.id,
      type: descriptor.type,
      source: {
        index: descriptor.index,
        droppableId: descriptor.droppableId
      }
    };
  });
  var getMapProps = memoizeOne(function (id, isEnabled, isDraggingOverForConsumer, isDraggingOverForImpact, dragging, renderClone) {
    var draggableId = dragging.descriptor.id;
    var isHome = dragging.descriptor.droppableId === id;

    if (isHome) {
      var useClone = renderClone ? {
        render: renderClone,
        dragging: getDraggableRubric(dragging.descriptor)
      } : null;
      var _snapshot = {
        isDraggingOver: isDraggingOverForConsumer,
        draggingOverWith: isDraggingOverForConsumer ? draggableId : null,
        draggingFromThisWith: draggableId,
        isUsingPlaceholder: true
      };
      return {
        placeholder: dragging.placeholder,
        shouldAnimatePlaceholder: false,
        snapshot: _snapshot,
        useClone: useClone
      };
    }

    if (!isEnabled) {
      return idleWithoutAnimation;
    }

    if (!isDraggingOverForImpact) {
      return idleWithAnimation;
    }

    var snapshot = {
      isDraggingOver: isDraggingOverForConsumer,
      draggingOverWith: draggableId,
      draggingFromThisWith: null,
      isUsingPlaceholder: true
    };
    return {
      placeholder: dragging.placeholder,
      shouldAnimatePlaceholder: true,
      snapshot: snapshot,
      useClone: null
    };
  });

  var selector = function selector(state, ownProps) {
    var id = ownProps.droppableId;
    var type = ownProps.type;
    var isEnabled = !ownProps.isDropDisabled;
    var renderClone = ownProps.renderClone;

    if (state.isDragging) {
      var critical = state.critical;

      if (!isMatchingType(type, critical)) {
        return idleWithoutAnimation;
      }

      var dragging = getDraggable(critical, state.dimensions);
      var isDraggingOver = whatIsDraggedOver(state.impact) === id;
      return getMapProps(id, isEnabled, isDraggingOver, isDraggingOver, dragging, renderClone);
    }

    if (state.phase === 'DROP_ANIMATING') {
      var completed = state.completed;

      if (!isMatchingType(type, completed.critical)) {
        return idleWithoutAnimation;
      }

      var _dragging = getDraggable(completed.critical, state.dimensions);

      return getMapProps(id, isEnabled, whatIsDraggedOverFromResult(completed.result) === id, whatIsDraggedOver(completed.impact) === id, _dragging, renderClone);
    }

    if (state.phase === 'IDLE' && state.completed && !state.shouldFlush) {
      var _completed = state.completed;

      if (!isMatchingType(type, _completed.critical)) {
        return idleWithoutAnimation;
      }

      var wasOver = whatIsDraggedOver(_completed.impact) === id;
      var wasCombining = Boolean(_completed.impact.at && _completed.impact.at.type === 'COMBINE');
      var isHome = _completed.critical.droppable.id === id;

      if (wasOver) {
        return wasCombining ? idleWithAnimation : idleWithoutAnimation;
      }

      if (isHome) {
        return idleWithAnimation;
      }

      return idleWithoutAnimation;
    }

    return idleWithoutAnimation;
  };

  return selector;
};
var mapDispatchToProps$1 = {
  updateViewportMaxScroll: updateViewportMaxScroll
};

function getBody() {
  !document.body ? invariant(false) : void 0;
  return document.body;
}

var defaultProps = {
  mode: 'standard',
  type: 'DEFAULT',
  direction: 'vertical',
  isDropDisabled: false,
  isCombineEnabled: false,
  ignoreContainerClipping: false,
  renderClone: null,
  getContainerForClone: getBody
};
var ConnectedDroppable = connect(makeMapStateToProps$1, mapDispatchToProps$1, null, {
  context: StoreContext,
  pure: true,
  areStatePropsEqual: isStrictEqual
})(Droppable);
ConnectedDroppable.defaultProps = defaultProps;

/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
function useActiveSiteId() {
  return useSelector((state) => state.sites.active);
}

/** Local copy of Studio ItemDisplay state helpers (avoid broken `craftercms.components.utils` external). */
function getItemStateId(stateMap) {
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
function isInWorkflow(stateMap) {
    return stateMap
        ? Boolean(stateMap.deleted ||
            stateMap.disabled ||
            stateMap.systemProcessing ||
            stateMap.locked ||
            stateMap.submittedToLive ||
            stateMap.submittedToStaging ||
            stateMap.submitted ||
            stateMap.scheduled ||
            stateMap.new ||
            stateMap.modified ||
            stateMap.publishing)
        : false;
}

var WORKFLOW_STATE_LABELS = {
    new: 'New',
    modified: 'Modified',
    deleted: 'Deleted',
    locked: 'Locked',
    systemProcessing: 'System Processing',
    submitted: 'Submitted',
    scheduled: 'Scheduled',
    publishing: 'Publishing',
    submittedToStaging: 'Submitted to staging',
    submittedToLive: 'Submitted to live',
    disabled: 'Disabled'
};
/** Plain-text workflow/publishing state for attachment rows (matches Studio item navigator). */
function getSandboxItemStateLabel(item) {
    var _a, _b;
    if (!(item === null || item === void 0 ? void 0 : item.stateMap)) {
        return '';
    }
    if (!isInWorkflow(item.stateMap)) {
        if (item.stateMap.live) {
            return 'Live';
        }
        if (item.stateMap.staged) {
            return 'Staged';
        }
        return 'Unpublished';
    }
    var stateId = getItemStateId(item.stateMap);
    if (!stateId) {
        return 'Not in workflow';
    }
    if (stateId === 'locked' && ((_a = item.lockOwner) === null || _a === void 0 ? void 0 : _a.username)) {
        return "Locked by ".concat(item.lockOwner.username);
    }
    return (_b = WORKFLOW_STATE_LABELS[stateId]) !== null && _b !== void 0 ? _b : 'Not in workflow';
}

var rowSx = { display: 'flex', alignItems: 'center', gap: 0.75, minWidth: 0 };
var iconWrapSx = { display: 'inline-flex', alignItems: 'center', flexShrink: 0, '& .MuiSvgIcon-root': { fontSize: '1.1rem' } };
var AttachedSandboxItemDisplay = function (_a) {
    var item = _a.item, label = _a.label, onClick = _a.onClick;
    var inWorkflow = isInWorkflow(item.stateMap) || item.systemType === 'folder';
    var stateLabel = getSandboxItemStateLabel(item);
    return (React.createElement(Box, { sx: { minWidth: 0, py: 0.25 } },
        React.createElement(Box, { sx: rowSx },
            React.createElement(Box, { sx: iconWrapSx },
                React.createElement(ItemTypeIcon, { item: item, fontSize: "small" })),
            React.createElement(Typography, { variant: "body2", noWrap: true, onClick: onClick, sx: function (theme) { return ({
                    minWidth: 0,
                    flex: 1,
                    cursor: onClick ? 'pointer' : 'default',
                    color: onClick
                        ? theme.palette.mode === 'dark'
                            ? theme.palette.primary.light
                            : theme.palette.primary.main
                        : 'text.primary',
                    '&:hover': onClick ? { textDecoration: 'underline' } : undefined
                }); } }, label)),
        stateLabel ? (React.createElement(Box, { sx: __assign(__assign({}, rowSx), { pl: 0.25, mt: 0.25 }) },
            React.createElement(Box, { sx: iconWrapSx }, inWorkflow ? (React.createElement(ItemStateIcon, { item: item, fontSize: "small", displayTooltip: false })) : (React.createElement(ItemPublishingTargetIcon, { item: item, fontSize: "small", displayTooltip: false }))),
            React.createElement(Typography, { variant: "body2", color: "text.secondary", noWrap: true, sx: { minWidth: 0, flex: 1 } }, stateLabel))) : null));
};

function extractMentionedUserIds(body, users) {
    if (!(body === null || body === void 0 ? void 0 : body.trim()) || !users.length) {
        return [];
    }
    var ids = new Set();
    users.forEach(function (user) {
        var escaped = user.username.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        var pattern = new RegExp("(?<![\\w.@])@".concat(escaped, "(?![\\w.\\-])"), 'i');
        if (pattern.test(body)) {
            ids.add(user.id);
        }
    });
    return Array.from(ids);
}

function userInitials(user) {
    var _a, _b, _c;
    var first = (_a = user.firstName) === null || _a === void 0 ? void 0 : _a.trim();
    var last = (_b = user.lastName) === null || _b === void 0 ? void 0 : _b.trim();
    if (first && last) {
        return "".concat(first.charAt(0)).concat(last.charAt(0)).toUpperCase();
    }
    if (first) {
        return first.slice(0, 2).toUpperCase();
    }
    var username = (_c = user.username) === null || _c === void 0 ? void 0 : _c.trim();
    return username ? username.slice(0, 2).toUpperCase() : '?';
}
function UserInitialsAvatar(_a) {
    var user = _a.user, _b = _a.size, size = _b === void 0 ? 24 : _b;
    return (React.createElement(Avatar, { sx: {
            width: size,
            height: size,
            fontSize: Math.max(10, Math.round(size * 0.42))
        } }, userInitials(user)));
}
function userLabel(user) {
    var name = [user.firstName, user.lastName].filter(Boolean).join(' ').trim();
    return name ? "".concat(name, " (").concat(user.username, ")") : user.username;
}
function findAssigneeOption(options, id, username) {
    var _a;
    return (_a = options.find(function (option) { return option.id === id; })) !== null && _a !== void 0 ? _a : options.find(function (option) { return option.username === username; });
}
function resolveAssigneeLabel(assigneeId, assigneeUsername, options) {
    var option = findAssigneeOption(options, assigneeId, assigneeUsername);
    if (option) {
        return option.label;
    }
    return assigneeUsername || "User #".concat(assigneeId);
}
function UserAvatarLabel(_a) {
    var user = _a.user, label = _a.label, _b = _a.size, size = _b === void 0 ? 24 : _b, _c = _a.typographyVariant, typographyVariant = _c === void 0 ? 'body2' : _c, fontWeight = _a.fontWeight;
    var display = label !== null && label !== void 0 ? label : userLabel(user);
    return (React.createElement(Stack, { direction: "row", spacing: 0.75, alignItems: "center", sx: { minWidth: 0 } },
        React.createElement(UserInitialsAvatar, { user: user, size: size }),
        React.createElement(Typography, { variant: typographyVariant, fontWeight: fontWeight, noWrap: true, sx: { minWidth: 0 } }, display)));
}
function AssigneeMenuItem(_a) {
    var option = _a.option;
    return (React.createElement(MenuItem, { value: option.id },
        React.createElement(UserAvatarLabel, { user: option, label: option.label, size: 22, typographyVariant: "body2" })));
}
function UserAvatarFromUsername(_a) {
    var username = _a.username, label = _a.label, _b = _a.size, size = _b === void 0 ? 22 : _b;
    return React.createElement(UserAvatarLabel, { user: { username: username }, label: label !== null && label !== void 0 ? label : username, size: size, typographyVariant: "caption" });
}

function formatCommentDate(value) {
    if (!value) {
        return '';
    }
    var date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return value;
    }
    return date.toLocaleString();
}
function getMentionQuery(text, cursor) {
    var before = text.slice(0, cursor);
    var match = /(?:^|[\s([{])@([\w.\-]*)$/.exec(before);
    if (!match) {
        return null;
    }
    return match[1];
}
var CommentsSection = function (_a) {
    var comments = _a.comments, onAddComment = _a.onAddComment, onResolveComment = _a.onResolveComment, onArchiveComment = _a.onArchiveComment, _b = _a.showArchived, showArchived = _b === void 0 ? false : _b, onShowArchivedChange = _a.onShowArchivedChange, _c = _a.compact, compact = _c === void 0 ? false : _c, mentionUsersProp = _a.mentionUsers;
    var _d = useState(''), commentDraft = _d[0], setCommentDraft = _d[1];
    var _e = useState(mentionUsersProp !== null && mentionUsersProp !== void 0 ? mentionUsersProp : []), mentionUsers = _e[0], setMentionUsers = _e[1];
    var _f = useState(false), mentionOpen = _f[0], setMentionOpen = _f[1];
    var _g = useState(''), mentionQuery = _g[0], setMentionQuery = _g[1];
    var _h = useState(0), cursorPosition = _h[0], setCursorPosition = _h[1];
    var inputRef = useRef(null);
    var mentionAnchorRef = useRef(null);
    useEffect(function () {
        if (mentionUsersProp) {
            setMentionUsers(mentionUsersProp);
            return;
        }
        if (!onAddComment) {
            return;
        }
        fetchAll({ limit: 500, offset: 0 }).subscribe({
            next: function (users) {
                var options = (users !== null && users !== void 0 ? users : [])
                    .filter(function (user) { return user.enabled !== false; })
                    .map(function (user) { return ({
                    id: user.id,
                    username: user.username,
                    label: userLabel(user)
                }); });
                setMentionUsers(options);
            },
            error: function (e) {
                console.error(e);
            }
        });
    }, [mentionUsersProp, onAddComment]);
    var filteredMentionUsers = useMemo$1(function () {
        var q = mentionQuery.toLowerCase();
        return mentionUsers
            .filter(function (user) {
            return !q ||
                user.username.toLowerCase().includes(q) ||
                user.label.toLowerCase().includes(q);
        })
            .slice(0, 8);
    }, [mentionQuery, mentionUsers]);
    var syncMentionState = useCallback$1(function (text, cursor) {
        setCursorPosition(cursor);
        var query = getMentionQuery(text, cursor);
        if (query != null && mentionUsers.length > 0) {
            setMentionQuery(query);
            setMentionOpen(true);
        }
        else {
            setMentionOpen(false);
            setMentionQuery('');
        }
    }, [mentionUsers.length]);
    var insertMention = function (username) {
        var text = commentDraft;
        var cursor = cursorPosition;
        var before = text.slice(0, cursor);
        var after = text.slice(cursor);
        var atIndex = before.lastIndexOf('@');
        if (atIndex < 0) {
            return;
        }
        var fragment = before.slice(atIndex);
        if (!/^@[\w.\-]*$/.test(fragment)) {
            return;
        }
        var prefix = before.slice(0, atIndex);
        var insertion = "@".concat(username, " ");
        var next = "".concat(prefix).concat(insertion).concat(after);
        setCommentDraft(next);
        setMentionOpen(false);
        setMentionQuery('');
        var nextCursor = prefix.length + insertion.length;
        window.requestAnimationFrame(function () {
            var el = inputRef.current;
            if (el) {
                el.focus();
                el.setSelectionRange(nextCursor, nextCursor);
            }
        });
    };
    var handleSubmitComment = function () {
        var body = commentDraft.trim();
        if (!body || !onAddComment) {
            return;
        }
        onAddComment(body, extractMentionedUserIds(body, mentionUsers));
        setCommentDraft('');
        setMentionOpen(false);
    };
    var visibleComments = comments;
    var showArchivedToggle = Boolean(onShowArchivedChange);
    return (React.createElement(Stack, { spacing: compact ? 0.75 : 1 },
        visibleComments.length === 0 ? (React.createElement(Typography, { variant: "body2", color: "text.secondary", sx: { py: 0.5 } }, showArchived && showArchivedToggle ? 'No comments (including archived).' : 'No comments yet.')) : (React.createElement(Stack, { spacing: 0.75 }, visibleComments.map(function (comment) { return (React.createElement(Box, { key: comment.id, sx: {
                p: 1,
                borderRadius: 1,
                bgcolor: comment.archived
                    ? 'action.disabledBackground'
                    : comment.resolved
                        ? 'action.selected'
                        : 'action.hover',
                opacity: comment.archived || comment.resolved ? 0.85 : 1,
                minWidth: 0
            } },
            React.createElement(Stack, { direction: "row", spacing: 0.75, alignItems: "center", flexWrap: "wrap", sx: { mb: 0.5 } },
                React.createElement(UserAvatarFromUsername, { username: comment.authorUsername || (comment.authorId ? "user-".concat(comment.authorId) : 'unknown'), label: comment.authorUsername || (comment.authorId ? "User #".concat(comment.authorId) : 'Unknown'), size: 22 }),
                comment.resolved && (React.createElement(Chip, { label: "Resolved", size: "small", color: "success", variant: "outlined", sx: { height: 20, fontSize: '0.65rem' } })),
                comment.archived && (React.createElement(Chip, { label: "Archived", size: "small", color: "default", variant: "outlined", sx: { height: 20, fontSize: '0.65rem' } })),
                React.createElement(Typography, { variant: "caption", color: "text.secondary", sx: { ml: 'auto' } }, formatCommentDate(comment.createdOn))),
            React.createElement(Typography, { variant: "body2", sx: { whiteSpace: 'pre-wrap', wordBreak: 'break-word' } }, comment.body),
            (onResolveComment || onArchiveComment) && !comment.archived && (React.createElement(Stack, { direction: "row", spacing: 1, sx: { mt: 0.75 } },
                onResolveComment && (React.createElement(Button, { size: "small", sx: { px: 0, minWidth: 0 }, onClick: function () { return onResolveComment(comment.id, !comment.resolved); } }, comment.resolved ? 'Reopen' : 'Resolve')),
                onArchiveComment && (React.createElement(Button, { size: "small", sx: { px: 0, minWidth: 0 }, onClick: function () { return onArchiveComment(comment.id, true); } }, "Archive")))),
            onArchiveComment && comment.archived && (React.createElement(Button, { size: "small", sx: { mt: 0.75, px: 0, minWidth: 0 }, onClick: function () { return onArchiveComment(comment.id, false); } }, "Restore")))); }))),
        showArchivedToggle && (React.createElement(Button, { size: "small", sx: { alignSelf: 'flex-start', px: 0, minWidth: 0 }, onClick: function () { return onShowArchivedChange === null || onShowArchivedChange === void 0 ? void 0 : onShowArchivedChange(!showArchived); } }, showArchived ? 'Hide archived' : 'Show archived')),
        onAddComment && (React.createElement(Box, { ref: mentionAnchorRef, sx: { position: 'relative', pt: 0.5 } },
            React.createElement(TextField, { inputRef: inputRef, multiline: true, minRows: compact ? 2 : 2, maxRows: 6, size: "small", placeholder: "Add a comment\u2026 Use @ to mention someone", value: commentDraft, onChange: function (event) {
                    var _a;
                    var next = event.target.value;
                    setCommentDraft(next);
                    syncMentionState(next, (_a = event.target.selectionStart) !== null && _a !== void 0 ? _a : next.length);
                }, onClick: function () {
                    var _a;
                    var target = inputRef.current;
                    if (target) {
                        syncMentionState(commentDraft, (_a = target.selectionStart) !== null && _a !== void 0 ? _a : 0);
                    }
                }, onKeyUp: function () {
                    var _a;
                    var target = inputRef.current;
                    if (target) {
                        syncMentionState(commentDraft, (_a = target.selectionStart) !== null && _a !== void 0 ? _a : 0);
                    }
                }, onKeyDown: function (event) {
                    if (mentionOpen && filteredMentionUsers.length > 0) {
                        if (event.key === 'Tab') {
                            event.preventDefault();
                            insertMention(filteredMentionUsers[0].username);
                            return;
                        }
                        if (event.key === 'Enter' && !event.shiftKey && getMentionQuery(commentDraft, cursorPosition) != null) {
                            event.preventDefault();
                            insertMention(filteredMentionUsers[0].username);
                            return;
                        }
                    }
                    if (event.key === 'Enter' && !event.shiftKey) {
                        event.preventDefault();
                        handleSubmitComment();
                    }
                    if (event.key === 'Escape' && mentionOpen) {
                        event.preventDefault();
                        setMentionOpen(false);
                    }
                }, fullWidth: true, sx: {
                    '& .MuiInputBase-root': {
                        alignItems: 'flex-end',
                        pr: 0.5,
                        pb: 0.5
                    },
                    '& .MuiInputBase-inputMultiline': {
                        pr: 4
                    }
                } }),
            React.createElement(Popper, { open: mentionOpen && filteredMentionUsers.length > 0, anchorEl: mentionAnchorRef.current, placement: "top-start", sx: { zIndex: function (theme) { return theme.zIndex.modal + 2; } } },
                React.createElement(Paper, { elevation: 4, sx: { maxHeight: 200, overflow: 'auto', minWidth: 220 } },
                    React.createElement(List, { dense: true, disablePadding: true }, filteredMentionUsers.map(function (user) { return (React.createElement(ListItemButton, { key: user.id, onMouseDown: function (event) {
                            event.preventDefault();
                            insertMention(user.username);
                        } },
                        React.createElement(UserAvatarLabel, { user: user, label: user.label, size: 22, typographyVariant: "body2" }))); })))),
            React.createElement(IconButton, { size: "small", color: "primary", disabled: !commentDraft.trim(), onClick: handleSubmitComment, "aria-label": "Send comment", sx: {
                    position: 'absolute',
                    right: 6,
                    bottom: 6
                } },
                React.createElement(SendRoundedIcon, { fontSize: "small" }))))));
};

/** Read-only plugin REST endpoints (GET). */
function pluginGet(url) {
    return get(url);
}
/** State-changing plugin REST endpoints (POST). Query parameters stay on the URL. */
function pluginPost(url) {
    return post(url, {});
}
/** Destructive plugin REST endpoints (DELETE). Query parameters stay on the URL. */
function pluginDelete(url) {
    return del(url);
}

var CRAFTERWF_PLUGIN_ID = 'org.rd.plugin.crafterwf';
var CRAFTERWF_APP_NAME = 'crafterwf';
var CRAFTERWF_APP_FILE = 'index.js';
function resolveActiveSiteId(explicit) {
    var _a, _b, _c, _d;
    if (explicit === null || explicit === void 0 ? void 0 : explicit.trim()) {
        return explicit.trim();
    }
    if (typeof window === 'undefined') {
        return '';
    }
    var params = new URLSearchParams(window.location.search);
    var fromQuery = params.get('site') || params.get('crafterSite');
    if (fromQuery) {
        return fromQuery;
    }
    var hashMatch = window.location.hash.match(/[?&]site=([^&]+)/);
    if (hashMatch === null || hashMatch === void 0 ? void 0 : hashMatch[1]) {
        return decodeURIComponent(hashMatch[1]);
    }
    var state = (_c = (_b = (_a = window.craftercms) === null || _a === void 0 ? void 0 : _a.store) === null || _b === void 0 ? void 0 : _b.getState) === null || _c === void 0 ? void 0 : _c.call(_b);
    return (_d = state === null || state === void 0 ? void 0 : state.activeSite) !== null && _d !== void 0 ? _d : '';
}
function createCrafterwfPluginBinding(siteId) {
    var _a, _b;
    var craftercms = window.craftercms;
    var createFileBuilder = (_b = (_a = craftercms === null || craftercms === void 0 ? void 0 : craftercms.utils) === null || _a === void 0 ? void 0 : _a.state) === null || _b === void 0 ? void 0 : _b.createFileBuilder;
    if (!createFileBuilder || !siteId) {
        return undefined;
    }
    return createFileBuilder(siteId, 'apps', CRAFTERWF_APP_NAME, CRAFTERWF_APP_FILE, CRAFTERWF_PLUGIN_ID);
}
function createCrafterwfWidgetDescriptor(widgetId, siteId) {
    var _a, _b;
    var craftercms = window
        .craftercms;
    var createWidgetDescriptor = (_b = (_a = craftercms === null || craftercms === void 0 ? void 0 : craftercms.utils) === null || _a === void 0 ? void 0 : _a.state) === null || _b === void 0 ? void 0 : _b.createWidgetDescriptor;
    if (!createWidgetDescriptor) {
        return { id: widgetId };
    }
    var resolvedSiteId = resolveActiveSiteId(siteId);
    var plugin = resolvedSiteId ? createCrafterwfPluginBinding(resolvedSiteId) : undefined;
    return createWidgetDescriptor(plugin ? { id: widgetId, plugin: plugin } : { id: widgetId });
}

var WORKFLOW_BOARD_WIDGET_ID = 'org.rd.plugin.crafterwf.board';
/** Resolve at runtime — avoids bundling studio-ui dialog actions into the plugin. */
function showWidgetDialogAction$1() {
    var craftercms = window.craftercms;
    return craftercms.libs.ReduxToolkit.createAction('SHOW_WIDGET_DIALOG');
}
function openWorkflowBoard(dispatch, workflowTitle, options, siteId) {
    dispatch(showWidgetDialogAction$1()({
        title: workflowTitle,
        extraProps: __assign({ workflowId: options.workflowId }, (options.openPackageId ? { openPackageId: options.openPackageId } : {})),
        widget: createCrafterwfWidgetDescriptor(WORKFLOW_BOARD_WIDGET_ID, siteId)
    }));
}

/** Soft backgrounds for the kanban board canvas */
var BOARD_BACKGROUND_SWATCHES = [
    { id: 'mist', hex: '#E8EEF4', label: 'Mist' },
    { id: 'cloud', hex: '#F0F4F8', label: 'Cloud' },
    { id: 'paper', hex: '#FAFAF9', label: 'Paper' },
    { id: 'snow', hex: '#F8FAFC', label: 'Snow' },
    { id: 'sky', hex: '#E0F2FE', label: 'Sky' },
    { id: 'ice', hex: '#F0F9FF', label: 'Ice' },
    { id: 'aqua', hex: '#ECFEFF', label: 'Aqua' },
    { id: 'mint', hex: '#D1FAE5', label: 'Mint' },
    { id: 'sage', hex: '#ECFDF5', label: 'Sage' },
    { id: 'fern', hex: '#DCFCE7', label: 'Fern' },
    { id: 'lavender', hex: '#EDE9FE', label: 'Lavender' },
    { id: 'lilac', hex: '#F5F3FF', label: 'Lilac' },
    { id: 'violet', hex: '#F3E8FF', label: 'Violet' },
    { id: 'blush', hex: '#FAE8FF', label: 'Blush' },
    { id: 'peach', hex: '#FFEDD5', label: 'Peach' },
    { id: 'apricot', hex: '#FFF7ED', label: 'Apricot' },
    { id: 'rose', hex: '#FFE4E6', label: 'Rose' },
    { id: 'coral', hex: '#FFF1F2', label: 'Coral' },
    { id: 'sand', hex: '#FEF3C7', label: 'Sand' },
    { id: 'honey', hex: '#FEF9C3', label: 'Honey' },
    { id: 'slate', hex: '#F1F5F9', label: 'Slate' },
    { id: 'stone', hex: '#F5F5F4', label: 'Stone' },
    { id: 'neutral', hex: '#F4F4F5', label: 'Neutral' },
    { id: 'dusk', hex: '#E2E8F0', label: 'Dusk' },
    { id: 'ocean', hex: '#DBEAFE', label: 'Ocean' },
    { id: 'seafoam', hex: '#CCFBF1', label: 'Seafoam' },
    { id: 'orchid', hex: '#DDD6FE', label: 'Orchid' },
    { id: 'linen', hex: '#FAF5FF', label: 'Linen' }
];
/** Accent colors for workflow steps (left rail stripe) */
var STEP_COLOR_SWATCHES = [
    { id: 'blue', hex: '#2563EB', label: 'Blue' },
    { id: 'teal', hex: '#0D9488', label: 'Teal' },
    { id: 'green', hex: '#16A34A', label: 'Green' },
    { id: 'lime', hex: '#65A30D', label: 'Lime' },
    { id: 'amber', hex: '#D97706', label: 'Amber' },
    { id: 'orange', hex: '#EA580C', label: 'Orange' },
    { id: 'red', hex: '#DC2626', label: 'Red' },
    { id: 'pink', hex: '#DB2777', label: 'Pink' },
    { id: 'purple', hex: '#9333EA', label: 'Purple' },
    { id: 'indigo', hex: '#4F46E5', label: 'Indigo' },
    { id: 'cyan', hex: '#0891B2', label: 'Cyan' },
    { id: 'graphite', hex: '#475569', label: 'Graphite' }
];
var LEGACY_STEP_HEX = {
    black: '#475569',
    blue: '#2563EB',
    green: '#16A34A',
    lime: '#65A30D',
    orange: '#EA580C',
    pink: '#DB2777',
    purple: '#9333EA',
    red: '#DC2626',
    sky: '#0891B2',
    yellow: '#D97706'
};
var swatchById = function (swatches) {
    return swatches.reduce(function (acc, swatch) {
        acc[swatch.id] = swatch;
        return acc;
    }, {});
};
var BOARD_BY_ID = swatchById(BOARD_BACKGROUND_SWATCHES);
var STEP_BY_ID = swatchById(STEP_COLOR_SWATCHES);
function isCssColor(value) {
    return value.startsWith('#') || /^rgba?\(/i.test(value) || /^hsla?\(/i.test(value);
}
function isHttpUrl(value) {
    return /^https?:\/\//i.test(value);
}
function resolveBoardBackgroundColor(value) {
    var _a, _b, _c;
    var fallback = BOARD_BACKGROUND_SWATCHES[0].hex;
    if (!(value === null || value === void 0 ? void 0 : value.trim())) {
        return fallback;
    }
    var trimmed = value.trim();
    if (isCssColor(trimmed)) {
        return trimmed;
    }
    if (isHttpUrl(trimmed)) {
        return fallback;
    }
    return (_c = (_b = (_a = BOARD_BY_ID[trimmed]) === null || _a === void 0 ? void 0 : _a.hex) !== null && _b !== void 0 ? _b : LEGACY_STEP_HEX[trimmed.toLowerCase()]) !== null && _c !== void 0 ? _c : fallback;
}
function resolveStepColor(value) {
    var _a, _b, _c;
    var fallback = STEP_COLOR_SWATCHES[0].hex;
    if (!(value === null || value === void 0 ? void 0 : value.trim())) {
        return fallback;
    }
    var trimmed = value.trim();
    if (isCssColor(trimmed)) {
        return trimmed;
    }
    return (_c = (_b = (_a = STEP_BY_ID[trimmed]) === null || _a === void 0 ? void 0 : _a.hex) !== null && _b !== void 0 ? _b : LEGACY_STEP_HEX[trimmed.toLowerCase()]) !== null && _c !== void 0 ? _c : fallback;
}
function normalizeBoardBackgroundId(value) {
    var _a;
    if (!(value === null || value === void 0 ? void 0 : value.trim()) || isHttpUrl(value.trim())) {
        return BOARD_BACKGROUND_SWATCHES[0].id;
    }
    var trimmed = value.trim();
    if (BOARD_BY_ID[trimmed]) {
        return trimmed;
    }
    if (isCssColor(trimmed)) {
        var match = BOARD_BACKGROUND_SWATCHES.find(function (s) { return s.hex.toLowerCase() === trimmed.toLowerCase(); });
        return (_a = match === null || match === void 0 ? void 0 : match.id) !== null && _a !== void 0 ? _a : BOARD_BACKGROUND_SWATCHES[0].id;
    }
    return BOARD_BACKGROUND_SWATCHES[0].id;
}
function normalizeStepColorId(value) {
    var _a, _b;
    if (!(value === null || value === void 0 ? void 0 : value.trim())) {
        return STEP_COLOR_SWATCHES[0].id;
    }
    var trimmed = value.trim();
    if (STEP_BY_ID[trimmed]) {
        return trimmed;
    }
    if (LEGACY_STEP_HEX[trimmed.toLowerCase()]) {
        var legacy_1 = trimmed.toLowerCase();
        var match = STEP_COLOR_SWATCHES.find(function (s) { return s.id === legacy_1; });
        if (match) {
            return match.id;
        }
        var byHex = STEP_COLOR_SWATCHES.find(function (s) { return s.hex === LEGACY_STEP_HEX[legacy_1]; });
        return (_a = byHex === null || byHex === void 0 ? void 0 : byHex.id) !== null && _a !== void 0 ? _a : STEP_COLOR_SWATCHES[0].id;
    }
    if (isCssColor(trimmed)) {
        var match = STEP_COLOR_SWATCHES.find(function (s) { return s.hex.toLowerCase() === trimmed.toLowerCase(); });
        return (_b = match === null || match === void 0 ? void 0 : match.id) !== null && _b !== void 0 ? _b : STEP_COLOR_SWATCHES[0].id;
    }
    return STEP_COLOR_SWATCHES[0].id;
}
/** @deprecated use STEP_COLOR_SWATCHES */
STEP_COLOR_SWATCHES.map(function (s) { return s.id; });

var STEP_ACTION_NONE = 'none';
/** Sentinel for "no success step" in the workflow editor Select (MUI needs a non-empty value). */
var SUCCESS_STEP_NONE = '__none__';
var PUBLISH_ACTION_OPTIONS = [
    { value: 'request_publish_staging', label: 'Request publish to staging', requiresStaging: true },
    { value: 'request_publish_live', label: 'Request publish to live' },
    { value: 'publish_staging', label: 'Publish to staging', requiresStaging: true },
    { value: 'publish_live', label: 'Publish to live' }
];
var STEP_ACTION_OPTIONS = __spreadArray([
    { value: 'none', label: 'None' }
], PUBLISH_ACTION_OPTIONS, true);
function normalizeStepActionType(value) {
    var type = typeof value === 'string' ? value.trim() : '';
    if (STEP_ACTION_OPTIONS.some(function (option) { return option.value === type && option.value !== 'none'; })) {
        return type;
    }
    return 'none';
}
function stepActionTypeFromLegacy(step) {
    if (step.actionRequestPublishStaging) {
        return 'request_publish_staging';
    }
    if (step.actionRequestPublishLive) {
        return 'request_publish_live';
    }
    if (step.actionPublishStaging) {
        return 'publish_staging';
    }
    if (step.actionPublishLive) {
        return 'publish_live';
    }
    return 'none';
}
function hasPublishStepAction(actionType) {
    return normalizeStepActionType(actionType) !== 'none';
}
function getStepActionLabel(actionType) {
    var _a, _b;
    var normalized = normalizeStepActionType(actionType);
    if (normalized === 'none') {
        return null;
    }
    return (_b = (_a = PUBLISH_ACTION_OPTIONS.find(function (option) { return option.value === normalized; })) === null || _a === void 0 ? void 0 : _a.label) !== null && _b !== void 0 ? _b : normalized;
}
/** Human-readable labels for automatic actions configured on a step (one per step today). */
function getStepActionDescriptions(actionType) {
    var label = getStepActionLabel(actionType);
    return label ? [label] : [];
}

var CONTENT_RULE_BLOCKED_MESSAGE = 'Content associated with package not allowed in Step';
var ROLE_RULE_BLOCKED_MESSAGE = 'Your role is not allowed to move packages into this step';
function defaultRoleRule() {
    return { mode: 'all', roles: [] };
}
function defaultContentRule() {
    return { mode: 'all', pathPatterns: [], contentTypes: [] };
}
function normalizePath(path) {
    var trimmed = path.trim();
    return trimmed.startsWith('/') ? trimmed : "/".concat(trimmed);
}
function pathMatchesPattern(path, pattern) {
    var normalizedPath = normalizePath(path);
    var p = pattern.trim();
    if (!p) {
        return false;
    }
    if (p === '*' || p === '**' || p === '/*') {
        return true;
    }
    var normalizedPattern = normalizePath(p);
    if (normalizedPattern.endsWith('/**')) {
        var prefix = normalizedPattern.slice(0, -3);
        return normalizedPath === prefix || normalizedPath.startsWith("".concat(prefix, "/"));
    }
    if (normalizedPattern.endsWith('/*')) {
        var prefix = normalizedPattern.slice(0, -2);
        if (normalizedPath === prefix) {
            return true;
        }
        if (!normalizedPath.startsWith("".concat(prefix, "/"))) {
            return false;
        }
        var remainder = normalizedPath.slice(prefix.length + 1);
        return !remainder.includes('/');
    }
    if (normalizedPattern.includes('*')) {
        var regex = normalizedPattern
            .replace(/\\/g, '\\\\')
            .replace(/\./g, '\\.')
            .replace(/\*\*/g, '<<DOUBLESTAR>>')
            .replace(/\*/g, '[^/]*')
            .replace(/<<DOUBLESTAR>>/g, '.*');
        return new RegExp("^".concat(regex, "$")).test(normalizedPath);
    }
    return normalizedPath === normalizedPattern || normalizedPath.startsWith("".concat(normalizedPattern, "/"));
}
function pathMatchesAny(path, patterns) {
    return patterns.some(function (pattern) { return pathMatchesPattern(path, pattern); });
}
function contentTypeMatches(contentType, configured) {
    return contentType === configured || contentType.endsWith(configured);
}
function evaluateRoleRule(rule, userGroups) {
    var _a, _b;
    var mode = (_a = rule === null || rule === void 0 ? void 0 : rule.mode) !== null && _a !== void 0 ? _a : 'all';
    var roles = (_b = rule === null || rule === void 0 ? void 0 : rule.roles) !== null && _b !== void 0 ? _b : [];
    if (mode === 'all' || roles.length === 0) {
        return { allowed: true };
    }
    var userSet = new Set(userGroups.map(function (g) { return g.toLowerCase(); }));
    var configured = roles.map(function (r) { return r.toLowerCase(); });
    if (mode === 'include') {
        var matched = configured.some(function (role) { return userSet.has(role); });
        return matched ? { allowed: true } : { allowed: false, message: ROLE_RULE_BLOCKED_MESSAGE };
    }
    var blocked = configured.some(function (role) { return userSet.has(role); });
    return blocked ? { allowed: false, message: ROLE_RULE_BLOCKED_MESSAGE } : { allowed: true };
}
function evaluateContentRule(rule, contentPaths, contentTypes) {
    var _a, _b, _c;
    var mode = (_a = rule === null || rule === void 0 ? void 0 : rule.mode) !== null && _a !== void 0 ? _a : 'all';
    if (mode === 'all') {
        return { allowed: true };
    }
    var patterns = (_b = rule === null || rule === void 0 ? void 0 : rule.pathPatterns) !== null && _b !== void 0 ? _b : [];
    var types = (_c = rule === null || rule === void 0 ? void 0 : rule.contentTypes) !== null && _c !== void 0 ? _c : [];
    if (!patterns.length && !types.length) {
        return { allowed: true };
    }
    if (!contentPaths.length) {
        return { allowed: true };
    }
    var _loop_1 = function (i) {
        var path = contentPaths[i];
        var type = contentTypes[i] || '';
        var pathMatch = patterns.length ? pathMatchesAny(path, patterns) : false;
        var typeMatch = types.length && type ? types.some(function (configured) { return contentTypeMatches(type, configured); }) : false;
        if (!pathMatch && !typeMatch) {
            return { value: { allowed: false, message: CONTENT_RULE_BLOCKED_MESSAGE } };
        }
    };
    for (var i = 0; i < contentPaths.length; i += 1) {
        var state_1 = _loop_1(i);
        if (typeof state_1 === "object")
            return state_1.value;
    }
    return { allowed: true };
}
function evaluateStepMove(roleRule, contentRule, userGroups, contentPaths, contentTypes) {
    var roleResult = evaluateRoleRule(roleRule, userGroups);
    if (!roleResult.allowed) {
        return roleResult;
    }
    return evaluateContentRule(contentRule, contentPaths, contentTypes);
}

var PLUGIN_SERVICE_BASE = '/studio/api/2/plugin/script/plugins/org/rd/plugin/crafterwf/crafterwf';
function normalizeRoleRule(rule) {
    var _a;
    if (!rule) {
        return defaultRoleRule();
    }
    return {
        mode: rule.mode === 'include' || rule.mode === 'exclude' ? rule.mode : 'all',
        roles: (_a = rule.roles) !== null && _a !== void 0 ? _a : []
    };
}
function normalizeContentRule(rule) {
    var _a, _b;
    if (!rule) {
        return defaultContentRule();
    }
    return {
        mode: rule.mode === 'any' ? 'any' : 'all',
        pathPatterns: (_a = rule.pathPatterns) !== null && _a !== void 0 ? _a : [],
        contentTypes: (_b = rule.contentTypes) !== null && _b !== void 0 ? _b : []
    };
}
function isListMoveBlockedForPackage(list, packageSummary, userGroups) {
    var _a, _b;
    if (list.moveBlocked) {
        return { blocked: true, message: list.moveBlockedMessage };
    }
    var result = evaluateStepMove(normalizeRoleRule(list.roleRule), normalizeContentRule(list.contentRule), userGroups, (_a = packageSummary.contentPaths) !== null && _a !== void 0 ? _a : [], (_b = packageSummary.contentTypes) !== null && _b !== void 0 ? _b : []);
    return { blocked: !result.allowed, message: result.message };
}
function mapBoardResponse(result) {
    var _a, _b;
    var bg = result.workflow.backgroundUrl;
    var isImage = bg && /^https?:\/\//i.test(bg);
    var userGroups = (_b = (_a = result.currentUser) === null || _a === void 0 ? void 0 : _a.groups) !== null && _b !== void 0 ? _b : [];
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
        lists: result.workflowSteps.map(function (step) {
            var roleRule = normalizeRoleRule(step.roleRule);
            var contentRule = normalizeContentRule(step.contentRule);
            return {
                id: step.id,
                name: step.name,
                color: step.color,
                actionType: normalizeStepActionType(step.actionType),
                allowAddPackage: step.allowAddPackage === true,
                roleRule: roleRule,
                contentRule: contentRule,
                cards: step.workflowPackages.map(function (pkg) {
                    var _a, _b;
                    return ({
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
                        contentPaths: (_a = pkg.contentPaths) !== null && _a !== void 0 ? _a : [],
                        contentTypes: (_b = pkg.contentTypes) !== null && _b !== void 0 ? _b : []
                    });
                })
            };
        })
    };
}
function loadBoard(siteId, workflowId) {
    var url = "".concat(PLUGIN_SERVICE_BASE, "/workflow/board.json?siteId=").concat(encodeURIComponent(siteId));
    if (workflowId) {
        url += "&workflowId=".concat(encodeURIComponent(workflowId));
    }
    return pluginGet(url);
}
function createPackage(siteId, workflowStepId, title, description, coverColor) {
    var url = "".concat(PLUGIN_SERVICE_BASE, "/workflow-package/create.json?siteId=").concat(encodeURIComponent(siteId)) +
        "&workflowStepId=".concat(encodeURIComponent(workflowStepId)) +
        "&title=".concat(encodeURIComponent(title)) +
        "&description=".concat(encodeURIComponent(description)) +
        "&coverColor=".concat(encodeURIComponent(coverColor));
    return pluginPost(url);
}
function movePackage(siteId, workflowPackageId, workflowStepId, index) {
    var url = "".concat(PLUGIN_SERVICE_BASE, "/workflow-package/move.json?siteId=").concat(encodeURIComponent(siteId)) +
        "&workflowPackageId=".concat(encodeURIComponent(workflowPackageId)) +
        "&workflowStepId=".concat(encodeURIComponent(workflowStepId)) +
        "&index=".concat(index);
    return pluginPost(url);
}
function isRecord(value) {
    return !!value && typeof value === 'object' && !Array.isArray(value);
}
function looksLikeStepActionResult(value) {
    if (!isRecord(value)) {
        return false;
    }
    return ('stepActionFailed' in value ||
        'step_action_failed' in value ||
        'moveBlocked' in value ||
        value.moveBlocked === true ||
        value.stepActionStatus === 'failed' ||
        value.step_action_status === 'failed' ||
        (typeof value.userMessage === 'string' && value.userMessage.trim().length > 0) ||
        (typeof value.user_message === 'string' && value.user_message.trim().length > 0));
}
function deepCollectStepActionResults(value, depth, found) {
    if (depth === void 0) { depth = 0; }
    if (found === void 0) { found = []; }
    if (!isRecord(value) || depth > 8) {
        return found;
    }
    if (looksLikeStepActionResult(value)) {
        found.push(value);
    }
    for (var _i = 0, _a = Object.values(value); _i < _a.length; _i++) {
        var nested = _a[_i];
        if (isRecord(nested)) {
            deepCollectStepActionResults(nested, depth + 1, found);
        }
    }
    return found;
}
function collectResponseCandidates(response) {
    var ajaxBody = response === null || response === void 0 ? void 0 : response.response;
    if (!isRecord(ajaxBody)) {
        return [];
    }
    return deepCollectStepActionResults(ajaxBody);
}
function extractPackageActionResult(response) {
    var _a, _b;
    var flagged = collectResponseCandidates(response);
    if (flagged.length > 0) {
        return flagged[0];
    }
    var ajaxBody = response === null || response === void 0 ? void 0 : response.response;
    if (!isRecord(ajaxBody)) {
        return undefined;
    }
    var payload = (_b = (_a = ajaxBody.result) !== null && _a !== void 0 ? _a : (isRecord(ajaxBody.response) ? ajaxBody.response.result : undefined)) !== null && _b !== void 0 ? _b : ajaxBody;
    return isRecord(payload) ? payload : undefined;
}
function isStepActionFailed(result) {
    var _a;
    if (!result) {
        return false;
    }
    if (result.stepActionStatus === 'failed' || result.step_action_status === 'failed') {
        return true;
    }
    var userMessage = (result.userMessage || result.user_message || '').trim();
    if (userMessage.length > 0) {
        return true;
    }
    var flag = (_a = result.stepActionFailed) !== null && _a !== void 0 ? _a : result.step_action_failed;
    if (flag === true || flag === 1 || flag === 'true') {
        return true;
    }
    if (result.reverted === true) {
        var note = (result.stepActionMessage ||
            result.step_action_message ||
            result.message ||
            '').trim();
        return note.length > 0;
    }
    return false;
}
function getStepActionFailureMessage(result) {
    if (!isStepActionFailed(result)) {
        return null;
    }
    var text = ((result === null || result === void 0 ? void 0 : result.stepActionMessage) ||
        (result === null || result === void 0 ? void 0 : result.step_action_message) ||
        (result === null || result === void 0 ? void 0 : result.userMessage) ||
        (result === null || result === void 0 ? void 0 : result.user_message) ||
        (result === null || result === void 0 ? void 0 : result.moveBlockedReason) ||
        (result === null || result === void 0 ? void 0 : result.message) ||
        '').trim();
    return text || 'The step action failed. The package was moved back to the previous step.';
}
/** Resolve a step-action failure message from a move/create package ajax response. */
function getPackageActionFailureMessage(response) {
    var flaggedCandidates = collectResponseCandidates(response);
    for (var _i = 0, flaggedCandidates_1 = flaggedCandidates; _i < flaggedCandidates_1.length; _i++) {
        var candidate = flaggedCandidates_1[_i];
        var message = getStepActionFailureMessage(candidate);
        if (message) {
            return message;
        }
    }
    return getStepActionFailureMessage(extractPackageActionResult(response));
}
function archivePackage(siteId, workflowPackageId) {
    var url = "".concat(PLUGIN_SERVICE_BASE, "/workflow-package/archive.json?siteId=").concat(encodeURIComponent(siteId)) +
        "&workflowPackageId=".concat(encodeURIComponent(workflowPackageId));
    return pluginPost(url);
}
function updatePackageTitle(siteId, workflowPackageId, title) {
    var url = "".concat(PLUGIN_SERVICE_BASE, "/workflow-package/update-title.json?siteId=").concat(encodeURIComponent(siteId)) +
        "&workflowPackageId=".concat(encodeURIComponent(workflowPackageId)) +
        "&title=".concat(encodeURIComponent(title));
    return pluginPost(url);
}
function updatePackageDescription(siteId, workflowPackageId, description) {
    var url = "".concat(PLUGIN_SERVICE_BASE, "/workflow-package/update-description.json?siteId=").concat(encodeURIComponent(siteId)) +
        "&workflowPackageId=".concat(encodeURIComponent(workflowPackageId)) +
        "&description=".concat(encodeURIComponent(description));
    return pluginPost(url);
}
function updatePackageDueOn(siteId, workflowPackageId, dueOn) {
    var url = "".concat(PLUGIN_SERVICE_BASE, "/workflow-package/update-due-on.json?siteId=").concat(encodeURIComponent(siteId)) +
        "&workflowPackageId=".concat(encodeURIComponent(workflowPackageId));
    url += dueOn ? "&dueOn=".concat(encodeURIComponent(dueOn)) : '&dueOn=';
    return pluginPost(url);
}
function getWorkflowPackage(siteId, workflowPackageId) {
    var url = "".concat(PLUGIN_SERVICE_BASE, "/workflow-package/get.json?siteId=").concat(encodeURIComponent(siteId)) +
        "&workflowPackageId=".concat(encodeURIComponent(workflowPackageId));
    return pluginGet(url);
}
function loadPackageDetails(siteId, workflowPackageId, server) {
    var url = "".concat(PLUGIN_SERVICE_BASE, "/workflow-package/details.json?siteId=").concat(encodeURIComponent(siteId)) +
        "&workflowPackageId=".concat(encodeURIComponent(workflowPackageId)) +
        "&server=".concat(encodeURIComponent(server));
    return pluginGet(url);
}
function attachContent(siteId, workflowPackageId, contentPath, displayName, server) {
    var resolvedName = (displayName === null || displayName === void 0 ? void 0 : displayName.trim()) && displayName !== 'undefined' && displayName !== 'null'
        ? displayName.trim()
        : contentPath.split('/').filter(Boolean).pop() || contentPath;
    var url = "".concat(PLUGIN_SERVICE_BASE, "/workflow-package/attach-content.json?siteId=").concat(encodeURIComponent(siteId)) +
        "&workflowPackageId=".concat(encodeURIComponent(workflowPackageId)) +
        "&contentPath=".concat(encodeURIComponent(contentPath)) +
        "&displayName=".concat(encodeURIComponent(resolvedName)) +
        "&server=".concat(encodeURIComponent(server));
    return pluginPost(url);
}
function removeAttachment(siteId, workflowPackageId, attachmentId, attachmentType) {
    if (attachmentType === void 0) { attachmentType = 'content'; }
    var url = "".concat(PLUGIN_SERVICE_BASE, "/workflow-package/remove-attachment.json?siteId=").concat(encodeURIComponent(siteId)) +
        "&workflowPackageId=".concat(encodeURIComponent(workflowPackageId)) +
        "&attachmentId=".concat(encodeURIComponent(attachmentId)) +
        "&attachmentType=".concat(attachmentType);
    return pluginPost(url);
}
var COMMENT_TARGET = {
    WORKFLOW_PACKAGE: 'workflow_package',
    CONTENT: 'content'
};
function findPackagesByContentPath(siteId, contentPath, includeResolved, includeArchived) {
    if (includeResolved === void 0) { includeResolved = true; }
    if (includeArchived === void 0) { includeArchived = false; }
    var url = "".concat(PLUGIN_SERVICE_BASE, "/workflow-package/packages-by-content.json?siteId=").concat(encodeURIComponent(siteId)) +
        "&contentPath=".concat(encodeURIComponent(contentPath)) +
        "&includeResolved=".concat(includeResolved ? 'true' : 'false') +
        "&includeArchived=".concat(includeArchived ? 'true' : 'false');
    return pluginGet(url);
}
function listComments(siteId, targetType, targetId, includeResolved, includeArchived) {
    if (includeResolved === void 0) { includeResolved = true; }
    if (includeArchived === void 0) { includeArchived = false; }
    var url = "".concat(PLUGIN_SERVICE_BASE, "/comment/list.json?siteId=").concat(encodeURIComponent(siteId)) +
        "&targetType=".concat(encodeURIComponent(targetType)) +
        "&targetId=".concat(encodeURIComponent(targetId)) +
        "&includeResolved=".concat(includeResolved ? 'true' : 'false') +
        "&includeArchived=".concat(includeArchived ? 'true' : 'false');
    return pluginGet(url);
}
function listPackageComments(siteId, workflowPackageId, includeResolved, includeArchived) {
    if (includeResolved === void 0) { includeResolved = true; }
    if (includeArchived === void 0) { includeArchived = false; }
    return listComments(siteId, COMMENT_TARGET.WORKFLOW_PACKAGE, workflowPackageId, includeResolved, includeArchived);
}
function createComment(siteId, targetType, targetId, body, mentionedUserIds) {
    var url = "".concat(PLUGIN_SERVICE_BASE, "/comment/create.json?siteId=").concat(encodeURIComponent(siteId)) +
        "&targetType=".concat(encodeURIComponent(targetType)) +
        "&targetId=".concat(encodeURIComponent(targetId)) +
        "&body=".concat(encodeURIComponent(body));
    if (mentionedUserIds === null || mentionedUserIds === void 0 ? void 0 : mentionedUserIds.length) {
        url += "&mentionedUserIds=".concat(mentionedUserIds.join(','));
    }
    return pluginPost(url);
}
function createPackageComment(siteId, workflowPackageId, body, mentionedUserIds) {
    return createComment(siteId, COMMENT_TARGET.WORKFLOW_PACKAGE, workflowPackageId, body, mentionedUserIds);
}
function createContentComment(siteId, contentPath, body, mentionedUserIds) {
    return createComment(siteId, COMMENT_TARGET.CONTENT, contentPath, body, mentionedUserIds);
}
function resolveComment(siteId, commentId, resolved) {
    var url = "".concat(PLUGIN_SERVICE_BASE, "/comment/resolve.json?siteId=").concat(encodeURIComponent(siteId)) +
        "&commentId=".concat(encodeURIComponent(commentId)) +
        "&resolved=".concat(resolved ? 'true' : 'false');
    return pluginPost(url);
}
function archiveComment(siteId, commentId, archived) {
    var url = "".concat(PLUGIN_SERVICE_BASE, "/comment/archive.json?siteId=").concat(encodeURIComponent(siteId)) +
        "&commentId=".concat(encodeURIComponent(commentId)) +
        "&archived=".concat(archived ? 'true' : 'false');
    return pluginPost(url);
}

var TASK_TARGET = {
    WORKFLOW_PACKAGE: 'workflow_package',
    CONTENT: 'content'
};
var TASKS_UPDATED_EVENT = 'crafterwf:tasks-updated';
function notifyTasksUpdated() {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent(TASKS_UPDATED_EVENT));
    }
}
function isTruthy(value) {
    return value === true || value === 1 || value === '1' || value === 'true';
}
function extractTaskListResult(response) {
    var _a;
    var body = response === null || response === void 0 ? void 0 : response.response;
    var rawTasks = (_a = body === null || body === void 0 ? void 0 : body.result) === null || _a === void 0 ? void 0 : _a.tasks;
    if (!Array.isArray(rawTasks)) {
        return [];
    }
    return rawTasks.map(function (task) {
        var _a;
        var row = task;
        return __assign(__assign({}, row), { complete: isTruthy(row.complete), archived: isTruthy(row.archived), priority: ((_a = row.priority) !== null && _a !== void 0 ? _a : 'medium') });
    });
}
function formatDueOnForApi(value) {
    if (!(value === null || value === void 0 ? void 0 : value.trim())) {
        return null;
    }
    var trimmed = value.trim();
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(trimmed)) {
        return "".concat(trimmed, ":00");
    }
    if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
        return "".concat(trimmed, "T00:00:00");
    }
    return trimmed;
}
/** @deprecated Use formatTaskDateForApi */
var formatTaskDateForApi = formatDueOnForApi;
function listTasks(siteId, includeComplete, includeArchived, targetType, targetId, allTasks) {
    if (includeComplete === void 0) { includeComplete = true; }
    if (includeArchived === void 0) { includeArchived = false; }
    if (allTasks === void 0) { allTasks = false; }
    var url = "".concat(PLUGIN_SERVICE_BASE, "/task/list.json?siteId=").concat(encodeURIComponent(siteId)) +
        "&includeComplete=".concat(includeComplete ? 'true' : 'false') +
        "&includeArchived=".concat(includeArchived ? 'true' : 'false');
    if (allTasks) {
        url += '&allTasks=true';
    }
    if (targetType) {
        url += "&targetType=".concat(encodeURIComponent(targetType));
    }
    if (targetId) {
        url += "&targetId=".concat(encodeURIComponent(targetId));
    }
    return pluginGet(url);
}
function listAllTasks(siteId, includeComplete, includeArchived) {
    if (includeComplete === void 0) { includeComplete = true; }
    if (includeArchived === void 0) { includeArchived = false; }
    return listTasks(siteId, includeComplete, includeArchived, undefined, undefined, true);
}
function getOpenTaskCount(siteId) {
    var url = "".concat(PLUGIN_SERVICE_BASE, "/task/open-count.json?siteId=").concat(encodeURIComponent(siteId));
    return pluginGet(url);
}
function createTask(siteId, title, priority, dueOn, targetType, targetId, assigneeId, assigneeUsername, startOn) {
    if (priority === void 0) { priority = 'medium'; }
    var url = "".concat(PLUGIN_SERVICE_BASE, "/task/create.json?siteId=").concat(encodeURIComponent(siteId)) +
        "&title=".concat(encodeURIComponent(title)) +
        "&priority=".concat(encodeURIComponent(priority));
    if (startOn) {
        url += "&startOn=".concat(encodeURIComponent(startOn));
    }
    if (dueOn) {
        url += "&dueOn=".concat(encodeURIComponent(dueOn));
    }
    if (targetType) {
        url += "&targetType=".concat(encodeURIComponent(targetType));
    }
    if (targetId) {
        url += "&targetId=".concat(encodeURIComponent(targetId));
    }
    if (assigneeId != null) {
        url += "&assigneeId=".concat(assigneeId);
    }
    if (assigneeUsername) {
        url += "&assigneeUsername=".concat(encodeURIComponent(assigneeUsername));
    }
    return pluginPost(url);
}
function updateTask(siteId, taskId, updates) {
    var url = "".concat(PLUGIN_SERVICE_BASE, "/task/update.json?siteId=").concat(encodeURIComponent(siteId)) +
        "&taskId=".concat(encodeURIComponent(taskId));
    if (updates.title != null) {
        url += "&title=".concat(encodeURIComponent(updates.title));
    }
    if (updates.priority != null) {
        url += "&priority=".concat(encodeURIComponent(updates.priority));
    }
    if (updates.startOn !== undefined) {
        url += updates.startOn ? "&startOn=".concat(encodeURIComponent(updates.startOn)) : '&startOn=';
    }
    if (updates.dueOn !== undefined) {
        url += updates.dueOn ? "&dueOn=".concat(encodeURIComponent(updates.dueOn)) : '&dueOn=';
    }
    if (updates.targetType != null) {
        url += "&targetType=".concat(encodeURIComponent(updates.targetType));
    }
    if (updates.targetId != null) {
        url += "&targetId=".concat(encodeURIComponent(updates.targetId));
    }
    if (updates.assigneeId != null) {
        url += "&assigneeId=".concat(updates.assigneeId);
    }
    if (updates.assigneeUsername != null) {
        url += "&assigneeUsername=".concat(encodeURIComponent(updates.assigneeUsername));
    }
    return pluginPost(url);
}
function completeTask(siteId, taskId, complete) {
    var url = "".concat(PLUGIN_SERVICE_BASE, "/task/complete.json?siteId=").concat(encodeURIComponent(siteId)) +
        "&taskId=".concat(encodeURIComponent(taskId)) +
        "&complete=".concat(complete ? 'true' : 'false');
    return pluginPost(url);
}
function archiveTask(siteId, taskId, archived) {
    var url = "".concat(PLUGIN_SERVICE_BASE, "/task/archive.json?siteId=").concat(encodeURIComponent(siteId)) +
        "&taskId=".concat(encodeURIComponent(taskId)) +
        "&archived=".concat(archived ? 'true' : 'false');
    return pluginPost(url);
}
function getTask(siteId, taskId) {
    var url = "".concat(PLUGIN_SERVICE_BASE, "/task/get.json?siteId=").concat(encodeURIComponent(siteId)) +
        "&taskId=".concat(encodeURIComponent(taskId));
    return pluginGet(url);
}
function listPackageTasks(siteId, workflowPackageId, includeComplete, includeArchived) {
    if (includeComplete === void 0) { includeComplete = true; }
    if (includeArchived === void 0) { includeArchived = false; }
    return listTasks(siteId, includeComplete, includeArchived, TASK_TARGET.WORKFLOW_PACKAGE, workflowPackageId);
}
function openWorkflowPackage(dispatch, workflowId, packageId, boardTitle) {
    if (boardTitle === void 0) { boardTitle = 'Workflow'; }
    openWorkflowBoard(dispatch, boardTitle, { workflowId: workflowId, openPackageId: packageId });
}
function createPackageTask(siteId, workflowPackageId, title, priority, dueOn, assigneeId, assigneeUsername, startOn) {
    if (priority === void 0) { priority = 'medium'; }
    return createTask(siteId, title, priority, dueOn, TASK_TARGET.WORKFLOW_PACKAGE, workflowPackageId, assigneeId, assigneeUsername, startOn);
}

function formatDateTime$3(value) {
    if (!value) {
        return '';
    }
    var date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return value;
    }
    return date.toLocaleString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    });
}
function toDateTimeInputValue$3(value) {
    if (!value) {
        return '';
    }
    var date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return '';
    }
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var day = String(date.getDate()).padStart(2, '0');
    var hours = String(date.getHours()).padStart(2, '0');
    var minutes = String(date.getMinutes()).padStart(2, '0');
    return "".concat(year, "-").concat(month, "-").concat(day, "T").concat(hours, ":").concat(minutes);
}
var PackageTasksSection = function (_a) {
    var tasks = _a.tasks, onCreateTask = _a.onCreateTask, onCompleteTask = _a.onCompleteTask, onArchiveTask = _a.onArchiveTask, onTasksChange = _a.onTasksChange, _b = _a.showArchived, showArchived = _b === void 0 ? false : _b, onShowArchivedChange = _a.onShowArchivedChange;
    var siteId = useActiveSiteId();
    var _c = useState(''), titleDraft = _c[0], setTitleDraft = _c[1];
    var _d = useState('medium'), priority = _d[0], setPriority = _d[1];
    var _e = useState(''), dueOn = _e[0], setDueOn = _e[1];
    var _f = useState(''), startOn = _f[0], setStartOn = _f[1];
    var _g = useState(false), showAddForm = _g[0], setShowAddForm = _g[1];
    var _h = useState([]), assigneeOptions = _h[0], setAssigneeOptions = _h[1];
    var _j = useState(false), assigneesLoading = _j[0], setAssigneesLoading = _j[1];
    var _k = useState(null), editingTitleTaskId = _k[0], setEditingTitleTaskId = _k[1];
    var _l = useState(''), editingTitleDraft = _l[0], setEditingTitleDraft = _l[1];
    var _m = useState(null), editingDueTaskId = _m[0], setEditingDueTaskId = _m[1];
    var _o = useState(null), editingStartTaskId = _o[0], setEditingStartTaskId = _o[1];
    var assigneeById = useMemo$1(function () {
        var map = new Map();
        assigneeOptions.forEach(function (option) { return map.set(option.id, option); });
        return map;
    }, [assigneeOptions]);
    var loadAssignees = useCallback$1(function () {
        setAssigneesLoading(true);
        me().subscribe({
            next: function (currentUser) {
                fetchAll({ limit: 500, offset: 0 }).subscribe({
                    next: function (users) {
                        var enabled = (users !== null && users !== void 0 ? users : []).filter(function (user) { return user.enabled !== false; });
                        setAssigneeOptions(enabled.map(function (user) { return ({
                            id: user.id,
                            username: user.username,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            label: userLabel(user)
                        }); }));
                        setAssigneesLoading(false);
                    },
                    error: function (e) {
                        console.error(e);
                        if ((currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) != null) {
                            setAssigneeOptions([
                                {
                                    id: currentUser.id,
                                    username: currentUser.username,
                                    firstName: currentUser.firstName,
                                    lastName: currentUser.lastName,
                                    label: userLabel(currentUser)
                                }
                            ]);
                        }
                        setAssigneesLoading(false);
                    }
                });
            },
            error: function (e) {
                console.error(e);
                setAssigneesLoading(false);
            }
        });
    }, []);
    useEffect(function () {
        loadAssignees();
    }, [loadAssignees]);
    var refreshTasks = function () {
        onTasksChange === null || onTasksChange === void 0 ? void 0 : onTasksChange();
        notifyTasksUpdated();
    };
    var resetCreateForm = function () {
        setTitleDraft('');
        setDueOn('');
        setStartOn('');
        setPriority('medium');
    };
    var handleSubmit = function () {
        var title = titleDraft.trim();
        if (!title || !onCreateTask) {
            return;
        }
        onCreateTask(title, priority, dueOn || undefined, startOn || undefined);
        resetCreateForm();
        setShowAddForm(false);
    };
    var handlePriorityChange = function (task, nextPriority) {
        if (!siteId) {
            return;
        }
        updateTask(siteId, task.id, { priority: nextPriority }).subscribe({
            next: refreshTasks,
            error: function (e) {
                console.error(e);
            }
        });
    };
    var handleAssigneeChange = function (task, assigneeId) {
        var _a;
        if (!siteId) {
            return;
        }
        var assignee = assigneeById.get(assigneeId);
        updateTask(siteId, task.id, {
            assigneeId: assigneeId,
            assigneeUsername: (_a = assignee === null || assignee === void 0 ? void 0 : assignee.username) !== null && _a !== void 0 ? _a : task.assigneeUsername
        }).subscribe({
            next: refreshTasks,
            error: function (e) {
                console.error(e);
            }
        });
    };
    var handleDueDateChange = function (task, value) {
        if (!siteId) {
            return;
        }
        updateTask(siteId, task.id, { dueOn: formatDueOnForApi(value) }).subscribe({
            next: function () {
                setEditingDueTaskId(null);
                refreshTasks();
            },
            error: function (e) {
                console.error(e);
            }
        });
    };
    var handleStartDateChange = function (task, value) {
        if (!siteId) {
            return;
        }
        updateTask(siteId, task.id, { startOn: formatDueOnForApi(value) }).subscribe({
            next: function () {
                setEditingStartTaskId(null);
                refreshTasks();
            },
            error: function (e) {
                console.error(e);
            }
        });
    };
    var startTitleEdit = function (task) {
        setEditingTitleTaskId(task.id);
        setEditingTitleDraft(task.title);
    };
    var cancelTitleEdit = function () {
        setEditingTitleTaskId(null);
        setEditingTitleDraft('');
    };
    var saveTitleEdit = function (task) {
        var trimmed = editingTitleDraft.trim();
        if (!trimmed || !siteId) {
            cancelTitleEdit();
            return;
        }
        if (trimmed === task.title) {
            cancelTitleEdit();
            return;
        }
        updateTask(siteId, task.id, { title: trimmed }).subscribe({
            next: function () {
                cancelTitleEdit();
                refreshTasks();
            },
            error: function (e) {
                console.error(e);
                cancelTitleEdit();
            }
        });
    };
    var resolveAssigneeLabelForTask = function (task) {
        return resolveAssigneeLabel(task.assigneeId, task.assigneeUsername, assigneeOptions);
    };
    var showArchivedToggle = Boolean(onShowArchivedChange);
    if (assigneesLoading && assigneeOptions.length === 0 && tasks.length > 0) {
        return (React.createElement(Box, { sx: { display: 'flex', justifyContent: 'center', py: 2 } },
            React.createElement(CircularProgress, { size: 24 })));
    }
    return (React.createElement(Stack, { spacing: 1 },
        tasks.length === 0 ? (React.createElement(Typography, { variant: "body2", color: "text.secondary", sx: { py: 0.5 } }, showArchived && showArchivedToggle ? 'No tasks (including archived).' : 'No tasks yet.')) : (React.createElement(Stack, { spacing: 0.75 }, tasks.map(function (task) {
            var _a, _b;
            return (React.createElement(Box, { key: task.id, sx: {
                    p: 1.25,
                    borderRadius: 1,
                    border: 1,
                    borderColor: 'divider',
                    bgcolor: task.archived ? 'action.disabledBackground' : 'background.paper',
                    opacity: task.archived ? 0.85 : 1,
                    minWidth: 0
                } },
                React.createElement(Stack, { direction: "row", spacing: 0.75, alignItems: "flex-start" },
                    onCompleteTask && (React.createElement(Checkbox, { size: "small", checked: task.complete, disabled: task.archived, onChange: function (e) { return onCompleteTask(task.id, e.target.checked); }, sx: { p: 0, mt: 0.15, flexShrink: 0 } })),
                    React.createElement(Box, { sx: { flex: 1, minWidth: 0 } },
                        React.createElement(Stack, { direction: "row", spacing: 0.75, alignItems: "flex-start", sx: { mb: 0.75 } },
                            editingTitleTaskId === task.id ? (React.createElement(TextField, { size: "small", fullWidth: true, autoFocus: true, value: editingTitleDraft, onChange: function (e) { return setEditingTitleDraft(e.target.value); }, onBlur: function () { return saveTitleEdit(task); }, onKeyDown: function (e) {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        saveTitleEdit(task);
                                    }
                                    if (e.key === 'Escape') {
                                        e.preventDefault();
                                        cancelTitleEdit();
                                    }
                                }, sx: { flex: 1, minWidth: 0 } })) : (React.createElement(Box, { role: "button", tabIndex: task.archived ? -1 : 0, onClick: function () { return !task.archived && startTitleEdit(task); }, onKeyDown: function (e) {
                                    if (!task.archived && (e.key === 'Enter' || e.key === ' ')) {
                                        e.preventDefault();
                                        startTitleEdit(task);
                                    }
                                }, sx: {
                                    flex: 1,
                                    minWidth: 0,
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: 0.5,
                                    cursor: task.archived ? 'default' : 'pointer',
                                    '&:hover .package-task-title-edit-icon': {
                                        opacity: task.archived ? 0 : 1
                                    },
                                    '&:hover .package-task-title-text': task.archived
                                        ? undefined
                                        : {
                                            textDecoration: task.complete ? 'line-through underline' : 'underline',
                                            textUnderlineOffset: 2
                                        }
                                } },
                                React.createElement(Typography, { className: "package-task-title-text", variant: "body2", fontWeight: 600, sx: {
                                        flex: 1,
                                        minWidth: 0,
                                        wordBreak: 'break-word',
                                        textDecoration: task.complete ? 'line-through' : 'none',
                                        color: task.complete ? 'text.secondary' : 'text.primary'
                                    } }, task.title),
                                !task.archived && (React.createElement(EditRoundedIcon, { className: "package-task-title-edit-icon", sx: {
                                        fontSize: 14,
                                        opacity: 0,
                                        transition: 'opacity 0.15s ease',
                                        mt: 0.2,
                                        flexShrink: 0,
                                        color: 'text.secondary'
                                    } })))),
                            task.archived && (React.createElement(Chip, { label: "Archived", size: "small", variant: "outlined", sx: { height: 22, fontSize: '0.7rem', flexShrink: 0 } }))),
                        React.createElement(Stack, { spacing: 0.35, sx: { mb: 0.75 } },
                            React.createElement(Typography, { variant: "caption", color: "text.secondary" },
                                "Created ",
                                formatDateTime$3(task.createdOn)),
                            editingStartTaskId === task.id ? (React.createElement(TextField, { size: "small", type: "datetime-local", autoFocus: true, disabled: task.archived, value: toDateTimeInputValue$3(task.startOn), onChange: function (e) { return handleStartDateChange(task, e.target.value || null); }, onBlur: function () { return setEditingStartTaskId(null); }, InputLabelProps: { shrink: true }, sx: { maxWidth: 240, '& .MuiInputBase-input': { fontWeight: 700, py: 0.5 } } })) : (React.createElement(Typography, { variant: "caption", component: "button", type: "button", disabled: task.archived, onClick: function () { return !task.archived && setEditingStartTaskId(task.id); }, sx: {
                                    fontWeight: 700,
                                    border: 0,
                                    bgcolor: 'transparent',
                                    p: 0,
                                    m: 0,
                                    cursor: task.archived ? 'default' : 'pointer',
                                    color: task.startOn ? 'text.primary' : 'primary.main',
                                    textAlign: 'left',
                                    textDecoration: task.archived ? 'none' : 'underline',
                                    textUnderlineOffset: 2,
                                    '&:hover': task.archived ? undefined : { color: 'primary.main' }
                                } }, task.startOn ? "Start ".concat(formatDateTime$3(task.startOn)) : 'Add start date')),
                            editingDueTaskId === task.id ? (React.createElement(TextField, { size: "small", type: "datetime-local", autoFocus: true, disabled: task.archived, value: toDateTimeInputValue$3(task.dueOn), onChange: function (e) { return handleDueDateChange(task, e.target.value || null); }, onBlur: function () { return setEditingDueTaskId(null); }, InputLabelProps: { shrink: true }, sx: { maxWidth: 240, '& .MuiInputBase-input': { fontWeight: 700, py: 0.5 } } })) : (React.createElement(Typography, { variant: "caption", component: "button", type: "button", disabled: task.archived, onClick: function () { return !task.archived && setEditingDueTaskId(task.id); }, sx: {
                                    fontWeight: 700,
                                    border: 0,
                                    bgcolor: 'transparent',
                                    p: 0,
                                    m: 0,
                                    cursor: task.archived ? 'default' : 'pointer',
                                    color: task.dueOn ? 'text.primary' : 'primary.main',
                                    textAlign: 'left',
                                    textDecoration: task.archived ? 'none' : 'underline',
                                    textUnderlineOffset: 2,
                                    '&:hover': task.archived ? undefined : { color: 'primary.main' }
                                } }, task.dueOn ? "Due ".concat(formatDateTime$3(task.dueOn)) : 'Add due date'))),
                        React.createElement(Box, { sx: {
                                display: 'grid',
                                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                                gap: 1,
                                mb: 0.75
                            } },
                            React.createElement(FormControl, { size: "small", fullWidth: true },
                                React.createElement(InputLabel, { id: "package-task-".concat(task.id, "-priority-label") }, "Priority"),
                                React.createElement(Select, { labelId: "package-task-".concat(task.id, "-priority-label"), label: "Priority", value: task.priority, onChange: function (e) { return handlePriorityChange(task, e.target.value); }, disabled: task.archived },
                                    React.createElement(MenuItem, { value: "high" }, "High"),
                                    React.createElement(MenuItem, { value: "medium" }, "Medium"),
                                    React.createElement(MenuItem, { value: "low" }, "Low"))),
                            assigneeOptions.length > 0 ? (React.createElement(FormControl, { size: "small", fullWidth: true },
                                React.createElement(InputLabel, { id: "package-task-".concat(task.id, "-assignee-label") }, "Assignee"),
                                React.createElement(Select, { labelId: "package-task-".concat(task.id, "-assignee-label"), label: "Assignee", value: task.assigneeId, onChange: function (e) { return handleAssigneeChange(task, e.target.value); }, disabled: task.archived, renderValue: function (value) {
                                        var _a, _b;
                                        var option = assigneeById.get(value);
                                        var user = option !== null && option !== void 0 ? option : {
                                            username: (_a = task.assigneeUsername) !== null && _a !== void 0 ? _a : "user-".concat(task.assigneeId),
                                            firstName: undefined,
                                            lastName: undefined
                                        };
                                        return (React.createElement(UserAvatarLabel, { user: user, label: (_b = option === null || option === void 0 ? void 0 : option.label) !== null && _b !== void 0 ? _b : resolveAssigneeLabelForTask(task), size: 20, typographyVariant: "body2" }));
                                    } },
                                    assigneeOptions.map(function (option) { return (React.createElement(AssigneeMenuItem, { key: option.id, option: option })); }),
                                    !assigneeById.has(task.assigneeId) && (React.createElement(MenuItem, { value: task.assigneeId },
                                        React.createElement(UserAvatarLabel, { user: {
                                                username: (_a = task.assigneeUsername) !== null && _a !== void 0 ? _a : "user-".concat(task.assigneeId),
                                                firstName: undefined,
                                                lastName: undefined
                                            }, label: resolveAssigneeLabelForTask(task), size: 22 })))))) : (React.createElement(UserAvatarLabel, { user: {
                                    username: (_b = task.assigneeUsername) !== null && _b !== void 0 ? _b : "user-".concat(task.assigneeId),
                                    firstName: undefined,
                                    lastName: undefined
                                }, label: resolveAssigneeLabelForTask(task), size: 20, typographyVariant: "caption" }))),
                        onArchiveTask && !task.archived && (React.createElement(Button, { size: "small", sx: { px: 0, minWidth: 0 }, onClick: function () { return onArchiveTask(task.id, true); } }, "Archive")),
                        onArchiveTask && task.archived && (React.createElement(Button, { size: "small", sx: { px: 0, minWidth: 0 }, onClick: function () { return onArchiveTask(task.id, false); } }, "Restore"))))));
        }))),
        showArchivedToggle && (React.createElement(Button, { size: "small", sx: { alignSelf: 'flex-start', px: 0, minWidth: 0 }, onClick: function () { return onShowArchivedChange === null || onShowArchivedChange === void 0 ? void 0 : onShowArchivedChange(!showArchived); } }, showArchived ? 'Hide archived' : 'Show archived')),
        onCreateTask && !showAddForm && (React.createElement(Button, { size: "small", sx: { alignSelf: 'flex-start', px: 0, minWidth: 0 }, onClick: function () { return setShowAddForm(true); } }, "Add task")),
        onCreateTask && showAddForm && (React.createElement(Stack, { spacing: 1, sx: { pt: 0.5 } },
            React.createElement(Box, { sx: { position: 'relative' } },
                React.createElement(TextField, { size: "small", fullWidth: true, autoFocus: true, placeholder: "Add a task\u2026", value: titleDraft, onChange: function (e) { return setTitleDraft(e.target.value); }, onKeyDown: function (e) {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit();
                        }
                    }, sx: { '& .MuiInputBase-input': { pr: 4 } } }),
                React.createElement(IconButton, { size: "small", color: "primary", disabled: !titleDraft.trim(), onClick: handleSubmit, "aria-label": "Create task", sx: { position: 'absolute', right: 4, top: '50%', transform: 'translateY(-50%)' } },
                    React.createElement(SendRoundedIcon, { fontSize: "small" }))),
            React.createElement(Stack, { direction: "row", spacing: 1 },
                React.createElement(FormControl, { size: "small", sx: { minWidth: 110, flex: 1 } },
                    React.createElement(InputLabel, { id: "package-task-priority-label" }, "Priority"),
                    React.createElement(Select, { labelId: "package-task-priority-label", label: "Priority", value: priority, onChange: function (e) { return setPriority(e.target.value); } },
                        React.createElement(MenuItem, { value: "high" }, "High"),
                        React.createElement(MenuItem, { value: "medium" }, "Medium"),
                        React.createElement(MenuItem, { value: "low" }, "Low"))),
                React.createElement(TextField, { size: "small", type: "datetime-local", label: "Start", InputLabelProps: { shrink: true }, value: startOn, onChange: function (e) { return setStartOn(e.target.value); }, sx: { flex: 2, minWidth: 0 } }),
                React.createElement(TextField, { size: "small", type: "datetime-local", label: "Due", InputLabelProps: { shrink: true }, value: dueOn, onChange: function (e) { return setDueOn(e.target.value); }, sx: { flex: 2, minWidth: 0 } })),
            React.createElement(Button, { size: "small", sx: { alignSelf: 'flex-start', px: 0, minWidth: 0 }, onClick: function () {
                    resetCreateForm();
                    setShowAddForm(false);
                } }, "Cancel")))));
};

function searchAuditLog(siteId, params) {
    if (params === void 0) { params = {}; }
    var query = new URLSearchParams({ siteId: siteId });
    if (params.username) {
        query.set('username', params.username);
    }
    if (params.operation) {
        query.set('operation', params.operation);
    }
    if (params.targetType) {
        query.set('targetType', params.targetType);
    }
    if (params.targetId) {
        query.set('targetId', params.targetId);
    }
    if (params.q) {
        query.set('q', params.q);
    }
    if (params.from) {
        query.set('from', params.from);
    }
    if (params.to) {
        query.set('to', params.to);
    }
    if (params.page != null) {
        query.set('page', String(params.page));
    }
    if (params.pageSize != null) {
        query.set('pageSize', String(params.pageSize));
    }
    if (params.sortBy) {
        query.set('sortBy', params.sortBy);
    }
    if (params.sortOrder) {
        query.set('sortOrder', params.sortOrder);
    }
    return get("".concat(PLUGIN_SERVICE_BASE, "/audit/list.json?").concat(query.toString()));
}
function listPackageAuditLog(siteId, packageId, page, pageSize, sortBy, sortOrder) {
    if (page === void 0) { page = 1; }
    if (pageSize === void 0) { pageSize = 10; }
    if (sortBy === void 0) { sortBy = 'createdOn'; }
    if (sortOrder === void 0) { sortOrder = 'desc'; }
    return searchAuditLog(siteId, {
        targetType: 'package',
        targetId: packageId,
        page: page,
        pageSize: pageSize,
        sortBy: sortBy,
        sortOrder: sortOrder
    });
}

var DEFAULT_PAGE_SIZE = 10;
function formatDate$2(value) {
    if (!value) {
        return '—';
    }
    var date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return value;
    }
    return date.toLocaleString();
}
function formatOperation$1(operation) {
    return operation.replace(/_/g, ' ');
}
var PackageAuditTrailSection = function (_a) {
    var packageId = _a.packageId, _b = _a.refreshKey, refreshKey = _b === void 0 ? 0 : _b;
    var siteId = useActiveSiteId();
    var _c = useState(false), expanded = _c[0], setExpanded = _c[1];
    var _d = useState(false), loading = _d[0], setLoading = _d[1];
    var _e = useState([]), entries = _e[0], setEntries = _e[1];
    var _f = useState(0), total = _f[0], setTotal = _f[1];
    var _g = useState(0), page = _g[0], setPage = _g[1];
    var _h = useState(DEFAULT_PAGE_SIZE), pageSize = _h[0], setPageSize = _h[1];
    var _j = useState('createdOn'), sortBy = _j[0], setSortBy = _j[1];
    var _k = useState('desc'), sortOrder = _k[0], setSortOrder = _k[1];
    var _l = useState(), error = _l[0], setError = _l[1];
    var loadEntries = useCallback$1(function () {
        if (!siteId || !packageId) {
            return;
        }
        setLoading(true);
        setError(undefined);
        listPackageAuditLog(siteId, packageId, page + 1, pageSize, sortBy, sortOrder).subscribe({
            next: function (response) {
                var _a, _b, _c;
                var result = (_a = response.response) === null || _a === void 0 ? void 0 : _a.result;
                setEntries((_b = result === null || result === void 0 ? void 0 : result.entries) !== null && _b !== void 0 ? _b : []);
                setTotal((_c = result === null || result === void 0 ? void 0 : result.total) !== null && _c !== void 0 ? _c : 0);
                setLoading(false);
            },
            error: function (e) {
                var _a, _b;
                console.error(e);
                setEntries([]);
                setTotal(0);
                setLoading(false);
                setError(((_b = (_a = e.response) === null || _a === void 0 ? void 0 : _a.response) === null || _b === void 0 ? void 0 : _b.message) || 'Unable to load audit trail.');
            }
        });
    }, [siteId, packageId, page, pageSize, sortBy, sortOrder, refreshKey]);
    useEffect(function () {
        setExpanded(false);
        setPage(0);
        setPageSize(DEFAULT_PAGE_SIZE);
        setSortBy('createdOn');
        setSortOrder('desc');
        setEntries([]);
        setTotal(0);
        setError(undefined);
    }, [packageId]);
    useEffect(function () {
        if (!expanded) {
            return;
        }
        loadEntries();
    }, [expanded, loadEntries]);
    var handleAccordionChange = function (_event, isExpanded) {
        setExpanded(isExpanded);
        if (isExpanded) {
            setPage(0);
        }
    };
    var handleSort = function (column) {
        setPage(0);
        if (sortBy === column) {
            setSortOrder(function (current) { return (current === 'asc' ? 'desc' : 'asc'); });
            return;
        }
        setSortBy(column);
        setSortOrder(column === 'createdOn' ? 'desc' : 'asc');
    };
    var sortDirection = function (column) {
        return sortBy === column ? sortOrder : 'asc';
    };
    var renderSortLabel = function (column, label, alignRight) {
        if (alignRight === void 0) { alignRight = false; }
        return (React.createElement(TableSortLabel, { active: sortBy === column, direction: sortDirection(column), onClick: function () { return handleSort(column); }, sx: alignRight ? { ml: 'auto' } : undefined }, label));
    };
    return (React.createElement(Accordion, { expanded: expanded, onChange: handleAccordionChange, disableGutters: true, sx: {
            border: 1,
            borderColor: 'divider',
            borderRadius: '8px !important',
            '&:before': { display: 'none' },
            overflow: 'hidden',
            bgcolor: 'background.paper'
        } },
        React.createElement(AccordionSummary, { expandIcon: React.createElement(ExpandMoreRoundedIcon, null), sx: { minHeight: 44, '& .MuiAccordionSummary-content': { my: 0.5 } } },
            React.createElement(Typography, { variant: "subtitle2", sx: { fontWeight: 600 } }, "Audit trail")),
        React.createElement(AccordionDetails, { sx: { pt: 0, px: 1.5, pb: 1.5 } }, error ? (React.createElement(Typography, { variant: "body2", color: "error", sx: { py: 0.5 } }, error)) : (React.createElement(Paper, { variant: "outlined", sx: { overflow: 'hidden' } },
            React.createElement(TableContainer, null,
                React.createElement(Table, { size: "small", "aria-label": "Package audit trail" },
                    React.createElement(TableHead, null,
                        React.createElement(TableRow, { sx: { bgcolor: 'action.hover' } },
                            React.createElement(TableCell, { sx: { fontWeight: 600, whiteSpace: 'nowrap' } }, renderSortLabel('createdOn', 'Date')),
                            React.createElement(TableCell, { sx: { fontWeight: 600 } }, renderSortLabel('username', 'User')),
                            React.createElement(TableCell, { sx: { fontWeight: 600 } }, renderSortLabel('operation', 'Operation')),
                            React.createElement(TableCell, { sx: { fontWeight: 600, width: '50%' } }, renderSortLabel('note', 'Note')))),
                    React.createElement(TableBody, null, loading && entries.length === 0 ? (React.createElement(TableRow, null,
                        React.createElement(TableCell, { colSpan: 4, align: "center", sx: { py: 3 } },
                            React.createElement(CircularProgress, { size: 22 })))) : entries.length === 0 ? (React.createElement(TableRow, null,
                        React.createElement(TableCell, { colSpan: 4, align: "center", sx: { py: 3 } },
                            React.createElement(Typography, { variant: "body2", color: "text.secondary" }, "No audit entries for this package.")))) : (entries.map(function (entry) { return (React.createElement(TableRow, { key: entry.id, hover: true },
                        React.createElement(TableCell, { sx: { whiteSpace: 'nowrap', verticalAlign: 'top' } }, formatDate$2(entry.createdOn)),
                        React.createElement(TableCell, { sx: { verticalAlign: 'top' } }, entry.username ? (React.createElement(UserAvatarFromUsername, { username: entry.username, size: 22 })) : ('unknown')),
                        React.createElement(TableCell, { sx: { textTransform: 'capitalize', verticalAlign: 'top' } }, formatOperation$1(entry.operation)),
                        React.createElement(TableCell, { sx: {
                                verticalAlign: 'top',
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-word'
                            } }, entry.note || '—'))); }))))),
            React.createElement(TablePagination, { component: "div", count: total, page: page, onPageChange: function (_, nextPage) { return setPage(nextPage); }, rowsPerPage: pageSize, onRowsPerPageChange: function (event) {
                    setPageSize(parseInt(event.target.value, 10));
                    setPage(0);
                }, rowsPerPageOptions: [5, 10, 25], labelRowsPerPage: "Rows:", sx: {
                    borderTop: 1,
                    borderColor: 'divider',
                    '.MuiTablePagination-toolbar': { minHeight: 44, px: 1 }
                } }),
            loading && entries.length > 0 && (React.createElement(Box, { sx: { display: 'flex', justifyContent: 'center', py: 0.75, borderTop: 1, borderColor: 'divider' } },
                React.createElement(CircularProgress, { size: 18 }))))))));
};

function resolveAttachmentLabel(item) {
    var _a, _b;
    if (typeof item === 'string') {
        return resolveAttachmentLabel({ path: item });
    }
    var candidates = [item.label, item.internalName, item.name, item['internal-name']];
    for (var _i = 0, candidates_1 = candidates; _i < candidates_1.length; _i++) {
        var candidate = candidates_1[_i];
        if (typeof candidate === 'string') {
            var trimmed = candidate.trim();
            if (trimmed && trimmed !== 'undefined' && trimmed !== 'null') {
                return trimmed;
            }
        }
    }
    var path = (_b = (_a = item.path) !== null && _a !== void 0 ? _a : item.uri) !== null && _b !== void 0 ? _b : item.url;
    if (typeof path === 'string' && path.trim()) {
        var segments = path.split('/').filter(Boolean);
        return segments[segments.length - 1] || path;
    }
    return 'Attachment';
}
function isStaticAssetPath(path) {
    return !!(path === null || path === void 0 ? void 0 : path.startsWith('/static-assets/'));
}
function isValidContentPath(path) {
    if (!path || !path.trim()) {
        return false;
    }
    var trimmed = path.trim();
    return trimmed !== 'undefined' && trimmed !== 'null';
}
function extractContentPathFromAttachmentUrl(url) {
    if (!url) {
        return null;
    }
    if (url.startsWith('/static-assets/')) {
        return url;
    }
    var working = url;
    try {
        if (url.includes('%')) {
            working = decodeURIComponent(url);
        }
    }
    catch (_error) {
        working = url;
    }
    var contentIdMarker = 'contentId=';
    var markerIndex = working.indexOf(contentIdMarker);
    if (markerIndex < 0) {
        var encodedMarker = 'contentId%3D';
        var encodedIndex = url.indexOf(encodedMarker);
        if (encodedIndex < 0) {
            return null;
        }
        var path_1 = url.substring(encodedIndex + encodedMarker.length);
        var amp_1 = path_1.indexOf('%26');
        if (amp_1 >= 0) {
            path_1 = path_1.substring(0, amp_1);
        }
        try {
            path_1 = decodeURIComponent(path_1);
        }
        catch (_error) {
            // keep raw path
        }
        return path_1 && path_1 !== 'undefined' ? path_1 : null;
    }
    var path = working.substring(markerIndex + contentIdMarker.length);
    var amp = path.indexOf('&');
    if (amp >= 0) {
        path = path.substring(0, amp);
    }
    try {
        path = decodeURIComponent(path);
    }
    catch (_error) {
        // keep raw path
    }
    return path && path !== 'undefined' ? path : null;
}
/** Returns the URL/path to use for display, preview, and linking. */
function resolveAttachmentUrl(attachment) {
    var extracted = extractContentPathFromAttachmentUrl(attachment.url || '');
    if (extracted && isStaticAssetPath(extracted)) {
        return extracted;
    }
    if (extracted && isValidContentPath(extracted)) {
        return extracted;
    }
    return attachment.url || '#';
}
function resolveAttachmentDisplayName(attachment) {
    var _a;
    var name = (_a = attachment.name) === null || _a === void 0 ? void 0 : _a.trim();
    if (name && name !== 'undefined' && name !== 'null') {
        return name;
    }
    var path = extractContentPathFromAttachmentUrl(attachment.url || '');
    if (path) {
        var segments = path.split('/').filter(Boolean);
        return segments[segments.length - 1] || path;
    }
    return attachment.url || 'Attachment';
}

/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
function useEnv() {
  return useSelector((state) => state.env);
}

/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
// endregion
// region Publish
const showPublishDialog = /*#__PURE__*/ createAction('SHOW_PUBLISH_DIALOG');
const closePublishDialog = /*#__PURE__*/ createAction('CLOSE_PUBLISH_DIALOG');
// endregion
// region New Content
const showNewContentDialog = /*#__PURE__*/ createAction('SHOW_NEW_CONTENT_DIALOG');
const closeNewContentDialog = /*#__PURE__*/ createAction('CLOSE_NEW_CONTENT_DIALOG');
// endregion
// region Reject
const showRejectDialog = /*#__PURE__*/ createAction('SHOW_REJECT_DIALOG');
const closeRejectDialog = /*#__PURE__*/ createAction('CLOSE_REJECT_DIALOG');
// endregion
// region Legacy Form
const showEditDialog = /*#__PURE__*/ createAction('SHOW_EDIT_DIALOG');
const newContentCreationComplete = /*#__PURE__*/ createAction('NEW_CONTENT_CREATION_COMPLETE');
// endregion
// region Preview Dialog
const showPreviewDialog = /*#__PURE__*/ createAction('SHOW_PREVIEW_DIALOG');
const updatePreviewDialog = /*#__PURE__*/ createAction('UPDATE_PREVIEW_DIALOG');
// endregion

function resolvePreviewType(item) {
    if (item.type) {
        return item.type;
    }
    var mimeType = item.mimeType || '';
    if (mimeType.includes('audio/')) {
        return 'Audio';
    }
    if (mimeType.startsWith('image/')) {
        return 'Image';
    }
    if (mimeType.startsWith('video/')) {
        return 'Video';
    }
    if (mimeType === 'application/pdf') {
        return 'Pdf';
    }
    switch (item.systemType) {
        case 'page':
            return 'Page';
        case 'component':
        case 'taxonomy':
            return 'Component';
        case 'renderingTemplate':
            return 'Template';
        case 'script':
            return 'Groovy';
        default:
            return 'File';
    }
}
function resolveEditorMode(item) {
    if (item.systemType === 'renderingTemplate') {
        return 'ftl';
    }
    if (item.systemType === 'script') {
        return 'groovy';
    }
    switch (item.mimeType) {
        case 'text/x-freemarker':
            return 'ftl';
        case 'text/x-groovy':
            return 'groovy';
        case 'application/javascript':
            return 'javascript';
        case 'text/css':
            return 'css';
        default:
            return 'txt';
    }
}
/**
 * Opens the same preview dialog used by Studio Search (showPreviewDialog / showEditDialog).
 */
function previewStudioItem(item, context) {
    var _a;
    var dispatch = context.dispatch, site = context.site, authoringBase = context.authoringBase, guestBase = context.guestBase;
    var path = item.path;
    var title = item.label || item.name || path;
    var type = resolvePreviewType(item);
    if ((_a = item.mimeType) === null || _a === void 0 ? void 0 : _a.includes('audio/')) {
        type = 'Audio';
    }
    switch (type) {
        case 'Image':
            dispatch(showPreviewDialog({
                type: 'image',
                title: title,
                url: path
            }));
            break;
        case 'Page':
            dispatch(showPreviewDialog({
                type: 'page',
                title: title,
                url: "".concat(guestBase).concat(getPreviewURLFromPath(path), "?crafterCMSGuestDisabled=true")
            }));
            break;
        case 'Component':
        case 'Taxonomy':
            dispatch(showEditDialog({ site: site, path: path, authoringBase: authoringBase, readonly: true }));
            break;
        case 'Video':
            dispatch(showPreviewDialog({
                type: 'video',
                title: title,
                url: path
            }));
            break;
        case 'Audio':
            dispatch(showPreviewDialog({
                type: 'audio',
                title: title,
                url: path,
                mimeType: item.mimeType
            }));
            break;
        case 'Pdf':
            dispatch(showPreviewDialog({
                type: 'pdf',
                title: title,
                url: path
            }));
            break;
        default: {
            var mode = 'txt';
            if (type === 'Template') {
                mode = 'ftl';
            }
            else if (type === 'Groovy') {
                mode = 'groovy';
            }
            else if (type === 'JavaScript') {
                mode = 'javascript';
            }
            else if (type === 'CSS') {
                mode = 'css';
            }
            else {
                mode = resolveEditorMode(item);
            }
            dispatch(showPreviewDialog({
                type: 'editor',
                title: title,
                url: path,
                path: path,
                mode: mode
            }));
            fetchContentXML(site, path).subscribe({
                next: function (content) {
                    dispatch(updatePreviewDialog({
                        content: content
                    }));
                },
                error: function (err) {
                    console.error('Failed to fetch content for preview:', err);
                    dispatch(updatePreviewDialog({
                        content: "// Error loading content: ".concat((err === null || err === void 0 ? void 0 : err.message) || 'Unknown error')
                    }));
                }
            });
            break;
        }
    }
}

function useStudioItemPreview() {
    var dispatch = useDispatch();
    var site = useActiveSiteId();
    var _a = useEnv(), authoringBase = _a.authoringBase, guestBase = _a.guestBase;
    var previewItem = useCallback$1(function (item) {
        if (!(item === null || item === void 0 ? void 0 : item.path) || !site) {
            return;
        }
        previewStudioItem(item, { dispatch: dispatch, site: site, authoringBase: authoringBase, guestBase: guestBase });
    }, [authoringBase, dispatch, guestBase, site]);
    var previewPath = useCallback$1(function (path, label) {
        if (!path || !site) {
            return;
        }
        fetchSandboxItem(site, path, { castAsDetailedItem: true }).subscribe({
            next: function (sandboxItem) {
                previewStudioItem(sandboxItem, { dispatch: dispatch, site: site, authoringBase: authoringBase, guestBase: guestBase });
            },
            error: function () {
                previewStudioItem({ path: path, label: label || path }, { dispatch: dispatch, site: site, authoringBase: authoringBase, guestBase: guestBase });
            }
        });
    }, [authoringBase, dispatch, guestBase, site]);
    return { previewItem: previewItem, previewPath: previewPath };
}

var projectToolsConfigurationWidgetId = 'org.rd.plugin.crafterwf.ProjectToolsConfiguration';
/** Matches wf_workflow_step.name VARCHAR(255); UI cap keeps columns readable */
var STEP_NAME_MAX_LENGTH = 80;
var WORKFLOW_NAME_MAX_LENGTH = 255;
/** Matches wf_workflow_package.title VARCHAR(512) */
var PACKAGE_TITLE_MAX_LENGTH = 512;
/** Reasonable UI cap for wf_workflow_package.description TEXT */
var PACKAGE_DESCRIPTION_MAX_LENGTH = 10000;

var dense = true;
function formatDateTime$2(value) {
    if (!value) {
        return '';
    }
    var date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return value;
    }
    return date.toLocaleString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    });
}
function toDateTimeInputValue$2(value) {
    if (!value) {
        return '';
    }
    var date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return '';
    }
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var day = String(date.getDate()).padStart(2, '0');
    var hours = String(date.getHours()).padStart(2, '0');
    var minutes = String(date.getMinutes()).padStart(2, '0');
    return "".concat(year, "-").concat(month, "-").concat(day, "T").concat(hours, ":").concat(minutes);
}
/** Long paths/URLs in list rows need this so flex layout does not overflow the dialog. */
var listItemRowSx = { alignItems: 'flex-start', py: 0.5, minWidth: 0 };
var listItemTextSx = { minWidth: 0, pr: 1 };
var longTextSx = { wordBreak: 'break-all', overflowWrap: 'anywhere' };
function formatContentTypeLabel(contentTypeId) {
    var parts = contentTypeId.split('/').filter(Boolean);
    if (parts.length === 0) {
        return contentTypeId;
    }
    var namePart = parts[parts.length - 1].replace(/[-_]/g, ' ');
    var label = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    if (parts.length > 1) {
        var category = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
        return "".concat(label, " (").concat(category, ")");
    }
    return label;
}
function resolveSandboxItemLabel(item) {
    var _a;
    var label = (_a = item.label) === null || _a === void 0 ? void 0 : _a.trim();
    if (label) {
        return label;
    }
    if (item.path) {
        var segments = item.path.split('/').filter(Boolean);
        return segments[segments.length - 1] || item.path;
    }
    return 'Untitled';
}
function groupContentByType(items) {
    var groups = new Map();
    items.forEach(function (item) {
        var type = item.contentTypeId || 'Other';
        if (!groups.has(type)) {
            groups.set(type, []);
        }
        groups.get(type).push(item);
    });
    return Array.from(groups.entries()).sort(function (_a, _b) {
        var a = _a[0];
        var b = _b[0];
        return a.localeCompare(b);
    });
}
var CardDetails = function (_a) {
    var _b, _c, _d, _e;
    var card = _a.card, cardDetails = _a.cardDetails, onRemoveAttachment = _a.onRemoveAttachment, onRemoveContentItem = _a.onRemoveContentItem, onAddComment = _a.onAddComment, onResolveComment = _a.onResolveComment, onArchiveComment = _a.onArchiveComment, _f = _a.showArchivedComments, showArchivedComments = _f === void 0 ? false : _f, onShowArchivedCommentsChange = _a.onShowArchivedCommentsChange, onCreateTask = _a.onCreateTask, onCompleteTask = _a.onCompleteTask, onArchiveTask = _a.onArchiveTask, onTasksChange = _a.onTasksChange, _g = _a.showArchivedTasks, showArchivedTasks = _g === void 0 ? false : _g, onShowArchivedTasksChange = _a.onShowArchivedTasksChange, description = _a.description, onSaveDescription = _a.onSaveDescription, _h = _a.savingDescription, savingDescription = _h === void 0 ? false : _h, dueOn = _a.dueOn, onDueOnChange = _a.onDueOnChange, _j = _a.savingDueOn, savingDueOn = _j === void 0 ? false : _j, _k = _a.auditRefreshKey, auditRefreshKey = _k === void 0 ? 0 : _k;
    var _l = useStudioItemPreview(), previewItem = _l.previewItem, previewPath = _l.previewPath;
    var _m = useState(false), editingDescription = _m[0], setEditingDescription = _m[1];
    var _o = useState(description), descriptionDraft = _o[0], setDescriptionDraft = _o[1];
    var _p = useState(false), editingDueOn = _p[0], setEditingDueOn = _p[1];
    useEffect(function () {
        setDescriptionDraft(description);
        setEditingDescription(false);
    }, [description, card.id]);
    useEffect(function () {
        setEditingDueOn(false);
    }, [dueOn, card.id]);
    var handleStartEditDescription = function () {
        setDescriptionDraft(description);
        setEditingDescription(true);
    };
    var handleCancelEditDescription = function () {
        setDescriptionDraft(description);
        setEditingDescription(false);
    };
    var handleConfirmEditDescription = function () {
        if (!onSaveDescription || savingDescription) {
            return;
        }
        if (descriptionDraft.trim() === ((description === null || description === void 0 ? void 0 : description.trim()) || '')) {
            setEditingDescription(false);
            return;
        }
        onSaveDescription(descriptionDraft);
    };
    var handleRemoveAttachment = function (id) {
        onRemoveAttachment(id);
    };
    var handleRemoveContentItem = function (path) {
        if (onRemoveContentItem) {
            onRemoveContentItem(path);
        }
    };
    var contentItems = (_b = cardDetails.attachedContentItems) !== null && _b !== void 0 ? _b : [];
    var documents = (_c = cardDetails.attachedDocuments) !== null && _c !== void 0 ? _c : [];
    var comments = (_d = cardDetails.comments) !== null && _d !== void 0 ? _d : [];
    var tasks = (_e = cardDetails.tasks) !== null && _e !== void 0 ? _e : [];
    var contentGroups = useMemo$1(function () { return groupContentByType(contentItems); }, [contentItems]);
    return (React.createElement(Stack, { spacing: 1.25, sx: { py: 0, px: 0, minWidth: 0, maxWidth: '100%' } },
        React.createElement(Stack, { spacing: 0.35, sx: { minWidth: 0 } },
            React.createElement(Stack, { direction: "row", alignItems: "center", justifyContent: "space-between", spacing: 1 },
                React.createElement(Typography, { variant: "caption", color: "text.secondary", sx: { fontWeight: 600, letterSpacing: 0.06, textTransform: 'uppercase' } }, "Description"),
                onSaveDescription && !editingDescription && (React.createElement(Tooltip, { title: "Edit description" },
                    React.createElement(IconButton, { size: "small", onClick: handleStartEditDescription, "aria-label": "Edit description" },
                        React.createElement(EditRoundedIcon, { fontSize: "small" }))))),
            editingDescription ? (React.createElement(Stack, { spacing: 0.75 },
                React.createElement(TextField, { value: descriptionDraft, onChange: function (event) { return setDescriptionDraft(event.target.value); }, onKeyDown: function (event) {
                        if (event.key === 'Escape') {
                            event.preventDefault();
                            handleCancelEditDescription();
                        }
                    }, disabled: savingDescription, multiline: true, minRows: 3, maxRows: 8, fullWidth: true, size: "small", placeholder: "Package description", inputProps: {
                        maxLength: PACKAGE_DESCRIPTION_MAX_LENGTH,
                        'aria-label': 'Package description'
                    } }),
                React.createElement(Stack, { direction: "row", spacing: 1, justifyContent: "flex-end" },
                    React.createElement(Tooltip, { title: "Cancel" },
                        React.createElement("span", null,
                            React.createElement(IconButton, { size: "small", onClick: handleCancelEditDescription, disabled: savingDescription, "aria-label": "Cancel description edit" },
                                React.createElement(CloseRoundedIcon, { fontSize: "small" })))),
                    React.createElement(Tooltip, { title: "Save description" },
                        React.createElement("span", null,
                            React.createElement(IconButton, { size: "small", onClick: handleConfirmEditDescription, disabled: savingDescription, "aria-label": "Save description", color: "primary" },
                                React.createElement(CheckRoundedIcon, { fontSize: "small" }))))))) : (React.createElement(Typography, { variant: "body2", color: "text.primary", sx: __assign({ whiteSpace: 'pre-wrap', lineHeight: 1.5 }, longTextSx) }, description.trim() || '—'))),
        onDueOnChange && (React.createElement(React.Fragment, null,
            React.createElement(Divider, { flexItem: true, sx: { my: 0.25 } }),
            React.createElement(Stack, { spacing: 0.35, sx: { minWidth: 0 } },
                React.createElement(Typography, { variant: "caption", color: "text.secondary", sx: { fontWeight: 600, letterSpacing: 0.06, textTransform: 'uppercase' } }, "Due date"),
                editingDueOn ? (React.createElement(TextField, { size: "small", type: "datetime-local", autoFocus: true, disabled: savingDueOn, value: toDateTimeInputValue$2(dueOn), onChange: function (event) {
                        onDueOnChange(event.target.value || null);
                        setEditingDueOn(false);
                    }, onBlur: function () { return setEditingDueOn(false); }, InputLabelProps: { shrink: true }, sx: { maxWidth: 280, '& .MuiInputBase-input': { fontWeight: 600, py: 0.75 } } })) : (React.createElement(Typography, { variant: "body2", component: "button", type: "button", disabled: savingDueOn, onClick: function () { return !savingDueOn && setEditingDueOn(true); }, sx: {
                        fontWeight: 600,
                        border: 0,
                        bgcolor: 'transparent',
                        p: 0,
                        m: 0,
                        cursor: savingDueOn ? 'default' : 'pointer',
                        color: dueOn ? 'text.primary' : 'primary.main',
                        textAlign: 'left',
                        textDecoration: savingDueOn ? 'none' : 'underline',
                        textUnderlineOffset: 2,
                        '&:hover': savingDueOn ? undefined : { color: 'primary.main' }
                    } }, dueOn ? "Due ".concat(formatDateTime$2(dueOn)) : 'Add due date'))))),
        React.createElement(Divider, { flexItem: true, sx: { my: 0.25 } }),
        React.createElement(Stack, { spacing: 0.75 },
            React.createElement(Typography, { variant: "caption", color: "text.secondary", sx: { fontWeight: 600, letterSpacing: 0.06, textTransform: 'uppercase' } }, "Related content"),
            contentItems.length === 0 ? (React.createElement(Typography, { variant: "body2", color: "text.secondary", sx: { py: 0.5 } }, "No linked content items.")) : (React.createElement(Stack, { spacing: 1 }, contentGroups.map(function (_a) {
                var contentTypeId = _a[0], items = _a[1];
                return (React.createElement(Stack, { key: contentTypeId, spacing: 0.35 },
                    React.createElement(Typography, { variant: "caption", color: "text.secondary", sx: { fontWeight: 600, pl: 0.25 } }, formatContentTypeLabel(contentTypeId)),
                    React.createElement(List$1, { dense: dense, disablePadding: true, sx: { bgcolor: 'action.hover', borderRadius: 1, minWidth: 0, overflowX: 'hidden' } }, items.map(function (contentItem, contentIndex) {
                        var path = contentItem.path || '';
                        var label = resolveSandboxItemLabel(contentItem);
                        return (React.createElement(ListItem, { key: path || "".concat(contentTypeId, "-").concat(contentIndex), secondaryAction: path ? (React.createElement(IconButton, { edge: "end", "aria-label": "remove attachment", size: "small", onClick: function () { return handleRemoveContentItem(path); } },
                                React.createElement(ClearRoundedIcon, { fontSize: "small" }))) : undefined, sx: listItemRowSx },
                            React.createElement(ListItemText, { sx: listItemTextSx, primary: React.createElement(Tooltip, { title: path || label, placement: "top-start", enterDelay: 400 },
                                    React.createElement("span", null,
                                        React.createElement(AttachedSandboxItemDisplay, { item: contentItem, label: label, onClick: function () { return previewItem(contentItem); } }))), primaryTypographyProps: { variant: 'body2', component: 'div' } })));
                    }))));
            })))),
        React.createElement(Divider, { flexItem: true, sx: { my: 0.25 } }),
        React.createElement(Stack, { spacing: 0.5 },
            React.createElement(Typography, { variant: "caption", color: "text.secondary", sx: { fontWeight: 600, letterSpacing: 0.06, textTransform: 'uppercase' } }, "Documents & assets"),
            documents.length === 0 ? (React.createElement(Typography, { variant: "body2", color: "text.secondary", sx: { py: 0.5 } }, "No file attachments.")) : (React.createElement(List$1, { dense: dense, disablePadding: true, sx: { bgcolor: 'action.hover', borderRadius: 1, minWidth: 0, overflowX: 'hidden' } }, documents.map(function (document, docIndex) {
                var _a, _b;
                var displayPath = document.path || document.url || '';
                var fileName = resolveAttachmentDisplayName(document);
                return (React.createElement(ListItem, { key: (_b = (_a = document.id) !== null && _a !== void 0 ? _a : document.url) !== null && _b !== void 0 ? _b : docIndex, secondaryAction: React.createElement(IconButton, { edge: "end", "aria-label": "remove attachment", size: "small", onClick: function () { return handleRemoveAttachment(document.id); } },
                        React.createElement(ClearRoundedIcon, { fontSize: "small" })), sx: listItemRowSx },
                    React.createElement(ListItemText, { sx: listItemTextSx, primary: React.createElement(Tooltip, { title: displayPath, placement: "top-start", enterDelay: 400 },
                            React.createElement("span", null, document.sandboxItem ? (React.createElement(AttachedSandboxItemDisplay, { item: document.sandboxItem, label: fileName, onClick: function () { return previewPath(displayPath, fileName); } })) : (React.createElement(Typography, { variant: "body2", component: "span", onClick: function () { return previewPath(displayPath, fileName); }, sx: function (theme) { return (__assign(__assign({}, longTextSx), { display: 'block', maxWidth: '100%', minWidth: 0, cursor: 'pointer', color: theme.palette.mode === 'dark'
                                        ? theme.palette.primary.light
                                        : theme.palette.primary.main, '&:hover': { textDecoration: 'underline' } })); } }, fileName)))), primaryTypographyProps: { variant: 'body2', component: 'div' } })));
            })))),
        React.createElement(Divider, { flexItem: true, sx: { my: 0.25 } }),
        React.createElement(Stack, { spacing: 0.75 },
            React.createElement(Typography, { variant: "caption", color: "text.secondary", sx: { fontWeight: 600, letterSpacing: 0.06, textTransform: 'uppercase' } }, "Comments"),
            React.createElement(CommentsSection, { comments: comments, onAddComment: onAddComment, onResolveComment: onResolveComment, onArchiveComment: onArchiveComment, showArchived: showArchivedComments, onShowArchivedChange: onShowArchivedCommentsChange })),
        React.createElement(Divider, { flexItem: true, sx: { my: 0.25 } }),
        React.createElement(Stack, { spacing: 0.75 },
            React.createElement(Typography, { variant: "caption", color: "text.secondary", sx: { fontWeight: 600, letterSpacing: 0.06, textTransform: 'uppercase' } }, "Tasks"),
            React.createElement(PackageTasksSection, { tasks: tasks, onCreateTask: onCreateTask, onCompleteTask: onCompleteTask, onArchiveTask: onArchiveTask, onTasksChange: onTasksChange, showArchived: showArchivedTasks, onShowArchivedChange: onShowArchivedTasksChange })),
        React.createElement(Divider, { flexItem: true, sx: { my: 0.25 } }),
        React.createElement(PackageAuditTrailSection, { packageId: card.id, refreshKey: auditRefreshKey })));
};

/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
// region Batch Actions
const batchActions = /*#__PURE__*/ createAction('BATCH_ACTIONS');
// endregion
// region dispatch DOM Event
const dispatchDOMEvent = /*#__PURE__*/ createAction('DISPATCH_DOM_EVENT');
// endregion

function getSchemaStatus(siteId) {
    return get("".concat(PLUGIN_SERVICE_BASE, "/admin/schema/status.json?siteId=").concat(encodeURIComponent(siteId)));
}
function installSchema(siteId) {
    return pluginPost("".concat(PLUGIN_SERVICE_BASE, "/admin/schema/install.json?siteId=").concat(encodeURIComponent(siteId)));
}
function listWorkflows(siteId) {
    return get("".concat(PLUGIN_SERVICE_BASE, "/admin/workflow/list.json?siteId=").concat(encodeURIComponent(siteId)));
}
function getWorkflow(siteId, workflowId) {
    return get("".concat(PLUGIN_SERVICE_BASE, "/admin/workflow/get.json?siteId=").concat(encodeURIComponent(siteId), "&workflowId=").concat(encodeURIComponent(workflowId)));
}
function createWorkflow(siteId, name, description) {
    if (description === void 0) { description = ''; }
    var url = "".concat(PLUGIN_SERVICE_BASE, "/admin/workflow/create.json?siteId=").concat(encodeURIComponent(siteId)) +
        "&name=".concat(encodeURIComponent(name)) +
        "&description=".concat(encodeURIComponent(description)) +
        '&withDefaultSteps=true';
    return pluginPost(url);
}
function deleteWorkflow(siteId, workflowId) {
    return pluginDelete("".concat(PLUGIN_SERVICE_BASE, "/admin/workflow/delete.json?siteId=").concat(encodeURIComponent(siteId), "&workflowId=").concat(encodeURIComponent(workflowId)));
}
function saveWorkflowDefinition(siteId, workflowId, payload) {
    return post("".concat(PLUGIN_SERVICE_BASE, "/admin/workflow/save.json?siteId=").concat(encodeURIComponent(siteId)), {
        siteId: siteId,
        workflowId: workflowId,
        workflow: payload.workflow,
        steps: payload.steps
    });
}
function getPublishingTargets(siteId) {
    return get("".concat(PLUGIN_SERVICE_BASE, "/admin/publishing/targets.json?siteId=").concat(encodeURIComponent(siteId)));
}

var WORKFLOWS_UPDATED_EVENT = 'crafterwf:workflows-updated';
function notifyWorkflowsUpdated() {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent(WORKFLOWS_UPDATED_EVENT));
    }
}
function groupPackagesByWorkflow(packages) {
    var groups = new Map();
    packages.forEach(function (pkg) {
        var workflowId = pkg.workflowId || 'unknown';
        var workflowName = pkg.workflowName || 'Workflow';
        var existing = groups.get(workflowId);
        if (existing) {
            existing.packages.push(pkg);
        }
        else {
            groups.set(workflowId, { workflowId: workflowId, workflowName: workflowName, packages: [pkg] });
        }
    });
    return Array.from(groups.values()).sort(function (a, b) { return a.workflowName.localeCompare(b.workflowName); });
}
function previewServerAddress() {
    if (typeof window === 'undefined') {
        return '';
    }
    return "".concat(window.location.protocol, "//").concat(window.location.hostname).concat(window.location.port ? ":".concat(window.location.port) : '');
}
function openWorkflowBoardForGroup(dispatch, group) {
    var openPackageId = group.packages.length === 1 ? group.packages[0].workflowPackageId : undefined;
    openWorkflowBoard(dispatch, group.workflowName, {
        workflowId: group.workflowId,
        openPackageId: openPackageId
    });
}
function startWorkflowPackageForContent(dispatch, siteId, contentPath, workflow) {
    return new Promise(function (resolve, reject) {
        getWorkflow(siteId, workflow.id).subscribe({
            next: function (response) {
                var _a, _b, _c;
                var steps = (_c = (_b = (_a = response.response) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b.steps) !== null && _c !== void 0 ? _c : [];
                if (!steps.length) {
                    reject(new Error('This workflow has no steps.'));
                    return;
                }
                var firstStep = __spreadArray([], steps, true).sort(function (a, b) { var _a, _b; return ((_a = a.position) !== null && _a !== void 0 ? _a : 0) - ((_b = b.position) !== null && _b !== void 0 ? _b : 0); })[0];
                if (!(firstStep === null || firstStep === void 0 ? void 0 : firstStep.id)) {
                    reject(new Error('Could not resolve the first workflow step.'));
                    return;
                }
                resolveContentLabel(siteId, contentPath).then(function (title) {
                    createPackage(siteId, firstStep.id, title, '', firstStep.color || 'blue').subscribe({
                        next: function (createResponse) {
                            var _a;
                            var created = (_a = createResponse.response) === null || _a === void 0 ? void 0 : _a.result;
                            var packageId = created === null || created === void 0 ? void 0 : created.id;
                            if (!packageId) {
                                reject(new Error('Failed to create workflow package.'));
                                return;
                            }
                            attachContent(siteId, packageId, contentPath, title, previewServerAddress()).subscribe({
                                next: function () {
                                    openWorkflowBoard(dispatch, workflow.name, {
                                        workflowId: workflow.id,
                                        openPackageId: packageId
                                    });
                                    notifyWorkflowsUpdated();
                                    resolve();
                                },
                                error: function (err) {
                                    console.error(err);
                                    openWorkflowBoard(dispatch, workflow.name, {
                                        workflowId: workflow.id,
                                        openPackageId: packageId
                                    });
                                    notifyWorkflowsUpdated();
                                    reject(err);
                                }
                            });
                        },
                        error: function (err) {
                            console.error(err);
                            reject(err);
                        }
                    });
                });
            },
            error: function (err) {
                console.error(err);
                reject(err);
            }
        });
    });
}
function resolveContentLabel(siteId, contentPath) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                    fetchSandboxItem(siteId, contentPath, { castAsDetailedItem: true }).subscribe({
                        next: function (item) {
                            resolve(resolveAttachmentLabel(item));
                        },
                        error: function () {
                            resolve(resolveAttachmentLabel(contentPath));
                        }
                    });
                })];
        });
    });
}

function normalizeSelectedPaths(selection) {
    if (Array.isArray(selection)) {
        return selection
            .map(function (item) {
            var _a;
            if (typeof item === 'string') {
                return item.trim();
            }
            if (item && typeof item === 'object') {
                var path = (_a = item.path) !== null && _a !== void 0 ? _a : item.uri;
                return typeof path === 'string' ? path.trim() : '';
            }
            return '';
        })
            .filter(Boolean);
    }
    if (selection && typeof selection === 'object') {
        return Object.values(selection)
            .flatMap(function (item) { return normalizeSelectedPaths([item]); })
            .filter(Boolean);
    }
    return [];
}
var CardActions = function (_a) {
    var card = _a.card, cardDetails = _a.cardDetails, onMenuOpen = _a.onMenuOpen, onDetailsChanged = _a.onDetailsChanged, onPackageChanged = _a.onPackageChanged, onNestedDialogChange = _a.onNestedDialogChange, _b = _a.variant, variant = _b === void 0 ? 'icon' : _b;
    var siteId = useActiveSiteId();
    var dispatch = useDispatch();
    var _c = React.useState(null), anchorEl = _c[0], setAnchorEl = _c[1];
    var _d = React.useState(false), contentSearchOpen = _d[0], setContentSearchOpen = _d[1];
    var open = Boolean(anchorEl);
    var serverAddress = typeof window !== 'undefined'
        ? "".concat(window.location.protocol, "//").concat(window.location.hostname, ":").concat(window.location.port)
        : '';
    var attachContentToPackage = function (contentName, contentPath) {
        attachContent(siteId, card.id, contentPath, contentName, serverAddress).subscribe({
            next: function () {
                notifyWorkflowsUpdated();
                onDetailsChanged === null || onDetailsChanged === void 0 ? void 0 : onDetailsChanged();
            },
            error: function (e) {
                console.error(e);
            }
        });
    };
    var notifyNestedDialogClosed = function () {
        window.setTimeout(function () { return onNestedDialogChange === null || onNestedDialogChange === void 0 ? void 0 : onNestedDialogChange(false); }, 0);
    };
    var handleCardActionsClose = function () {
        setAnchorEl(null);
    };
    var handleCreatePage = function () {
        handleCreateContent('/site/website/index.xml');
    };
    var handleCreateComponent = function () {
        handleCreateContent('/site/components');
    };
    var handleCreateContent = function (path) {
        onNestedDialogChange === null || onNestedDialogChange === void 0 ? void 0 : onNestedDialogChange(true);
        fetchSandboxItem(siteId, path, { castAsDetailedItem: true }).subscribe({
            next: function (sandboxItem) {
                createCustomDocumentEventListener('CRAFTERWF_NEW_CONTENT', function (response) {
                    attachContentToPackage(response.item.internalName, response.item.uri);
                });
                createCustomDocumentEventListener('CRAFTERWF_CONTENTTYPE_SELECTED', function (response) {
                    dispatch(showEditDialog(__assign(__assign({}, response), { onSaveSuccess: batchActions([
                            closeNewContentDialog(),
                            newContentCreationComplete(),
                            dispatchDOMEvent({
                                id: 'CRAFTERWF_NEW_CONTENT'
                            })
                        ]) })));
                });
                dispatch(showNewContentDialog({
                    item: sandboxItem,
                    // @ts-ignore - required attributes injected by GlobalDialogManager
                    onContentTypeSelected: dispatchDOMEvent({
                        id: 'CRAFTERWF_CONTENTTYPE_SELECTED'
                    })
                }));
            },
            error: function () {
                console.error("Oops! We can't find the content you are looking for.");
            }
        });
        handleCardActionsClose();
    };
    var closeContentSearch = function () {
        setContentSearchOpen(false);
        notifyNestedDialogClosed();
    };
    var handleAttachExistingContent = function () {
        onNestedDialogChange === null || onNestedDialogChange === void 0 ? void 0 : onNestedDialogChange(true);
        setContentSearchOpen(true);
        handleCardActionsClose();
    };
    var handleContentSearchAccept = function (selection) {
        normalizeSelectedPaths(selection).forEach(function (path) {
            attachContentToPackage(resolveAttachmentLabel(path), path);
        });
        closeContentSearch();
    };
    var handlePublishContent = function () {
        onNestedDialogChange === null || onNestedDialogChange === void 0 ? void 0 : onNestedDialogChange(true);
        dispatch(showPublishDialog({
            items: cardDetails.attachedContentItems,
            onSuccess: batchActions([closePublishDialog()])
        }));
        handleCardActionsClose();
    };
    var handleRequestReviewOfContent = function () {
        onNestedDialogChange === null || onNestedDialogChange === void 0 ? void 0 : onNestedDialogChange(true);
        var schedulingMap = {
            approvePublish: null,
            schedulePublish: 'custom',
            requestPublish: 'now',
            publish: 'now'
        };
        dispatch(showPublishDialog({
            scheduling: schedulingMap['requestPublish'],
            items: cardDetails.attachedContentItems,
            isRequestPublish: true,
            isSubmitting: true,
            submissionCommentRequired: true,
            showRequestApproval: true,
            onSuccess: batchActions([closePublishDialog()])
        }));
        handleCardActionsClose();
    };
    var handleRejectContent = function () {
        onNestedDialogChange === null || onNestedDialogChange === void 0 ? void 0 : onNestedDialogChange(true);
        dispatch(showRejectDialog({
            items: cardDetails.attachedContentItems,
            onSuccess: batchActions([closeRejectDialog()])
        }));
        handleCardActionsClose();
    };
    var handleClickActions = function (event) {
        onMenuOpen();
        setAnchorEl(event.currentTarget);
    };
    var handleArchivePackage = function () {
        archivePackage(siteId, card.id).subscribe({
            next: function () {
                notifyWorkflowsUpdated();
                onPackageChanged === null || onPackageChanged === void 0 ? void 0 : onPackageChanged();
            },
            error: function (e) {
                console.error(e);
            }
        });
        handleCardActionsClose();
    };
    var hasItemsInReview = false;
    var hasItemsForReview = false;
    var hasItemsForPublish = false;
    var hasItems = false;
    if (cardDetails && cardDetails.attachedContentItems) {
        cardDetails.attachedContentItems.forEach(function (contentItem) {
            hasItems = true;
            var availableActionsMap = contentItem.availableActionsMap;
            hasItemsForReview =
                availableActionsMap.rejectPublish === false ? true : hasItemsForReview;
            hasItemsInReview = availableActionsMap.rejectPublish === true ? true : hasItemsInReview;
            hasItemsForPublish =
                (availableActionsMap.approvePublish || availableActionsMap.publish) === true ? true : hasItemsForPublish;
        });
    }
    var menuId = variant === 'button' ? 'package-actions-menu-dialog' : 'long-menu';
    var triggerId = variant === 'button' ? 'package-actions-button' : 'long-button';
    return (React.createElement(React.Fragment, null,
        variant === 'button' ? (React.createElement(Button, { id: triggerId, size: "small", variant: "outlined", "aria-label": "package actions", "aria-controls": open ? menuId : undefined, "aria-expanded": open ? 'true' : undefined, "aria-haspopup": "true", onClick: handleClickActions, sx: function (theme) { return ({
                color: 'inherit',
                borderColor: 'currentColor',
                opacity: 0.9,
                '&:hover': {
                    borderColor: 'currentColor',
                    bgcolor: theme.palette.action.hover
                }
            }); } }, "Actions")) : (React.createElement(IconButton$1, { id: triggerId, "aria-label": "package actions", "aria-controls": open ? menuId : undefined, "aria-expanded": open ? 'true' : undefined, "aria-haspopup": "true", onClick: handleClickActions },
            React.createElement(MoreVertRoundedIcon, null))),
        React.createElement(Menu, { id: menuId, anchorEl: anchorEl, open: open, onClose: handleCardActionsClose, PaperProps: {
                sx: { maxHeight: 360, minWidth: 220 }
            }, MenuListProps: {
                'aria-labelledby': triggerId
            } },
            React.createElement(MenuItem$1, { key: "createPage", onClick: handleCreatePage },
                React.createElement(Typography, null, "New Page")),
            React.createElement(MenuItem$1, { key: "createComponent", onClick: handleCreateComponent },
                React.createElement(Typography, null, "New Component")),
            React.createElement(MenuItem$1, { key: "attachExistingContent", onClick: handleAttachExistingContent },
                React.createElement(Typography, null, "Existing Content")),
            React.createElement(Divider$1, null),
            React.createElement(MenuItem$1, { key: "handleRequestReviewOfContent", onClick: handleRequestReviewOfContent, style: { display: hasItemsForReview ? 'block' : 'none' } },
                React.createElement(Typography, null, "Request Review")),
            React.createElement(MenuItem$1, { key: "rejectContent", onClick: handleRejectContent, style: { display: hasItemsInReview ? 'block' : 'none' } },
                React.createElement(Typography, null, "Reject Submission")),
            React.createElement(MenuItem$1, { key: "publishContent", onClick: handlePublishContent, style: { display: hasItemsForPublish ? 'block' : 'none' } },
                React.createElement(Typography, null, "Publish")),
            React.createElement(Divider$1, { style: { display: hasItems ? 'block' : 'none' } }),
            React.createElement(MenuItem$1, { key: "archivePackage", onClick: handleArchivePackage },
                React.createElement(Typography, null, "Archive Package"))),
        React.createElement(Dialog, { open: contentSearchOpen, onClose: closeContentSearch, fullWidth: true, maxWidth: "lg", scroll: "paper", disableRestoreFocus: true, "aria-labelledby": "crafterwf-content-search-title", PaperProps: { sx: { height: 'min(85vh, 720px)', maxHeight: '85vh' } } },
            React.createElement(DialogContent, { sx: { p: 0, display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden' } },
                React.createElement(Search, { embedded: true, mode: "select", onClose: closeContentSearch, onAcceptSelection: handleContentSearchAccept })))));
};

var CALENDAR_UPDATED_EVENT = 'crafterwf:calendar-updated';
function notifyCalendarUpdated() {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent(CALENDAR_UPDATED_EVENT));
    }
}

function coverColorToMuiColor(color) {
    if (color == null || typeof color !== 'string')
        return undefined;
    var resolved = resolveStepColor(color);
    return resolved || undefined;
}
function coverColorForCss(color) {
    var _a;
    return (_a = coverColorToMuiColor(color)) !== null && _a !== void 0 ? _a : ((color === null || color === void 0 ? void 0 : color.trim()) || undefined);
}
var emptyDetails = {
    attachedContentItems: null,
    attachedDocuments: null,
    attachments: null,
    comments: null,
    tasks: null
};
var BoardCard = function (_a) {
    var card = _a.card, _b = _a.detailsOpen, detailsOpen = _b === void 0 ? false : _b, onDetailsOpen = _a.onDetailsOpen, onDetailsClose = _a.onDetailsClose, onPackageChanged = _a.onPackageChanged, _c = _a.dialogOnly, dialogOnly = _c === void 0 ? false : _c;
    var siteId = useActiveSiteId();
    var _d = useState(); _d[0]; var setError = _d[1];
    var _e = useState(emptyDetails), cardDetailsData = _e[0], setCardDetailsData = _e[1];
    var _f = useState(false), showArchivedComments = _f[0], setShowArchivedComments = _f[1];
    var _g = useState(false), showArchivedTasks = _g[0], setShowArchivedTasks = _g[1];
    var _h = useState(card.name), packageTitle = _h[0], setPackageTitle = _h[1];
    var _j = useState(card.desc), packageDescription = _j[0], setPackageDescription = _j[1];
    var _k = useState(card.dueOn), packageDueOn = _k[0], setPackageDueOn = _k[1];
    var _l = useState(false), editingTitle = _l[0], setEditingTitle = _l[1];
    var _m = useState(false), savingTitle = _m[0], setSavingTitle = _m[1];
    var _o = useState(false), savingDescription = _o[0], setSavingDescription = _o[1];
    var _p = useState(false), savingDueOn = _p[0], setSavingDueOn = _p[1];
    var _q = useState(0), auditRefreshKey = _q[0], setAuditRefreshKey = _q[1];
    var ignoreBackdropCloseRef = useRef(false);
    var boardRefreshTimerRef = useRef();
    var serverAddress = typeof window !== 'undefined'
        ? "".concat(window.location.protocol, "//").concat(window.location.hostname, ":").concat(window.location.port)
        : '';
    var loadCommentsOnly = function (includeArchived) {
        if (includeArchived === void 0) { includeArchived = showArchivedComments; }
        listPackageComments(siteId, card.id, true, includeArchived).subscribe({
            next: function (response) {
                var _a, _b, _c;
                var comments = (_c = (_b = (_a = response.response) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b.comments) !== null && _c !== void 0 ? _c : [];
                setCardDetailsData(function (prev) { return (__assign(__assign({}, prev), { comments: comments })); });
            },
            error: function (e) {
                console.error(e);
            }
        });
    };
    var loadTasksOnly = function (includeArchived) {
        if (includeArchived === void 0) { includeArchived = showArchivedTasks; }
        listPackageTasks(siteId, card.id, true, includeArchived).subscribe({
            next: function (response) {
                var _a, _b, _c;
                var tasks = (_c = (_b = (_a = response.response) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b.tasks) !== null && _c !== void 0 ? _c : [];
                setCardDetailsData(function (prev) { return (__assign(__assign({}, prev), { tasks: tasks })); });
            },
            error: function (e) {
                console.error(e);
            }
        });
    };
    var loadCardDetailsData = function () {
        loadPackageDetails(siteId, card.id, serverAddress).subscribe({
            next: function (response) {
                var _a;
                var details = response.response.result;
                var contentItemPaths = [];
                var documentItems = [];
                var pathsToFetch = new Set();
                (_a = details.attachments) === null || _a === void 0 ? void 0 : _a.forEach(function (attachment) {
                    var _a;
                    var contentPath = extractContentPathFromAttachmentUrl(attachment.url || '') ||
                        (isStaticAssetPath(attachment.url) ? attachment.url : null);
                    var assetUrl = resolveAttachmentUrl(attachment);
                    if (contentPath && isStaticAssetPath(contentPath)) {
                        documentItems.push({
                            id: attachment.id,
                            name: resolveAttachmentDisplayName(attachment),
                            url: assetUrl,
                            path: contentPath
                        });
                        pathsToFetch.add(contentPath);
                    }
                    else if (contentPath && isValidContentPath(contentPath) && ((_a = attachment.url) === null || _a === void 0 ? void 0 : _a.includes('contentId'))) {
                        contentItemPaths.push(contentPath);
                        pathsToFetch.add(contentPath);
                    }
                    else if (contentPath && isValidContentPath(contentPath)) {
                        documentItems.push({
                            id: attachment.id,
                            name: resolveAttachmentDisplayName(attachment),
                            url: assetUrl,
                            path: contentPath
                        });
                        pathsToFetch.add(contentPath);
                    }
                    else if (attachment.url && !attachment.url.includes('contentId=undefined')) {
                        documentItems.push({
                            id: attachment.id,
                            name: resolveAttachmentDisplayName(attachment),
                            url: assetUrl,
                            path: contentPath || attachment.url
                        });
                    }
                });
                setCardDetailsData(function (prev) { return (__assign(__assign({}, prev), { attachments: details.attachments, attachedDocuments: documentItems, attachedContentItems: pathsToFetch.size === 0 ? [] : [] })); });
                if (pathsToFetch.size > 0) {
                    fetchItemsByPath(siteId, Array.from(pathsToFetch), { castAsDetailedItem: true }).subscribe({
                        next: function (sandboxItems) {
                            var byPath = {};
                            sandboxItems.forEach(function (item) {
                                if (item === null || item === void 0 ? void 0 : item.path) {
                                    byPath[item.path] = item;
                                }
                            });
                            var attachedContentItems = contentItemPaths
                                .map(function (path) { return byPath[path]; })
                                .filter(function (item) { return !!item; });
                            var attachedDocuments = documentItems.map(function (doc) { return (__assign(__assign({}, doc), { sandboxItem: doc.path ? byPath[doc.path] : undefined })); });
                            setCardDetailsData(function (prev) { return (__assign(__assign({}, prev), { attachedContentItems: attachedContentItems, attachedDocuments: attachedDocuments })); });
                        }
                    });
                }
            },
            error: function (e) {
                var _a, _b;
                console.error(e);
                setError((_b = (_a = e.response) === null || _a === void 0 ? void 0 : _a.response) !== null && _b !== void 0 ? _b : { code: '?', message: 'Unknown Error. Check browser console.' });
            }
        });
        loadCommentsOnly();
        loadTasksOnly();
    };
    var scheduleBoardRefresh = function () {
        if (boardRefreshTimerRef.current) {
            window.clearTimeout(boardRefreshTimerRef.current);
        }
        boardRefreshTimerRef.current = window.setTimeout(function () {
            onPackageChanged === null || onPackageChanged === void 0 ? void 0 : onPackageChanged();
        }, 400);
    };
    var bumpAuditRefresh = function () {
        setAuditRefreshKey(function (current) { return current + 1; });
    };
    var handleDetailsChanged = function () {
        loadCardDetailsData();
        scheduleBoardRefresh();
        bumpAuditRefresh();
    };
    var handlePackageChanged = function () {
        loadCardDetailsData();
        onPackageChanged === null || onPackageChanged === void 0 ? void 0 : onPackageChanged();
        if (detailsOpen) {
            onDetailsClose === null || onDetailsClose === void 0 ? void 0 : onDetailsClose();
        }
    };
    var openDetails = function () {
        onDetailsOpen === null || onDetailsOpen === void 0 ? void 0 : onDetailsOpen();
        loadCardDetailsData();
    };
    var handleCardCloseClick = function () {
        setEditingTitle(false);
        setPackageTitle(card.name);
        setPackageDescription(card.desc);
        setPackageDueOn(card.dueOn);
        onDetailsClose === null || onDetailsClose === void 0 ? void 0 : onDetailsClose();
    };
    var handleDialogClose = function (_event, reason) {
        if (reason === 'backdropClick' && ignoreBackdropCloseRef.current) {
            return;
        }
        handleCardCloseClick();
    };
    var handleNestedDialogChange = function (open) {
        ignoreBackdropCloseRef.current = open;
        if (!open) {
            window.setTimeout(function () {
                ignoreBackdropCloseRef.current = false;
            }, 300);
        }
    };
    useEffect(function () {
        if (detailsOpen) {
            loadCardDetailsData();
        }
    }, [detailsOpen, card.id]);
    useEffect(function () {
        setPackageTitle(card.name);
        setPackageDescription(card.desc);
        setPackageDueOn(card.dueOn);
        setEditingTitle(false);
    }, [card.id, card.name, card.desc, card.dueOn]);
    var savePackageTitle = function (onComplete) {
        var trimmed = packageTitle.trim();
        if (!trimmed) {
            setPackageTitle(card.name);
            onComplete === null || onComplete === void 0 ? void 0 : onComplete();
            return;
        }
        if (trimmed === card.name || savingTitle) {
            onComplete === null || onComplete === void 0 ? void 0 : onComplete();
            return;
        }
        setSavingTitle(true);
        updatePackageTitle(siteId, card.id, trimmed).subscribe({
            next: function () {
                setSavingTitle(false);
                setPackageTitle(trimmed);
                scheduleBoardRefresh();
                notifyWorkflowsUpdated();
                bumpAuditRefresh();
                onComplete === null || onComplete === void 0 ? void 0 : onComplete();
            },
            error: function (e) {
                console.error(e);
                setSavingTitle(false);
                setPackageTitle(card.name);
                onComplete === null || onComplete === void 0 ? void 0 : onComplete();
            }
        });
    };
    var startEditingTitle = function () {
        setPackageTitle(card.name);
        setEditingTitle(true);
    };
    var cancelEditingTitle = function () {
        setPackageTitle(card.name);
        setEditingTitle(false);
    };
    var confirmEditingTitle = function () {
        savePackageTitle(function () { return setEditingTitle(false); });
    };
    var handleTitleKeyDown = function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            confirmEditingTitle();
        }
        if (event.key === 'Escape') {
            event.preventDefault();
            cancelEditingTitle();
        }
    };
    var handleSaveDescription = function (nextDescription) {
        var normalized = nextDescription.trim();
        if (normalized === (packageDescription.trim() || '') || savingDescription) {
            return;
        }
        setSavingDescription(true);
        updatePackageDescription(siteId, card.id, normalized).subscribe({
            next: function () {
                setSavingDescription(false);
                setPackageDescription(normalized);
                scheduleBoardRefresh();
                notifyWorkflowsUpdated();
                bumpAuditRefresh();
            },
            error: function (e) {
                console.error(e);
                setSavingDescription(false);
                setPackageDescription(card.desc);
            }
        });
    };
    var handleDueOnChange = function (dueOn) {
        var apiValue = formatDueOnForApi(dueOn);
        var currentApi = formatDueOnForApi(packageDueOn !== null && packageDueOn !== void 0 ? packageDueOn : null);
        if (apiValue === currentApi || savingDueOn) {
            return;
        }
        setSavingDueOn(true);
        updatePackageDueOn(siteId, card.id, apiValue).subscribe({
            next: function () {
                setSavingDueOn(false);
                setPackageDueOn(apiValue !== null && apiValue !== void 0 ? apiValue : undefined);
                scheduleBoardRefresh();
                notifyCalendarUpdated();
                bumpAuditRefresh();
            },
            error: function (e) {
                console.error(e);
                setSavingDueOn(false);
                setPackageDueOn(card.dueOn);
            }
        });
    };
    useEffect(function () {
        return function () {
            if (boardRefreshTimerRef.current) {
                window.clearTimeout(boardRefreshTimerRef.current);
            }
        };
    }, []);
    var handleShowMoreClick = function () {
        if (!detailsOpen) {
            openDetails();
        }
    };
    var handleRemoveAttachment = function (attachmentId) {
        var _a;
        var attachment = (_a = cardDetailsData.attachments) === null || _a === void 0 ? void 0 : _a.find(function (item) { return item.id === attachmentId; });
        if (!attachment) {
            return;
        }
        var attachmentType = attachment._type === 'link' ? 'link' : 'content';
        removeAttachment(siteId, card.id, attachment.id, attachmentType).subscribe({
            next: function () { return handleDetailsChanged(); },
            error: function (e) {
                console.error(e);
            }
        });
    };
    var handleRemoveContentItem = function (contentPath) {
        var _a;
        var attachment = (_a = cardDetailsData.attachments) === null || _a === void 0 ? void 0 : _a.find(function (item) {
            var path = extractContentPathFromAttachmentUrl(item.url || '');
            return path === contentPath;
        });
        if (!attachment) {
            return;
        }
        removeAttachment(siteId, card.id, attachment.id, 'content').subscribe({
            next: function () { return handleDetailsChanged(); },
            error: function (e) {
                console.error(e);
            }
        });
    };
    var handleAddComment = function (body, mentionedUserIds) {
        createPackageComment(siteId, card.id, body, mentionedUserIds).subscribe({
            next: function () {
                loadCommentsOnly();
                scheduleBoardRefresh();
            },
            error: function (e) {
                console.error(e);
            }
        });
    };
    var handleResolveComment = function (commentId, resolved) {
        resolveComment(siteId, commentId, resolved).subscribe({
            next: function () {
                loadCommentsOnly();
                scheduleBoardRefresh();
            },
            error: function (e) {
                console.error(e);
            }
        });
    };
    var handleArchiveComment = function (commentId, archived) {
        archiveComment(siteId, commentId, archived).subscribe({
            next: function () {
                loadCommentsOnly();
                scheduleBoardRefresh();
            },
            error: function (e) {
                console.error(e);
            }
        });
    };
    var handleShowArchivedCommentsChange = function (show) {
        setShowArchivedComments(show);
        listPackageComments(siteId, card.id, true, show).subscribe({
            next: function (response) {
                var _a, _b, _c;
                var comments = (_c = (_b = (_a = response.response) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b.comments) !== null && _c !== void 0 ? _c : [];
                setCardDetailsData(function (prev) { return (__assign(__assign({}, prev), { comments: comments })); });
            },
            error: function (e) {
                console.error(e);
            }
        });
    };
    var handleCreateTask = function (title, priority, dueOn, startOn) {
        createPackageTask(siteId, card.id, title, priority, formatDueOnForApi(dueOn) || undefined, undefined, undefined, formatDueOnForApi(startOn) || undefined).subscribe({
            next: function () {
                loadTasksOnly();
                notifyTasksUpdated();
            },
            error: function (e) {
                console.error(e);
            }
        });
    };
    var handleCompleteTask = function (taskId, complete) {
        completeTask(siteId, taskId, complete).subscribe({
            next: function () {
                loadTasksOnly();
                notifyTasksUpdated();
            },
            error: function (e) {
                console.error(e);
            }
        });
    };
    var handleArchiveTask = function (taskId, archived) {
        archiveTask(siteId, taskId, archived).subscribe({
            next: function () {
                loadTasksOnly();
                notifyTasksUpdated();
            },
            error: function (e) {
                console.error(e);
            }
        });
    };
    var handleShowArchivedTasksChange = function (show) {
        setShowArchivedTasks(show);
        listPackageTasks(siteId, card.id, true, show).subscribe({
            next: function (response) {
                var _a, _b, _c;
                var tasks = (_c = (_b = (_a = response.response) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b.tasks) !== null && _c !== void 0 ? _c : [];
                setCardDetailsData(function (prev) { return (__assign(__assign({}, prev), { tasks: tasks })); });
            },
            error: function (e) {
                console.error(e);
            }
        });
    };
    return (React.createElement(React.Fragment, null,
        !dialogOnly && (React.createElement(Card, { elevation: 0, sx: function (theme) {
                var _a;
                return ({
                    borderRadius: 2,
                    border: "1px solid ".concat(theme.palette.divider),
                    borderTop: ((_a = card.cover) === null || _a === void 0 ? void 0 : _a.color) ? "4px solid ".concat(coverColorForCss(card.cover.color)) : undefined,
                    boxShadow: theme.shadows[1],
                    transition: theme.transitions.create(['box-shadow', 'border-color'], {
                        duration: theme.transitions.duration.short
                    }),
                    '&:hover': {
                        boxShadow: theme.shadows[3],
                        borderColor: 'action.hover'
                    }
                });
            } },
            React.createElement(CardHeader, { action: React.createElement(CardActions, { card: card, cardDetails: cardDetailsData, onMenuOpen: loadCardDetailsData, onDetailsChanged: handleDetailsChanged, onPackageChanged: handlePackageChanged, onNestedDialogChange: handleNestedDialogChange }), title: card.name, titleTypographyProps: { variant: 'body2', fontWeight: 600 }, sx: { py: 1, cursor: 'pointer', '& .MuiCardHeader-action': { alignSelf: 'center', m: 0 } }, onClick: function () { return openDetails(); } }),
            card.badges.attachments > 0 && (React.createElement(CardActions$1, { disableSpacing: true, onClick: handleShowMoreClick },
                React.createElement(IconButton, { size: "small", "aria-label": "attachments" },
                    React.createElement(Badge, { badgeContent: card.badges.attachments, color: "primary" },
                        React.createElement(AttachmentRoundedIcon, null))))))),
        React.createElement(Dialog, { open: detailsOpen, onClose: handleDialogClose, disableRestoreFocus: true, fullWidth: true, maxWidth: "sm", scroll: "paper", "aria-labelledby": "workflow-package-details-title", PaperProps: {
                sx: { borderRadius: 2, maxWidth: '100%', overflow: 'hidden' }
            } },
            React.createElement(DialogTitle, { id: "workflow-package-details-title", sx: function (theme) {
                    var _a;
                    var cover = coverColorToMuiColor((_a = card.cover) === null || _a === void 0 ? void 0 : _a.color);
                    if (cover) {
                        return {
                            py: 1.5,
                            pr: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 1,
                            backgroundColor: cover,
                            color: theme.palette.getContrastText(cover),
                            borderBottom: "1px solid ".concat(theme.palette.divider)
                        };
                    }
                    return {
                        py: 1.5,
                        pr: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 1,
                        borderBottom: "1px solid ".concat(theme.palette.divider)
                    };
                } },
                React.createElement(Box, { sx: { flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 0.5 } }, editingTitle ? (React.createElement(React.Fragment, null,
                    React.createElement(TextField, { value: packageTitle, onChange: function (event) { return setPackageTitle(event.target.value); }, onKeyDown: handleTitleKeyDown, onClick: function (event) { return event.stopPropagation(); }, disabled: savingTitle, variant: "standard", fullWidth: true, autoFocus: true, placeholder: "Package title", inputProps: {
                            maxLength: PACKAGE_TITLE_MAX_LENGTH,
                            'aria-label': 'Package title'
                        }, sx: {
                            flex: 1,
                            minWidth: 0,
                            '& .MuiInput-root': { color: 'inherit' },
                            '& .MuiInput-root:before': { borderColor: 'rgba(128,128,128,0.42)' },
                            '& .MuiInput-root:hover:not(.Mui-disabled):before': { borderColor: 'rgba(128,128,128,0.87)' },
                            '& .MuiInput-root:after': { borderColor: 'primary.main' },
                            '& .MuiInput-input': {
                                fontWeight: 600,
                                fontSize: '1rem',
                                py: 0.25,
                                wordBreak: 'break-word'
                            }
                        } }),
                    React.createElement(Tooltip, { title: "Save title" },
                        React.createElement("span", null,
                            React.createElement(IconButton, { size: "small", onClick: confirmEditingTitle, disabled: savingTitle, "aria-label": "Save title", sx: { color: 'inherit' } },
                                React.createElement(CheckRoundedIcon, { fontSize: "small" })))),
                    React.createElement(Tooltip, { title: "Cancel" },
                        React.createElement("span", null,
                            React.createElement(IconButton, { size: "small", onClick: cancelEditingTitle, disabled: savingTitle, "aria-label": "Cancel title edit", sx: { color: 'inherit' } },
                                React.createElement(CloseRoundedIcon, { fontSize: "small" })))))) : (React.createElement(React.Fragment, null,
                    React.createElement(Typography, { id: "workflow-package-details-title-text", variant: "subtitle1", component: "span", sx: { flex: 1, minWidth: 0, fontWeight: 600, wordBreak: 'break-word' } }, packageTitle),
                    React.createElement(Tooltip, { title: "Rename package" },
                        React.createElement(IconButton, { size: "small", onClick: startEditingTitle, "aria-label": "Rename package", sx: { color: 'inherit' } },
                            React.createElement(EditRoundedIcon, { fontSize: "small" })))))),
                React.createElement(Box, { sx: { flexShrink: 0 } },
                    React.createElement(CardActions, { card: card, cardDetails: cardDetailsData, onMenuOpen: loadCardDetailsData, onDetailsChanged: handleDetailsChanged, onPackageChanged: handlePackageChanged, onNestedDialogChange: handleNestedDialogChange, variant: "button" }))),
            React.createElement(DialogContent, { dividers: true, sx: {
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    maxHeight: { xs: 'min(72vh, 560px)', sm: 'min(65vh, 520px)' },
                    scrollbarWidth: 'thin',
                    px: 2,
                    py: 1.5,
                    minWidth: 0
                } },
                React.createElement(CardDetails, { card: card, cardDetails: cardDetailsData, description: packageDescription, onSaveDescription: handleSaveDescription, savingDescription: savingDescription, dueOn: packageDueOn, onDueOnChange: handleDueOnChange, savingDueOn: savingDueOn, auditRefreshKey: auditRefreshKey, onRemoveAttachment: handleRemoveAttachment, onRemoveContentItem: handleRemoveContentItem, onAddComment: handleAddComment, onResolveComment: handleResolveComment, onArchiveComment: handleArchiveComment, showArchivedComments: showArchivedComments, onShowArchivedCommentsChange: handleShowArchivedCommentsChange, onCreateTask: handleCreateTask, onCompleteTask: handleCompleteTask, onArchiveTask: handleArchiveTask, onTasksChange: function () { return loadTasksOnly(); }, showArchivedTasks: showArchivedTasks, onShowArchivedTasksChange: handleShowArchivedTasksChange })),
            React.createElement(DialogActions, { sx: { px: 2, py: 1.5, justifyContent: 'flex-end' } },
                React.createElement(Button, { onClick: handleCardCloseClick, variant: "contained", color: "primary", size: "medium" }, "Close")))));
};

var SHOW_SYSTEM_NOTIFICATION = 'SHOW_SYSTEM_NOTIFICATION';
/**
 * Show Studio's bottom-left snackbar (notistack via GlobalDialogManager).
 * Widget plugins publish through the host bus when available; otherwise Redux dispatch.
 * Do not use both — Studio listens to both and would show duplicate snackbars.
 */
function showStudioErrorSnack(message) {
    var _a, _b, _c;
    var text = message === null || message === void 0 ? void 0 : message.trim();
    if (!text) {
        return;
    }
    var craftercms = window.craftercms;
    var action = {
        type: SHOW_SYSTEM_NOTIFICATION,
        payload: {
            message: text,
            options: {
                variant: 'error',
                autoHideDuration: 8000
            }
        }
    };
    var bus = (_c = (_b = (_a = craftercms === null || craftercms === void 0 ? void 0 : craftercms.utils) === null || _a === void 0 ? void 0 : _a.subjects) === null || _b === void 0 ? void 0 : _b.getHostToHostBus) === null || _c === void 0 ? void 0 : _c.call(_b);
    if (bus) {
        bus.next(action);
        return;
    }
    var store = typeof (craftercms === null || craftercms === void 0 ? void 0 : craftercms.getStore) === 'function' ? craftercms.getStore() : null;
    if (store === null || store === void 0 ? void 0 : store.dispatch) {
        store.dispatch(action);
        return;
    }
    window.alert(text);
}

function moveCardBetweenLists(lists, cardId, sourceListId, targetListId, targetIndex) {
    var sourceList = lists.find(function (list) { return list.id === sourceListId; });
    var card = sourceList === null || sourceList === void 0 ? void 0 : sourceList.cards.find(function (item) { return item.id === cardId; });
    if (!sourceList || !card || !lists.some(function (list) { return list.id === targetListId; })) {
        return null;
    }
    return lists.map(function (list) {
        if (list.id === sourceListId) {
            return __assign(__assign({}, list), { cards: list.cards.filter(function (item) { return item.id !== cardId; }) });
        }
        if (list.id === targetListId) {
            var cards = list.cards.filter(function (item) { return item.id !== cardId; });
            var nextCards = __spreadArray([], cards, true);
            nextCards.splice(targetIndex, 0, card);
            return __assign(__assign({}, list), { cards: nextCards });
        }
        return list;
    });
}
var Board = function (_a) {
    var boardId = _a.boardId, workflowIdProp = _a.workflowId, initialOpenPackageId = _a.openPackageId;
    var siteId = useActiveSiteId();
    var workflowId = workflowIdProp || boardId;
    var _b = useState(), error = _b[0], setError = _b[1];
    var _c = useState(true), loading = _c[0], setLoading = _c[1];
    var _d = useState(false), creating = _d[0], setCreating = _d[1];
    var _e = React.useState(false), createCardOpen = _e[0], setCreateCardOpen = _e[1];
    var _f = React.useState(''), newCardTitle = _f[0], setNewCardTitle = _f[1];
    var _g = React.useState(''), newCardDescription = _g[0], setNewCardDescription = _g[1];
    var _h = React.useState('blue'), newCardColor = _h[0]; _h[1];
    var _j = React.useState(''), newCardList = _j[0], setNewCardList = _j[1];
    var _k = React.useState(initialOpenPackageId !== null && initialOpenPackageId !== void 0 ? initialOpenPackageId : null), openPackageId = _k[0], setOpenPackageId = _k[1];
    var pendingOpenPackageId = React.useRef(initialOpenPackageId !== null && initialOpenPackageId !== void 0 ? initialOpenPackageId : null);
    var _l = React.useState(null), pendingStepActionMove = _l[0], setPendingStepActionMove = _l[1];
    var pendingStepActionMoveRef = React.useRef(null);
    var _m = React.useState(false), movingCard = _m[0], setMovingCard = _m[1];
    var _o = React.useState(null), draggingCardId = _o[0], setDraggingCardId = _o[1];
    var _p = useState({
        board: null,
        lists: null,
        currentUserGroups: []
    }), state = _p[0], setState = _p[1];
    useEffect(function () {
        if (initialOpenPackageId) {
            pendingOpenPackageId.current = initialOpenPackageId;
            setOpenPackageId(initialOpenPackageId);
        }
    }, [initialOpenPackageId]);
    useEffect(function () {
        var _a;
        if (!pendingOpenPackageId.current || loading || !((_a = state.lists) === null || _a === void 0 ? void 0 : _a.length)) {
            return;
        }
        var packageId = pendingOpenPackageId.current;
        var found = state.lists.some(function (list) { return list.cards.some(function (card) { return card.id === packageId; }); });
        if (found) {
            setOpenPackageId(packageId);
            pendingOpenPackageId.current = null;
        }
    }, [loading, state.lists]);
    useEffect(function () {
        pendingStepActionMoveRef.current = pendingStepActionMove;
    }, [pendingStepActionMove]);
    var applyListsUpdate = function (lists) {
        setState(function (prev) { return (__assign(__assign({}, prev), { lists: lists, currentUserGroups: prev.currentUserGroups })); });
    };
    var onDragEnd = function (result) {
        var _a, _b;
        if (!result.destination) {
            return;
        }
        var cardId = result.draggableId;
        var targetListIdIndex = result.destination.index;
        var targetListId = result.destination.droppableId;
        var sourceListIndex = result.source.index;
        var sourceListId = result.source.droppableId;
        if (sourceListId === targetListId && sourceListIndex === targetListIdIndex) {
            return;
        }
        var sourceList = (_a = state.lists) === null || _a === void 0 ? void 0 : _a.find(function (list) { return list.id === sourceListId; });
        var targetList = (_b = state.lists) === null || _b === void 0 ? void 0 : _b.find(function (list) { return list.id === targetListId; });
        var card = sourceList === null || sourceList === void 0 ? void 0 : sourceList.cards.find(function (item) { return item.id === cardId; });
        if (sourceListId !== targetListId && targetList && card) {
            var blocked = isListMoveBlockedForPackage(targetList, { contentPaths: card.contentPaths, contentTypes: card.contentTypes }, state.currentUserGroups);
            if (blocked.blocked) {
                notifyUserError(blocked.message || CONTENT_RULE_BLOCKED_MESSAGE);
                return;
            }
        }
        if (sourceListId !== targetListId &&
            targetList &&
            card &&
            hasPublishStepAction(targetList.actionType)) {
            var actionLabel = getStepActionLabel(targetList.actionType);
            if (actionLabel && state.lists) {
                var nextLists = moveCardBetweenLists(state.lists, cardId, sourceListId, targetListId, targetListIdIndex);
                if (nextLists) {
                    applyListsUpdate(nextLists);
                }
                setPendingStepActionMove({
                    cardId: cardId,
                    sourceListId: sourceListId,
                    sourceIndex: sourceListIndex,
                    targetListId: targetListId,
                    targetIndex: targetListIdIndex,
                    cardName: card.name,
                    stepName: targetList.name,
                    actionLabel: actionLabel
                });
                return;
            }
        }
        moveCard(cardId, sourceListId, targetListId, targetListIdIndex);
    };
    var handleCancelStepActionMove = function () {
        var pending = pendingStepActionMove;
        if (pending && state.lists) {
            var revertedLists = moveCardBetweenLists(state.lists, pending.cardId, pending.targetListId, pending.sourceListId, pending.sourceIndex);
            if (revertedLists) {
                applyListsUpdate(revertedLists);
            }
        }
        setPendingStepActionMove(null);
    };
    var handleConfirmStepActionMove = function () {
        if (!pendingStepActionMove) {
            return;
        }
        var cardId = pendingStepActionMove.cardId, sourceListId = pendingStepActionMove.sourceListId, targetListId = pendingStepActionMove.targetListId, targetIndex = pendingStepActionMove.targetIndex;
        setPendingStepActionMove(null);
        moveCard(cardId, sourceListId, targetListId, targetIndex, { skipOptimistic: true });
    };
    var handleCreateCard = function () {
        var title = newCardTitle.trim() || 'New Package';
        if (!newCardList) {
            setError({ code: '1001', message: 'No workflow step selected' });
            return;
        }
        addCardToList(newCardList, title, newCardDescription.trim(), newCardColor);
    };
    var handleAddCardToList = function (listId) {
        setNewCardList(listId);
        setNewCardTitle('');
        setNewCardDescription('');
        setCreateCardOpen(true);
    };
    var handleAddCardToListCancel = function () {
        setCreateCardOpen(false);
    };
    var notifyUserError = useCallback$1(function (message) {
        showStudioErrorSnack(message);
    }, []);
    var showStepActionFailure = function (response) {
        var message = getPackageActionFailureMessage(response);
        if (message) {
            notifyUserError(message);
        }
    };
    var addCardToList = function (listId, title, desc, color) {
        if (!siteId) {
            setError({ code: '1001', message: 'Site is not available' });
            return;
        }
        setCreating(true);
        createPackage(siteId, listId, title, desc, color).subscribe({
            next: function (response) {
                setCreating(false);
                setError(undefined);
                setCreateCardOpen(false);
                setNewCardTitle('');
                setNewCardDescription('');
                showStepActionFailure(response);
                notifyWorkflowsUpdated();
                loadBoardData();
            },
            error: function (e) {
                var _a, _b;
                console.error(e);
                setCreating(false);
                setError((_b = (_a = e.response) === null || _a === void 0 ? void 0 : _a.response) !== null && _b !== void 0 ? _b : { code: '?', message: 'Failed to create package. Check browser console.' });
            }
        });
    };
    var moveCard = function (cardId, sourceListId, targetListId, targetListIdIndex, options) {
        if (!(options === null || options === void 0 ? void 0 : options.skipOptimistic) && state.lists) {
            var nextLists = moveCardBetweenLists(state.lists, cardId, sourceListId, targetListId, targetListIdIndex);
            if (nextLists) {
                applyListsUpdate(nextLists);
            }
        }
        setMovingCard(true);
        movePackage(siteId, cardId, targetListId, targetListIdIndex).subscribe({
            next: function (response) {
                setMovingCard(false);
                showStepActionFailure(response);
                loadBoardData();
            },
            error: function (e) {
                var _a, _b;
                console.error(e);
                setMovingCard(false);
                var apiError = (_b = (_a = e.response) === null || _a === void 0 ? void 0 : _a.response) !== null && _b !== void 0 ? _b : { code: '?', message: 'Failed to move package. Check browser console.' };
                notifyUserError(apiError.message || 'Failed to move package.');
                setError(apiError);
                loadBoardData();
            }
        });
    };
    var loadBoardData = function () {
        if (!siteId) {
            return;
        }
        loadBoard(siteId, workflowId).subscribe({
            next: function (response) {
                var _a;
                var mapped = mapBoardResponse(response.response.result);
                var lists = mapped.lists;
                var pending = pendingStepActionMoveRef.current;
                if (pending) {
                    var previewLists = moveCardBetweenLists(lists, pending.cardId, pending.sourceListId, pending.targetListId, pending.targetIndex);
                    if (previewLists) {
                        lists = previewLists;
                    }
                }
                setError(undefined);
                setState({
                    board: mapped.board,
                    lists: lists,
                    currentUserGroups: (_a = mapped.currentUserGroups) !== null && _a !== void 0 ? _a : []
                });
                setLoading(false);
            },
            error: function (e) {
                var _a, _b;
                console.error(e);
                setLoading(false);
                setError((_b = (_a = e.response) === null || _a === void 0 ? void 0 : _a.response) !== null && _b !== void 0 ? _b : { code: '?', message: 'Unknown Error. Check browser console.' });
            }
        });
    };
    useEffect(function () {
        if (!siteId) {
            return;
        }
        setLoading(true);
        loadBoardData();
        var intervalRef = setInterval(function () {
            if (!pendingStepActionMoveRef.current) {
                loadBoardData();
            }
        }, 5000);
        return function () { return clearInterval(intervalRef); };
    }, [siteId, workflowId]);
    var handlePackageBoardChanged = React.useCallback(function () {
        loadBoardData();
    }, [siteId, workflowId]);
    return (React.createElement(Box, { sx: function (theme) {
            var _a, _b, _c;
            return (__assign({ position: 'relative', display: 'flex', flexDirection: 'column', flex: 1, alignSelf: 'stretch', width: '100%', minWidth: 0, minHeight: '100%', height: '100%', boxSizing: 'border-box', margin: 0, paddingTop: theme.spacing(2.5), paddingLeft: theme.spacing(2.5), paddingRight: theme.spacing(2), paddingBottom: theme.spacing(2) }, (((_b = (_a = state.board) === null || _a === void 0 ? void 0 : _a.prefs) === null || _b === void 0 ? void 0 : _b.backgroundImage)
                ? {
                    backgroundImage: "url(".concat(state.board.prefs.backgroundImage, ")"),
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'local'
                }
                : state.board
                    ? {
                        bgcolor: resolveBoardBackgroundColor((_c = state.board.prefs) === null || _c === void 0 ? void 0 : _c.backgroundColor)
                    }
                    : {
                        bgcolor: 'background.default'
                    })));
        } },
        React.createElement(DragDropContext, { onDragStart: function (start) { return setDraggingCardId(start.draggableId); }, onDragEnd: function (result) {
                setDraggingCardId(null);
                onDragEnd(result);
            } },
            React.createElement(Box, { sx: {
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    minHeight: 0,
                    width: '100%',
                    overflow: 'hidden'
                } },
                error && React.createElement(ApiResponseErrorState, { error: error }),
                loading && !state.lists && !error && (React.createElement(Box, { sx: {
                        display: 'flex',
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: 200
                    } },
                    React.createElement(CircularProgress, { size: 32 }))),
                React.createElement(Box, { sx: {
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'nowrap',
                        alignItems: 'stretch',
                        gap: 1.5,
                        minWidth: 0,
                        flex: 1,
                        minHeight: 0,
                        overflowX: 'auto',
                        overflowY: 'hidden',
                        scrollbarWidth: 'thin',
                        WebkitOverflowScrolling: 'touch',
                        '&::-webkit-scrollbar': { height: 6 },
                        '&::-webkit-scrollbar-thumb': {
                            borderRadius: 6,
                            backgroundColor: 'action.selected'
                        }
                    } }, state.lists &&
                    state.lists.map(function (list) {
                        var _a;
                        var draggingCard = draggingCardId
                            ? (_a = state.lists) === null || _a === void 0 ? void 0 : _a.flatMap(function (entry) { return entry.cards; }).find(function (card) { return card.id === draggingCardId; })
                            : undefined;
                        var moveBlocked = draggingCard &&
                            isListMoveBlockedForPackage(list, {
                                contentPaths: draggingCard.contentPaths,
                                contentTypes: draggingCard.contentTypes
                            }, state.currentUserGroups);
                        var isDropDisabled = !!(moveBlocked === null || moveBlocked === void 0 ? void 0 : moveBlocked.blocked);
                        return (React.createElement(Paper, { key: list.id, elevation: 0, sx: function (theme) { return ({
                                flex: '1 1 200px',
                                minWidth: 176,
                                maxWidth: 300,
                                maxHeight: 'min(70vh, 640px)',
                                minHeight: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                p: 1.25,
                                pt: 1,
                                pl: 1,
                                borderRadius: 2,
                                border: "1px solid ".concat(theme.palette.divider),
                                borderLeft: "4px solid ".concat(resolveStepColor(list.color)),
                                bgcolor: isDropDisabled
                                    ? theme.palette.action.disabledBackground
                                    : theme.palette.mode === 'dark'
                                        ? 'rgba(18, 18, 18, 0.94)'
                                        : 'rgba(255, 255, 255, 0.92)',
                                opacity: isDropDisabled ? 0.55 : 1,
                                boxShadow: theme.shadows[1]
                            }); } },
                            React.createElement(Stack, { direction: "row", alignItems: "center", justifyContent: "space-between", spacing: 0.5, sx: { mb: 0.75, flexShrink: 0, minWidth: 0, pr: 0.25 } },
                                React.createElement(Typography, { variant: "subtitle2", component: "h2", sx: {
                                        fontWeight: 600,
                                        letterSpacing: 0.02,
                                        minWidth: 0,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    } }, list.name),
                                hasPublishStepAction(list.actionType) && (React.createElement(Tooltip, { arrow: true, placement: "top", enterDelay: 200, title: React.createElement(Stack, { component: "span", spacing: 0.25, sx: { py: 0.25 } },
                                        React.createElement(Typography, { component: "span", variant: "caption", sx: { fontWeight: 600, display: 'block' } }, "Automatic actions"),
                                        getStepActionDescriptions(list.actionType).map(function (description) { return (React.createElement(Typography, { key: description, component: "span", variant: "caption", sx: { display: 'block' } },
                                            "\u2022 ",
                                            description)); })) },
                                    React.createElement(IconButton, { size: "small", "aria-label": "Automatic actions for ".concat(list.name), sx: function (theme) { return ({
                                            flexShrink: 0,
                                            p: 0.35,
                                            color: theme.palette.text.secondary,
                                            '&:hover': {
                                                color: theme.palette.primary.main,
                                                bgcolor: 'action.hover'
                                            }
                                        }); } },
                                        React.createElement(SettingsRoundedIcon, { sx: { fontSize: 17 } }))))),
                            isDropDisabled && (React.createElement(Typography, { variant: "caption", color: "text.secondary", sx: { mb: 0.75, px: 0.25, lineHeight: 1.3 } }, (moveBlocked === null || moveBlocked === void 0 ? void 0 : moveBlocked.message) || CONTENT_RULE_BLOCKED_MESSAGE)),
                            React.createElement(ConnectedDroppable, { droppableId: list.id, isDropDisabled: isDropDisabled }, function (provided) { return (React.createElement(Box, __assign({ sx: function (theme) {
                                    var _a;
                                    return (_a = {
                                            flex: 1,
                                            minHeight: 0,
                                            display: 'flex',
                                            flexDirection: 'column'
                                        },
                                        _a[".".concat(cardClasses.root, ":not(:last-child)")] = { mb: 1 },
                                        _a.overflowY = 'auto',
                                        _a.overflowX = 'hidden',
                                        _a.pr = 0.5,
                                        _a.scrollbarWidth = 'thin',
                                        _a['&::-webkit-scrollbar'] = { width: 6 },
                                        _a['&::-webkit-scrollbar-thumb'] = {
                                            borderRadius: 8,
                                            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[400]
                                        },
                                        _a);
                                } }, provided.droppableProps, { ref: provided.innerRef }),
                                list.cards &&
                                    list.cards.map(function (card, cardIndex) { return (React.createElement(PublicDraggable, { key: card.id, draggableId: card.id, index: cardIndex }, function (provided) { return (React.createElement("div", __assign({ ref: provided.innerRef }, provided.draggableProps, provided.dragHandleProps),
                                        React.createElement(Box, { sx: { py: 0.25 } },
                                            React.createElement(BoardCard, { card: card, detailsOpen: openPackageId === card.id, onDetailsOpen: function () { return setOpenPackageId(card.id); }, onDetailsClose: function () { return setOpenPackageId(null); }, onPackageChanged: handlePackageBoardChanged })),
                                        provided.placeholder)); })); }),
                                React.createElement(Box, { sx: { minHeight: 12, flexShrink: 0 }, "aria-hidden": true }))); }),
                            list.allowAddPackage && (React.createElement(Button, { size: "small", variant: "text", "aria-label": "add package", onClick: function () { return handleAddCardToList(list.id); }, sx: function (theme) { return ({
                                    flexShrink: 0,
                                    alignSelf: 'stretch',
                                    mt: 'auto',
                                    py: 0.75,
                                    borderTop: "1px solid ".concat(theme.palette.divider),
                                    borderRadius: 0,
                                    justifyContent: 'flex-start',
                                    fontWeight: 600
                                }); } }, "Add package"))));
                    })))),
        state.board && (React.createElement(Tooltip, { title: "Refresh board" },
            React.createElement(Fab, { onClick: loadBoardData, "aria-label": "Refresh board", size: "medium", sx: function (theme) { return ({
                    position: 'fixed',
                    bottom: 24,
                    right: 24,
                    zIndex: theme.zIndex.modal + 2
                }); }, color: "primary" },
                React.createElement(RefreshRoundedIcon, null)))),
        React.createElement(Dialog, { open: createCardOpen, onClose: handleAddCardToListCancel, fullWidth: true, maxWidth: "sm" },
            React.createElement(DialogTitle, null, "New package"),
            React.createElement(DialogContent, null,
                React.createElement(Stack, { spacing: 2, sx: { mt: 1 } },
                    React.createElement(TextField, { value: newCardTitle, onChange: function (e) { return setNewCardTitle(e.target.value); }, label: "Title", placeholder: "New package", variant: "outlined", fullWidth: true, autoFocus: true }),
                    React.createElement(TextField, { value: newCardDescription, onChange: function (e) { return setNewCardDescription(e.target.value); }, label: "Description", variant: "outlined", fullWidth: true, multiline: true, minRows: 2 }))),
            React.createElement(DialogActions, null,
                React.createElement(Button, { onClick: handleAddCardToListCancel, disabled: creating }, "Cancel"),
                React.createElement(Button, { onClick: handleCreateCard, disabled: creating }, creating ? 'Creating…' : 'Create'))),
        React.createElement(Dialog, { open: !!pendingStepActionMove, onClose: handleCancelStepActionMove, fullWidth: true, maxWidth: "sm" },
            React.createElement(DialogTitle, null, "Confirm automatic step action"),
            React.createElement(DialogContent, null,
                React.createElement(Typography, { variant: "body1", sx: { mt: 0.5 } },
                    "Moving ",
                    React.createElement("strong", null, pendingStepActionMove === null || pendingStepActionMove === void 0 ? void 0 : pendingStepActionMove.cardName),
                    " to",
                    ' ',
                    React.createElement("strong", null, pendingStepActionMove === null || pendingStepActionMove === void 0 ? void 0 : pendingStepActionMove.stepName),
                    " will automatically perform",
                    ' ',
                    React.createElement("strong", null, pendingStepActionMove === null || pendingStepActionMove === void 0 ? void 0 : pendingStepActionMove.actionLabel),
                    " on the package's attached content."),
                React.createElement(Typography, { variant: "body2", color: "text.secondary", sx: { mt: 1.5 } }, "Do you want to continue?")),
            React.createElement(DialogActions, null,
                React.createElement(Button, { onClick: handleCancelStepActionMove, disabled: movingCard }, "Cancel"),
                React.createElement(Button, { onClick: handleConfirmStepActionMove, variant: "contained", disabled: movingCard }, movingCard ? 'Moving…' : 'Confirm')))));
};

var WORKFLOW_LABEL = 'Workflow';
var DEFAULT_WORKFLOW_ICON = '@mui/icons-material/AccountTreeOutlined';
function resolveWorkflowIcon(props) {
    var _a;
    var icon = props.icon;
    return ((_a = icon === null || icon === void 0 ? void 0 : icon.id) === null || _a === void 0 ? void 0 : _a.trim()) ? icon.id : DEFAULT_WORKFLOW_ICON;
}
function OpenBoardDialogPanelButton(props) {
    var dispatch = useDispatch();
    var siteId = useActiveSiteId();
    var workflowIcon = resolveWorkflowIcon(props);
    var _a = useState([]), workflows = _a[0], setWorkflows = _a[1];
    var _b = useState(false), loading = _b[0], setLoading = _b[1];
    var _c = useState(false), expanded = _c[0], setExpanded = _c[1];
    var loadWorkflows = useCallback$1(function () {
        if (!siteId) {
            setWorkflows([]);
            return;
        }
        setLoading(true);
        listWorkflows(siteId).subscribe({
            next: function (response) {
                var _a, _b, _c;
                setWorkflows((_c = (_b = (_a = response.response) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b.workflows) !== null && _c !== void 0 ? _c : []);
                setLoading(false);
            },
            error: function (e) {
                console.error(e);
                setWorkflows([]);
                setLoading(false);
            }
        });
    }, [siteId]);
    useEffect(function () {
        loadWorkflows();
    }, [loadWorkflows]);
    var openBoard = function (workflow) {
        openWorkflowBoard(dispatch, workflow.name, { workflowId: workflow.id });
    };
    var singleWorkflow = workflows.length === 1 ? workflows[0] : null;
    var multipleWorkflows = workflows.length > 1;
    var handlePrimaryClick = function () {
        if (loading) {
            return;
        }
        if (singleWorkflow) {
            openBoard(singleWorkflow);
            return;
        }
        if (multipleWorkflows) {
            setExpanded(function (prev) { return !prev; });
            return;
        }
        openWorkflowBoard(dispatch, WORKFLOW_LABEL, { workflowId: '' });
    };
    var toggleExpanded = function () {
        if (multipleWorkflows) {
            setExpanded(function (prev) { return !prev; });
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(ToolsPanelListItemButton, { icon: { id: workflowIcon }, title: WORKFLOW_LABEL, disabled: loading, onClick: handlePrimaryClick, onSecondaryActionClick: multipleWorkflows ? toggleExpanded : undefined, secondaryActionIcon: multipleWorkflows ? (React.createElement(ExpandMoreRoundedIcon, { sx: {
                    transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s'
                } })) : (React.createElement(ChevronRightRounded, null)) }),
        multipleWorkflows && (React.createElement(Collapse, { in: expanded, timeout: "auto", unmountOnExit: true },
            React.createElement(List$1, { disablePadding: true, dense: true }, workflows.map(function (workflow) { return (React.createElement(ListItemButton$1, { key: workflow.id, sx: { pl: 5, py: 0.75 }, onClick: function () { return openBoard(workflow); } },
                React.createElement(ListItemText, { primary: workflow.name, primaryTypographyProps: { variant: 'body2', noWrap: true } }))); }))))));
}

/** Avoid bundling studio-ui useSelection (uses import.meta.env, breaks plugin load). */
function usePreviewContentPath() {
    return useSelector(function (state) { var _a, _b; return (_b = (_a = state.preview) === null || _a === void 0 ? void 0 : _a.guest) === null || _b === void 0 ? void 0 : _b.path; });
}
function buildOpenIcePanelAction(title, panelWidgetId, siteId) {
    var _a, _b, _c, _d;
    var craftercms = window.craftercms;
    if (!((_b = (_a = craftercms === null || craftercms === void 0 ? void 0 : craftercms.libs) === null || _a === void 0 ? void 0 : _a.ReduxToolkit) === null || _b === void 0 ? void 0 : _b.createAction) || !((_d = (_c = craftercms === null || craftercms === void 0 ? void 0 : craftercms.utils) === null || _c === void 0 ? void 0 : _c.state) === null || _d === void 0 ? void 0 : _d.createToolsPanelPage)) {
        throw new Error('CrafterCMS Studio API not available. Ensure the plugin is loaded within Studio.');
    }
    var createAction = craftercms.libs.ReduxToolkit.createAction;
    var createToolsPanelPage = craftercms.utils.state.createToolsPanelPage;
    var batchActions = createAction('BATCH_ACTIONS');
    var setPreviewEditMode = createAction('EDIT_MODE_CHANGED');
    var pushIcePanelPage = createAction('PUSH_ICE_PANEL_PAGE');
    return batchActions([
        setPreviewEditMode({ editMode: true }),
        pushIcePanelPage(createToolsPanelPage(title, [createCrafterwfWidgetDescriptor(panelWidgetId, siteId)], 'icePanel'))
    ]);
}
/** @deprecated Use buildOpenIcePanelAction */
function buildOpenCommentsIcePanelAction(title, panelWidgetId, siteId) {
    return buildOpenIcePanelAction(title, panelWidgetId, siteId);
}

function coverColorDot(color) {
    if (!color) {
        return undefined;
    }
    return resolveStepColor(color) || color;
}
var ContentCommentsPanel = function () {
    var siteId = useActiveSiteId();
    var contentPath = usePreviewContentPath();
    var _a = useState([]), contentComments = _a[0], setContentComments = _a[1];
    var _b = useState([]), packages = _b[0], setPackages = _b[1];
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    var _d = useState(null), error = _d[0], setError = _d[1];
    var _e = useState(false), expandedId = _e[0], setExpandedId = _e[1];
    var _f = useState(false), showArchived = _f[0], setShowArchived = _f[1];
    var loadData = useCallback$1(function () {
        if (!siteId || !contentPath) {
            setContentComments([]);
            setPackages([]);
            return;
        }
        setLoading(true);
        setError(null);
        findPackagesByContentPath(siteId, contentPath, true, showArchived).subscribe({
            next: function (response) {
                var _a, _b, _c;
                var result = (_a = response.response) === null || _a === void 0 ? void 0 : _a.result;
                setContentComments((_b = result === null || result === void 0 ? void 0 : result.contentComments) !== null && _b !== void 0 ? _b : []);
                var pkgList = (_c = result === null || result === void 0 ? void 0 : result.packages) !== null && _c !== void 0 ? _c : [];
                setPackages(pkgList);
                if (pkgList.length === 1) {
                    setExpandedId(pkgList[0].workflowPackageId);
                }
                setLoading(false);
            },
            error: function (e) {
                console.error(e);
                setError('Unable to load comments.');
                setContentComments([]);
                setPackages([]);
                setLoading(false);
            }
        });
    }, [contentPath, siteId, showArchived]);
    useEffect(function () {
        loadData();
    }, [loadData]);
    var refreshContentComments = function () {
        if (!siteId || !contentPath) {
            return;
        }
        listComments(siteId, COMMENT_TARGET.CONTENT, contentPath, true, showArchived).subscribe({
            next: function (response) {
                var _a, _b, _c;
                setContentComments((_c = (_b = (_a = response.response) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b.comments) !== null && _c !== void 0 ? _c : []);
            },
            error: function (e) {
                console.error(e);
            }
        });
    };
    var refreshPackageComments = function (workflowPackageId) {
        listPackageComments(siteId, workflowPackageId, true, showArchived).subscribe({
            next: function (response) {
                var _a, _b, _c;
                var comments = (_c = (_b = (_a = response.response) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b.comments) !== null && _c !== void 0 ? _c : [];
                setPackages(function (prev) {
                    return prev.map(function (pkg) { return (pkg.workflowPackageId === workflowPackageId ? __assign(__assign({}, pkg), { comments: comments }) : pkg); });
                });
            },
            error: function (e) {
                console.error(e);
            }
        });
    };
    var handleAddContentComment = function (body, mentionedUserIds) {
        if (!contentPath) {
            return;
        }
        createContentComment(siteId, contentPath, body, mentionedUserIds).subscribe({
            next: function () {
                refreshContentComments();
            },
            error: function (e) {
                console.error(e);
            }
        });
    };
    var handleAddPackageComment = function (workflowPackageId, body, mentionedUserIds) {
        createPackageComment(siteId, workflowPackageId, body, mentionedUserIds).subscribe({
            next: function () {
                refreshPackageComments(workflowPackageId);
            },
            error: function (e) {
                console.error(e);
            }
        });
    };
    var handleResolveComment = function (commentId, resolved) {
        resolveComment(siteId, commentId, resolved).subscribe({
            next: function () {
                refreshContentComments();
                packages.forEach(function (pkg) { return refreshPackageComments(pkg.workflowPackageId); });
            },
            error: function (e) {
                console.error(e);
            }
        });
    };
    var handleArchiveComment = function (commentId, archived) {
        archiveComment(siteId, commentId, archived).subscribe({
            next: function () {
                refreshContentComments();
                packages.forEach(function (pkg) { return refreshPackageComments(pkg.workflowPackageId); });
            },
            error: function (e) {
                console.error(e);
            }
        });
    };
    var handleShowArchivedChange = function (show) {
        setShowArchived(show);
    };
    if (!contentPath) {
        return (React.createElement(Box, { sx: { p: 2 } },
            React.createElement(Typography, { variant: "body2", color: "text.secondary" }, "Open a content item in preview to see comments.")));
    }
    if (loading) {
        return (React.createElement(Box, { sx: { display: 'flex', justifyContent: 'center', py: 4 } },
            React.createElement(CircularProgress, { size: 28 })));
    }
    if (error) {
        return (React.createElement(Box, { sx: { p: 2 } },
            React.createElement(Typography, { variant: "body2", color: "error" }, error)));
    }
    var hasPackageComments = packages.length > 0;
    return (React.createElement(Stack, { spacing: 1.5, sx: { px: 1, pb: 2, minWidth: 0 } },
        React.createElement(Typography, { variant: "caption", color: "text.secondary", sx: { px: 0.5, wordBreak: 'break-all' } }, contentPath),
        React.createElement(Stack, { spacing: 0.75 },
            React.createElement(Typography, { variant: "caption", color: "text.secondary", sx: { fontWeight: 600, letterSpacing: 0.06, textTransform: 'uppercase', px: 0.5 } }, "Page comments"),
            React.createElement(CommentsSection, { compact: true, comments: contentComments, onAddComment: handleAddContentComment, onResolveComment: handleResolveComment, onArchiveComment: handleArchiveComment, showArchived: showArchived, onShowArchivedChange: handleShowArchivedChange })),
        hasPackageComments && (React.createElement(React.Fragment, null,
            React.createElement(Divider, { flexItem: true }),
            React.createElement(Typography, { variant: "caption", color: "text.secondary", sx: { fontWeight: 600, letterSpacing: 0.06, textTransform: 'uppercase', px: 0.5 } }, "Workflow cards"),
            packages.map(function (pkg) {
                var _a, _b, _c;
                var open = expandedId === pkg.workflowPackageId;
                var commentCount = (_b = (_a = pkg.comments) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
                var dotColor = coverColorDot(pkg.coverColor);
                return (React.createElement(Accordion, { key: pkg.workflowPackageId, expanded: open, onChange: function (_event, isExpanded) { return setExpandedId(isExpanded ? pkg.workflowPackageId : false); }, disableGutters: true, sx: {
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: '8px !important',
                        '&:before': { display: 'none' },
                        overflow: 'hidden'
                    } },
                    React.createElement(AccordionSummary, { expandIcon: React.createElement(ExpandMoreRoundedIcon, null), sx: { minHeight: 48, '& .MuiAccordionSummary-content': { my: 0.75 } } },
                        React.createElement(Stack, { direction: "row", spacing: 1, alignItems: "center", sx: { minWidth: 0, pr: 0.5 } },
                            dotColor && (React.createElement(Box, { sx: {
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    bgcolor: dotColor,
                                    flexShrink: 0
                                } })),
                            React.createElement(Stack, { spacing: 0.15, sx: { minWidth: 0, flex: 1 } },
                                React.createElement(Typography, { variant: "body2", fontWeight: 600, noWrap: true }, pkg.title),
                                pkg.workflowStepName && (React.createElement(Typography, { variant: "caption", color: "text.secondary", noWrap: true }, pkg.workflowStepName))),
                            React.createElement(Chip, { label: commentCount, size: "small", variant: "outlined", sx: { height: 22, flexShrink: 0 } }))),
                    React.createElement(AccordionDetails, { sx: { pt: 0, px: 1.5, pb: 1.5 } },
                        React.createElement(CommentsSection, { compact: true, comments: (_c = pkg.comments) !== null && _c !== void 0 ? _c : [], onAddComment: function (body, mentionedUserIds) {
                                return handleAddPackageComment(pkg.workflowPackageId, body, mentionedUserIds);
                            }, onResolveComment: handleResolveComment, onArchiveComment: handleArchiveComment, showArchived: showArchived, onShowArchivedChange: handleShowArchivedChange }))));
            })))));
};

var CONTENT_COMMENTS_PANEL_WIDGET_ID = 'org.rd.plugin.crafterwf.contentCommentsPanel';
function ContentCommentsToolbarButton(props) {
    var dispatch = useDispatch();
    var siteId = useActiveSiteId();
    var title = typeof props.title === 'string' && props.title.trim() ? props.title : 'Comments';
    var openCommentsPanel = function () {
        dispatch(buildOpenCommentsIcePanelAction(title, CONTENT_COMMENTS_PANEL_WIDGET_ID, siteId !== null && siteId !== void 0 ? siteId : undefined));
    };
    return (React.createElement(Tooltip, { title: title },
        React.createElement("span", null,
            React.createElement(IconButton, __assign({ "aria-label": title, size: "large" }, props, { onClick: openCommentsPanel }),
                React.createElement(CommentRoundedIcon, null)))));
}

var NOTIFICATIONS_UPDATED_EVENT = 'crafterwf:notifications-updated';
function notifyNotificationsUpdated() {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent(NOTIFICATIONS_UPDATED_EVENT));
    }
}
function listNotifications(siteId, unreadOnly, includeResolved, includeArchived, markDisplayedAsRead) {
    if (unreadOnly === void 0) { unreadOnly = false; }
    if (includeResolved === void 0) { includeResolved = true; }
    if (includeArchived === void 0) { includeArchived = false; }
    if (markDisplayedAsRead === void 0) { markDisplayedAsRead = true; }
    var url = "".concat(PLUGIN_SERVICE_BASE, "/notification/list.json?siteId=").concat(encodeURIComponent(siteId)) +
        "&unreadOnly=".concat(unreadOnly ? 'true' : 'false') +
        "&includeResolved=".concat(includeResolved ? 'true' : 'false') +
        "&includeArchived=".concat(includeArchived ? 'true' : 'false') +
        "&markDisplayedAsRead=".concat(markDisplayedAsRead ? 'true' : 'false');
    return pluginGet(url);
}
function getUnreadNotificationCount(siteId) {
    var url = "".concat(PLUGIN_SERVICE_BASE, "/notification/unread-count.json?siteId=").concat(encodeURIComponent(siteId));
    return pluginGet(url);
}
function resolveNotification(siteId, notificationId, resolved) {
    var url = "".concat(PLUGIN_SERVICE_BASE, "/notification/resolve.json?siteId=").concat(encodeURIComponent(siteId)) +
        "&notificationId=".concat(encodeURIComponent(notificationId)) +
        "&resolved=".concat(resolved ? 'true' : 'false');
    return pluginPost(url);
}
function archiveNotification(siteId, notificationId, archived) {
    var url = "".concat(PLUGIN_SERVICE_BASE, "/notification/archive.json?siteId=").concat(encodeURIComponent(siteId)) +
        "&notificationId=".concat(encodeURIComponent(notificationId)) +
        "&archived=".concat(archived ? 'true' : 'false');
    return pluginPost(url);
}

var TASKS_PANEL_WIDGET_ID$1 = 'org.rd.plugin.crafterwf.tasksPanel';
var NOTIFICATION_TARGET = {
    CONTENT: COMMENT_TARGET.CONTENT,
    WORKFLOW_PACKAGE: COMMENT_TARGET.WORKFLOW_PACKAGE,
    TASK: 'task'
};
function notificationTargetTypeLabel(targetType) {
    switch (targetType) {
        case NOTIFICATION_TARGET.CONTENT:
            return 'Content';
        case NOTIFICATION_TARGET.WORKFLOW_PACKAGE:
            return 'Workflow Package';
        case NOTIFICATION_TARGET.TASK:
            return 'Task';
        default:
            return targetType || null;
    }
}
function notificationTargetLinkLabel(notification) {
    if (notification.targetTitle) {
        return notification.targetTitle;
    }
    if (notification.targetId) {
        return notification.targetId;
    }
    return 'Open';
}
function canOpenNotificationTarget(notification) {
    return Boolean(notification.targetType && notification.targetId);
}
function openNotificationTarget(dispatch, siteId, notification, previewPath) {
    var targetType = notification.targetType, targetId = notification.targetId, targetWorkflowId = notification.targetWorkflowId, targetPackageId = notification.targetPackageId;
    if (!targetType || !targetId || !siteId) {
        return;
    }
    switch (targetType) {
        case NOTIFICATION_TARGET.CONTENT:
            previewPath(targetId, notification.targetTitle || targetId);
            break;
        case NOTIFICATION_TARGET.WORKFLOW_PACKAGE:
            if (targetWorkflowId) {
                openWorkflowPackage(dispatch, targetWorkflowId, targetId);
            }
            else {
                getWorkflowPackage(siteId, targetId).subscribe({
                    next: function (response) {
                        var _a, _b, _c;
                        var workflowId = (_c = (_b = (_a = response.response) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b.workflowPackage) === null || _c === void 0 ? void 0 : _c.workflowId;
                        if (workflowId) {
                            openWorkflowPackage(dispatch, workflowId, targetId);
                        }
                    },
                    error: function (e) {
                        console.error(e);
                    }
                });
            }
            break;
        case NOTIFICATION_TARGET.TASK:
            if (targetWorkflowId && targetPackageId) {
                openWorkflowPackage(dispatch, targetWorkflowId, targetPackageId);
                break;
            }
            getTask(siteId, targetId).subscribe({
                next: function (response) {
                    var _a;
                    var task = (_a = response.response) === null || _a === void 0 ? void 0 : _a.result;
                    if ((task === null || task === void 0 ? void 0 : task.targetType) === TASK_TARGET.WORKFLOW_PACKAGE &&
                        task.targetId &&
                        task.targetWorkflowId) {
                        openWorkflowPackage(dispatch, task.targetWorkflowId, task.targetId);
                    }
                    else {
                        dispatch(buildOpenIcePanelAction('Tasks', TASKS_PANEL_WIDGET_ID$1, siteId));
                    }
                },
                error: function (e) {
                    console.error(e);
                    dispatch(buildOpenIcePanelAction('Tasks', TASKS_PANEL_WIDGET_ID$1, siteId));
                }
            });
            break;
    }
}

function formatDate$1(value) {
    if (!value) {
        return '';
    }
    var date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return value;
    }
    return date.toLocaleString();
}
var NotificationsPanel = function () {
    var siteId = useActiveSiteId();
    var dispatch = useDispatch();
    var previewPath = useStudioItemPreview().previewPath;
    var _a = useState([]), notifications = _a[0], setNotifications = _a[1];
    var _b = useState(false), loading = _b[0], setLoading = _b[1];
    var _c = useState(null), error = _c[0], setError = _c[1];
    var _d = useState(false), showArchived = _d[0], setShowArchived = _d[1];
    var loadNotifications = useCallback$1(function () {
        if (!siteId) {
            setNotifications([]);
            return;
        }
        setLoading(true);
        setError(null);
        listNotifications(siteId, false, true, showArchived, true).subscribe({
            next: function (response) {
                var _a, _b, _c;
                setNotifications((_c = (_b = (_a = response.response) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b.notifications) !== null && _c !== void 0 ? _c : []);
                setLoading(false);
                notifyNotificationsUpdated();
            },
            error: function (e) {
                console.error(e);
                setError('Unable to load notifications.');
                setNotifications([]);
                setLoading(false);
            }
        });
    }, [showArchived, siteId]);
    useEffect(function () {
        loadNotifications();
    }, [loadNotifications]);
    var handleOpenTarget = function (notification) {
        if (!canOpenNotificationTarget(notification)) {
            return;
        }
        openNotificationTarget(dispatch, siteId, notification, previewPath);
    };
    var handleResolve = function (notificationId, resolved) {
        resolveNotification(siteId, notificationId, resolved).subscribe({
            next: function () {
                loadNotifications();
            },
            error: function (e) {
                console.error(e);
            }
        });
    };
    var handleArchive = function (notificationId, archived) {
        archiveNotification(siteId, notificationId, archived).subscribe({
            next: function () {
                loadNotifications();
            },
            error: function (e) {
                console.error(e);
            }
        });
    };
    if (loading && notifications.length === 0) {
        return (React.createElement(Box, { sx: { display: 'flex', justifyContent: 'center', py: 4 } },
            React.createElement(CircularProgress, { size: 28 })));
    }
    if (error) {
        return (React.createElement(Box, { sx: { p: 2 } },
            React.createElement(Typography, { variant: "body2", color: "error" }, error)));
    }
    return (React.createElement(Stack, { spacing: 1.25, sx: { px: 1, pb: 2, minWidth: 0 } },
        React.createElement(Typography, { variant: "caption", color: "text.secondary", sx: { fontWeight: 600, letterSpacing: 0.06, textTransform: 'uppercase', px: 0.5 } }, "Notifications"),
        notifications.length === 0 ? (React.createElement(Typography, { variant: "body2", color: "text.secondary", sx: { px: 0.5, py: 1 } }, "No notifications.")) : (React.createElement(Stack, { spacing: 0.75 }, notifications.map(function (notification) {
            var typeLabel = notificationTargetTypeLabel(notification.targetType);
            var linkLabel = notificationTargetLinkLabel(notification);
            var canOpen = canOpenNotificationTarget(notification);
            return (React.createElement(Box, { key: notification.id, sx: {
                    p: 1,
                    borderRadius: 1,
                    bgcolor: notification.archived ? 'action.disabledBackground' : 'action.hover',
                    opacity: notification.archived ? 0.85 : 1,
                    minWidth: 0
                } },
                React.createElement(Stack, { direction: "row", spacing: 0.75, alignItems: "center", flexWrap: "wrap", sx: { mb: 0.35 } },
                    React.createElement(Typography, { variant: "body2", fontWeight: 500, sx: { flex: 1, minWidth: 0 } }, notification.title),
                    notification.resolved && (React.createElement(Chip, { label: "Resolved", size: "small", color: "success", variant: "outlined", sx: { height: 20, fontSize: '0.65rem' } })),
                    notification.archived && (React.createElement(Chip, { label: "Archived", size: "small", variant: "outlined", sx: { height: 20, fontSize: '0.65rem' } }))),
                notification.message && (React.createElement(Typography, { variant: "body2", color: "text.secondary", sx: { whiteSpace: 'pre-wrap', wordBreak: 'break-word', mb: 0.5 } }, notification.message)),
                typeLabel && notification.targetId && (React.createElement(Typography, { variant: "caption", component: "div", sx: { display: 'block', mb: 0.5, wordBreak: 'break-word' } },
                    React.createElement(Box, { component: "span", color: "text.secondary" },
                        typeLabel,
                        ":",
                        ' '),
                    canOpen ? (React.createElement(Box, { component: "button", type: "button", onClick: function () { return handleOpenTarget(notification); }, sx: {
                            display: 'inline',
                            p: 0,
                            border: 'none',
                            background: 'none',
                            font: 'inherit',
                            fontSize: 'inherit',
                            lineHeight: 'inherit',
                            color: 'primary.main',
                            cursor: 'pointer',
                            fontWeight: 600,
                            textDecoration: 'underline',
                            textUnderlineOffset: 2,
                            wordBreak: 'break-all',
                            '&:hover': { color: 'primary.dark' }
                        } }, linkLabel)) : (React.createElement(Box, { component: "span", color: "text.secondary" }, linkLabel)))),
                React.createElement(Typography, { variant: "caption", color: "text.secondary" }, formatDate$1(notification.createdOn)),
                !notification.archived && (React.createElement(Stack, { direction: "row", spacing: 1, sx: { mt: 0.75, flexWrap: 'wrap' } },
                    React.createElement(Button, { size: "small", sx: { px: 0, minWidth: 0 }, onClick: function () { return handleResolve(notification.id, !notification.resolved); } }, notification.resolved ? 'Reopen' : 'Resolve'),
                    React.createElement(Button, { size: "small", sx: { px: 0, minWidth: 0 }, onClick: function () { return handleArchive(notification.id, true); } }, "Archive"))),
                notification.archived && (React.createElement(Button, { size: "small", sx: { mt: 0.75, px: 0, minWidth: 0 }, onClick: function () { return handleArchive(notification.id, false); } }, "Restore"))));
        }))),
        React.createElement(Button, { size: "small", sx: { alignSelf: 'flex-start', px: 0, minWidth: 0 }, onClick: function () { return setShowArchived(function (prev) { return !prev; }); } }, showArchived ? 'Hide archived' : 'Show archived')));
};

var NOTIFICATIONS_PANEL_WIDGET_ID = 'org.rd.plugin.crafterwf.notificationsPanel';
function NotificationsToolbarButton(props) {
    var dispatch = useDispatch();
    var siteId = useActiveSiteId();
    var title = typeof props.title === 'string' && props.title.trim() ? props.title : 'Notifications';
    var _a = useState(0), unreadCount = _a[0], setUnreadCount = _a[1];
    var refreshUnreadCount = useCallback$1(function () {
        if (!siteId) {
            setUnreadCount(0);
            return;
        }
        getUnreadNotificationCount(siteId).subscribe({
            next: function (response) {
                var _a, _b, _c;
                setUnreadCount((_c = (_b = (_a = response.response) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b.unreadCount) !== null && _c !== void 0 ? _c : 0);
            },
            error: function (e) {
                console.error(e);
            }
        });
    }, [siteId]);
    useEffect(function () {
        refreshUnreadCount();
        var intervalId = window.setInterval(refreshUnreadCount, 30000);
        var handleUpdated = function () { return refreshUnreadCount(); };
        window.addEventListener(NOTIFICATIONS_UPDATED_EVENT, handleUpdated);
        return function () {
            window.clearInterval(intervalId);
            window.removeEventListener(NOTIFICATIONS_UPDATED_EVENT, handleUpdated);
        };
    }, [refreshUnreadCount]);
    var openNotificationsPanel = function () {
        dispatch(buildOpenIcePanelAction(title, NOTIFICATIONS_PANEL_WIDGET_ID, siteId !== null && siteId !== void 0 ? siteId : undefined));
        refreshUnreadCount();
    };
    return (React.createElement(Tooltip, { title: title },
        React.createElement("span", null,
            React.createElement(IconButton, __assign({ "aria-label": title, size: "large" }, props, { onClick: openNotificationsPanel }),
                React.createElement(Badge, { badgeContent: unreadCount > 0 ? unreadCount : undefined, color: "error", max: 99 },
                    React.createElement(NotificationsNoneRoundedIcon, null))))));
}

var PRIORITY_RANK = {
    high: 0,
    medium: 1,
    low: 2
};
function parseTime(value) {
    if (!value) {
        return null;
    }
    var time = new Date(value).getTime();
    return Number.isNaN(time) ? null : time;
}
function compareTasksByDue(a, b) {
    var dueA = parseTime(a.dueOn);
    var dueB = parseTime(b.dueOn);
    if (dueA != null && dueB != null && dueA !== dueB) {
        return dueA - dueB;
    }
    if (dueA != null && dueB == null) {
        return -1;
    }
    if (dueA == null && dueB != null) {
        return 1;
    }
    var startA = parseTime(a.startOn);
    var startB = parseTime(b.startOn);
    if (startA != null && startB != null && startA !== startB) {
        return startA - startB;
    }
    if (a.complete !== b.complete) {
        return a.complete ? 1 : -1;
    }
    return a.title.localeCompare(b.title);
}
function compareTasksByPriority(a, b) {
    var _a, _b;
    var rankA = PRIORITY_RANK[(_a = a.priority) !== null && _a !== void 0 ? _a : 'medium'];
    var rankB = PRIORITY_RANK[(_b = b.priority) !== null && _b !== void 0 ? _b : 'medium'];
    if (rankA !== rankB) {
        return rankA - rankB;
    }
    return compareTasksByDue(a, b);
}
function sortTasks(tasks, sortBy) {
    var copy = __spreadArray([], tasks, true);
    copy.sort(sortBy === 'priority' ? compareTasksByPriority : compareTasksByDue);
    return copy;
}
function groupTasksByAssignee(tasks) {
    var byAssignee = new Map();
    tasks.forEach(function (task) {
        var existing = byAssignee.get(task.assigneeId);
        if (existing) {
            existing.tasks.push(task);
            return;
        }
        byAssignee.set(task.assigneeId, {
            assigneeId: task.assigneeId,
            assigneeUsername: task.assigneeUsername,
            tasks: [task]
        });
    });
    return Array.from(byAssignee.values());
}
function orderAssigneeGroups(groups, currentUserId, assigneeLabelFor) {
    var sorted = __spreadArray([], groups, true);
    sorted.sort(function (a, b) {
        if (currentUserId != null) {
            if (a.assigneeId === currentUserId && b.assigneeId !== currentUserId) {
                return -1;
            }
            if (b.assigneeId === currentUserId && a.assigneeId !== currentUserId) {
                return 1;
            }
        }
        return assigneeLabelFor(a).localeCompare(assigneeLabelFor(b));
    });
    return sorted;
}
function organizeTasksByAssignee(tasks, sortBy, currentUserId, assigneeLabelFor) {
    var sorted = sortTasks(tasks, sortBy);
    var groups = groupTasksByAssignee(sorted);
    var ordered = orderAssigneeGroups(groups, currentUserId, assigneeLabelFor);
    return ordered.map(function (group) { return (__assign(__assign({}, group), { tasks: sortTasks(group.tasks, sortBy) })); });
}

function formatDateTime$1(value) {
    if (!value) {
        return '';
    }
    var date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return value;
    }
    return date.toLocaleString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    });
}
function toDateTimeInputValue$1(value) {
    if (!value) {
        return '';
    }
    var date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return '';
    }
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var day = String(date.getDate()).padStart(2, '0');
    var hours = String(date.getHours()).padStart(2, '0');
    var minutes = String(date.getMinutes()).padStart(2, '0');
    return "".concat(year, "-").concat(month, "-").concat(day, "T").concat(hours, ":").concat(minutes);
}
function dateTimeInputToApiValue(value) {
    if (!(value === null || value === void 0 ? void 0 : value.trim())) {
        return null;
    }
    var trimmed = value.trim();
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(trimmed)) {
        return "".concat(trimmed, ":00");
    }
    if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
        return "".concat(trimmed, "T00:00:00");
    }
    return trimmed;
}
var TasksPanel = function () {
    var siteId = useActiveSiteId();
    var dispatch = useDispatch();
    var _a = useState([]), tasks = _a[0], setTasks = _a[1];
    var _b = useState(false), loading = _b[0], setLoading = _b[1];
    var _c = useState(null), error = _c[0], setError = _c[1];
    var _d = useState(false), showArchived = _d[0], setShowArchived = _d[1];
    var _e = useState(''), newTitle = _e[0], setNewTitle = _e[1];
    var _f = useState('medium'), newPriority = _f[0], setNewPriority = _f[1];
    var _g = useState(''), newDueOn = _g[0], setNewDueOn = _g[1];
    var _h = useState(''), newStartOn = _h[0], setNewStartOn = _h[1];
    var _j = useState(''), newAssigneeId = _j[0], setNewAssigneeId = _j[1];
    var _k = useState(false), creating = _k[0], setCreating = _k[1];
    var _l = useState([]), assigneeOptions = _l[0], setAssigneeOptions = _l[1];
    var _m = useState(false), assigneesLoading = _m[0], setAssigneesLoading = _m[1];
    var _o = useState(null), editingDueTaskId = _o[0], setEditingDueTaskId = _o[1];
    var _p = useState(null), editingStartTaskId = _p[0], setEditingStartTaskId = _p[1];
    var _q = useState(null), editingTitleTaskId = _q[0], setEditingTitleTaskId = _q[1];
    var _r = useState(''), titleDraft = _r[0], setTitleDraft = _r[1];
    var _s = useState(false), showAddForm = _s[0], setShowAddForm = _s[1];
    var _t = useState('due'), sortBy = _t[0], setSortBy = _t[1];
    var _u = useState(null), currentUserId = _u[0], setCurrentUserId = _u[1];
    var assigneeById = useMemo$1(function () {
        var map = new Map();
        assigneeOptions.forEach(function (option) { return map.set(option.id, option); });
        return map;
    }, [assigneeOptions]);
    var loadAssignees = useCallback$1(function () {
        setAssigneesLoading(true);
        me().subscribe({
            next: function (currentUser) {
                if ((currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) != null) {
                    setCurrentUserId(currentUser.id);
                }
                fetchAll({ limit: 500, offset: 0 }).subscribe({
                    next: function (users) {
                        var enabled = (users !== null && users !== void 0 ? users : []).filter(function (user) { return user.enabled !== false; });
                        var options = enabled.map(function (user) { return ({
                            id: user.id,
                            username: user.username,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            label: userLabel(user)
                        }); });
                        setAssigneeOptions(options);
                        if ((currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) != null) {
                            setNewAssigneeId(currentUser.id);
                        }
                        else if (options.length > 0) {
                            setNewAssigneeId(options[0].id);
                        }
                        setAssigneesLoading(false);
                    },
                    error: function (e) {
                        console.error(e);
                        if ((currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) != null) {
                            var fallback = {
                                id: currentUser.id,
                                username: currentUser.username,
                                firstName: currentUser.firstName,
                                lastName: currentUser.lastName,
                                label: userLabel(currentUser)
                            };
                            setAssigneeOptions([fallback]);
                            setNewAssigneeId(currentUser.id);
                        }
                        setAssigneesLoading(false);
                    }
                });
            },
            error: function (e) {
                console.error(e);
                setAssigneesLoading(false);
            }
        });
    }, []);
    useEffect(function () {
        loadAssignees();
    }, [loadAssignees]);
    var loadTasks = useCallback$1(function () {
        if (!siteId) {
            setTasks([]);
            return;
        }
        setLoading(true);
        setError(null);
        listAllTasks(siteId, true, showArchived).subscribe({
            next: function (response) {
                setTasks(extractTaskListResult(response));
                setLoading(false);
            },
            error: function (e) {
                console.error(e);
                setError('Unable to load tasks.');
                setTasks([]);
                setLoading(false);
            }
        });
    }, [showArchived, siteId]);
    useEffect(function () {
        loadTasks();
    }, [loadTasks]);
    var selectedNewAssignee = typeof newAssigneeId === 'number' ? assigneeById.get(newAssigneeId) : undefined;
    var handleCreate = function () {
        var title = newTitle.trim();
        if (!title || !siteId || creating || typeof newAssigneeId !== 'number') {
            return;
        }
        setCreating(true);
        createTask(siteId, title, newPriority, dateTimeInputToApiValue(newDueOn) || undefined, undefined, undefined, newAssigneeId, selectedNewAssignee === null || selectedNewAssignee === void 0 ? void 0 : selectedNewAssignee.username, dateTimeInputToApiValue(newStartOn) || undefined).subscribe({
            next: function () {
                setNewTitle('');
                setNewDueOn('');
                setNewStartOn('');
                setNewPriority('medium');
                setCreating(false);
                setShowAddForm(false);
                loadTasks();
                notifyTasksUpdated();
            },
            error: function (e) {
                console.error(e);
                setCreating(false);
            }
        });
    };
    var handleAssigneeChange = function (task, assigneeId) {
        var _a;
        var assignee = assigneeById.get(assigneeId);
        updateTask(siteId, task.id, {
            assigneeId: assigneeId,
            assigneeUsername: (_a = assignee === null || assignee === void 0 ? void 0 : assignee.username) !== null && _a !== void 0 ? _a : task.assigneeUsername
        }).subscribe({
            next: function () {
                loadTasks();
                notifyTasksUpdated();
            },
            error: function (e) {
                console.error(e);
            }
        });
    };
    var handlePriorityChange = function (task, priority) {
        updateTask(siteId, task.id, { priority: priority }).subscribe({
            next: function () {
                loadTasks();
                notifyTasksUpdated();
            },
            error: function (e) {
                console.error(e);
            }
        });
    };
    var handleDueDateChange = function (task, dueOn) {
        updateTask(siteId, task.id, { dueOn: dateTimeInputToApiValue(dueOn) }).subscribe({
            next: function () {
                setEditingDueTaskId(null);
                loadTasks();
                notifyTasksUpdated();
            },
            error: function (e) {
                console.error(e);
            }
        });
    };
    var handleStartDateChange = function (task, startOn) {
        updateTask(siteId, task.id, { startOn: dateTimeInputToApiValue(startOn) }).subscribe({
            next: function () {
                setEditingStartTaskId(null);
                loadTasks();
                notifyTasksUpdated();
            },
            error: function (e) {
                console.error(e);
            }
        });
    };
    var startTitleEdit = function (task) {
        setEditingTitleTaskId(task.id);
        setTitleDraft(task.title);
    };
    var cancelTitleEdit = function () {
        setEditingTitleTaskId(null);
        setTitleDraft('');
    };
    var saveTitleEdit = function (task) {
        var trimmed = titleDraft.trim();
        if (!trimmed) {
            cancelTitleEdit();
            return;
        }
        if (trimmed === task.title) {
            cancelTitleEdit();
            return;
        }
        updateTask(siteId, task.id, { title: trimmed }).subscribe({
            next: function () {
                cancelTitleEdit();
                loadTasks();
                notifyTasksUpdated();
            },
            error: function (e) {
                console.error(e);
                cancelTitleEdit();
            }
        });
    };
    var handleComplete = function (taskId, complete) {
        completeTask(siteId, taskId, complete).subscribe({
            next: function () {
                loadTasks();
                notifyTasksUpdated();
            },
            error: function (e) {
                console.error(e);
            }
        });
    };
    var handleArchive = function (taskId, archived) {
        archiveTask(siteId, taskId, archived).subscribe({
            next: function () {
                loadTasks();
                notifyTasksUpdated();
            },
            error: function (e) {
                console.error(e);
            }
        });
    };
    var handleCreateKeyDown = function (event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleCreate();
        }
    };
    var resolveAssigneeLabelForTask = function (task) {
        return resolveAssigneeLabel(task.assigneeId, task.assigneeUsername, assigneeOptions);
    };
    var groupedTasks = useMemo$1(function () {
        return organizeTasksByAssignee(tasks, sortBy, currentUserId, function (group) {
            return resolveAssigneeLabel(group.assigneeId, group.assigneeUsername, assigneeOptions);
        });
    }, [tasks, sortBy, currentUserId, assigneeOptions]);
    var listInitialLoading = (loading && tasks.length === 0) || (assigneesLoading && assigneeOptions.length === 0);
    return (React.createElement(Stack, { spacing: 1.5, sx: { px: 1, pb: 2, minWidth: 0, width: '100%', height: '100%', minHeight: 0 } },
        React.createElement(Stack, { direction: "row", alignItems: "center", justifyContent: "space-between", spacing: 1, sx: { px: 0.5, flexShrink: 0 } },
            React.createElement(Typography, { variant: "caption", color: "text.secondary", sx: { fontWeight: 600, letterSpacing: 0.06, textTransform: 'uppercase' } }, "Tasks"),
            !listInitialLoading && !error && tasks.length > 0 && (React.createElement(FormControl, { size: "small", sx: { minWidth: 130 } },
                React.createElement(InputLabel, { id: "tasks-sort-label" }, "Sort by"),
                React.createElement(Select, { labelId: "tasks-sort-label", label: "Sort by", value: sortBy, onChange: function (e) { return setSortBy(e.target.value); } },
                    React.createElement(MenuItem, { value: "due" }, "Due date"),
                    React.createElement(MenuItem, { value: "priority" }, "Priority"))))),
        listInitialLoading && (React.createElement(Box, { sx: { display: 'flex', justifyContent: 'center', py: 4 } },
            React.createElement(CircularProgress, { size: 28 }))),
        !listInitialLoading && error && (React.createElement(Typography, { variant: "body2", color: "error", sx: { px: 0.5 } }, error)),
        !listInitialLoading && !error && !showAddForm && (React.createElement(Button, { size: "small", sx: { alignSelf: 'flex-start', px: 0.5, minWidth: 0 }, onClick: function () { return setShowAddForm(true); } }, "Add task")),
        !listInitialLoading && !error && showAddForm && (React.createElement(Box, { sx: {
                px: 1,
                py: 1.25,
                borderRadius: 1,
                bgcolor: 'action.hover',
                minWidth: 0
            } },
            React.createElement(Stack, { spacing: 1.25 },
                React.createElement(TextField, { size: "small", fullWidth: true, autoFocus: true, placeholder: "New task...", value: newTitle, onChange: function (e) { return setNewTitle(e.target.value); }, onKeyDown: handleCreateKeyDown, disabled: creating }),
                React.createElement(Box, { sx: {
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                        gap: 1
                    } },
                    React.createElement(FormControl, { size: "small", fullWidth: true },
                        React.createElement(InputLabel, { id: "task-priority-label" }, "Priority"),
                        React.createElement(Select, { labelId: "task-priority-label", label: "Priority", value: newPriority, onChange: function (e) { return setNewPriority(e.target.value); } },
                            React.createElement(MenuItem, { value: "high" }, "High"),
                            React.createElement(MenuItem, { value: "medium" }, "Medium"),
                            React.createElement(MenuItem, { value: "low" }, "Low"))),
                    React.createElement(FormControl, { size: "small", fullWidth: true },
                        React.createElement(InputLabel, { id: "task-assignee-label" }, "Assignee"),
                        React.createElement(Select, { labelId: "task-assignee-label", label: "Assignee", value: newAssigneeId === '' ? '' : newAssigneeId, onChange: function (e) { return setNewAssigneeId(e.target.value); }, disabled: assigneeOptions.length === 0, renderValue: function (value) {
                                var option = assigneeById.get(value);
                                if (!option) {
                                    return '';
                                }
                                return React.createElement(UserAvatarLabel, { user: option, label: option.label, size: 20, typographyVariant: "body2" });
                            } }, assigneeOptions.map(function (option) { return (React.createElement(AssigneeMenuItem, { key: option.id, option: option })); })))),
                React.createElement(Stack, { direction: "row", spacing: 1, alignItems: "center" },
                    React.createElement(TextField, { size: "small", type: "datetime-local", label: "Start date & time", fullWidth: true, InputLabelProps: { shrink: true }, value: newStartOn, onChange: function (e) { return setNewStartOn(e.target.value); } }),
                    React.createElement(TextField, { size: "small", type: "datetime-local", label: "Due date & time", fullWidth: true, InputLabelProps: { shrink: true }, value: newDueOn, onChange: function (e) { return setNewDueOn(e.target.value); } })),
                React.createElement(Stack, { direction: "row", spacing: 1, alignItems: "center", justifyContent: "flex-end" },
                    React.createElement(IconButton, { "aria-label": "Create task", color: "primary", onClick: handleCreate, disabled: !newTitle.trim() || creating || typeof newAssigneeId !== 'number', sx: { flexShrink: 0 } },
                        React.createElement(SendRoundedIcon, { fontSize: "small" }))),
                React.createElement(Button, { size: "small", sx: { alignSelf: 'flex-start', px: 0, minWidth: 0 }, onClick: function () {
                        setNewTitle('');
                        setNewDueOn('');
                        setNewStartOn('');
                        setNewPriority('medium');
                        setShowAddForm(false);
                    } }, "Cancel")))),
        !listInitialLoading && !error && (tasks.length === 0 ? (React.createElement(Typography, { variant: "body2", color: "text.secondary", sx: { px: 0.5, py: 1 } }, "No tasks.")) : (React.createElement(Stack, { spacing: 1.5 }, groupedTasks.map(function (group) {
            var _a;
            var assigneeOption = findAssigneeOption(assigneeOptions, group.assigneeId, group.assigneeUsername);
            var groupUser = assigneeOption !== null && assigneeOption !== void 0 ? assigneeOption : {
                id: group.assigneeId,
                username: (_a = group.assigneeUsername) !== null && _a !== void 0 ? _a : "user-".concat(group.assigneeId),
                firstName: undefined,
                lastName: undefined,
                label: resolveAssigneeLabel(group.assigneeId, group.assigneeUsername, assigneeOptions)
            };
            var groupTitle = currentUserId != null && group.assigneeId === currentUserId
                ? 'My tasks'
                : groupUser.label;
            return (React.createElement(Stack, { key: group.assigneeId, spacing: 0.75 },
                React.createElement(Stack, { direction: "row", alignItems: "center", spacing: 1, sx: { px: 0.25 } },
                    React.createElement(UserAvatarLabel, { user: groupUser, label: groupTitle, size: 28, typographyVariant: "subtitle2", fontWeight: 600 }),
                    React.createElement(Chip, { label: group.tasks.length, size: "small", sx: { height: 20, fontSize: '0.7rem' } })),
                React.createElement(Stack, { spacing: 1 }, group.tasks.map(function (task) {
                    var _a, _b;
                    return (React.createElement(Box, { key: task.id, sx: {
                            p: 1.25,
                            borderRadius: 1,
                            border: 1,
                            borderColor: 'divider',
                            bgcolor: task.archived ? 'action.disabledBackground' : 'background.paper',
                            opacity: task.archived ? 0.85 : 1,
                            minWidth: 0
                        } },
                        React.createElement(Stack, { spacing: 1 },
                            React.createElement(Stack, { direction: "row", spacing: 0.75, alignItems: "flex-start" },
                                React.createElement(Checkbox, { size: "small", checked: task.complete, disabled: task.archived, onChange: function (e) { return handleComplete(task.id, e.target.checked); }, sx: { p: 0, mt: 0.15, flexShrink: 0 } }),
                                React.createElement(Box, { sx: { flex: 1, minWidth: 0 } },
                                    React.createElement(Stack, { direction: "row", spacing: 0.75, alignItems: "flex-start", sx: { mb: 0.75 } },
                                        editingTitleTaskId === task.id ? (React.createElement(TextField, { size: "small", fullWidth: true, autoFocus: true, value: titleDraft, onChange: function (e) { return setTitleDraft(e.target.value); }, onBlur: function () { return saveTitleEdit(task); }, onKeyDown: function (e) {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    saveTitleEdit(task);
                                                }
                                                if (e.key === 'Escape') {
                                                    e.preventDefault();
                                                    cancelTitleEdit();
                                                }
                                            }, sx: { flex: 1, minWidth: 0 } })) : (React.createElement(Box, { role: "button", tabIndex: task.archived ? -1 : 0, onClick: function () { return !task.archived && startTitleEdit(task); }, onKeyDown: function (e) {
                                                if (!task.archived && (e.key === 'Enter' || e.key === ' ')) {
                                                    e.preventDefault();
                                                    startTitleEdit(task);
                                                }
                                            }, sx: {
                                                flex: 1,
                                                minWidth: 0,
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                gap: 0.5,
                                                cursor: task.archived ? 'default' : 'pointer',
                                                borderRadius: 0.5,
                                                '&:hover .task-title-edit-icon': {
                                                    opacity: task.archived ? 0 : 1
                                                },
                                                '&:hover .task-title-text': task.archived
                                                    ? undefined
                                                    : {
                                                        textDecoration: task.complete ? 'line-through underline' : 'underline',
                                                        textUnderlineOffset: 2
                                                    }
                                            } },
                                            React.createElement(Typography, { className: "task-title-text", variant: "body2", fontWeight: 600, sx: {
                                                    flex: 1,
                                                    minWidth: 0,
                                                    wordBreak: 'break-word',
                                                    textDecoration: task.complete ? 'line-through' : 'none',
                                                    color: task.complete ? 'text.secondary' : 'text.primary'
                                                } }, task.title),
                                            !task.archived && (React.createElement(EditRoundedIcon, { className: "task-title-edit-icon", sx: {
                                                    fontSize: 14,
                                                    opacity: 0,
                                                    transition: 'opacity 0.15s ease',
                                                    mt: 0.2,
                                                    flexShrink: 0,
                                                    color: 'text.secondary'
                                                } })))),
                                        task.archived && (React.createElement(Chip, { label: "Archived", size: "small", variant: "outlined", sx: { height: 22, fontSize: '0.7rem', flexShrink: 0 } }))),
                                    task.targetType === TASK_TARGET.WORKFLOW_PACKAGE && task.targetId && (React.createElement(Typography, { variant: "caption", component: "div", sx: { display: 'block', mb: 0.35, wordBreak: 'break-word' } },
                                        React.createElement(Box, { component: "span", color: "text.secondary" },
                                            "Workflow Package:",
                                            ' '),
                                        React.createElement(Box, { component: "button", type: "button", onClick: function () {
                                                if (task.targetWorkflowId) {
                                                    openWorkflowPackage(dispatch, task.targetWorkflowId, task.targetId);
                                                }
                                            }, disabled: !task.targetWorkflowId, sx: {
                                                display: 'inline',
                                                p: 0,
                                                border: 'none',
                                                background: 'none',
                                                font: 'inherit',
                                                fontSize: 'inherit',
                                                lineHeight: 'inherit',
                                                color: task.targetWorkflowId ? 'primary.main' : 'text.secondary',
                                                cursor: task.targetWorkflowId ? 'pointer' : 'default',
                                                fontWeight: 600,
                                                textDecoration: task.targetWorkflowId ? 'underline' : 'none',
                                                textUnderlineOffset: 2,
                                                '&:hover': task.targetWorkflowId ? { color: 'primary.dark' } : undefined
                                            } }, task.targetTitle || 'Untitled package'))),
                                    React.createElement(Stack, { spacing: 0.35, sx: { mb: 0.75 } },
                                        React.createElement(Typography, { variant: "caption", color: "text.secondary" },
                                            "Created ",
                                            formatDateTime$1(task.createdOn)),
                                        editingStartTaskId === task.id ? (React.createElement(TextField, { size: "small", type: "datetime-local", autoFocus: true, disabled: task.archived, value: toDateTimeInputValue$1(task.startOn), onChange: function (e) { return handleStartDateChange(task, e.target.value || null); }, onBlur: function () { return setEditingStartTaskId(null); }, InputLabelProps: { shrink: true }, sx: { maxWidth: 240, '& .MuiInputBase-input': { fontWeight: 700, py: 0.5 } } })) : (React.createElement(Typography, { variant: "caption", component: "button", type: "button", disabled: task.archived, onClick: function () { return !task.archived && setEditingStartTaskId(task.id); }, sx: {
                                                fontWeight: 700,
                                                border: 0,
                                                bgcolor: 'transparent',
                                                p: 0,
                                                m: 0,
                                                cursor: task.archived ? 'default' : 'pointer',
                                                color: task.startOn ? 'text.primary' : 'primary.main',
                                                textAlign: 'left',
                                                textDecoration: task.archived ? 'none' : 'underline',
                                                textUnderlineOffset: 2,
                                                '&:hover': task.archived ? undefined : { color: 'primary.main' }
                                            } }, task.startOn ? "Start ".concat(formatDateTime$1(task.startOn)) : 'Add start date')),
                                        editingDueTaskId === task.id ? (React.createElement(TextField, { size: "small", type: "datetime-local", autoFocus: true, disabled: task.archived, value: toDateTimeInputValue$1(task.dueOn), onChange: function (e) { return handleDueDateChange(task, e.target.value || null); }, onBlur: function () { return setEditingDueTaskId(null); }, InputLabelProps: { shrink: true }, sx: { maxWidth: 240, '& .MuiInputBase-input': { fontWeight: 700, py: 0.5 } } })) : (React.createElement(Typography, { variant: "caption", component: "button", type: "button", disabled: task.archived, onClick: function () { return !task.archived && setEditingDueTaskId(task.id); }, sx: {
                                                fontWeight: 700,
                                                border: 0,
                                                bgcolor: 'transparent',
                                                p: 0,
                                                m: 0,
                                                cursor: task.archived ? 'default' : 'pointer',
                                                color: task.dueOn ? 'text.primary' : 'primary.main',
                                                textAlign: 'left',
                                                textDecoration: task.archived ? 'none' : 'underline',
                                                textUnderlineOffset: 2,
                                                '&:hover': task.archived ? undefined : { color: 'primary.main' }
                                            } }, task.dueOn ? "Due ".concat(formatDateTime$1(task.dueOn)) : 'Add due date'))),
                                    React.createElement(Box, { sx: {
                                            display: 'grid',
                                            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                                            gap: 1,
                                            mb: 0.75
                                        } },
                                        React.createElement(FormControl, { size: "small", fullWidth: true },
                                            React.createElement(InputLabel, { id: "task-".concat(task.id, "-priority-label") }, "Priority"),
                                            React.createElement(Select, { labelId: "task-".concat(task.id, "-priority-label"), label: "Priority", value: task.priority, onChange: function (e) { return handlePriorityChange(task, e.target.value); }, disabled: task.archived },
                                                React.createElement(MenuItem, { value: "high" }, "High"),
                                                React.createElement(MenuItem, { value: "medium" }, "Medium"),
                                                React.createElement(MenuItem, { value: "low" }, "Low"))),
                                        assigneeOptions.length > 0 ? (React.createElement(FormControl, { size: "small", fullWidth: true },
                                            React.createElement(InputLabel, { id: "task-".concat(task.id, "-assignee-label") }, "Assignee"),
                                            React.createElement(Select, { labelId: "task-".concat(task.id, "-assignee-label"), label: "Assignee", value: task.assigneeId, onChange: function (e) { return handleAssigneeChange(task, e.target.value); }, disabled: task.archived, renderValue: function (value) {
                                                    var _a, _b;
                                                    var option = assigneeById.get(value);
                                                    var user = option !== null && option !== void 0 ? option : {
                                                        username: (_a = task.assigneeUsername) !== null && _a !== void 0 ? _a : "user-".concat(task.assigneeId),
                                                        firstName: undefined,
                                                        lastName: undefined
                                                    };
                                                    return (React.createElement(UserAvatarLabel, { user: user, label: (_b = option === null || option === void 0 ? void 0 : option.label) !== null && _b !== void 0 ? _b : resolveAssigneeLabelForTask(task), size: 20, typographyVariant: "body2" }));
                                                } },
                                                assigneeOptions.map(function (option) { return (React.createElement(AssigneeMenuItem, { key: option.id, option: option })); }),
                                                !assigneeById.has(task.assigneeId) && (React.createElement(MenuItem, { value: task.assigneeId },
                                                    React.createElement(UserAvatarLabel, { user: {
                                                            username: (_a = task.assigneeUsername) !== null && _a !== void 0 ? _a : "user-".concat(task.assigneeId),
                                                            firstName: undefined,
                                                            lastName: undefined
                                                        }, label: resolveAssigneeLabelForTask(task), size: 22 })))))) : (React.createElement(UserAvatarLabel, { user: {
                                                username: (_b = task.assigneeUsername) !== null && _b !== void 0 ? _b : "user-".concat(task.assigneeId),
                                                firstName: undefined,
                                                lastName: undefined
                                            }, label: resolveAssigneeLabelForTask(task), size: 20, typographyVariant: "caption" }))),
                                    !task.archived ? (React.createElement(Button, { size: "small", sx: { px: 0, minWidth: 0, alignSelf: 'flex-start' }, onClick: function () { return handleArchive(task.id, true); } }, "Archive")) : (React.createElement(Button, { size: "small", sx: { px: 0, minWidth: 0, alignSelf: 'flex-start' }, onClick: function () { return handleArchive(task.id, false); } }, "Restore")))))));
                }))));
        })))),
        !listInitialLoading && !error && (React.createElement(Button, { size: "small", sx: { alignSelf: 'flex-start', px: 0.5, minWidth: 0 }, onClick: function () { return setShowArchived(function (prev) { return !prev; }); } }, showArchived ? 'Hide archived' : 'Show archived'))));
};

var TASKS_PANEL_WIDGET_ID = 'org.rd.plugin.crafterwf.tasksPanel';
function TasksToolbarButton(props) {
    var dispatch = useDispatch();
    var siteId = useActiveSiteId();
    var title = typeof props.title === 'string' && props.title.trim() ? props.title : 'Tasks';
    var _a = useState(0), openCount = _a[0], setOpenCount = _a[1];
    var _b = useState(0), overdueCount = _b[0], setOverdueCount = _b[1];
    var refreshOpenCount = useCallback$1(function () {
        if (!siteId) {
            setOpenCount(0);
            setOverdueCount(0);
            return;
        }
        getOpenTaskCount(siteId).subscribe({
            next: function (response) {
                var _a, _b, _c, _d, _e, _f;
                setOpenCount((_c = (_b = (_a = response.response) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b.openCount) !== null && _c !== void 0 ? _c : 0);
                setOverdueCount((_f = (_e = (_d = response.response) === null || _d === void 0 ? void 0 : _d.result) === null || _e === void 0 ? void 0 : _e.overdueCount) !== null && _f !== void 0 ? _f : 0);
            },
            error: function (e) {
                console.error(e);
            }
        });
    }, [siteId]);
    useEffect(function () {
        refreshOpenCount();
        var intervalId = window.setInterval(refreshOpenCount, 30000);
        var handleUpdated = function () { return refreshOpenCount(); };
        window.addEventListener(TASKS_UPDATED_EVENT, handleUpdated);
        return function () {
            window.clearInterval(intervalId);
            window.removeEventListener(TASKS_UPDATED_EVENT, handleUpdated);
        };
    }, [refreshOpenCount]);
    var openTasksPanel = function () {
        dispatch(buildOpenIcePanelAction(title, TASKS_PANEL_WIDGET_ID, siteId !== null && siteId !== void 0 ? siteId : undefined));
        refreshOpenCount();
    };
    return (React.createElement(Tooltip, { title: title },
        React.createElement("span", null,
            React.createElement(IconButton, __assign({ "aria-label": title, size: "large" }, props, { onClick: openTasksPanel }),
                React.createElement(Badge, { badgeContent: openCount > 0 ? openCount : undefined, color: overdueCount > 0 ? 'error' : 'primary', max: 99 },
                    React.createElement(ContentPasteRoundedIcon, null))))));
}

function extractCalendarPackageList(response) {
    var _a, _b;
    var packages = (_b = (_a = response === null || response === void 0 ? void 0 : response.response) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b.packages;
    if (!Array.isArray(packages)) {
        return [];
    }
    return packages;
}
function packageToCalendarEvent(pkg) {
    return {
        id: "package:".concat(pkg.id),
        sourceId: 'package',
        sourceRecordId: pkg.id,
        title: pkg.title,
        startsOn: pkg.dueOn,
        accentHex: resolveBoardBackgroundColor(pkg.workflowBackgroundUrl),
        subtitle: pkg.workflowName,
        meta: {
            workflowId: pkg.workflowId,
            workflowName: pkg.workflowName,
            workflowBackgroundUrl: pkg.workflowBackgroundUrl
        }
    };
}
function getPackageFromCalendarEvent(event) {
    var _a, _b, _c;
    if (event.sourceId !== 'package') {
        return undefined;
    }
    return {
        id: event.sourceRecordId,
        workflowId: (_b = (_a = event.meta) === null || _a === void 0 ? void 0 : _a.workflowId) !== null && _b !== void 0 ? _b : '',
        title: event.title,
        dueOn: event.startsOn,
        workflowName: event.subtitle,
        workflowBackgroundUrl: (_c = event.meta) === null || _c === void 0 ? void 0 : _c.workflowBackgroundUrl
    };
}
function loadPackageCalendarEvents(siteId) {
    var url = "".concat(PLUGIN_SERVICE_BASE, "/workflow-package/calendar-list.json?siteId=").concat(encodeURIComponent(siteId));
    return get(url).pipe(map(function (response) { return extractCalendarPackageList(response).map(packageToCalendarEvent); }));
}

function parseCalendarDate(value) {
    if (!(value === null || value === void 0 ? void 0 : value.trim())) {
        return null;
    }
    var date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
}
function startOfDay(date) {
    var next = new Date(date);
    next.setHours(0, 0, 0, 0);
    return next;
}
function endOfDay(date) {
    var next = new Date(date);
    next.setHours(23, 59, 59, 999);
    return next;
}
function addDays(date, days) {
    var next = new Date(date);
    next.setDate(next.getDate() + days);
    return next;
}
function addMonths(date, months) {
    var next = new Date(date);
    next.setMonth(next.getMonth() + months);
    return next;
}
/** Week starts on Sunday to match the month grid headers. */
function startOfWeek(date) {
    var day = startOfDay(date);
    day.setDate(day.getDate() - day.getDay());
    return day;
}
function endOfWeek(date) {
    return endOfDay(addDays(startOfWeek(date), 6));
}
function startOfMonth(date) {
    return startOfDay(new Date(date.getFullYear(), date.getMonth(), 1));
}
function isSameDay(a, b) {
    return (a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate());
}
function isSameMonth(a, b) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}
function getWeekDayDates(anchor) {
    var start = startOfWeek(anchor);
    return Array.from({ length: 7 }, function (_, index) { return addDays(start, index); });
}
function getMonthGridDays(anchor) {
    var monthStart = startOfMonth(anchor);
    var gridStart = startOfWeek(monthStart);
    return Array.from({ length: 42 }, function (_, index) { return addDays(gridStart, index); });
}
function formatCalendarDayLabel(date) {
    return date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
}
function formatCalendarDayHeading(date) {
    return date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}
function formatCalendarWeekHeading(start, end) {
    var sameYear = start.getFullYear() === end.getFullYear();
    var startLabel = start.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: sameYear ? undefined : 'numeric'
    });
    var endLabel = end.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    return "".concat(startLabel, " \u2013 ").concat(endLabel);
}
function formatCalendarMonthHeading(date) {
    return date.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
}
function priorityColor(priority) {
    if (priority === 'high') {
        return 'error';
    }
    if (priority === 'low') {
        return 'info';
    }
    return 'warning';
}
function shiftAnchorDate(anchor, mode, direction) {
    if (mode === 'day') {
        return addDays(anchor, direction);
    }
    if (mode === 'week') {
        return addDays(anchor, direction * 7);
    }
    return addMonths(anchor, direction);
}

function resolveTaskCalendarDates(task) {
    var _a, _b;
    var startRaw = (_a = task.startOn) === null || _a === void 0 ? void 0 : _a.trim();
    var dueRaw = (_b = task.dueOn) === null || _b === void 0 ? void 0 : _b.trim();
    if (startRaw && dueRaw) {
        var startDate = parseCalendarDate(startRaw);
        var dueDate = parseCalendarDate(dueRaw);
        if (startDate && dueDate && startDate.getTime() > dueDate.getTime()) {
            return { startsOn: dueRaw, endsOn: startRaw };
        }
        return { startsOn: startRaw, endsOn: dueRaw };
    }
    if (dueRaw) {
        return { startsOn: dueRaw };
    }
    if (startRaw) {
        return { startsOn: startRaw };
    }
    return null;
}
function taskToCalendarEvent(task) {
    var _a, _b;
    var schedule = resolveTaskCalendarDates(task);
    return {
        id: "task:".concat(task.id),
        sourceId: 'task',
        sourceRecordId: task.id,
        title: task.title,
        startsOn: (_a = schedule === null || schedule === void 0 ? void 0 : schedule.startsOn) !== null && _a !== void 0 ? _a : '',
        endsOn: schedule === null || schedule === void 0 ? void 0 : schedule.endsOn,
        accentColor: priorityColor((_b = task.priority) !== null && _b !== void 0 ? _b : 'medium'),
        complete: task.complete,
        archived: task.archived,
        subtitle: task.assigneeUsername,
        meta: { task: task }
    };
}
function loadTaskCalendarEvents(siteId) {
    return listAllTasks(siteId, true, false).pipe(map(function (response) { return extractTaskListResult(response).map(taskToCalendarEvent); }));
}
function getTaskFromCalendarEvent(event) {
    var _a;
    if (event.sourceId !== 'task') {
        return undefined;
    }
    return (_a = event.meta) === null || _a === void 0 ? void 0 : _a.task;
}

function formatDateTime(value) {
    if (!value) {
        return '';
    }
    var date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return value;
    }
    return date.toLocaleString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    });
}
function toDateTimeInputValue(value) {
    if (!value) {
        return '';
    }
    var date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return '';
    }
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var day = String(date.getDate()).padStart(2, '0');
    var hours = String(date.getHours()).padStart(2, '0');
    var minutes = String(date.getMinutes()).padStart(2, '0');
    return "".concat(year, "-").concat(month, "-").concat(day, "T").concat(hours, ":").concat(minutes);
}
var TaskDetailDialog = function (_a) {
    var _b, _c;
    var open = _a.open, task = _a.task, onClose = _a.onClose, onOpenPackage = _a.onOpenPackage, onChanged = _a.onChanged;
    var siteId = useActiveSiteId();
    var _d = useState(task), currentTask = _d[0], setCurrentTask = _d[1];
    var _e = useState(false), editingTitle = _e[0], setEditingTitle = _e[1];
    var _f = useState(''), titleDraft = _f[0], setTitleDraft = _f[1];
    var _g = useState(false), editingDueOn = _g[0], setEditingDueOn = _g[1];
    var _h = useState(false), editingStartOn = _h[0], setEditingStartOn = _h[1];
    var _j = useState([]), assigneeOptions = _j[0], setAssigneeOptions = _j[1];
    var assigneeById = useMemo$1(function () {
        var map = new Map();
        assigneeOptions.forEach(function (option) { return map.set(option.id, option); });
        return map;
    }, [assigneeOptions]);
    var loadAssignees = useCallback$1(function () {
        me().subscribe({
            next: function (currentUser) {
                fetchAll({ limit: 500, offset: 0 }).subscribe({
                    next: function (users) {
                        var enabled = (users !== null && users !== void 0 ? users : []).filter(function (user) { return user.enabled !== false; });
                        setAssigneeOptions(enabled.map(function (user) { return ({
                            id: user.id,
                            username: user.username,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            label: userLabel(user)
                        }); }));
                    },
                    error: function (e) {
                        console.error(e);
                        if ((currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) != null) {
                            setAssigneeOptions([
                                {
                                    id: currentUser.id,
                                    username: currentUser.username,
                                    firstName: currentUser.firstName,
                                    lastName: currentUser.lastName,
                                    label: userLabel(currentUser)
                                }
                            ]);
                        }
                    }
                });
            },
            error: function (e) {
                console.error(e);
            }
        });
    }, []);
    useEffect(function () {
        if (open) {
            loadAssignees();
        }
    }, [open, loadAssignees]);
    useEffect(function () {
        if (!open || !task || !siteId) {
            setCurrentTask(task);
            return;
        }
        getTask(siteId, task.id).subscribe({
            next: function (response) {
                var _a, _b;
                var fresh = (_a = response.response) === null || _a === void 0 ? void 0 : _a.result;
                if (!fresh) {
                    setCurrentTask(task);
                    return;
                }
                setCurrentTask(__assign(__assign({}, fresh), { complete: fresh.complete === true || fresh.complete === 'true', archived: fresh.archived === true || fresh.archived === 'true', priority: ((_b = fresh.priority) !== null && _b !== void 0 ? _b : 'medium') }));
            },
            error: function (e) {
                console.error(e);
                setCurrentTask(task);
            }
        });
    }, [open, task, siteId]);
    useEffect(function () {
        var _a;
        setEditingTitle(false);
        setEditingDueOn(false);
        setEditingStartOn(false);
        setTitleDraft((_a = currentTask === null || currentTask === void 0 ? void 0 : currentTask.title) !== null && _a !== void 0 ? _a : '');
    }, [currentTask === null || currentTask === void 0 ? void 0 : currentTask.id, open]);
    if (!currentTask) {
        return null;
    }
    var handleComplete = function (complete) {
        if (!siteId || currentTask.archived) {
            return;
        }
        completeTask(siteId, currentTask.id, complete).subscribe({
            next: function () {
                setCurrentTask(function (prev) { return (prev ? __assign(__assign({}, prev), { complete: complete }) : prev); });
                notifyTasksUpdated();
                onChanged === null || onChanged === void 0 ? void 0 : onChanged();
            },
            error: function (e) {
                console.error(e);
            }
        });
    };
    var handleDueDateChange = function (value) {
        if (!siteId || currentTask.archived) {
            return;
        }
        updateTask(siteId, currentTask.id, { dueOn: formatTaskDateForApi(value) }).subscribe({
            next: function () {
                setEditingDueOn(false);
                setCurrentTask(function (prev) { var _a; return prev ? __assign(__assign({}, prev), { dueOn: (_a = formatTaskDateForApi(value)) !== null && _a !== void 0 ? _a : undefined }) : prev; });
                notifyTasksUpdated();
                onChanged === null || onChanged === void 0 ? void 0 : onChanged();
            },
            error: function (e) {
                console.error(e);
            }
        });
    };
    var handleStartDateChange = function (value) {
        if (!siteId || currentTask.archived) {
            return;
        }
        updateTask(siteId, currentTask.id, { startOn: formatTaskDateForApi(value) }).subscribe({
            next: function () {
                setEditingStartOn(false);
                setCurrentTask(function (prev) { var _a; return prev ? __assign(__assign({}, prev), { startOn: (_a = formatTaskDateForApi(value)) !== null && _a !== void 0 ? _a : undefined }) : prev; });
                notifyTasksUpdated();
                onChanged === null || onChanged === void 0 ? void 0 : onChanged();
            },
            error: function (e) {
                console.error(e);
            }
        });
    };
    var handleAssigneeChange = function (assigneeId) {
        var _a;
        if (!siteId || currentTask.archived || assigneeId === currentTask.assigneeId) {
            return;
        }
        var assignee = assigneeById.get(assigneeId);
        updateTask(siteId, currentTask.id, {
            assigneeId: assigneeId,
            assigneeUsername: (_a = assignee === null || assignee === void 0 ? void 0 : assignee.username) !== null && _a !== void 0 ? _a : currentTask.assigneeUsername
        }).subscribe({
            next: function () {
                setCurrentTask(function (prev) {
                    var _a;
                    return prev
                        ? __assign(__assign({}, prev), { assigneeId: assigneeId, assigneeUsername: (_a = assignee === null || assignee === void 0 ? void 0 : assignee.username) !== null && _a !== void 0 ? _a : prev.assigneeUsername }) : prev;
                });
                notifyTasksUpdated();
                onChanged === null || onChanged === void 0 ? void 0 : onChanged();
            },
            error: function (e) {
                console.error(e);
            }
        });
    };
    var saveTitle = function () {
        var trimmed = titleDraft.trim();
        if (!siteId || !trimmed || trimmed === currentTask.title || currentTask.archived) {
            setEditingTitle(false);
            return;
        }
        updateTask(siteId, currentTask.id, { title: trimmed }).subscribe({
            next: function () {
                setCurrentTask(function (prev) { return (prev ? __assign(__assign({}, prev), { title: trimmed }) : prev); });
                setEditingTitle(false);
                notifyTasksUpdated();
                onChanged === null || onChanged === void 0 ? void 0 : onChanged();
            },
            error: function (e) {
                console.error(e);
                setEditingTitle(false);
            }
        });
    };
    var handlePriorityChange = function (priority) {
        if (!siteId || currentTask.archived || priority === currentTask.priority) {
            return;
        }
        updateTask(siteId, currentTask.id, { priority: priority }).subscribe({
            next: function () {
                setCurrentTask(function (prev) { return (prev ? __assign(__assign({}, prev), { priority: priority }) : prev); });
                notifyTasksUpdated();
                onChanged === null || onChanged === void 0 ? void 0 : onChanged();
            },
            error: function (e) {
                console.error(e);
            }
        });
    };
    var handleArchive = function (archived) {
        if (!siteId) {
            return;
        }
        archiveTask(siteId, currentTask.id, archived).subscribe({
            next: function () {
                setCurrentTask(function (prev) { return (prev ? __assign(__assign({}, prev), { archived: archived }) : prev); });
                notifyTasksUpdated();
                onChanged === null || onChanged === void 0 ? void 0 : onChanged();
            },
            error: function (e) {
                console.error(e);
            }
        });
    };
    return (React.createElement(Dialog, { open: open, onClose: onClose, fullWidth: true, maxWidth: "sm", scroll: "paper", "aria-labelledby": "calendar-task-detail-title", PaperProps: { sx: { borderRadius: 2 } } },
        React.createElement(DialogTitle, { id: "calendar-task-detail-title", sx: { pb: 1 } }, "Task"),
        React.createElement(DialogContent, { dividers: true, sx: { px: 2, py: 1.5 } },
            React.createElement(Stack, { spacing: 1.25 },
                React.createElement(Stack, { direction: "row", spacing: 1, alignItems: "flex-start" },
                    React.createElement(Checkbox, { checked: currentTask.complete, disabled: currentTask.archived, onChange: function (e) { return handleComplete(e.target.checked); }, sx: { p: 0, mt: 0.25 } }),
                    editingTitle && !currentTask.archived ? (React.createElement(TextField, { size: "small", fullWidth: true, autoFocus: true, value: titleDraft, onChange: function (e) { return setTitleDraft(e.target.value); }, onKeyDown: function (e) {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                saveTitle();
                            }
                            if (e.key === 'Escape') {
                                e.preventDefault();
                                setEditingTitle(false);
                                setTitleDraft(currentTask.title);
                            }
                        }, onBlur: saveTitle })) : (React.createElement(Box, { component: "button", type: "button", disabled: currentTask.archived, onClick: function () {
                            if (!currentTask.archived) {
                                setTitleDraft(currentTask.title);
                                setEditingTitle(true);
                            }
                        }, sx: {
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 0.5,
                            flex: 1,
                            minWidth: 0,
                            p: 0,
                            border: 0,
                            bgcolor: 'transparent',
                            textAlign: 'left',
                            cursor: currentTask.archived ? 'default' : 'pointer',
                            font: 'inherit'
                        } },
                        React.createElement(Typography, { variant: "subtitle1", sx: {
                                flex: 1,
                                fontWeight: 600,
                                wordBreak: 'break-word',
                                textDecoration: currentTask.complete ? 'line-through' : 'none',
                                color: currentTask.complete ? 'text.secondary' : 'text.primary'
                            } }, currentTask.title),
                        !currentTask.archived && (React.createElement(EditRoundedIcon, { sx: { fontSize: 16, color: 'text.secondary', mt: 0.35, flexShrink: 0 } })))),
                    currentTask.archived && (React.createElement(Chip, { label: "Archived", size: "small", variant: "outlined", sx: { height: 22, fontSize: '0.7rem' } }))),
                currentTask.targetType === TASK_TARGET.WORKFLOW_PACKAGE && currentTask.targetId && (React.createElement(Typography, { variant: "body2", color: "text.secondary" },
                    "Package:",
                    ' ',
                    React.createElement(Box, { component: "button", type: "button", onClick: function () { return onOpenPackage === null || onOpenPackage === void 0 ? void 0 : onOpenPackage(currentTask.targetId); }, sx: {
                            p: 0,
                            border: 0,
                            bgcolor: 'transparent',
                            font: 'inherit',
                            fontSize: 'inherit',
                            color: 'primary.main',
                            cursor: 'pointer',
                            fontWeight: 600,
                            textDecoration: 'underline',
                            textUnderlineOffset: 2
                        } }, currentTask.targetTitle || 'Untitled package'))),
                React.createElement(Stack, { spacing: 0.35 },
                    React.createElement(Typography, { variant: "caption", color: "text.secondary" },
                        "Created ",
                        formatDateTime(currentTask.createdOn)),
                    editingStartOn && !currentTask.archived ? (React.createElement(TextField, { size: "small", type: "datetime-local", autoFocus: true, value: toDateTimeInputValue(currentTask.startOn), onChange: function (e) { return handleStartDateChange(e.target.value || null); }, onBlur: function () { return setEditingStartOn(false); }, InputLabelProps: { shrink: true }, sx: { maxWidth: 280, '& .MuiInputBase-input': { fontWeight: 600, py: 0.75 } } })) : (React.createElement(Typography, { variant: "body2", component: "button", type: "button", disabled: currentTask.archived, onClick: function () { return !currentTask.archived && setEditingStartOn(true); }, sx: {
                            fontWeight: 600,
                            border: 0,
                            bgcolor: 'transparent',
                            p: 0,
                            m: 0,
                            cursor: currentTask.archived ? 'default' : 'pointer',
                            color: currentTask.startOn ? 'text.primary' : 'primary.main',
                            textAlign: 'left',
                            textDecoration: currentTask.archived ? 'none' : 'underline',
                            textUnderlineOffset: 2
                        } }, currentTask.startOn ? "Start ".concat(formatDateTime(currentTask.startOn)) : 'Add start date')),
                    editingDueOn && !currentTask.archived ? (React.createElement(TextField, { size: "small", type: "datetime-local", autoFocus: true, value: toDateTimeInputValue(currentTask.dueOn), onChange: function (e) { return handleDueDateChange(e.target.value || null); }, onBlur: function () { return setEditingDueOn(false); }, InputLabelProps: { shrink: true }, sx: { maxWidth: 280, '& .MuiInputBase-input': { fontWeight: 600, py: 0.75 } } })) : (React.createElement(Typography, { variant: "body2", component: "button", type: "button", disabled: currentTask.archived, onClick: function () { return !currentTask.archived && setEditingDueOn(true); }, sx: {
                            fontWeight: 600,
                            border: 0,
                            bgcolor: 'transparent',
                            p: 0,
                            m: 0,
                            cursor: currentTask.archived ? 'default' : 'pointer',
                            color: currentTask.dueOn ? 'text.primary' : 'primary.main',
                            textAlign: 'left',
                            textDecoration: currentTask.archived ? 'none' : 'underline',
                            textUnderlineOffset: 2
                        } }, currentTask.dueOn ? "Due ".concat(formatDateTime(currentTask.dueOn)) : 'Add due date'))),
                assigneeOptions.length > 0 ? (React.createElement(FormControl, { size: "small", fullWidth: true, disabled: currentTask.archived },
                    React.createElement(InputLabel, { id: "calendar-task-assignee-label" }, "Assignee"),
                    React.createElement(Select, { labelId: "calendar-task-assignee-label", label: "Assignee", value: currentTask.assigneeId, onChange: function (e) { return handleAssigneeChange(e.target.value); }, renderValue: function (value) {
                            var _a, _b;
                            var option = assigneeById.get(value);
                            var user = option !== null && option !== void 0 ? option : {
                                username: (_a = currentTask.assigneeUsername) !== null && _a !== void 0 ? _a : "user-".concat(currentTask.assigneeId),
                                firstName: undefined,
                                lastName: undefined
                            };
                            return (React.createElement(UserAvatarLabel, { user: user, label: (_b = option === null || option === void 0 ? void 0 : option.label) !== null && _b !== void 0 ? _b : resolveAssigneeLabel(currentTask.assigneeId, currentTask.assigneeUsername, assigneeOptions), size: 20, typographyVariant: "body2" }));
                        } },
                        assigneeOptions.map(function (option) { return (React.createElement(AssigneeMenuItem, { key: option.id, option: option })); }),
                        !assigneeById.has(currentTask.assigneeId) && (React.createElement(MenuItem, { value: currentTask.assigneeId },
                            React.createElement(UserAvatarLabel, { user: {
                                    username: (_b = currentTask.assigneeUsername) !== null && _b !== void 0 ? _b : "user-".concat(currentTask.assigneeId),
                                    firstName: undefined,
                                    lastName: undefined
                                }, label: currentTask.assigneeUsername || "User ".concat(currentTask.assigneeId), size: 22 })))))) : (currentTask.assigneeUsername && (React.createElement(UserAvatarLabel, { user: { username: currentTask.assigneeUsername }, label: currentTask.assigneeUsername, size: 24, typographyVariant: "body2" }))),
                React.createElement(FormControl, { size: "small", fullWidth: true, disabled: currentTask.archived },
                    React.createElement(InputLabel, { id: "calendar-task-priority-label" }, "Priority"),
                    React.createElement(Select, { labelId: "calendar-task-priority-label", label: "Priority", value: (_c = currentTask.priority) !== null && _c !== void 0 ? _c : 'medium', onChange: function (e) { return handlePriorityChange(e.target.value); } },
                        React.createElement(MenuItem, { value: "high" }, "High"),
                        React.createElement(MenuItem, { value: "medium" }, "Medium"),
                        React.createElement(MenuItem, { value: "low" }, "Low"))))),
        React.createElement(DialogActions, { sx: { px: 2, py: 1.5, justifyContent: 'space-between' } },
            React.createElement(Button, { size: "small", onClick: function () { return handleArchive(!currentTask.archived); }, color: currentTask.archived ? 'primary' : 'inherit' }, currentTask.archived ? 'Unarchive' : 'Archive'),
            React.createElement(Button, { onClick: onClose, variant: "contained" }, "Close"))));
};

var CalendarEventActionsContext = createContext(null);
function useCalendarEventActions() {
    var context = useContext(CalendarEventActionsContext);
    if (!context) {
        throw new Error('useCalendarEventActions must be used within CalendarEventActionsProvider');
    }
    return context;
}
function workflowPackageToCardRecord(pkg) {
    return {
        id: pkg.id,
        name: pkg.title,
        desc: pkg.description || '',
        dueOn: pkg.dueOn,
        url: null,
        cover: { color: pkg.coverColor || 'blue' },
        badges: { attachments: 0, comments: 0 }
    };
}
function CalendarEventActionsProvider(_a) {
    var children = _a.children, onChanged = _a.onChanged;
    var siteId = useActiveSiteId();
    var _b = useState(null), packageCard = _b[0], setPackageCard = _b[1];
    var _c = useState(false), packageDialogOpen = _c[0], setPackageDialogOpen = _c[1];
    var _d = useState(null), task = _d[0], setTask = _d[1];
    var _e = useState(false), taskDialogOpen = _e[0], setTaskDialogOpen = _e[1];
    var refreshCalendar = useCallback$1(function () {
        onChanged === null || onChanged === void 0 ? void 0 : onChanged();
        notifyCalendarUpdated();
    }, [onChanged]);
    var openPackage = useCallback$1(function (packageId) {
        if (!siteId) {
            return;
        }
        getWorkflowPackage(siteId, packageId).subscribe({
            next: function (response) {
                var _a, _b;
                var pkg = (_b = (_a = response.response) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b.workflowPackage;
                if (!(pkg === null || pkg === void 0 ? void 0 : pkg.id)) {
                    return;
                }
                setPackageCard(workflowPackageToCardRecord(pkg));
                setPackageDialogOpen(true);
            },
            error: function (e) {
                console.error(e);
            }
        });
    }, [siteId]);
    var openEvent = useCallback$1(function (event) {
        var pkg = getPackageFromCalendarEvent(event);
        if (pkg === null || pkg === void 0 ? void 0 : pkg.id) {
            openPackage(pkg.id);
            return;
        }
        var taskEvent = getTaskFromCalendarEvent(event);
        if (taskEvent) {
            setTask(taskEvent);
            setTaskDialogOpen(true);
        }
    }, [openPackage]);
    var openPackageFromTask = useCallback$1(function (packageId) {
        setTaskDialogOpen(false);
        setTask(null);
        openPackage(packageId);
    }, [openPackage]);
    var contextValue = useMemo$1(function () { return ({ openEvent: openEvent }); }, [openEvent]);
    return (React.createElement(CalendarEventActionsContext.Provider, { value: contextValue },
        children,
        packageCard && (React.createElement(BoardCard, { dialogOnly: true, card: packageCard, detailsOpen: packageDialogOpen, onDetailsClose: function () {
                setPackageDialogOpen(false);
                setPackageCard(null);
            }, onPackageChanged: refreshCalendar })),
        React.createElement(TaskDetailDialog, { open: taskDialogOpen, task: task, onClose: function () {
                setTaskDialogOpen(false);
                setTask(null);
            }, onOpenPackage: openPackageFromTask, onChanged: refreshCalendar })));
}

/**
 * Aggregates date-based items from all registered calendar sources.
 * Add new sources here (e.g. campaigns) as they become available.
 */
function loadSiteCalendarEvents(siteId) {
    return forkJoin([
        loadTaskCalendarEvents(siteId).pipe(catchError(function () { return of([]); })),
        loadPackageCalendarEvents(siteId).pipe(catchError(function () { return of([]); }))
        // loadCampaignCalendarEvents(siteId).pipe(catchError(() => of([]))),
    ]).pipe(map(function (groups) { return groups.flat(); }));
}

function calendarEventBorderColor(theme, event) {
    var _a, _b, _c;
    if (event.accentHex) {
        return event.accentHex;
    }
    var accent = (_a = event.accentColor) !== null && _a !== void 0 ? _a : 'primary';
    return (_c = (_b = theme.palette[accent]) === null || _b === void 0 ? void 0 : _b.main) !== null && _c !== void 0 ? _c : theme.palette.primary.main;
}
function CalendarSourceIcon(_a) {
    var event = _a.event, _b = _a.fontSize, fontSize = _b === void 0 ? 'small' : _b;
    if (event.sourceId === 'package') {
        return React.createElement(AccountTreeOutlinedIcon, { fontSize: fontSize, sx: { flexShrink: 0 } });
    }
    return React.createElement(TaskAltRoundedIcon, { fontSize: fontSize, sx: { flexShrink: 0 } });
}

function eventOccursOnDay(event, day) {
    var start = parseCalendarDate(event.startsOn);
    if (!start) {
        return false;
    }
    if (isSameDay(start, day)) {
        return true;
    }
    var end = parseCalendarDate(event.endsOn);
    if (!end) {
        return false;
    }
    var dayStart = startOfDay(day).getTime();
    var rangeStart = startOfDay(start).getTime();
    var rangeEnd = startOfDay(end).getTime();
    return dayStart >= rangeStart && dayStart <= rangeEnd;
}
function partitionEventsByDate(events) {
    var scheduled = [];
    var unscheduled = [];
    events.forEach(function (event) {
        if (parseCalendarDate(event.startsOn)) {
            scheduled.push(event);
        }
        else {
            unscheduled.push(event);
        }
    });
    return { scheduled: scheduled, unscheduled: unscheduled };
}
function eventsForDay(events, day) {
    return events
        .filter(function (event) { return eventOccursOnDay(event, day); })
        .sort(function (a, b) {
        var _a, _b, _c, _d;
        var startA = (_b = (_a = parseCalendarDate(a.startsOn)) === null || _a === void 0 ? void 0 : _a.getTime()) !== null && _b !== void 0 ? _b : 0;
        var startB = (_d = (_c = parseCalendarDate(b.startsOn)) === null || _c === void 0 ? void 0 : _c.getTime()) !== null && _d !== void 0 ? _d : 0;
        if (startA !== startB) {
            return startA - startB;
        }
        var sourceCompare = String(a.sourceId).localeCompare(String(b.sourceId));
        if (sourceCompare !== 0) {
            return sourceCompare;
        }
        return a.title.localeCompare(b.title);
    });
}
function isCountableCalendarEvent(event) {
    return !(event.sourceId === 'task' && event.complete);
}
function countEventsOnDay(events, day) {
    return eventsForDay(events, day).filter(isCountableCalendarEvent).length;
}
function formatEventTime(startsOn) {
    var date = parseCalendarDate(startsOn);
    if (!date) {
        return '';
    }
    return date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
}
function eventRangePosition(event, day) {
    if (!eventOccursOnDay(event, day)) {
        return null;
    }
    var start = parseCalendarDate(event.startsOn);
    var end = parseCalendarDate(event.endsOn);
    if (!start) {
        return null;
    }
    if (!end || isSameDay(start, end)) {
        return 'single';
    }
    if (isSameDay(day, start)) {
        return 'start';
    }
    if (isSameDay(day, end)) {
        return 'end';
    }
    return 'middle';
}
function isMultiDayEvent(event) {
    var start = parseCalendarDate(event.startsOn);
    var end = parseCalendarDate(event.endsOn);
    return !!(start && end && !isSameDay(start, end));
}

function calendarEventRangeSx(theme, event, _day, position) {
    var borderColor = calendarEventBorderColor(theme, event);
    var isRange = position === 'start' || position === 'middle' || position === 'end';
    return {
        borderLeft: "3px solid ".concat(borderColor),
        borderTopLeftRadius: position === 'start' || position === 'single' ? 6 : 0,
        borderBottomLeftRadius: position === 'start' || position === 'single' ? 6 : 0,
        borderTopRightRadius: position === 'end' || position === 'single' ? 6 : 0,
        borderBottomRightRadius: position === 'end' || position === 'single' ? 6 : 0,
        ml: position === 'middle' || position === 'end' ? -0.5 : 0,
        mr: position === 'middle' || position === 'start' ? -0.5 : 0,
        px: isRange ? 0.75 : undefined,
        bgcolor: event.complete ? 'action.hover' : isRange ? 'action.selected' : undefined
    };
}
function shouldShowEventTitle(position) {
    return position !== 'middle';
}
function resolveEventRangePosition(event, day) {
    return eventRangePosition(event, day);
}

function CalendarEventItem(_a) {
    var event = _a.event, day = _a.day, _b = _a.compact, compact = _b === void 0 ? false : _b, onChanged = _a.onChanged;
    var siteId = useActiveSiteId();
    var openEvent = useCalendarEventActions().openEvent;
    var task = getTaskFromCalendarEvent(event);
    var handleComplete = function (complete) {
        if (!siteId || !task) {
            return;
        }
        completeTask(siteId, task.id, complete).subscribe({
            next: function () {
                notifyTasksUpdated();
                notifyCalendarUpdated();
                onChanged === null || onChanged === void 0 ? void 0 : onChanged();
            },
            error: function (e) {
                console.error(e);
            }
        });
    };
    var handleOpen = function () {
        openEvent(event);
    };
    var rangePosition = day ? resolveEventRangePosition(event, day) : null;
    var showTitle = !day || shouldShowEventTitle(rangePosition);
    var multiDay = isMultiDayEvent(event);
    var scheduleLabel = (function () {
        if (!multiDay || compact) {
            return event.startsOn ? formatEventTime(event.startsOn) : '';
        }
        var start = parseCalendarDate(event.startsOn);
        var end = parseCalendarDate(event.endsOn);
        if (start && end) {
            return "".concat(formatCalendarDayHeading(start), " \u2013 ").concat(formatCalendarDayHeading(end));
        }
        return '';
    })();
    return (React.createElement(Box, { component: "button", type: "button", onClick: handleOpen, "aria-label": showTitle ? event.title : undefined, sx: __spreadArray([
            function (theme) { return ({
                display: 'flex',
                alignItems: 'flex-start',
                gap: showTitle ? 0.5 : 0,
                px: compact ? 0.5 : 0.75,
                py: compact ? (showTitle ? 0.35 : 0.5) : showTitle ? 0.5 : 0.65,
                borderRadius: 1,
                border: rangePosition && rangePosition !== 'single' ? 0 : 1,
                borderColor: 'divider',
                borderLeftWidth: rangePosition && rangePosition !== 'single' ? 0 : 3,
                borderLeftColor: calendarEventBorderColor(theme, event),
                bgcolor: event.complete ? 'action.hover' : 'background.paper',
                opacity: event.archived ? 0.75 : 1,
                minWidth: 0,
                width: '100%',
                minHeight: showTitle ? undefined : compact ? 10 : 14,
                textAlign: 'left',
                cursor: 'pointer',
                font: 'inherit',
                '&:hover': {
                    bgcolor: event.complete ? 'action.selected' : 'action.hover'
                }
            }); }
        ], (day ? [function (theme) { return calendarEventRangeSx(theme, event, day, rangePosition); }] : []), true) },
        task && showTitle && (React.createElement(Checkbox, { size: "small", checked: !!event.complete, disabled: !!event.archived, onClick: function (e) { return e.stopPropagation(); }, onChange: function (e) {
                e.stopPropagation();
                handleComplete(e.target.checked);
            }, sx: { p: 0, mt: compact ? 0 : 0.1, flexShrink: 0 } })),
        React.createElement(Box, { sx: { minWidth: 0, flex: 1, display: showTitle ? 'block' : 'none' } },
            React.createElement(Stack, { direction: "row", spacing: 0.5, alignItems: "flex-start", sx: { mb: compact ? 0 : 0.25, minWidth: 0 } },
                React.createElement(Box, { sx: { color: 'text.secondary', mt: compact ? 0.05 : 0.15, display: 'flex' } },
                    React.createElement(CalendarSourceIcon, { event: event, fontSize: compact ? 'inherit' : 'small' })),
                React.createElement(Typography, { variant: compact ? 'caption' : 'body2', sx: {
                        fontWeight: 600,
                        wordBreak: 'break-word',
                        textDecoration: event.complete ? 'line-through' : 'none',
                        color: event.complete ? 'text.secondary' : 'text.primary',
                        lineHeight: 1.3,
                        minWidth: 0
                    } }, event.title)),
            !compact && scheduleLabel && (React.createElement(Typography, { variant: "caption", color: "text.secondary", sx: { display: 'block' } }, scheduleLabel)),
            (task === null || task === void 0 ? void 0 : task.targetType) === TASK_TARGET.WORKFLOW_PACKAGE && task.targetId && task.targetTitle && (React.createElement(Typography, { variant: "caption", color: "text.secondary", sx: { display: 'block', mt: 0.25, wordBreak: 'break-word' } }, task.targetTitle)),
            !compact && event.subtitle && (React.createElement(Typography, { variant: "caption", color: "text.secondary", sx: { display: 'block' } }, event.subtitle)))));
}

var STORAGE_KEY = 'crafterwf:calendar-view-mode';
var VALID_MODES = ['day', 'week', 'month'];
function isCalendarViewMode(value) {
    return typeof value === 'string' && VALID_MODES.includes(value);
}
function storageKey(siteId) {
    return siteId ? "".concat(STORAGE_KEY, ":").concat(siteId) : STORAGE_KEY;
}
function readCalendarViewMode(siteId, fallback) {
    if (typeof window === 'undefined') {
        return fallback;
    }
    try {
        var stored = window.localStorage.getItem(storageKey(siteId));
        return isCalendarViewMode(stored) ? stored : fallback;
    }
    catch (_a) {
        return fallback;
    }
}
function writeCalendarViewMode(siteId, mode) {
    if (typeof window === 'undefined') {
        return;
    }
    try {
        window.localStorage.setItem(storageKey(siteId), mode);
    }
    catch (_a) {
        // Ignore quota / private mode errors
    }
}

var WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
function MonthCalendarEventChip(_a) {
    var event = _a.event, day = _a.day;
    var openEvent = useCalendarEventActions().openEvent;
    var rangePosition = resolveEventRangePosition(event, day);
    var showTitle = shouldShowEventTitle(rangePosition);
    return (React.createElement(Tooltip, { title: event.title, placement: "top" },
        React.createElement(Box, { component: "button", type: "button", "aria-label": event.title, onClick: function () { return openEvent(event); }, sx: [
                function (theme) { return ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: showTitle ? 0.35 : 0,
                    minWidth: 0,
                    width: '100%',
                    px: 0.5,
                    py: showTitle ? 0.2 : 0.45,
                    borderRadius: 0.75,
                    border: 0,
                    bgcolor: event.complete ? 'action.hover' : 'background.default',
                    borderLeft: "3px solid ".concat(calendarEventBorderColor(theme, event)),
                    cursor: 'pointer',
                    font: 'inherit',
                    textAlign: 'left',
                    minHeight: showTitle ? undefined : 8,
                    '&:hover': {
                        bgcolor: 'action.selected'
                    }
                }); },
                function (theme) { return calendarEventRangeSx(theme, event, day, rangePosition); }
            ] }, showTitle && (React.createElement(React.Fragment, null,
            React.createElement(Box, { sx: { color: 'text.secondary', display: 'flex', flexShrink: 0 } },
                React.createElement(CalendarSourceIcon, { event: event, fontSize: "inherit" })),
            React.createElement(Typography, { variant: "caption", noWrap: true, sx: {
                    minWidth: 0,
                    textDecoration: event.complete ? 'line-through' : 'none',
                    color: event.complete ? 'text.secondary' : 'text.primary'
                } }, event.title))))));
}
var SiteCalendarView = function (_a) {
    var _b = _a.defaultViewMode, defaultViewMode = _b === void 0 ? 'day' : _b;
    var siteId = useActiveSiteId();
    var _c = useState([]), events = _c[0], setEvents = _c[1];
    var _d = useState(false), loading = _d[0], setLoading = _d[1];
    var _e = useState(null), error = _e[0], setError = _e[1];
    var _f = useState(function () { return readCalendarViewMode(undefined, defaultViewMode); }), viewMode = _f[0], setViewMode = _f[1];
    var _g = useState(function () { return startOfDay(new Date()); }), anchorDate = _g[0], setAnchorDate = _g[1];
    var _h = useState(false), showUnscheduled = _h[0], setShowUnscheduled = _h[1];
    useEffect(function () {
        setViewMode(readCalendarViewMode(siteId, defaultViewMode));
    }, [siteId, defaultViewMode]);
    var loadEvents = useCallback$1(function () {
        if (!siteId) {
            setEvents([]);
            setLoading(false);
            setError(null);
            return;
        }
        setLoading(true);
        setError(null);
        loadSiteCalendarEvents(siteId).subscribe({
            next: function (allEvents) {
                setEvents(allEvents);
                setLoading(false);
            },
            error: function (e) {
                console.error(e);
                setError('Unable to load calendar.');
                setEvents([]);
                setLoading(false);
            }
        });
    }, [siteId]);
    useEffect(function () {
        loadEvents();
        var handleUpdated = function () { return loadEvents(); };
        window.addEventListener(TASKS_UPDATED_EVENT, handleUpdated);
        window.addEventListener(CALENDAR_UPDATED_EVENT, handleUpdated);
        return function () {
            window.removeEventListener(TASKS_UPDATED_EVENT, handleUpdated);
            window.removeEventListener(CALENDAR_UPDATED_EVENT, handleUpdated);
        };
    }, [loadEvents]);
    var _j = useMemo$1(function () { return partitionEventsByDate(events); }, [events]), scheduled = _j.scheduled, unscheduled = _j.unscheduled;
    var heading = useMemo$1(function () {
        if (viewMode === 'day') {
            return formatCalendarDayHeading(anchorDate);
        }
        if (viewMode === 'week') {
            var weekStart = startOfWeek(anchorDate);
            return formatCalendarWeekHeading(weekStart, endOfWeek(anchorDate));
        }
        return formatCalendarMonthHeading(anchorDate);
    }, [anchorDate, viewMode]);
    var goToday = function () {
        setAnchorDate(startOfDay(new Date()));
    };
    var handleViewModeChange = function (_event, value) {
        if (!value) {
            return;
        }
        setViewMode(value);
        writeCalendarViewMode(siteId, value);
    };
    var renderDayEvents = function (day, compact) {
        if (compact === void 0) { compact = false; }
        var dayEvents = eventsForDay(scheduled, day);
        if (dayEvents.length === 0) {
            return compact ? null : (React.createElement(Typography, { variant: "body2", color: "text.secondary", sx: { py: 1 } }, "Nothing scheduled this day."));
        }
        return (React.createElement(Stack, { spacing: compact ? 0.5 : 0.75 }, dayEvents.map(function (event) { return (React.createElement(CalendarEventItem, { key: event.id, event: event, day: day, compact: compact, onChanged: loadEvents })); })));
    };
    var renderDayView = function () { return renderDayEvents(anchorDate, false); };
    var renderWeekView = function () {
        var days = getWeekDayDates(anchorDate);
        var today = startOfDay(new Date());
        return (React.createElement(Box, { sx: {
                display: 'grid',
                gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
                gap: 0.75,
                minHeight: 0,
                flex: 1,
                overflow: 'hidden'
            } }, days.map(function (day) {
            var isToday = isSameDay(day, today);
            return (React.createElement(Box, { key: day.toISOString(), sx: {
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: 0,
                    minHeight: 0,
                    border: 1,
                    borderColor: isToday ? 'primary.main' : 'divider',
                    borderRadius: 1,
                    bgcolor: isToday ? 'action.selected' : 'background.paper',
                    overflow: 'hidden'
                } },
                React.createElement(Box, { sx: { px: 0.75, py: 0.5, borderBottom: 1, borderColor: 'divider', flexShrink: 0 } },
                    React.createElement(Typography, { variant: "caption", fontWeight: 700, sx: { display: 'block' } }, formatCalendarDayLabel(day))),
                React.createElement(Box, { sx: { p: 0.5, overflowY: 'auto', flex: 1, minHeight: 0 } }, renderDayEvents(day, true))));
        })));
    };
    var renderMonthView = function () {
        var days = getMonthGridDays(anchorDate);
        var today = startOfDay(new Date());
        return (React.createElement(Box, { sx: { display: 'flex', flexDirection: 'column', minHeight: 0, flex: 1, overflow: 'hidden' } },
            React.createElement(Box, { sx: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
                    gap: 0.5,
                    mb: 0.5,
                    flexShrink: 0
                } }, WEEKDAY_LABELS.map(function (label) { return (React.createElement(Typography, { key: label, variant: "caption", color: "text.secondary", sx: { fontWeight: 700, textAlign: 'center', py: 0.25 } }, label)); })),
            React.createElement(Box, { sx: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
                    gridAutoRows: 'minmax(88px, 1fr)',
                    gap: 0.5,
                    flex: 1,
                    minHeight: 0,
                    overflow: 'auto'
                } }, days.map(function (day) {
                var dayEvents = eventsForDay(scheduled, day);
                var inMonth = isSameMonth(day, anchorDate);
                var isToday = isSameDay(day, today);
                var visibleEvents = dayEvents.slice(0, 3);
                var hiddenCount = dayEvents.length - visibleEvents.length;
                return (React.createElement(Box, { key: day.toISOString(), sx: {
                        border: 1,
                        borderColor: isToday ? 'primary.main' : 'divider',
                        borderRadius: 1,
                        p: 0.5,
                        minWidth: 0,
                        bgcolor: isToday ? 'action.selected' : inMonth ? 'background.paper' : 'action.hover',
                        opacity: inMonth ? 1 : 0.72,
                        overflow: 'hidden'
                    } },
                    React.createElement(Typography, { variant: "caption", fontWeight: 700, sx: { display: 'block', mb: 0.25 } }, day.getDate()),
                    React.createElement(Stack, { spacing: 0.35 },
                        visibleEvents.map(function (event) { return (React.createElement(MonthCalendarEventChip, { key: "".concat(event.id, ":").concat(day.toISOString()), event: event, day: day })); }),
                        hiddenCount > 0 && (React.createElement(Typography, { variant: "caption", color: "text.secondary", sx: { pl: 0.5 } },
                            "+",
                            hiddenCount,
                            " more")))));
            }))));
    };
    var unscheduledTasks = unscheduled.filter(function (event) { return event.sourceId === 'task' && !event.complete; });
    return (React.createElement(CalendarEventActionsProvider, { onChanged: loadEvents },
        React.createElement(Stack, { spacing: 1.25, sx: { minWidth: 0, width: '100%', height: '100%', minHeight: 420 } },
            React.createElement(Stack, { direction: "row", alignItems: "center", justifyContent: "space-between", spacing: 1, sx: { flexShrink: 0 } },
                React.createElement(Stack, { direction: "row", alignItems: "center", spacing: 0.5 },
                    React.createElement(IconButton, { size: "small", "aria-label": "Previous period", onClick: function () { return setAnchorDate(function (current) { return shiftAnchorDate(current, viewMode, -1); }); } },
                        React.createElement(ChevronLeftRoundedIcon, { fontSize: "small" })),
                    React.createElement(Button, { size: "small", onClick: goToday, sx: { minWidth: 0, px: 1 } }, "Today"),
                    React.createElement(IconButton, { size: "small", "aria-label": "Next period", onClick: function () { return setAnchorDate(function (current) { return shiftAnchorDate(current, viewMode, 1); }); } },
                        React.createElement(ChevronRightRounded, { fontSize: "small" }))),
                React.createElement(ToggleButtonGroup, { size: "small", exclusive: true, value: viewMode, onChange: handleViewModeChange },
                    React.createElement(ToggleButton, { value: "day" }, "Day"),
                    React.createElement(ToggleButton, { value: "week" }, "Week"),
                    React.createElement(ToggleButton, { value: "month" }, "Month"))),
            React.createElement(Typography, { variant: "subtitle2", sx: { fontWeight: 700, flexShrink: 0 } }, heading),
            React.createElement(Box, { sx: { flex: 1, minHeight: 280, display: 'flex', flexDirection: 'column', overflow: 'hidden' } }, loading && events.length === 0 ? (React.createElement(Box, { sx: { display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, py: 4 } },
                React.createElement(CircularProgress, { size: 28 }))) : error ? (React.createElement(Typography, { variant: "body2", color: "error", sx: { px: 0.5, py: 1 } }, error)) : (React.createElement(React.Fragment, null,
                viewMode === 'day' && renderDayView(),
                viewMode === 'week' && renderWeekView(),
                viewMode === 'month' && renderMonthView()))),
            unscheduledTasks.length > 0 && (React.createElement(Box, { sx: { flexShrink: 0, pt: 0.5, borderTop: 1, borderColor: 'divider' } },
                React.createElement(Button, { size: "small", sx: { px: 0.5, minWidth: 0, mb: 0.5 }, onClick: function () { return setShowUnscheduled(function (prev) { return !prev; }); } },
                    showUnscheduled ? 'Hide' : 'Show',
                    " unscheduled tasks (",
                    unscheduledTasks.length,
                    ")"),
                showUnscheduled && (React.createElement(Stack, { spacing: 0.75, sx: { maxHeight: 180, overflowY: 'auto' } }, unscheduledTasks.map(function (event) { return (React.createElement(CalendarEventItem, { key: event.id, event: event, onChanged: loadEvents })); }))))))));
};

/** Content widget for Studio's SHOW_WIDGET_DIALOG shell. */
var CalendarDialog = function () { return (React.createElement(Box, { sx: function (theme) { return ({
        width: '100%',
        minWidth: 0,
        boxSizing: 'border-box',
        px: theme.spacing(2.5),
        py: theme.spacing(2),
        minHeight: 480,
        height: 'min(65vh, 720px)',
        maxHeight: 'calc(100vh - 120px)',
        display: 'flex',
        flexDirection: 'column'
    }); } },
    React.createElement(SiteCalendarView, { defaultViewMode: "day" }))); };

var CALENDAR_DIALOG_WIDGET_ID = 'org.rd.plugin.crafterwf.calendarDialog';
/** Resolve at runtime — avoids bundling studio-ui dialog actions into the plugin. */
function showWidgetDialogAction() {
    var craftercms = window.craftercms;
    return craftercms.libs.ReduxToolkit.createAction('SHOW_WIDGET_DIALOG');
}
function openCalendarDialog(dispatch, title, siteId) {
    if (title === void 0) { title = 'Calendar'; }
    dispatch(showWidgetDialogAction()({
        title: title,
        fullHeight: false,
        maxWidth: 'lg',
        PaperProps: {
            sx: {
                m: { xs: 1.5, sm: 2.5 },
                maxHeight: 'calc(100vh - 32px)',
                borderRadius: 2
            }
        },
        widget: createCrafterwfWidgetDescriptor(CALENDAR_DIALOG_WIDGET_ID, siteId)
    }));
}

function CalendarToolbarButton(props) {
    var dispatch = useDispatch();
    var siteId = useActiveSiteId();
    var title = typeof props.title === 'string' && props.title.trim() ? props.title : 'Calendar';
    var _a = useState(0), todayCount = _a[0], setTodayCount = _a[1];
    var refreshTodayCount = useCallback$1(function () {
        if (!siteId) {
            setTodayCount(0);
            return;
        }
        loadSiteCalendarEvents(siteId).subscribe({
            next: function (events) {
                setTodayCount(countEventsOnDay(events, startOfDay(new Date())));
            },
            error: function (e) {
                console.error(e);
            }
        });
    }, [siteId]);
    useEffect(function () {
        refreshTodayCount();
        var intervalId = window.setInterval(refreshTodayCount, 60000);
        var handleUpdated = function () { return refreshTodayCount(); };
        window.addEventListener(TASKS_UPDATED_EVENT, handleUpdated);
        window.addEventListener(CALENDAR_UPDATED_EVENT, handleUpdated);
        return function () {
            window.clearInterval(intervalId);
            window.removeEventListener(TASKS_UPDATED_EVENT, handleUpdated);
            window.removeEventListener(CALENDAR_UPDATED_EVENT, handleUpdated);
        };
    }, [refreshTodayCount]);
    var openCalendar = function () {
        openCalendarDialog(dispatch, title, siteId !== null && siteId !== void 0 ? siteId : undefined);
        refreshTodayCount();
    };
    return (React.createElement(Tooltip, { title: title },
        React.createElement("span", null,
            React.createElement(IconButton, __assign({ "aria-label": title, size: "large" }, props, { onClick: openCalendar }),
                React.createElement(Badge, { badgeContent: todayCount > 0 ? todayCount : undefined, color: "primary", max: 99 },
                    React.createElement(CalendarMonthRoundedIcon, null))))));
}

var PURPLE_BADGE_SX = {
    '& .MuiBadge-badge': {
        backgroundColor: '#9c27b0',
        color: '#fff'
    }
};
function ActiveWorkflowsToolbarButton(props) {
    var _this = this;
    var dispatch = useDispatch();
    var siteId = useActiveSiteId();
    var contentPath = usePreviewContentPath();
    var title = typeof props.title === 'string' && props.title.trim() ? props.title : 'Active workflows';
    var _a = useState([]), packages = _a[0], setPackages = _a[1];
    var _b = useState(false), loading = _b[0], setLoading = _b[1];
    var _c = useState(false), starting = _c[0], setStarting = _c[1];
    var _d = useState(null), menuAnchor = _d[0], setMenuAnchor = _d[1];
    var _e = useState(false), startDialogOpen = _e[0], setStartDialogOpen = _e[1];
    var _f = useState([]), workflows = _f[0], setWorkflows = _f[1];
    var workflowGroups = useMemo$1(function () { return groupPackagesByWorkflow(packages); }, [packages]);
    var packageCount = packages.length;
    var refreshPackages = useCallback$1(function () {
        if (!siteId || !contentPath) {
            setPackages([]);
            return;
        }
        setLoading(true);
        findPackagesByContentPath(siteId, contentPath, true, false).subscribe({
            next: function (response) {
                var _a, _b, _c;
                setPackages((_c = (_b = (_a = response.response) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b.packages) !== null && _c !== void 0 ? _c : []);
                setLoading(false);
            },
            error: function (e) {
                console.error(e);
                setPackages([]);
                setLoading(false);
            }
        });
    }, [contentPath, siteId]);
    useEffect(function () {
        refreshPackages();
        var intervalId = window.setInterval(refreshPackages, 30000);
        var handleUpdated = function () { return refreshPackages(); };
        window.addEventListener(WORKFLOWS_UPDATED_EVENT, handleUpdated);
        return function () {
            window.clearInterval(intervalId);
            window.removeEventListener(WORKFLOWS_UPDATED_EVENT, handleUpdated);
        };
    }, [refreshPackages]);
    var loadWorkflows = function () {
        return new Promise(function (resolve, reject) {
            if (!siteId) {
                resolve([]);
                return;
            }
            listWorkflows(siteId).subscribe({
                next: function (response) {
                    var _a, _b, _c;
                    var list = (_c = (_b = (_a = response.response) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b.workflows) !== null && _c !== void 0 ? _c : [];
                    setWorkflows(list);
                    resolve(list);
                },
                error: function (err) {
                    console.error(err);
                    reject(err);
                }
            });
        });
    };
    var handleStartOnWorkflow = function (workflow) { return __awaiter(_this, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!siteId || !contentPath) {
                        return [2 /*return*/];
                    }
                    setStartDialogOpen(false);
                    setStarting(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, startWorkflowPackageForContent(dispatch, siteId, contentPath, workflow)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    e_1 = _a.sent();
                    console.error(e_1);
                    window.alert('Unable to start workflow. Check Project Tools → Workflows and try again.');
                    return [3 /*break*/, 5];
                case 4:
                    setStarting(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleStartWorkflow = function () { return __awaiter(_this, void 0, void 0, function () {
        var available, _a, e_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!contentPath) {
                        return [2 /*return*/];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 7, , 8]);
                    if (!workflows.length) return [3 /*break*/, 2];
                    _a = workflows;
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, loadWorkflows()];
                case 3:
                    _a = _b.sent();
                    _b.label = 4;
                case 4:
                    available = _a;
                    if (!available.length) {
                        window.alert('No workflows are configured for this site. Create one in Project Tools → Crafter Workflow.');
                        return [2 /*return*/];
                    }
                    if (!(available.length === 1)) return [3 /*break*/, 6];
                    return [4 /*yield*/, handleStartOnWorkflow(available[0])];
                case 5:
                    _b.sent();
                    return [2 /*return*/];
                case 6:
                    setStartDialogOpen(true);
                    return [3 /*break*/, 8];
                case 7:
                    e_2 = _b.sent();
                    console.error(e_2);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    var handleOpenWorkflowGroup = function (group) {
        setMenuAnchor(null);
        openWorkflowBoardForGroup(dispatch, group);
    };
    var handleClick = function (event) {
        if (!contentPath) {
            return;
        }
        if (packageCount === 0) {
            handleStartWorkflow();
            return;
        }
        if (workflowGroups.length === 1) {
            openWorkflowBoardForGroup(dispatch, workflowGroups[0]);
            return;
        }
        setMenuAnchor(event.currentTarget);
    };
    var tooltipTitle = !contentPath
        ? 'Open a page in preview to see active workflows'
        : packageCount === 0
            ? "".concat(title, " \u2014 start a workflow for this page")
            : packageCount === 1
                ? "".concat(title, " \u2014 1 active package on this page")
                : "".concat(title, " \u2014 ").concat(packageCount, " active packages on this page");
    return (React.createElement(React.Fragment, null,
        React.createElement(Tooltip, { title: tooltipTitle },
            React.createElement("span", null,
                React.createElement(IconButton, __assign({ "aria-label": title, onClick: handleClick, size: "large", disabled: !contentPath || loading || starting }, props),
                    React.createElement(Badge, { badgeContent: packageCount > 0 ? packageCount : undefined, max: 99, sx: PURPLE_BADGE_SX }, starting ? React.createElement(CircularProgress, { size: 22, color: "inherit" }) : React.createElement(AccountTreeOutlinedIcon, null))))),
        React.createElement(Menu$1, { anchorEl: menuAnchor, open: Boolean(menuAnchor), onClose: function () { return setMenuAnchor(null); }, anchorOrigin: { vertical: 'bottom', horizontal: 'right' }, transformOrigin: { vertical: 'top', horizontal: 'right' } }, workflowGroups.map(function (group) { return (React.createElement(MenuItem, { key: group.workflowId, onClick: function () { return handleOpenWorkflowGroup(group); } },
            React.createElement(ListItemText$1, { primary: group.workflowName, secondary: "".concat(group.packages.length, " package").concat(group.packages.length === 1 ? '' : 's') }))); })),
        React.createElement(Dialog, { open: startDialogOpen, onClose: function () { return setStartDialogOpen(false); }, fullWidth: true, maxWidth: "xs" },
            React.createElement(DialogTitle, null, "Start a workflow"),
            React.createElement(DialogContent, null,
                React.createElement(Typography, { variant: "body2", color: "text.secondary", sx: { mb: 1 } }, "Choose a workflow for this page. A new package will be created on the first step with this content attached."),
                React.createElement(List, { disablePadding: true, dense: true }, workflows.map(function (workflow) { return (React.createElement(ListItemButton, { key: workflow.id, onClick: function () { return handleStartOnWorkflow(workflow); }, disabled: starting },
                    React.createElement(ListItemText$1, { primary: workflow.name, secondary: workflow.description || undefined }))); }))),
            React.createElement(DialogActions, null,
                React.createElement(Button, { onClick: function () { return setStartDialogOpen(false); }, disabled: starting }, "Cancel")))));
}

var SchemaInstallDialog = function (_a) {
    var open = _a.open, siteId = _a.siteId, onClose = _a.onClose, onInstalled = _a.onInstalled;
    var _b = useState('installing'), phase = _b[0], setPhase = _b[1];
    var _c = useState(null), status = _c[0], setStatus = _c[1];
    var _d = useState(), error = _d[0], setError = _d[1];
    var onInstalledRef = useRef(onInstalled);
    onInstalledRef.current = onInstalled;
    useEffect(function () {
        if (!open || !siteId) {
            return;
        }
        setPhase('installing');
        setStatus(null);
        setError(undefined);
        var sub = installSchema(siteId).subscribe({
            next: function (response) {
                var result = response.response.result;
                setStatus(result);
                if (result.installed) {
                    setPhase('success');
                    onInstalledRef.current(result);
                }
                else {
                    setPhase('error');
                    setError({
                        code: '?',
                        message: [result.error, result.detail].filter(Boolean).join(' — ') ||
                            'Schema installation did not complete.'
                    });
                }
            },
            error: function (e) {
                var _a, _b;
                console.error(e);
                setPhase('error');
                setError((_b = (_a = e.response) === null || _a === void 0 ? void 0 : _a.response) !== null && _b !== void 0 ? _b : {
                    code: '?',
                    message: 'Schema installation failed. Check Studio logs and database grants.'
                });
            }
        });
        return function () { return sub.unsubscribe(); };
    }, [open, siteId]);
    var canClose = phase !== 'installing';
    return (React.createElement(Dialog, { open: open, onClose: canClose ? onClose : undefined, maxWidth: "sm", fullWidth: true },
        React.createElement(DialogTitle, null, "Install workflow database"),
        React.createElement(DialogContent, null,
            phase === 'installing' && (React.createElement(Stack, { direction: "row", spacing: 2, alignItems: "center", sx: { py: 2 } },
                React.createElement(CircularProgress, { size: 28 }),
                React.createElement(Typography, { variant: "body2" }, "Creating schema and tables\u2026"))),
            phase === 'success' && status && (React.createElement(Stack, { spacing: 1.5, sx: { py: 1 } },
                React.createElement(Stack, { direction: "row", spacing: 1, alignItems: "center" },
                    React.createElement(CheckCircleRoundedIcon, { color: "success" }),
                    React.createElement(Typography, { variant: "body1", fontWeight: 600 }, "Installation complete")),
                React.createElement(Typography, { variant: "body2", color: "text.secondary" },
                    "Schema ",
                    React.createElement("strong", null, status.schemaName),
                    " is ready (version ",
                    status.version,
                    ")."))),
            phase === 'error' && (React.createElement(Box, { sx: { py: 1 } },
                React.createElement(Stack, { direction: "row", spacing: 1, alignItems: "center", sx: { mb: 1 } },
                    React.createElement(ErrorOutlineRoundedIcon, { color: "error" }),
                    React.createElement(Typography, { variant: "body1", fontWeight: 600 }, "Installation failed")),
                (status === null || status === void 0 ? void 0 : status.remedialAction) && (React.createElement(Typography, { variant: "body2", color: "text.secondary", sx: { mb: 1 } }, status.remedialAction)),
                error && React.createElement(ApiResponseErrorState, { error: error })))),
        React.createElement(DialogActions, null,
            React.createElement(Button, { onClick: onClose, disabled: !canClose, variant: "contained" }, "Close"))));
};

var GeneralTab = function (_a) {
    var onSchemaReady = _a.onSchemaReady;
    var siteId = useActiveSiteId();
    var _b = useState(true), loading = _b[0], setLoading = _b[1];
    var _c = useState(null), status = _c[0], setStatus = _c[1];
    var _d = useState(false), installDialogOpen = _d[0], setInstallDialogOpen = _d[1];
    var refreshStatus = useCallback$1(function () {
        if (!siteId) {
            return;
        }
        setLoading(true);
        getSchemaStatus(siteId).subscribe({
            next: function (response) {
                var result = response.response.result;
                setStatus(result);
                setLoading(false);
                if (result.installed) {
                    onSchemaReady === null || onSchemaReady === void 0 ? void 0 : onSchemaReady();
                }
            },
            error: function (e) {
                console.error(e);
                setLoading(false);
                setStatus(null);
            }
        });
    }, [onSchemaReady, siteId]);
    useEffect(function () {
        refreshStatus();
    }, [refreshStatus]);
    var handleInstalled = function (result) {
        setStatus(result);
        onSchemaReady === null || onSchemaReady === void 0 ? void 0 : onSchemaReady();
    };
    var handleDialogClose = function () {
        setInstallDialogOpen(false);
        refreshStatus();
    };
    return (React.createElement(Box, { sx: { p: 2, maxWidth: 720 } },
        React.createElement(Stack, { direction: "row", alignItems: "center", spacing: 1, flexWrap: "wrap" },
            React.createElement(Typography, { variant: "body1", component: "span" }, "Workflow Database:"),
            loading && React.createElement(CircularProgress, { size: 18 }),
            !loading && (status === null || status === void 0 ? void 0 : status.installed) && (React.createElement(React.Fragment, null,
                React.createElement(CheckCircleRoundedIcon, { color: "success", fontSize: "small", "aria-hidden": true }),
                React.createElement(Typography, { variant: "body1", component: "span", color: "success.main", fontWeight: 500 }, "Installed"))),
            !loading && status && !status.installed && (React.createElement(Button, { variant: "contained", size: "small", onClick: function () { return setInstallDialogOpen(true); } }, "Install")),
            !loading && !status && siteId && (React.createElement(Button, { variant: "contained", size: "small", onClick: function () { return setInstallDialogOpen(true); } }, "Install"))),
        siteId && (React.createElement(SchemaInstallDialog, { open: installDialogOpen, siteId: siteId, onClose: handleDialogClose, onInstalled: handleInstalled }))));
};

function SwatchButton(_a) {
    var swatch = _a.swatch, selected = _a.selected, resolveColor = _a.resolveColor, size = _a.size, onSelect = _a.onSelect;
    return (React.createElement(Box, { component: "button", type: "button", role: "radio", "aria-checked": selected, "aria-label": swatch.label, title: swatch.label, onClick: onSelect, sx: function (theme) { return ({
            width: size,
            height: size,
            borderRadius: '50%',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            backgroundColor: swatch.hex,
            boxShadow: selected
                ? "0 0 0 2px ".concat(theme.palette.background.paper, ", 0 0 0 4px ").concat(resolveColor(swatch.id))
                : "inset 0 0 0 1px ".concat(theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.12)'),
            transition: theme.transitions.create(['box-shadow', 'transform'], { duration: 120 }),
            '&:hover': {
                transform: 'scale(1.08)'
            },
            '&:focus-visible': {
                outline: "2px solid ".concat(theme.palette.primary.main),
                outlineOffset: 2
            }
        }); } }));
}
var ColorSwatchPicker = function (_a) {
    var _b;
    var label = _a.label, swatches = _a.swatches, value = _a.value, onChange = _a.onChange, _c = _a.resolveColor, resolveColor = _c === void 0 ? resolveStepColor : _c, _d = _a.size, size = _d === void 0 ? 28 : _d, _e = _a.variant, variant = _e === void 0 ? 'menu' : _e;
    var _f = useState(null), anchorEl = _f[0], setAnchorEl = _f[1];
    var selected = (_b = swatches.find(function (swatch) { return swatch.id === value; })) !== null && _b !== void 0 ? _b : swatches[0];
    var open = Boolean(anchorEl);
    var grid = (React.createElement(Box, { role: "radiogroup", "aria-label": label || 'Color', sx: { display: 'flex', flexWrap: 'wrap', gap: 1, maxWidth: 320 } }, swatches.map(function (swatch) { return (React.createElement(SwatchButton, { key: swatch.id, swatch: swatch, selected: value === swatch.id, resolveColor: resolveColor, size: size, onSelect: function () {
            onChange(swatch.id);
            setAnchorEl(null);
        } })); })));
    if (variant === 'inline') {
        return (React.createElement(Stack, { spacing: 0.75 },
            label && (React.createElement(Typography, { variant: "caption", color: "text.secondary", fontWeight: 600 }, label)),
            grid));
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(Button, { size: "small", variant: "outlined", onClick: function (event) { return setAnchorEl(event.currentTarget); }, "aria-haspopup": "listbox", "aria-expanded": open, "aria-label": label ? "".concat(label, ": ").concat(selected.label) : selected.label, sx: {
                minWidth: 0,
                px: 1,
                py: 0.5,
                textTransform: 'none',
                gap: 0.75,
                flexShrink: 0
            } },
            React.createElement(Box, { "aria-hidden": true, sx: {
                    width: size,
                    height: size,
                    borderRadius: '50%',
                    bgcolor: selected.hex,
                    boxShadow: function (theme) {
                        return "inset 0 0 0 1px ".concat(theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.12)');
                    }
                } }),
            label && (React.createElement(Typography, { variant: "body2", component: "span", color: "text.secondary", sx: { display: { xs: 'none', sm: 'inline' } } }, label)),
            React.createElement(ArrowDropDownRoundedIcon, { fontSize: "small", sx: { color: 'text.secondary', ml: -0.25 } })),
        React.createElement(Popover, { open: open, anchorEl: anchorEl, onClose: function () { return setAnchorEl(null); }, anchorOrigin: { vertical: 'bottom', horizontal: 'left' }, transformOrigin: { vertical: 'top', horizontal: 'left' }, PaperProps: { sx: { p: 1.5 } } }, grid)));
};

var WorkflowStepRulesDialog = function (_a) {
    var open = _a.open, stepName = _a.stepName, initialRoleRule = _a.roleRule, initialContentRule = _a.contentRule, onClose = _a.onClose, onSave = _a.onSave;
    var _b = useState('all'), roleMode = _b[0], setRoleMode = _b[1];
    var _c = useState([]), roleSelections = _c[0], setRoleSelections = _c[1];
    var _d = useState('all'), contentMode = _d[0], setContentMode = _d[1];
    var _e = useState(''), pathPatterns = _e[0], setPathPatterns = _e[1];
    var _f = useState(''), contentTypes = _f[0], setContentTypes = _f[1];
    var _g = useState([]), groupOptions = _g[0], setGroupOptions = _g[1];
    useEffect(function () {
        var _a, _b, _c;
        if (!open) {
            return;
        }
        var role = initialRoleRule !== null && initialRoleRule !== void 0 ? initialRoleRule : defaultRoleRule();
        var content = initialContentRule !== null && initialContentRule !== void 0 ? initialContentRule : defaultContentRule();
        setRoleMode(role.mode);
        setRoleSelections((_a = role.roles) !== null && _a !== void 0 ? _a : []);
        setContentMode(content.mode);
        setPathPatterns(((_b = content.pathPatterns) !== null && _b !== void 0 ? _b : []).join('\n'));
        setContentTypes(((_c = content.contentTypes) !== null && _c !== void 0 ? _c : []).join('\n'));
    }, [open, initialRoleRule, initialContentRule]);
    useEffect(function () {
        if (!open) {
            return;
        }
        fetchAll$1({ limit: 500, offset: 0 }).subscribe({
            next: function (groups) {
                var mapped = groups
                    .map(function (group) {
                    var _a;
                    return ({
                        id: Number((_a = group.id) !== null && _a !== void 0 ? _a : 0),
                        name: (group.name || group.groupName || '').trim()
                    });
                })
                    .filter(function (group) { return group.name; });
                setGroupOptions(mapped);
            },
            error: function () {
                setGroupOptions([]);
            }
        });
    }, [open]);
    var selectedGroupOptions = useMemo$1(function () { return roleSelections.map(function (name) { var _a; return (_a = groupOptions.find(function (g) { return g.name === name; })) !== null && _a !== void 0 ? _a : { id: 0, name: name }; }); }, [roleSelections, groupOptions]);
    var parseMultiline = function (value) {
        return value
            .split(/\r?\n/)
            .map(function (line) { return line.trim(); })
            .filter(Boolean);
    };
    var handleSave = function () {
        onSave({
            mode: roleMode,
            roles: roleMode === 'all' ? [] : roleSelections
        }, {
            mode: contentMode,
            pathPatterns: contentMode === 'all' ? [] : parseMultiline(pathPatterns),
            contentTypes: contentMode === 'all' ? [] : parseMultiline(contentTypes)
        });
        onClose();
    };
    return (React.createElement(Dialog, { open: open, onClose: onClose, maxWidth: "sm", fullWidth: true },
        React.createElement(DialogTitle, null,
            "Step rules \u2014 ",
            stepName),
        React.createElement(DialogContent, { dividers: true },
            React.createElement(Stack, { spacing: 2.5 },
                React.createElement(Box, null,
                    React.createElement(Typography, { variant: "subtitle2", fontWeight: 600, gutterBottom: true }, "Roles"),
                    React.createElement(Typography, { variant: "body2", color: "text.secondary", sx: { mb: 1 } }, "Controls which Studio groups can move a package into this step."),
                    React.createElement(FormControl, { component: "fieldset", variant: "standard" },
                        React.createElement(RadioGroup, { value: roleMode, onChange: function (e) { return setRoleMode(e.target.value); } },
                            React.createElement(FormControlLabel, { value: "all", control: React.createElement(Radio, { size: "small" }), label: "All roles" }),
                            React.createElement(FormControlLabel, { value: "include", control: React.createElement(Radio, { size: "small" }), label: "Include only these roles" }),
                            React.createElement(FormControlLabel, { value: "exclude", control: React.createElement(Radio, { size: "small" }), label: "Exclude these roles" }))),
                    roleMode !== 'all' && (React.createElement(Autocomplete, { multiple: true, options: groupOptions, value: selectedGroupOptions, onChange: function (_, value) { return setRoleSelections(value.map(function (entry) { return entry.name; })); }, getOptionLabel: function (option) { return option.name; }, isOptionEqualToValue: function (a, b) { return a.name === b.name; }, renderTags: function (value, getTagProps) {
                            return value.map(function (option, index) { return (React.createElement(Chip, __assign({}, getTagProps({ index: index }), { key: option.name, label: option.name, size: "small" }))); });
                        }, renderInput: function (params) { return (React.createElement(TextField, __assign({}, params, { label: roleMode === 'include' ? 'Allowed roles' : 'Excluded roles', placeholder: "Select Studio groups", size: "small", sx: { mt: 1 } }))); } }))),
                React.createElement(Box, null,
                    React.createElement(Typography, { variant: "subtitle2", fontWeight: 600, gutterBottom: true }, "Content"),
                    React.createElement(Typography, { variant: "body2", color: "text.secondary", sx: { mb: 1 } }, "Every content item attached to the package must match at least one path pattern or content type when restricted."),
                    React.createElement(FormControl, { component: "fieldset", variant: "standard" },
                        React.createElement(RadioGroup, { value: contentMode, onChange: function (e) { return setContentMode(e.target.value); } },
                            React.createElement(FormControlLabel, { value: "all", control: React.createElement(Radio, { size: "small" }), label: "All content" }),
                            React.createElement(FormControlLabel, { value: "any", control: React.createElement(Radio, { size: "small" }), label: "Only matching paths or content types" }))),
                    contentMode === 'any' && (React.createElement(Stack, { spacing: 1.5, sx: { mt: 1 } },
                        React.createElement(TextField, { label: "Path patterns", value: pathPatterns, onChange: function (e) { return setPathPatterns(e.target.value); }, multiline: true, minRows: 3, placeholder: '/site/website/**\n/static-assets/images/**', helperText: "One pattern per line. Use * and ** wildcards.", fullWidth: true, size: "small" }),
                        React.createElement(TextField, { label: "Content types", value: contentTypes, onChange: function (e) { return setContentTypes(e.target.value); }, multiline: true, minRows: 2, placeholder: '/page/home\n/component/hero', helperText: "One content type per line (e.g. /page/article).", fullWidth: true, size: "small" })))))),
        React.createElement(DialogActions, null,
            React.createElement(Button, { onClick: onClose }, "Cancel"),
            React.createElement(Button, { variant: "contained", onClick: handleSave }, "Apply"))));
};

function reorderSteps(steps, from, to) {
    var next = steps.slice();
    var removed = next.splice(from, 1)[0];
    next.splice(to, 0, removed);
    return next;
}
function mapDetailSteps(steps) {
    var mapped = (steps || []).map(function (step, index) {
        var actionType = normalizeStepActionType(step.actionType);
        var resolvedAction = actionType !== STEP_ACTION_NONE ? actionType : stepActionTypeFromLegacy(step);
        return __assign(__assign({}, step), { clientKey: step.id || "existing-".concat(index), color: normalizeStepColorId(step.color), isTerminal: !!step.isTerminal, allowAddPackage: step.allowAddPackage === true, actionType: resolvedAction });
    });
    mapped.forEach(function (step) {
        if (step.actionSuccessStepId) {
            var target = mapped.find(function (candidate) { return candidate.id === step.actionSuccessStepId; });
            if (target) {
                step.actionSuccessStepClientKey = target.clientKey;
            }
        }
    });
    return mapped;
}
var WorkflowEditorDialog = function (_a) {
    var _b, _c, _d;
    var open = _a.open, detail = _a.detail, onClose = _a.onClose, onSaved = _a.onSaved;
    var siteId = useActiveSiteId();
    var _e = useState(''), name = _e[0], setName = _e[1];
    var _f = useState(''), description = _f[0], setDescription = _f[1];
    var _g = useState(BOARD_BACKGROUND_SWATCHES[0].id), boardBackground = _g[0], setBoardBackground = _g[1];
    var _h = useState([]), steps = _h[0], setSteps = _h[1];
    var _j = useState(false), stagingEnabled = _j[0], setStagingEnabled = _j[1];
    var _k = useState(false), saving = _k[0], setSaving = _k[1];
    var _l = useState(), error = _l[0], setError = _l[1];
    var _m = useState(null), rulesStepIndex = _m[0], setRulesStepIndex = _m[1];
    useEffect(function () {
        if (open && detail) {
            setName(detail.workflow.name || '');
            setDescription(detail.workflow.description || '');
            setBoardBackground(normalizeBoardBackgroundId(detail.workflow.backgroundColor || detail.workflow.backgroundUrl));
            setSteps(mapDetailSteps(detail.steps || []));
            setError(undefined);
        }
    }, [open, detail]);
    useEffect(function () {
        if (!open || !siteId) {
            return;
        }
        getPublishingTargets(siteId).subscribe({
            next: function (response) {
                var _a, _b;
                setStagingEnabled(!!((_b = (_a = response.response) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b.stagingEnabled));
            },
            error: function () {
                setStagingEnabled(false);
            }
        });
    }, [open, siteId]);
    var handleDragEnd = function (result) {
        if (!result.destination) {
            return;
        }
        setSteps(reorderSteps(steps, result.source.index, result.destination.index));
    };
    var handleAddStep = function () {
        setSteps(__spreadArray(__spreadArray([], steps, true), [
            {
                clientKey: "new-".concat(Date.now(), "-").concat(Math.random()),
                name: 'New Step',
                color: STEP_COLOR_SWATCHES[0].id,
                isTerminal: false,
                allowAddPackage: false,
                actionType: STEP_ACTION_NONE
            }
        ], false));
    };
    var handleRemoveStep = function (index) {
        if (steps.length <= 1) {
            window.alert('A workflow must have at least one step.');
            return;
        }
        var removedKey = steps[index].clientKey;
        setSteps(steps
            .filter(function (_, i) { return i !== index; })
            .map(function (step) {
            return step.actionSuccessStepClientKey === removedKey
                ? __assign(__assign({}, step), { actionSuccessStepClientKey: undefined, actionSuccessStepId: undefined }) : step;
        }));
    };
    var updateStep = function (index, patch) {
        setSteps(steps.map(function (step, i) { return (i === index ? __assign(__assign({}, step), patch) : step); }));
    };
    var handleActionTypeChange = function (index, actionType) {
        var patch = { actionType: actionType };
        if (actionType === STEP_ACTION_NONE) {
            patch.actionSuccessStepClientKey = undefined;
            patch.actionSuccessStepId = undefined;
        }
        else {
            var current = steps[index];
            if (!current.actionSuccessStepClientKey && !current.actionSuccessStepId) {
                var nextStep = steps[index + 1];
                if (nextStep) {
                    patch.actionSuccessStepClientKey = nextStep.clientKey;
                }
            }
        }
        updateStep(index, patch);
    };
    var handleSave = function () {
        if (!name.trim()) {
            window.alert('Workflow name is required.');
            return;
        }
        if (steps.some(function (step) { var _a; return !((_a = step.name) === null || _a === void 0 ? void 0 : _a.trim()); })) {
            window.alert('Every step needs a name.');
            return;
        }
        if (steps.some(function (step) { var _a, _b; return ((_b = (_a = step.name) === null || _a === void 0 ? void 0 : _a.trim().length) !== null && _b !== void 0 ? _b : 0) > STEP_NAME_MAX_LENGTH; })) {
            window.alert("Step names must be ".concat(STEP_NAME_MAX_LENGTH, " characters or fewer."));
            return;
        }
        if (!siteId) {
            window.alert('No active site selected.');
            return;
        }
        setSaving(true);
        setError(undefined);
        saveWorkflowDefinition(siteId, detail.workflow.id, {
            workflow: __assign(__assign({}, detail.workflow), { name: name.trim(), description: description.trim(), backgroundColor: boardBackground }),
            steps: steps.map(function (step, index) { return ({
                id: step.id,
                clientKey: step.clientKey,
                name: step.name.trim(),
                color: normalizeStepColorId(step.color),
                isTerminal: !!step.isTerminal,
                allowAddPackage: !!step.allowAddPackage,
                actionType: !step.actionType || step.actionType === STEP_ACTION_NONE ? STEP_ACTION_NONE : step.actionType,
                actionSuccessStepId: step.actionSuccessStepId,
                actionSuccessStepClientKey: step.actionSuccessStepClientKey,
                roleRule: step.roleRule,
                contentRule: step.contentRule,
                position: (index + 1) * 1000
            }); })
        }).subscribe({
            next: function () {
                setSaving(false);
                onSaved();
            },
            error: function (e) {
                var _a, _b;
                console.error(e);
                setSaving(false);
                setError((_b = (_a = e.response) === null || _a === void 0 ? void 0 : _a.response) !== null && _b !== void 0 ? _b : { code: '?', message: 'Unable to save workflow.' });
            }
        });
    };
    return (React.createElement(Dialog, { open: open, onClose: onClose, maxWidth: false, fullWidth: true, scroll: "paper", PaperProps: {
            sx: {
                width: { xs: '100%', sm: 'min(96vw, 1200px)' },
                height: { xs: '100%', sm: 'calc(100vh - 48px)' },
                maxHeight: { xs: '100%', sm: 'calc(100vh - 24px)' },
                m: { xs: 0, sm: 2 },
                display: 'flex',
                flexDirection: 'column'
            }
        } },
        React.createElement(DialogTitle, { sx: { flexShrink: 0 } }, "Edit workflow"),
        React.createElement(DialogContent, { dividers: true, sx: { flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', gap: 2 } },
            error && React.createElement(ApiResponseErrorState, { error: error }),
            React.createElement(Stack, { spacing: 2, sx: { flexShrink: 0 } },
                React.createElement(TextField, { label: "Workflow name", value: name, onChange: function (e) { return setName(e.target.value); }, fullWidth: true, required: true, inputProps: { maxLength: WORKFLOW_NAME_MAX_LENGTH } }),
                React.createElement(TextField, { label: "Description", value: description, onChange: function (e) { return setDescription(e.target.value); }, fullWidth: true, multiline: true, minRows: 2 }),
                React.createElement(Stack, { direction: "row", alignItems: "center", spacing: 1.5, flexWrap: "wrap" },
                    React.createElement(Typography, { variant: "body2", color: "text.secondary", sx: { flexShrink: 0 } }, "Board background"),
                    React.createElement(ColorSwatchPicker, { swatches: BOARD_BACKGROUND_SWATCHES, value: boardBackground, onChange: setBoardBackground, resolveColor: resolveBoardBackgroundColor, size: 24 }))),
            React.createElement(Box, { sx: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 } },
                React.createElement(Typography, { variant: "subtitle1", fontWeight: 600 }, "Steps"),
                React.createElement(Button, { size: "small", startIcon: React.createElement(AddRoundedIcon, null), onClick: handleAddStep }, "Add step")),
            React.createElement(DragDropContext, { onDragEnd: handleDragEnd },
                React.createElement(ConnectedDroppable, { droppableId: "workflow-steps" }, function (provided) { return (React.createElement(Stack, __assign({ spacing: 1, ref: provided.innerRef }, provided.droppableProps, { sx: { flex: 1, minHeight: 0, overflowY: 'auto', pr: 0.5 } }),
                    steps.map(function (step, index) {
                        var hasAction = !!step.actionType && step.actionType !== STEP_ACTION_NONE;
                        var successValue = step.actionSuccessStepClientKey || step.actionSuccessStepId || SUCCESS_STEP_NONE;
                        var successOptions = steps.filter(function (candidate) { return candidate.clientKey !== step.clientKey; });
                        return (React.createElement(PublicDraggable, { key: step.clientKey, draggableId: step.clientKey, index: index }, function (dragProvided) { return (React.createElement(Box, __assign({ ref: dragProvided.innerRef }, dragProvided.draggableProps, { sx: function (theme) { return ({
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1,
                                p: 1.25,
                                pl: 1,
                                borderRadius: 1,
                                border: "1px solid ".concat(theme.palette.divider),
                                borderLeft: "4px solid ".concat(resolveStepColor(step.color)),
                                bgcolor: 'background.paper'
                            }); } }),
                            React.createElement(Box, { sx: { display: 'flex', gap: 1, alignItems: 'center' } },
                                React.createElement(Box, __assign({}, dragProvided.dragHandleProps, { sx: { color: 'text.secondary', flexShrink: 0 } }),
                                    React.createElement(DragIndicatorRoundedIcon, null)),
                                React.createElement(Box, { sx: {
                                        display: 'flex',
                                        flex: 1,
                                        minWidth: 0,
                                        alignItems: 'center',
                                        gap: 1.5,
                                        flexWrap: { xs: 'wrap', md: 'nowrap' }
                                    } },
                                    React.createElement(TextField, { label: "Step name", value: step.name, onChange: function (e) { return updateStep(index, { name: e.target.value }); }, size: "small", inputProps: { maxLength: STEP_NAME_MAX_LENGTH }, sx: { width: { xs: '100%', sm: 200, md: 220 }, flexShrink: 0 } }),
                                    React.createElement(ColorSwatchPicker, { label: "Color", swatches: STEP_COLOR_SWATCHES, value: normalizeStepColorId(step.color), onChange: function (color) { return updateStep(index, { color: color }); }, size: 22 }),
                                    React.createElement(FormControlLabel, { sx: { m: 0, flexShrink: 0 }, control: React.createElement(Checkbox, { size: "small", checked: !!step.isTerminal, onChange: function (e) { return updateStep(index, { isTerminal: e.target.checked }); } }), label: "Terminal" }),
                                    React.createElement(FormControlLabel, { sx: { m: 0, flexShrink: 0 }, control: React.createElement(Checkbox, { size: "small", checked: !!step.allowAddPackage, onChange: function (e) { return updateStep(index, { allowAddPackage: e.target.checked }); } }), label: "Allow add package" })),
                                React.createElement(Button, { size: "small", variant: "outlined", startIcon: React.createElement(RuleRoundedIcon, null), onClick: function () { return setRulesStepIndex(index); }, sx: { flexShrink: 0 } }, "Rules"),
                                React.createElement(IconButton, { "aria-label": "Remove step", onClick: function () { return handleRemoveStep(index); }, sx: { alignSelf: 'center' } },
                                    React.createElement(DeleteOutlineRoundedIcon, null))),
                            React.createElement(Box, { sx: { pl: 4.5, display: 'flex', flexDirection: 'column', gap: 1 } },
                                React.createElement(RadioGroup, { value: step.actionType || STEP_ACTION_NONE, onChange: function (event) {
                                        return handleActionTypeChange(index, event.target.value);
                                    } },
                                    React.createElement(FormControlLabel, { value: STEP_ACTION_NONE, control: React.createElement(Radio, { size: "small" }), label: "None", sx: { mb: 0.5 } }),
                                    React.createElement(FormControl, { component: "fieldset", variant: "standard", sx: { mt: 0.5 } },
                                        React.createElement(FormLabel, { component: "legend", sx: { typography: 'caption', color: 'text.secondary' } }, "Publish Actions"),
                                        React.createElement(Box, { sx: { display: 'flex', flexWrap: 'wrap', gap: 0.5, pl: 0.5, pt: 0.25 } }, PUBLISH_ACTION_OPTIONS.map(function (option) { return (React.createElement(FormControlLabel, { key: option.value, value: option.value, control: React.createElement(Radio, { size: "small" }), label: option.label, disabled: option.requiresStaging && !stagingEnabled, sx: { mr: 1.5 } })); })))),
                                React.createElement(FormControl, { size: "small", sx: { maxWidth: 320 }, disabled: !hasAction },
                                    React.createElement(InputLabel, { id: "success-step-label-".concat(step.clientKey) }, "Step on success"),
                                    React.createElement(Select, { labelId: "success-step-label-".concat(step.clientKey), label: "Step on success", value: successValue, renderValue: function (selected) {
                                            var _a;
                                            if (selected === SUCCESS_STEP_NONE) {
                                                return 'None — stay on current step';
                                            }
                                            var target = successOptions.find(function (candidate) {
                                                return candidate.clientKey === selected || candidate.id === selected;
                                            });
                                            return ((_a = target === null || target === void 0 ? void 0 : target.name) === null || _a === void 0 ? void 0 : _a.trim()) || 'Untitled step';
                                        }, onChange: function (event) {
                                            var value = event.target.value;
                                            if (value === SUCCESS_STEP_NONE) {
                                                updateStep(index, {
                                                    actionSuccessStepClientKey: undefined,
                                                    actionSuccessStepId: undefined
                                                });
                                            }
                                            else {
                                                updateStep(index, {
                                                    actionSuccessStepClientKey: value,
                                                    actionSuccessStepId: undefined
                                                });
                                            }
                                        } },
                                        React.createElement(MenuItem, { value: SUCCESS_STEP_NONE }, "None \u2014 stay on current step"),
                                        successOptions.map(function (candidate) {
                                            var _a;
                                            return (React.createElement(MenuItem, { key: candidate.clientKey, value: candidate.clientKey }, ((_a = candidate.name) === null || _a === void 0 ? void 0 : _a.trim()) || 'Untitled step'));
                                        })))))); }));
                    }),
                    provided.placeholder)); }))),
        rulesStepIndex != null && steps[rulesStepIndex] && (React.createElement(WorkflowStepRulesDialog, { open: true, stepName: ((_b = steps[rulesStepIndex].name) === null || _b === void 0 ? void 0 : _b.trim()) || 'Step', roleRule: (_c = steps[rulesStepIndex].roleRule) !== null && _c !== void 0 ? _c : defaultRoleRule(), contentRule: (_d = steps[rulesStepIndex].contentRule) !== null && _d !== void 0 ? _d : defaultContentRule(), onClose: function () { return setRulesStepIndex(null); }, onSave: function (roleRule, contentRule) {
                updateStep(rulesStepIndex, { roleRule: roleRule, contentRule: contentRule });
                setRulesStepIndex(null);
            } })),
        React.createElement(DialogActions, { sx: { flexShrink: 0, px: 2, py: 1.5 } },
            React.createElement(Button, { onClick: onClose, disabled: saving }, "Cancel"),
            React.createElement(Button, { variant: "contained", onClick: handleSave, disabled: saving }, saving ? 'Saving…' : 'Save workflow'))));
};

var WorkflowsTab = function (_a) {
    var schemaReady = _a.schemaReady;
    var siteId = useActiveSiteId();
    var _b = useState(false), loading = _b[0], setLoading = _b[1];
    var _c = useState([]), workflows = _c[0], setWorkflows = _c[1];
    var _d = useState(), error = _d[0], setError = _d[1];
    var _e = useState(false), editorOpen = _e[0], setEditorOpen = _e[1];
    var _f = useState(false), editorLoading = _f[0], setEditorLoading = _f[1];
    var _g = useState(null), editorDetail = _g[0], setEditorDetail = _g[1];
    var loadWorkflows = useCallback$1(function () {
        if (!schemaReady || !siteId) {
            return;
        }
        setLoading(true);
        setError(undefined);
        listWorkflows(siteId).subscribe({
            next: function (response) {
                setWorkflows(response.response.result.workflows || []);
                setLoading(false);
            },
            error: function (e) {
                var _a, _b;
                console.error(e);
                setError((_b = (_a = e.response) === null || _a === void 0 ? void 0 : _a.response) !== null && _b !== void 0 ? _b : { code: '?', message: 'Unable to load workflows.' });
                setLoading(false);
            }
        });
    }, [schemaReady, siteId]);
    useEffect(function () {
        loadWorkflows();
    }, [loadWorkflows]);
    var openEditor = function (detail) {
        setEditorDetail(detail);
        setEditorOpen(true);
    };
    var handleAdd = function () {
        setEditorLoading(true);
        createWorkflow(siteId, 'New Workflow', '').subscribe({
            next: function (response) {
                setEditorLoading(false);
                openEditor(response.response.result);
                loadWorkflows();
            },
            error: function (e) {
                var _a, _b;
                console.error(e);
                setEditorLoading(false);
                setError((_b = (_a = e.response) === null || _a === void 0 ? void 0 : _a.response) !== null && _b !== void 0 ? _b : { code: '?', message: 'Unable to create workflow.' });
            }
        });
    };
    var handleEdit = function (workflowId) {
        setEditorLoading(true);
        getWorkflow(siteId, workflowId).subscribe({
            next: function (response) {
                setEditorLoading(false);
                openEditor(response.response.result);
            },
            error: function (e) {
                var _a, _b;
                console.error(e);
                setEditorLoading(false);
                setError((_b = (_a = e.response) === null || _a === void 0 ? void 0 : _a.response) !== null && _b !== void 0 ? _b : { code: '?', message: 'Unable to load workflow.' });
            }
        });
    };
    var handleDelete = function (workflow) {
        if (workflow.packageCount > 0) {
            window.alert('This workflow has active packages. Archive or move packages before deleting the workflow.');
            return;
        }
        if (!window.confirm("Delete workflow \"".concat(workflow.name, "\"?"))) {
            return;
        }
        deleteWorkflow(siteId, workflow.id).subscribe({
            next: function () { return loadWorkflows(); },
            error: function (e) {
                var _a, _b;
                console.error(e);
                setError((_b = (_a = e.response) === null || _a === void 0 ? void 0 : _a.response) !== null && _b !== void 0 ? _b : { code: '?', message: 'Unable to delete workflow.' });
            }
        });
    };
    if (!schemaReady) {
        return (React.createElement(Box, { sx: { p: 2 } },
            React.createElement(Typography, { variant: "body2", color: "text.secondary" }, "Install the database schema on the Admin tab before managing workflows.")));
    }
    return (React.createElement(Box, { sx: { p: 2, display: 'flex', flexDirection: 'column', minHeight: 0, flex: 1 } },
        React.createElement(Stack, { direction: "row", justifyContent: "space-between", alignItems: "center", sx: { mb: 2 } },
            React.createElement(Typography, { variant: "h6" }, "Workflows"),
            React.createElement(Stack, { direction: "row", spacing: 1 },
                React.createElement(Tooltip, { title: "Refresh" },
                    React.createElement(IconButton, { onClick: loadWorkflows, "aria-label": "Refresh workflows" },
                        React.createElement(RefreshRoundedIcon, null))),
                React.createElement(Button, { variant: "contained", startIcon: React.createElement(AddRoundedIcon, null), onClick: handleAdd, disabled: editorLoading }, "Add workflow"))),
        error && React.createElement(ApiResponseErrorState, { error: error }),
        loading ? (React.createElement(Stack, { direction: "row", spacing: 1, alignItems: "center" },
            React.createElement(CircularProgress, { size: 20 }),
            React.createElement(Typography, { variant: "body2" }, "Loading workflows\u2026"))) : (React.createElement(TableContainer, { component: Paper, variant: "outlined", sx: { flex: 1, minHeight: 0 } },
            React.createElement(Table, { size: "small", stickyHeader: true },
                React.createElement(TableHead, null,
                    React.createElement(TableRow, null,
                        React.createElement(TableCell, null, "Name"),
                        React.createElement(TableCell, { align: "right" }, "Steps"),
                        React.createElement(TableCell, { align: "right" }, "Packages"),
                        React.createElement(TableCell, { align: "right" }, "Actions"))),
                React.createElement(TableBody, null, workflows.length === 0 ? (React.createElement(TableRow, null,
                    React.createElement(TableCell, { colSpan: 4 },
                        React.createElement(Typography, { variant: "body2", color: "text.secondary" }, "No workflows yet. Click Add workflow to create one.")))) : (workflows.map(function (workflow) { return (React.createElement(TableRow, { key: workflow.id, hover: true },
                    React.createElement(TableCell, null,
                        React.createElement(Typography, { variant: "body2", fontWeight: 600 }, workflow.name),
                        workflow.description && (React.createElement(Typography, { variant: "caption", color: "text.secondary", display: "block" }, workflow.description))),
                    React.createElement(TableCell, { align: "right" }, workflow.stepCount),
                    React.createElement(TableCell, { align: "right" }, workflow.packageCount),
                    React.createElement(TableCell, { align: "right" },
                        React.createElement(Tooltip, { title: "Edit workflow" },
                            React.createElement(IconButton, { size: "small", onClick: function () { return handleEdit(workflow.id); }, "aria-label": "Edit" },
                                React.createElement(EditRoundedIcon, { fontSize: "small" }))),
                        React.createElement(Tooltip, { title: "Delete workflow" },
                            React.createElement(IconButton, { size: "small", onClick: function () { return handleDelete(workflow); }, "aria-label": "Delete", disabled: workflow.packageCount > 0 },
                                React.createElement(DeleteOutlineRoundedIcon, { fontSize: "small" })))))); })))))),
        editorDetail && (React.createElement(WorkflowEditorDialog, { open: editorOpen, detail: editorDetail, onClose: function () {
                setEditorOpen(false);
                setEditorDetail(null);
            }, onSaved: function () {
                setEditorOpen(false);
                setEditorDetail(null);
                loadWorkflows();
            } }))));
};

var TARGET_TYPE_OPTIONS = [
    { value: '', label: 'All target types' },
    { value: 'task', label: 'Task' },
    { value: 'package', label: 'Package' },
    { value: 'workflow', label: 'Workflow' }
];
var OPERATION_OPTIONS = [
    { value: '', label: 'All operations' },
    { value: 'task_created', label: 'Task created' },
    { value: 'task_modified', label: 'Task modified' },
    { value: 'package_created', label: 'Package created' },
    { value: 'package_step_changed', label: 'Package step changed' },
    { value: 'package_step_action', label: 'Automatic step action' },
    { value: 'package_modified', label: 'Package modified' }
];
function formatDate(value) {
    if (!value) {
        return '—';
    }
    var date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return value;
    }
    return date.toLocaleString();
}
function formatOperation(operation) {
    return operation.replace(/_/g, ' ');
}
var AuditLogTab = function (_a) {
    var schemaReady = _a.schemaReady;
    var siteId = useActiveSiteId();
    var _b = useState(false), loading = _b[0], setLoading = _b[1];
    var _c = useState([]), entries = _c[0], setEntries = _c[1];
    var _d = useState(0), total = _d[0], setTotal = _d[1];
    var _e = useState(0), page = _e[0], setPage = _e[1];
    var _f = useState(25), pageSize = _f[0], setPageSize = _f[1];
    var _g = useState(), error = _g[0], setError = _g[1];
    var _h = useState({
        username: '',
        operation: '',
        targetType: '',
        targetId: '',
        q: ''
    }), filters = _h[0], setFilters = _h[1];
    var loadEntries = useCallback$1(function () {
        if (!schemaReady || !siteId) {
            return;
        }
        setLoading(true);
        setError(undefined);
        searchAuditLog(siteId, __assign(__assign({}, filters), { username: filters.username || undefined, operation: filters.operation || undefined, targetType: filters.targetType || undefined, targetId: filters.targetId || undefined, q: filters.q || undefined, page: page + 1, pageSize: pageSize })).subscribe({
            next: function (response) {
                var result = response.response.result;
                setEntries(result.entries || []);
                setTotal(result.total || 0);
                setLoading(false);
            },
            error: function (e) {
                var _a, _b;
                console.error(e);
                setError((_b = (_a = e.response) === null || _a === void 0 ? void 0 : _a.response) !== null && _b !== void 0 ? _b : { code: '?', message: 'Unable to load audit log.' });
                setLoading(false);
            }
        });
    }, [schemaReady, siteId, filters, page, pageSize]);
    useEffect(function () {
        loadEntries();
    }, [loadEntries]);
    var handleFilterChange = function (field, value) {
        setPage(0);
        setFilters(function (current) {
            var _a;
            return (__assign(__assign({}, current), (_a = {}, _a[field] = value, _a)));
        });
    };
    return (React.createElement(Box, { sx: { p: 2 } },
        React.createElement(Stack, { direction: "row", alignItems: "center", justifyContent: "space-between", sx: { mb: 2 } },
            React.createElement(Typography, { variant: "subtitle1" }, "Audit Log"),
            React.createElement(Tooltip, { title: "Refresh" },
                React.createElement("span", null,
                    React.createElement(IconButton, { onClick: loadEntries, disabled: loading || !schemaReady, size: "small" },
                        React.createElement(RefreshRoundedIcon, null))))),
        !schemaReady ? (React.createElement(Typography, { color: "text.secondary" }, "Install the workflow schema on the Admin tab first.")) : (React.createElement(React.Fragment, null,
            React.createElement(Stack, { direction: { xs: 'column', md: 'row' }, spacing: 2, sx: { mb: 2 } },
                React.createElement(TextField, { label: "User", size: "small", value: filters.username || '', onChange: function (e) { return handleFilterChange('username', e.target.value); }, sx: { minWidth: 160 } }),
                React.createElement(FormControl, { size: "small", sx: { minWidth: 180 } },
                    React.createElement(InputLabel, null, "Operation"),
                    React.createElement(Select, { label: "Operation", value: filters.operation || '', onChange: function (e) { return handleFilterChange('operation', e.target.value); } }, OPERATION_OPTIONS.map(function (option) { return (React.createElement(MenuItem, { key: option.value || 'all', value: option.value }, option.label)); }))),
                React.createElement(FormControl, { size: "small", sx: { minWidth: 160 } },
                    React.createElement(InputLabel, null, "Target type"),
                    React.createElement(Select, { label: "Target type", value: filters.targetType || '', onChange: function (e) { return handleFilterChange('targetType', e.target.value); } }, TARGET_TYPE_OPTIONS.map(function (option) { return (React.createElement(MenuItem, { key: option.value || 'all', value: option.value }, option.label)); }))),
                React.createElement(TextField, { label: "Target ID", size: "small", value: filters.targetId || '', onChange: function (e) { return handleFilterChange('targetId', e.target.value); }, sx: { minWidth: 220 } }),
                React.createElement(TextField, { label: "Search note", size: "small", value: filters.q || '', onChange: function (e) { return handleFilterChange('q', e.target.value); }, sx: { flex: 1, minWidth: 200 } }),
                React.createElement(Button, { variant: "outlined", onClick: loadEntries, disabled: loading }, "Apply")),
            error && (React.createElement(Typography, { color: "error", sx: { mb: 2 } }, error.message)),
            React.createElement(Paper, { variant: "outlined" },
                React.createElement(TableContainer, null,
                    React.createElement(Table, { size: "small" },
                        React.createElement(TableHead, null,
                            React.createElement(TableRow, null,
                                React.createElement(TableCell, null, "Date"),
                                React.createElement(TableCell, null, "User"),
                                React.createElement(TableCell, null, "Operation"),
                                React.createElement(TableCell, null, "Target type"),
                                React.createElement(TableCell, null, "Target ID"),
                                React.createElement(TableCell, null, "Note"))),
                        React.createElement(TableBody, null, loading ? (React.createElement(TableRow, null,
                            React.createElement(TableCell, { colSpan: 6, align: "center", sx: { py: 4 } },
                                React.createElement(CircularProgress, { size: 24 })))) : entries.length === 0 ? (React.createElement(TableRow, null,
                            React.createElement(TableCell, { colSpan: 6, align: "center", sx: { py: 4 } },
                                React.createElement(Typography, { color: "text.secondary" }, "No audit entries found.")))) : (entries.map(function (entry) { return (React.createElement(TableRow, { key: entry.id, hover: true },
                            React.createElement(TableCell, { sx: { whiteSpace: 'nowrap' } }, formatDate(entry.createdOn)),
                            React.createElement(TableCell, null, entry.username),
                            React.createElement(TableCell, { sx: { textTransform: 'capitalize' } }, formatOperation(entry.operation)),
                            React.createElement(TableCell, { sx: { textTransform: 'capitalize' } }, entry.targetType),
                            React.createElement(TableCell, { sx: {
                                    fontFamily: 'monospace',
                                    fontSize: '0.75rem',
                                    maxWidth: 220,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                } }, entry.targetId),
                            React.createElement(TableCell, null, entry.note || '—'))); }))))),
                React.createElement(TablePagination, { component: "div", count: total, page: page, onPageChange: function (_, nextPage) { return setPage(nextPage); }, rowsPerPage: pageSize, onRowsPerPageChange: function (e) {
                        setPageSize(parseInt(e.target.value, 10));
                        setPage(0);
                    }, rowsPerPageOptions: [10, 25, 50, 100] }))))));
};

function useInlineProjectToolsShell(props) {
    return typeof props.onMinimize === 'function' || props.mountMode === 'page';
}
function ProjectToolsConfigurationPanel() {
    var siteId = useActiveSiteId();
    var _a = useState('workflows'), tab = _a[0], setTab = _a[1];
    var _b = useState(false), schemaReady = _b[0], setSchemaReady = _b[1];
    useEffect(function () {
        if (!siteId) {
            return;
        }
        getSchemaStatus(siteId).subscribe({
            next: function (response) {
                var _a;
                var installed = !!((_a = response.response.result) === null || _a === void 0 ? void 0 : _a.installed);
                setSchemaReady(installed);
                if (!installed) {
                    setTab('admin');
                }
            }
        });
    }, [siteId]);
    var handleTabChange = function (_, value) {
        setTab(value);
    };
    return (React.createElement(Box, { sx: {
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            flex: 1,
            height: '100%'
        } },
        React.createElement(Box, { sx: { flexShrink: 0, px: 2, pt: 1.5, borderBottom: 1, borderColor: 'divider' } },
            React.createElement(Typography, { variant: "h6", sx: { mb: 1 } }, "Crafter Workflow"),
            React.createElement(Tabs, { value: tab, onChange: handleTabChange, variant: "scrollable", scrollButtons: "auto" },
                React.createElement(Tab, { label: "Workflows", value: "workflows", disabled: !schemaReady }),
                React.createElement(Tab, { label: "Audit Log", value: "audit", disabled: !schemaReady }),
                React.createElement(Tab, { label: "Admin", value: "admin" }))),
        React.createElement(Box, { sx: { flex: 1, minHeight: 0, overflow: 'auto' } },
            tab === 'admin' && (React.createElement(GeneralTab, { onSchemaReady: function () {
                    setSchemaReady(true);
                    setTab('workflows');
                } })),
            tab === 'workflows' && React.createElement(WorkflowsTab, { schemaReady: schemaReady }),
            tab === 'audit' && React.createElement(AuditLogTab, { schemaReady: schemaReady }))));
}
/**
 * Project Tools panel for Crafter Workflow (Workflows, Audit Log, Admin tabs).
 * Renders inline when mounted from Site Tools; legacy isolated mounts still work.
 */
function ProjectToolsConfiguration(props) {
    var inlineShell = useInlineProjectToolsShell(props);
    if (inlineShell) {
        return React.createElement(ProjectToolsConfigurationPanel, null);
    }
    return (React.createElement(Box, { sx: { p: 2 } },
        React.createElement(ProjectToolsConfigurationPanel, null)));
}

/** Message ids used in Studio ui.xml / site-config-tools (must include `id` + `defaultMessage`). */
var messages = {
    projectToolsTitle: {
        id: 'org.rd.plugin.crafterwf.projectTools.title',
        defaultMessage: 'Crafter Workflow'
    }
};

var _a, _b;
var plugin = {
    locales: {
        en: (_a = {},
            _a[messages.projectToolsTitle.id] = messages.projectToolsTitle.defaultMessage,
            _a)
    },
    scripts: undefined,
    stylesheets: undefined,
    id: 'org.rd.plugin.crafterwf',
    widgets: (_b = {
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
            'org.rd.plugin.crafterwf.activeWorkflowsToolbarButton': ActiveWorkflowsToolbarButton
        },
        _b[projectToolsConfigurationWidgetId] = ProjectToolsConfiguration,
        _b)
};

export { ActiveWorkflowsToolbarButton, Board, CalendarDialog, CalendarToolbarButton, ContentCommentsPanel, ContentCommentsToolbarButton, NotificationsPanel, NotificationsToolbarButton, OpenBoardDialogPanelButton, ProjectToolsConfiguration, TasksPanel, TasksToolbarButton, plugin as default, projectToolsConfigurationWidgetId };
