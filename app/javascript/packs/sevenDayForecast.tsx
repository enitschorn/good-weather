import React from 'react';
import ReactDOM from 'react-dom';
import SevenDayForecast from '../src/components/SevenDayForecast/SevenDayForecast';

const elements = document.getElementsByClassName('seven-day-forecast');

Array.from(elements).forEach((element) => {
  const options = JSON.parse(element.getAttribute('data-options'));

  ReactDOM.render(<SevenDayForecast options={options} />, element);
});
