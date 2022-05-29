/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
import { onSingleFileLoadRemote } from '../imageList/uploadImages/uploadImages';

export function fetchImage() {
  fetch('http://127.0.0.1:5000/api/image')
    .then((response) => response.blob())
    .then((blob) => {
      const reader = new FileReader();
      reader.onload = function () {
        onSingleFileLoadRemote(new File([blob], 'text.png', {
          type: 'image/png',
        }), this.result);
      }; // <--- `this.result` contains a base64 data URI
      reader.readAsDataURL(blob);
    });
}
