/* eslint-disable no-undef */
import {
  fetchImage,
} from './imageRequest';

function initialiseAPIs() {
  window.fetchImage = fetchImage;
}

export { initialiseAPIs as default };
