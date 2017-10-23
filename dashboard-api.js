require('es6-promise/auto');
var isArrowFunction = require('is-arrow-function');
var Websandbox = require('websandbox/dist/frame');

function getClassInstanceInterface(instance) {
  var methods = Object['getOwnPropertyNames'](Object.getPrototypeOf(instance));
  var _interface = {};

  for (var i = 0; i < methods.length; i++) {
    var method = methods[i];
    _interface[method] = instance[method].bind(instance);
  }
  return _interface;
}

module.exports = {
  registerWidget: function(widget) {
    return Promise.resolve(
      Websandbox.connection.remoteMethodsWaitPromise
    ).then(function() {

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
