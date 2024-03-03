document.getElementById("enterStoriesForm").addEventListener("submit", function (e) {
  e.preventDefault();

  var formData = new FormData(e.target);

  for (var pair of formData.entries()) {
      alert(pair[1])
      //console.log(pair[0] + ": " + pair[1]);
  }

})
var anonymousBtn = document.getElementById('anonymous');
anonymousBtn.addEventListener("click", toggleAnon);

var anonWarning = document.getElementById('anonWarning');
var storiesFormDiv = document.getElementById('storiesFormDiv');

var leftForm = document.getElementById('leftForm');
var parentForm = document.getElementById("flexForm");
var anonState = false;

function toggleAnon() {
  anonState = !anonState
  if (anonState == true) {

    parentForm.removeChild(leftForm);
    anonymousBtn.classList.toggle("anonymousToggled");
    anonWarning.innerHTML = "Being anonymous will mean your action cannot be verified and is not eligible for reward.";
    storiesFormDiv.style.paddingBottom = '47px';
  }
  else {
    parentForm.insertBefore(leftForm, parentForm.firstChild)
    anonymousBtn.classList.toggle("anonymousToggled");
    anonWarning.innerHTML = ""
    storiesFormDiv.style.paddingBottom = '80px';
  }
}



const checkbox = document.getElementById('menu');
const content = document.getElementById('nonNav');
var childElements = document.getElementsByTagName('*');
checkbox.addEventListener('change', function() {
  if (checkbox.checked) {
    alert(childElements)
    childElements.forEach(function(child) {
        alert(child)
        child.classList.remove('refocus')
        child.classList.add('unfocus')
    });
  } else {
    childElements.forEach(function(child) {
        child.classList.remove('unfocus')
        child.classList.add('refocus')
    });
  }
});


const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent =
  window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();