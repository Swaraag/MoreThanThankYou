const checkbox = document.getElementById('menu');
const content = document.getElementById('map');

checkbox.addEventListener('change', function() {
  if (checkbox.checked) {
    content.classList.add('blur');
  } else {
    content.classList.remove('blur');
  }
});
