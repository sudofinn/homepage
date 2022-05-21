
let spinnerWrapper = document.querySelector('.spinner-wrapper');

window.addEventListener('load', function () {
// spinnerWrapper.style.display = 'none';
spinnerWrapper.parentElement.removeChild(spinnerWrapper);
});