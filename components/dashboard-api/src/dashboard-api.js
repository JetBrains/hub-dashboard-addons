/* eslint-disable */
/**
 * WARNING!
 * This file won't be transpiled by BABEL
 * Code should be compatible to all used browsers (IE11+)
 */

const isArrowFunction = require('is-arrow-function');
const Websandbox = require ('@jetbrains/websandbox/dist/frame').default;

function getLocaleFromIFrameURL() {
  var LOCALE_REGEX = /locale=([\w-]+)&?/i;
  var locale = window.location.href.match(LOCALE_REGEX)[1];
  return locale;
}

function getIsEditableFromIFrameURL() {
  return window.location.href.indexOf('editable=true') !== -1;
}

function getClassInstanceInterface(instance) {
  var methods = Object.getOwnPropertyNames(
    Object.getPrototypeOf(instance)
  );
  var _interface = {};

  for (var i = 0; i < methods.length; i++) {
    var method = methods[i];
    _interface[method] = instance[method].bind(instance);
  }
  return _interface;
}

function listenDocumentClicks(onClick) {
  if (!onClick) {
    return;
  }
  document.addEventListener('click', function onDocumentClick() {
    onClick();
  });
}

module.exports = {
  locale: getLocaleFromIFrameURL(),
  editable: getIsEditableFromIFrameURL(),
  registerWidget: function registerWidget(widget) {
    return Promise.resolve(
      Websandbox.connection.remoteMethodsWaitPromise
    ).then(function (){
      listenDocumentClicks(Websandbox.connection.remote._closePopups);

      if (typeof widget === 'function') {
        var registerWidgetApi = function (widgetApi) {
          Websandbox.connection.setLocalApi(
            Object.getPrototypeOf(widgetApi) !== Object.prototype
              ? getClassInstanceInterface(widgetApi)
              : widgetApi
          );
        }

        if (isArrowFunction(widget)) {
          return widget(Websandbox.connection.remote, registerWidgetApi);
        }

        var Widget = widget;
        return new Widget(Websandbox.connection.remote, registerWidgetApi);
      }

      return Websandbox.connection.setLocalApi(widget);
    });
  }
};
