require('es6-promise/auto');
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
    return Promise.resolve(Websandbox.connection.remoteMethodsWaitPromise)
        .then(function() {
        //Create new instance and register if it is a class
        if (typeof widget === 'function') {
            return new widget(
            Websandbox.connection.remote,
            function registerWidgetApi(widgetApi) {
                if (Object.getPrototypeOf(widgetApi) !== Object.prototype) {
                widgetApi = getClassInstanceInterface(widgetApi);
                }

                return Websandbox.connection.setLocalApi(widgetApi);
            }
            );
        }

        return Websandbox.connection.setLocalApi(widget);
        });
  }
};
