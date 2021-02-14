import 'controllers';

window.initPlacesAutocomplete = (...args) => {
  const event = document.createEvent('Events');
  event.initEvent('google-maps-callback', true, true);
  event.args = args;
  window.dispatchEvent(event);
};
