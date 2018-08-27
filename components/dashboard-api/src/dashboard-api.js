require('es6-promise/auto');
var isArrowFunction = require('is-arrow-function');
var getUrlParam = require('get-url-param');
var Websandbox = require('websandbox/dist/frame');

function getLocaleFromIFrameURL() {
  return getUrlParam(window.location.href, 'locale');
}

function getIsEditableFromIFrameURL() {
  return getUrlParam(window.location.href, 'editable') === 'true';
}

function getClassInstanceInterface(instance) {
  var methods = Object['getOwnPropertyNames'](Object.getPrototypeOf(instance));
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
  registerWidget: function(widget) {
    return Promise.resolve(
      Websandbox.connection.remoteMethodsWaitPromise
    ).then(function() {
      listenDocumentClicks(Websandbox.connection.remote._closePopups);

      if (typeof widget === 'function') {
        function registerWidgetApi(widgetApi) {
          if (Object.getPrototypeOf(widgetApi) !== Object.prototype) {
            widgetApi = getClassInstanceInterface(widgetApi);
          }

          return Websandbox.connection.setLocalApi(widgetApi);
        }

        if (isArrowFunction(widget)) {
          return widget(Websandbox.connection.remote, registerWidgetApi);
        }
        
        return new widget(Websandbox.connection.remote, registerWidgetApi);
      }

      return Websandbox.connection.setLocalApi(widget);
    });
  }
};
