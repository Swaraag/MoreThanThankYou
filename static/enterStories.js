function formSubmitted() {
  var inputVals = document.getElementsByTagName("input")
  
  valDict = {}

  // starting from i = 1 because there is an input in the navbar code, and I don't want to be selecting that as well
  for (i = 1; i < inputVals.length; i++) {
    valDict[inputVals[i].name] = inputVals[i].value
  }
  locationData = [];

  async function dbAddStory() {

      fetch('/addStory', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: valDict["emailAdd"], 
          recEmail: valDict["recEmailAdd"], 
          actionName: valDict["actionName"], 
          actionDesc: valDict["actionDesc"],
          locationLat: locationData[0],
          locationLon: locationData[1],
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to add story');
        }
        return response.json();
    })
    .then(data => {
        console.log(data.message); // Log success message
        // Perform any further actions if needed
        alert("SUCCESS")
    })
    .catch(error => console.error('Error:', error));
    window.location.href = "/map.html"
    }  

  fetch("https://geocode.maps.co/search?street="+valDict["address"]+"&city="+valDict["city"]+"&state="+valDict["stateProvince"]+"&postalcode="+valDict["zipPostalCode"]+"&country="+valDict["country"]+"&api_key=65f62fc1294f2241038389cgi6f6e00")
  .then(response => response.json())
  .then(data => {
    // Process the JSON response
    locationData.push(parseFloat(data[0]["lat"]), parseFloat(data[0]["lon"]))

    dbAddStory();

  })
  .catch(error => {
    // Handle errors
    console.error('Error:', error);
  });
  
}

var currentTab = 0;
showTab(currentTab)

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("formTab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("formTab");

  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    
    formSubmitted();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}
const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

function validateForm() {
  // This function deals with validation of the form fields
  //var x, y, i, valid = true;

  var valid = true;
  x = document.getElementsByClassName("formTab");
  y = x[currentTab].getElementsByTagName("input");

  var invalTextElem = document.getElementById("invalText")
  if (invalTextElem) {
      invalTextElem.remove();
  }

  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "" || (y[i].getAttribute('type') === 'email' && !validateEmail(y[i].value))) {
      // add an "invalid" class to the field:
      y[i].className += " invalid";

      var invalBlankDiv = document.createElement('p')
      invalBlankDiv.id = "invalText"
      invalBlankDiv.style.color = "red"

      invalBlankDiv.appendChild(document.createTextNode("Fields may have been left blank or are invalid."));

      x[currentTab].appendChild(invalBlankDiv)

      // and set the current valid status to false:
      valid = false;
      return valid;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    var invalidElems = document.getElementsByClassName("invalid")
    var invalidElemArray = Array.from(invalidElems);
    if (invalidElemArray.length > 0) {
      invalidElemArray.forEach(function(invalidElem) {
        invalidElem.classList.remove("invalid");
    });
    }
    document.getElementsByClassName("formStep")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("formStep");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}

var currentLocBtn = document.getElementById("currentLoc")
function currentLocation(event) {
  event.preventDefault()

  var addressInput = document.getElementById("location-input")
  var cityInput = document.getElementById("locality-input")
  var stateProvinceInput = document.getElementById("administrative_area_level_1-input")
  var zipPostalCodeInput = document.getElementById("postal_code-input")
  var countryInput = document.getElementById("country-input")

  addressInput.value = "One moment..."
  cityInput.value = "One moment..."
  stateProvinceInput.value = "One moment..."
  zipPostalCodeInput.value = "One moment..."
  countryInput.value = "One moment..."

  if ("geolocation" in navigator) {
    // Use the getCurrentPosition method to get the current position
    navigator.geolocation.getCurrentPosition(function(position) {
        // Extract latitude and longitude from the position object
        var userLat = position.coords.latitude;
        var userLon = position.coords.longitude;

        // Construct the URL for the reverse geocoding API
        

        // Send a request to the Geocoding API
        fetch("https://geocode.maps.co/reverse?lat="+userLat+"&lon="+userLon+"&api_key=65f62fc1294f2241038389cgi6f6e00")
            .then(response => response.json())
            .then(data => {
              addressInput.value = data["address"]["house_number"] + " " + data["address"]["road"]
              cityInput.value = data["address"]["town"]
              stateProvinceInput.value = data["address"]["state"]
              zipPostalCodeInput.value = data["address"]["postcode"]
              countryInput.value = data["address"]["country"]
              console.log(data["address"])
                //addressInput.innerHTML = data[0]["lat"]
            })
            .catch(error => {
                // Handle errors
                console.error("Error fetching address:", error);
            });
    }, function(error) {
        // Handle errors
        switch(error.code) {
            case error.PERMISSION_DENIED:
                console.error("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                console.error("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                console.error("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                console.error("An unknown error occurred.");
                break;
        }
    });
} else {
    // Geolocation API is not supported in the browser
    console.error("Geolocation is not supported in your browser.");
}

// Attach an event listener to the button
}
currentLocBtn.addEventListener("click", currentLocation);
