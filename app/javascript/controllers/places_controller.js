import { Controller } from 'stimulus';

export default class extends Controller {
  static targets = ['field', 'latitude', 'longitude'];

  connect() {
    if (typeof (google) !== 'undefined') {
      this.initAutocomplete();
    }
  }

  initAutocomplete() {
    this.autocomplete = new google.maps.places.Autocomplete(this.fieldTarget);
    this.autocomplete.setFields([
      'geometry',
    ]);
    this.autocomplete.addListener('place_changed', this.placeChanged.bind(this));
  }

  placeChanged() {
    const place = this.autocomplete.getPlace();
    if (!place.geometry) {
      window.alert(`No details available for input: ${place.name}`); // eslint-disable-line no-alert
    }
    this.latitudeTarget.value = place.geometry.location.lat();
    this.longitudeTarget.value = place.geometry.location.lng();
  }
}
