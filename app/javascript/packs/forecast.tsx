import React from 'react';
import ReactDOM from 'react-dom';
import { Forecast } from '../src/components/Forecast/Forecast';

const elements = document.getElementsByClassName('forecast');

// TODO do we need an event listiner? DOMCOntentLoaded or Turbolinks related?
Array.from(elements).forEach((element) => {
  const options = JSON.parse(element.getAttribute('data-options'));

  ReactDOM.render(<Forecast options={options} />, element);
});
