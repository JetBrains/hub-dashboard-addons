import 'es6-promise/auto';
import isArrowFunction from 'is-arrow-function';
import Websandbox from 'websandbox/dist/frame';

function getLocaleFromIFrameURL() {
  const LOCALE_REGEX = /locale=([\w-]+)&?/i;
  const [, locale] = window.location.href.match(LOCALE_REGEX);
  return locale;
}

function getIsEditableFromIFrameURL() {
  return window.location.href.indexOf('editable=true') !== -1;
}

function getClassInstanceInterface(instance) {
  const methods = Object.getOwnPropertyNames(
    Object.getPrototypeOf(instance)
  );
  const _interface = {};

  for (let i = 0; i < methods.length; i++) {
    const method = methods[i];
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
    ).then(() => {
      listenDocumentClicks(Websandbox.connection.remote._closePopups);

      if (typeof widget === 'function') {
        const registerWidgetApi = widgetApi =>
          Websandbox.connection.setLocalApi(
            Object.getPrototypeOf(widgetApi) !== Object.prototype
              ? getClassInstanceInterface(widgetApi)
              : widgetApi
          );

        if (isArrowFunction(widget)) {
          return widget(Websandbox.connection.remote, registerWidgetApi);
        }

        const Widget = widget;
        return new Widget(Websandbox.connection.remote, registerWidgetApi);
      }

      return Websandbox.connection.setLocalApi(widget);
    });
  }
};
