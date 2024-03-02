
function storyInfo(form) {
    var email = form.emailAdd.value;
    var username = form.username.value;
    var recUser = form.recUser.value;
    window.location.href = "/map.html"
}

var anonymousBtn = document.getElementById('anonymous');
anonymousBtn.addEventListener("click", toggleAnon);

var anonWarning = document.getElementById('anonWarning');
var storiesFormDiv = document.getElementById('storiesFormDiv');

var leftForm = document.getElementById('leftForm')
var anonState = false;

function toggleAnon() {
  anonState = !anonState
  if (anonState == true) {
    leftForm.style.display = 'none';
    anonymousBtn.classList.toggle("anonymousToggled");
    anonWarning.innerHTML = "Being anonymous will mean your action cannot be verified and is not eligible for reward.";
    storiesFormDiv.style.paddingBottom = '47px';
  }
  else {
    leftForm.style.display = 'inline';
    anonymousBtn.classList.toggle("anonymousToggled");
    anonWarning.innerHTML = ""
    storiesFormDiv.style.paddingBottom = '80px';
  }
}



const checkbox = document.getElementById('menu');
const content = document.getElementById('nonNav');
var childElements = content.querySelectorAll('*');
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