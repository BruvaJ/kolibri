/*
 * This file defines the API for the core Kolibri app.
 */

// module must be specified.
// module maps a module into the API, at the specified path.
// By default any module specified will be aliased to allow for require statements
// namespaced in a way analogous to the API spec below.
//
// These modules will now be referenceable as e.g.: import logger from 'kolibri.lib.logging';
//
// N.B. You cannot use keys that require quotation marks in this object.
// e.g. 'content-icon' (although this can be used as a value in module).

import logging from '../logging';
import vue from 'vue';
import vuex from 'vuex';
import conditionalPromise from '../conditionalPromise';
import * as apiResource from '../api-resource';
import seededshuffle from 'seededshuffle';
import * as constants from '../constants';
import * as getters from '../state/getters';
import * as actions from '../state/actions';
import * as store from '../state/store';
import * as mappers from '../state/mappers';
import contentRenderer from '../views/content-renderer';
import downloadButton from '../views/content-renderer/download-button';
import loadingSpinner from '../views/loading-spinner';
import progressBar from '../views/progress-bar';
import contentIcon from '../views/content-icon';
import progressIcon from '../views/progress-icon';
import permissionsIcon from '../views/permissions-icon';
import coreBase from '../views/core-base';
import coreModal from '../views/core-modal';
import sideNav from '../views/side-nav';
import kButton from '../views/buttons-and-links/k-button';
import kExternalLink from '../views/buttons-and-links/k-external-link';
import kRouterLink from '../views/buttons-and-links/k-router-link';
import kTextbox from '../views/k-textbox';
import kNavbar from '../views/k-navbar';
import kNavbarLink from '../views/k-navbar/link';
import logo from '../views/logo';
import languageSwitcherMixin from '../views/language-switcher/mixin.js';
import languageSwitcherList from '../views/language-switcher/list.vue';
import immersiveFullScreen from '../views/immersive-full-screen';
import elapsedTime from '../views/elapsed-time';
import pointsIcon from '../views/points-icon';
import authMessage from '../views/auth-message';
import kBreadcrumbs from '../views/k-breadcrumbs';
import kCheckbox from '../views/k-checkbox';
import kRadioButton from '../views/k-radio-button';
import kFilterTextbox from '../views/k-filter-textbox';
import kSelect from '../views/k-select';
import router from '../router';
import responsiveWindow from '../mixins/responsive-window';
import responsiveElement from '../mixins/responsive-element';
import theme from '../styles/core-theme.styl';
import definitions from '../styles/definitions.styl';
import keenVars from '../keen-config/variables.scss';
import * as exams from '../exams/utils';
import * as validators from '../validators';
import * as serverClock from '../serverClock';
import * as resources from '../api-resources';
import urls from './urls';
import * as client from './client';
import * as i18n from '../utils/i18n';
import * as browser from '../utils/browser';
import uiAlert from 'keen-ui/src/UiAlert';
import tetherDrop from 'tether-drop';
import tetherTooltip from 'tether-tooltip';
import appBar from '../views/app-bar';
import coreSnackbar from '../views/core-snackbar';
import customUiMenu from '../views/custom-ui-menu';
import heartbeat from '../heartbeat';
import CoreTable from '../views/CoreTable';
import kDropdownMenu from '../views/k-dropdown-menu';
// webpack optimization
import buttonAndLinkStyles from '../views/buttons-and-links/buttons.styl';
import * as contentNode from '../utils/contentNodeUtils';

export default {
  client,
  heartbeat,
  lib: {
    logging,
    vue,
    vuex,
    conditionalPromise,
    apiResource,
    seededshuffle,
    tetherDrop,
    tetherTooltip,
  },
  coreVue: {
    vuex: {
      constants,
      getters,
      actions,
      store,
      mappers,
    },
    components: {
      contentRenderer,
      downloadButton,
      loadingSpinner,
      progressBar,
      contentIcon,
      progressIcon,
      permissionsIcon,
      coreBase,
      coreModal,
      sideNav,
      kButton,
      kExternalLink,
      kRouterLink,
      kTextbox,
      kNavbar,
      kNavbarLink,
      languageSwitcherList,
      logo,
      immersiveFullScreen,
      elapsedTime,
      pointsIcon,
      authMessage,
      kBreadcrumbs,
      kCheckbox,
      kRadioButton,
      kFilterTextbox,
      kSelect,
      uiAlert,
      appBar,
      coreSnackbar,
      customUiMenu,
      CoreTable,
      kDropdownMenu,
    },
    router,
    mixins: {
      responsiveWindow,
      responsiveElement,
      languageSwitcherMixin,
    },
  },
  resources,
  styles: {
    theme,
    definitions,
    keenVars,
    buttonAndLinkStyles,
  },
  urls,
  utils: {
    contentNode,
    browser,
    exams,
    validators,
    serverClock,
    i18n,
  },
};
